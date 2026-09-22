"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeHero } from "../../features/Home-page/homeHeroSlice";

const SLIDE_DURATION = 3500;

export default function Home_HeroSection({ initialSlides = [] }) {
  const dispatch = useDispatch();

  const reduxSlides = useSelector((state) => state.homeHero?.slides || []);
  const status = useSelector((state) => state.homeHero?.status);
  const error = useSelector((state) => state.homeHero?.error);

  const slides = useMemo(() => {
    if (initialSlides?.length) return initialSlides;
    return reduxSlides;
  }, [initialSlides, reduxSlides]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (
      initialSlides.length === 0 &&
      reduxSlides.length === 0 &&
      status !== "loading"
    ) {
      dispatch(fetchHomeHero());
    }
  }, [dispatch, initialSlides.length, reduxSlides.length, status]);

  useEffect(() => {
    if (!slides.length) return;

    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  const goToSlide = useCallback(
    (index) => {
      if (!slides.length) return;

      const nextIndex = (index + slides.length) % slides.length;

      setCurrentIndex(nextIndex);
      setProgressKey((value) => value + 1);
    },
    [slides.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % slides.length);
      setProgressKey((value) => value + 1);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  const activeSlide = slides[currentIndex];

  if (!activeSlide) {
    return (
      <section className="hero-section relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#101A2E] text-[#F4EFE4]">
        {status === "loading" ? (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24B] border-t-transparent" />
        ) : (
          <div className="px-6 text-center">
            <p className="text-sm text-white/70">
              {error || "Unable to load hero content."}
            </p>
          </div>
        )}
      </section>
    );
  }

  const isVideo =
    activeSlide.mediaType === "video" ||
    activeSlide.mediaUrl?.match(/\.(mp4|webm|mov)(\?.*)?$/i);

  return (
    <section className="hero-section relative h-dvh w-full overflow-hidden bg-[#101A2E] text-[#F4EFE4]">
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            key={activeSlide._id || activeSlide.mediaUrl}
            src={activeSlide.mediaUrl}
            className="h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <div
            key={activeSlide._id || activeSlide.mediaUrl}
            className="absolute inset-0 h-full w-full"
            style={{
              animation: `kenburns ${SLIDE_DURATION + 1200}ms ease-out forwards`,
            }}
          >
            <Image
              src={activeSlide.mediaUrl}
              alt={
                activeSlide.place ||
                "Times India Travels destination"
              }
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#C9A24B] sm:text-base">
              {activeSlide.place || "India & Beyond"}
            </p>

            <h1
              className="font-['Playfair_Display',serif] text-[clamp(1.9rem,8vw,4rem)] font-medium leading-[1.08] text-[#F4EFE4]"
              style={{
                textShadow:
                  "0 4px 22px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.55)",
              }}
            >
              Bringing the World To{" "}
              <span className="italic text-[#C9A24B]">India</span>
            </h1>

            {activeSlide.line && (
              <p className="mt-5 max-w-2xl font-['Noto_Sans',sans-serif] text-base leading-7 text-white/85 sm:text-lg">
                {activeSlide.line}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#quatation"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C9A24B] px-6 py-3.5 text-sm font-semibold text-[#101A2E] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#dfbb68]"
              >
                Plan Your Trip
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#quatation"
                className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 hover:border-white/70 hover:bg-white/15"
              >
                Get a Free Quotation
              </a>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={previousSlide}
            className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/15 p-3 text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 hover:border-white/50 hover:bg-black/30 md:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/25 bg-black/15 p-3 text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 hover:border-white/50 hover:bg-black/30 md:flex"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between gap-6 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide._id || slide.mediaUrl || index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className="group h-1.5 overflow-hidden rounded-full bg-white/30"
                >
                  <span
                    key={
                      index === currentIndex
                        ? `${progressKey}-${index}`
                        : `static-${index}`
                    }
                    className={
                      index === currentIndex
                        ? "block h-full origin-left animate-[fillBar_3500ms_linear_forwards] bg-[#C9A24B]"
                        : index < currentIndex
                          ? "block h-full bg-[#C9A24B]"
                          : "block h-full bg-transparent"
                    }
                  />
                </button>
              ))}
            </div>

            <div className="hidden text-sm tracking-[0.18em] text-white/70 sm:block">
              {String(currentIndex + 1).padStart(2, "0")}{" "}
              <span className="mx-2 text-white/30">/</span>{" "}
              {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
