"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientReviewVideos } from "../../features/Home-page/Client_Review_Video_Slice";


export default function Home_Client_Video() {
  const dispatch = useDispatch();
  const {videos,status,error,} = useSelector((state) => state.clientReviewsVideo);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    dispatch(fetchClientReviewVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videos.length === 0) {
      setCurrentVideo(0);
      return;
    }

    if (currentVideo >= videos.length) {
      setCurrentVideo(0);
    }
  }, [videos.length, currentVideo]);


  const nextVideo = () => {
    if (!videos.length) {
      return;
    }

    setCurrentVideo(
      (prev) => (prev + 1) % videos.length
    );
  };

  const prevVideo = () => {
    if (!videos.length) {
      return;
    }

    setCurrentVideo(
      (prev) =>
        (prev - 1 + videos.length) % videos.length
    );
  };


  if ((status === "loading" || status === "idle") &&videos.length === 0) {
    return (
      <section className="overflow-hidden w-full py-12 border-y border-[#C9A24B]/25 bg-[#F2FAFB] px-6 md:px-14">

        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-16 max-w-xl text-center">

            {/* Small heading */}
            <div className="relative mx-auto h-4 w-28 overflow-hidden rounded-full bg-[#123138]/10">

              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_1.8s_infinite]
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                }}
              />

            </div>

            {/* Main heading */}

            <div className="relative mx-auto mt-5 h-12 w-[75%] overflow-hidden rounded-xl bg-[#123138]/10 md:h-14">

              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_2s_infinite]
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                }}
              />

            </div>

            {/* Divider */}

            <div className="mx-auto mt-6 h-px w-20 bg-[#F58634]/20" />

          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#1EA5BE]/10 bg-[#123138]/10 shadow-2xl">

            <div className="aspect-video relative">

              {/* Main shimmer */}

              <div
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  animate-[shimmer_2.2s_infinite]
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.22) 55%, transparent 100%)",
                }}
              />

              {/* Center play placeholder */}

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />

              </div>

              {/* Bottom overlay skeleton */}

              <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#032322]/50 px-5 py-4 md:px-7">

                <div className="h-4 w-36 rounded-full bg-white/15" />

                <div className="mt-2 h-3 w-24 rounded-full bg-white/10" />

              </div>

            </div>

          </div>

          <div className="mt-6 flex justify-center gap-3">

            <div className="h-2.5 w-3.5 rounded-full bg-[#F58634]/30" />

            <div className="h-2.5 w-2.5 rounded-full bg-black/10" />

            <div className="h-2.5 w-2.5 rounded-full bg-black/10" />

            <div className="h-2.5 w-2.5 rounded-full bg-black/10" />

          </div>

        </div>

        <style>
          {`
            @keyframes shimmer {
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>

      </section>
    );
  }

  if (status === "failed" &&videos.length === 0) {
    return (
      <section className="flex w-full items-center justify-center overflow-hidden border-y border-[#C9A24B]/25 bg-[#F2FAFB] px-6 py-24 md:px-14">

        <div className="text-center">

          <p className="font-['Fraunces'] text-2xl font-semibold text-[#123138]">
            Unable to load client reviews
          </p>

          <p className="mt-2 text-sm text-[#123138]/60">
            {error || "Something went wrong while loading the testimonials."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(fetchClientReviewVideos())
            }
            className="
              mt-6
              cursor-pointer
              rounded-full
              border
              border-[#F58634]/60
              px-5
              py-2.5
              text-sm
              font-medium
              text-[#123138]
              transition-all
              duration-300
              hover:bg-[#F58634]
              hover:text-white
            "
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  if (!videos.length) {
    return null;
  }

  const currentTestimonial =videos[currentVideo];

  return (
    <section className="overflow-hidden w-full py-12 border-y border-[#C9A24B]/25 bg-[#F2FAFB] px-6 md:px-14">

      <div className="mx-auto max-w-4xl">

        <div className="mx-auto mb-16 max-w-xl text-center">

          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F58634]">
            Client Words
          </span>

          <h2 className="mt-3 font-['Fraunces'] text-4xl font-semibold text-[#123138] md:text-5xl">
            What Our Client Says
          </h2>

          <div className="mx-auto mt-6 h-px w-20 bg-[#F58634]" />

        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#1EA5BE]/20 shadow-2xl shadow-black/40">

          <div className="absolute inset-y-0 left-4 z-20 flex items-center">

            <button
              onClick={prevVideo}
              aria-label="Previous testimonial"
              type="button"
              className="
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/35
                text-xl
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-[#F58634]
              "
            >
              ❮
            </button>

          </div>

          <div className="absolute inset-y-0 right-4 z-20 flex items-center">

            <button
              onClick={nextVideo}
              aria-label="Next testimonial"
              type="button"
              className="
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/35
                text-xl
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-[#F58634]
              "
            >
              ❯
            </button>

          </div>

          <div className="relative aspect-video rounded-2xl">

            <video
              key={currentTestimonial._id}
              className="h-full w-full rounded-2xl object-cover"
              controls
              autoPlay
              playsInline
              muted
              onEnded={nextVideo}
            >

              <source
                src={currentTestimonial.video}
                type={
                  currentTestimonial.video?.endsWith(".webm")
                    ? "video/webm"
                    : "video/mp4"
                }
              />

            </video>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#032322]/85 px-5 py-3.5 backdrop-blur-md md:px-7 md:py-4 " >

              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  
                  <div className=" truncate text-sm font-semibold leading-tight text-white md:text-base " >
                    {currentTestimonial.name}
                  </div>
                  
                  <div className=" mt-1 truncate text-[11px] tracking-wide text-[#F58634] md:text-xs " >
                    {currentTestimonial.location}
                  </div>

                </div>

                {currentTestimonial.tour && (
                  <div className="shrink-0 text-right">
                    <div className=" text-[9px] font-medium uppercase tracking-[0.2em] text-white md:text-[10px] " >
                      Tour
                    </div>
                    <div className=" mt-1 max-w-45 text-xs font-medium leading-tight text-[#F58634] md:max-w-65 md:text-sm " >
                      {currentTestimonial.tour}
                    </div>
                  </div>
                )}
                
              </div>

            </div>

          </div>

        </div>

        <div className="mt-6 flex justify-center gap-3">

          {videos.map((video, index) => (

            <button
              key={video._id}
              onClick={() =>
                setCurrentVideo(index)
              }
              aria-label={`View testimonial from ${video.name}`}
              type="button"
              className={`
                cursor-pointer
                rounded-full
                transition-all
                duration-300

                ${
                  currentVideo === index
                    ? "h-2.5 w-3.5 bg-[#F58634]"
                    : "h-2.5 w-2.5 bg-black/30 hover:bg-black/60"
                }
              `}
            />

          ))}

        </div>

      </div>

    </section>
  );
}
