"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Destination_Quotation_Form from "./Destination_Quotation_Form";

// ---------------------------------------------------------------------------
// STATIC FALLBACK DATA
// ---------------------------------------------------------------------------

const STATIC_DESTINATION = {
  name: "The World",
  tagline:
    "A journey through a thousand stories, timeless traditions and unforgettable landscapes.",
};

// ---------------------------------------------------------------------------
// DESTINATION CTA
// ---------------------------------------------------------------------------

export default function Destination_CTA({ data }) {
  const [showForm, setShowForm] = useState(false);

  // -------------------------------------------------------------------------
  // USE DYNAMIC DATA WHEN AVAILABLE
  // OTHERWISE FALL BACK TO STATIC DATA
  // -------------------------------------------------------------------------

  const destination = data || STATIC_DESTINATION;

  return (
    <>
      <section
        id="destination-cta"
        className="
          relative
          overflow-hidden
          bg-[#F2FAFB]
          py-13
          sm:py-13
          md:py-14
          lg:py-15
        "
      >
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-6xl
            px-6
            text-center
            sm:px-10
            lg:px-14
          "
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#F58634]" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F58634]
                sm:text-xs
              "
            >
              Your Journey Awaits
            </span>

            <span className="h-px w-10 bg-[#F58634]" />
          </div>

          <h2
            className="
              mx-auto
              mt-7
              max-w-4xl
              font-['Fraunces']
              text-4xl
              font-medium
              leading-[1.05]
              tracking-tight
              text-[#124d56]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Ready to discover{" "}
            <span className="italic text-[#F58634]">
              {destination.name}?
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              font-['Inter']
              text-sm
              leading-7
              text-[#124d56]/60
              sm:text-base
              sm:leading-8
            "
          >
            Every journey should feel personal. Tell us what you have in mind,
            and our travel specialists will help create an experience around
            the places, moments and pace you love.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="
                group
                inline-flex
                cursor-pointer
                items-center
                gap-4
                rounded-full
                bg-[#F58634]
                px-7
                py-3.5
                font-['Inter']
                text-sm
                font-semibold
                text-white
                shadow-[0_18px_45px_-15px_rgba(245,134,52,0.55)]
                transition-all
                duration-300
                hover:bg-[#D9701F]
                hover:shadow-[0_22px_50px_-12px_rgba(245,134,52,0.65)]
                active:scale-[0.98]
              "
            >
              Plan My Journey

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white/20
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </button>
          </div>

          <div
            className="
              mt-9
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-3
              font-['Inter']
              text-[9px]
              uppercase
              tracking-[0.16em]
              text-[#124d56]/40
              sm:text-[10px]
            "
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#F58634]" />
              Tailor-Made Journeys
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#F58634]" />
              Personalised Planning
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#F58634]" />
              Travel Specialists
            </span>
          </div>
        </div>

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            h-px
            w-[70%]
            -translate-x-1/2
            bg-linear-to-r
            from-transparent
            via-[#124d56]/10
            to-transparent
          "
        />
      </section>

      {showForm && (
        <Destination_Quotation_Form
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}