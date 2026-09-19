"use client";

import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact_Us_NextJourney() {
  const handlePlanJourney = () => {
    const section = document.getElementById("plan-your-journey");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#071F27]
        py-28
        sm:py-36
        md:py-44
      "
    >

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1662009867642-933d25d401fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="India journey"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* SUBTLE DARK OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/35
          "
        />
      </div>


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-275
          px-6
          text-center
          sm:px-10
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* EYEBROW */}

          <div className="mb-7 flex items-center justify-center gap-4">
            <span
              className="
                h-px
                w-10
                bg-white/30
                sm:w-14
              "
            />

            <span
              className="
                font-['Playfair',serif]
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-white/70
              "
            >
              Your next chapter
            </span>

            <span
              className="
                h-px
                w-10
                bg-white/30
                sm:w-14
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              mx-auto
              max-w-4xl
              font-['Playfair_Display',serif]
              text-5xl
              font-medium
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              sm:text-6xl
              md:text-7xl
              lg:text-[82px]
            "
          >
            Your next journey
            <span className="block italic text-[#F58634]">
              starts here.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-7
              max-w-xl
              font-['Noto_Sans',sans-serif]
              text-sm
              font-light
              leading-7
              tracking-wide
              text-white/75
              sm:text-base
            "
          >
            Tell us where you want to go, what you want to
            experience, and we&apos;ll take care of the rest.
          </p>

          {/* CTA */}

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handlePlanJourney}
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-[#F58634]
                bg-[#F58634]
                px-7
                py-4
                font-['Noto_Sans',sans-serif]
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#0B3C49]
                shadow-[0_12px_35px_rgba(0,0,0,0.18)]
                transition-all
                duration-400
                hover:bg-white
                hover:border-white
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]
                cursor-pointer
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
                  bg-[#0B3C49]
                  text-[#F58634]
                  transition-all
                  duration-300
                  group-hover:bg-[#0B3C49]
                  group-hover:text-white
                "
              >
                <ArrowDownRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:translate-y-0.5
                  "
                />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-24
          w-full
          bg-linear-to-t
          from-[#071F27]
          to-transparent
        "
      />
    </section>
  );
}