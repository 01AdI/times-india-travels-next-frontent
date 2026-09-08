"use client";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";

import {
  fetchClientTestimonials,
  selectTestimonials,
  selectTestimonialsStatus,
  selectTestimonialsError,
} from "../../features/Testimonials/testimonial_Slice";

export default function Testimonial_Cards({ initialTestimonials = [] }) {
  const dispatch = useDispatch();

  // ============================================================
  // REDUX STATE
  // ============================================================

  const reduxReviews = useSelector(selectTestimonials);
  const reviews = initialTestimonials.length > 0 ? initialTestimonials : reduxReviews;
  const status = useSelector(selectTestimonialsStatus);
  const error = useSelector(selectTestimonialsError);

  // ============================================================
  // FETCH TESTIMONIALS
  // ============================================================

  useEffect(() => {
    if (initialTestimonials.length > 0) return;
    dispatch(fetchClientTestimonials());
  }, [dispatch, initialTestimonials.length]);

  // ============================================================
  // LOADING
  // ============================================================

  if (status === "loading" && reviews.length === 0) {
    return (
      <section className="relative bg-[#F2FAFB] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 text-[#123138]/60">
            <Loader2 className="h-5 w-5 animate-spin text-[#1EA5BE]" />

            <span className="font-['Inter'] text-sm font-light">
              Loading traveller stories...
            </span>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (status === "failed") {
    return (
      <section className="relative bg-[#F2FAFB] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-10">
          <p className="font-['Inter'] text-sm font-light text-[#6D6D6D]">
            {error || "Unable to load traveller stories."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (!reviews.length) {
    return (
      <section className="relative bg-[#F2FAFB] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-10">
          <p className="font-['Inter'] text-sm font-light text-[#6D6D6D]">
            No traveller stories available at the moment.
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="relative bg-[#F2FAFB] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* ====================================================
            SECTION HEADING
        ==================================================== */}

        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.3em] text-[#1EA5BE]">
            From Our Travellers
          </p>

          <h2 className="mt-4 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#123138] sm:text-5xl">
            Stories Worth Remembering
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-10 bg-[#F58634]" />

          <p className="mx-auto mt-6 max-w-xl font-['Inter'] text-sm font-light leading-7 text-[#6D6D6D]">
            Every journey leaves behind a story. Here are some of the
            experiences our travellers chose to remember with us.
          </p>
        </div>

        {/* ====================================================
            STORY CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {reviews.map((review) => {
            const reviewExcerpt =
              review.review?.length > 420
                ? `${review.review.slice(0, 420).trim()}…`
                : review.review || "";

            return (
              <article
                key={review._id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#123138]/10
                  bg-white
                  px-7
                  py-8
                  shadow-[0_20px_60px_-35px_rgba(18,49,56,0.30)]
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_30px_75px_-35px_rgba(18,49,56,0.36)]
                  sm:px-9
                  sm:py-9
                "
              >
                {/* ==================================================
                    SUBTLE SIDE ACCENT
                ================================================== */}

                <div
                  className={`absolute left-0 top-0 h-full w-[2px] ${
                    review.accent === "orange"
                      ? "bg-[#F58634]"
                      : "bg-[#1EA5BE]"
                  }`}
                />

                {/* ==================================================
                    LARGE BACKGROUND QUOTE
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-6
                    top-0
                    font-['Fraunces']
                    text-[140px]
                    font-light
                    leading-none
                    text-[#123138]/[0.035]
                    transition-transform
                    duration-700
                    group-hover:-translate-y-2
                  "
                >
                  “
                </div>

                {/* ==================================================
                    REVIEWER HEADER
                ================================================== */}

                <div className="relative z-10 flex items-center justify-between gap-5">

                  {/* Reviewer */}
                  <div className="flex min-w-0 items-center gap-4">

                    {/* ==================================================
                        AVATAR
                    ================================================== */}

                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name || "Traveller"}
                        className="
                          h-12
                          w-12
                          shrink-0
                          rounded-full
                          object-cover
                          ring-4
                          ring-[#F2FAFB]
                        "
                      />
                    ) : (
                      <div
                        className={`
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-base
                          font-medium
                          text-white
                          ring-4
                          ring-[#F2FAFB]
                          ${
                            review.accent === "orange"
                              ? "bg-gradient-to-br from-[#F58634] to-[#D9701F]"
                              : "bg-gradient-to-br from-[#1EA5BE] to-[#123138]"
                          }
                        `}
                      >
                        {review.name?.charAt(0).toUpperCase() || "T"}
                      </div>
                    )}

                    {/* Reviewer Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-['Inter'] text-sm font-medium text-[#123138]">
                          {review.name}
                        </p>

                        {review.verified && (
                          <span
                            title="Verified traveller"
                            className="
                              flex
                              h-4
                              w-4
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#1EA5BE]/10
                              text-[#1EA5BE]
                            "
                          >
                            <Check
                              className="h-2.5 w-2.5"
                              strokeWidth={3}
                            />
                          </span>
                        )}
                      </div>

                      {review.location && (
                        <p className="mt-1 truncate font-['Inter'] text-[11px] font-light text-[#6D6D6D]">
                          {review.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ==================================================
                      RATING
                  ================================================== */}

                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-0.5 text-[11px] font-normal text-[#F58634]">
                      {"★".repeat(review.rating || 0)}
                    </div>

                    <p className="mt-1 font-['Inter'] text-[8px] font-medium uppercase tracking-[0.16em] text-[#123138]/30">
                      Verified rating
                    </p>
                  </div>
                </div>

                {/* ==================================================
                    DIVIDER
                ================================================== */}

                <div className="relative z-10 my-7 h-px bg-[#123138]/8" />

                {/* ==================================================
                    REVIEW CONTENT
                ================================================== */}

                <div className="relative z-10">

                  {/* Opening quote */}
                  <span className="font-['Fraunces'] text-5xl font-light leading-none text-[#1EA5BE]/20">
                    “
                  </span>

                  {/* Review */}
                  <p
                    className="
                      -mt-1
                      font-['Inter']
                      text-[15px]
                      font-light
                      leading-[1.9]
                      tracking-[0.005em]
                      text-[#123138]/70
                      sm:text-[16px]
                    "
                  >
                    {reviewExcerpt}
                  </p>
                </div>

                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-[#123138]/8 pt-6">

                  <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.2em] text-[#123138]/30">
                    Traveller Story
                  </p>

                  {/* ==================================================
                      READ FULL STORY
                  ================================================== */}

                  <Link
                    href={`/testimonials/${review._id}`}
                    className="
                      group/link
                      relative
                      inline-flex
                      items-center
                      gap-3
                      overflow-hidden
                      rounded-full
                      border
                      border-[#123138]/15
                      px-4
                      py-2
                      font-['Inter']
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-[#123138]/75
                      transition-all
                      duration-300
                      hover:border-[#F58634]
                      hover:bg-[#F58634]
                      hover:text-white
                      hover:shadow-[0_8px_22px_-8px_rgba(245,134,52,0.65)]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#F58634]/50
                    "
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover/link:-translate-x-0.5">
                      Read full story
                    </span>

                    <span
                      className="
                        relative
                        z-10
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#123138]/15
                        bg-white/70
                        text-[#123138]
                        transition-all
                        duration-300
                        group-hover/link:rotate-45
                        group-hover/link:border-white/30
                        group-hover/link:bg-white/20
                        group-hover/link:text-white
                      "
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}