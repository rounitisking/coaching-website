"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function toggleBookmark(blogId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    const existing = await db.bookmark.findUnique({
      where: {
        userId_blogId: {
          userId: session.user.id,
          blogId,
        },
      },
    });

    if (existing) {
      await db.bookmark.delete({ where: { id: existing.id } });
      revalidatePath("/dashboard/saved-blogs");
      return { success: true, data: { action: "removed" } };
    } else {
      await db.bookmark.create({
        data: {
          userId: session.user.id,
          blogId,
        },
      });
      revalidatePath("/dashboard/saved-blogs");
      return { success: true, data: { action: "added" } };
    }
  } catch (e: any) {
    return { error: e.message };
  }
}
