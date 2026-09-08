export default function TourPackage_Category_Highlights({ data }) {
  const highlights = [
    {
      number: "01",
      title: "Iconic Destinations",
      description: `Explore the best of ${data.name.replace(
        " Tours",
        ""
      )} through carefully planned routes and unforgettable experiences.`,
    },
    {
      number: "02",
      title: "Expertly Crafted",
      description:
        "Thoughtfully designed itineraries that balance sightseeing, culture, relaxation and authentic local experiences.",
    },
    {
      number: "03",
      title: "Flexible Experiences",
      description:
        "Choose from multiple tour packages and find a journey that matches your pace, interests and travel style.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F2FAFB] py-13 sm:py-13 md:py-15">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* HEADER — the single header for this page section now;
            the old Intro component's duplicate header was removed. */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="mb-4 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#F58634] sm:text-[11px]">
            Explore {data.name}
          </p>

          <h2 className="font-['Fraunces'] text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#0B3C49] sm:text-5xl md:text-6xl">
            Experience {data.name}
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-10 bg-[#F58634]" />

          <p className="mx-auto mt-6 max-w-2xl font-['Inter'] text-sm leading-7 text-[#5F6F73] sm:text-base">
            Choose from our carefully crafted journeys and discover the
            places, culture and experiences that make this region unique.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-[#0B3C49]/10 md:grid-cols-3 cursor-pointer">
          {highlights.map((item) => (
            <div
              key={item.number}
              className="group bg-white p-8 transition-colors duration-500 hover:bg-[#0B3C49] sm:p-10 md:p-12"
            >
              <span className="font-['Fraunces'] text-4xl font-light text-[#0B3C49]/25 transition-colors duration-500 group-hover:text-[#F58634]">
                {item.number}
              </span>

              <h3 className="mt-10 font-['Fraunces'] text-2xl font-medium text-[#0B3C49] transition-colors duration-500 group-hover:text-white sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 font-['Inter'] text-sm leading-7 text-[#5F6F73] transition-colors duration-500 group-hover:text-white/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}