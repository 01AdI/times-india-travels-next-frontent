"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

export default function TourPackage_Sub_Itinerary_4({ tour }) {
  const itinerary = tour?.itinerary || [];

  const [activeDay, setActiveDay] = useState(0);

  if (!itinerary.length) return null;

  const active = itinerary[activeDay];

  const goPrevious = () => {
    setActiveDay((prev) =>
      prev === 0 ? itinerary.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveDay((prev) =>
      prev === itinerary.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F2FAFB]
        px-6
        py-13
        sm:px-10
        md:px-16
        lg:px-20
        lg:py-15
      "
    >

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#F58634]/[0.035]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#124D56]/[0.035]
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1300px]">

        {/* =====================================================
            SECTION LABEL
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <span className="font-['Fraunces'] text-xl italic text-[#F58634]">
            02
          </span>

          <span className="h-px w-14 bg-[#124D56]/20" />

          <span
            className="
              font-['Inter']
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#124D56]
            "
          >
            The Itinerary
          </span>
        </motion.div>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <p
              className="
                mb-5
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#F58634]
              "
            >
              Your journey, one day at a time
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
              Every day has
              <span className="block italic text-[#F58634]">
                its own story.
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
              lg:pb-1
            "
          >
            Follow the journey day by day and discover how each
            destination fits into the larger story of your trip.
          </motion.p>

        </div>

        {/* =====================================================
            HORIZONTAL DAY SELECTOR
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14"
        >

          <div className="relative">

            {/* Background line */}

            <div
              className="
                absolute
                left-0
                right-0
                top-[22px]
                hidden
                h-px
                bg-[#124D56]/10
                sm:block
              "
            />

            {/* Active line */}

            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${((activeDay + 1) / itinerary.length) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                absolute
                left-0
                top-[22px]
                hidden
                h-px
                bg-[#F58634]
                sm:block
              "
            />

            <div
              className="
                relative
                flex
                overflow-x-auto
                pb-2
                sm:justify-between
                sm:overflow-visible
              "
            >

              {itinerary.map((day, index) => {

                const isActive = index === activeDay;

                return (
                  <button
                    key={day.day || index}
                    onClick={() => setActiveDay(index)}
                    className="
                      group
                      relative
                      flex
                      min-w-[95px]
                      flex-1
                      flex-col
                      items-center
                      px-3
                      text-center
                      sm:min-w-0
                    "
                  >

                    {/* Number */}

                    <span
                      className={`
                        relative
                        z-10
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "border-[#F58634] bg-[#F58634] text-white shadow-[0_8px_25px_rgba(245,134,52,0.25)]"
                            : "border-[#124D56]/15 bg-[#F2FAFB] text-[#124D56]/50 hover:border-[#F58634] hover:text-[#F58634]"
                        }
                      `}
                    >
                      {String(day.day).padStart(2, "0")}
                    </span>

                    {/* Title */}

                    <span
                      className={`
                        mt-4
                        whitespace-nowrap
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        transition-colors
                        ${
                          isActive
                            ? "text-[#124D56]"
                            : "text-[#124D56]/40"
                        }
                      `}
                    >
                      {day.title}
                    </span>

                  </button>
                );
              })}

            </div>

          </div>

        </motion.div>

        {/* =====================================================
            ACTIVE DAY PANEL
        ====================================================== */}

        <div className="mt-10">

          <AnimatePresence mode="wait">

            <motion.article
              key={active.day}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-[#124D56]
                shadow-[0_25px_80px_rgba(18,77,86,0.12)]
              "
            >

              {/* Large background day */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-5
                  -top-20
                  select-none
                  font-['Fraunces']
                  text-[260px]
                  leading-none
                  tracking-[-0.08em]
                  text-white/[0.035]
                "
              >
                {String(active.day).padStart(2, "0")}
              </div>

              <div
                className="
                  relative
                  grid
                  lg:grid-cols-[220px_1fr]
                "
              >

                {/* =================================================
                    DAY COLUMN
                ================================================== */}

                <div
                  className="
                    border-b
                    border-white/10
                    px-7
                    py-8
                    lg:border-b-0
                    lg:border-r
                    lg:px-10
                    lg:py-12
                  "
                >

                  <p
                    className="
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-white/40
                    "
                  >
                    Day
                  </p>

                  <p
                    className="
                      mt-3
                      font-['Fraunces']
                      text-7xl
                      leading-none
                      tracking-[-0.06em]
                      text-cyan-500
                      sm:text-8xl
                    "
                  >
                    {String(active.day).padStart(2, "0")}
                  </p>

                  <div className="mt-7 flex items-center gap-2">

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
                        tracking-[0.2em]
                        text-white/40
                      "
                    >
                      Day {active.day} of {itinerary.length}
                    </span>

                  </div>

                </div>

                {/* =================================================
                    DAY CONTENT
                ================================================== */}

                <div className="flex flex-col px-7 py-9 sm:px-10 sm:py-12 lg:px-14">

                  <div className="flex items-center gap-3">

                    <span className="h-px w-8 bg-cyan-300" />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-cyan-300
                      "
                    >
                      Your experience
                    </span>

                  </div>

                  <div className="mt-6 flex items-center gap-3">

                    <MapPin
                      className="h-4 w-4 text-white/45"
                      strokeWidth={1.5}
                    />

                    <span
                      className="
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white/50
                      "
                    >
                      {active.title}
                    </span>

                  </div>

                  <h3
                    className="
                      mt-4
                      max-w-3xl
                      font-['Fraunces']
                      text-3xl
                      font-medium
                      leading-tight
                      tracking-[-0.03em]
                      text-white
                      sm:text-4xl
                      md:text-5xl
                    "
                  >
                    {active.title}
                  </h3>

                  <p
                    className="
                      mt-6
                      max-w-3xl
                      font-['Inter']
                      text-sm
                      leading-7
                      text-white/65
                      sm:text-[15px]
                    "
                  >
                    {active.description}
                  </p>

                  {/* =================================================
                      NAVIGATION
                  ================================================== */}

                  <div
                    className="
                      mt-10
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/10
                      pt-6
                    "
                  >

                    <button
                      onClick={goPrevious}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-white/45
                        transition-colors
                        hover:text-white
                      "
                    >

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          transition-all
                          group-hover:border-[#F58634]
                        "
                      >
                        <ArrowLeft
                          className="h-3.5 w-3.5"
                          strokeWidth={1.5}
                        />
                      </span>

                      <span className="hidden sm:block">
                        Previous
                      </span>

                    </button>

                    <span
                      className="
                        font-['Fraunces']
                        text-sm
                        italic
                        text-white/30
                      "
                    >
                      {String(active.day).padStart(2, "0")} /{" "}
                      {String(itinerary.length).padStart(2, "0")}
                    </span>

                    <button
                      onClick={goNext}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-white/45
                        transition-colors
                        hover:text-white
                      "
                    >

                      <span className="hidden sm:block">
                        Next
                      </span>

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          transition-all
                          group-hover:border-[#F58634]
                        "
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          strokeWidth={1.5}
                        />
                      </span>

                    </button>

                  </div>

                </div>

              </div>

            </motion.article>

          </AnimatePresence>

        </div>

        {/* =====================================================
            CUSTOMIZATION NOTE
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            mt-10
            flex
            flex-col
            gap-4
            border-t
            border-[#124D56]/10
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p
            className="
              max-w-3xl
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

          <span
            className="
              shrink-0
              font-['Inter']
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#124D56]/45
            "
          >
            Your journey · Your way
          </span>

        </motion.div>

      </div>
    </section>
  );
}