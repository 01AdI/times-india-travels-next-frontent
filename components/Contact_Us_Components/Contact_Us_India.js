import { ArrowRight, MapPin } from "lucide-react";

// ============================================================
// CONTACT US — INDIA IS NOT A DESTINATION
// ============================================================

export default function Contact_Us_IndiaIsNotADestination() {
  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-15">


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

          {/* =================================================
              LEFT — IMAGE
          ================================================== */}

          <div className="relative">

            {/* Main Image */}

            <div
              className="
                relative
                h-[480px]
                overflow-hidden
                rounded-[28px]
                sm:h-[560px]
              "
            >
              <img
                src="https://i.pinimg.com/736x/fb/67/51/fb67511c3d23f2a1e47c996b104455ae.jpg"
                alt="India travel experience"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  hover:scale-[1.035]
                "
              />

              {/* Image treatment */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#071F27]/60
                  via-transparent
                  to-[#0B3C49]/5
                "
              />

              {/* Small location label */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/20
                  bg-[#071F27]/45
                  px-4
                  py-3
                  backdrop-blur-md
                  sm:bottom-8
                  sm:left-8
                "
              >
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F58634]
                  "
                >
                  <MapPin className="h-3.5 w-3.5 text-[#0B3C49]" />
                </span>

                <span
                  className="
                    font-['Inter']
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white
                  "
                >
                  India
                </span>
              </div>
            </div>

            {/* =================================================
                FLOATING ACCENT IMAGE
            ================================================== */}

            <div
              className="
                absolute
                -bottom-8
                -right-5
                hidden
                h-36
                w-28
                overflow-hidden
                rounded-[20px]
                border-[6px]
                border-[#F2FAFB]
                shadow-[0_20px_50px_rgba(11,60,73,0.18)]
                sm:block
                lg:-right-10
              "
            >
              <img
                src="https://i.pinimg.com/736x/f4/de/a0/f4dea03f9837a470ac8b28e623e8c976.jpg"
                alt="Discover India"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

          {/* =================================================
              RIGHT — EDITORIAL CONTENT
          ================================================== */}

          <div className="max-w-xl">

            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">

              <span
                className="
                  font-['Fraunces']
                  text-xl
                  italic
                  text-cyan-500
                "
              >
                Beyond the itinerary
              </span>

              <span className="h-px w-12 bg-[#0B3C49]/15" />

              <span
                className="
                  font-['Inter']
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#0B3C49]
                "
              >
                Discover India
              </span>

            </div>

            {/* HEADING */}

            <h2
              className="
                font-['Fraunces']
                text-5xl
                font-medium
                leading-[0.94]
                tracking-[-0.045em]
                text-[#0B3C49]
                sm:text-6xl
                md:text-7xl
              "
            >
              India is not
              <span className="block italic text-cyan-500">
                a destination.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                max-w-lg
                font-['Inter']
                text-sm
                leading-7
                text-[#0B3C49]
                sm:text-base
              "
            >
              It is the chai shared with a stranger, the sound of
              temple bells at sunrise, a quiet road through the
              desert and a story you did not expect to hear.
            </p>

            <p
              className="
                mt-5
                max-w-lg
                font-['Inter']
                text-sm
                leading-7
                text-[#0B3C49]
                sm:text-base
              "
            >
              We believe the most memorable journeys are not
              measured by how many places you see, but by what
              you feel while you are there.
            </p>

            {/* =================================================
                DIVIDER
            ================================================== */}

            <div className="my-9 h-px w-full bg-[#0B3C49]/10" />

            {/* =================================================
                SMALL STATEMENT
            ================================================== */}

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

              <div>
                <p
                  className="
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    text-[#0B3C49]
                  "
                >
                  01
                </p>

                <p
                  className="
                    mt-2
                    font-['Inter']
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#0B3C49]
                  "
                >
                  Personal
                  <br />
                  Journeys
                </p>
              </div>

              <div>
                <p
                  className="
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    text-[#0B3C49]
                  "
                >
                  02
                </p>

                <p
                  className="
                    mt-2
                    font-['Inter']
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#0B3C49]
                  "
                >
                  Local
                  <br />
                  Experiences
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p
                  className="
                    font-['Fraunces']
                    text-3xl
                    font-medium
                    text-[#0B3C49]
                  "
                >
                  03
                </p>

                <p
                  className="
                    mt-2
                    font-['Inter']
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#0B3C49]
                  "
                >
                  Stories
                  <br />
                  To Remember
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM DECORATIVE LINE
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-px
          w-[calc(100%-3rem)]
          -translate-x-1/2
          bg-[#0B3C49]/10
          sm:w-[calc(100%-5rem)]
        "
      />

    </section>
  );
}