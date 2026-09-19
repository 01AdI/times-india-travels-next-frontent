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
    <section className="relative overflow-hidden bg-[#FAF5EB] py-13 sm:py-13 md:py-15">
      <div className="mx-auto max-w-375 px-5 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-16">

          <p className="mb-4 font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#B85128] sm:text-[11px]">
            Explore {data.name}
          </p>

          <h2 className="font-['Playfair_Display',serif] text-4xl font-medium leading-[1.08] tracking-tight text-[#173C3A] sm:text-5xl md:text-6xl">
            Experience {data.name}
          </h2>

          <div className="mx-auto mt-6 h-0.5 w-50 bg-[#F58634]" />

          {/* FULL DESCRIPTION */}
          <p className="mx-auto mt-8 max-w-full font-['Noto_Sans',sans-serif] text-sm leading-8 text-[#476763]/70 sm:text-base">
            {data.description}
          </p>

        </div>

        {/* HIGHLIGHTS */}
        <div className="grid cursor-pointer gap-px overflow-hidden rounded-[28px] bg-[#0B3C49]/10 md:grid-cols-3">

          {highlights.map((item) => (
            <div
              key={item.number}
              className="group bg-white p-8 transition-colors duration-500 hover:bg-[#0B3C49] sm:p-10 md:p-12"
            >
              <span className="font-['Playfair',serif] text-4xl font-light text-[#0B3C49]/25 transition-colors duration-500 group-hover:text-[#F58634]">
                {item.number}
              </span>

              <h3 className="mt-10 font-['Playfair_Display',serif] text-2xl font-medium text-[#0B3C49] transition-colors duration-500 group-hover:text-white sm:text-3xl">
                {item.title}
              </h3>

              <p className="mt-4 font-['Noto_Sans',sans-serif] text-sm leading-7 text-[#5F6F73] transition-colors duration-500 group-hover:text-white/65">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}