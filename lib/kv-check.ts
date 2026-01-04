/**
 * Check if Vercel KV is properly configured
 */
export function isKvConfigured(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) || !!(
    process.env.KV_URL
  );
}

export function getKvErrorMessage(): string {
  if (isKvConfigured()) return "";
  
  return `
Vercel KV is not configured. Please:

1. Go to Vercel Dashboard → Storage → KV → Create Database
2. Attach the database to your project
3. Pull environment variables:
   vercel env pull .env.local

Or manually create .env.local with:
KV_REST_API_URL=your_url_here
KV_REST_API_TOKEN=your_token_here
  `.trim();
}

