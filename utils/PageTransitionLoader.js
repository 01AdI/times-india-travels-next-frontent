"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOADER_VIDEO =
  "https://res.cloudinary.com/images-backend/video/upload/v1787571298/WhatsApp_Video_2026-08-24_at_5.04.38_PM_a4xm4b.mp4";

const MIN_LOADER_TIME = 1800;
const FADE_DURATION = 500;

export default function PageTransitionLoader() {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const firstLoad = useRef(true);
  const previousPath = useRef(pathname);
  const timerRef = useRef(null);
  const exitTimerRef = useRef(null);

  const beginExit = () => {
    setIsExiting(true);
    exitTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsExiting(false);
    }, FADE_DURATION);
  };

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      timerRef.current = setTimeout(beginExit, MIN_LOADER_TIME);
      return clearTimers;
    }

    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      clearTimers();
      setIsExiting(false);
      setIsLoading(true);
      timerRef.current = setTimeout(beginExit, MIN_LOADER_TIME);
    }

    return clearTimers;
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#073B3A] transition-opacity ease-out ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
    >
      <video
        key={pathname} // forces a clean restart every route change
        src={LOADER_VIDEO}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-cover transition-transform ease-out ${
          isExiting ? "scale-105" : "scale-100"
        }`}
        style={{ transitionDuration: `${FADE_DURATION}ms` }}
      />
    </div>
  );
}