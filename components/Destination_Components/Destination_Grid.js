"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DestinationGrid({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAF5EB]
        py-12
        sm:py-20
        lg:py-24
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          text-center
          sm:px-10
          lg:px-12
        "
      >
        {/* Eyebrow */}

        <div
          className="
            mb-4
            flex
            items-center
            justify-center
            gap-2.5
            sm:mb-5
            sm:gap-3
          "
        >
          <span className="h-px w-6 bg-[#B85128] sm:w-8" />

          <span
            className="
              font-['Playfair',serif]
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#B85128]
              sm:text-[10px]
              sm:tracking-[0.35em]
              md:text-xs
            "
          >
            Explore India
          </span>

          <span className="h-px w-6 bg-[#B85128] sm:w-8" />
        </div>

        {/* Heading */}

        <h2
          className="
            font-['Playfair_Display',serif]
            text-[clamp(1.85rem,8vw,3rem)]
            font-medium
            leading-[1.08]
            tracking-tight
            text-[#173C3A]
            sm:text-5xl
            sm:leading-[1.05]
            md:text-6xl
          "
        >
          Discover your next destination
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            font-['Noto_Sans',sans-serif]
            text-[13px]
            leading-6
            text-[#476763]/60
            sm:mt-6
            sm:text-sm
            sm:leading-7
            md:text-base
          "
        >
          From royal cities and ancient traditions to peaceful landscapes,
          discover the places that make every journey unforgettable.
        </p>
      </div>

      <div
        className="
          mx-auto
          mt-10
          max-w-350
          px-4
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
            gap-4
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
                  h-125
                  overflow-hidden
                  rounded-2xl
                  bg-[#103F4A]
                  shadow-[0_12px_35px_rgba(15,63,74,0.12)]
                  sm:h-120
                  sm:rounded-[18px]
                  sm:shadow-[0_18px_55px_rgba(15,63,74,0.12)]
                  lg:h-125
                `}
              >

                {destinationImage ? (
                  <Image
                    src={destinationImage}
                    alt={destinationName}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={80}
                    draggable="false"
                    className="
                      object-cover
                      transition-transform
                      duration-900
                      ease-out
                      group-hover:scale-[1.045]
                    "
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
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


                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/95
                    via-black/55
                    to-black/20
                    opacity-100
                    transition-opacity
                    duration-500
                    sm:opacity-0
                    sm:group-hover:opacity-100
                  "
                />

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-5
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
                        text-3xl
                        font-light
                        leading-none
                        text-white/75
                        sm:text-4xl
                        md:text-5xl
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
                      px-3
                      py-1.5
                      backdrop-blur-sm
                      sm:px-4
                      sm:py-2
                    "
                  >
                    <span
                      className="
                        font-['Noto_Sans',sans-serif]
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-white/80
                        sm:text-[10px]
                        sm:tracking-[0.2em]
                      "
                    >
                      Explore India
                    </span>
                  </div>
                </div>


                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    p-5
                    sm:p-8
                    lg:p-9
                  "
                >
                  {/* Small orange line */}

                  <div
                    className="
                      mb-3
                      flex
                      items-center
                      gap-2.5
                      sm:mb-4
                      sm:gap-3
                    "
                  >
                    <span className="h-px w-6 bg-[#F58634] sm:w-8" />

                    <span
                      className="
                        font-['Playfair',serif]
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#F58634]
                        sm:text-[9px]
                        sm:tracking-[0.25em]
                      "
                    >
                      Destination
                    </span>
                  </div>

                  {/* Destination name */}

                  <h3
                    className="
                      font-['Playfair_Display',serif]
                      text-[clamp(1.6rem,7vw,2.75rem)]
                      font-medium
                      leading-[1.02]
                      tracking-tight
                      text-white
                      sm:text-5xl
                      sm:leading-[0.95]
                      lg:text-[3.4rem]
                    "
                  >
                    {destinationName}
                  </h3>


                  {destinationTagline && (
                    <p
                      className="
                        mt-2.5
                        max-w-xl
                        font-['Playfair',serif]
                        text-[13px]
                        italic
                        leading-5
                        text-white/85
                        sm:mt-3
                        sm:text-base
                        sm:leading-6
                        md:text-lg
                      "
                    >
                      {destinationTagline}
                    </p>
                  )}

                  <div
                    className="
                      grid
                      grid-rows-[1fr]
                      opacity-100
                      transition-all
                      duration-500
                      ease-out
                      sm:grid-rows-[0fr]
                      sm:opacity-0
                      sm:group-hover:grid-rows-[1fr]
                      sm:group-hover:opacity-100
                    "
                  >
                    <div className="min-h-0 overflow-hidden">
                      {destinationDescription && (
                        <p
                          className="
                            mt-3
                            max-w-xl
                            font-['Noto_Sans',sans-serif]
                            text-[12px]
                            leading-5
                            text-white/70
                            sm:mt-4
                            sm:text-sm
                            sm:leading-6
                            md:text-[15px]
                          "
                        >
                          {destinationDescription}
                        </p>
                      )}

                      <Link
                        href={`/destinations/${destinationId}`}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className="
                          group/button
                          mt-4
                          inline-flex
                          items-center
                          gap-3
                          rounded-md
                          border
                          border-[#F58634]
                          px-4
                          py-2.5
                          font-['Noto_Sans',sans-serif]
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-white
                          transition-all
                          duration-300
                          hover:bg-[#F58634]
                          active:bg-[#F58634]
                          sm:mt-5
                          sm:gap-4
                          sm:px-5
                          sm:py-3
                          sm:text-[10px]
                          sm:tracking-[0.18em]
                        "
                      >
                        Explore More

                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.8}
                          className="
                            transition-transform
                            duration-300
                            group-hover/button:translate-x-1
                            group-hover/button:-translate-y-1
                            group-active/button:translate-x-1
                            group-active/button:-translate-y-1
                            sm:h-4
                            sm:w-4
                          "
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/destinations/${destinationId}`}
                  aria-label={`Explore ${destinationName}`}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="
                    absolute
                    bottom-5
                    right-5
                    z-30
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/30
                    bg-black/25
                    text-white
                    opacity-100
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:border-[#F58634]
                    hover:bg-[#F58634]
                    active:border-[#F58634]
                    active:bg-[#F58634]
                    sm:bottom-8
                    sm:right-8
                    sm:h-11
                    sm:w-11
                    sm:bg-black/10
                    sm:opacity-0
                    sm:group-hover:opacity-100
                  "
                >
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="
                      transition-transform
                      duration-300
                      hover:translate-x-0.5
                      hover:-translate-y-0.5
                      sm:h-4.5
                      sm:w-4.5
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
