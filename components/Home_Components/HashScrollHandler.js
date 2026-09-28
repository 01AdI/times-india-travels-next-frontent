"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash === "#quatation") {
      const element = document.getElementById("quatation");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname]);

  return null;
}
