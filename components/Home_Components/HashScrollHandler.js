"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scrolls to the quotation form when the page is loaded with the
// "#quatation" hash. This is the only piece of Home.js that actually
// needs to run in the browser, so it lives in its own tiny client
// component rather than forcing the whole homepage render tree into
// the client bundle.
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
