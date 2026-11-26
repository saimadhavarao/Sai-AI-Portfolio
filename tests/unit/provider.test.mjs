import assert from 'node:assert/strict';
import test from 'node:test';
import { selectEvidence } from '../../lib/assistant-provider.ts';

test('validates configured provider requests and accepts only retrieved evidence IDs', async context => {
  process.env.ASSISTANT_API_KEY = 'fixture-secret';
  process.env.ASSISTANT_MODEL = 'fixture-model';
  process.env.ASSISTANT_BASE_URL = 'https://provider.example/v1';
  const candidate = { id: 'friday', text: 'Approved evidence.', title: 'FRIDAY', href: '/projects/friday' };
  let result = '["friday"]';
  context.mock.method(globalThis, 'fetch', async (url, request) => {
    assert.equal(url, 'https://provider.example/v1/chat/completions');
    assert.equal(request.headers.Authorization, 'Bearer fixture-secret');
    assert.equal(JSON.parse(request.body).model, 'fixture-model');
    return Response.json({ choices: [{ message: { content: result } }] });
  });
  assert.deepEqual(await selectEvidence('What is FRIDAY?', [candidate]), [candidate]);
  result = '["invented"]';
  assert.equal(await selectEvidence('What is FRIDAY?', [candidate]), null);
  result = '[]';
  assert.deepEqual(await selectEvidence('What is FRIDAY?', [candidate]), []);
  result = 'This is an unsupported claim.';
  assert.equal(await selectEvidence('What is FRIDAY?', [candidate]), null);
});
