"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      offset: 80,
      easing: "ease-out-cubic",
    });

    // Recalculate positions after the initial render and after images/data
    // settle. This is especially useful on content-heavy travel pages.
    const refresh = () => AOS.refreshHard();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 250);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
    };
  }, []);

  return children;
}
