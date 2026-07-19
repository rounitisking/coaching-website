"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function markNotificationAsRead(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    await db.notification.update({
      where: { id, userId: session.user.id },
      data: { isRead: true },
    });
    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function markAllNotificationsAsRead(): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    await db.notification.updateMany({
      where: { userId: session.user.id, isRead: false },
      data: { isRead: true },
    });
    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function deleteNotification(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    await db.notification.delete({
      where: { id, userId: session.user.id },
    });
    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
