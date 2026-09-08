"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  ArrowDownRight,
  Moon,
} from "lucide-react";

export default function TourPackage_Sub_Itinerary_5({ tour }) {
  const itinerary = tour?.itinerary || [];

  if (!itinerary.length) return null;

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F2FAFB]
        px-5
        py-20
        sm:px-8
        md:px-12
        lg:px-20
        lg:py-28
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#F58634]/[0.045]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-48
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#124D56]/[0.04]
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1250px]">

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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
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
                leading-[0.96]
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

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p
              className="
                max-w-lg
                font-['Inter']
                text-sm
                leading-7
                text-[#536D72]
                lg:pb-1
              "
            >
              Follow your journey from one destination to the next,
              with every day carefully planned to make the most of
              your time in India.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-16 sm:mt-20">

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-8
              left-[27px]
              top-8
              hidden
              w-px
              bg-linear-to-b
              from-[#F58634]/50
              via-[#124D56]/15
              to-transparent
              sm:block
            "
          />

          <div className="space-y-6 sm:space-y-8">

            {itinerary.map((day, index) => {
              const dayNumber = String(
                day.day || index + 1
              ).padStart(2, "0");

              const title =
                day.title ||
                `Day ${day.day || index + 1}`;

              const description =
                day.description ||
                "Details for this day will be provided.";

              return (
                <motion.article
                  key={`${day.day}-${index}`}
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(index * 0.06, 0.35),
                  }}
                  className="group relative"
                >
                  <div className="grid gap-5 sm:grid-cols-[56px_1fr] sm:gap-7">

                    <div className="relative z-10 flex sm:block">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#124D56]/15
                          bg-[#F2FAFB]
                          font-['Fraunces']
                          text-lg
                          font-medium
                          text-[#124D56]
                          shadow-[0_8px_30px_rgba(18,77,86,0.06)]
                          transition-all
                          duration-300
                          group-hover:border-[#F58634]
                          group-hover:bg-[#F58634]
                          group-hover:text-white
                          group-hover:shadow-[0_10px_35px_rgba(245,134,52,0.2)]
                        "
                      >
                        {dayNumber}
                      </div>
                    </div>

                    <div
                      className="
                        relative
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#124D56]/10
                        bg-white
                        px-6
                        py-7
                        shadow-[0_12px_50px_rgba(18,77,86,0.045)]
                        transition-all
                        duration-500
                        group-hover:-translate-y-1
                        group-hover:border-[#F58634]/25
                        group-hover:shadow-[0_20px_60px_rgba(18,77,86,0.09)]
                        sm:px-8
                        sm:py-8
                        lg:px-10
                        lg:py-9
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          -right-8
                          -top-12
                          font-['Fraunces']
                          text-[170px]
                          leading-none
                          tracking-[-0.08em]
                          text-[#124D56]/[0.025]
                          transition-transform
                          duration-700
                          group-hover:translate-x-2
                        "
                      >
                        {dayNumber}
                      </div>

                      <div className="relative">

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={14}
                              strokeWidth={1.6}
                              className="text-[#F58634]"
                            />

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
                              Day {dayNumber}
                            </span>
                          </div>

                          <span className="h-1 w-1 rounded-full bg-[#124D56]/20" />

                          <div className="flex items-center gap-2">
                            <MapPin
                              size={14}
                              strokeWidth={1.6}
                              className="text-[#124D56]/45"
                            />

                            <span
                              className="
                                font-['Inter']
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-[#124D56]/50
                              "
                            >
                              {title}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-start justify-between gap-6">
                          <h3
                            className="
                              max-w-4xl
                              font-['Fraunces']
                              text-2xl
                              font-medium
                              leading-tight
                              tracking-[-0.025em]
                              text-[#0B3C49]
                              sm:text-3xl
                              lg:text-[34px]
                            "
                          >
                            {title}
                          </h3>

                          <div
                            className="
                              hidden
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#124D56]/10
                              text-[#124D56]/35
                              transition-all
                              duration-300
                              group-hover:border-[#F58634]/30
                              group-hover:bg-[#F58634]
                              group-hover:text-white
                              sm:flex
                            "
                          >
                            <ArrowDownRight
                              size={16}
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>

                        <div className="mt-6 h-px w-full bg-[#124D56]/[0.08]" />

                        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">

                          <p
                            className="
                              max-w-4xl
                              font-['Inter']
                              text-sm
                              leading-7
                              text-[#536D72]
                              sm:text-[15px]
                            "
                          >
                            {description}
                          </p>

                        </div>

                      </div>
                    </div>

                  </div>
                </motion.article>
              );
            })}

          </div>
        </div>

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
            sm:mt-16
            sm:pt-8
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

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
              Every itinerary is just an idea; it can be customized
              as per your wishes and convenience.
            </p>

            <span
              className="
                shrink-0
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#124D56]/40
              "
            >
              Your journey · Your way
            </span>

          </div>
        </motion.div>

      </div>
    </section>
  );
}