
export default function CarRental_content() {
  return (
    <>
      <section className="bg-[#F2FAFB] px-6 py-13 sm:py-13 lg:py-14">
        <div className="mx-auto max-w-4xl text-center">
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
            Travel on your terms
          </span>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-[clamp(2rem,4vw,3rem)]
              font-medium
              leading-tight
              text-[#0B3C49]
            "
          >
            Chauffeur-driven journeys,
            <br className="hidden sm:block" />
            built around you
          </h2>

          <div className="mx-auto mt-6 h-px w-20 bg-[#F58634]" />

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              font-['Inter']
              text-[15px]
              leading-[1.85]
              text-[#124d56]/70
              sm:text-base
            "
          >
            From a comfortable sedan for two to a spacious vehicle for a
            larger group, our chauffeur-driven services are designed around
            the way you want to experience India.
          </p>

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              font-['Inter']
              text-[15px]
              leading-[1.85]
              text-[#124d56]/65
              sm:text-base
            "
          >
            Whether you're travelling through Rajasthan, following the
            Golden Triangle, exploring South India or creating your own
            multi-state itinerary, we'll help you choose the right vehicle
            and make the road part of the journey.
          </p>
        </div>
      </section>

    </>
  );
}