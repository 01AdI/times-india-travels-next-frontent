"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeHero } from "../../features/Home-page/homeHeroSlice";
import { getCloudinaryVideoSources } from "../../lib/cdnVideo";

const SLIDE_DURATION = 3500;

const HERO_FALLBACK =
  "https://res.cloudinary.com/giz8nvjr/image/upload/v1790238451/home-hero-fall-back.jpg";

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
  const [mediaStatus, setMediaStatus] = useState("loading");
  const [loadedImages, setLoadedImages] = useState(() => new Set());

  const pendingSlideRef = useRef(null);

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

  const isVideoSlide = useCallback((slide) => {
    if (!slide?.mediaUrl) return false;

    return (
      slide.mediaType === "video" ||
      /\.(mp4|webm|mov)(\?.*)?$/i.test(slide.mediaUrl)
    );
  }, []);

  const activeSlide = slides[currentIndex];

  useEffect(() => {
    if (!activeSlide?.mediaUrl) {
      setMediaStatus("error");
      return;
    }

    if (isVideoSlide(activeSlide)) {
      setMediaStatus("loading");
      return;
    }

    if (loadedImages.has(activeSlide.mediaUrl)) {
      setMediaStatus("loaded");
      return;
    }

    setMediaStatus("loading");
  }, [activeSlide, loadedImages, isVideoSlide]);

  const preloadImage = useCallback(
    (slide) => {
      if (!slide?.mediaUrl || isVideoSlide(slide)) {
        return Promise.resolve(false);
      }

      if (loadedImages.has(slide.mediaUrl)) {
        return Promise.resolve(true);
      }

      return new Promise((resolve) => {
        const image = new window.Image();

        image.onload = () => {
          setLoadedImages((previous) => {
            const next = new Set(previous);
            next.add(slide.mediaUrl);
            return next;
          });

          resolve(true);
        };

        image.onerror = () => {
          resolve(false);
        };

        image.src = slide.mediaUrl;
      });
    },
    [isVideoSlide, loadedImages]
  );

  useEffect(() => {
    if (slides.length <= 1) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    preloadImage(nextSlide);
  }, [currentIndex, slides, preloadImage]);

  const changeSlide = useCallback(
    async (index) => {
      if (!slides.length) return;

      const nextIndex = (index + slides.length) % slides.length;

      if (nextIndex === currentIndex) return;

      const nextSlide = slides[nextIndex];

      pendingSlideRef.current = nextIndex;

      if (!isVideoSlide(nextSlide)) {
        const loaded = await preloadImage(nextSlide);

        if (pendingSlideRef.current !== nextIndex) {
          return;
        }

        if (!loaded) {
          setCurrentIndex(nextIndex);
          setProgressKey((value) => value + 1);
          return;
        }
      }

      setCurrentIndex(nextIndex);
      setProgressKey((value) => value + 1);
    },
    [currentIndex, isVideoSlide, preloadImage, slides]
  );

  const nextSlide = useCallback(() => {
    changeSlide(currentIndex + 1);
  }, [changeSlide, currentIndex]);

  const previousSlide = useCallback(() => {
    changeSlide(currentIndex - 1);
  }, [changeSlide, currentIndex]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setTimeout(() => {
      changeSlide(currentIndex + 1);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, slides.length, changeSlide]);

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

  const isVideo = isVideoSlide(activeSlide);

  const videoSources = isVideo
    ? getCloudinaryVideoSources(activeSlide.mediaUrl)
    : null;

  const showFallback = mediaStatus !== "loaded";

  return (
    <section className="hero-section relative h-dvh w-full overflow-hidden bg-[#101A2E] text-[#F4EFE4]">
      <div className="absolute inset-0">
        {showFallback && (
          <Image
            src={HERO_FALLBACK}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover"
          />
        )}

        {isVideo ? (
          <video
            key={activeSlide._id || activeSlide.mediaUrl}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              mediaStatus === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            poster={HERO_FALLBACK}
            onCanPlay={() => setMediaStatus("loaded")}
            onLoadedData={() => setMediaStatus("loaded")}
            onError={() => setMediaStatus("error")}
          >
            {videoSources?.webm && (
              <source src={videoSources.webm} type="video/webm" />
            )}

            {videoSources?.mp4 && (
              <source src={videoSources.mp4} type="video/mp4" />
            )}
          </video>
        ) : (
          <div
            key={activeSlide._id || activeSlide.mediaUrl}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              mediaStatus === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: `kenburns ${SLIDE_DURATION + 1200}ms ease-out forwards`,
            }}
          >
            <Image
              src={activeSlide.mediaUrl}
              alt={
                activeSlide.place || "Times India Travels destination"
              }
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover"
              onLoad={() => {
                setLoadedImages((previous) => {
                  const next = new Set(previous);
                  next.add(activeSlide.mediaUrl);
                  return next;
                });

                setMediaStatus("loaded");
              }}
              onError={() => {
                setMediaStatus("error");
              }}
            />
          </div>
        )}
      </div>

      <div className="absolute inset-y-0 left-0 w-[72%] bg-linear-to-r from-black/55 via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

      <div className="relative z-10 flex h-full items-end pb-36 sm:pb-40 md:pb-44">
        <div className="mx-auto w-full max-w-350 px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <div
              key={activeSlide._id}
              className="mb-4 flex items-center gap-3"
            >
              <span
                className="shrink-0 text-[20px] font-medium uppercase tracking-[0.25em] text-[#D8895E] sm:text-base"
                style={{
                  textShadow:
                    "0 3px 14px rgba(0,0,0,0.65)",
                }}
              >
                {activeSlide.place || "India & Beyond"}
              </span>

              {activeSlide.line && (
                <>
                  <span className="h-px w-6 shrink-0 bg-[#D8895E]/60" />

                  <span
                    className="font-['Playfair',serif] text-[22px] font-semibold leading-8 tracking-wide text-[#E5DED0] sm:text-base sm:leading-7"
                    style={{
                      textShadow:
                        "0 3px 16px rgba(0,0,0,0.7)",
                    }}
                  >
                    {activeSlide.line}
                  </span>
                </>
              )}
            </div>

            <h1
              className="font-['Playfair_Display',serif] text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05] text-[#F4EFE4]"
              style={{
                textShadow:
                  "0 4px 22px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.55)",
              }}
            >
              Bringing the World To
              <br />
              <span className="italic text-[#C9A24B]">India</span>
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#tour-packages"
                className="group inline-flex items-center gap-3 border-b border-transparent pb-2 font-['Playfair',serif] text-[13px] font-medium uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-500 hover:border-[#C9A24B]"
              >
                <span>Plan Your Trip</span>

                <ArrowRight
                  size={18}
                  className="text-[#C9A24B] transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#quatation"
                className="inline-flex items-center justify-center rounded-full border border-[#C9A24B]/60 bg-[#C9A24B]/5 px-5 py-3 font-['Playfair',serif] text-[13px] uppercase tracking-[0.08em] text-[#F4EFE4] transition-all duration-500 hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#101A2E]"
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
            className="absolute bottom-28 right-24 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#F4EFE4]/35 text-[#F4EFE4] backdrop-blur-[6px] transition-colors hover:border-[#C9A24B]/60 hover:bg-[#C9A24B]/10 md:bottom-36 md:right-28"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="absolute bottom-28 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#F4EFE4]/35 text-[#F4EFE4] backdrop-blur-[6px] transition-colors hover:border-[#C9A24B]/60 hover:bg-[#C9A24B]/10 md:bottom-36 md:right-14"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center gap-5 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
            <div className="flex flex-1 items-center gap-1.5">
              {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                const isPassed = index < currentIndex;

                return (
                  <button
                    key={slide._id || slide.mediaUrl || index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => changeSlide(index)}
                    className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
                  >
                    <span
                      key={
                        isActive
                          ? `${progressKey}-${index}`
                          : `static-${index}`
                      }
                      className={`absolute inset-y-0 left-0 rounded-full ${
                        isActive
                          ? "animate-[fillBar_3500ms_linear_forwards] bg-[#C9A24B]"
                          : isPassed
                            ? "w-full bg-[#C9A24B]"
                            : "w-0 bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="hidden shrink-0 text-sm tracking-[0.18em] text-white/70 sm:block">
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