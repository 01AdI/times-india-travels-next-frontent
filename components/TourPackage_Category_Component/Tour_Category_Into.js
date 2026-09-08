export default function TourPackage_Category_Intro({ data }) {
  return (
    <section className="bg-[#F2FAFB] px-6 py-16 sm:py-20">

      <div className="mx-auto max-w-4xl text-center">

        <p className="mb-4 font-['Inter'] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#F58634]">
          Explore {data.name}
        </p>

        <h2 className="font-['Fraunces'] text-4xl sm:text-5xl md:text-6xl text-[#0B3C49]">
          Journeys Through {data.title}
        </h2>

        <div className="mx-auto mt-6 h-[2px] w-10 bg-[#F58634]" />

        <p className="mx-auto mt-6 max-w-3xl font-['Inter'] text-sm sm:text-base leading-7 text-[#5F6F73]">
          Choose from our carefully crafted journeys and discover the
          places, culture and experiences that make this region unique.
        </p>

      </div>

    </section>
  );
}