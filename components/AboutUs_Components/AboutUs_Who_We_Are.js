"use client";

import { useState } from "react";
import AboutUs_Quotation_Form from "./AboutUs_Quotation_Form";

export default function AboutUs_Who_We_Are() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <>
      {/* =========================================================
          ABOUT US — WHO WE ARE
      ========================================================== */}

      <section className="relative w-full bg-[#F2FAFB] py-12 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">

          {/* =====================================================
              INTRO LABEL
          ====================================================== */}

          <span
            className="
              font-['Inter']
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#F58634]
            "
          >
            Who We Are
          </span>

          {/* =====================================================
              HEADING
          ====================================================== */}

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-[clamp(1.75rem,3.5vw,2.75rem)]
              font-medium
              text-[#0B3C49]
            "
          >
            About Times India Travels
          </h2>

          {/* =====================================================
              DIVIDER
          ====================================================== */}

          <div className="mx-auto mb-8 mt-6 h-[2px] w-10 bg-[#F58634]" />

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              flex
              flex-col
              gap-4
              text-left
              font-['Inter']
              text-[16px]
              leading-relaxed
              text-[#6D6D6D]
            "
          >
            <p>
              With Times India Travels, experience the beauty of incredible
              India. For over 13 years, we've been earning our clients'
              trust, one carefully planned trip at a time.
            </p>

            <p>
              When planning the perfect vacation feels overwhelming, we take
              the initiative — routing you to the destinations that matter,
              with the same commitment to satisfaction whether it's your
              first trip to India or your fifth.
            </p>

            <p>
              We offer specialized, customized tours built around your
              specifications, and you're always free to choose your holiday
              destinations on your own timeline, with our itinerary options
              designed around your convenience.
            </p>
          </div>

          {/* =====================================================
              QUOTATION CTA
          ====================================================== */}

          <button
            type="button"
            onClick={() => setShowQuoteForm(true)}
            className="
              group
              mt-10
              inline-flex
              cursor-pointer
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              py-2
              pl-6
              pr-2
              font-['Inter']
              text-sm
              font-semibold
              tracking-wide
              text-white
              shadow-[0_10px_25px_-10px_rgba(245,134,52,0.6)]
              transition-all
              duration-300
              hover:bg-[#D9701F]
              hover:shadow-[0_12px_28px_-8px_rgba(245,134,52,0.75)]
            "
          >
            <span>Have a Question? Get a Free Quote</span>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/20
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:bg-white/25
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* =========================================================
          ABOUT US QUOTATION FORM
      ========================================================== */}

      {showQuoteForm && (
        <AboutUs_Quotation_Form
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </>
  );
}