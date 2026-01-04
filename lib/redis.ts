import { Redis } from "@upstash/redis";

// Create Redis client - works with Upstash Redis from Vercel Marketplace
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

