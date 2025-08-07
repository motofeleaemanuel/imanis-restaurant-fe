import { getGalleryImages } from "@/actions/gallery.actions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

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
        const items = await getGalleryImages();
        return NextResponse.json(items, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500,
        });
    }
}