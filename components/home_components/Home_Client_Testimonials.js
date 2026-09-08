"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { fetchHomePageTestimonials } from "../../features/Home-page/Client_Testimonial_Slice";


const AUTO_ADVANCE_MS = 3500;


function excerpt(text, maxLen = 240) {
  if (!text) {
    return "";
  }

  const clean = text.trim().replace(/\s+/g, " ");

  if (clean.length <= maxLen) {
    return clean;s
  }

  const cut = clean.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");

  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
}


export default function Home_Client_Testimonials() {

  const dispatch = useDispatch();

  const {testimonials,status,error} = useSelector((state) => state.testimonials);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);


  const CARDS_PER_PAGE = 1;


  useEffect(() => {
    dispatch(fetchHomePageTestimonials());
  }, [dispatch]);


  useEffect(() => {

    if (!testimonials.length) {
      setCurrentPage(0);
      return;
    }

    const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);

    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }

  }, [testimonials.length,currentPage,]);


  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);

  const visibleReviews = testimonials.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const nextSlide = () => {

    if (!testimonials.length) {
      return;
    }

    setDirection(1);

    setCurrentPage(
      (prev) =>
        (prev + 1) % totalPages
    );
  };

  const prevSlide = () => {

    if (!testimonials.length) {
      return;
    }

    setDirection(-1);

    setCurrentPage(
      (prev) =>
        (prev - 1 + totalPages) % totalPages
    );
  };

  useEffect(() => {

    if (isPaused ||!testimonials.length ||totalPages <= 1) {
      return;
    }

    const timer = setTimeout(() => {
      setDirection(1);
      setCurrentPage((prev) =>(prev + 1) % totalPages);
    }, AUTO_ADVANCE_MS);

    return () => {
      clearTimeout(timer);
    };

  }, [currentPage,isPaused,totalPages,testimonials.length,]);


  if ((status === "idle" || status === "loading") &&testimonials.length === 0) {
    return <TestimonialsSkeleton />;
  }


  if (status === "failed" &&testimonials.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#F2FAFB] py-24">

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_10%_10%,rgba(30,165,190,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(245,134,52,0.06),transparent_40%)]
          "
        />

        <div className="relative mx-auto max-w-6xl px-6 text-center">

          <p className="font-['Fraunces'] text-2xl font-semibold text-[#123138]">
            Unable to load client testimonials
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm text-[#6D6D6D]">
            {error ||
              "Something went wrong while loading the testimonials."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(fetchHomePageTestimonials())
            }
            className="
              mt-6
              cursor-pointer
              rounded-full
              border
              border-[#1EA5BE]/40
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#123138]
              transition-all
              duration-300
              hover:bg-[#123138]
              hover:text-white
            "
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  if (!testimonials.length) {
    return null;
  }


  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-12">

      {/* Background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_10%_10%,rgba(30,165,190,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(245,134,52,0.06),transparent_40%)]
        "
      />


      <div className="relative mx-auto max-w-6xl px-6">

        <div className="mx-auto mb-16 max-w-xl text-center">

          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D9701F]">
            A true story
          </span>

          <h2 className="mt-3 font-['Fraunces'] text-4xl font-semibold text-[#123138] md:text-5xl">
            Tours &amp; Reviews
          </h2>

          <div className="mx-auto mt-6 h-0.5 w-10 bg-[#F58634]" />

          <p className="mt-5 text-sm text-[#6D6D6D]">
            Verified reviews from travellers we've hosted across India.
          </p>

        </div>

        <div
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          <AnimatePresence mode="wait" custom={direction}>
            {visibleReviews.map((testimonial) => (

              <motion.div
                key={testimonial._id}
                custom={direction}

                initial={{
                  opacity: 0,
                  x: direction === 1 ? 80 : -80,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                  },
                }}

                exit={{
                  opacity: 0,
                  x: direction === 1 ? -80 : 80,
                  transition: {
                    duration: 0.45,
                  },
                }}

                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-10
                  md:flex-row
                  md:gap-16
                "
              >

                <AvatarCircle
                  name={testimonial.name}
                  avatar={testimonial.avatar}
                />


                <div className="w-full max-w-2xl">

                  {/* Rating */}

                  {testimonial.rating && (
                    <div className="mb-4 text-sm text-[#1EA5BE]">
                      {"★".repeat(
                        Math.min(
                          5,
                          Math.max(
                            0,
                            Number(testimonial.rating)
                          )
                        )
                      )}
                    </div>
                  )}


                  {/* Review */}

                  <p className="text-lg leading-relaxed text-[#123138]/80">
                    "{excerpt(testimonial.review)}"
                  </p>


                  {/* Read More */}

                  <Link
                    href={`/testimonials/${testimonial._id}`}
                    className="
                      mt-6
                      inline-block
                      cursor-pointer
                      rounded-full
                      border
                      border-[#1EA5BE]/40
                      px-2.5
                      py-1
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#1EA5BE]
                      transition-all
                      duration-300
                      hover:scale-[1.05]
                      hover:bg-[#1EA5BE]
                      hover:text-white
                    "
                  >
                    Read More
                  </Link>

                  <div
                    className="
                      relative
                      mt-6
                      border-t
                      border-[#123138]/10
                      pb-2
                      pt-6
                    "
                  >

                    <div>

                      <p className="text-[15px] font-semibold text-[#123138]">
                        {testimonial.name}
                      </p>

                      {testimonial.location && (
                        <p className="text-xs text-[#6D6D6D]">
                          {testimonial.location}
                        </p>
                      )}

                    </div>


                    {/* Verified */}

                    {testimonial.verified && (
                      <span
                        className="
                          absolute
                          right-0
                          top-5
                          rounded-full
                          border
                          border-[#1EA5BE]/40
                          px-2.5
                          py-1
                          text-[12px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-[#1EA5BE]
                        "
                      >
                        Verified
                      </span>
                    )}

                  </div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-evenly gap-8">

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-[#123138]/15
                text-[#123138]
                transition-colors
                hover:bg-[#123138]
                hover:text-white
              "
            >

              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth={2}
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>

            </button>


            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-[#123138]/15
                text-[#123138]
                transition-colors
                hover:bg-[#123138]
                hover:text-white
              "
            >

              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>

            </button>

          </div>
        )}


        <div className="mt-10 text-center">

          <a
            href="https://www.tripadvisor.in/Attraction_Review-g304555-d3590777-Reviews-Times_India_Travels-Jaipur_Jaipur_District_Rajasthan.html#REVIEWS"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              border-b
              border-[#1EA5BE]
              text-sm
              font-semibold
              text-[#1EA5BE]
              transition-transform
              hover:scale-105
            "
          >
            Read all reviews on TripAdvisor →
          </a>

        </div>

      </div>

    </section>
  );
}


function AvatarCircle({ name, avatar }) {

  const [imgFailed, setImgFailed] = useState(false);

  const showImage =avatar &&!imgFailed;

  if (showImage) {

    return (
      <img
        src={avatar}
        alt={name || "Client"}
        onError={() => setImgFailed(true)}
        className="
          h-40
          w-40
          shrink-0
          rounded-full
          object-cover
          md:h-50
          md:w-50
        "
      />
    );

  }


  return (
    <div
      className="
        flex
        h-40
        w-40
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-linear-to-br
        from-[#1EA5BE]
        to-[#123138]
        font-['Fraunces']
        text-3xl
        font-semibold
        text-white
        md:h-50
        md:w-50
      "
    >
      {name?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
}

function TestimonialsSkeleton() {

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-12">

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_10%_10%,rgba(30,165,190,0.08),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(245,134,52,0.06),transparent_40%)]
        "
      />


      <div className="relative mx-auto max-w-6xl px-6">

        <div className="mx-auto mb-16 max-w-xl text-center">

          <div className="relative mx-auto h-4 w-28 overflow-hidden rounded-full bg-[#123138]/10">

            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
              }}
            />

          </div>


          <div className="relative mx-auto mt-5 h-12 w-[75%] overflow-hidden rounded-xl bg-[#123138]/10 md:h-14">

            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_2s_infinite]
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
              }}
            />

          </div>


          <div className="mx-auto mt-6 h-0.5 w-10 bg-[#F58634]/20" />


          <div className="relative mx-auto mt-5 h-4 w-[70%] overflow-hidden rounded-full bg-[#123138]/10">

            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_2s_infinite]
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
              }}
            />

          </div>

        </div>

        <div className="
          flex
          flex-col
          items-center
          justify-center
          gap-10
          md:flex-row
          md:gap-16
        ">

          {/* Avatar */}

          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full bg-[#123138]/10 md:h-50 md:w-50">

            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_2s_infinite]
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
              }}
            />

          </div>


          {/* Content */}

          <div className="w-full max-w-2xl">

            {/* Rating */}

            <div className="relative h-4 w-24 overflow-hidden rounded-full bg-[#123138]/10">

              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_1.8s_infinite]
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                }}
              />

            </div>


            {/* Review lines */}

            <div className="mt-5 space-y-3">

              <SkeletonLine width="100%" />

              <SkeletonLine width="94%" />

              <SkeletonLine width="78%" />

              <SkeletonLine width="60%" />

            </div>


            {/* Button */}

            <div className="relative mt-6 h-8 w-24 overflow-hidden rounded-full bg-[#123138]/10">

              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_1.8s_infinite]
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                }}
              />

            </div>


            {/* User information */}

            <div className="mt-6 border-t border-[#123138]/10 pb-2 pt-6">

              <div className="relative h-4 w-32 overflow-hidden rounded-full bg-[#123138]/10">

                <div
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    animate-[shimmer_1.8s_infinite]
                  "
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  }}
                />

              </div>


              <div className="relative mt-2 h-3 w-20 overflow-hidden rounded-full bg-[#123138]/10">

                <div
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    animate-[shimmer_1.8s_infinite]
                  "
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Navigation skeleton */}

        <div className="mt-14 flex justify-evenly">

          <div className="h-10 w-10 rounded-full border border-[#123138]/10 bg-[#123138]/5" />

          <div className="h-10 w-10 rounded-full border border-[#123138]/10 bg-[#123138]/5" />

        </div>


        {/* TripAdvisor skeleton */}

        <div className="mt-10 flex justify-center">

          <div className="relative h-4 w-56 overflow-hidden rounded-full bg-[#123138]/10">

            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
              }}
            />

          </div>

        </div>

      </div>


      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

    </section>
  );
}


function SkeletonLine({ width }) {

  return (
    <div
      className="relative h-5 overflow-hidden rounded-md bg-[#123138]/10"
      style={{ width }}
    >

      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_2s_infinite]
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
        }}
      />

    </div>
  );
}
