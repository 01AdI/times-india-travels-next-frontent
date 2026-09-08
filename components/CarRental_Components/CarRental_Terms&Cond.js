import {Check,ShieldCheck,FileText,Users,Clock } from "lucide-react";

const terms = [
  "We need your rough itinerary before confirming a booking.",
  "You're welcome to stop for photography, sightseeing, or meals along the way.",
  "Return-leg charges apply for the journey back to our home base, Delhi or Jaipur.",
  "One travel day is calculated as 250 kilometres.",
  "In the rare case of a breakdown, a replacement car is arranged within hours.",
  "We don't run vehicles older than 4 years.",
];

const safetyRules = [
  {
    icon: ShieldCheck,
    text: "All drivers are trained in defensive driving.",
  },
  {
    icon: FileText,
    text: "All drivers hold a valid commercial driving licence.",
  },
  {
    icon: Users,
    text: "Passenger safety remains a priority throughout the journey.",
  },
  {
    icon: Clock,
    text: "Regular breaks are encouraged during longer journeys.",
  },
  {
    icon: ShieldCheck,
    text: "Seat belts should be worn and speed limits followed at all times.",
  },
];

export default function CarRental_Terms_Cond() {
  return (
    <section className="bg-[#F2FAFB] px-6 py-13 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
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
            Travel with confidence
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
            Terms & Safety
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-10 bg-[#F58634]" />
        </div>

        {/* Terms */}

        <details
          open
          className="
                      group
                      rounded-2xl
                      border
                      border-[#124d56]/10
                      bg-white
                      transition-all
                      open:shadow-[0_15px_40px_-25px_rgba(18,77,86,0.3)]
                    "
        >
          <summary
            className="
                        flex
                        cursor-pointer
                        list-none
                        items-center
                        justify-between
                        gap-5
                        px-6
                        py-5
                        font-['Inter']
                        text-sm
                        font-semibold
                        text-[#0B3C49]
                      "
          >
            Terms & Conditions
            <span
              className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-[#124d56]/8
                          text-[#124d56]/60
                          transition-transform
                          duration-300
                          group-open:rotate-45
                        "
            >
              +
            </span>
          </summary>

          <ul className="space-y-3 px-6 pb-6">
            {terms.map((term) => (
              <li
                key={term}
                className="
                            flex
                            items-start
                            gap-3
                            font-['Inter']
                            text-[14px]
                            leading-relaxed
                            text-[#124d56]/65
                          "
              >
                <Check
                  className="
                              mt-0.5
                              h-4
                              w-4
                              shrink-0
                              text-[#F58634]
                            "
                  strokeWidth={2}
                />

                {term}
              </li>
            ))}
          </ul>
        </details>

        {/* Safety */}

        <details
          open
          className="
                      group
                      mt-4
                      rounded-2xl
                      border
                      border-[#124d56]/10
                      bg-white
                      transition-all
                      open:shadow-[0_15px_40px_-25px_rgba(18,77,86,0.3)]
                    "
        >
          <summary
            className="
                        flex
                        cursor-pointer
                        list-none
                        items-center
                        justify-between
                        gap-5
                        px-6
                        py-5
                        font-['Inter']
                        text-sm
                        font-semibold
                        text-[#0B3C49]
                      "
          >
            Safety Rules
            <span
              className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-[#124d56]/8
                          text-[#124d56]/60
                          transition-transform
                          duration-300
                          group-open:rotate-45
                        "
            >
              +
            </span>
          </summary>

          <div
            className="
                        grid
                        grid-cols-1
                        gap-4
                        px-6
                        pb-6
                        sm:grid-cols-2
                      "
          >
            {safetyRules.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            bg-[#F2FAFB]
                            p-4
                          "
              >
                <Icon
                  className="
                              mt-0.5
                              h-4
                              w-4
                              shrink-0
                              text-[#F58634]
                            "
                  strokeWidth={1.8}
                />

                <p
                  className="
                              font-['Inter']
                              text-[13px]
                              leading-relaxed
                              text-[#124d56]/65
                            "
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
