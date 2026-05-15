"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ClientPageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div key={pathname}>{children}</div>;
}
