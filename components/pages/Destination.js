"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import {fetchDestinationDetail} from "../../features/Destination-page/Destination_Detail_Slice";

import Destination_Hero from "../Destination_Components/Destination_Hero";
import Destination_Overview from "../Destination_Components/Destination_Overview";
import Destination_Category from "../Destination_Components/Destination_Category";
import Destination_CTA from "../Destination_Components/Destination_CTA";
import Destination_Other from "../Destination_Components/Destination_Other";

export default function Destination({ initialDestination = null, id: idProp }) {
  const params = useParams();
  const id = idProp || params?.id;
  const dispatch = useDispatch();

  const { destination: reduxDestination, status: reduxStatus, error } = useSelector((state) => state.destinationDetail);
  const destination = initialDestination || reduxDestination;
  const status = initialDestination ? "succeeded" : reduxStatus;

  useEffect(() => {
    if (!id || initialDestination) return;
    dispatch(fetchDestinationDetail(id));
  }, [dispatch, id, initialDestination]);

  if (status === "loading" ||status === "idle") {
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
              Loading destination
            </p>

          </div>
        </section>
      </main>
    );
  }

  if (status === "failed" ||!destination) {
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
              Destination Not Found
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
                "The destination you are looking for does not exist or may have been removed."}
            </p>

            <Link
              href="/"
              className="
                group
                mt-8
                inline-flex
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
              <span>View destinations</span>

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <Destination_Hero data={destination}></Destination_Hero>
      <Destination_Overview data={destination}></Destination_Overview>
      <Destination_Category data={destination}></Destination_Category>
      <Destination_CTA data={destination}></Destination_CTA>
      <Destination_Other data={destination}></Destination_Other>
    </>
  );
}
