/**
 * Check if Upstash Redis is properly configured
 */
export function isKvConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

export function getKvErrorMessage(): string {
  if (isKvConfigured()) return "";
  
  return `
Upstash Redis is not configured. Please:

1. Go to Vercel Dashboard → Storage → Marketplace → Upstash
2. Create a Redis database and attach it to your project
3. Environment variables will be automatically added:
   UPSTASH_REDIS_REST_URL
   UPSTASH_REDIS_REST_TOKEN

Or manually add to .env.local:
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
  `.trim();
}

