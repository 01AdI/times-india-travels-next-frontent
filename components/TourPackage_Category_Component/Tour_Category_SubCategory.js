"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion(Link);

export default function TourPackage_Category_SubCategory({subcategories}) {
  return (
    <section className="bg-[#F2FAFB] px-5 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <div className="mb-12 text-center">
          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Our Journeys
          </p>

          <h2 className="mt-3 font-['Fraunces'] text-4xl text-[#0B3C49] sm:text-5xl">
            Explore Our Tours
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {subcategories.map((tour, index) => (
            <MotionLink
              key={tour.id}
              href={`/tours/${tour.categorySlug}/${tour.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[420px] overflow-hidden rounded-[28px] block"
            >
              <img
                src={tour.thumbnail}
                alt={tour.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] group-hover:scale-110 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/5" />

              <span className="absolute left-6 top-6 font-['Fraunces'] text-4xl text-white/60">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="absolute rounded-3xl right-6 top-6 border border-white/20 bg-[#124d56]/40 px-4 py-3 font-['Inter'] text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {tour.duration.label}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="font-['Fraunces'] text-3xl text-white sm:text-4xl">
                  {tour.name}
                </h3>

                <div className="mt-5 flex items-center gap-3 font-['Inter'] text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  <span>Explore Journey</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-[#F58634] group-hover:bg-[#F58634] group-hover:text-[#0B3C49]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}