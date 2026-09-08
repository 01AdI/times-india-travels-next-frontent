"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 2800,
      easing: "ease-out-cubic",
      offset: 120,
      once: false,
      mirror: true,
      anchorPlacement: "top-bottom",
    });

    const refresh = () => {
      AOS.refreshHard();
    };

    // Give images/layout a chance to settle.
    const timer = window.setTimeout(refresh, 500);

    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
    };
  }, []);

  return children;
}
