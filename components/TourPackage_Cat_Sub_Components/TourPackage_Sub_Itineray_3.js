"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

export default function TourPackage_Sub_Itinerary_3({ tour }) {
  const itinerary = tour?.itinerary || [];

  const [activeDay, setActiveDay] = useState(0);

  if (!itinerary.length) return null;

  const active = itinerary[activeDay];

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] px-6 py-20 sm:px-10 md:px-16 lg:px-20 lg:py-28">

      <div className="relative mx-auto max-w-[1300px]">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-center gap-4"
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
            TITLE
        ====================================================== */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

          <div>
            <p className="mb-4 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
              Explore the journey
            </p>

            <h2
              className="
                font-['Fraunces']
                text-4xl
                font-medium
                leading-none
                tracking-[-0.04em]
                text-[#0B3C49]
                sm:text-5xl
              "
            >
              Your days in India.
            </h2>
          </div>

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#124D56]/50">
            {itinerary.length} days
          </p>

        </div>

        {/* =====================================================
            DAY SELECTOR
        ====================================================== */}

        <div
          className="
            mt-12
            overflow-x-auto
            border-y
            border-[#124D56]/10
          "
        >
          <div className="flex min-w-max">

            {itinerary.map((day, index) => {

              const isActive = index === activeDay;

              return (
                <button
                  key={day.day || index}
                  onClick={() => setActiveDay(index)}
                  className={`
                    group
                    relative
                    flex
                    min-w-[110px]
                    flex-1
                    flex-col
                    items-start
                    px-5
                    py-6
                    text-left
                    transition-all
                    duration-300
                    sm:min-w-[140px]
                    sm:px-7
                    ${isActive
                      ? "bg-[#124D56]"
                      : "bg-transparent hover:bg-white"
                    }
                  `}
                >

                  <span
                    className={`
                      font-['Fraunces']
                      text-3xl
                      leading-none
                      ${isActive
                        ? "text-white"
                        : "text-[#124D56]/30"
                      }
                    `}
                  >
                    {String(day.day).padStart(2, "0")}
                  </span>

                  <span
                    className={`
                      mt-3
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      ${
                        isActive
                          ? "text-[#F58634]"
                          : "text-[#124D56]/50"
                      }
                    `}
                  >
                    Day {day.day}
                  </span>

                  <span
                    className={`
                      mt-1
                      max-w-[100px]
                      truncate
                      font-['Inter']
                      text-[10px]
                      ${
                        isActive
                          ? "text-white/60"
                          : "text-[#71878B]"
                      }
                    `}
                  >
                    {day.title}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="activeDayLine"
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        h-[2px]
                        bg-[#F58634]
                      "
                    />
                  )}

                </button>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            ACTIVE DAY
        ====================================================== */}

        <div className="mt-10">

          <AnimatePresence mode="wait">

            <motion.div
              key={active.day}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-[#124D56]
                px-7
                py-9
                sm:px-10
                sm:py-11
                lg:px-14
                lg:py-14
              "
            >

              {/* Decorative number */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-5
                  -top-12
                  font-['Fraunces']
                  text-[220px]
                  leading-none
                  text-white/[0.035]
                "
              >
                {String(active.day).padStart(2, "0")}
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[0.3fr_1fr]">

                {/* DAY */}

                <div>

                  <p
                    className="
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-white/45
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
                      tracking-[-0.05em]
                      text-[#F58634]
                    "
                  >
                    {String(active.day).padStart(2, "0")}
                  </p>

                </div>

                {/* CONTENT */}

                <div>

                  <div className="flex items-center gap-3">

                    <MapPin
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
                        text-white/50
                      "
                    >
                      {active.title}
                    </span>

                  </div>

                  <h3
                    className="
                      mt-5
                      max-w-3xl
                      font-['Fraunces']
                      text-3xl
                      font-medium
                      leading-tight
                      tracking-[-0.03em]
                      text-white
                      sm:text-4xl
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

                  <div className="mt-8 flex items-center gap-3">

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
                        text-white/50
                      "
                    >
                      Day {active.day} of {itinerary.length}
                    </span>

                  </div>

                </div>

              </div>

              {/* NEXT */}

              {activeDay < itinerary.length - 1 && (
                <button
                  onClick={() => setActiveDay(activeDay + 1)}
                  className="
                    relative
                    mt-10
                    flex
                    items-center
                    gap-3
                    border-t
                    border-white/10
                    pt-6
                    font-['Inter']
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white/50
                    transition-colors
                    hover:text-white
                  "
                >
                  Next day

                  <ArrowRight
                    className="h-4 w-4 text-[#F58634]"
                    strokeWidth={1.5}
                  />
                </button>
              )}

            </motion.div>

          </AnimatePresence>

        </div>

        {/* NOTE */}

        <p
          className="
            mt-10
            border-t
            border-[#124D56]/10
            pt-6
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

      </div>
    </section>
  );
}