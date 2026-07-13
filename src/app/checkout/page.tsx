import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Academica Institute",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { type?: string; id?: string };
}) {
  const session = await auth();
  if (!session?.user) {
    const callbackUrl = `/checkout?type=${searchParams.type}&id=${searchParams.id}`;
    redirect(`/auth?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const { type, id } = searchParams;
  let item: { title: string; price: number; mrp: number; type: string; id: string } | null = null;

  try {
    if (type === "course" && id) {
      const course = await db.course.findUnique({ where: { id }, select: { id: true, title: true, price: true, mrp: true } });
      if (course) item = { id: course.id, title: course.title, price: course.price, mrp: course.mrp ?? course.price, type: "course" };
    } else if (type === "test-series" && id) {
      const ts = await db.testSeries.findUnique({ where: { id }, select: { id: true, title: true, price: true, mrp: true } });
      if (ts) item = { id: ts.id, title: ts.title, price: ts.price, mrp: ts.mrp ?? ts.price, type: "test-series" };
    } else if (type === "resource" && id) {
      const res = await db.resource.findUnique({ where: { id }, select: { id: true, title: true, price: true, mrp: true } });
      if (res) item = { id: res.id, title: res.title, price: res.price, mrp: res.mrp ?? res.price, type: "resource" };
    }
  } catch {
    item = null;
  }

  if (!item) {
    redirect("/courses");
  }

  return (
    <div className="section bg-[var(--bg-primary)] py-12 text-left">
      <div className="container-custom max-w-2xl">
        <CheckoutClient item={item} userId={session.user.id} />
      </div>
    </div>
  );
}
