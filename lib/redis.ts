import { Redis } from "@upstash/redis";

// Get environment variables - Vercel Marketplace may provide connection string or REST URL
let redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
let redisToken = process.env.REDIS_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

// If we have a connection string (redis:// or rediss://), convert it to REST API URL
if (redisUrl && (redisUrl.startsWith("redis://") || redisUrl.startsWith("rediss://"))) {
  try {
    // Parse connection string: rediss://default:token@host:port
    const url = new URL(redisUrl);
    const host = url.hostname;
    // Extract token from username:password part
    if (url.username && url.username !== "default") {
      redisToken = url.username;
    } else if (url.password) {
      redisToken = url.password;
    }
    // Convert to REST API URL format: https://host.upstash.io
    redisUrl = `https://${host}`;
  } catch (error) {
    throw new Error(
      `Failed to parse Redis connection string. Please check your REDIS_URL environment variable. ` +
      `Received: "${redisUrl.substring(0, 50)}..."`
    );
  }
}

// Validate we have required values
if (!redisUrl || !redisToken) {
  throw new Error(
    `Redis configuration missing. Please set REDIS_URL and REDIS_TOKEN environment variables.`
  );
}

// Create Redis client - works with Upstash Redis from Vercel Marketplace
export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

