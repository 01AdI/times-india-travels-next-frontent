"use client";

import {useEffect,useRef,useState,useCallback,} from "react";
import {useDispatch,useSelector,} from "react-redux";
import {fetchHomeHero,} from "../../features/Home-page/homeHeroSlice";
import Image from "next/image";

const SLIDE_DURATION = 3500;

export default function Home_HeroSection({ initialSlides = [] }) {
 
  const dispatch = useDispatch();

  const {slides: reduxSlides,status,error,} = useSelector((state) => state.homeHero);

  const slides = reduxSlides.length > 0 ? reduxSlides : initialSlides;

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const timerRef = useRef(null);


  useEffect(() => {
    dispatch(fetchHomeHero());
  }, [dispatch]);


  const safeCurrent =
    slides.length === 0 ? 0 : Math.min(current, slides.length - 1);


  const active = slides[safeCurrent];


  const goTo = useCallback(
    (index) => {
      if (!slides.length) {
        return;
      }

      setCurrent(
        (index + slides.length) %
          slides.length
      );

      setProgressKey(
        (key) => key + 1
      );
    },
    [slides.length]
  );

  const next = useCallback(() => {
    if (!slides.length) {
      return;
    }
    setCurrent((current) => (current + 1) % slides.length);
    setProgressKey((key) => key + 1);

  }, [slides.length]);

  const prev = useCallback(() => {
    if (!slides.length) {
      return;
    }
    setCurrent((current) => (current - 1 + slides.length) % slides.length);
    setProgressKey(
      (key) => key + 1
    );
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) {
      return;
    }

    timerRef.current = setTimeout(
      next,
      SLIDE_DURATION
    );

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [slides.length,progressKey,next,]);

  const scrollToQuotation = () => {
    document
      .getElementById("quatation")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };


  const scrollToTravel = () => {
    document
      .getElementById("tour-packages")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

if (status === "loading" && slides.length === 0) {
    return (
      <section className="relative h-dvh w-full overflow-hidden bg-[#101A2E] text-[#F4EFE4]">

        {/* Background */}

        <div className="absolute inset-0 bg-[#172536]">

          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_2.2s_infinite]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.035) 45%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.035) 55%, transparent 100%)",
            }}
          />

        </div>

        {/* Overlay */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,26,46,0.55) 0%, rgba(16,26,46,0.2) 35%, rgba(16,26,46,0.45) 70%, rgba(16,26,46,0.95) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,26,46,0.6) 0%, rgba(16,26,46,0) 55%)",
          }}
        />

        {/* Counter */}

        <div className="absolute right-6 top-8 md:right-14 md:top-10">

          <div className="h-3 w-14 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full w-full -translate-x-full animate-[shimmer_1.8s_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              }}
            />

          </div>

        </div>

        {/* Main content */}

        <div className="absolute left-5 right-5 top-[30%] max-w-xl sm:left-6 sm:right-6 sm:top-[38%] md:left-14">

          {/* Destination */}

          <div className="mb-5 flex items-center gap-3">

            <div className="h-3 w-28 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full w-full -translate-x-full animate-[shimmer_1.8s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                }}
              />

            </div>

            <div className="h-px w-6 bg-white/10" />

            <div className="h-2.5 w-36 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full w-full -translate-x-full animate-[shimmer_1.8s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
                }}
              />

            </div>

          </div>

          {/* Heading */}

          <div className="space-y-3">

            <div className="relative h-12 w-[85%] overflow-hidden rounded-xl bg-white/10 sm:h-14 md:h-16">

              <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                }}
              />

            </div>

            <div className="relative h-12 w-[58%] overflow-hidden rounded-xl bg-white/10 sm:h-14 md:h-16">

              <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                }}
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap items-center gap-5">

            <div className="relative h-10 w-36 overflow-hidden rounded-lg bg-white/10">

              <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                }}
              />

            </div>

            <div className="relative h-11 w-48 overflow-hidden rounded-full bg-white/10">

              <div
                className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                }}
              />

            </div>

          </div>

        </div>

        {/* Arrows */}

        <div className="absolute bottom-24 right-5 flex gap-3 sm:bottom-32 sm:right-6 md:bottom-36 md:right-14">

          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />

          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />

        </div>

        {/* Progress skeleton */}

        <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-6 sm:right-6 md:left-14 md:right-14">

          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-0.75 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <div
                  className="h-full w-full -translate-x-full animate-[shimmer_1.8s_infinite]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                />
              </div>
            ))}
          </div>

        </div>

        <style>
          {`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }

            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes kenburns {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(1.08);
              }
            }

            @keyframes fillBar {
              from {
                width: 0%;
              }
              to {
                width: 100%;
              }
            }
          `}
        </style>

      </section>
    );
  }

if (status === "failed" && slides.length === 0) {
    return (
      <section className="flex h-dvh w-full items-center justify-center bg-[#101A2E] px-6 text-white">

        <div className="text-center">

          <p className="text-lg font-semibold">
            Unable to load hero
          </p>

          <p className="mt-2 text-sm text-white/60">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(fetchHomeHero())
            }
            className="mt-5 rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  if (!active) {
    return null;
  }

  return (
    <section className="hero-section relative h-dvh w-full overflow-hidden text-[#F4EFE4] bg-[#101A2E]">

      {slides.map((slide, index) => {

        const isActive = index === safeCurrent;

        return (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-all ease-out duration-1400 ${
              isActive
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.03]"
            }`}
          >
            {/* Ken Burns wrapper: slow zoom only while this slide is active */}
            <div
              key={isActive ? `${slide._id}-${progressKey}` : slide._id}
              className="h-full w-full overflow-hidden"
            >
              {slide.mediaType === "video" ? (
                <video
                  src={slide.mediaUrl}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  style={
                    isActive
                      ? {
                          animation: `kenburns ${SLIDE_DURATION + 1200}ms ease-out forwards`,
                          transformOrigin: "center",
                        }
                      : undefined
                  }
                />
              ) : (
                <div
                  className="relative h-full w-full"
                  style={
                    isActive
                      ? {
                          animation: `kenburns ${SLIDE_DURATION + 1200}ms ease-out forwards`,
                          transformOrigin: "center",
                        }
                      : undefined
                  }
                >
                  <Image
                    src={slide.mediaUrl}
                    alt={slide.place || "Times India Travels destination"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/*
        Full-bleed legibility overlay: runs edge-to-edge from the actual
        left side of the screen (not the text column) and fades out toward
        the right, so it reads as natural darkening of the frame rather
        than a floating rounded card.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,12,24,0.55) 0%, rgba(6,12,24,0.4) 24%, rgba(6,12,24,0.2) 46%, rgba(6,12,24,0.05) 66%, rgba(6,12,24,0) 80%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,12,24,0.22) 0%, rgba(6,12,24,0) 28%, rgba(6,12,24,0) 68%, rgba(6,12,24,0.38) 100%)",
        }}
      />

      <div className="absolute right-6 top-8 font-['Inter'] text-[11px] text-[#C9A24B] tracking-[0.2em] md:right-14 md:top-10">

        <span className="text-[#F4EFE4]">
          {String(safeCurrent + 1).padStart(2, "0")}
        </span>

        <span className="opacity-50">
          {" "}/{" "}
          {String(slides.length).padStart(
            2,
            "0"
          )}
        </span>

      </div>

      <div className="absolute left-5 right-5 top-[30%] max-w-xl sm:left-6 sm:right-6 sm:top-[38%] md:left-14">

        <div
          key={active._id}
          className="relative z-10 mb-4 flex flex-wrap items-center gap-2 sm:gap-3 animate-[fadeUp_700ms_ease-out_both]"
        >

         {/* Destination */}
          <span
            className="shrink-0 text-[15px] sm:text-[18px] md:text-[20px] font-bold font-['Playfair',serif] text-[#e0a05f] uppercase tracking-[0.15em] sm:tracking-[0.25em]"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.85)" }}
          >          
            {active.place}
          </span>

          {/* Divider */}
          <span className="h-px w-6 shrink-0 bg-[#e0a05f] opacity-60"/>

           <div className="flex min-h-9 items-center">
              <span
                className="font-['Playfair',serif] text-[15px] sm:text-[18px] md:text-[20px] font-bold leading-6 text-white"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.85)" }}
              >
              {active.line}
            </span>
          </div>

        </div>

        <h1
          className="relative z-10 font-['Playfair_Display',serif] text-[clamp(1.9rem,8vw,4rem)] font-medium leading-[1.08] text-[#F4EFE4]"
          style={{ textShadow: "0 4px 22px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.55)" }}
        >
          Bringing the World To{" "}

          <span className="italic text-[#C9A24B]">
            India
          </span>

        </h1>

        <div className="relative z-10 mt-6 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-5">

          <button
            onClick={scrollToTravel}
            type="button"
            className="group mt-2.5 inline-flex cursor-pointer items-center gap-3 border-b border-transparent pb-2 font-['Playfair',serif] text-[13px] font-medium uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-500 hover:border-[#C9A24B]"
          >

            <span>
              Plan Your Trip
            </span>

            <span className="text-lg text-[#C9A24B] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </button>

          <button
            type="button"
            onClick={
              scrollToQuotation
            }
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#C9A24B]/60 bg-[#C9A24B]/5 px-5 py-3 font-['Playfair',serif] text-[13px] uppercase tracking-[0.08em] text-[#F4EFE4] backdrop-blur-[2px] transition-all duration-500 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#101A2E]"
          >
            Get a Free Quotation
          </button>

        </div>

      </div>

      <div className="absolute bottom-24 right-5 flex gap-3 sm:bottom-32 sm:right-6 md:bottom-36 md:right-14">

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#F4EFE4]/35 text-[#F4EFE4] backdrop-blur-[6px] transition-colors hover:border-[#C9A24B]/60 hover:bg-[#C9A24B]/10"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#F4EFE4]/35 text-[#F4EFE4] backdrop-blur-[6px] transition-colors hover:border-[#C9A24B]/60 hover:bg-[#C9A24B]/10"
        >
          ›
        </button>

      </div>

      {/* Segmented "story-style" progress indicator, replaces the single yellow bar */}
      <div className="absolute bottom-6 left-5 right-5 sm:bottom-9 sm:left-6 sm:right-6 md:left-14 md:right-14">

        <div className="flex items-center gap-2">

          {slides.map((slide, index) => {
            const isPassed = index < safeCurrent;
            const isActive = index === safeCurrent;

            return (
              <button
                key={slide._id}
                onClick={() => goTo(index)}
                aria-label={`Go to ${slide.place}`}
                className="group relative h-0.75 flex-1 cursor-pointer overflow-hidden rounded-full bg-[#F4EFE4]/15"
              >
                <span
                  key={isActive ? `${slide._id}-${progressKey}` : slide._id}
                  className={`absolute inset-y-0 left-0 block rounded-full bg-linear-to-r from-[#C9A24B] to-[#f0d38a] shadow-[0_0_6px_rgba(201,162,75,0.55)] ${
                    isPassed ? "w-full" : !isActive ? "w-0" : ""
                  }`}
                  style={
                    isActive
                      ? {
                          animation: `fillBar ${SLIDE_DURATION}ms linear forwards`,
                        }
                      : undefined
                  }
                />
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}
