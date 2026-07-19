"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function toggleWishlist(item: {
  itemId: string;
  itemType: string;
  title: string;
  thumbnail?: string | null;
  price: number;
}): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    const existing = await db.wishlist.findUnique({
      where: {
        userId_itemType_itemId: {
          userId: session.user.id,
          itemType: item.itemType,
          itemId: item.itemId,
        },
      },
    });

    if (existing) {
      await db.wishlist.delete({ where: { id: existing.id } });
      revalidatePath("/dashboard/wishlist");
      return { success: true, data: { action: "removed" } };
    } else {
      await db.wishlist.create({
        data: {
          userId: session.user.id,
          itemType: item.itemType,
          itemId: item.itemId,
          title: item.title,
          thumbnail: item.thumbnail || null,
          price: item.price,
        },
      });
      revalidatePath("/dashboard/wishlist");
      return { success: true, data: { action: "added" } };
    }
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function getWishlist(): Promise<any[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return db.wishlist
    .findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);
}
