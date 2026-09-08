"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function TourPackage_Sub_Highlights({ tour }) {
  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] px-6 py-24 sm:px-10 md:py-32">
      
      {/* =========================================================
          BACKGROUND DETAIL
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-40
            top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#124D56]/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#F58634]/[0.035]
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1300px]">

        {/* =======================================================
            HEADER
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 md:mb-20"
        >

          {/* SECTION NUMBER */}

          <div className="mb-6 flex items-center gap-4">

            <span
              className="
                font-['Fraunces']
                text-xl
                font-light
                text-[#F58634]
              "
            >
              03
            </span>

            <span className="h-px w-14 bg-[#124D56]/20" />

            <span
              className="
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#124D56]
              "
            >
              What Makes It Special
            </span>

          </div>

          {/* TITLE */}

          <h2
            className="
              max-w-4xl
              font-['Fraunces']
              text-5xl
              font-medium
              leading-[0.98]
              tracking-[-0.04em]
              text-[#0B3C49]
              sm:text-6xl
              md:text-7xl
            "
          >
            Moments you'll

            <span className="block italic text-[#F58634]">
              remember.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-7
              max-w-2xl
              font-['Inter']
              text-sm
              leading-7
              text-[#536D72]
              sm:text-base
            "
          >
            Every journey is shaped by the places, experiences and small
            moments that make India unforgettable. Here's a glimpse of
            what awaits along the way.
          </p>

        </motion.div>


        {/* =======================================================
            CINEMATIC HIGHLIGHT GRID
        ======================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">


          {/* =====================================================
              FEATURED IMAGE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              relative
              min-h-[500px]
              overflow-hidden
              rounded-[28px]
              bg-[#0B3C49]
              lg:min-h-[720px]
            "
          >

            {/* IMAGE */}

            <img
              src={tour.highlights[0]?.image}
              alt={tour.highlights[0]?.title || tour.highlights[0]}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-[1400ms]
                ease-out
                group-hover:scale-[1.045]
              "
            />

            {/* BLACK CINEMATIC OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/85
                via-black/20
                to-black/5
              "
            />

            {/* TOP LABEL */}

            <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">

              <span
                className="
                  border
                  border-white/20
                  bg-black/20
                  px-4
                  py-2
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/90
                  backdrop-blur-md
                "
              >
                Signature Experience
              </span>

            </div>

            {/* NUMBER */}

            <div className="absolute right-7 top-6 z-10 sm:right-8 sm:top-8">

              <span
                className="
                  font-['Fraunces']
                  text-5xl
                  font-light
                  text-white/40
                "
              >
                01
              </span>

            </div>

            {/* CONTENT */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                p-7
                sm:p-9
                md:p-10
              "
            >

              <p
                className="
                  mb-3
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#F58634]
                "
              >
                Featured Highlight
              </p>

              <h3
                className="
                  max-w-2xl
                  font-['Fraunces']
                  text-3xl
                  font-medium
                  leading-[1.05]
                  tracking-[-0.025em]
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                {tour.highlights[0]?.title ||
                  tour.highlights[0]}
              </h3>

              {tour.highlights[0]?.description && (
                <p
                  className="
                    mt-4
                    max-w-xl
                    font-['Inter']
                    text-sm
                    leading-6
                    text-white/65
                  "
                >
                  {tour.highlights[0].description}
                </p>
              )}

            </div>

          </motion.div>


          {/* =====================================================
              HIGHLIGHT LIST
          ====================================================== */}

          <div className="flex flex-col">

            {tour.highlights.slice(1).map((highlight, index) => {

              const number = index + 2;

              const title =
                highlight?.title || highlight;

              const image =
                highlight?.image;

              const description =
                highlight?.description;

              return (

                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    relative
                    border-t
                    border-[#124D56]/15
                    py-7
                    sm:py-8
                  "
                >

                  {/* ==========================================
                      MOBILE IMAGE
                  =========================================== */}

                  {image && (
                    <div
                      className="
                        relative
                        mb-6
                        aspect-[16/9]
                        overflow-hidden
                        rounded-2xl
                        lg:hidden
                      "
                    >

                      <img
                        src={image}
                        alt={title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/35
                          to-transparent
                        "
                      />

                    </div>
                  )}


                  {/* ==========================================
                      DESKTOP HOVER IMAGE
                  =========================================== */}

                  {image && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-6
                        right-8
                        z-20
                        hidden
                        w-[260px]
                        overflow-hidden
                        rounded-2xl
                        opacity-0
                        shadow-2xl
                        transition-all
                        duration-500
                        group-hover:translate-x-0
                        group-hover:opacity-100
                        lg:block
                      "
                    >

                      <div className="aspect-[4/3]">

                        <img
                          src={image}
                          alt={title}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                      </div>

                    </div>
                  )}


                  {/* ==========================================
                      ROW CONTENT
                  =========================================== */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-start
                      gap-6
                      sm:gap-8
                    "
                  >

                    {/* NUMBER */}

                    <span
                      className="
                        shrink-0
                        pt-1
                        font-['Fraunces']
                        text-xl
                        font-light
                        text-[#F58634]/50
                        transition-colors
                        duration-300
                        group-hover:text-[#F58634]
                      "
                    >
                      {String(number).padStart(2, "0")}
                    </span>


                    {/* TEXT */}

                    <div className="flex-1">

                      <h3
                        className="
                          font-['Fraunces']
                          text-2xl
                          font-medium
                          leading-tight
                          tracking-[-0.02em]
                          text-[#0B3C49]
                          transition-transform
                          duration-500
                          group-hover:translate-x-1
                          sm:text-3xl
                        "
                      >
                        {title}
                      </h3>

                      {description && (
                        <p
                          className="
                            mt-3
                            max-w-md
                            font-['Inter']
                            text-sm
                            leading-6
                            text-[#64787C]
                          "
                        >
                          {description}
                        </p>
                      )}

                    </div>


                    {/* ARROW */}

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#124D56]/15
                        text-[#124D56]/50
                        transition-all
                        duration-400
                        group-hover:border-[#F58634]
                        group-hover:bg-[#F58634]
                        group-hover:text-[#0B3C49]
                      "
                    >
                      <ArrowUpRight
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
                          group-hover:rotate-12
                        "
                      />
                    </span>

                  </div>

                </motion.div>

              );
            })}

            {/* FINAL BORDER */}

            <div className="border-t border-[#124D56]/15" />

          </div>

        </div>


        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-[#124D56]/10
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p
            className="
              font-['Inter']
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#6B858A]
            "
          >
            Experiences worth remembering
          </p>

          <p
            className="
              font-['Inter']
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-[#6B858A]
            "
          >
            Curated by Times India Travels
          </p>

        </motion.div>

      </div>

    </section>
  );
}