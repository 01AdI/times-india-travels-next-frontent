import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";


export default function Contact_Us_IndiaIsNotADestination() {
  return (
    <section className="relative overflow-hidden bg-[#FAF5EB] py-13 sm:py-13 md:py-15">

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

     
          <div className="relative">

            {/* Main Image */}

            <div
              className="
                relative
                h-120
                overflow-hidden
                rounded-[28px]
                sm:h-140
              "
            >
              <Image
                src="https://images.unsplash.com/photo-1770791366174-f1b88ef1a367?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="India travel experience"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="
                  object-cover
                  transition-transform
                  duration-1200
                  hover:scale-[1.035]
                "
              />

              {/* Image treatment */}

              <div
                className="
                  absolute
                  inset-0
                  bg-linear-to-t
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
                    font-['Playfair',serif]
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
              <Image
                src="https://images.unsplash.com/photo-1759998756869-c8eeb78f49e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Discover India"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

          </div>

          <div className="max-w-xl">

            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">

              <span
                className="
                  font-['Playfair',serif]
                  text-xl
                  italic
                  text-[#B85128]
                "
              >
                Beyond the itinerary
              </span>

              <span className="h-px w-12 bg-[#B85128]/45" />

              <span
                className="
                  font-['Playfair',serif]
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#B85128]
                "
              >
                Discover India
              </span>

            </div>

            {/* HEADING */}

            <h2
              className="
                font-['Playfair_Display',serif]
                text-5xl
                font-medium
                leading-[0.94]
                tracking-[-0.045em]
                text-[#173C3A]
                sm:text-6xl
                md:text-7xl
              "
            >
              India is not
              <span className="block italic text-[#B85128]">
                a destination.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                max-w-lg
                font-['Noto_Sans',sans-serif]
                text-sm
                leading-7
                text-[#476763]
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
                font-['Noto_Sans',sans-serif]
                text-sm
                leading-7
                text-[#476763]
                sm:text-base
              "
            >
              We believe the most memorable journeys are not
              measured by how many places you see, but by what
              you feel while you are there.
            </p>


            <div className="my-9 h-px w-full bg-[#0B3C49]/10" />


            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

              <div>
                <p
                  className="
                    font-['Playfair',serif]
                    text-3xl
                    font-medium
                    text-[#173C3A]
                  "
                >
                  01
                </p>

                <p
                  className="
                    mt-2
                    font-['Playfair',serif]
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#476763]
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
                    font-['Playfair',serif]
                    text-3xl
                    font-medium
                    text-[#173C3A]
                  "
                >
                  02
                </p>

                <p
                  className="
                    mt-2
                    font-['Playfair',serif]
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#476763]
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
                    font-['Playfair',serif]
                    text-3xl
                    font-medium
                    text-[#173C3A]
                  "
                >
                  03
                </p>

                <p
                  className="
                    mt-2
                    font-['Playfair',serif]
                    text-[12px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#476763]
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