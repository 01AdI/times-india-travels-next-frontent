"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    stars: 5,
    review:
      "If you go to India, book your travel through Times India Travels. We are three couples who travel together frequently, and this was hands-down the best-organized trip we've ever taken — every logistic detail handled before we even landed.",
    profilePic: "",
    reviewerName: "Glenda P.",
    reviewerLocation: "Southern California",
    verified: true,
    accent: "blue",
  },
  {
    id: 2,
    stars: 5,
    review:
      "We came for the Taj Mahal and left with a route through places we'd never have found on our own. Every driver, guide and hotel felt hand-picked — three weeks that never once felt rushed.",
    profilePic: "",
    reviewerName: "Nigel Robinson",
    reviewerLocation: "Newbury, UK",
    verified: true,
    accent: "orange",
  },
  {
    id: 3,
    stars: 5,
    review:
      "Solo, first time in India, a little nervous going in. They matched me with a guide who understood exactly what that meant and I never once felt unsafe or out of my depth.",
    profilePic: "",
    reviewerName: "J. Medrano",
    reviewerLocation: "Buenos Aires",
    verified: true,
    accent: "blue",
  },
  {
    id: 4,
    stars: 5,
    review:
      "Everything was exactly as promised. Hotels were excellent, drivers were always on time, and the entire journey felt effortless from start to finish.",
    profilePic: "",
    reviewerName: "Sarah Williams",
    reviewerLocation: "London, UK",
    verified: true,
    accent: "orange",
  },
  {
    id: 5,
    stars: 5,
    review:
      "Our Rajasthan tour was unforgettable. Every destination had something unique and the local guides were incredibly knowledgeable.",
    profilePic: "",
    reviewerName: "Michael Carter",
    reviewerLocation: "Toronto, Canada",
    verified: true,
    accent: "blue",
  },
  {
    id: 6,
    stars: 5,
    review:
      "Traveling with my parents can be difficult to plan, but Times India Travels handled everything perfectly. We'll definitely be back.",
    profilePic: "",
    reviewerName: "Emily Davis",
    reviewerLocation: "Sydney, Australia",
    verified: true,
    accent: "orange",
  },
];

export default function Home_ClientReview_2() {
  const CARDS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);

  const visibleReviews = reviews.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const nextSlide = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative overflow-hidden bg-[#F7FAFA] py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, rgba(30,165,190,0.08), transparent 40%), radial-gradient(circle at 90% 90%, rgba(245,134,52,0.06), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D9701F]">
            A true story
          </span>

          <h2 className="mt-3 font-display text-4xl font-semibold text-[#123138] md:text-5xl">
            Tours &amp; Reviews
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-10 bg-[#F58634]" />

          <p className="mt-5 text-sm text-[#6D6D6D]">
            Verified reviews from travellers we've hosted across India.
          </p>
        </div>
        {/* cards */}
        <div className="grid grid-cols-1 gap-9 md:grid-cols-3 ">
          {visibleReviews.map((review, index) => (
            <div
              key={review.id}
              className={`hover:scale-[1.15] hover:border-orange-400 cursor-pointer flex flex-col rounded-2xl border border-[#1EA5BE]/15 bg-white p-8 shadow-[0_20px_50px_-30px_rgba(18,49,56,0.35)]
      ${index === 1 ? "md:scale-105 md:shadow-[0_25px_60px_-30px_rgba(30,165,190,0.4)]" : ""}`}
            >
              <div className="mb-4 flex text-sm text-[#1EA5BE]">
                {"★".repeat(review.stars)}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-[#123138]/80">
                "{review.review}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#123138]/10 pt-6">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white font-display ${
                    review.accent === "orange"
                      ? "bg-gradient-to-br from-[#F58634] to-[#D9701F]"
                      : "bg-gradient-to-br from-[#1EA5BE] to-[#123138]"
                  }`}
                >
                  {review.reviewerName[0]}
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#123138]">
                    {review.reviewerName}
                  </p>

                  <p className="text-xs text-[#6D6D6D]">
                    {review.reviewerLocation}
                  </p>
                </div>

                {review.verified && (
                  <span className="ml-auto rounded-full border border-[#1EA5BE]/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1EA5BE]">
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-14 flex items-center justify-evenly gap-8">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123138]/15 text-[#123138] transition-colors hover:bg-[#123138] hover:text-white cursor-pointer"
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
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#123138]/15 text-[#123138] transition-colors hover:bg-[#123138] hover:text-white cursor-pointer"
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

        <div className="mt-10 text-center">
          <a
            href="#"
            className="border-b border-[#1EA5BE] text-sm font-semibold text-[#1EA5BE]"
          >
            Read all 197 reviews on TripAdvisor →
          </a>
        </div>
      </div>
    </section>
  );
}
