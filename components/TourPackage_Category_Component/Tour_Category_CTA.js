"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import TourPackage_Enquiry_Form from "../TourPackages_Components/TourPackage_Enquiry_Form";

export default function TourPackage_Category_CTA({ data }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 bg-[#F2FAFB]">
        {/* rounded-[2rem] instead of rounded-4xl — that class doesn't
            exist in Tailwind's default scale, so it was likely a no-op */}
        <div className="relative mx-auto max-w-[1500px] rounded-[2rem] overflow-hidden bg-[#0B3C49]">
          <div className="absolute left-0 top-0 h-1 w-full bg-[#F58634]" />

          <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#F58634]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full border border-white/[0.05]" />

          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
            <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
          </div>

          <div className="relative flex min-h-[380px] flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20">
            {/* Removed the standalone decorative arrow — it wasn't a
                link or button, just floating with nothing to do */}
            <div className="flex items-center gap-3">
              <span className="font-['Fraunces'] text-3xl font-light text-white/35">
                01
              </span>
              <span className="h-px w-10 bg-white/20" />
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Start Your Journey
              </span>
            </div>

            <div className="mt-12 max-w-4xl">
              <h2 className="font-['Fraunces'] text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Ready to explore
                <span className="block italic text-cyan-300">
                  {data.name}?
                </span>
              </h2>

              <p className="mt-6 max-w-2xl font-['Inter'] text-sm leading-7 text-white/60 sm:text-base">
                Browse our carefully crafted tour packages or speak with our
                travel experts to create an experience designed around you.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] text-white/35">
                Expertly planned · Personalised experiences
              </span>

              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isEnquiryOpen}
                className="group inline-flex w-fit items-center gap-4 rounded-3xl bg-[#F58634] px-6 py-3.5 font-['Inter'] text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B3C49] outline-none transition-all duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3C49] cursor-pointer"
              >
                Plan My Journey
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {isEnquiryOpen && (
        <TourPackage_Enquiry_Form
          info={data}
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </>
  );
}