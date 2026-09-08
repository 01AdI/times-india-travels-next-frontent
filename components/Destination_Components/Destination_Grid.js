"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DestinationGrid({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F2FAFB]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* ================================================================
          HEADER
      ================================================================= */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          text-center
          sm:px-10
          lg:px-12
        "
      >
        {/* Eyebrow */}

        <div
          className="
            mb-5
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#F58634]" />

          <span
            className="
              font-['Inter']
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#F58634]
              sm:text-xs
            "
          >
            Explore India
          </span>

          <span className="h-px w-8 bg-[#F58634]" />
        </div>

        {/* Heading */}

        <h2
          className="
            font-['Fraunces']
            text-4xl
            font-medium
            leading-[1.05]
            tracking-tight
            text-[#103F4A]
            sm:text-5xl
            md:text-6xl
          "
        >
          Discover your next destination
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            font-['Inter']
            text-sm
            leading-7
            text-[#103F4A]/60
            sm:text-base
          "
        >
          From royal cities and ancient traditions to peaceful landscapes,
          discover the places that make every journey unforgettable.
        </p>
      </div>

      {/* ================================================================
          DESTINATION GRID
      ================================================================= */}

      <div
        className="
          mx-auto
          mt-14
          max-w-[1400px]
          px-5
          sm:mt-16
          sm:px-8
          lg:mt-20
          lg:px-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            lg:grid-cols-12
            lg:gap-5
          "
        >
          {data.map((destination, index) => {
            const destinationId =
              destination.id || destination._id;

            const destinationName =
              destination.name ||
              destination.title ||
              "Destination";

            const destinationTagline =
              destination.tagline ||
              "";

            const destinationDescription =
              destination.description ||
              "";

            const destinationImage =
              destination.heroImage ||
              destination.image ||
              "";

            /*
             * ------------------------------------------------------------
             * ASYMMETRIC LAYOUT
             *
             * 01 → 7 columns
             * 02 → 5 columns
             * 03 → 5 columns
             * 04 → 7 columns
             *
             * Then repeats.
             * ------------------------------------------------------------
             */

            const layoutPosition = index % 4;

            const gridClass =
              layoutPosition === 0
                ? "lg:col-span-7"
                : layoutPosition === 1
                  ? "lg:col-span-5"
                  : layoutPosition === 2
                    ? "lg:col-span-5"
                    : "lg:col-span-7";

            return (
              <article
                key={
                  destinationId ||
                  `destination-${index}`
                }
                className={`
                  group
                  relative
                  ${gridClass}
                  h-[430px]
                  overflow-hidden
                  rounded-[18px]
                  bg-[#103F4A]
                  shadow-[0_18px_55px_rgba(15,63,74,0.12)]
                  sm:h-[480px]
                  lg:h-[500px]
                `}
              >
                {/* ======================================================
                    IMAGE
                ======================================================= */}

                {destinationImage ? (
                  <img
                    src={destinationImage}
                    alt={destinationName}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-[900ms]
                      ease-out
                      group-hover:scale-[1.045]
                    "
                  />
                ) : (
                  <div
                    className="
                      absolute
                      inset-0
                      bg-[#103F4A]
                    "
                  />
                )}

                {/* ======================================================
                    CINEMATIC OVERLAY
                ======================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/90
                    via-black/25
                    to-black/10
                  "
                />

                {/* ======================================================
                    HOVER OVERLAY
                ======================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/95
                    via-black/55
                    to-black/20
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* ======================================================
                    TOP INFORMATION
                ======================================================= */}

                <div
                  className="
                    absolute
                    left-6
                    right-6
                    top-6
                    z-20
                    flex
                    items-start
                    justify-between
                    sm:left-7
                    sm:right-7
                    sm:top-7
                  "
                >
                  {/* Number */}

                  <div className="flex items-center gap-3">
                    <span
                      className="
                        font-['Fraunces']
                        text-4xl
                        font-light
                        leading-none
                        text-white/75
                        sm:text-5xl
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Destination marker */}

                  <div
                    className="
                      rounded-full
                      border
                      border-white/20
                      bg-black/15
                      px-4
                      py-2
                      backdrop-blur-sm
                    "
                  >
                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-white/80
                      "
                    >
                      Explore India
                    </span>
                  </div>
                </div>

                {/* ======================================================
                    CONTENT
                ======================================================= */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    p-6
                    sm:p-8
                    lg:p-9
                  "
                >
                  {/* Small orange line */}

                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span className="h-px w-8 bg-[#F58634]" />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-[#F58634]
                      "
                    >
                      Destination
                    </span>
                  </div>

                  {/* Destination name */}

                  <h3
                    className="
                      font-['Fraunces']
                      text-4xl
                      font-medium
                      leading-[0.95]
                      tracking-tight
                      text-white
                      sm:text-5xl
                      lg:text-[3.4rem]
                    "
                  >
                    {destinationName}
                  </h3>

                  {/* ==================================================
                      TAGLINE
                  =================================================== */}

                  {destinationTagline && (
                    <p
                      className="
                        mt-3
                        max-w-xl
                        font-['Fraunces']
                        text-base
                        italic
                        leading-6
                        text-white/85
                        sm:text-lg
                      "
                    >
                      {destinationTagline}
                    </p>
                  )}

                  {/* ==================================================
                      HOVER DETAILS
                  =================================================== */}

                  <div
                    className="
                      grid
                      grid-rows-[0fr]
                      opacity-0
                      transition-all
                      duration-500
                      ease-out
                      group-hover:grid-rows-[1fr]
                      group-hover:opacity-100
                    "
                  >
                    <div className="min-h-0 overflow-hidden">
                      {destinationDescription && (
                        <p
                          className="
                            mt-4
                            max-w-xl
                            font-['Inter']
                            text-sm
                            leading-6
                            text-white/70
                            sm:text-[15px]
                          "
                        >
                          {destinationDescription}
                        </p>
                      )}

                      {/* =================================================
                          EXPLORE BUTTON
                      ================================================== */}

                      <Link
                        href={`/destinations/${destinationId}`}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="
                          group/button
                          mt-5
                          inline-flex
                          items-center
                          gap-4
                          rounded-md
                          border
                          border-[#F58634]
                          px-5
                          py-3
                          font-['Inter']
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.18em]
                          text-white
                          transition-all
                          duration-300
                          hover:bg-[#F58634]
                        "
                      >
                        Explore More

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
                  </div>
                </div>

                {/* ======================================================
                    CORNER ARROW
                ======================================================= */}

                <Link
                  href={`/destinations/${destinationId}`}
                  aria-label={`Explore ${destinationName}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="
                    absolute
                    bottom-7
                    right-7
                    z-30
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/30
                    bg-black/10
                    text-white
                    opacity-0
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    group-hover:opacity-100
                    hover:border-[#F58634]
                    hover:bg-[#F58634]
                    sm:bottom-8
                    sm:right-8
                  "
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      hover:translate-x-0.5
                      hover:-translate-y-0.5
                    "
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}