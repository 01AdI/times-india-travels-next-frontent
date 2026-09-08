"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import {
  fetchTourPackageDetail,
  selectTourPackageDetail,
  selectTourPackageDetailStatus,
  selectTourPackageDetailError,
} from "../../features/Tour-packages/tour_Package_Slice";

import TourPackage_Sub_Hero from "../TourPackage_Cat_Sub_Components/TourPackage_sub_Hero";
import TourPackage_Sub_Intro from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Into";
import TourPackage_Sub_CTA from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_CTA";
import TourPackage_Sub_RelatedTours from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_RelatedTours";

// import TourPackage_Sub_Itinerary_4 from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Itinerary_4";
import TourPackage_Category_CTA from "../TourPackage_Category_Component/Tour_Category_CTA";
import TourPackage_Sub_Itinerary_5 from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Itineray_5";

// Optional components
import TourPackage_Sub_Highlights from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Highlights";
// import TourPackage_Sub_AtAGlance from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_AtAGlance";
// import TourPackage_Sub_Itinerary from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Itinerary";
// import TourPackage_Sub_Itinerary_2 from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Itineray_2";
// import TourPackage_Sub_Itinerary_3 from "../TourPackage_Cat_Sub_Components/TourPackage_Sub_Itineray_3";

export default function TourPackage_cat_sub({ initialTour = null, category: categoryProp, sub: subProp }) {
  const params = useParams();
  const category = categoryProp || params?.category;
  const sub = subProp || params?.sub;
  const dispatch = useDispatch();

  const reduxTour = useSelector(selectTourPackageDetail);
  const reduxStatus = useSelector(selectTourPackageDetailStatus);
  const error = useSelector(selectTourPackageDetailError);
  const tour = initialTour || reduxTour;
  const status = initialTour ? "succeeded" : reduxStatus;

  useEffect(() => {
    if (!sub || initialTour) return;
    dispatch(fetchTourPackageDetail(sub));
  }, [dispatch, sub, initialTour]);


  if (status === "loading" || status === "idle") {
    return (
      <section className="min-h-screen bg-[#F2FAFB] px-6 py-24">
        <div className="mx-auto max-w-7xl animate-pulse">
          {/* Hero skeleton */}
          <div className="h-125 rounded-4xl bg-[#0B3C49]/10" />

          {/* Content skeleton */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="h-5 w-40 rounded-full bg-[#F58634]/15" />

            <div className="mt-6 h-14 w-3/4 rounded-xl bg-[#0B3C49]/10" />

            <div className="mt-4 h-4 w-full rounded-full bg-[#0B3C49]/10" />

            <div className="mt-3 h-4 w-5/6 rounded-full bg-[#0B3C49]/10" />
          </div>
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">
          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Experiences
          </p>

          <h1 className="mt-5 font-['Fraunces'] text-5xl font-medium text-[#0B3C49]">
            Tour Not Found
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            {error ||
              "We couldn't find the tour package you're looking for."}
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
              text-[#0B3C49]
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

  if (!tour) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F2FAFB] px-6">
        <div className="max-w-xl text-center">
          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
            Tour Experiences
          </p>

          <h1 className="mt-5 font-['Fraunces'] text-5xl font-medium text-[#0B3C49]">
            Tour Not Found
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-[#F58634]" />

          <p className="mt-6 font-['Inter'] text-sm leading-7 text-[#5F6F73]">
            We couldn't find the tour package you're looking for.
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
              text-[#0B3C49]
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


  return (
    <>
      <TourPackage_Sub_Hero tour={tour} />
      <TourPackage_Sub_Intro tour={tour} />
      {/* <TourPackage_Sub_AtAGlance tour={tour} /> */}
      {/* <TourPackage_Sub_Itinerary tour={tour} /> */}
      {/* <TourPackage_Sub_Itinerary_2 tour={tour} /> */}
      {/* <TourPackage_Sub_Itinerary_3 tour={tour} /> */}
      {/* <TourPackage_Sub_Itinerary_4 tour={tour} /> */}
      <TourPackage_Sub_Itinerary_5 tour={tour}></TourPackage_Sub_Itinerary_5>
      {/* <TourPackage_Sub_Highlights tour={tour} /> */}
      <TourPackage_Sub_CTA tour={tour} />
      <TourPackage_Sub_RelatedTours tour={tour} />
    </>
  );
}