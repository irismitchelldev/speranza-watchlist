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
- Uses Vercel KV for storage
- Rate limiting (one report per raider per IP per day)

## Setup

1. Install dependencies:
```bash
npm install
```

2. **Set up Vercel KV (Required):**

   The app requires Vercel KV to store data. You have two options:

   **Option A: Using Vercel CLI (Recommended)**
   
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) → Storage → KV → Create Database
   - Attach the database to your project
   - Pull environment variables locally:
   ```bash
   vercel env pull .env.local
   ```

   **Option B: Manual Setup**
   
   - Create a `.env.local` file in the project root
   - Add your Vercel KV credentials:
   ```env
   KV_REST_API_URL=your_kv_rest_api_url_here
   KV_REST_API_TOKEN=your_kv_rest_api_token_here
   ```
   
   You can find these values in:
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Or: Vercel Dashboard → Storage → KV → Your Database → Settings

3. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Troubleshooting

If you see the error: `Missing required environment variables KV_REST_API_URL and KV_REST_API_TOKEN`

1. Make sure you've created a Vercel KV database
2. Ensure the database is attached to your project
3. Pull environment variables: `vercel env pull .env.local`
4. Restart your dev server: `npm run dev`

## Deployment

Deploy to Vercel:
```bash
vercel
```

Make sure your Vercel KV database is connected to your project in the Vercel dashboard. The environment variables will be automatically available in production.

