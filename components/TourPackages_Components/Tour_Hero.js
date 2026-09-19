
export default function Tour_Hero(){
    return(
        <section
      className="hero-section relative h-95 sm:h-110 md:h-125 flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1590798766926-b2beb93ff56e?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 -mt-4">
        <p className="font-['Playfair',serif] mb-4 text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80">
          Explore Incredible India
        </p>

        <h1 className="font-['Playfair_Display',serif] text-5xl sm:text-6xl md:text-7xl font-medium text-white tracking-[0.04em] drop-shadow-lg">
          Tour Packages
        </h1>

        <div
          className="mt-5 mx-auto w-30 h-px bg-[#F58634]"
          aria-hidden="true"
        />

        <p className="font-['Playfair',serif] mt-5 max-w-xl mx-auto text-sm sm:text-base text-white/90 font-light tracking-wide leading-relaxed">
          Thoughtfully crafted journeys designed to help you discover the
          colours, culture, and unforgettable experiences of India.
        </p>
      </div>

      {/* Bottom Curve */}
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
    )
}