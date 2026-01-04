# Speranza Watchlist

A Next.js app for tracking username reports with a Speranza-style interface.

## ⚠️ Important Disclaimer

**This is an unofficial, fan-made tool.** It is not affiliated with, endorsed by, or connected to any game developer, publisher, or official moderation system.

### User-Generated Content

All reports and information on this platform are submitted by users. The operators of this service do not verify, endorse, or take responsibility for the accuracy, truthfulness, or validity of any user-submitted content.

### No Responsibility

The operators of this service are **not responsible** for:

- Any false, misleading, or defamatory content posted by users
- Any harassment, bullying, or misuse of this platform
- Any consequences resulting from the use of information on this platform
- Any disputes between users

### Use at Your Own Risk

This tool is provided "as-is" without any warranties. Use this platform responsibly and do not use it to harass, defame, or harm others.

**By using this platform, you acknowledge that you have read and understood this disclaimer and agree to use this platform responsibly.**

## Features

- Log surface incidents (username + reason)
- Background check profiles with tier rankings
- Leaderboard of most reported usernames
- Uses Upstash Redis for storage (via Vercel Marketplace)
- Rate limiting (one report per raider per IP per day)

## Setup

1. Install dependencies:
```bash
npm install
```

2. **Set up Upstash Redis (Required):**

   The app requires Upstash Redis to store data. You have two options:

   **Option A: Using Vercel Marketplace (Recommended)**
   
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) → Storage → Marketplace → Upstash
   - Create a Redis database and attach it to your project
   - Environment variables will be automatically added:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Pull environment variables locally:
   ```bash
   vercel env pull .env.local
   ```

   **Option B: Manual Setup**
   
   - Create a `.env.local` file in the project root
   - Add your Upstash Redis credentials:
   ```env
   UPSTASH_REDIS_REST_URL=your_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
   ```
   
   You can get these from your Upstash dashboard or Vercel project environment variables.

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Troubleshooting

If you see the error: `Missing required environment variables UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN`

1. Make sure you've created an Upstash Redis database via Vercel Marketplace
2. Ensure the database is attached to your project
3. Pull environment variables: `vercel env pull .env.local`
4. Restart your dev server: `npm run dev`

## Deployment

Deploy to Vercel:
```bash
vercel
```

Make sure your Upstash Redis database is connected to your project in the Vercel dashboard. The environment variables will be automatically available in production.

