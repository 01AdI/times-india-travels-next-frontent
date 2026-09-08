"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Package, MapPin } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Destination_Category({ data }) {
  const categories = data?.categories || [];

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const selectedCategory = categories[activeCategory];


  const gallery = useMemo(() => {
    if (!selectedCategory) return [];

    if (
      Array.isArray(selectedCategory.destinations_gallery) &&
      selectedCategory.destinations_gallery.length > 0
    ) {
      return selectedCategory.destinations_gallery;
    }

    if (selectedCategory.heroImage) {
      return [
        {
          url: selectedCategory.heroImage,
          caption: selectedCategory.name,
        },
      ];
    }

    return [];
  }, [selectedCategory]);

  const currentImage = gallery[activeImage];
  const packageCount = selectedCategory?.packages?.length || 0;


  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    setActiveImage(0);
  };

  useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % gallery.length);
    }, 4700);

    return () => clearInterval(interval);
  }, [gallery.length, activeCategory]);


  if (!data || !categories.length) {
    return null;
  }

  const categoryNumber = (index) =>
    String(index + 1).padStart(2, "0");

  return (
    <section
      id="destination-categories"
      className="
        relative
        overflow-hidden
        bg-[#0B3C49]
        py-20
        sm:py-24
        md:py-28
        lg:py-32
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-0
          h-150
          w-150
          rounded-full
          bg-[#F58634]/7
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-60
          bottom-0
          h-137.5
          w-137.5
          rounded-full
          bg-black/15
          blur-[120px]
        "
      />

      {/* subtle vertical editorial line */}

      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-0
          hidden
          h-full
          w-px
          bg-white/[0.035]
          lg:block
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-375
          px-6
          sm:px-10
          lg:px-14
          xl:px-20
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-16
            max-w-4xl
            sm:mb-20
            lg:mb-24
          "
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
                bg-cyan-300
              "
            />

            <span
              className="
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-cyan-300
                sm:text-[10px]
              "
            >
              Explore {data.name}
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              max-w-4xl
              font-['Fraunces']
              text-[clamp(2.8rem,6vw,5.8rem)]
              font-medium
              leading-[0.94]
              tracking-[-0.035em]
              text-white
            "
          >
            Find the journey
            <br />

            <span className="italic text-cyan-300">
              that feels like yours.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-2xl
              font-['Inter']
              text-sm
              leading-[1.9]
              text-white/55
              sm:text-base
            "
          >
            From iconic routes to slower, more immersive
            journeys, explore the different ways to
            experience {data.name}.
          </p>
        </motion.div>

        <div
          className="
            grid
            gap-12
            lg:grid-cols-[300px_minmax(0,1fr)]
            lg:gap-16
            xl:grid-cols-[340px_minmax(0,1fr)]
            xl:gap-20
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              lg:sticky
              lg:top-28
              lg:self-start
            "
          >
            {/* Navigation heading */}

            <div
              className="
                mb-7
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white/30
                "
              >
                Tour categories
              </span>

              <span
                className="
                  font-['IBM_Plex_Mono']
                  text-[9px]
                  tracking-[0.15em]
                  text-white/20
                "
              >
                {String(categories.length).padStart(2, "0")}
              </span>
            </div>

            {/* Categories */}

            <div className="border-t border-white/10">
              {categories.map((category, index) => {
                const isActive = index === activeCategory;
                const count = category?.packages?.length || 0;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(index)}
                    className="
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-4
                      border-b
                      border-white/10
                      py-5
                      text-left
                      sm:py-6
                    "
                  >
                    {/* Active line */}

                    <span
                      className={`
                        absolute
                        left-0
                        top-0
                        h-full
                        w-0.5
                        origin-top
                        bg-[#F58634]
                        transition-transform
                        duration-500
                        ${
                          isActive
                            ? "scale-y-100"
                            : "scale-y-0"
                        }
                      `}
                    />

                    {/* Number */}

                    <span
                      className={`
                        w-7
                        shrink-0
                        pl-1
                        font-['IBM_Plex_Mono']
                        text-[9px]
                        tracking-[0.15em]
                        transition-colors
                        duration-300
                        ${
                          isActive
                            ? "text-[#F58634]"
                            : "text-white/20 group-hover:text-white/45"
                        }
                      `}
                    >
                      {categoryNumber(index)}
                    </span>

                    {/* Category */}

                    <span
                      className={`
                        flex-1
                        font-['Fraunces']
                        text-[19px]
                        leading-[1.15]
                        transition-all
                        duration-300
                        sm:text-[22px]
                        ${
                          isActive
                            ? "translate-x-1 text-white"
                            : "text-white/40 group-hover:text-white/75"
                        }
                      `}
                    >
                      {category.name}
                    </span>

                    {/* Package count */}

                    <span
                      className={`
                        hidden
                        font-['IBM_Plex_Mono']
                        text-[8px]
                        tracking-widest
                        transition-colors
                        duration-300
                        sm:block
                        ${
                          isActive
                            ? "text-white/50"
                            : "text-white/15"
                        }
                      `}
                    >
                      {String(count).padStart(2, "0")}
                    </span>

                    {/* Arrow */}

                    <ChevronRight
                      size={16}
                      strokeWidth={1.4}
                      className={`
                        shrink-0
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "translate-x-0 text-[#F58634] opacity-100"
                            : "-translate-x-2 text-white opacity-0 group-hover:opacity-40"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* Selected category description */}

            <AnimatePresence mode="wait">
              {selectedCategory && (
                <motion.div
                  key={selectedCategory.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="mt-8"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin
                      size={12}
                      strokeWidth={1.5}
                      className="text-[#F58634]"
                    />

                    <span
                      className="
                        font-['Inter']
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white/30
                      "
                    >
                      About this journey
                    </span>
                  </div>

                  <p
                    className="
                      max-w-xs
                      font-['Inter']
                      text-[12px]
                      leading-[1.8]
                      text-white/45
                    "
                  >
                    {selectedCategory.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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
              amount: 0.15,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="min-w-0"
          >
            <div
              className="
                relative
                overflow-hidden
                bg-[#082E38]
              "
            >
              {/* Image */}

              <div
                className="
                  relative
                  aspect-16/10
                  overflow-hidden
                  sm:aspect-video
                  lg:aspect-16/8.5
                "
              >
                {currentImage?.url ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selectedCategory.id}-${activeImage}`}
                      src={currentImage.url}
                      alt={
                        currentImage.caption ||
                        selectedCategory.name
                      }
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.015,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </AnimatePresence>
                ) : (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-[#103F4A]
                    "
                  >
                    <span
                      className="
                        font-['Fraunces']
                        text-2xl
                        italic
                        text-white/30
                      "
                    >
                      {selectedCategory.name}
                    </span>
                  </div>
                )}

                {/* Dark overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-[#061A20]/80
                    via-transparent
                    to-[#061A20]/10
                  "
                />

                {/* Top information */}

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-5
                    flex
                    items-start
                    justify-between
                    sm:left-7
                    sm:right-7
                    sm:top-7
                  "
                >
                  {/* Category */}

                  <div className="flex items-center gap-3">
                    <span
                      className="
                        h-px
                        w-8
                        bg-[#F58634]
                      "
                    />

                    <span
                      className="
                        font-['Inter']
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-white/85
                      "
                    >
                      {selectedCategory.name}
                    </span>
                  </div>

                  {/* Image counter */}

                  {gallery.length > 1 && (
                    <span
                      className="
                        font-['IBM_Plex_Mono']
                        text-[9px]
                        tracking-[0.15em]
                        text-white/55
                      "
                    >
                      {String(activeImage + 1).padStart(
                        2,
                        "0"
                      )}
                      {" / "}
                      {String(gallery.length).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  )}
                </div>

                {/* Bottom content */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-5
                    right-5
                    sm:bottom-8
                    sm:left-7
                    sm:right-7
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      sm:flex-row
                      sm:items-end
                      sm:justify-between
                    "
                  >
                    <div>
                      {currentImage?.caption && (
                        <p
                          className="
                            mb-2
                            font-['Inter']
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-[#F58634]
                          "
                        >
                          {currentImage.caption}
                        </p>
                      )}

                      <h3
                        className="
                          max-w-xl
                          font-['Fraunces']
                          text-[clamp(1.8rem,4vw,3.5rem)]
                          font-medium
                          leading-[0.98]
                          tracking-tight
                          text-white
                        "
                      >
                        {selectedCategory.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="
                flex
                flex-col
                gap-6
                border-b
                border-white/10
                py-7
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Left information */}

              <div className="flex items-center gap-4">
                <span
                  className="
                    font-['IBM_Plex_Mono']
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-white/25
                  "
                >
                  {String(activeCategory + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span className="h-px w-8 bg-white/10" />

                <p
                  className="
                    max-w-md
                    font-['Inter']
                    text-[11px]
                    leading-[1.7]
                    text-white/40
                  "
                >
                  Explore curated tour packages designed
                  around {selectedCategory.name.toLowerCase()}.
                </p>
              </div>

              {/* CTA */}

              <Link
                href={`/tours/${selectedCategory.id}`}
                className="
                  group
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-[#F58634]
                  px-5
                  py-3
                  font-['Inter']
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#F58634]
                "
              >
                <span>
                  Explore {packageCount}{" "}
                  {packageCount === 1
                    ? "package"
                    : "packages"}
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.6}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            </div>

            {gallery.length > 1 && (
              <div className="mt-6 flex gap-1.5">
                {gallery.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View image ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className="
                      relative
                      h-0.5
                      flex-1
                      overflow-hidden
                      bg-white/10
                    "
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        width:
                          index === activeImage
                            ? "100%"
                            : "0%",
                      }}
                      transition={{
                        duration:
                          index === activeImage
                            ? 4.5
                            : 0.2,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        inset-y-0
                        left-0
                        bg-[#F58634]
                      "
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="
            mt-20
            flex
            flex-col
            gap-6
            border-t
            border-white/10
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:mt-24
          "
        >
          <p
            className="
              font-['IBM_Plex_Mono']
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            {data.name} · Times India Travels
          </p>

          <p
            className="
              max-w-md
              font-['Fraunces']
              text-sm
              italic
              text-white/25
              sm:text-right
            "
          >
            Every route is a beginning. Let us shape
            what comes next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}