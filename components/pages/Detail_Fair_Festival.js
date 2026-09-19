"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import Floating_Quotation_Form from "../Floating_Quotation_Form";

export default function Detail_Fair_Festival({ festival }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <main className="bg-[#FAF5EB]">
      <section
        className="relative flex h-130 items-center justify-center overflow-hidden bg-cover bg-center md:h-150"
        style={{
          backgroundImage: `url('${festival.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-[#0A1220]/40" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.15), rgba(10,18,32,0.65) 85%)",
          }}
        />

        <div className="relative z-10 px-6 text-center">
          <p className="mb-4 font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-xs">
            {festival.location}
          </p>

          <h1 className="mx-auto max-w-5xl font-['Playfair_Display',serif] text-5xl font-medium leading-[1.02] tracking-[-0.02em] text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            {festival.title}
          </h1>

          <div className="mx-auto mt-6 h-px w-20 bg-[#F58634]" />

          <p className="mx-auto mt-6 max-w-2xl font-['Noto_Sans',sans-serif] text-sm font-light leading-relaxed tracking-wide text-white/90 sm:text-base">
            {festival.shortDescription}
          </p>
        </div>

        <svg
          className="absolute bottom-0 left-0 z-10 h-17.5 w-full text-[#FAF5EB] sm:h-21.25 md:h-25"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,120 Q720,15 1440,120 L1440,120 L0,120 Z" />
        </svg>
      </section>

      <section className="px-5 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Link
              href="/fair-festival"
              className="group inline-flex items-center gap-2 font-['Noto_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.22em] text-[#476763] transition-colors duration-300 hover:text-[#B85128]"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Fair & Festivals
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
            <article>
              <div className="mb-8 flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    strokeWidth={1.7}
                    className="text-[#B85128]"
                  />
                  <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.12em] text-[#476763]">
                    {festival.location}
                  </span>
                </div>

                {festival.date && (
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      strokeWidth={1.7}
                      className="text-[#B85128]"
                    />
                  </div>
                )}
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#B85128]" />
                  <span className="font-['Playfair',serif] text-[10px] font-bold uppercase tracking-[0.28em] text-[#B85128]">
                    About the Festival
                  </span>
                </div>

                <h2 className="font-['Playfair_Display',serif] text-4xl font-medium leading-tight tracking-tight text-[#173C3A] sm:text-5xl">
                  Experience the celebration.
                </h2>
              </div>

              <div className="font-['Noto_Sans',sans-serif] text-[15px] leading-8 text-[#476763] sm:text-[16px] sm:leading-8">
                {festival.fullDescription
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </article>

            <aside className="lg:pt-16">
              <div className="sticky top-28 rounded-2xl border border-[#173C3A]/10 bg-white p-7 shadow-[0_20px_50px_rgba(23,60,58,0.07)]">
                <div className="mb-5">
                  <span className="font-['Playfair',serif] text-[10px] font-bold uppercase tracking-[0.25em] text-[#B85128]">
                    Plan Your Journey
                  </span>

                  <h3 className="mt-3 font-['Playfair_Display',serif] text-3xl font-medium leading-tight text-[#173C3A]">
                    Experience it in person.
                  </h3>

                  <p className="mt-4 font-['Noto_Sans',sans-serif] text-sm leading-6 text-[#476763]">
                    Let us help you plan your trip around this celebration.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEnquiryOpen(true)}
                  className="flex w-full items-center justify-center rounded-full bg-[#173C3A] px-6 py-4 font-['Noto_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#B85128]"
                >
                  Plan My Journey
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {isEnquiryOpen && (
        <Floating_Quotation_Form
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </main>
  );
}