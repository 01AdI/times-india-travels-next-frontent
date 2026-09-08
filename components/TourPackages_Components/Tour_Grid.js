"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTourCategories,
  selectTourCategories,
  selectTourCategoriesStatus,
  selectTourCategoriesError,
} from "../../features/tour-categories/tourCategory_Slice";

import {
  fetchTourPackages,
  selectTourPackages,
  selectTourPackagesStatus,
  selectTourPackagesError,
} from "../../features/Tour-packages/tour_Package_Slice";

import TourPackage_Enquiry_Form from "../TourPackages_Components/TourPackage_Enquiry_Form";

/* =========================================================
   CARD LAYOUTS
========================================================= */

const cardLayouts = [
  "h-[500px] md:col-span-7 md:row-span-3 md:h-auto",
  "h-[460px] md:col-span-5 md:row-span-3 md:h-auto",
  "h-[340px] md:col-span-5 md:row-span-2 md:h-auto",
  "h-[340px] md:col-span-7 md:row-span-2 md:h-auto",
  "h-[360px] md:col-span-7 md:row-span-2 md:h-auto",
  "h-[360px] md:col-span-5 md:row-span-2 md:h-auto",
  "h-[430px] md:col-span-12 md:row-span-2 md:h-auto",
];

/* =========================================================
   CARD ANIMATION
========================================================= */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.97,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* =========================================================
   CUSTOM JOURNEY ANIMATION
========================================================= */

const customJourneyVariants = {
  hidden: {
    opacity: 0,
    y: 65,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const MotionLink = motion(Link);

/* =========================================================
   TOUR CARD
========================================================= */

function TourCard({
  pkg,
  index,
  className = "",
  isCategory = false,
}) {
  const image =
    pkg.heroImage ||
    pkg.thumbnail ||
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop";

  const duration = isCategory
    ? `${pkg.packageCount || 0} ${
        pkg.packageCount === 1 ? "Journey" : "Journeys"
      }`
    : pkg.duration?.label || "Explore Tours";

  const href = isCategory
    ? `/tours/${pkg.id}`
    : `/tours/${pkg.categorySlug}/${pkg.id}`;

  return (
    <MotionLink
      href={href}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
      }}
      aria-label={`${pkg.name} — ${
        pkg.tagline ||
        pkg.duration?.label ||
        "Tour package"
      }`}
      className={`
        group
        relative
        block
        overflow-hidden
        rounded-[28px]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0B3C49]
        ${className}
      `}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <img
        src={image}
        alt={pkg.name}
        loading={index === 0 ? "eager" : "lazy"}
        className="
          absolute
          inset-0
          h-full
          w-full
          scale-[1.02]
          object-cover
          transition-transform
          duration-[1400ms]
          ease-out
          motion-reduce:transition-none
          group-hover:scale-[1.07]
          motion-reduce:group-hover:scale-100
        "
      />

      {/* =================================================
          GRADIENT
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/35
          to-black/5
          transition-all
          duration-700
          group-hover:from-black/95
          group-hover:via-black/55
        "
      />

      {/* =================================================
          ORANGE HOVER TINT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#F58634]/0
          transition-all
          duration-700
          group-hover:bg-[#F58634]/[0.035]
        "
      />

      {/* =================================================
          CARD NUMBER
      ================================================= */}

      <div
        className="
          absolute
          left-6
          top-6
          z-10
          sm:left-7
          sm:top-7
        "
      >
        <span
          className="
            font-['Fraunces']
            text-4xl
            font-light
            tracking-tight
            text-white/50
            transition-colors
            duration-500
            group-hover:text-white/75
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* =================================================
          DURATION / JOURNEY COUNT
      ================================================= */}

      <div
        className="
          absolute
          right-6
          top-6
          z-10
          sm:right-7
          sm:top-7
        "
      >
        <span
          className="
            rounded-3xl
            border
            border-white/20
            bg-[#124d56]/40
            px-4
            py-3
            font-['Inter']
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-white
            backdrop-blur-md
          "
        >
          {duration}
        </span>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          p-6
          sm:p-7
        "
      >
        {/* CATEGORY LABEL */}

        <p
          className="
            mb-2
            font-['Inter']
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.24em]
            text-[#F58634]
          "
        >
          {isCategory
            ? "Explore India"
            : pkg.categoryName || "Curated Journey"}
        </p>

        {/* TITLE */}

        <h3
          className="
            max-w-xl
            font-['Fraunces']
            text-3xl
            font-medium
            leading-[1.05]
            tracking-[-0.025em]
            text-white
            transition-transform
            duration-500
            group-hover:-translate-y-1
            sm:text-4xl
          "
        >
          {pkg.name}
        </h3>

        {/* ROUTE */}

        {!isCategory && pkg.route?.length > 0 && (
          <p
            className="
              mt-3
              font-['Inter']
              text-xs
              uppercase
              tracking-[0.16em]
              text-white/50
            "
          >
            {pkg.route.join(" · ")}
          </p>
        )}

        {/* DESCRIPTION / HIGHLIGHTS */}

        <div
          className="
            grid
            grid-rows-[0fr]
            opacity-0
            transition-all
            duration-700
            group-hover:grid-rows-[1fr]
            group-hover:opacity-100
          "
        >
          <div className="overflow-hidden">
            <p
              className="
                mt-4
                max-w-xl
                font-['Inter']
                text-sm
                leading-6
                text-white/70
              "
            >
              {isCategory
                ? pkg.description
                : pkg.highlights?.length > 0
                  ? pkg.highlights
                      .slice(0, 2)
                      .join(" · ")
                  : ""}
            </p>
          </div>
        </div>

        {/* CTA */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            font-['Inter']
            text-[11px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-white
          "
        >
          <span>
            {isCategory
              ? "Explore Category"
              : "Explore Journey"}
          </span>

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              transition-all
              duration-500
              group-hover:border-[#F58634]
              group-hover:bg-[#F58634]
              group-hover:text-[#0B3C49]
            "
          >
            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </span>
        </div>
      </div>
    </MotionLink>
  );
}

/* =========================================================
   GRID SKELETON
========================================================= */

function TourGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-flow-dense md:auto-rows-[180px]">
      {cardLayouts.slice(0, 6).map(
        (layout, index) => (
          <div
            key={index}
            className={`
              relative
              animate-pulse
              overflow-hidden
              rounded-[28px]
              bg-white
              ${layout}
            `}
          >
            <div className="absolute inset-0 bg-[#123138]/8" />

            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="h-3 w-28 rounded-full bg-[#F58634]/20" />

              <div className="mt-4 h-9 w-3/4 rounded-lg bg-[#123138]/10" />

              <div className="mt-4 h-3 w-1/2 rounded-full bg-[#123138]/8" />

              <div className="mt-5 h-7 w-32 rounded-full bg-[#123138]/8" />
            </div>
          </div>
        )
      )}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TourPackages_Grid({ initialCategories = [], initialPackages = [] }) {
  const prefersReducedMotion = useReducedMotion();

  const dispatch = useDispatch();

  const { category } = useParams();

  const [isEnquiryOpen, setIsEnquiryOpen] =
    useState(false);

  /* =======================================================
     CATEGORY DATA
  ======================================================= */

  const reduxCategories = useSelector(selectTourCategories);
  const categories = initialCategories.length > 0 ? initialCategories : reduxCategories;

  const categoryStatus = useSelector(
    selectTourCategoriesStatus
  );

  const categoryError = useSelector(
    selectTourCategoriesError
  );

  /* =======================================================
     PACKAGE DATA
  ======================================================= */

  const reduxPackages = useSelector(selectTourPackages);
  const packagesFromRedux = initialPackages.length > 0 ? initialPackages : reduxPackages;

  const packageStatus = useSelector(
    selectTourPackagesStatus
  );

  const packageError = useSelector(
    selectTourPackagesError
  );

  /* =======================================================
     NORMALIZED CATEGORY
  ======================================================= */

  const normalizedCategory =
    category?.trim().toLowerCase();

  const isCategoryListing =
    !normalizedCategory;

  const isMostPopular =
    normalizedCategory === "most-popular";

  const isSpecialPackages =
    normalizedCategory === "special-packages";

  /* =======================================================
     LOAD CATEGORIES
  ======================================================= */

  useEffect(() => {
    if (initialCategories.length > 0) return;
    dispatch(fetchTourCategories());
  }, [dispatch, initialCategories.length]);

  /* =======================================================
     LOAD PACKAGES
  ======================================================= */

  useEffect(() => {
    if (isCategoryListing || initialPackages.length > 0) {
      return;
    }

    const params = {
      page: 1,
      limit: 100,
    };

    if (isMostPopular) {
      params.mostLoved = true;
    } else if (isSpecialPackages) {
      params.specialPackage = true;
    } else {
      params.categorySlug =
        normalizedCategory;
    }

    dispatch(fetchTourPackages(params));
  }, [
    dispatch,
    isCategoryListing,
    isMostPopular,
    isSpecialPackages,
    normalizedCategory,
  ]);

  /* =======================================================
     CATEGORY CARDS
     
     IMPORTANT:
     
     Only categories with:
     
       showInExplore === true
     
     will appear on /Tour.
  ======================================================= */

  const categoryCards = useMemo(() => {
    return categories
      .filter(
        (category) =>
          category.showInExplore === true
      )
      .map((category) => ({
        ...category,

        packageCount:
          category.packageCount ??
          category.packages?.length ??
          0,
      }));
  }, [categories]);

  /* =======================================================
     PACKAGE LISTING
  ======================================================= */

  const packages = useMemo(() => {
    return packagesFromRedux.map((pkg) => {
      let categoryName =
        pkg.categoryName;

      if (
        !categoryName &&
        pkg.categorySlug
      ) {
        const matchedCategory =
          categories.find(
            (item) =>
              String(item.id)
                .trim()
                .toLowerCase() ===
              String(pkg.categorySlug)
                .trim()
                .toLowerCase()
          );

        categoryName =
          matchedCategory?.name;
      }

      return {
        ...pkg,
        categoryName,
      };
    });
  }, [
    packagesFromRedux,
    categories,
  ]);

  /* =======================================================
     FINAL CARDS
  ======================================================= */

  const cards = isCategoryListing
    ? categoryCards
    : packages;

  /* =======================================================
     SELECTED CATEGORY
  ======================================================= */

  const selectedCategory =
    useMemo(() => {
      if (
        isCategoryListing ||
        isMostPopular ||
        isSpecialPackages
      ) {
        return null;
      }

      return categories.find(
        (item) =>
          String(item.id)
            .trim()
            .toLowerCase() ===
          normalizedCategory
      );
    }, [
      categories,
      normalizedCategory,
      isCategoryListing,
      isMostPopular,
      isSpecialPackages,
    ]);

  /* =======================================================
     LOADING STATES
  ======================================================= */

  const isLoading =
    categoryStatus === "loading" &&
    categories.length === 0;

  const isPackageLoading =
    !isCategoryListing &&
    packageStatus === "loading" &&
    packagesFromRedux.length === 0;

  /* =======================================================
     CATEGORY LOADING
  ======================================================= */

  if (
    isLoading ||
    isPackageLoading
  ) {
    return (
      <MotionConfig reducedMotion="user">
        <section className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-14">
          <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
            >
              <div className="mx-auto h-3 w-40 animate-pulse rounded-full bg-[#F58634]/15" />

              <div className="mx-auto mt-6 h-12 w-3/4 max-w-2xl animate-pulse rounded-xl bg-[#123138]/10 sm:h-14 md:h-16" />

              <div className="mx-auto mt-5 h-px w-40 animate-pulse bg-[#F58634]/20" />

              <div className="mx-auto mt-7 h-4 w-full max-w-3xl animate-pulse rounded-full bg-[#123138]/8" />

              <div className="mx-auto mt-3 h-4 w-4/5 max-w-2xl animate-pulse rounded-full bg-[#123138]/8" />
            </motion.div>

            <TourGridSkeleton />
          </div>
        </section>
      </MotionConfig>
    );
  }

  /* =======================================================
     CATEGORY ERROR
  ======================================================= */

  if (
    categoryStatus === "failed" &&
    categories.length === 0
  ) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Experiences
          </p>

          <h2 className="mt-5 font-['Fraunces'] text-4xl font-medium text-[#0B3C49] sm:text-5xl">
            Unable to Load Tours
          </h2>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            {categoryError ||
              "Something went wrong while loading our tours."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                fetchTourCategories()
              )
            }
            className="
              mt-8
              inline-flex
              cursor-pointer
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              px-6
              py-3
              font-['Inter']
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9701F]
            "
          >
            Try Again

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  /* =======================================================
     PACKAGE ERROR
  ======================================================= */

  if (
    !isCategoryListing &&
    packageStatus === "failed"
  ) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Experiences
          </p>

          <h2 className="mt-5 font-['Fraunces'] text-4xl font-medium text-[#0B3C49] sm:text-5xl">
            Unable to Load Tours
          </h2>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            {packageError ||
              "Something went wrong while loading these tours."}
          </p>

          <button
            type="button"
            onClick={() => {
              const params = {
                page: 1,
                limit: 100,
              };

              if (isMostPopular) {
                params.mostLoved = true;
              } else if (
                isSpecialPackages
              ) {
                params.specialPackage =
                  true;
              } else {
                params.categorySlug =
                  normalizedCategory;
              }

              dispatch(
                fetchTourPackages(params)
              );
            }}
            className="
              mt-8
              inline-flex
              cursor-pointer
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              px-6
              py-3
              font-['Inter']
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9701F]
            "
          >
            Try Again

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  /* =======================================================
     UNKNOWN CATEGORY
  ======================================================= */

  if (
    !isCategoryListing &&
    !isMostPopular &&
    !isSpecialPackages &&
    !selectedCategory
  ) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            404
          </p>

          <h1 className="mt-5 font-['Fraunces'] text-4xl font-medium text-[#0B3C49] sm:text-5xl">
            Tour Category Not Found
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            The tour category you're
            looking for doesn't exist or
            may have been removed.
          </p>

          <Link
            href="/tours"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              px-6
              py-3
              font-['Inter']
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9701F]
            "
          >
            View All Tours

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  /* =======================================================
     NO PACKAGES
  ======================================================= */

  if (
    !isCategoryListing &&
    packageStatus === "succeeded" &&
    packages.length === 0
  ) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Experiences
          </p>

          <h1 className="mt-5 font-['Fraunces'] text-4xl font-medium text-[#0B3C49] sm:text-5xl">
            No Tours Found
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            We couldn't find any journeys
            in this collection yet.
          </p>

          <Link
            href="/tours"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#F58634]
              px-6
              py-3
              font-['Inter']
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D9701F]
            "
          >
            View All Tours

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  /* =======================================================
     SECTION TEXT
  ======================================================= */

  const sectionTitle =
    isCategoryListing
      ? "Discover Your Next Journey"
      : isMostPopular
        ? "Our Most Loved Journeys"
        : isSpecialPackages
          ? "Special Packages"
          : selectedCategory?.name ||
            "Discover Your Next Journey";

  const sectionLabel =
    isCategoryListing
      ? "Where Will India Take You?"
      : isMostPopular
        ? "Chosen By Our Travellers"
        : isSpecialPackages
          ? "Curated For Every Traveller"
          : "Explore This Collection";

  const sectionDescription =
    isCategoryListing
      ? "From royal palaces and ancient cities to tropical backwaters, wild forests and Himalayan valleys — discover India through journeys crafted around the places that make it unforgettable."
      : isMostPopular
        ? "Explore the journeys our travellers love most, carefully selected from across India for unforgettable experiences."
        : isSpecialPackages
          ? "Discover carefully crafted journeys designed for different ways of experiencing India."
          : selectedCategory?.description ||
            "Explore carefully crafted journeys through some of India's most unforgettable destinations.";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-14">

        <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          {/* =================================================
              SECTION HEADER
          ================================================= */}

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
              margin: "-100px",
            }}
            transition={{
              duration: 0.8,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mx-auto mb-14 max-w-4xl text-center md:mb-16"
          >
            <p className="mb-5 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#F58634] sm:text-[11px]">
              {sectionLabel}
            </p>

            <h2 className="font-['Fraunces'] text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#0B3C49] sm:text-5xl md:text-6xl lg:text-[64px]">
              {sectionTitle}
            </h2>

            <div className="mx-auto mt-5 h-px w-40 bg-[#F58634]" />

            <p className="mx-auto mt-7 max-w-3xl font-['Inter'] text-sm leading-7 text-[#5F6F73] sm:text-[15px] md:text-base">
              {sectionDescription}
            </p>
          </motion.div>

          {/* =================================================
              CATEGORY / PACKAGE GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-flow-dense md:auto-rows-[180px]">
            {cards.map(
              (item, index) => (
                <TourCard
                  key={item.id}
                  pkg={item}
                  index={index}
                  isCategory={
                    isCategoryListing
                  }
                  className={
                    cardLayouts[
                      index %
                        cardLayouts.length
                    ]
                  }
                />
              )
            )}
          </div>

          {/* =================================================
              CUSTOM JOURNEY CTA
          ================================================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            variants={
              customJourneyVariants
            }
            className="
              group
              relative
              mt-5
              min-h-[330px]
              overflow-hidden
              rounded-4xl
              bg-[#0B3C49]
              sm:min-h-[360px]
              md:min-h-[390px]
            "
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-[#F58634]" />

            <div
              className={`
                pointer-events-none
                absolute
                -right-32
                -top-40
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#F58634]/10
                blur-3xl
                transition-transform
                duration-1000
                ${
                  prefersReducedMotion
                    ? ""
                    : "group-hover:scale-125"
                }
              `}
            />

            <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full border border-white/[0.05]" />

            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
              <div className="absolute left-1/4 top-0 h-full w-px bg-white" />

              <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

              <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
            </div>

            <div className="relative flex min-h-[330px] flex-col justify-between p-7 sm:min-h-[360px] sm:p-10 md:min-h-[390px] md:p-14 lg:p-16">

              {/* TOP */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                  <span className="font-['Fraunces'] text-3xl font-light text-white/40">
                    {String(
                      cards.length + 1
                    ).padStart(2, "0")}
                  </span>

                  <span className="h-px w-10 bg-white/20" />

                  <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    Made For You
                  </span>
                </div>

                <Sparkles
                  className="h-5 w-5 text-cyan-300"
                  aria-hidden="true"
                />
              </div>

              {/* CONTENT */}

              <div className="mt-12 max-w-4xl">

                <h3 className="font-['Fraunces'] text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Your India.

                  <span className="block italic text-cyan-300">
                    Your way.
                  </span>
                </h3>

                <p className="mt-5 max-w-2xl font-['Inter'] text-sm leading-7 text-white/60 sm:text-base">
                  Have something different in mind?
                  Tell us how you want to experience
                  India and we'll create a journey
                  around your interests, pace and
                  dreams.
                </p>
              </div>

              {/* BOTTOM */}

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <span className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Completely personalised · Expertly planned
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setIsEnquiryOpen(true)
                  }
                  aria-haspopup="dialog"
                  aria-expanded={
                    isEnquiryOpen
                  }
                  className="
                    group
                    inline-flex
                    w-fit
                    cursor-pointer
                    items-center
                    gap-4
                    rounded-3xl
                    bg-[#F58634]
                    px-6
                    py-3.5
                    font-['Inter']
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#0B3C49]
                    outline-none
                    transition-all
                    duration-300
                    hover:bg-white
                    focus-visible:ring-2
                    focus-visible:ring-white
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#0B3C49]
                  "
                >
                  Create Your Journey

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FOOTER LINE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mt-6 flex flex-col justify-between gap-2 rounded-2xl border-t border-[#124D56]/10 pt-5 sm:flex-row"
          >
            <p className="font-['Inter'] text-[12px] uppercase tracking-[0.2em] text-[#7BCBDA]">
              Curated journeys across India
            </p>

            <p className="font-['Inter'] text-[12px] uppercase tracking-[0.2em] text-[#7BCBDA]">
              Times India Travels
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ENQUIRY FORM
      ===================================================== */}

      {isEnquiryOpen && (
        <TourPackage_Enquiry_Form
          onClose={() =>
            setIsEnquiryOpen(false)
          }
        />
      )}
    </MotionConfig>
  );
}