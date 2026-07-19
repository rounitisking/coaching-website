import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { toggleWishlist } from "@/actions/wishlist";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth");
  }

  const wishlist = await db.wishlist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const items = await Promise.all(
    wishlist.map(async (item) => {
      let href = "#";
      if (item.itemType === "COURSE") {
        const course = await db.course.findUnique({
          where: { id: item.itemId },
          select: { slug: true },
        });
        if (course) href = `/courses/${course.slug}`;
      } else if (item.itemType === "NOTE") {
        href = `/notes/${item.itemId}`;
      } else if (item.itemType === "TEST_SERIES") {
        href = `/test-series`;
      }
      return { ...item, href };
    })
  );

  async function handleRemove(itemId: string, itemType: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;
    await db.wishlist.deleteMany({
      where: {
        userId: session.user.id,
        itemId,
        itemType,
      },
    });
    revalidatePath("/dashboard/wishlist");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100" style={{ fontFamily: "Outfit, sans-serif" }}>
          My Wishlist
        </h1>
        <p className="text-slate-550 dark:text-slate-400 text-sm mt-1">Saved items you are interested in.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Your wishlist is empty</h3>
            <p className="text-slate-400 text-xs mt-1">Explore courses and notes and save them here.</p>
          </div>
          <Link href="/courses" className="btn-primary btn-sm inline-flex items-center gap-1">
            Browse Courses <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {item.thumbnail && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="badge text-[9px] font-bold uppercase tracking-wider">
                    {item.itemType}
                  </span>
                  <span className="font-black text-blue-600 dark:text-blue-400 text-sm">
                    {item.price > 0 ? `₹${item.price}` : "Free"}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2 mb-4">
                  {item.title}
                </h3>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-900 mt-2">
                <Link
                  href={item.href}
                  className="flex-1 btn-primary btn-xs text-center justify-center py-2 rounded-xl text-xs"
                >
                  View Details
                </Link>
                <form
                  action={handleRemove.bind(null, item.itemId, item.itemType)}
                  className="inline-block"
                >
                  <button
                    type="submit"
                    className="p-2 border border-slate-250 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-xl transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
