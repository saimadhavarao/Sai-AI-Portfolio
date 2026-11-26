export function siteOrigin() {
  const configured = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  try {
    const url = new URL(configured);
    return ['https:', 'http:'].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
