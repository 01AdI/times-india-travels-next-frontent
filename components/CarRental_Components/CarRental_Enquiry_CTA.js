"use client";

import { useState } from "react";
import CarRental_EnquiryModal from "./CarRental_EnquiryModal";
import {ArrowRight} from "lucide-react";


export default function CarRental_Enquiry_CTA(){
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState("");
    
    const openEnquiry = (vehicle = "") => {
        setSelectedVehicle(vehicle);
        setIsEnquiryOpen(true);
    };

    const closeEnquiry = () => {
        setIsEnquiryOpen(false);
    };

    return(
      <section className="relative overflow-hidden bg-[#124d56] px-6 py-14 sm:py-14">

        <div className="relative mx-auto max-w-4xl text-center">
          <p
            className="
              font-['Inter']
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#F58634]
              sm:text-xs
            "
          >
            Your Journey, Your Way
          </p>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-[clamp(2rem,4vw,3.25rem)]
              font-medium
              leading-tight
              text-white
            "
          >
            Ready to take the road?
          </h2>

          <div className="mx-auto mt-6 h-px w-12 bg-[#F58634]" />

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              font-['Inter']
              text-[15px]
              leading-relaxed
              text-white/65
              sm:text-base
            "
          >
            Tell us where you'd like to go, how you'd like to travel,
            and who you're travelling with. We'll recommend the right
            vehicle and help shape the journey around you.
          </p>

          {/* CTA */}

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="
                group
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
                tracking-wide
                text-white
                shadow-[0_12px_30px_-12px_rgba(245,134,52,0.7)]
                transition-all
                duration-300
                hover:bg-[#D9701F]
                hover:shadow-[0_16px_35px_-10px_rgba(245,134,52,0.8)]
              "
            >
              Plan My Journey

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  transition-all
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:bg-white/25
                "
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>

          {/* Trust Points */}

          <div
            className="
              mt-9
              flex
              flex-wrap
              justify-center
              gap-x-7
              gap-y-3
            "
          >
            {[
              "Tailor-made journeys",
              "Experienced chauffeurs",
              "24×7 assistance",
            ].map((item) => (
              <span
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  font-['Inter']
                  text-[11px]
                  uppercase
                  tracking-[0.08em]
                  text-white/45
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />

                {item}
              </span>
            ))}
          </div>
        </div>

        <CarRental_EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={closeEnquiry}
            selectedCar={selectedVehicle}
        />
      </section>
      
    )
}