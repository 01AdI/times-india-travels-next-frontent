"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Compass } from "lucide-react";

export default function Destination_Overview({ data }) {
  if (!data) {
    return null;
  }

  const categoryCount = data.categories?.length || 0;

  return (
    <section
      id="destination-overview"
      className="
        relative
        overflow-hidden
        bg-[#F2FAFB]
        py-13
        sm:py-13
        md:py-14
        lg:py-15
      "
    >
        
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          h-72
          w-72
          rounded-full
          bg-[#F58634]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-[#103F4A]/5
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          sm:px-10
          lg:px-14
          xl:px-20
        "
      >
        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-20
            xl:gap-28
          "
        >

          <div
            data-aos="fade-right"
            data-aos-duration="3000"
            className="
              relative
              mx-auto
              w-full
              max-w-md
              lg:mx-0
            "
          >
            {/* Decorative frame */}

            <div
              className="
                absolute
                -bottom-5
                -left-5
                h-full
                w-full
                border
                border-[#F58634]/40
              "
            />

            {/* Image */}

            <div
              className="
                relative
                aspect-4/5
                overflow-hidden
                rounded-xs
              "
            >
              <img
                src={data.heroImage}
                alt={`${data.name} destination`}
                className="
                  h-full
                  w-full
                  object-cover
                "
               
              />

              {/* Image overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-[#103F4A]/55
                  via-transparent
                  to-transparent
                "
              />

              {/* Image label */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  flex
                  items-center
                  gap-3
                  text-white
                "
              >
                <Compass
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#F58634]"
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                  "
                >
                  Discover {data.name}
                </span>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="3000" 
          >
            {/* Eyebrow */}

            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-[#F58634]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#F58634]
                  sm:text-xs
                "
              >
                A Closer Look
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                max-w-2xl
                font-['Fraunces']
                text-4xl
                font-medium
                leading-[1.05]
                tracking-tight
                text-[#103F4A]
                sm:text-5xl
                md:text-6xl
              "
            >
              Discover the soul of{" "}
              <span className="italic text-[#F58634]">
                {data.name}
              </span>
            </h2>

            {/* Divider */}

            <div
              className="
                mt-7
                h-px
                w-full
                max-w-xl
                bg-[#103F4A]/10
              "
            />

            {/* Description */}

            <p
              className="
                mt-7
                max-w-2xl
                text-sm
                leading-7
                text-slate-600
                sm:text-base
                sm:leading-8
              "
            >
              {data.description}
            </p>

            <div
              className="
                mt-9
                grid
                grid-cols-2
                gap-6
                border-y
                border-[#103F4A]/10
                py-6
                sm:max-w-xl
                sm:grid-cols-3
              "
            >
              {/* Destination */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-slate-400
                  "
                >
                  Destination
                </p>

                <p
                  className="
                    mt-2
                    font-['Fraunces']
                    text-xl
                    text-[#103F4A]
                  "
                >
                  {data.name}
                </p>
              </div>

              {/* Categories */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-slate-400
                  "
                >
                  Packages
                </p>

                <p
                  className="
                    mt-2
                    font-['Fraunces']
                    text-xl
                    text-[#103F4A]
                  "
                >
                  {String(categoryCount).padStart(2, "0")}
                </p>
              </div>

              {/* Journey */}

              <div>
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-slate-400
                  "
                >
                  Journey
                </p>

                <p
                  className="
                    mt-2
                    font-['Fraunces']
                    text-xl
                    text-[#103F4A]
                  "
                >
                  Tailored
                </p>
              </div>
            </div>

            <a
              href="#destination-categories"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#103F4A]
              "
            >
              Explore the experiences

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#103F4A]/20
                  transition-all
                  duration-300
                  group-hover:border-[#F58634]
                  group-hover:bg-[#F58634]
                  group-hover:text-white
                "
              >
                <ArrowDownRight
                  size={15}
                  strokeWidth={1.7}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}