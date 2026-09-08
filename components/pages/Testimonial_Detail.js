"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";

import { motion, MotionConfig } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Quote,
  Star,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  fetchClientTestimonials,
  fetchDetailClientTestimonial,
  selectTestimonials,
  selectTestimonialDetail,
  selectTestimonialDetailStatus,
  selectTestimonialDetailError,
} from "../../features/Testimonials/testimonial_Slice";

import TourPackage_Enquiry_Form from "../TourPackages_Components/TourPackage_Enquiry_Form";

function StarRow({
  rating = 0,
  size = "h-4 w-4",
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`
            ${size}
            ${
              n <= rating
                ? "fill-[#F58634] text-[#F58634]"
                : "fill-transparent text-current opacity-20"
            }
          `}
        />
      ))}
    </div>
  );
}

function extractPullQuote(text) {
  if (!text) return null;

  const firstParagraph =text.split("\n").find(Boolean) ?? "";

  if (!firstParagraph) return null;

  const firstSentenceMatch =firstParagraph.match(/^.{0,20}?.*?[.!?](?:\s|$)/);

  let quote = firstSentenceMatch? firstSentenceMatch[0].trim(): firstParagraph;

  if (quote.length > 160) {
    quote =quote.slice(0, 150).replace(/\s+\S*$/, "") +"…";
  }

  return quote;
}

export default function Testimonial_Detail({ initialReview = null, initialTestimonials = [], id: idProp }) {
  const params = useParams();
  const id = idProp || params?.id;
  const dispatch = useDispatch();

  const [isEnquiryOpen, setIsEnquiryOpen] =useState(false);

  const reduxReview = useSelector(selectTestimonialDetail);
  const reduxTestimonials = useSelector(selectTestimonials);
  const reduxDetailStatus = useSelector(selectTestimonialDetailStatus);
  const detailError = useSelector(selectTestimonialDetailError);

  const review = initialReview || reduxReview;
  const testimonials = initialTestimonials.length > 0 ? initialTestimonials : reduxTestimonials;
  const detailStatus = initialReview ? "succeeded" : reduxDetailStatus;

  useEffect(() => {
    if (!id || initialReview) return;
    dispatch(fetchDetailClientTestimonial(id));
  }, [dispatch, id, initialReview]);


  useEffect(() => {
    if (initialTestimonials.length > 0) return;
    dispatch(fetchClientTestimonials());
  }, [dispatch, initialTestimonials.length]);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);


  if (detailStatus === "loading") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#123138]/10 border-t-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#123138]/50">
            Loading Traveller Story
          </p>
        </div>
      </section>
    );
  }


  if (detailStatus === "failed" || !review) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="text-center">
          <p className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D9701F]">
            Testimonials
          </p>

          <h1 className="mt-4 font-['Fraunces'] text-4xl font-medium text-[#123138] sm:text-5xl">
            Testimonial Not Found
          </h1>

          <div className="mx-auto mt-6 h-0.5 w-10 bg-[#F58634]" />

          <p className="mx-auto mt-6 max-w-md font-['Inter'] text-sm leading-7 text-[#6D6D6D]">
            {detailError ||
              "We couldn't find this traveller story."}
          </p>

          <Link
            href="/testimonials"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#F58634]
              px-6
              py-3
              font-['Inter']
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9701F]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#123138]/40
            "
          >
            View Testimonials

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  
  const rating = review.rating ?? 0;

  const paragraphs = review.review? review.review.split("\n").filter(Boolean): [];

  const pullQuote = extractPullQuote(review.review);

  const moreStories = testimonials.filter((testimonial) =>String(testimonial._id) !==String(review._id)).slice(0, 3);

  return (
  <>
    <MotionConfig reducedMotion="user">

      <section
        className="
          hero-section
          relative
          flex
          h-95
          items-center
          justify-center
          overflow-hidden
          bg-cover
          bg-center
          sm:h-110
          md:h-125
        "
        style={{
          backgroundImage:"url('https://i.pinimg.com/736x/b4/c1/4e/b4c14e8408103efa070c2165e61687cf.jpg')",
        }}
      >

        {/* Overlay */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
          }}
        />

        {/* Hero Content */}

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
          className="
            relative
            z-10
            -mt-4
            px-6
            text-center
          "
        >

          <p
            className="
              mb-4
              font-['Inter']
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-white/80
              sm:text-xs
            "
          >
            A Traveller's Story
          </p>

          <h1
            className="
              font-['Fraunces']
              text-5xl
              font-medium
              tracking-[0.04em]
              text-white
              drop-shadow-lg
              sm:text-6xl
              md:text-7xl
            "
          >
            {review.name}
          </h1>

          <div
            className="
              mx-auto
              mt-5
              h-px
              w-16
              bg-[#F58634]
            "
          />

          {/* Meta */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              font-['Inter']
              text-sm
              text-white/90
            "
          >

            {review.location && (
              <span>
                {review.location}
              </span>
            )}

            {review.location && (
              <span className="h-1 w-1 rounded-full bg-white/30" />
            )}

            <StarRow
              rating={rating}
              className="text-white/20"
            />

            {review.verified && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="flex items-center gap-1.5 text-[#7FE8F8]">
                  <Check className="h-3.5 w-3.5" />
                  Verified Traveller
                </span>
              </>
            )}

            {review.source && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="capitalize">
                  {review.source}
                </span>
              </>
            )}

          </div>
        </motion.div>

        {/* Bottom Curve */}

        <svg
          className="
            absolute
            bottom-0
            left-0
            z-10
            h-17.5
            w-full
            text-[#F2FAFB]
            sm:h-21.25
            md:h-25
          "
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,120 Q720,15 1440,120 L1440,120 L0,120 Z" />
        </svg>

      </section>

      <section
        className="
          bg-[#F2FAFB]
          px-6
          py-20
          sm:py-24
          md:py-28
        "
      >

        <div className="mx-auto max-w-5xl">

          {/* Back */}

          <Link
            href="/testimonials"
            className="
              group
              mb-12
              inline-flex
              items-center
              gap-2
              rounded
              font-['Inter']
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#123138]/60
              transition-colors
              duration-300
              hover:text-[#F58634]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#123138]/30
            "
          >
            <ArrowLeft
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            Back to Testimonials
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
            className="
              grid
              grid-cols-1
              gap-x-14
              gap-y-10
              lg:grid-cols-12
            "
          >

            <aside className="lg:col-span-4">

              <div className="lg:sticky lg:top-28">

                <div className="flex flex-col items-start">

                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={
                        review.name ||
                        "Traveller"
                      }
                      className="
                        h-44
                        w-44
                        rounded-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className={`
                        flex
                        h-44
                        w-44
                        items-center
                        justify-center
                        rounded-full
                        text-7xl
                        font-semibold
                        text-white
                        ${
                          review.accent === "orange"
                            ? "bg-linear-to-br from-[#F58634] to-[#D9701F]"
                            : "bg-linear-to-br from-[#1EA5BE] to-[#123138]"
                        }
                      `}
                    >
                      {review.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="mt-6">

                    <p
                      className="
                        font-['Fraunces']
                        text-[28px]
                        text-[#123138]
                      "
                    >
                      {review.name}
                    </p>

                    {review.location && (
                      <p
                        className="
                          mt-1
                          flex
                          items-center
                          gap-1.5
                          font-['Inter']
                          text-sm
                          text-[#6D6D6D]
                        "
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#F58634]" />

                        {review.location}
                      </p>
                    )}

                  </div>
                </div>

                {/* Facts */}

                <dl
                  className="
                    mt-8
                    space-y-5
                    border-l-2
                    border-[#123138]/10
                    pl-5
                  "
                >

                  <div>

                    <dt
                      className="
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#123138]/40
                      "
                    >
                      Rating
                    </dt>

                    <dd className="mt-1.5">
                      <StarRow
                        rating={rating}
                        size="h-4 w-4"
                      />
                    </dd>

                  </div>

                  <div>

                    <dt
                      className="
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#123138]/40
                      "
                    >
                      Source
                    </dt>

                    <dd
                      className="
                        mt-1
                        font-['Inter']
                        text-sm
                        capitalize
                        text-[#123138]
                      "
                    >
                      {review.source ||
                        "customer"}
                    </dd>

                  </div>

                  <div>

                    <dt
                      className="
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-[#123138]/40
                      "
                    >
                      Traveller
                    </dt>

                    <dd
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        font-['Inter']
                        text-sm
                        text-[#123138]
                      "
                    >
                      {review.verified ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#1EA5BE]" />

                          Verified traveller
                        </>
                      ) : (
                        "Traveller review"
                      )}
                    </dd>

                  </div>

                </dl>

              </div>

            </aside>

            <div className="lg:col-span-8">

              {paragraphs.length > 0 ? (
                <>
                  {pullQuote && (
                    <div className="mb-10 flex gap-4">

                      <Quote
                        className="
                          mt-1
                          h-8
                          w-8
                          shrink-0
                          text-[#F58634]/50
                        "
                        fill="currentColor"
                        aria-hidden="true"
                      />

                      <p
                        className="
                          font-['Fraunces']
                          text-[26px]
                          italic
                          leading-[1.3]
                          text-[#123138]
                          sm:text-[30px]
                        "
                      >
                        {pullQuote}
                      </p>

                    </div>
                  )}

                  <div
                    className="
                      font-['Inter']
                      text-[15px]
                      leading-8
                      text-[#123138]/75
                      sm:text-base
                      sm:leading-9
                    "
                  >
                    {paragraphs.map(
                      (paragraph, index) => (
                        <p
                          key={index}
                          className={
                            index > 0
                              ? "mt-6"
                              : `
                                first-letter:float-left
                                first-letter:mr-3
                                first-letter:mt-1
                                first-letter:font-['Fraunces']
                                first-letter:text-6xl
                                first-letter:font-medium
                                first-letter:leading-[0.8]
                                first-letter:text-[#F58634]
                              `
                          }
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p
                  className="
                    font-['Inter']
                    text-sm
                    italic
                    text-[#123138]/40
                  "
                >
                  This review doesn't have any text yet.
                </p>
              )}

            </div>

          </motion.div>

          {moreStories.length > 0 && (
            <motion.section
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
                margin: "-80px",
              }}
              transition={{
                duration: 0.65,
              }}
              className="
                mt-28
                border-t
                border-[#123138]/10
                pt-16
              "
            >

              {/* Section Header */}

              <div
                className="
                  mb-10
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >

                <div>

                  <p
                    className="
                      font-['Inter']
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-[#1EA5BE]
                    "
                  >
                    Continue Exploring
                  </p>

                  <h3
                    className="
                      mt-3
                      font-['Fraunces']
                      text-3xl
                      font-medium
                      tracking-tight
                      text-[#123138]
                      sm:text-4xl
                    "
                  >
                    More Traveller Stories
                  </h3>

                </div>

                <Link
                  href="/testimonials"
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    font-['Inter']
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#123138]/55
                    transition-colors
                    duration-300
                    hover:text-[#F58634]
                  "
                >
                  View all stories

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

              </div>

              <div className="space-y-5">

                {moreStories.map(
                  (story, index) => {

                    const storyId =
                      story._id;

                    const storyText =
                      story.review || "";

                    const storyExcerpt =
                      storyText.length > 220
                        ? `${storyText
                            .slice(0, 220)
                            .trim()}…`
                        : storyText;

                    return (
                      <motion.div
                        key={storyId}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          margin: "-30px",
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.08,
                        }}
                      >

                        <Link
                          href={`/testimonials/${storyId}`}
                          className="
                            group
                            relative
                            flex
                            min-h-47.5
                            w-full
                            overflow-hidden
                            rounded-[1.75rem]
                            border
                            border-[#123138]/10
                            bg-white
                            shadow-[0_18px_50px_-35px_rgba(18,49,56,0.35)]
                            transition-all
                            duration-500
                            hover:-translate-y-1
                            hover:border-[#F58634]/30
                            hover:shadow-[0_28px_65px_-35px_rgba(18,49,56,0.42)]
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#F58634]/50
                            sm:min-h-51.25
                          "
                        >

                          {/* Accent */}

                          <div
                            className={`
                              absolute
                              left-0
                              top-0
                              h-full
                              w-0.75
                              ${
                                story.accent ===
                                "orange"
                                  ? "bg-[#F58634]"
                                  : "bg-[#1EA5BE]"
                              }
                            `}
                          />

                          <div
                            className="
                              relative
                              flex
                              w-37.5
                              shrink-0
                              items-center
                              justify-center
                              bg-[#F2FAFB]
                              sm:w-46.25
                              md:w-52.5
                            "
                          >

                            {story.avatar ? (
                              <img
                                src={story.avatar}
                                alt={
                                  story.name ||
                                  "Traveller"
                                }
                                className="
                                  h-20
                                  w-20
                                  rounded-full
                                  object-cover
                                  ring-4
                                  ring-white
                                  shadow-[0_10px_30px_-15px_rgba(18,49,56,0.5)]
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                  sm:h-24
                                  sm:w-24
                                "
                              />
                            ) : (
                              <div
                                className={`
                                  flex
                                  h-20
                                  w-20
                                  items-center
                                  justify-center
                                  rounded-full
                                  text-2xl
                                  font-medium
                                  text-white
                                  shadow-[0_10px_30px_-15px_rgba(18,49,56,0.5)]
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                  sm:h-24
                                  sm:w-24
                                  ${
                                    story.accent ===
                                    "orange"
                                      ? "bg-linear-to-br from-[#F58634] to-[#D9701F]"
                                      : "bg-linear-to-br from-[#1EA5BE] to-[#123138]"
                                  }
                                `}
                              >
                                {story.name
                                  ?.charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}

                            {/* Decorative quote */}

                            <span
                              className="
                                pointer-events-none
                                absolute
                                bottom-1
                                left-4
                                font-['Fraunces']
                                text-[70px]
                                leading-none
                                text-[#123138]/4
                              "
                            >
                              “
                            </span>

                          </div>

                          <div
                            className="
                              flex
                              min-w-0
                              flex-1
                              flex-col
                              justify-between
                              px-6
                              py-6
                              sm:px-8
                              sm:py-7
                            "
                          >

                            {/* Top */}

                            <div>

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  items-start
                                  justify-between
                                  gap-4
                                "
                              >

                                <div className="min-w-0">

                                  <div className="flex items-center gap-2">

                                    <h4
                                      className="
                                        truncate
                                        font-['Fraunces']
                                        text-xl
                                        font-medium
                                        text-[#123138]
                                        transition-colors
                                        duration-300
                                        group-hover:text-[#F58634]
                                        sm:text-2xl
                                      "
                                    >
                                      {story.name}
                                    </h4>

                                    {story.verified && (
                                      <span
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
                                        title="Verified traveller"
                                      >
                                        <Check
                                          className="h-2.5 w-2.5"
                                          strokeWidth={3}
                                        />
                                      </span>
                                    )}

                                  </div>

                                  {story.location && (
                                    <p
                                      className="
                                        mt-1.5
                                        flex
                                        items-center
                                        gap-1.5
                                        font-['Inter']
                                        text-[11px]
                                        text-[#6D6D6D]
                                      "
                                    >
                                      <MapPin className="h-3 w-3 text-[#F58634]" />

                                      {story.location}
                                    </p>
                                  )}

                                </div>

                                {/* Rating */}

                                <div className="shrink-0">

                                  <StarRow
                                    rating={
                                      story.rating ?? 0
                                    }
                                    size="h-3.5 w-3.5"
                                  />

                                </div>

                              </div>

                              {/* Review */}

                              {storyExcerpt && (
                                <div
                                  className="
                                    mt-5
                                    flex
                                    max-w-2xl
                                    gap-3
                                  "
                                >

                                  <Quote
                                    className="
                                      mt-0.5
                                      h-5
                                      w-5
                                      shrink-0
                                      text-[#1EA5BE]/30
                                    "
                                    fill="currentColor"
                                  />

                                  <p
                                    className="
                                      line-clamp-3
                                      font-['Inter']
                                      text-[13px]
                                      font-light
                                      leading-6
                                      text-[#123138]/60
                                      sm:text-sm
                                    "
                                  >
                                    {storyExcerpt}
                                  </p>

                                </div>
                              )}

                            </div>

                            {/* Bottom */}

                            <div
                              className="
                                mt-5
                                flex
                                items-center
                                justify-between
                                gap-4
                                border-t
                                border-[#123138]/8
                                pt-4
                              "
                            >

                              <span
                                className="
                                  font-['Inter']
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.2em]
                                  text-[#123138]/30
                                "
                              >
                                Traveller Story
                              </span>

                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  font-['Inter']
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.12em]
                                  text-[#123138]/60
                                  transition-colors
                                  duration-300
                                  group-hover:text-[#F58634]
                                "
                              >
                                Read Story

                                <span
                                  className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#123138]/10
                                    bg-[#F2FAFB]
                                    transition-all
                                    duration-300
                                    group-hover:border-[#F58634]/30
                                    group-hover:bg-[#F58634]
                                    group-hover:text-white
                                  "
                                >
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>

                              </span>

                            </div>

                          </div>

                        </Link>

                      </motion.div>
                    );
                  }
                )}

              </div>

            </motion.section>
          )}

        </div>
      </section>

      <section
        className="
          bg-[#124d56]
          px-6
          py-20
          sm:py-24
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >

          <p
            className="
              font-['Inter']
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#F58634]
            "
          >
            Your Story Could Be Next
          </p>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-4xl
              font-medium
              text-white
              sm:text-5xl
            "
          >
            Ready to Create Your Own Indian Journey?
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-['Inter']
              text-sm
              leading-7
              text-white/60
            "
          >
            Tell us what you have in mind and let
            our travel experts help create a journey
            worth remembering.
          </p>

          <button
            type="button"
            onClick={() =>
              setIsEnquiryOpen(true)
            }
            className="
              group
              mt-8
              inline-flex
              cursor-pointer
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              px-7
              py-3.5
              font-['Inter']
              text-sm
              font-semibold
              text-white
              shadow-[0_12px_30px_-10px_rgba(245,134,52,0.5)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#D9701F]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/60
            "
          >
            Plan My Journey

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>

        </motion.div>

      </section>


      {isEnquiryOpen && (
        <TourPackage_Enquiry_Form
          onClose={() =>
            setIsEnquiryOpen(false)
          }
        />
      )}

    </MotionConfig>
  </>
  );
}