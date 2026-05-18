"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ClientPageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // remove any navigation overlay added during link clicks once the new page mounts
  React.useEffect(() => {
    try {
      const ov = document.getElementById('nav-overlay')
      if (ov) ov.remove()
    } catch (e) {
      // noop
    }
  }, [pathname])

  return <div key={pathname}>{children}</div>;
}
