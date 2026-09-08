"use client";

import Link from "next/link";

import { ArrowLeft, ArrowRight, Compass } from "lucide-react";


export default function NotFound() {
  return (
    <>


      <main className="flex min-h-[75vh] items-center justify-center bg-[#F2FAFB] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F58634]/10 text-[#F58634]">
            <Compass className="h-7 w-7" />
          </div>

          <p className="mt-8 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.35em] text-[#1EA5BE]">
            404 · Page Not Found
          </p>

          <h1 className="mt-4 font-['Fraunces'] text-5xl font-medium tracking-tight text-[#123138] sm:text-6xl">
            This journey doesn't exist.
          </h1>

          <div className="mx-auto mt-6 h-px w-14 bg-[#F58634]" />

          <p className="mx-auto mt-7 max-w-xl font-['Inter'] text-sm leading-7 text-[#6D6D6D] sm:text-base">
            The page you're looking for may have moved, been removed,
            or the address may be incorrect. Let's get you back on track.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              href="/"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F58634]
                px-7
                py-3.5
                font-['Inter']
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#D9701F]
              "
            >
              Go to Homepage

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#123138]/15
                bg-white
                px-7
                py-3.5
                font-['Inter']
                text-sm
                font-semibold
                text-[#123138]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#F58634]/40
                hover:text-[#F58634]
              "
            >
              <ArrowLeft className="h-4 w-4" />

              Go Back
            </button>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 font-['Inter'] text-xs text-[#123138]/45">
            <Link
              href="/tours"
              className="transition-colors hover:text-[#F58634]"
            >
              Explore Tours
            </Link>

            <Link
              href="/destinations-all"
              className="transition-colors hover:text-[#F58634]"
            >
              Destinations
            </Link>

            <Link
              href="/blog"
              className="transition-colors hover:text-[#F58634]"
            >
              Travel Journal
            </Link>

            <Link
              href="/contact-us"
              className="transition-colors hover:text-[#F58634]"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}