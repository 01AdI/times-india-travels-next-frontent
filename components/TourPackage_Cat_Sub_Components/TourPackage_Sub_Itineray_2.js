"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function TourPackage_Sub_Itinerary_2({ tour }) {
  const itinerary = tour?.itinerary || [];

  if (!itinerary.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] px-6 py-20 sm:px-10 md:px-16 lg:px-20 lg:py-28">
      {/* Decorative number */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-8
          top-0
          select-none
          font-['Fraunces']
          text-[220px]
          leading-none
          tracking-[-0.08em]
          text-[#124D56]/[0.035]
          sm:text-[300px]
          md:text-[400px]
        "
      >
        03
      </div>

      <div className="relative mx-auto max-w-[1300px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-['Fraunces'] text-xl italic text-[#F58634]">
            03
          </span>

          <span className="h-px w-14 bg-[#124D56]/20" />

          <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#124D56]">
            The Itinerary
          </span>
        </motion.div>

        {/* =====================================================
            INTRO
        ====================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
              Your journey, day by day
            </p>

            <h2
              className="
                max-w-3xl
                font-['Fraunces']
                text-4xl
                font-medium
                leading-[0.95]
                tracking-[-0.04em]
                text-[#0B3C49]
                sm:text-5xl
                md:text-6xl
              "
            >
              Six days.
              <span className="block italic text-[#F58634]">
                Countless stories.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="
              max-w-lg
              font-['Inter']
              text-sm
              leading-7
              text-[#536D72]
              md:text-base
            "
          >
            Each day has been thoughtfully arranged to give you
            enough time to discover the destination without rushing
            from one experience to another.
          </motion.p>

        </div>

        {/* =====================================================
            ITINERARY CARDS
        ====================================================== */}

        <div className="mt-16 space-y-4">

          {itinerary.map((day, index) => (
            <motion.article
              key={day.day || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-[#124D56]/10
                bg-white
                transition-all
                duration-500
                hover:border-[#124D56]/20
                hover:shadow-[0_25px_70px_rgba(18,77,86,0.08)]
              "
            >

              <div className="grid lg:grid-cols-[150px_1fr_auto]">

                {/* DAY */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    border-b
                    border-[#124D56]/10
                    px-6
                    py-6
                    lg:border-b-0
                    lg:border-r
                    lg:px-8
                  "
                >
                  <span
                    className="
                      font-['Fraunces']
                      text-5xl
                      leading-none
                      tracking-[-0.05em]
                      text-[#124D56]
                    "
                  >
                    {String(day.day).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#F58634]
                    "
                  >
                    Day
                  </span>
                </div>

                {/* CONTENT */}

                <div className="px-6 py-7 sm:px-8 lg:px-10">

                  <div className="mb-3 flex items-center gap-3">
                    <CalendarDays
                      className="h-4 w-4 text-[#F58634]"
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-[#71878B]
                      "
                    >
                      Day {day.day}
                    </span>
                  </div>

                  <h3
                    className="
                      font-['Fraunces']
                      text-2xl
                      font-medium
                      tracking-[-0.02em]
                      text-[#0B3C49]
                      sm:text-3xl
                    "
                  >
                    {day.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-3xl
                      font-['Inter']
                      text-sm
                      leading-7
                      text-[#71878B]
                    "
                  >
                    {day.description}
                  </p>

                </div>

                {/* ARROW */}

                <div
                  className="
                    hidden
                    items-center
                    justify-center
                    px-8
                    lg:flex
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#124D56]/10
                      transition-all
                      duration-300
                      group-hover:border-[#F58634]
                      group-hover:bg-[#F58634]
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        text-[#124D56]
                        transition-colors
                        group-hover:text-white
                      "
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

              </div>

              {/* Bottom accent */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-[#F58634]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

            </motion.article>
          ))}

        </div>

        {/* =====================================================
            CUSTOMIZATION NOTE
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-12
            border-t
            border-[#124D56]/10
            pt-7
          "
        >
          <p
            className="
              font-['Fraunces']
              text-base
              italic
              leading-7
              text-[#124D56]/65
              sm:text-lg
            "
          >
            Every Itinerary is just given for an idea; it can be
            customized as per your wish and convenience!!
          </p>
        </motion.div>

      </div>
    </section>
  );
}