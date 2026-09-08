"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { tourCategories } from "../../utils/TourPackage_data";

export default function TourPackage_Sub_RelatedTours({ tour }) {
  // ============================================================
  // FIND TOURS FROM THE SAME CATEGORY
  // ============================================================
const relatedTours = Object.values(tourCategories)
  .flatMap((category) => category.packages || [])
  .filter(
    (pkg) =>
      pkg.categorySlug === tour.categorySlug &&
      pkg.id !== tour.id
  )
  .slice(0, 3);

  // If there are no other tours in this category,
  // don't render the section.
  if (relatedTours.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F2FAFB] py-13 sm:py-13 md:py-15">

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 md:px-16 lg:px-20">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-14
            flex
            flex-col
            justify-between
            gap-8
            md:flex-row
            md:items-end
          "
        >

          {/* LEFT */}

          <div>

            <div className="mb-5 flex items-center gap-4">

              <span
                className="
                  font-['Fraunces']
                  text-xl
                  text-[#F58634]
                "
              >
                03
              </span>

              <span className="h-px w-14 bg-[#124D56]/20" />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#124D56]
                "
              >
                Continue Exploring
              </span>

            </div>

            <h2
              className="
                max-w-3xl
                font-['Fraunces']
                text-5xl
                font-medium
                leading-[0.98]
                tracking-[-0.04em]
                text-[#0B3C49]
                sm:text-6xl
                md:text-7xl
              "
            >
              You may also

              <span className="block italic text-[#F58634]">
                like these journeys.
              </span>
            </h2>

          </div>

          {/* RIGHT DESCRIPTION */}

          <p
            className="
              max-w-sm
              font-['Inter']
              text-sm
              leading-7
              text-[#71878B]
            "
          >
            Discover more carefully crafted journeys from this
            collection, each offering its own way to experience India.
          </p>

        </motion.div>

        {/* =====================================================
            RELATED TOUR GRID
        ====================================================== */}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {relatedTours.map((relatedTour, index) => {

            const duration =
              relatedTour.duration?.label ||
              (
                relatedTour.duration?.days
                  ? `${relatedTour.duration.days} Days`
                  : "Curated Journey"
              );

            const route =
              relatedTour.route?.length > 0
                ? relatedTour.route.join(" · ")
                : "India";

            return (
              <motion.article
                key={relatedTour.id}
                initial={{
                  opacity: 0,
                  y: 45,
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
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-[#124D56]/10
                  bg-white
                  shadow-[0_15px_50px_rgba(18,77,86,0.05)]
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_25px_70px_rgba(18,77,86,0.10)]
                "
              >

                {/* =================================================
                    IMAGE
                ================================================== */}

                <Link
                  href={`/tours/${tour.categorySlug}/${relatedTour.id}`}
                  className="
                    relative
                    block
                    overflow-hidden
                  "
                >

                  <div className="aspect-[4/3] overflow-hidden">

                    <img
                      src={
                        relatedTour.thumbnail ||
                        relatedTour.heroImage
                      }
                      alt={relatedTour.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[1200ms]
                        ease-out
                        group-hover:scale-105
                      "
                    />

                  </div>

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/45
                      via-black/5
                      to-transparent
                    "
                  />

                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      left-5
                      top-5
                      font-['Fraunces']
                      text-4xl
                      font-light
                      text-white/80
                      drop-shadow-lg
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* DURATION BADGE */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/20
                      bg-black/25
                      px-3.5
                      py-2
                      backdrop-blur-md
                    "
                  >

                    <Clock className="h-3.5 w-3.5 text-[#F58634]" />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-white
                      "
                    >
                      {duration}
                    </span>

                  </div>

                </Link>

                {/* =================================================
                    CONTENT
                ================================================== */}

                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    p-6
                    sm:p-7
                  "
                >

                  {/* CATEGORY */}

                  <p
                    className="
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-[#F58634]
                    "
                  >
                    {relatedTour.categorySlug
                      ?.replace(/-/g, " ")
                      .replace(/\b\w/g, (letter) =>
                        letter.toUpperCase()
                      )}
                  </p>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-3
                      font-['Fraunces']
                      text-3xl
                      font-medium
                      leading-[1.05]
                      tracking-[-0.025em]
                      text-[#0B3C49]
                    "
                  >
                    {relatedTour.name}
                  </h3>

                  {/* ROUTE */}

                  <p
                    className="
                      mt-4
                      line-clamp-2
                      font-['Inter']
                      text-xs
                      leading-6
                      text-[#71878B]
                    "
                  >
                    {route}
                  </p>

                  {/* DIVIDER */}

                  <div className="my-6 h-px w-full bg-[#124D56]/10" />

                  {/* CTA */}

                  <Link
                    href={`/tours/${tour.categorySlug}/${relatedTour.id}`}
                    className="
                      group/link
                      mt-auto
                      inline-flex
                      w-fit
                      items-center
                      gap-3
                      font-['Inter']
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#0B3C49]
                    "
                  >
                    Explore Journey

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F58634]
                        transition-all
                        duration-300
                        group-hover/link:bg-[#0B3C49]
                      "
                    >
                      <ArrowRight
                        className="
                          h-3.5
                          w-3.5
                          text-[#0B3C49]
                          transition-all
                          duration-300
                          group-hover/link:translate-x-0.5
                          group-hover/link:text-white
                        "
                      />
                    </span>

                  </Link>

                </div>

              </motion.article>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM LINK
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >

          <Link
            href={`/tours/${tour.categorySlug}`}
            className="
              group
              inline-flex
              items-center
              gap-3
              border-b
              border-[#124D56]/20
              pb-2
              font-['Inter']
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#124D56]
              transition-colors
              duration-300
              hover:border-[#F58634]
              hover:text-[#F58634]
            "
          >
            View All Tour Packages

            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </motion.div>

      </div>
    </section>
  );
}