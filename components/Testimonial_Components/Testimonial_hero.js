// ============================================================
// TESTIMONIALS — PREMIUM HERO SECTION
// ============================================================

export default function Testimonial_Hero() {
  return (
    <section
      className="hero-section relative h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/2c/e6/b2/2ce6b2cd840cf13df5d962a1f0a0b54b.jpg')",
      }}
    >
      {/* Premium contrast overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 -mt-4">
        <p className="font-['Inter'] mb-4 text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80">
          Traveller Stories
        </p>

        <h1 className="font-['Fraunces'] text-5xl sm:text-6xl md:text-7xl font-medium text-white tracking-[0.04em] drop-shadow-lg">
          Stories From The Road
        </h1>

        <div
          className="mt-5 mx-auto w-30 h-[1px] bg-[#F58634]"
          aria-hidden="true"
        />

        <p className="font-['Inter'] mt-5 max-w-2xl mx-auto text-sm sm:text-base text-white/90 font-light tracking-wide leading-relaxed">
          Real journeys, unforgettable moments, and stories shared by
          travellers who experienced India with Times India Travels.
        </p>
      </div>

      {/* Bottom Curve */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[70px] sm:h-[85px] md:h-[100px] text-[#F2FAFB] z-10"
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