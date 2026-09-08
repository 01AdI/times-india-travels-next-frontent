"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";

import { fetchClientGallery } from "../../features/AboutUs-page/client_Gallery_Slice";


export default function AboutUs_Gallery() {
  const dispatch = useDispatch();

  const {gallery,status,error,} = useSelector((state) => state.clientGallery);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(fetchClientGallery());
  }, [dispatch]);


  useEffect(() => {
    if (gallery.length === 0) {
      setCurrent(0);
      return;
    }

    if (current >= gallery.length) {
      setCurrent(0);
    }
  }, [gallery.length, current]);

  useEffect(() => {
    if (gallery.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [gallery.length]);

  const nextPhoto = () => {
    if (gallery.length <= 1) {
      return;
    }

    setCurrent((prev) => (prev + 1) % gallery.length);
  };

  const previousPhoto = () => {
    if (gallery.length <= 1) {
      return;
    }

    setCurrent(
      (prev) => (prev - 1 + gallery.length) % gallery.length
    );
  };

if (status === "loading" && gallery.length === 0) {
  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-13 md:py-14">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="mx-auto w-40 h-3 rounded-full bg-[#124d56]/10 animate-pulse" />
          <div className="mx-auto mt-5 w-64 md:w-80 h-9 rounded-lg bg-[#124d56]/10 animate-pulse" />
          <div className="mx-auto mt-3 w-52 md:w-64 h-9 rounded-lg bg-[#124d56]/10 animate-pulse" />
          <div className="mx-auto mt-7 max-w-xl h-4 rounded-full bg-[#124d56]/8 animate-pulse" />
          <div className="mx-auto mt-3 max-w-md h-4 rounded-full bg-[#124d56]/8 animate-pulse" />
        </div>

        <div className="relative h-130 md:h-162.5 lg:h-180 overflow-hidden rounded-4xl bg-[#124d56]/10 animate-pulse">
          <div className="absolute top-7 left-7 md:top-10 md:left-10 w-32 h-3 rounded-full bg-white/20" />

          <div className="absolute top-7 right-7 md:top-10 md:right-10 w-20 h-5 rounded-full bg-white/20" />

          <div className="absolute bottom-8 left-7 right-7 md:bottom-12 md:left-12 md:right-12">
            <div className="w-20 h-3 rounded-full bg-[#F58634]/25" />
            <div className="mt-4 w-3/4 max-w-2xl h-10 md:h-14 rounded-lg bg-white/15" />
            <div className="mt-3 w-1/2 max-w-lg h-10 md:h-14 rounded-lg bg-white/10" />
          </div>
        </div>

        <div className="mt-14 md:mt-16 flex gap-4 md:gap-6 overflow-hidden pb-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="shrink-0">
              <div className="w-37.5 md:w-45 h-25 md:h-30 rounded-xl bg-[#124d56]/10 animate-pulse" />
              <div className="flex items-center gap-3 mt-3">
                <div className="w-5 h-3 rounded-full bg-[#124d56]/10 animate-pulse" />
                <div className="w-16 h-3 rounded-full bg-[#124d56]/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#F58634]/30" />
            <div className="w-32 h-3 rounded-full bg-[#124d56]/10 animate-pulse" />
          </div>

          <div className="w-64 h-5 rounded-full bg-[#124d56]/10 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

  if (status === "failed" && gallery.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#F2FAFB] py-13 md:py-14">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="min-h-100 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#124d56]/5 flex items-center justify-center">
                <ImageIcon
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#124d56]/50"
                />
              </div>

              <p className="mt-5 font-['Inter'] text-sm text-[#124d56]/65">
                Unable to load traveller stories.
              </p>

              {error && (
                <p className="mt-2 font-['Inter'] text-xs text-[#124d56]/40">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!gallery.length) {
    return null;
  }

  const activePhoto = gallery[current];

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-13 md:py-14">

      <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-[#124d56]/[0.035] blur-3xl pointer-events-none"/>
      <div className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full bg-[#124d56]/[0.035] blur-3xl pointer-events-none"/>


      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">

          <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D9701F]">
            The Journey, Remembered
          </span>

          <h2
            className="
              font-['Fraunces']
              font-medium
              text-[#0B3C49]
              text-[clamp(1.75rem,3.5vw,2.75rem)]
              mt-4
            "
          >
            Stories
            <br />
            <span className="italic">
              They Took Home.
            </span>
          </h2>

          <p
            className="
              font-['Inter']
              text-[#124d56]/65
              text-[15px]
              leading-[1.8]
              mt-6
              max-w-xl
              mx-auto
            "
          >
            Some journeys end when you return home. The best ones stay
            with you. These are a few moments shared by travellers who
            discovered India with us.
          </p>
        </div>

        <div className="relative">

          <div className="relative">

            <div
              className="
                relative
                h-130
                md:h-162.5
                lg:h-180
                overflow-hidden
                rounded-4xl
                bg-[#124d56]
              "
            >

              <AnimatePresence mode="wait">

                <motion.img
                  key={`background-${activePhoto.image}`}
                  src={activePhoto.image}
                  alt=""
                  aria-hidden="true"
                  initial={{
                    opacity: 0,
                    scale: 1.08,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    scale-110
                    blur-2xl
                    opacity-40
                  "
                />

              </AnimatePresence>

              <div
                className="
                  absolute
                  inset-0
                  bg-[#124d56]/55
                  pointer-events-none
                "
              />

              <AnimatePresence mode="wait">

                <motion.div
                  key={activePhoto.image}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    p-5
                    md:p-8
                    lg:p-10
                  "
                >
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title || activePhoto.place || "Traveller story"}
                    className="
                      w-full
                      h-full
                      object-contain
                      rounded-[1.25rem]
                      drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]
                    "
                  />
                </motion.div>

              </AnimatePresence>

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-1/2
                  bg-linear-to-t
                  from-black/65
                  via-black/15
                  to-transparent
                  pointer-events-none
                "
              />

              <div
                className="
                  absolute
                  top-7
                  left-7
                  md:top-10
                  md:left-10
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-3
                    font-['Inter']
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-white/80
                  "
                >
                  <span className="w-8 h-px bg-[#F58634]" />

                  Traveller Stories
                </span>
              </div>

              <div
                className="
                  absolute
                  top-7
                  right-7
                  md:top-10
                  md:right-10
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  className="
                    font-['Fraunces']
                    text-white
                    text-xl
                  "
                >
                  {String(current + 1).padStart(2, "0")}
                </span>

                <span className="w-8 h-px bg-white/40" />

                <span
                  className="
                    font-['Inter']
                    text-[10px]
                    tracking-[0.2em]
                    text-white/60
                  "
                >
                  {String(gallery.length).padStart(2, "0")}
                </span>
              </div>

              <div
                className="
                  absolute
                  bottom-8
                  left-7
                  right-7
                  md:bottom-12
                  md:left-12
                  md:right-12
                "
              >
                <AnimatePresence mode="wait">

                  <motion.div
                    key={`${activePhoto.image}-${activePhoto.title}`}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    {activePhoto.place && (
                      <p
                        className="
                          font-['Inter']
                          text-[10px]
                          uppercase
                          tracking-[0.28em]
                          text-[#F58634]
                          font-semibold
                          mb-3
                        "
                      >
                        {activePhoto.place}
                      </p>
                    )}
                    <h3
                      className="
                        font-['Fraunces']
                        text-white
                        text-[clamp(2rem,4vw,3.5rem)]
                        leading-tight
                        max-w-2xl
                      "
                    >
                      {activePhoto.title || "Moments that become memories"}
                    </h3>

                  </motion.div>

                </AnimatePresence>
              </div>
            </div>

            {gallery.length > 1 && (
              <div
                className="
                  absolute
                  -bottom-7
                  right-6
                  md:right-10
                  flex
                  items-center
                  bg-[#124d56]
                  rounded-full
                  p-1.5
                  shadow-[0_20px_45px_rgba(18,77,86,0.25)]
                "
              >

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={previousPhoto}
                  aria-label="Previous photograph"
                  className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-white/70
                    hover:text-white
                    hover:bg-white/10
                    transition-all
                    duration-300
                  "
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={nextPhoto}
                  aria-label="Next photograph"
                  className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-[#F58634]
                    text-white
                    hover:bg-[#D9701F]
                    transition-all
                    duration-300
                  "
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-14 md:mt-16">

              <div
                className="
                  flex
                  gap-4
                  md:gap-6
                  overflow-x-auto
                  pb-4
                  scrollbar-hide
                "
              >

                {gallery.map((photo, index) => {

                  const isActive = index === current;

                  return (
                    <button
                      key={photo._id || photo.imageId || photo.image}
                      type="button"
                      onClick={() => setCurrent(index)}
                      className="
                        group
                        relative
                        shrink-0
                        text-left
                      "
                    >

                      <div
                        className={`
                          relative
                          overflow-hidden
                          rounded-xl
                          transition-all
                          duration-500
                          cursor-pointer

                          ${
                            isActive
                              ? "w-47.5 md:w-57.5 h-30 md:h-36.25"
                              : "w-37.5 md:w-45 h-25 md:h-30"
                          }
                        `}
                      >

                        <img
                          src={photo.image}
                          alt=""
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                        {/* Thumbnail overlay */}

                        <div
                          className={`
                            absolute
                            inset-0
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "bg-[#124d56]/10"
                                : "bg-[#124d56]/35 group-hover:bg-[#124d56]/10"
                            }
                          `}
                        />

                        {/* Orange active line */}

                        <div
                          className={`
                            absolute
                            bottom-0
                            left-0
                            h-0.75
                            bg-[#F58634]
                            transition-all
                            duration-500

                            ${
                              isActive
                                ? "w-full"
                                : "w-0 group-hover:w-full"
                            }
                          `}
                        />

                      </div>

                      <div className="flex items-center gap-3 mt-3">

                        <span
                          className={`
                            font-['Inter']
                            text-[10px]
                            tracking-[0.15em]

                            ${
                              isActive
                                ? "text-[#F58634]"
                                : "text-[#124d56]/35"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`
                            font-['Inter']
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            transition-colors
                            duration-300

                            ${
                              isActive
                                ? "text-[#124d56]"
                                : "text-[#124d56]/40"
                            }
                          `}
                        >
                          {photo.place || "India"}
                        </span>

                      </div>

                    </button>
                  );
                })}

              </div>
            </div>
          )}

          <div
            className="
              mt-16
              md:mt-20
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <span className="w-12 h-px bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-[#124d56]/45
                "
              >
                Your journey awaits
              </span>

            </div>

            {/* RIGHT */}

            <p
              className="
                font-['Fraunces']
                italic
                text-lg
                md:text-xl
                text-[#124d56]/65
              "
            >
              Come as a traveller. Leave with a story.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}