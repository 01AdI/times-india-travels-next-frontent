"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react";

export default function Home_TimeIndia_WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-[#F2FAFB]">
      <div className="mx-auto max-w-350 px-6 py-13 sm:px-17 sm:py-12 md:px-16 md:py-15 lg:px-20 lg:py-15">
     
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-26">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="max-w-2xl"
          >

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                About Us
              </span>
            </div>

            <h2
              className="
                font-['Fraunces']
                text-[clamp(2.5rem,4.5vw,4.4rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.04em]
                text-[#0B3C49]
              "
            >
              Welcome to
              <span className="block italic text-cyan-500">
                Times India Travels.
              </span>
            </h2>

            <p
              className="
                mt-8
                max-w-xl
                font-['Inter']
                text-[15px]
                leading-8
                text-[#536D72]
                sm:text-base
              "
            >
              We believe India is best experienced through journeys that feel
              personal, thoughtful, and unhurried. From heritage cities and
              royal palaces to mountains, wildlife, beaches, and spiritual
              destinations, we design experiences around the way you want to
              travel.
            </p>

            <p
              className="
                mt-5
                max-w-xl
                font-['Inter']
                text-[15px]
                leading-8
                text-[#536D72]
                sm:text-base
              "
            >
              With experienced local teams, carefully planned itineraries,
              comfortable stays, reliable transportation, and support throughout
              your journey, our role is simple — to make discovering India feel
              effortless.
            </p>

            <div
              className="
                mt-10
                flex
                gap-12
                border-t
                border-[#124D56]/10
                pt-6
              "
            >

              <div>
                <h3
                  className="
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    text-[#0B3C49]
                    sm:text-4xl
                  "
                >
                  13+
                </h3>

                <p
                  className="
                    mt-1
                    font-['Inter']
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#71878B]
                  "
                >
                  Years Experience
                </p>
              </div>

              <div>
                <h3
                  className="
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    text-[#0B3C49]
                    sm:text-4xl
                  "
                >
                  197
                </h3>

                <p
                  className="
                    mt-1
                    font-['Inter']
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#71878B]
                  "
                >
                  TripAdvisor Reviews
                </p>
              </div>
            </div>
          </div>

              {/* RIGHT IMAGE + TRUST CARD */}

          <div className="relative">
              {/* IMAGE   */}

            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="relative"
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[28px]
                  shadow-[0_30px_80px_rgba(11,60,73,0.12)]
                "
              >
                <img
                  src="https://i.pinimg.com/736x/21/c0/e4/21c0e4658654b09297fec0479e581a6a.jpg"
                  alt="India travel experience with Times India Travels"
                  className="
                    h-[460px]
                    w-full
                    object-cover
                    transition-transform
                    duration-1000
                    hover:scale-[1.03]
                    lg:h-[590px]
                  "
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0B3C49]/30
                    via-transparent
                    to-transparent
                  "
                />
              </div>
            </div>

              {/* PREMIUM TRIPADVISOR TRUST CARD */}
              <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="absolute -bottom-16 left-4 right-4 z-20 rounded-[22px] border border-[#124D56]/10 bg-white
                p-6 shadow-[0_25px_70px_rgba(11,60,73,0.15)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(11,60,73,0.18)]
                sm:left-8 sm:right-auto sm:w-95 sm:p-7 lg:-left-12 "
                >

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* TRIPADVISOR STYLE ICON */}      
            
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7opMpBMDtnVh31BhD0DLFVUwzcqz5zYq4FeMxh79Vuw&s=10"
                      alt="Tripadvisor"
                      className="h-20 w-auto object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-['Inter'] text-[9px] font-semibold uppercase tracking-[0.22em] text-[#71878B] ">
                      Traveller Reviews
                    </p>

                    <h3 className="mt-1 font-['Inter'] text-[16px] font-semibold text-[#0B3C49] " >
                      Times India Travels
                    </h3>
                  </div>
                </div>

                <ExternalLink
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-[#71878B]"
                />
              </div>

              <div className="mt-6 flex items-end gap-3">
                {/* RATING NUMBER */}

                <span
                  className="
                    font-['Fraunces']
                    text-4xl
                    font-medium
                    leading-none
                    text-[#0B3C49]
                  "
                >
                  4.9
                </span>

                <div className="pb-0.5">
                  {/* TRIPADVISOR GREEN DOTS */}

                  <div className="flex items-center gap-[3px]">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className="
                        h-[10px]
                        w-[10px]
                        rounded-full
                        bg-[#00AA6C]
                      "
                      />
                    ))}
                  </div>

                  {/* REVIEW COUNT */}

                  <p
                    className="
                      mt-1.5
                      font-['Inter']
                      text-[10px]
                      text-[#71878B]
                    "
                  >
                    Based on 197 reviews
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-[#124D56]/10" />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={15}
                    strokeWidth={1.5}
                    className="text-[#F58634]"
                  />

                  <span
                    className="
                      font-['Inter']
                      text-xs
                      text-[#536D72]
                    "
                  >
                    Jaipur, Rajasthan
                  </span>
                </div>

                <span
                  className="
                    font-['Inter']
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[#0B3C49]
                  "
                >
                  #23 of 672
                </span>
              </div>

              <p
                className="
                  mt-3
                  font-['Inter']
                  text-[10px]
                  leading-5
                  text-[#71878B]
                "
              >
                Outdoor Activities · Private Tours · Cultural Tours
              </p>

              <a
                href="https://www.tripadvisor.com/Attraction_Review-g304555-d3590777-Reviews-Times_India_Travels-Jaipur_Jaipur_District_Rajasthan.html"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  mt-6
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#124D56]/10
                  pt-5
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#0B3C49]
                "
              >
                <span>View all reviews</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    text-[#F58634]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-32
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span className="h-px w-10 bg-[#F58634]/50" />

          <span
            className="
              font-['Fraunces']
              text-sm
              italic
              text-[#124D56]/65
              sm:text-base
            "
          >
            India, thoughtfully experienced.
          </span>

          <span className="h-px w-10 bg-[#F58634]/50" />
        </motion.div>
      </div>
    </section>
  );
}
