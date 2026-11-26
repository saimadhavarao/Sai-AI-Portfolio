import { formatAnswer, localAnswer, retrieve } from '../../../lib/knowledge';
import { selectEvidence } from '../../../lib/assistant-provider';

const buckets = new Map<string, { count: number; expires: number }>();
const windowMs = 60_000;
const maxBodyBytes = 4096;
let inFlight = 0;

function limit(client: string) {
  const now = Date.now();
  const existing = buckets.get(client);
  if (existing && existing.expires > now) return ++existing.count <= 12;
  if (buckets.size >= 5000) {
    for (const [id, entry] of buckets) if (entry.expires <= now) buckets.delete(id);
    if (buckets.size >= 5000) return false;
  }
  buckets.set(client, { count: 1, expires: now + windowMs });
  return true;
}

async function readQuestion(request: Request): Promise<string | null> {
  if (!request.body || Number(request.headers.get('content-length')) > maxBodyBytes) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(body + decoder.decode());
    return typeof data?.question === 'string' ? data.question.trim() : null;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const headers = { 'Cache-Control': 'no-store' };
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  let crossOrigin = false;
  try {
    crossOrigin = Boolean(origin && host && new URL(origin).host !== host);
  } catch {
    crossOrigin = true;
  }
  if (crossOrigin || request.headers.get('sec-fetch-site') === 'cross-site') {
    return Response.json({ error: 'Cross-site requests are unavailable.' }, { status: 403, headers });
  }
  if (request.headers.get('content-type')?.split(';')[0].toLowerCase() !== 'application/json') {
    return Response.json({ error: 'Send a JSON question.' }, { status: 415, headers });
  }
  // On Vercel use the platform-controlled header. Local traffic shares one bucket.
  const client = process.env.VERCEL === '1' ? request.headers.get('x-vercel-forwarded-for')?.slice(0, 80) || 'unknown' : 'local';
  if (!limit(client)) return Response.json({ error: 'Too many questions. Try again in a minute.' }, { status: 429, headers: { ...headers, 'Retry-After': '60' } });
  const question = await readQuestion(request);
  if (!question || question.length > 480) return Response.json({ error: 'Enter a question of 1–480 characters.' }, { status: 400, headers });

  const matches = retrieve(question);
  if (inFlight < 4 && matches.length && process.env.ASSISTANT_API_KEY) {
    inFlight++;
    try {
      const selected = await selectEvidence(question, matches);
      if (selected) return Response.json(formatAnswer(selected, 'ai'), { headers });
    } finally {
      inFlight--;
    }
  }
  return Response.json(localAnswer(matches), { headers });
}
