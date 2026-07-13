"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function ConditionalWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const excludePaths = ["/auth", "/dashboard", "/admin"];
  const shouldExclude = excludePaths.some((p) => pathname?.startsWith(p));

  if (shouldExclude) {
    return null;
  }

  return <>{children}</>;
}
