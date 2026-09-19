"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";

export default function Home_TimeIndia_WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF5EB]">
      <div className="mx-auto max-w-350 px-6 py-13 sm:px-17 sm:py-12 md:px-16 md:py-15 lg:px-20 lg:py-15">
     
        <div className="grid items-center gap-20 lg:grid-cols-2 lg:gap-26">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="max-w-2xl"
          >

            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B85128]" />

              <span
                className="
                  font-['Playfair',serif]
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#B85128]
                "
              >
                About Us
              </span>
            </div>

            <h2
              className="
                font-['Playfair_Display',serif]
                text-[clamp(2.5rem,4.5vw,4.4rem)]
                font-medium
                
                leading-[1.02]
                tracking-[-0.04em]
                text-[#173C3A]
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
                font-['Noto_Sans',sans-serif]
                text-[15px]
                leading-8
                text-[#476763]
                sm:text-base
              "
            >
              We believe India is best experienced through journeys that feel personal, thoughtful, and unhurried. 
              India is full of incredible experiences, from heritage cities and royal palaces to peaceful mountains, 
              beautiful beaches, rich wildlife, and spiritual destinations. 
              Every place has its own story, and we want you to experience it in a way that feels right for you.
              That’s why we create itineraries around your interests, travel style, dates, and pace.
                          
            </p>

            <p
              className="
                mt-5
                max-w-xl
                font-['Noto_Sans',sans-serif]
                text-[15px]
                leading-8
                text-[#476763]
                sm:text-base
              "
            >
              With experienced local teams, carefully chosen stays, reliable transportation, 
              knowledgeable guides, and support throughout your trip, 
              we take care of the important details so you can travel with ease and confidence.
              Whether it’s your first visit to India or a journey you’ve been dreaming about for years, 
              we’re here to make your experience comfortable, meaningful, and truly your own - from the 
              moment you arrive to the day you leave with memories to take home.
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
                    font-['Playfair_Display',serif]
                    text-3xl
                    font-medium
                    text-[#173C3A]
                    sm:text-4xl
                  "
                >
                  13+
                </h3>

                <p
                  className="
                    mt-1
                    font-['Playfair',serif]
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#476763]
                  "
                >
                  Years Experience
                </p>
              </div>

              <div>
                <h3
                  className="
                    font-['Playfair_Display',serif]
                    text-3xl
                    font-medium
                    text-[#173C3A]
                    sm:text-4xl
                  "
                >
                  197
                </h3>

                <p
                  className="
                    mt-1
                    font-['Playfair',serif]
                    text-xs
                    uppercase
                    tracking-wider
                    text-[#476763]
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
                  h-115
                  overflow-hidden
                  rounded-[28px]
                  shadow-[0_30px_80px_rgba(11,60,73,0.12)]
                  lg:h-147.5
                "
              >
                <Image
                  src="https://res.cloudinary.com/giz8nvjr/image/upload/v1789629450/homeSection-welcome.jpg"
                  alt="India travel experience with Times India Travels"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="
                    object-cover
                    transition-transform
                    duration-1000
                    hover:scale-[1.03]
                  "
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
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
                    <Image
                      src="https://res.cloudinary.com/giz8nvjr/image/upload/v1789753552/trip-advisor-logo.png"
                      alt="Tripadvisor"
                      width={80}
                      height={80}
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

                  <div className="flex items-center gap-0.75">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className="
                        h-2.5
                        w-2.5
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
          <span className="h-px w-10 bg-[#B85128]/50" />

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

          <span className="h-px w-10 bg-[#B85128]/50" />
        </motion.div>
      </div>
    </section>
  );
}
