"use client";

// ============================================================
// WHY CHOOSE US — EDITORIAL PREMIUM SECTION
// ============================================================

export default function WhyChooseUs_2() {
  const scrollToQuotation = () => {
    document.getElementById("quatation")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const features = [
    {
      number: "01",
      eyebrow: "Trust & Reliability",
      headline: "Government-Approved, Every Step of the Way",
      description:
        "We're a fully approved tour operator recognized by the Ministry of Tourism — not an unregistered agent booking rooms on your behalf. Every itinerary we plan comes with that accountability built in.",
      badge: "Govt. of India Approved",
      image:
        "https://i.pinimg.com/736x/a9/26/38/a926389c013aaeeddb53a102556e00bc.jpg",
      icon: (
        <>
          <path
            d="M12 3l7 3v5c0 4.5-2.8 8.1-7 10-4.2-1.9-7-5.5-7-10V6l7-3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
    },
    {
      number: "02",
      eyebrow: "Always Reachable",
      headline: "Support That Doesn't Stop at Business Hours",
      description:
        "A delayed flight at midnight or a change of plans at dawn gets the same response either way. Once you're travelling with us, someone is always on the other end of the line.",
      badge: "24×7 Availability",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop",
      icon: (
        <>
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.25a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
    },
    {
      number: "03",
      eyebrow: "Made For You",
      headline: "Not a Package. A Journey Built Around You.",
      description:
        "Every itinerary starts with a conversation, not a catalogue — your pace, your interests, your dates, shaped into a route that's actually yours.",
      badge: "100% Tailor-Made",
      image:
        "https://i.pinimg.com/736x/24/51/9a/24519a2b0cc8369171ccf04530260655.jpg",
      icon: (
        <>
          <path
            d="M12 20h9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
    },
    {
      number: "04",
      eyebrow: "Travelling Solo",
      headline: "Care That Runs Deeper for Solo Travellers",
      description:
        "Especially for women travelling alone, that care runs deeper: guides and routing chosen specifically so India feels welcoming, not intimidating.",
      badge: "Solo Traveller Care",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop",
      icon: (
        <>
          <path
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="7" r="4" />
        </>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#124d56] py-10 sm:py-12 lg:py-12">
      {/* ========================================================
          BACKGROUND DETAILS
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[5%] h-[500px] w-[500px] rounded-full bg-[#1EA5BE]/[0.04] blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#F58634]/[0.035] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,165,190,0.025),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* ======================================================
            SECTION INTRO
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-300">
            travel with us
          </p>

          <h2 className="mt-5 font-['Fraunces'] text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
            Why Choose Us
          </h2>

          <div className="mx-auto mt-7 h-px w-40 bg-[#F58634]" />

          <p className="mx-auto mt-7 max-w-2xl font-['Inter'] text-sm leading-7 text-white/55 sm:text-base">
            India is a complicated country to navigate. We believe the best
            journeys happen when the details are handled before you ever have
            to think about them.
          </p>
        </div>

        {/* ======================================================
            FEATURE JOURNEY
        ====================================================== */}

        <div className="relative mt-20 sm:mt-24">
          {/* Journey line */}
          <div className="pointer-events-none absolute bottom-0 left-[35px] top-0 hidden w-px bg-white/[0.08] md:block">
            <div className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-[#F58634] to-transparent" />
          </div>

          <div className="flex flex-col gap-20 sm:gap-24 md:gap-28">
            {features.map((feature, index) => {
              const isReversed = index % 2 === 1;

              return (
                <article
                  key={feature.number}
                  className="group relative grid items-center gap-8 md:grid-cols-[70px_minmax(0,1fr)] lg:gap-14"
                >
                  {/* ==================================================
                      NUMBER
                  ================================================== */}

                  <div className="relative z-10 hidden self-stretch md:flex md:items-center md:justify-center">
                    <span className="font-['Fraunces'] text-3xl font-light text-white/20 transition-all duration-500 group-hover:text-[#F58634]">
                      {feature.number}
                    </span>

                    {/* Small connection point */}
                    <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#071F26] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-[#F58634] group-hover:ring-[#F58634]/30" />
                  </div>

                  {/* ==================================================
                      CONTENT GRID
                  ================================================== */}

                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                      isReversed
                        ? "lg:[&>div:first-child]:order-2"
                        : ""
                    }`}
                  >
                    {/* ==================================================
                        IMAGE
                    ================================================== */}

                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#123138] shadow-[0_35px_80px_-35px_rgba(0,0,0,0.65)]">
                      <img
                        src={feature.image}
                        alt={feature.eyebrow}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F26]/55 via-transparent to-transparent" />

                      {/* Number */}
                      <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#071F26]/45 backdrop-blur-md">
                        <span className="font-['Fraunces'] text-sm text-white">
                          {feature.number}
                        </span>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#F58634] transition-all duration-700 group-hover:w-1/3" />
                    </div>

                    {/* ==================================================
                        TEXT
                    ================================================== */}

                    <div
                      className={`max-w-xl ${
                        isReversed ? "lg:pr-6" : "lg:pl-2"
                      }`}
                    >
                      <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7BCBDA]">
                        {feature.eyebrow}
                      </p>

                      <h3 className="mt-4 font-['Fraunces'] text-3xl font-medium leading-tight text-white sm:text-4xl">
                        {feature.headline}
                      </h3>

                      <p className="mt-6 max-w-lg font-['Inter'] text-sm leading-7 text-white/55 sm:text-[15px]">
                        {feature.description}
                      </p>

                      {/* ==================================================
                          TRUST BADGE
                      ================================================== */}

                      <div className="mt-8">
                        <div
                          className={`group/badge inline-flex items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-500 border-[#F58634]/40 bg-[#F58634]/[0.08] shadow-[0_10px_30px_-15px_rgba(245,134,52,0.5)]`}
                        >
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#F58634] text-white shadow-[0_5px_20px_-8px_rgba(245,134,52,0.9)]`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 fill-none stroke-current"
                              strokeWidth="1.7"
                            >
                              {feature.icon}
                            </svg>
                          </div>

                          <div className="text-left">
                            <span
                              className={`block font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.16em] ${
                                index === 0
                                  ? "text-[#FFB37B]"
                                  : "text-white/70"
                              }`}
                            >
                              {feature.badge}
                            </span>

                            {index === 0 && (
                              <span className="mt-0.5 block font-['Inter'] text-[9px] tracking-wide text-white/40">
                                Officially recognised tour operator
                              </span>
                            )}
                          </div>

                          {index === 0 && (
                            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#F58634] shadow-[0_0_12px_rgba(245,134,52,0.8)]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ======================================================
            CLOSING CTA
        ====================================================== */}

        <div className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-7 py-12 text-center sm:mt-28 sm:px-10 sm:py-14">
          <div className="absolute left-1/2 top-0 h-px w-20 -translate-x-1/2 bg-[#F58634]" />

          <p className="font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7BCBDA]">
            Your journey, your way
          </p>

          <h3 className="mx-auto mt-4 max-w-2xl font-['Fraunces'] text-3xl font-medium leading-tight text-white sm:text-4xl">
            Tell us where you want to go.
            <span className="block text-white/50">
              We'll take care of the rest.
            </span>
          </h3>

          <button
            onClick={scrollToQuotation}
            className="group mt-8 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#F58634] px-7 py-3.5 font-['Inter'] text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(245,134,52,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9701F] hover:shadow-[0_18px_35px_-10px_rgba(245,134,52,0.7)]"
          >
            Discuss Your Tour

            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}