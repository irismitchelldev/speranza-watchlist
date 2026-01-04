import { Redis } from "@upstash/redis";

// Create Redis client - works with Upstash Redis from Vercel Marketplace
export const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
});

