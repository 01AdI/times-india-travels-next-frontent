"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home_Travel_Grid() {
  const categories = [
    {
      id: "Most-Popular",
      number: "01",
      categoryTitle: "Popular Tours",
      tagLine: "Our Most Loved Experiences",
      hoverDescription:
        "Discover India's most loved itineraries, handpicked by our travel experts for unforgettable journeys.",
      buttonText: "Explore Tours",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "special-packages",
      number: "02",
      categoryTitle: "Special Packages",
      tagLine: "Curated for Every Traveler",
      hoverDescription:
        "Luxury escapes, family vacations, honeymoon trips, and adventure tours crafted just for you.",
      buttonText: "Browse Packages",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="tour-packages" className="overflow-hidden bg-[#F2FAFB] py-14 sm:py-14 lg:py-14">
        {/* CENTERED SECTION INTRO */}

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p
          className="
            font-['Inter']
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#F58634]
          "
        >
          Explore India
        </p>

        <h2
          className="
            mt-4
            font-['Fraunces']
            text-5xl
            font-semibold
            leading-tight
            text-[#0B3C49]
            sm:text-6xl
          "
        >
          Discover Incredible India
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-lg
            leading-relaxed
            text-[#6D6D6D]
          "
        >
          From majestic monuments and peaceful backwaters to colorful cities
          and breathtaking mountains, experience the beauty of India.
        </p>
      </div>

          {/* FULL-WIDTH INTERACTIVE DIPTYCH */}
      
      <div className="mt-16 sm:mt-20">
        <div className=" relative h-155 w-full overflow-hidden bg-[#0B3C49] shadow-[0_35px_100px_rgba(11,60,73,0.18)] lg:h-162.5"
          onMouseLeave={() => setActiveCard(null)}
        >
              {/* LEFT — POPULAR TOURS */}
        
          <Link
            href={`/tours/${categories[0].id}`}
            onMouseEnter={() => setActiveCard(0)}
            className={`
              group
              absolute
              inset-y-0
              left-0
              overflow-hidden
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                activeCard === 0
                  ? "w-[72%]"
                  : activeCard === 1
                    ? "w-[35%]"
                    : "w-1/2"
              }
            `}
          >
            {/* Image */}

            <img
              src={categories[0].image}
              alt={categories[0].categoryTitle}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-1200
                ease-out
                group-hover:scale-105
              "
            />

            {/* Overlay */}

            <div
              className="
                absolute
                inset-0
                bg-linear-to-t
                from-[#061E24]
                via-[#061E24]/30
                to-transparent
              "
            />

            {/* Slight hover brightness */}

            <div
              className="
                absolute
                inset-0
                bg-black/0
                transition-all
                duration-700
                group-hover:bg-black/5
              "
            />

            {/* Vertical divider */}

            <div
              className="
                absolute
                right-0
                top-0
                h-full
                w-px
                bg-white/20
              "
            />

            {/* Number */}

            <div
              className="
                absolute
                left-8
                top-8
                flex
                items-center
                gap-3
                sm:left-10
                sm:top-10
              "
            >
              <span
                className="
                  font-['Fraunces']
                  text-xl
                  italic
                  text-white
                "
              >
                {categories[0].number}
              </span>

              <span className="h-px w-8 bg-white/40" />
            </div>

            {/* Arrow */}

            <div
              className="
                absolute
                right-7
                top-7
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-white/10
                text-white
                backdrop-blur-md
                transition-all
                duration-500
                group-hover:rotate-45
                group-hover:border-[#F58634]
                group-hover:bg-[#F58634]
              "
            >
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </div>

            {/* Content */}

            <div
              className={`
                absolute
                bottom-0
                left-0
                p-8
                transition-all
                duration-700
                sm:p-10
                lg:p-12
                ${
                  activeCard === 1
                    ? "translate-y-8 opacity-60"
                    : "translate-y-0 opacity-100"
                }
              `}
            >
              <p
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#7FE8F8]
                "
              >
                {categories[0].categoryTitle}
              </p>

              <h3
                className="
                  mt-4
                  max-w-lg
                  font-['Fraunces']
                  text-[clamp(2.5rem,4vw,4.5rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.035em]
                  text-white
                "
              >
                {categories[0].tagLine}
              </h3>

              {/* Expanded description */}

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-700
                  ${
                    activeCard === 0
                      ? "mt-6 max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <p className="max-w-md text-sm leading-6 text-white/75">
                  {categories[0].hoverDescription}
                </p>

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white
                  "
                >
                  {categories[0].buttonText}

                  <ArrowUpRight
                    size={15}
                    className="text-[#F58634]"
                  />
                </div>
              </div>
            </div>
          </Link>

            {/*  RIGHT — SPECIAL PACKAGES */}

          <Link
            href={`/tours/${categories[1].id}`}
            onMouseEnter={() => setActiveCard(1)}
            className={`
              group
              absolute
              inset-y-0
              right-0
              overflow-hidden
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                activeCard === 1
                  ? "w-[72%]"
                  : activeCard === 0
                    ? "w-[35%]"
                    : "w-1/2"
              }
            `}
          >
            {/* Image */}

            <img
              src={categories[1].image}
              alt={categories[1].categoryTitle}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-1200
                ease-out
                group-hover:scale-105
              "
            />

            {/* Overlay */}

            <div
              className="
                absolute
                inset-0
                bg-linear-to-t
                from-[#061E24]
                via-[#061E24]/35
                to-transparent
              "
            />

            {/* Slight hover brightness */}

            <div
              className="
                absolute
                inset-0
                bg-black/0
                transition-all
                duration-700
                group-hover:bg-black/5
              "
            />

            {/* Vertical divider */}

            <div
              className="
                absolute
                left-0
                top-0
                h-full
                w-px
                bg-white/20
              "
            />

            {/* Number */}

            <div
              className="
                absolute
                right-8
                top-8
                flex
                items-center
                gap-3
                sm:right-10
                sm:top-10
              "
            >
              <span className="h-px w-8 bg-white/40" />

              <span
                className="
                  font-['Fraunces']
                  text-xl
                  italic
                  text-white
                "
              >
                {categories[1].number}
              </span>
            </div>

            {/* Arrow */}

            <div
              className="
                absolute
                left-7
                top-7
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-white/10
                text-white
                backdrop-blur-md
                transition-all
                duration-500
                group-hover:rotate-45
                group-hover:border-[#F58634]
                group-hover:bg-[#F58634]
              "
            >
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </div>

            {/* Content */}

            <div
              className={`
                absolute
                bottom-0
                right-0
                p-8
                text-right
                transition-all
                duration-700
                sm:p-10
                lg:p-12
                ${
                  activeCard === 0
                    ? "translate-y-8 opacity-60"
                    : "translate-y-0 opacity-100"
                }
              `}
            >
              <p
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#7FE8F8]
                "
              >
                {categories[1].categoryTitle}
              </p>

              <h3
                className="
                  mt-4
                  ml-auto
                  max-w-lg
                  font-['Fraunces']
                  text-[clamp(2.5rem,4vw,4.5rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.035em]
                  text-white
                "
              >
                {categories[1].tagLine}
              </h3>

              {/* Expanded description */}

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-700
                  ${
                    activeCard === 1
                      ? "mt-6 max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <p className="ml-auto max-w-md text-sm leading-6 text-white/75">
                  {categories[1].hoverDescription}
                </p>

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-white
                  "
                >
                  <ArrowUpRight
                    size={15}
                    className="text-[#F58634]"
                  />

                  {categories[1].buttonText}
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>

      <div className="flex items-center justify-center gap-4 px-6 py-14 sm:py-16">
        <span className="h-px w-10 bg-[#F58634]/50" />

        <span
          className="
            font-['Fraunces']
            text-sm
            italic
            text-[#124D56]/65
            sm:text-base
          "
        >
          India, thoughtfully experienced.
        </span>

        <span className="h-px w-10 bg-[#F58634]/50" />
      </div>
    </section>
  );
}