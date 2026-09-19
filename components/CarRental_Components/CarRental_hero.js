export default function CarRental_Hero() {
  return (
    <section
      className="hero-section relative h-95 sm:h-110 md:h-125 flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1596829568009-bc436aac1b63?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-[#0A1220]/35" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
        }}
      />

      <div className="relative z-10 text-center px-6 -mt-4">
        <p className="font-['Playfair',serif] mb-4 text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80">
          Travel With Ease
        </p>

        <h1 className="font-['Playfair_Display',serif] text-5xl sm:text-6xl md:text-7xl font-medium text-white tracking-[0.04em] drop-shadow-lg">
          The Road, Your Way.
        </h1>

        <div className="mt-5 mx-auto w-50 h-px bg-[#F58634]" aria-hidden="true" />

        <p className="font-['Playfair',serif] mt-5 max-w-xl mx-auto text-sm sm:text-base text-white/90 font-light tracking-wide leading-relaxed">
          Private cars, trusted drivers, and comfortable journeys designed
  around the way you want to experience India.
        </p>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-17.5 sm:h-21.25 md:h-25 text-[#FAF5EB] z-10"
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