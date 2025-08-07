// pages/api/menu.ts
import { getMenuAction } from '@/actions/menu.actions'
import { NextRequest, NextResponse } from 'next/server'
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  timeout:10000
});

export async function GET(req: NextRequest) {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
        console.log("limit", limit, "reset", reset, "remaining", remaining);
        return NextResponse.json({
            error: "Rate limit exceeded",
            status: 429
        });
    }
  try {
    const menu = await getMenuAction()
    return NextResponse.json(menu, {
      status: 200,
    })
  } catch (error) {
    console.error('🔥 Error in /api/menu:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, {
      status: 500,
    })
  }
}