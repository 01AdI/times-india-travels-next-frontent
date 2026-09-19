"use client";

import { useState } from "react";
import AboutUs_Quotation_Form from "./AboutUs_Quotation_Form";

export default function AboutUs_Who_We_Are() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <>
      <section className="relative w-full bg-[#FAF5EB] py-12 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">

          <span
            className="
              font-['Playfair',serif]
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#B85128]
            "
          >
            Who We Are
          </span>

          <h2
            className="
              mt-4
              font-['Playfair_Display',serif]
              text-[clamp(1.75rem,3.5vw,2.75rem)]
              font-medium
              text-[#173C3A]
            "
          >
            About Times India Travels
          </h2>

          <div className="mx-auto mb-8 mt-6 h-0.5 w-30 bg-[#F58634]" />

          <div
            className="
              flex
              flex-col
              gap-4
              text-left
              font-['Noto_Sans',sans-serif]
              text-[16px]
              leading-relaxed
              text-[#476763]
            "
          >
            <p>
              With Times India Travels, discover India in a way that feels personal, comfortable, and truly memorable. 
              For more than 13 years, we’ve been helping travellers experience the beauty, culture, 
              and diversity of India while building lasting trust, one journey at a time.
            </p>

            <p>
              Planning a trip to India can feel like a lot to take in - so we’re here to make it easier. 
              From choosing the places you’d love to visit to planning the perfect route and experiences, 
              we take care of the details while you enjoy the journey.
            </p>

            <p>
              Our tours are customized around you - your interests, your dates, your pace, 
              and the experiences you want to have. Whether it’s your first visit to India or 
              you’re coming back for more, we’re here to help you discover India your way, 
              with a journey that feels easy, thoughtful, and uniquely yours.
            </p>
          </div>

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
              font-['Noto_Sans',sans-serif]
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

      {showQuoteForm && (
        <AboutUs_Quotation_Form
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </>
  );
}