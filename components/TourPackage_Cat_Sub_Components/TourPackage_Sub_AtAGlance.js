"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function TourPackage_Sub_AtAGlance({ tour }) {
  const route = tour.route || [];
  const itinerary = tour.itinerary || [];

  const uniquePlaces = [...new Set(route)];

  const durationLabel =
    tour.duration?.label ||
    `${tour.duration?.days || 0} Days / ${tour.duration?.nights || 0} Nights`;

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] px-6 py-20 sm:px-10 md:px-16 lg:px-20 lg:py-28">

      {/* =====================================================
          DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -right-40 top-10 h-[450px] w-[450px] rounded-full bg-[#F58634]/[0.05] blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#124D56]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-[1300px]">

        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-center gap-4"
        >
          <span className="font-['Fraunces'] text-xl text-[#F58634]">
            02
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
            Journey Overview
          </span>
        </motion.div>

        {/* =================================================
            INTRO
        ================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2
              className="
                max-w-4xl
                font-['Fraunces']
                text-4xl
                font-medium
                leading-[1]
                tracking-[-0.04em]
                text-[#0B3C49]
                sm:text-5xl
                md:text-6xl
              "
            >
              A journey through
              <span className="block italic text-[#F58634]">
                India's iconic cities.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="
              max-w-xl
              font-['Inter']
              text-sm
              leading-7
              text-[#536D72]
              md:text-base
            "
          >
            From historic capitals and Mughal architecture to
            royal palaces and hilltop forts, this carefully planned
            journey brings together the defining experiences of
            the route.
          </motion.p>

        </div>

        {/* =================================================
            QUICK STATS
        ================================================== */}

        <div
          className="
            mt-16
            grid
            border-y
            border-[#124D56]/10
            sm:grid-cols-3
          "
        >

          {/* DURATION */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              flex
              items-center
              gap-5
              border-b
              border-[#124D56]/10
              px-2
              py-8
              sm:border-b-0
              sm:border-r
              sm:px-8
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#124D56]/[0.07]
              "
            >
              <Clock3 className="h-5 w-5 text-[#F58634]" />
            </div>

            <div>
              <p
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#71878B]
                "
              >
                Duration
              </p>

              <p
                className="
                  mt-2
                  font-['Fraunces']
                  text-2xl
                  text-[#0B3C49]
                "
              >
                {durationLabel}
              </p>
            </div>

          </motion.div>

          {/* PLACES */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.08,
            }}
            className="
              flex
              items-center
              gap-5
              border-b
              border-[#124D56]/10
              px-2
              py-8
              sm:border-b-0
              sm:border-r
              sm:px-8
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#124D56]/[0.07]
              "
            >
              <MapPin className="h-5 w-5 text-[#F58634]" />
            </div>

            <div>
              <p
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#71878B]
                "
              >
                Destinations
              </p>

              <p
                className="
                  mt-2
                  font-['Fraunces']
                  text-2xl
                  text-[#0B3C49]
                "
              >
                {uniquePlaces.length} Places
              </p>
            </div>

          </motion.div>

          {/* ITINERARY */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.16,
            }}
            className="
              flex
              items-center
              gap-5
              px-2
              py-8
              sm:px-8
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#124D56]/[0.07]
              "
            >
              <CalendarDays className="h-5 w-5 text-[#F58634]" />
            </div>

            <div>
              <p
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#71878B]
                "
              >
                Itinerary
              </p>

              <p
                className="
                  mt-2
                  font-['Fraunces']
                  text-2xl
                  text-[#0B3C49]
                "
              >
                {itinerary.length} Days Planned
              </p>
            </div>

          </motion.div>

        </div>

        {/* =================================================
            ROUTE
        ================================================== */}

        {route.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >

            <div className="mb-7 flex items-center justify-between">

              <div>
                <p
                  className="
                    font-['Inter']
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#71878B]
                  "
                >
                  Your Route
                </p>

                <h3
                  className="
                    mt-2
                    font-['Fraunces']
                    text-2xl
                    text-[#0B3C49]
                    sm:text-3xl
                  "
                >
                  From Delhi and back again
                </h3>
              </div>

              <span
                className="
                  hidden
                  font-['Inter']
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-[#124D56]/40
                  sm:block
                "
              >
                {route.length} Stops
              </span>

            </div>

            <div
              className="
                overflow-x-auto
                rounded-[22px]
                border
                border-[#124D56]/10
                bg-white
                p-6
                shadow-[0_15px_50px_rgba(18,77,86,0.04)]
              "
            >

              <div className="flex min-w-max items-center">

                {route.map((place, index) => (

                  <div
                    key={`${place}-${index}`}
                    className="flex items-center"
                  >

                    <div className="flex items-center gap-3">

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-[#124D56]
                          font-['Inter']
                          text-[9px]
                          font-semibold
                          text-white
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          font-['Inter']
                          text-xs
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-[#0B3C49]
                        "
                      >
                        {place}
                      </span>

                    </div>

                    {index < route.length - 1 && (
                      <div className="mx-5 flex items-center">

                        <span className="h-px w-10 bg-[#F58634]/40" />

                        <ArrowRight className="h-3 w-3 text-[#F58634]" />

                      </div>
                    )}

                  </div>

                ))}

              </div>

            </div>

          </motion.div>
        )}

        {/* =================================================
            ITINERARY PREVIEW
        ================================================== */}

        {itinerary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >

            <div className="mb-7 flex items-end justify-between gap-6">

              <div>

                <p
                  className="
                    font-['Inter']
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#71878B]
                  "
                >
                  At A Glance
                </p>

                <h3
                  className="
                    mt-2
                    font-['Fraunces']
                    text-2xl
                    text-[#0B3C49]
                    sm:text-3xl
                  "
                >
                  A day-by-day journey
                </h3>

              </div>

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-[#124D56]/40
                "
              >
                {itinerary.length} Days
              </span>

            </div>

            <div className="grid gap-px overflow-hidden rounded-[22px] border border-[#124D56]/10 bg-[#124D56]/10 md:grid-cols-2">

              {itinerary.map((day, index) => (

                <motion.div
                  key={day.day || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    bg-white
                    p-6
                    transition-colors
                    duration-300
                    hover:bg-[#124D56]
                    cursor-pointer
                  "
                >

                  <div className="flex gap-5">

                    <span
                      className="
                        font-['Fraunces']
                        text-2xl
                        text-[#F58634]
                        transition-colors
                        group-hover:text-[#F58634]
                      "
                    >
                      {String(day.day).padStart(2, "0")}
                    </span>

                    <div>

                      <h4
                        className="
                          font-['Fraunces']
                          text-xl
                          text-[#0B3C49]
                          transition-colors
                          duration-300
                          group-hover:text-white
                        "
                      >
                        {day.title}
                      </h4>

                      <p
                        className="
                          mt-2
                          font-['Inter']
                          text-xs
                          leading-6
                          text-[#71878B]
                          transition-colors
                          duration-300
                          group-hover:text-white/65
                        "
                      >
                        {day.description}
                      </p>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>
        )}

      </div>

    </section>
  );
}