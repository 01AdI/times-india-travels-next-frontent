"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function TourPackage_Sub_Itinerary({
  tour,
  sectionNumber = "03",
}) {
  const itinerary = tour?.itinerary || [];

  const [activeDay, setActiveDay] = useState(
    itinerary.length > 0 ? itinerary[0].day : null
  );

  if (!itinerary.length) {
    return null;
  }

  const toggleDay = (day) => {
    setActiveDay((current) => (current === day ? null : day));
  };

  return (
    <section className="relative overflow-hidden bg-[#124D56] px-6 py-20 sm:px-10 md:px-16 lg:px-20 lg:py-28">
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#F58634]/[0.07]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.025]
          blur-3xl
        "
      />

      {/* Large background number */}

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="
          pointer-events-none
          absolute
          -right-8
          top-[-30px]
          select-none
          font-['Fraunces']
          text-[220px]
          font-medium
          leading-none
          tracking-[-0.08em]
          text-white/[0.035]
          sm:text-[300px]
          md:text-[380px]
          lg:text-[460px]
        "
      >
        {sectionNumber}
      </motion.div>

      <div className="relative mx-auto max-w-[1300px]">
        {/* =========================================================
            SECTION HEADER
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-start justify-between gap-8"
        >
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-4">
              <span
                className="
                  font-['Fraunces']
                  text-xl
                  italic
                  text-[#F58634]
                "
              >
                {sectionNumber}
              </span>

              <span className="h-px w-12 bg-white/20 sm:w-16" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-white/60
                "
              >
                The Itinerary
              </span>
            </div>

            <div className="mt-8">
              <p
                className="
                  mb-4
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Your days, thoughtfully planned
              </p>

              <h2
                className="
                  max-w-3xl
                  font-['Fraunces']
                  text-4xl
                  font-medium
                  leading-[0.95]
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  md:text-6xl
                "
              >
                One journey.
                <span className="block italic text-[#F58634]">
                  Six memorable days.
                </span>
              </h2>
            </div>
          </div>

          {/* RIGHT */}

          <div className="hidden pt-1 text-right md:block">
            <p
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-white/40
              "
            >
              {itinerary.length} Days
            </p>

            <p
              className="
                mt-2
                max-w-[190px]
                font-['Fraunces']
                text-sm
                italic
                leading-6
                text-white/50
              "
            >
              Follow the journey one day at a time.
            </p>
          </div>
        </motion.div>

        {/* =========================================================
            INTRO LINE
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="
            mb-10
            flex
            items-center
            gap-4
            border-b
            border-white/10
            pb-6
          "
        >
          <MapPin
            className="h-4 w-4 text-[#F58634]"
            strokeWidth={1.5}
          />

          <p
            className="
              font-['Inter']
              text-xs
              leading-6
              text-white/50
              sm:text-sm
            "
          >
            Every day brings a new chapter, from historic cities and
            architectural masterpieces to moments of leisure along the way.
          </p>
        </motion.div>

        {/* =========================================================
            ITINERARY GRID
        ========================================================== */}

        <div className="grid gap-4 md:grid-cols-2">
          {itinerary.map((day, index) => {
            const isActive = activeDay === day.day;

            return (
              <motion.div
                key={day.day || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                }}
                className="relative"
              >
                <motion.button
                  type="button"
                  onClick={() => toggleDay(day.day)}
                  whileHover={{ y: -2 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-[18px]
                    border
                    text-left
                    transition-all
                    duration-500
                    ${
                      isActive
                        ? "border-[#F58634]/50 bg-[#F2FAFB]"
                        : "border-white/10 bg-white/[0.055] hover:border-white/20 hover:bg-white/[0.08]"
                    }
                  `}
                >
                  {/* Orange active line */}

                  <motion.div
                    initial={false}
                    animate={{
                      scaleY: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ transformOrigin: "top" }}
                    className="
                      absolute
                      bottom-0
                      left-0
                      top-0
                      w-[3px]
                      bg-[#F58634]
                    "
                  />

                  <div className="p-5 sm:p-6">
                    {/* =================================================
                        CARD HEADER
                    ================================================== */}

                    <div className="flex items-center gap-5">
                      {/* DAY NUMBER */}

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "border-[#F58634] bg-[#F58634]"
                              : "border-white/20 bg-transparent"
                          }
                        `}
                      >
                        <span
                          className={`
                            font-['Inter']
                            text-[10px]
                            font-bold
                            tracking-[0.05em]
                            ${
                              isActive
                                ? "text-[#0B3C49]"
                                : "text-[#F58634]"
                            }
                          `}
                        >
                          {String(day.day).padStart(2, "0")}
                        </span>
                      </div>

                      {/* TITLE */}

                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            mb-1
                            font-['Inter']
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            transition-colors
                            duration-300
                            ${
                              isActive
                                ? "text-[#124D56]/50"
                                : "text-white/35"
                            }
                          `}
                        >
                          Day {String(day.day).padStart(2, "0")}
                        </p>

                        <h3
                          className={`
                            font-['Fraunces']
                            text-xl
                            font-medium
                            tracking-[-0.02em]
                            transition-colors
                            duration-300
                            sm:text-2xl
                            ${
                              isActive
                                ? "text-[#0B3C49]"
                                : "text-white"
                            }
                          `}
                        >
                          {day.title}
                        </h3>
                      </div>

                      {/* ARROW */}

                      <motion.div
                        animate={{
                          rotate: isActive ? 90 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "border-[#124D56]/10 bg-[#124D56]/[0.05]"
                              : "border-white/10"
                          }
                        `}
                      >
                        <ArrowRight
                          className={`
                            h-3.5
                            w-3.5
                            ${
                              isActive
                                ? "text-[#F58634]"
                                : "text-white/40"
                            }
                          `}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </div>

                    {/* =================================================
                        EXPANDED CONTENT
                    ================================================== */}

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            height: {
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            opacity: {
                              duration: 0.25,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[64px] pt-5 sm:ml-[64px]">
                            <div className="mb-5 h-px w-full bg-[#124D56]/10" />

                            <p
                              className="
                                max-w-2xl
                                font-['Inter']
                                text-sm
                                leading-7
                                text-[#536D72]
                                sm:text-[15px]
                              "
                            >
                              {day.description}
                            </p>

                            {/* Small footer */}

                            <div className="mt-6 flex items-center gap-3">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />

                              <span
                                className="
                                  font-['Inter']
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.25em]
                                  text-[#124D56]/60
                                "
                              >
                                Day {String(day.day).padStart(2, "0")} ·{" "}
                                {day.title}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            MOBILE / INTERACTION HINT
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#F58634]/50" />

          <span
            className="
              font-['Inter']
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Select a day to explore
          </span>
        </motion.div>

        {/* =========================================================
            CUSTOMIZATION NOTE
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="
            mt-14
            border-t
            border-white/10
            pt-8
            sm:mt-16
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* NOTE */}

            <div className="flex items-start gap-4">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#F58634]/30
                  bg-[#F58634]/[0.08]
                "
              >
                <Sparkles
                  className="h-4 w-4 text-[#F58634]"
                  strokeWidth={1.5}
                />
              </div>

              <p
                className="
                  max-w-3xl
                  font-['Fraunces']
                  text-base
                  italic
                  leading-6
                  text-white/65
                  sm:text-lg
                "
              >
                Every itinerary is just given for an idea; it can be
                customized as per your wish and convenience!!
              </p>
            </div>

            {/* RIGHT LABEL */}

            <div className="flex shrink-0 items-center gap-3 sm:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/45
                "
              >
                Your journey, your way
              </span>

              <ArrowDownRight
                className="h-4 w-4 text-[#F58634]"
                strokeWidth={1.4}
              />
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            BOTTOM EDITORIAL LINE
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="
            mt-12
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >
          <p
            className="
              font-['Fraunces']
              text-sm
              italic
              text-white/35
              sm:text-base
            "
          >
            Thoughtfully planned. Beautifully paced.
          </p>

          <span
            className="
              font-['Inter']
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/25
            "
          >
            Times India Travels
          </span>
        </motion.div>
      </div>
    </section>
  );
}