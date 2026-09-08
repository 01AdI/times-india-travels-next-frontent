"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PenLine,
  Quote,
  Sparkles,
} from "lucide-react";

import Create_Testimonials from "./Create_Testimonial";

export default function Create_Testimonial_CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ============================================================
          CREATE TESTIMONIAL CTA
      ============================================================ */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#F2FAFB]
          px-6
          py-20
          sm:py-24
          md:py-28
        "
      >
        {/* ==========================================================
            DECORATIVE BACKGROUND
        ========================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#1EA5BE]/[0.06]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-32
            h-96
            w-96
            rounded-full
            bg-[#F58634]/[0.05]
            blur-3xl
          "
        />

        {/* ==========================================================
            CONTENT
        ========================================================== */}

        <motion.div
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
            margin: "-80px",
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            mx-auto
            max-w-6xl
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-[#123138]/10
              bg-white
              shadow-[0_25px_80px_-45px_rgba(18,49,56,0.35)]
            "
          >
            {/* ======================================================
                INNER CONTENT
            ====================================================== */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_auto]
              "
            >
              {/* ==================================================
                  LEFT CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  px-7
                  py-10
                  sm:px-10
                  sm:py-12
                  md:px-14
                  md:py-14
                  lg:px-16
                  lg:py-16
                "
              >
                {/* Small label */}

                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F58634]/10
                      text-[#F58634]
                    "
                  >
                    <PenLine className="h-4 w-4" />
                  </span>

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
                    Share Your Journey
                  </p>
                </div>

                {/* Heading */}

                <h2
                  className="
                    mt-6
                    max-w-2xl
                    font-['Fraunces']
                    text-4xl
                    font-medium
                    leading-[1.08]
                    tracking-tight
                    text-[#123138]
                    sm:text-5xl
                    md:text-[52px]
                  "
                >
                  Have a story to tell?
                </h2>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-['Inter']
                    text-sm
                    leading-7
                    text-[#123138]/60
                    sm:text-[15px]
                    sm:leading-8
                  "
                >
                  Every journey leaves behind a story.
                  Tell us about your experience with
                  Times India Travels and inspire fellow
                  travellers planning their next adventure.
                </p>

                {/* Button */}

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="
                    group
                    mt-8
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-full
                    bg-[#123138]
                    px-7
                    py-3.5
                    font-['Inter']
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_14px_35px_-15px_rgba(18,49,56,0.5)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#0d292f]
                    hover:shadow-[0_20px_40px_-15px_rgba(18,49,56,0.55)]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#F58634]/60
                    focus-visible:ring-offset-2
                  "
                >
                  Write Your Testimonial

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F58634]
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>

              {/* ==================================================
                  RIGHT DECORATIVE PANEL
              ================================================== */}

              <div
                className="
                  relative
                  hidden
                  min-w-[280px]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-[#123138]
                  lg:flex
                  lg:w-[320px]
                "
              >
                {/* Decorative circles */}

                <div
                  className="
                    absolute
                    -right-20
                    -top-20
                    h-56
                    w-56
                    rounded-full
                    border
                    border-white/10
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-24
                    -left-24
                    h-64
                    w-64
                    rounded-full
                    border
                    border-white/10
                  "
                />

                {/* Quote mark */}

                <Quote
                  className="
                    absolute
                    right-8
                    top-7
                    h-16
                    w-16
                    text-white/[0.06]
                  "
                  fill="currentColor"
                />

                {/* Center */}

                <div className="relative z-10 px-10 text-center">
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F58634]/30
                      bg-[#F58634]/10
                      text-[#F58634]
                    "
                  >
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <p
                    className="
                      mt-6
                      font-['Fraunces']
                      text-2xl
                      italic
                      leading-tight
                      text-white
                    "
                  >
                    Your journey.
                    <br />
                    Your story.
                  </p>

                  <div
                    className="
                      mx-auto
                      mt-5
                      h-px
                      w-10
                      bg-[#F58634]
                    "
                  />

                  <p
                    className="
                      mt-4
                      font-['Inter']
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                    "
                  >
                    Inspire the next traveller
                  </p>
                </div>
              </div>
            </div>

            {/* ======================================================
                BOTTOM ACCENT
            ====================================================== */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[3px]
                w-full
                bg-gradient-to-r
                from-[#F58634]
                via-[#1EA5BE]
                to-transparent
              "
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          CREATE TESTIMONIAL MODAL
      ============================================================ */}

      {isModalOpen && (
        <Create_Testimonials
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}