"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Floating_Quotation_Form from "../Floating_Quotation_Form";

export default function Detail_Wonder_Of_India({ wonder }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [wonder?.slug]);

  if (!wonder) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#FAF5EB] px-6">
        <div className="text-center">
          <p className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B85128]">
            Wonders of India
          </p>

          <h1 className="mt-4 font-['Playfair_Display',serif] text-4xl font-medium text-[#173C3A] sm:text-5xl">
            Wonder Not Found
          </h1>

          <div className="mx-auto mt-6 h-px w-20 bg-[#B85128]" />

          <p className="mx-auto mt-6 max-w-md font-['Noto_Sans',sans-serif] text-sm leading-7 text-[#476763]">
            We couldn't find the destination you were looking for.
          </p>

          <Link
            href="/wonder-of-india"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#173C3A] px-6 py-3.5 font-['Noto_Sans',sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B85128]"
          >
            View Wonders
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <MotionConfig reducedMotion="user">
        <section
          className="hero-section relative flex h-95 items-center justify-center overflow-hidden bg-cover bg-center sm:h-110 md:h-125"
          style={{
            backgroundImage: `url('${wonder.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-[#0A1220]/35" />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 -mt-4 px-6 text-center"
          >
            <p className="mb-4 font-['Playfair',serif] text-[11px] uppercase tracking-[0.35em] text-white/80 sm:text-xs">
              {wonder.location}
            </p>

            <h1 className="font-['Playfair_Display',serif] text-5xl font-medium tracking-[0.04em] text-white drop-shadow-lg sm:text-6xl md:text-7xl">
              {wonder.title}
            </h1>

            <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

            <p className="mx-auto mt-5 max-w-2xl font-['Noto_Sans',sans-serif] text-sm font-light leading-relaxed tracking-wide text-white/90 sm:text-base">
              {wonder.shortDescription}
            </p>
          </motion.div>

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

        <section className="bg-[#FAF5EB] px-6 py-20 sm:py-24 md:py-28">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/wonder-of-india"
              className="group mb-12 inline-flex items-center gap-2 rounded font-['Noto_Sans',sans-serif] text-xs font-semibold uppercase tracking-[0.14em] text-[#173C3A]/60 transition-colors duration-300 hover:text-[#B85128]"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Wonders
            </Link>

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
                margin: "-60px",
              }}
              transition={{
                duration: 0.6,
              }}
              className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12"
            >
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="flex flex-col items-start">
                    <div className="relative h-52 w-full overflow-hidden rounded-2xl sm:h-64 lg:h-72">
                      <img
                        src={wonder.image}
                        alt={wonder.title}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-[#071817]/35 to-transparent" />
                    </div>

                    <div className="mt-6">
                      <p className="font-['Playfair',serif] text-[28px] text-[#173C3A]">
                        {wonder.title}
                      </p>

                      <p className="mt-2 flex items-center gap-1.5 font-['Playfair',serif] text-sm text-[#476763]">
                        <MapPin className="h-3.5 w-3.5 text-[#B85128]" />
                        {wonder.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-5 border-l-2 border-[#173C3A]/10 pl-5">
                    <div>
                      <p className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#173C3A]/40">
                        Destination
                      </p>

                      <p className="mt-1.5 font-['Playfair',serif] text-sm text-[#173C3A]">
                        {wonder.location}
                      </p>
                    </div>

                    <div>
                      <p className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#173C3A]/40">
                        Experience
                      </p>

                      <p className="mt-1.5 font-['Playfair',serif] text-sm text-[#173C3A]">
                        Explore the wonder
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-8">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#B85128]" />

                  <span className="font-['Playfair',serif] text-[10px] font-bold uppercase tracking-[0.3em] text-[#B85128]">
                    The Story
                  </span>
                </div>

                <h2 className="max-w-3xl font-['Playfair_Display',serif] text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-none tracking-[-0.035em] text-[#173C3A]">
                  A place worth
                  <br />
                  <span className="text-[#173C3A]/45">
                    experiencing for yourself.
                  </span>
                </h2>

                <div className="mt-10">
                  <p className="font-['Playfair',serif] text-[16px] leading-8 text-[#476763] sm:text-[18px] sm:leading-9">
                    {wonder.fullDescription}
                  </p>
                </div>

                <div className="mt-12 h-px w-full bg-[#173C3A]/10" />

                <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="font-['Playfair',serif] text-[10px] font-bold uppercase tracking-[0.25em] text-[#B85128]">
                      Location
                    </p>

                    <p className="mt-2 font-['Playfair',serif] text-2xl text-[#173C3A]">
                      {wonder.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#173C3A] px-6 py-3.5 font-['Noto_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#B85128]"
                  >
                    Plan Your Journey

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {isEnquiryOpen && (
          <Floating_Quotation_Form
            onClose={() => setIsEnquiryOpen(false)}
          />
        )}
      </MotionConfig>
    </>
  );
}