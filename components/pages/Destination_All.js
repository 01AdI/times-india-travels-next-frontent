"use client";

import { useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import Destination_Hero from "../Destination_Components/Destination_Hero";
import DestinationGrid from "../Destination_Components/Destination_Grid";
import Destination_CTA from "../Destination_Components/Destination_CTA";

import { fetchDestinations } from "../../features/Home-page/clinet_Destination_Slice";

export default function Destination_All({ initialDestinations = [] }) {
  const dispatch = useDispatch();

  const {
    destinations: destinationList,
    status,
    error,
  } = useSelector((state) => state.destinations);

  const destinations = initialDestinations.length > 0 ? initialDestinations : (destinationList || []);

  useEffect(() => {
    if (initialDestinations.length > 0) return;
    dispatch(fetchDestinations());
  }, [dispatch, initialDestinations.length]);

  if ((status === "loading" || status === "idle") &&destinations.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#F2FAFB]">
        <section className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#124D56]/8
              "
            >
              <Loader2
                className="
                  h-6
                  w-6
                  animate-spin
                  text-[#124D56]
                "
              />
            </div>

            <p
              className="
                mt-5
                font-['IBM_Plex_Mono']
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#124D56]/45
              "
            >
              Loading destinations
            </p>

          </div>
        </section>
      </main>
    );
  }

  if (status === "failed" && destinations.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#F2FAFB]">
        <section
          className="
            flex
            min-h-[70vh]
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div className="max-w-xl">

            <span
              className="
                font-['Inter']
                text-[9px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#F58634]
              "
            >
              Times India Travels
            </span>

            <h1
              className="
                mt-5
                font-['Fraunces']
                text-[clamp(2.8rem,7vw,5rem)]
                font-medium
                leading-[0.95]
                tracking-[-0.035em]
                text-[#0B3C49]
              "
            >
              Destinations Unavailable
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-md
                font-['Inter']
                text-sm
                leading-[1.8]
                text-[#124D56]/55
              "
            >
              {error ||
                "Something went wrong while loading our destinations."}
            </p>

            <button
              type="button"
              onClick={() => dispatch(fetchDestinations())}
              className="
                group
                mt-8
                inline-flex
                cursor-pointer
                items-center
                gap-3
                rounded-full
                bg-[#F58634]
                px-6
                py-3.5
                font-['Inter']
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0B3C49]
              "
            >
              <span>Try Again</span>

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

          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <Destination_Hero />
      <DestinationGrid data={destinations} />
      <Destination_CTA />
    </>
  );
}