"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, CalendarDays, ArrowDownRight } from "lucide-react";

// sectionNumber defaults to "01" but can be overridden — several other
// components on a tour page (e.g. the CTA) also hardcode "01", so this
// needs to be settable per-instance once assembled on the real page.
export default function TourPackage_Sub_Intro({ tour, sectionNumber = "01" }) {
  const route = tour?.route || [];
  const duration = tour?.duration || {};
  const itinerary = tour?.itinerary || [];

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-14 lg:py-15">

      {/* Decorative background numeral — now hidden from assistive tech */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -right-6 top-0 select-none font-['Fraunces'] text-[220px] font-medium leading-none tracking-[-0.08em] text-[#124D56]/[0.035] sm:text-[300px] md:text-[380px] lg:text-[460px]"
      >
        {sectionNumber}
      </motion.div>

      <div className="relative mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="mb-20 flex items-start justify-between sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <span aria-hidden="true" className="font-['Fraunces'] text-xl italic text-[#F58634]">
              {sectionNumber}
            </span>
            <span className="h-px w-12 bg-[#124D56]/20 sm:w-16" />
            <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.32em] text-[#124D56]">
              The Journey
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden text-right sm:block"
          >
            <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#124D56]/90">
              Curated India
            </p>
            <p className="mt-1 font-['Fraunces'] text-sm italic text-[#124D56]/60">
              A considered way to travel
            </p>
          </motion.div>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 xl:gap-32">
          <div 
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
              <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F58634]">
                Your route through India
              </p>
            </div>

            <h2 className="max-w-5xl font-['Fraunces'] text-[1.2rem] font-medium leading-[0.93] tracking-[0.055em] text-[#0B3C49] sm:text-6xl md:text-5xl lg:text-[3.8rem] xl:text-[4.5rem]">
              A journey through
              <span className="block italic text-cyan-600 text-[4.2rem]">
                India's iconic cities.
              </span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "250px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 h-0.5 bg-[#F58634]"
            />

            <p className="mt-8 max-w-xl font-['Inter'] text-sm leading-7 text-[#536D72] sm:text-base">
              From historic capitals to architectural masterpieces, this
              carefully composed route brings together the places that make
              India unforgettable.
            </p>
          </div>

          <div 
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-12 w-px bg-[#F58634]" />
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#124D56]/70">
                Designed around
                <br />
                the way you travel
              </span>
            </div>

            <p className="max-w-lg font-['Fraunces'] text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-[#0B3C49] sm:text-3xl">
              Discover India at a pace that leaves room for the details.
            </p>

            <p className="mt-6 max-w-lg font-['Inter'] text-sm leading-7 text-[#71878B] sm:text-[15px]">
              This itinerary connects remarkable cities, historic landmarks
              and unforgettable experiences into one thoughtfully paced
              journey.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#124D56]/15">
                <ArrowDownRight className="h-4 w-4 text-[#F58634]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.25em] text-[#124D56]/80">
                Follow the journey
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-24 sm:mt-28 lg:mt-32"
        >
          <div className="mb-10 flex items-end justify-between border-b border-[#124D56]/10 pb-5">
            <div>
              <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F58634]">
                The route
              </p>
              <h3 className="mt-2 font-['Fraunces'] text-2xl font-medium tracking-[-0.02em] text-[#0B3C49] sm:text-3xl">
                Where the story unfolds
              </h3>
            </div>
            <p className="hidden font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#124D56] sm:block">
              {route.length} destinations
            </p>
          </div>

          {/* DESKTOP ROUTE */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-[15px] h-px bg-[#124D56]/10" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute left-0 top-[15px] h-px w-full bg-[#F58634]"
              />

              <div className="relative flex justify-between gap-6">
                {route.map((place, index) => (
                  <motion.div
                    key={`${place}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.35 + index * 0.12 }}
                    className="flex max-w-[180px] flex-1 flex-col"
                  >
                    <div className="mb-7 flex items-center">
                      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#F58634] bg-[#F8F5EF]">
                        <span className="font-['Inter'] text-[10px] font-bold text-[#F58634]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <p className="font-['Fraunces'] text-xl font-medium leading-tight tracking-[-0.02em] text-[#0B3C49] lg:text-2xl">
                      {place}
                    </p>

                    <p className="mt-2 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#124D56]/40">
                      Stop {String(index + 1).padStart(2, "0")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE ROUTE */}
          <div className="md:hidden">
            <div className="relative ml-3 border-l border-[#124D56]/10 pl-8">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top" }}
                className="absolute bottom-0 left-[-1px] top-0 w-px bg-[#F58634]"
              />

              <div className="space-y-9">
                {route.map((place, index) => (
                  <motion.div
                    key={`${place}-${index}`}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[43px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#F58634] bg-[#F8F5EF]">
                      <span className="text-[9px] font-bold text-[#F58634]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="font-['Fraunces'] text-2xl font-medium tracking-[-0.02em] text-[#0B3C49]">
                      {place}
                    </p>

                    <p className="mt-1 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#124D56]/40">
                      Stop {String(index + 1).padStart(2, "0")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-24 border-t border-[#124D56]/10 pt-8 sm:mt-28 lg:mt-32"
        >
          <div className="grid grid-cols-1 divide-y divide-[#124D56]/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="group py-7 sm:py-4 sm:pr-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#124D56]/90">
                    Duration
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-['Fraunces'] text-4xl font-medium tracking-[-0.04em] text-[#0B3C49] sm:text-5xl">
                      {duration.days || 0}
                    </span>
                    <span className="font-['Fraunces'] text-base italic text-[#F58634]">days</span>
                  </div>
                  <p className="mt-2 font-['Inter'] text-[10px] text-[#71878B]">
                    {duration.label || "Journey duration"}
                  </p>
                </div>
                <Clock className="h-5 w-5 text-[#F58634]/70" strokeWidth={1.4} aria-hidden="true" />
              </div>
            </div>

            <div className="group py-7 sm:px-10 sm:py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#124D56]/90">
                    Destinations
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-['Fraunces'] text-4xl font-medium tracking-[-0.04em] text-[#0B3C49] sm:text-5xl">
                      {route.length}
                    </span>
                    <span className="font-['Fraunces'] text-base italic text-[#F58634]">stops</span>
                  </div>
                  <p className="mt-2 font-['Inter'] text-[10px] text-[#71878B]">
                    Places woven into the journey
                  </p>
                </div>
                <MapPin className="h-5 w-5 text-[#F58634]/70" strokeWidth={1.4} aria-hidden="true" />
              </div>
            </div>

            <div className="group py-7 sm:py-4 sm:pl-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#124D56]/90">
                    Itinerary
                  </p>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-['Fraunces'] text-4xl font-medium tracking-[-0.04em] text-[#0B3C49] sm:text-5xl">
                      {itinerary.length || duration.days || 0}
                    </span>
                    <span className="font-['Fraunces'] text-base italic text-[#F58634]">days planned</span>
                  </div>
                  <p className="mt-2 font-['Inter'] text-[10px] text-[#71878B]">
                    Thoughtfully paced exploration
                  </p>
                </div>
                <CalendarDays className="h-5 w-5 text-[#F58634]/70" strokeWidth={1.4} aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 flex flex-col gap-6 border-t border-[#124D56]/10 pt-8 sm:mt-24 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-['Fraunces'] text-lg italic text-[#124D56]/70 sm:text-xl">
            Thoughtfully planned. Beautifully paced.
          </p>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
            <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#124D56]">
              Ready to explore
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}