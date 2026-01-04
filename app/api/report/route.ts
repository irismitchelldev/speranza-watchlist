import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { isKvConfigured } from "@/lib/kv-check";

function normalizeUsername(input: string) {
  const u = input.trim().toLowerCase();
  if (!u) return null;
  // tweak allowed chars as needed
  if (!/^[a-z0-9_.-]{1,32}$/.test(u)) return null;
  return u;
}

function normalizeReason(input: string) {
  const r = input.trim();
  if (!r) return null;
  return r.length > 140 ? r.slice(0, 140) : r;
}

function getClientIP(req: Request): string {
  // Try various headers that might contain the IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  
  // Fallback for local development
  return "127.0.0.1";
}

function getTodayDateString(): string {
  // Get YYYY-MM-DD format for today in UTC
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function POST(req: Request) {
  if (!isKvConfigured()) {
    return NextResponse.json(
      { 
        ok: false, 
        error: "Upstash Redis is not configured. Please set up UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables." 
      }, 
      { status: 500 }
    );
  }

  const form = await req.formData();
  const username = normalizeUsername(String(form.get("username") ?? ""));
  const reason = normalizeReason(String(form.get("reason") ?? ""));

  if (!username) {
    return NextResponse.json({ ok: false, error: "Invalid username." }, { status: 400 });
  }
  if (!reason) {
    return NextResponse.json({ ok: false, error: "Please add a short reason." }, { status: 400 });
  }

  // Get IP and check rate limit
  const ip = getClientIP(req);
  const dateStr = getTodayDateString();
  const rateLimitKey = `reports:ip:${ip}:${username}:${dateStr}`;

  try {
    // Check if this IP has already reported this username today
    const existing = await redis.get(rateLimitKey);
    if (existing) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "You have already reported this raider today. One report per raider per day." 
        }, 
        { status: 429 }
      );
    }

    // Set rate limit key (expires in 25 hours to be safe, in case of timezone edge cases)
    await redis.set(rateLimitKey, "1", { ex: 25 * 60 * 60 });

    // Count per username (sorted set = leaderboard)
    const newCount = await redis.zincrby("reports:z", 1, username);

    // Recent incidents per username (list, capped)
    const listKey = `reports:l:${username}`;
    await redis.lpush(listKey, JSON.stringify({ reason, at: Date.now() }));
    await redis.ltrim(listKey, 0, 24);

    // Metadata
    await redis.hset(`reports:h:${username}`, {
      lastReportedAt: Date.now(),
      lastReason: reason,
    });

    // redirect to profile
    return NextResponse.redirect(new URL(`/r/${encodeURIComponent(username)}`, req.url), 303);
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save report. Please check your Upstash Redis configuration." },
      { status: 500 }
    );
  }
}

