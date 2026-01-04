/**
 * Check if Upstash Redis is properly configured
 */
export function isKvConfigured(): boolean {
  return !!(
    process.env.REDIS_URL &&
    process.env.REDIS_TOKEN
  );
}

export function getKvErrorMessage(): string {
  if (isKvConfigured()) return "";
  
  return `
Upstash Redis is not configured. Please:

1. Go to Vercel Dashboard → Storage → Marketplace → Upstash
2. Create a Redis database and attach it to your project
3. Environment variables will be automatically added:
   REDIS_URL
   REDIS_TOKEN

Or manually add to .env.local:
REDIS_URL=your_url_here
REDIS_TOKEN=your_token_here
  `.trim();
}

