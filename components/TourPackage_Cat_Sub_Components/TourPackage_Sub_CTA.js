"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import TourPackage_Enquiry_Form from "../TourPackages_Components/TourPackage_Enquiry_Form";

export default function TourPackage_Sub_CTA({ tour }) {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  return (
    <>
    <section className="relative overflow-hidden bg-[#0B3C49] py-13 sm:py-13 md:py-14 lg:py-15">
      {/* =========================================================
          AMBIENT GLOW
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#F58634]/[0.08]
          blur-[120px]
          sm:h-[700px]
          sm:w-[700px]
        "
      />

      {/* =========================================================
          DECORATIVE RINGS
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.04]
          sm:h-[700px]
          sm:w-[700px]
          lg:h-[850px]
          lg:w-[850px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[300px]
          w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#F58634]/[0.08]
          sm:h-[450px]
          sm:w-[450px]
        "
      />


      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-[1100px] px-6 text-center sm:px-10">
        {/* =======================================================
            EYEBROW
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="h-px w-10 bg-cyan-500/50" />

          <div className="flex items-center gap-2">
            <Sparkles
              className="h-3.5 w-3.5 text-cyan-300"
              strokeWidth={1.5}
            />

            <span
              className="
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-cyan-300
              "
            >
              Begin Your Journey
            </span>
          </div>

          <span className="h-px w-10 bg-cyan-500/50" />
        </motion.div>

        {/* =======================================================
            HEADING
        ======================================================== */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-10
            max-w-4xl
            font-['Fraunces']
            text-5xl
            font-medium
            leading-[0.92]
            tracking-[-0.055em]
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-[92px]
          "
        >
          Your next
          <span className="block italic text-cyan-500">
            adventure starts here.
          </span>
        </motion.h2>

        {/* =======================================================
            DESCRIPTION
        ======================================================== */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="
            mx-auto
            mt-8
            max-w-xl
            font-['Inter']
            text-sm
            leading-7
            text-white/50
            sm:text-base
          "
        >
          Tell us when you'd like to travel and we'll turn this itinerary into
          your own unforgettable Indian journey.
        </motion.p>

        {/* =======================================================
            CTA
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            onClick={() => setQuoteFormOpen(true)}
            className="
    group
    relative
    flex
    w-full
    max-w-[420px]
    items-center
    justify-between
    overflow-hidden
    rounded-full
    border
    border-[#F58634]
    bg-[#F58634]
    p-2
    pl-7
    shadow-[0_15px_50px_rgba(245,134,52,0.18)]
    transition-all
    duration-500
    hover:scale-[1.025]
    hover:shadow-[0_20px_70px_rgba(245,134,52,0.30)]
    sm:pl-9
    cursor-pointer
  "
          >
            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-32
                w-24
                skew-x-[-20deg]
                bg-white/30
                blur-sm
                transition-all
                duration-1000
                group-hover:left-[120%]
              "
            />

            {/* =================================================
                TEXT
            ================================================== */}

            <span className="relative z-10 text-left">
              <span
                className="
                  block
                  font-['Inter']
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-white
                "
              >
                Let's make it happen
              </span>

              <span
                className="
                  mt-0.5
                  block
                  font-['Fraunces']
                  text-xl
                  font-medium
                  tracking-[-0.02em]
                  text-white
                  sm:text-2xl
                "
              >
                Request Your Quote
              </span>
            </span>

            {/* =================================================
                ARROW CIRCLE
            ================================================== */}

            <span
              className="
                relative
                z-10
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#0B3C49]
                transition-all
                duration-500
                group-hover:rotate-[-8deg]
                group-hover:bg-white
                sm:h-16
                sm:w-16
              "
            >
              <ArrowUpRight
                className="
                  h-5
                  w-5
                  text-white
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:text-[#0B3C49]
                "
                strokeWidth={1.7}
              />
            </span>
          </button>
        </motion.div>

        {/* =======================================================
            TRUST DETAILS
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
          "
        >
          <span
            className="
              font-['Inter']
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-300
            "
          >
            Personalised itinerary
          </span>

          <span className="h-1 w-1 rounded-full bg-[#F58634]/50" />

          <span
            className="
              font-['Inter']
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-300
            "
          >
            Expert guidance
          </span>

          <span className="h-1 w-1 rounded-full bg-[#F58634]/50" />

          <span
            className="
              font-['Inter']
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-300
            "
          >
            No obligation
          </span>
        </motion.div>
      </div>
    </section>
    {quoteFormOpen && (
      <TourPackage_Enquiry_Form
        onClose={() => setQuoteFormOpen(false)}
        info={tour}
      />
    )}
    </>
  );
}
