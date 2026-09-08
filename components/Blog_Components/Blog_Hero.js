// ============================================================
// BLOG — PREMIUM HERO SECTION
// ============================================================

export default function Blog_Hero() {
  return (
    <section
      className="
        hero-section
        relative
        flex
        h-[380px]
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
        sm:h-[440px]
        md:h-[500px]
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=85')",
      }}
    >
      {/* =====================================================
          DARK EDITORIAL OVERLAY
      ====================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(10,18,32,0.18), rgba(10,18,32,0.68) 88%)",
        }}
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-10 -mt-4 px-6 text-center">

        {/* Eyebrow */}

        <p
          className="
            mb-4
            font-['Inter']
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-white/80
            sm:text-xs
          "
        >
          The India Travel Journal
        </p>

        {/* Heading */}

        <h1
          className="
            font-['Fraunces']
            text-5xl
            font-medium
            tracking-[0.04em]
            text-white
            drop-shadow-lg
            sm:text-6xl
            md:text-7xl
          "
        >
          Stories From India
        </h1>

        {/* Accent line */}

        <div
          className="
            mx-auto
            mt-5
            h-[1px]
            w-24
            bg-[#F58634]
          "
          aria-hidden="true"
        />

        {/* Description */}

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            font-['Inter']
            text-sm
            font-light
            leading-relaxed
            tracking-wide
            text-white/90
            sm:text-base
          "
        >
          Discover the places, people, traditions and experiences
          that make travelling through India unforgettable.
        </p>

      </div>

      {/* =====================================================
          BOTTOM CURVED TRANSITION
      ====================================================== */}

      <svg
        className="
          absolute
          bottom-0
          left-0
          z-10
          h-[70px]
          w-full
          text-[#F2FAFB]
          sm:h-[85px]
          md:h-[100px]
        "
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