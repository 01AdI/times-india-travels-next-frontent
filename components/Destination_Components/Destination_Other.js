"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { destinations } from "../../utils/Destination_data";

export default function Destination_Other({ data }) {
  if (!data) return null;

  // Remove the destination currently being viewed
  const otherDestinations = destinations.filter(
    (destination) => destination.id !== data.id,
  );

  if (!otherDestinations.length) return null;

  return (
    <section
      id="destination-other"
      className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-13 lg:py-15"
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#F58634]/5
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          bottom-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#124d56]/5
          blur-[100px]
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

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14 max-w-3xl"
        >
          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#F58634]" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F58634]
                sm:text-xs
              "
            >
              Continue Exploring
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              font-['Fraunces']
              text-4xl
              font-medium
              leading-[1.05]
              tracking-tight
              text-[#124d56]
              sm:text-5xl
              md:text-6xl
            "
          >
            There is more to{" "}
            <span className="italic text-[#F58634]">
              discover.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              font-['Inter']
              text-sm
              leading-7
              text-[#124d56]/60
              sm:text-base
              sm:leading-8
            "
          >
            From Himalayan landscapes to tropical coastlines, discover
            another side of the world with journeys designed around
            unforgettable places and experiences.
          </p>
        </motion.div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          "
        >
          {otherDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/destination/${destination.id}`}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[2px]
                  bg-[#124d56]
                "
              >
                {/* Image */}

                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                  "
                >
                  <motion.img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                    whileHover={{
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />

                  {/* Dark image treatment */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#061B1F]/90
                      via-[#061B1F]/20
                      to-transparent
                    "
                  />

                  {/* Orange glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-[#F58634]/20
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-700
                      group-hover:opacity-100
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-6
                      sm:p-8
                    "
                  >
                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span className="h-px w-8 bg-[#F58634]" />

                      <span
                        className="
                          font-['Inter']
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.28em]
                          text-white/65
                        "
                      >
                        Destination
                      </span>
                    </div>

                    <div
                      className="
                        flex
                        items-end
                        justify-between
                        gap-6
                      "
                    >
                      <div>
                        <h3
                          className="
                            font-['Fraunces']
                            text-3xl
                            font-medium
                            text-white
                            sm:text-4xl
                          "
                        >
                          {destination.name}
                        </h3>

                        <p
                          className="
                            mt-2
                            max-w-md
                            font-['Inter']
                            text-xs
                            leading-6
                            text-white/65
                            sm:text-sm
                          "
                        >
                          {destination.tagline}
                        </p>
                      </div>

                      {/* Arrow */}

                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/25
                          bg-white/10
                          text-white
                          backdrop-blur-sm
                          transition-all
                          duration-300
                          group-hover:border-[#F58634]
                          group-hover:bg-[#F58634]
                          group-hover:text-white
                        "
                      >
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.7}
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="
            mt-12
            flex
            items-center
            gap-5
            border-t
            border-[#124d56]/10
            pt-7
          "
        >
          <p
            className="
              font-['Inter']
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#124d56]
            "
          >
            More places · More stories · More journeys
          </p>

        </motion.div>
      </div>
    </section>
  );
}