"use client";

import {useEffect,useRef,useState,useCallback,} from "react";
import {useDispatch,useSelector,} from "react-redux";
import {fetchHomeHero,} from "../../features/Home-page/homeHeroSlice";

const SLIDE_DURATION = 3500;

export default function Home_HeroSection() {
 
  const dispatch = useDispatch();

  const {slides,status,error,} = useSelector((state) => state.homeHero);

  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const timerRef = useRef(null);


  useEffect(() => {
    dispatch(fetchHomeHero());
  }, [dispatch]);


  useEffect(() => {
    if (slides.length === 0) {
      setCurrent(0);
      return;
    }

    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);


  const active = slides[current];


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
      <section className="relative h-screen w-screen overflow-hidden bg-[#101A2E] text-[#F4EFE4]">

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

        <div className="absolute left-6 right-6 top-[38%] max-w-xl md:left-14">

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

        <div className="absolute bottom-32 right-6 flex gap-3 md:bottom-36 md:right-14">

          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />

          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />

        </div>

        {/* Progress */}

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-9 md:px-14">

          <div className="relative h-0.5 w-full overflow-hidden bg-white/10">

            <div
              className="absolute left-0 top-0 h-full w-1/3 animate-[loadingProgress_2s_ease-in-out_infinite]"
              style={{
                backgroundColor:
                  "#C9A24B",
              }}
            />

          </div>

          <div className="mt-3 flex justify-between">

            <div className="h-2 w-2 rounded-full bg-[#C9A24B]/50" />

            <div className="h-2 w-2 rounded-full bg-white/10" />

            <div className="h-2 w-2 rounded-full bg-white/10" />

          </div>

        </div>

        <style>
          {`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }

            @keyframes loadingProgress {
              0% {
                transform: translateX(-100%);
              }

              50% {
                transform: translateX(100%);
              }

              100% {
                transform: translateX(300%);
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

            @keyframes travel {
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
      <section className="flex h-screen w-screen items-center justify-center bg-[#101A2E] px-6 text-white">

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
    <section className="hero-section relative h-screen w-screen overflow-hidden text-[#F4EFE4] bg-[#101A2E]">

      {slides.map((slide, index) => {

        const isActive =index === current;

        return (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity ease-in-out duration-1400 ${isActive?"opacity-100":"opacity-0"}`}
          >
            {slide.mediaType === "video" ? (
              <video
                src={slide.mediaUrl}
                muted
                autoPlay
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={slide.mediaUrl}
                alt={slide.place}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-[linear-gradient(180deg, rgba(16,26,46,0.55)_0%, rgba(16,26,46,0.15)_32%, rgba(16,26,46,0.35)_70%, rgba(16,26,46,0.92)_100%)]"/>
      <div className="absolute inset-0 bg-[linear-gradient(90deg, rgba(16,26,46,0.5)_0%, rgba(16,26,46,0)_45%)]"/>

      <div className="absolute right-6 top-8 font-['Inter'] text-[11px] text-[#C9A24B] tracking-[0.2em] md:right-14 md:top-10">

        <span className="text-[#F4EFE4]">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span className="opacity-50">
          {" "}/{" "}
          {String(slides.length).padStart(
            2,
            "0"
          )}
        </span>

      </div>

      <div className="absolute left-6 right-6 top-[38%] max-w-xl md:left-14">

        <div
          key={active._id}
          className="mb-4 flex items-center gap-3 animate-[fadeUp_700ms_ease-out_both]"
        >

         {/* Destination */}
          <span className="shrink-0 text-[14px] font-['Inter'] text-[#D8895E] uppercase tracking-[0.25em]">          
            {active.place}
          </span>

          {/* Divider */}
          <span className="h-px w-6 shrink-0 bg-[#D8895E] opacity-60"/>

           <div className="flex h-18 items-center overflow-hidden">
              <span className="font-['Inter'] text-[13px] font-semibold leading-6 tracking-wide text-[#C7BFA9]">
              {active.line}
            </span>
          </div>

        </div>

        <h1 className="font-['Fraunces'] text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] text-[#F4EFE4]">
          Bringing the World To{" "}

          <span className="italic text-[#C9A24B]">
            India
          </span>

        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-5">

          <button
            onClick={scrollToTravel}
            type="button"
            className="group mt-2.5 inline-flex cursor-pointer items-center gap-3 border-b border-transparent pb-2 font-['Inter'] text-[13px] font-medium uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-500 hover:border-[#C9A24B]"
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
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#C9A24B]/60 bg-[#C9A24B]/5 px-5 py-3 font-['Inter'] text-[13px] uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-500 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#101A2E]"
          >
            Get a Free Quotation
          </button>

        </div>

      </div>

      <div className="absolute bottom-32 right-6 flex gap-3 md:bottom-36 md:right-14">

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

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-9 md:px-14">

        <div className="relative h-0.5 w-full bg-[#F4EFE4]/15">

          <div
            key={progressKey}
            className="absolute left-0 top-0 h-full bg-[#C9A24B]"
            style={{
              animation: `travel ${SLIDE_DURATION}ms linear forwards`,
            }}
          />

          <div className="absolute inset-0 flex justify-between">

            {slides.map((slide, index) => {
              const isPassed = index <= current;

              return (
                <button
                  key={slide._id}
                  onClick={() => goTo(index)}
                  aria-label={`Go to ${slide.place}`}
                  className={`-mt-1.25 h-3 w-3 -translate-x-1/2 rounded-full transition-all duration-300 ${
                    isPassed
                      ? "bg-[#e1b453] opacity-100"
                      : "bg-[#F4EFE4] opacity-30"
                  }`}
                />
              );
            }
            )}

          </div>

        </div>

      </div>
    </section>
  );
}