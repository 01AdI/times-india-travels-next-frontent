export default function TourPackage_category_Hero({ data }) {
  return (
    <section
      className="hero-section relative h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url("${data.heroImage}")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-white">

        <p className="mb-4 font-['Inter'] text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/80">
          {data.tagline}
        </p>

        <h1 className="font-['Fraunces'] text-5xl sm:text-6xl md:text-7xl font-medium">
          {data.name}
        </h1>

        <div className="mx-auto mt-5 h-[2px] w-12 bg-[#F58634]" />

        <p className="mx-auto mt-5 max-w-2xl font-['Inter'] text-sm sm:text-base leading-7 text-white/85">
          {data.description}
        </p>

      </div>

      {/* Bottom curve */}
      <svg
        className="absolute bottom-0 left-0 z-10 h-[70px] w-full text-[#F2FAFB] sm:h-[85px] md:h-[100px]"
        viewBox="0 0 1440 120"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,120 Q720,15 1440,120 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}