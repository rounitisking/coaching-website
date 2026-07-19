import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const url = searchParams.get("url") || "";

  if (!url) {
    return NextResponse.json({ error: "Missing redirect URL" }, { status: 400 });
  }

  try {
    const session = await auth();
    if (session?.user?.id && id) {
      // Record watch history (upsert: if exists update watchedAt, else create)
      await db.videoHistory.upsert({
        where: {
          userId_demoVideoId: {
            userId: session.user.id,
            demoVideoId: id,
          },
        },
        update: {
          watchedAt: new Date(),
        },
        create: {
          userId: session.user.id,
          demoVideoId: id,
          watchedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error("[Record Watch History Error]", error);
  }

  // Redirect to the actual YouTube URL
  return NextResponse.redirect(url);
}
