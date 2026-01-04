/**
 * Check if Upstash Redis is properly configured
 * Accepts both connection strings (redis://) and REST API URLs (https://)
 */
export function isKvConfigured(): boolean {
  const url = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  
  // Accept either REST API URL (https://) or connection string (redis:// or rediss://)
  // Token can be in env var or extracted from connection string
  const hasValidUrl = url && (
    url.startsWith("https://") || 
    url.startsWith("redis://") || 
    url.startsWith("rediss://")
  );
  
  // Token might be in env var or in the connection string
  const hasToken = !!token || (url.includes("@") && url.includes(":"));
  
  return hasValidUrl && hasToken;
}

export function getKvErrorMessage(): string {
  if (isKvConfigured()) return "";
  
  const url = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  
  let message = `
Upstash Redis is not configured. Please:

1. Go to Vercel Dashboard → Storage → Marketplace → Upstash
2. Create a Redis database and attach it to your project
3. Environment variables will be automatically added:
   REDIS_URL (connection string is fine - will be converted automatically)
   REDIS_TOKEN (if not in connection string)

Or manually add to .env.local:
REDIS_URL=your_connection_string_or_rest_url
REDIS_TOKEN=your_token (if not in connection string)
  `.trim();
  
  return message;
}

