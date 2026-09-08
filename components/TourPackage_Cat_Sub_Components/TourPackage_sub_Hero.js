"use client";

import { Clock, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function TourPackage_Sub_Hero({ tour }) {
  return (
    <section
      className="
        relative
        h-[520px]
        overflow-hidden
        sm:h-[600px]
        md:h-[680px]
        hero-section
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        src={tour.thumbnail}
        alt={tour.name}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* =====================================================
          CINEMATIC OVERLAYS
      ====================================================== */}

      <div className="absolute inset-0 bg-black/40" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/65
          via-black/25
          to-black/20
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/75
          via-transparent
          to-black/25
        "
      />

      {/* =====================================================
          SIDE NUMBER / LABEL
      ====================================================== */}

      <div
        className="
          absolute
          left-6
          top-1/2
          hidden
          -translate-y-1/2
          md:block
        "
      >
        <div className="flex flex-col items-center gap-4">
          <span className="h-16 w-px bg-white/30" />

          <span
            className="
              font-['Inter']
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/60
              [writing-mode:vertical-rl]
            "
          >
            Explore India
          </span>

          <span className="h-16 w-px bg-white/30" />
        </div>
      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          max-w-[1500px]
          items-end
          px-6
          pb-24
          sm:px-10
          md:px-16
          lg:px-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 55,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl"
        >
          {/* =================================================
              EYEBROW
          ================================================== */}

          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-[#F58634]" />

            <p
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#F58634]
              "
            >
              {tour.categorySlug}
            </p>
          </div>

          {/* =================================================
              TITLE
          ================================================== */}

          <h1
            className="
              font-['Fraunces']
              text-5xl
              font-medium
              leading-[0.94]
              tracking-[-0.045em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-[92px]
            "
          >
            {tour.name}
          </h1>

          {/* =================================================
              BOTTOM METADATA
          ================================================== */}

          <div className="mt-9 flex flex-wrap items-center gap-7">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/80
                "
              >
                {tour.duration?.label}
              </span>
            </div>

            <span className="h-4 w-px bg-white/25" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/60
              "
            >
              Curated Journey
            </span>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="
          absolute
          bottom-12
          right-7
          z-20
          hidden
          flex-col
          items-center
          gap-3
          md:flex
        "
      >
        <span
          className="
            font-['Inter']
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-white/50
          "
        >
          Discover
        </span>

        <ArrowDown className="h-4 w-4 animate-bounce text-[#F58634]" />
      </motion.div>

      {/* =====================================================
          BOTTOM CURVE
      ====================================================== */}

      <div
        className="
          absolute
          -bottom-1
          left-0
          z-20
          h-20
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -bottom-[75%]
            left-[-5%]
            h-[150%]
            w-[110%]
            rounded-[50%]
            bg-[#F2FAFB]
          "
        />
      </div>
    </section>
  );
}