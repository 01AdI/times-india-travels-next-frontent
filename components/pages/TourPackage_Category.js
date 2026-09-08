"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  fetchTourCategories,
  selectTourCategories,
  selectTourCategoriesStatus,
  selectTourCategoriesError,
} from "../../features/tour-categories/tourCategory_Slice";

import TourPackage_category_Hero from "../TourPackage_Category_Component/Tour_Category_Hero";
import TourPackage_Category_SubCategory from "../TourPackage_Category_Component/Tour_Category_SubCategory";
import TourPackage_Category_Highlights from "../TourPackage_Category_Component/Tour_Category_Highlight";
import TourPackage_Category_CTA from "../TourPackage_Category_Component/Tour_Category_CTA";

export default function TourPackage_category({ initialCategory = null, category: categoryProp }) {
  const params = useParams();
  const category = categoryProp || params?.category;
  const dispatch = useDispatch();

  const reduxCategories = useSelector(selectTourCategories);
  const categories = initialCategory ? [initialCategory] : reduxCategories;
  const reduxStatus = useSelector(selectTourCategoriesStatus);
  const status = initialCategory ? "succeeded" : reduxStatus;
  const error = useSelector(selectTourCategoriesError);

  const normalizedCategory = category?.trim().toLowerCase();

  useEffect(() => {
    if (initialCategory) return;
    dispatch(fetchTourCategories());
  }, [dispatch, initialCategory]);

  const categoryData = useMemo(() => {
    if (initialCategory) return initialCategory;
    if (!categories?.length || !normalizedCategory) return null;

    if (normalizedCategory === "most-popular") {
      const mostLovedPackages = categories.flatMap((tourCategory) =>
        (tourCategory.packages || []).filter((pkg) => pkg.mostLoved === true)
      );
      return {
        id: "most-popular",
        name: "Most Popular Packages",
        tagline: "Our Most Loved Journeys",
        description: "Explore the journeys our travelers love most, carefully selected from across India for unforgettable experiences.",
        heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
        packages: mostLovedPackages,
      };
    }

    if (normalizedCategory === "special-packages") {
      const specialPackages = categories.flatMap((tourCategory) =>
        (tourCategory.packages || []).filter((pkg) => pkg.specialPackage === true)
      );
      return {
        id: "special-packages",
        name: "Special Packages",
        tagline: "Curated for Every Traveler",
        description: "Luxury escapes, family vacations, honeymoon trips, and adventure tours crafted just for you.",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1600&auto=format&fit=crop",
        packages: specialPackages,
      };
    }

    return categories.find((tourCategory) => String(tourCategory.id).trim().toLowerCase() === normalizedCategory) || null;
  }, [initialCategory, categories, normalizedCategory]);

  if (status === "loading" && categories.length === 0) {
    return (
      <section className="min-h-[60vh] bg-[#F2FAFB] px-6 py-16">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-3 w-32 rounded-full bg-[#123138]/10" />

            <div className="mx-auto mt-5 h-10 w-3/4 max-w-xl rounded-lg bg-[#123138]/10 sm:h-12" />

            <div className="mx-auto mt-5 h-2 w-12 rounded-full bg-[#F58634]/20" />

            <div className="mx-auto mt-6 h-4 w-full max-w-2xl rounded-full bg-[#123138]/8" />

            <div className="mx-auto mt-3 h-4 w-4/5 max-w-xl rounded-full bg-[#123138]/8" />
          </div>


          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-4xl border border-[#123138]/8 bg-white"
              >
                <div className="h-64 bg-[#123138]/8" />

                <div className="space-y-4 p-7">

                  <div className="h-3 w-24 rounded-full bg-[#1EA5BE]/10" />

                  <div className="h-7 w-4/5 rounded-lg bg-[#123138]/10" />

                  <div className="h-4 w-full rounded-full bg-[#123138]/8" />

                  <div className="h-4 w-5/6 rounded-full bg-[#123138]/8" />

                  <div className="flex items-center justify-between pt-4">

                    <div className="h-3 w-20 rounded-full bg-[#123138]/8" />

                    <div className="h-10 w-28 rounded-full bg-[#F58634]/15" />

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    );
  }

  if (status === "failed" && categories.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#F2FAFB] px-6">

        <div className="max-w-xl text-center">

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Categories
          </p>

          <h1 className="mt-4 font-['Fraunces'] text-4xl font-medium text-[#123138] sm:text-5xl">
            Unable to Load Tours
          </h1>

          <div className="mx-auto mt-6 h-0.5 w-10 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#6D6D6D]">
            {error ||
              "We couldn't load the tour categories right now."}
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchTourCategories())}
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
            "
          >
            Try Again

            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

      </section>
    );
  }

  if (!categoryData) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F2FAFB] px-6 text-center">

        <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
          404
        </p>

        <h1 className="mt-4 font-['Fraunces'] text-4xl font-semibold text-[#0B3C49] sm:text-5xl">
          Tour Category Not Found
        </h1>

        <p className="mt-5 max-w-md font-['Inter'] text-sm leading-7 text-[#6D6D6D]">
          The tour category you're looking for doesn't exist or may
          have been removed.
        </p>

        <Link
          href="/tours"
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
          "
        >
          View All Tours

          <ArrowRight className="h-4 w-4" />
        </Link>

      </section>
    );
  }

  return (
    <>
      <TourPackage_category_Hero data={categoryData}></TourPackage_category_Hero>
      <TourPackage_Category_Highlights data={categoryData}></TourPackage_Category_Highlights>
      <TourPackage_Category_SubCategory subcategories={categoryData.packages || []}></TourPackage_Category_SubCategory>
      <TourPackage_Category_CTA data={categoryData}></TourPackage_Category_CTA>
    </>
  );
}