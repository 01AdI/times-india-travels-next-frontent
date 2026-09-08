"use client";

// ============================================================
// TESTIMONIALS — START YOUR JOURNEY CTA
// ============================================================

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import TourPackage_Enquiry_Form from "../TourPackages_Components/TourPackage_Enquiry_Form";

export default function Testimonial_CTA() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F2FAFB] py-24 sm:py-28">
        {/* Subtle background details */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#1EA5BE]/5 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#F58634]/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          {/* Eyebrow */}
          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1EA5BE]">
            Your Story Awaits
          </p>

          {/* Heading */}
          <h2 className="mt-4 font-['Fraunces'] text-4xl font-medium leading-tight text-[#123138] sm:text-5xl md:text-6xl">
            Ready to Create Your
            <span className="block">Own India Story?</span>
          </h2>

          {/* Accent */}
          <div
            className="mx-auto mt-6 h-[2px] w-12 rounded-full bg-[#F58634]"
            aria-hidden="true"
          />

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl font-['Inter'] text-sm leading-7 text-[#123138]/65 sm:text-base sm:leading-8">
            Every unforgettable journey begins with an idea. Tell us what you
            have in mind, and let our travel experts shape it into a journey
            that's uniquely yours.
          </p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setIsEnquiryOpen(true)}
            className="group mt-9 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#123138] px-7 py-3.5 font-['Inter'] text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_-12px_rgba(18,49,56,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B3C49] hover:shadow-[0_18px_35px_-12px_rgba(18,49,56,0.5)]"
          >
            Start Planning Your Journey

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F58634] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </span>
          </button>

          {/* Supporting text */}
          <p className="mt-5 font-['Inter'] text-[11px] tracking-wide text-[#123138]/40">
            Tell us your destination, dates &amp; travel preferences
          </p>
        </div>
      </section>

      {/* ======================================================
          ENQUIRY MODAL
      ====================================================== */}

       {isEnquiryOpen && (
        <TourPackage_Enquiry_Form
          onClose={() => setIsEnquiryOpen(false)}
        />
       )}
    </>
  );
}