"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { fetchDestinations } from "../../features/Home-page/clinet_Destination_Slice";

function DestinationSection() {
  const dispatch = useDispatch();
  const {destinations: destinationList,status,error} = useSelector((state) => state.destinations);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const total = destinationList?.length || 0;

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  const nextSlide = useCallback(() => {
    if (total <= 1) return;

    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const previousSlide = useCallback(() => {
    if (total <= 1) return;

    setActiveIndex((current) =>current === 0 ? total - 1 : current - 1);
  }, [total]);

  useEffect(() => {
    if (total <= 1 || isImageHovered) {
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {clearInterval(interval);};
  }, [nextSlide, total, isImageHovered]);

  useEffect(() => {
    if (total === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [total, activeIndex]);

  const visibleDestinations = useMemo(() => {
    if (!total) {
      return [];
    }

    const previousIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    return [
      {
        ...destinationList[previousIndex],
        position: "previous",
        originalIndex: previousIndex,
      },
      {
        ...destinationList[activeIndex],
        position: "active",
        originalIndex: activeIndex,
      },
      {
        ...destinationList[nextIndex],
        position: "next",
        originalIndex: nextIndex,
      },
    ];
  }, [activeIndex, destinationList, total]);

  if ((status === "loading" || status === "idle") &&total === 0) {
    return (
      <section className="relative overflow-hidden border-y border-[#C9A24B]/25 bg-[#f1f8f8] py-15 md:py-14 lg:py-14">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Eyebrow shimmer */}

          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 overflow-hidden bg-[#f47b3a]/20">
              <div className="h-full w-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white to-transparent" />
            </div>

            <div className="relative h-3 w-28 overflow-hidden rounded-full bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent" />
            </div>

            <div className="h-px w-8 overflow-hidden bg-[#f47b3a]/20">
              <div className="h-full w-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white to-transparent" />
            </div>
          </div>

          {/* Heading shimmer */}

          <div className="relative mx-auto h-12 w-[85%] overflow-hidden rounded-xl bg-[#103f4a]/10 sm:h-14 md:h-16">
            <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent" />
          </div>

          {/* Description shimmer */}

          <div className="mx-auto mt-6 space-y-2">
            <div className="relative mx-auto h-3 w-[75%] overflow-hidden rounded-full bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent" />
            </div>

            <div className="relative mx-auto h-3 w-[55%] overflow-hidden rounded-full bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Carousel skeleton */}

        <div className=" relative mt-14 flex h-125 w-full items-center justify-center overflow-hidden sm:h-140 lg:h-155">
          {/* Side card */}

          <div className="absolute left-1/2 z-10 h-110 w-[42vw] max-w-105 translate-x-[-60vw] -translate-y-1/2 overflow-hidden 
          rounded-[18px] bg-[#103f4a]/10 sm:h-125 sm:w-[34vw] sm:translate-x-[-53vw] lg:h-137.5 lg:w-[27vw] lg:translate-x-[-45.5vw]"
          >
            <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2.2s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Main card */}

          <div
            className="
              relative
              z-30
              h-125
              w-[78vw]
              max-w-225
              overflow-hidden
              rounded-[18px]
              bg-[#103f4a]/15
              shadow-[0_20px_60px_rgba(15,63,74,0.16)]
              sm:h-140
              sm:w-[72vw]
              lg:h-155
              lg:w-[64vw]
              lg:max-w-240
            "
          >
            <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2.2s_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent" />

            {/* Bottom content skeleton */}

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 md:p-11 lg:p-12">
              <div className="relative mb-4 h-3 w-14 overflow-hidden rounded-full bg-white/20">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>

              <div className="relative h-12 w-[55%] overflow-hidden rounded-xl bg-white/15 sm:h-14 md:h-16">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>

              <div className="relative mt-4 h-4 w-[40%] overflow-hidden rounded-full bg-white/15">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>

              <div className="relative mt-4 h-3 w-[70%] overflow-hidden rounded-full bg-white/10">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="relative mt-2 h-3 w-[60%] overflow-hidden rounded-full bg-white/10">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="relative mt-6 h-11 w-36 overflow-hidden rounded-md bg-white/15">
                <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Right card */}

          <div
            className="
              absolute
              left-1/2
              z-10
              h-110
              w-[42vw]
              max-w-105
              translate-x-[60vw]
              -translate-y-1/2
              overflow-hidden
              rounded-[18px]
              bg-[#103f4a]/10
              sm:h-125
              sm:w-[34vw]
              sm:translate-x-[53vw]
              lg:h-137.5
              lg:w-[27vw]
              lg:translate-x-[45.5vw]
            "
          >
            <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_2.2s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>

        {/* Progress skeleton */}

        <div className="mx-auto mt-8 w-full max-w-md px-6 sm:mt-10">
          <div className="flex items-center gap-4">
            <div className="relative h-3 w-5 overflow-hidden rounded-full bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white to-transparent" />
            </div>

            <div className="relative h-0.5 flex-1 overflow-hidden bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white to-transparent" />
            </div>

            <div className="relative h-3 w-5 overflow-hidden rounded-full bg-[#103f4a]/10">
              <div className="absolute inset-0 -translate-x-full animate-[destinationShimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white to-transparent" />
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#f47b3a]/30" />
            <div className="h-2 w-2 rounded-full bg-[#103f4a]/15" />
            <div className="h-2 w-2 rounded-full bg-[#103f4a]/15" />
            <div className="h-2 w-2 rounded-full bg-[#103f4a]/15" />
          </div>
        </div>

        <style>
          {`
            @keyframes destinationShimmer {
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>
      </section>
    );
  }

  if (status === "failed" && total === 0) {
    return (
      <section
        className="
          flex
          w-full
          items-center
          justify-center
          overflow-hidden
          border-y
          border-[#C9A24B]/25
          bg-[#f1f8f8]
          px-6
          py-28
        "
      >
        <div className="text-center">
          <p className="font-serif text-2xl font-medium text-[#103f4a]">
            Unable to load destinations
          </p>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {error ||
              "Something went wrong while loading the destinations."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchDestinations())}
            className="
              mt-6
              inline-flex
              cursor-pointer
              items-center
              rounded-full
              border
              border-[#f47b3a]/60
              px-5
              py-2.5
              text-sm
              font-medium
              text-[#103f4a]
              transition-all
              duration-300
              hover:bg-[#f47b3a]
              hover:text-white
            "
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!total) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        border-y
        border-[#C9A24B]/25
        bg-[#f1f8f8]
        py-15
        md:py-14
        lg:py-14
      "
    >
      <div
        className="
          relative
          z-10
          mx-auto
          mb-14
          max-w-4xl
          px-6
          text-center
          md:mb-16
          lg:mb-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-5
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#f47b3a]" />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#F58634]
              sm:text-xs
            "
          >
            Destinations
          </span>

          <span className="h-px w-8 bg-[#f47b3a]" />
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.75,
            delay: 0.08,
          }}
          className="
            font-serif
            text-4xl
            font-medium
            leading-[1.05]
            tracking-tight
            text-[#103f4a]
            sm:text-5xl
            md:text-6xl
          "
        >
          Where will your story begin?
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-7
            text-slate-600
            sm:text-base
          "
        >
          From timeless cities to serene landscapes, every destination has a
          story waiting to be lived.
        </motion.p>
      </div>

      <div className="relative w-full">
        <div
          className="
            relative
            flex
            h-125
            w-full
            items-center
            justify-center
            overflow-hidden
            sm:h-140
            lg:h-155
          "
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleDestinations.map((destination) => {
              const isActive = destination.position === "active";
              const isPrevious = destination.position === "previous";
              const isNext = destination.position === "next";

              return (
                <motion.article
                  key={`${destination._id || destination.id}-${destination.position}`}
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.88,
                    scale: isActive ? 1 : 0.94,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(destination.originalIndex);
                    }
                  }}
                  className={`
                    group
                    absolute
                    top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    overflow-hidden
                    rounded-[18px]
                    shadow-[0_20px_60px_rgba(15,63,74,0.16)]

                    ${
                      isActive
                        ? `
                          z-30
                          h-125
                          w-[78vw]
                          max-w-225

                          sm:h-140
                          sm:w-[72vw]

                          lg:h-155
                          lg:w-[64vw]
                          lg:max-w-240
                        `
                        : `
                          z-20
                          h-110
                          w-[42vw]
                          max-w-105

                          sm:h-125
                          sm:w-[34vw]

                          lg:h-137.5
                          lg:w-[27vw]
                        `
                    }

                    ${
                      isPrevious
                        ? `
                          -translate-x-[calc(60vw)]

                          sm:-translate-x-[calc(53vw)]

                          lg:-translate-x-[calc(45.5vw)]
                        `
                        : ""
                    }

                    ${
                      isNext
                        ? `
                          translate-x-[calc(60vw)]

                          sm:translate-x-[calc(53vw)]

                          lg:translate-x-[calc(45.5vw)]
                        `
                        : ""
                    }
                  `}
                >
                  <motion.img
                    src={destination.heroImage}
                    alt={destination.name}
                    draggable="false"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.045]
                    "
                  />
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/75
                      via-black/15
                      to-transparent
                    "
                  />

                  {isActive && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-linear-to-t
                        from-black/90
                        via-black/40
                        to-black/10
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />
                  )}

                  {!isActive && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        z-10
                        p-5
                        sm:p-7
                      "
                    >
                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            font-medium
                            tracking-[0.25em]
                            text-[#f47b3a]
                            sm:text-xs
                          "
                        >
                          {formatNumber(destination.originalIndex + 1)}
                        </span>

                        <span className="h-px w-8 bg-[#f47b3a]" />
                      </div>

                      <h3
                        className="
                          font-serif
                          text-2xl
                          font-medium
                          text-white
                          sm:text-3xl
                        "
                      >
                        {destination.name}
                      </h3>
                    </div>
                  )}

                  {isActive && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        z-10
                        translate-y-5
                        p-7
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:translate-y-0
                        group-hover:opacity-100

                        sm:p-9
                        md:p-11
                        lg:p-12
                      "
                    >
                      <div
                        className="
                          mb-3
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            text-xs
                            font-medium
                            tracking-[0.25em]
                            text-[#f47b3a]
                          "
                        >
                          {formatNumber(destination.originalIndex + 1)}
                        </span>

                        <span className="h-px w-10 bg-[#f47b3a]" />
                      </div>

                      <h3
                        className="
                          font-serif
                          text-4xl
                          font-medium
                          leading-none
                          text-white
                          sm:text-5xl
                          md:text-6xl
                        "
                      >
                        {destination.name}
                      </h3>

                      <p
                        className="
                          mt-3
                          max-w-xl
                          font-serif
                          text-base
                          italic
                          text-white/90
                          sm:text-lg
                        "
                      >
                        {destination.tagline}
                      </p>

                      <p
                        className="
                          mt-3
                          max-w-xl
                          text-sm
                          leading-6
                          text-white/75
                          sm:text-base
                          sm:leading-7
                        "
                      >
                        {destination.description}
                      </p>

                      <Link
                        href={`/destinations/${destination.id || destination._id}`}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="
                          pointer-events-auto
                          group/button
                          mt-6
                          inline-flex
                          cursor-pointer
                          items-center
                          gap-4
                          rounded-md
                          border
                          border-[#f47b3a]
                          px-5
                          py-3
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-white
                          transition-all
                          duration-300
                          hover:bg-[#f47b3a]
                        "
                      >
                        Explore Now

                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.8}
                          className="
                            transition-transform
                            duration-300
                            group-hover/button:translate-x-1
                            group-hover/button:-translate-y-1
                          "
                        />
                      </Link>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>

          <button
            type="button"
            aria-label="Previous destination"
            onClick={previousSlide}
            className="
              group
              absolute
              left-4
              top-1/2
              z-50
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#103f4a]
              shadow-[0_8px_30px_rgba(0,0,0,0.16)]
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#f47b3a]
              hover:text-white
              sm:left-6
              sm:h-14
              sm:w-14
              md:left-8
              lg:left-10
              xl:left-12
            "
          >
            <ArrowLeft
              size={22}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
          </button>

          <button
            type="button"
            aria-label="Next destination"
            onClick={nextSlide}
            className="
              group
              absolute
              right-4
              top-1/2
              z-50
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#103f4a]
              shadow-[0_8px_30px_rgba(0,0,0,0.16)]
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#f47b3a]
              hover:text-white
              sm:right-6
              sm:h-14
              sm:w-14
              md:right-8
              lg:right-10
              xl:right-12
            "
          >
            <ArrowRight
              size={22}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-md
            px-6
            sm:mt-10
          "
        >
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-[#103f4a]">
              {formatNumber(activeIndex + 1)}
            </span>

            <div
              className="
                relative
                h-0.5
                flex-1
                overflow-hidden
                bg-[#103f4a]/15
              "
            >
              <motion.div
                key={activeIndex}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: isImageHovered ? "0%" : "100%",
                }}
                transition={{
                  duration: isImageHovered ? 0 : 3.5,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-y-0
                  left-0
                  bg-[#f47b3a]
                "
              />
            </div>

            <span className="text-xs font-medium text-[#103f4a]">
              {formatNumber(total)}
            </span>
          </div>
          
          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {destinationList.map((destination, index) => (
              <button
                key={destination._id || destination.id || index}
                type="button"
                aria-label={`Go to ${destination.name}`}
                onClick={() => setActiveIndex(index)}
                className="cursor-pointer p-1"
              >
                <span
                  className={`
                    block
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      index === activeIndex
                        ? "h-2.5 w-2.5 bg-[#f47b3a]"
                        : "h-2 w-2 bg-[#103f4a]/20"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationSection;
