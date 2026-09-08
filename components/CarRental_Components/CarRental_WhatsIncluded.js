import {Users,Fuel,ShieldCheck,Wrench,Phone,Snowflake,} from "lucide-react";


const inclusions = [
  {
    icon: Snowflake,
    title: "Comfortable travel",
    text: "Air-conditioned vehicles with generous luggage space.",
  },
  {
    icon: Fuel,
    title: "Transparent pricing",
    text: "Fuel, tolls, parking and applicable state taxes included.",
  },
  {
    icon: Wrench,
    title: "Well-maintained vehicles",
    text: "Regularly serviced vehicles with essential spares and first-aid equipment.",
  },
  {
    icon: Users,
    title: "Experienced chauffeurs",
    text: "Courteous, professionally selected drivers familiar with Indian routes.",
  },
  {
    icon: Phone,
    title: "Support when you need it",
    text: "Our team remains reachable throughout your journey.",
  },
  {
    icon: ShieldCheck,
    title: "Travel at your pace",
    text: "Stop for photographs, meals and sightseeing whenever your itinerary calls for it.",
  },
];


export default function CarRental_WhatsIncluded(){
    return(
    <section className="bg-[#F2FAFB] px-6 py-13 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span
              className="
                font-['Inter']
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#F58634]
                sm:text-xs
              "
            >
              Included with your journey
            </span>

            <h2
              className="
                mt-4
                font-['Fraunces']
                text-[clamp(2rem,4vw,3rem)]
                font-medium
                text-[#0B3C49]
              "
            >
              What's Included
            </h2>

            <div className="mx-auto mt-6 h-px w-20 bg-[#F58634]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="
                  group
                  cursor-pointer
                  rounded-2xl
                  border
                  border-[#124d56]/8
                  bg-[#F2FAFB]/60
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#124d56]/15
                  hover:bg-[#F2FAFB]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#124d56]/8
                    transition-colors
                    group-hover:bg-[#F58634]/10
                  "
                >
                  <Icon
                    className="
                      h-5
                      w-5
                      text-[#124d56]
                      transition-colors
                      group-hover:text-[#F58634]
                    "
                    strokeWidth={1.7}
                  />
                </div>

                <h3
                  className="
                    mt-5
                    font-['Fraunces']
                    text-lg
                    text-[#0B3C49]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    font-['Inter']
                    text-[13px]
                    leading-relaxed
                    text-[#124d56]/60
                  "
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    )
}