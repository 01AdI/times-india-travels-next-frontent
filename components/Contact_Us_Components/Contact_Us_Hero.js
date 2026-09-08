// ============================================================
// CONTACT US — PREMIUM HERO SECTION
// ============================================================

export default function Contact_Us_Hero() {
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
        hero-section
      "
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/ea/3b/aa/ea3baa720fabc7eceb9705826f139f97.jpg')",
      }}
    >

      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
        }}
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-10 -mt-4 px-6 text-center">

        {/* EYEBROW */}

        <p
          className="
            mb-4
            font-['Inter']
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.35em]
            text-white/80
            sm:text-xs
          "
        >
          We'd Love To Hear From You
        </p>

        {/* HEADING */}

        <h1
          className="
            font-['Fraunces']
            text-5xl
            font-medium
            tracking-[0.01em]
            text-white
            drop-shadow-lg
            sm:text-6xl
            md:text-7xl
          "
        >
          Let's Talk
        </h1>

        {/* ACCENT LINE */}

        <div
          className="
            mx-auto
            mt-5
            h-[1px]
            w-30
            bg-[#F58634]
          "
          aria-hidden="true"
        />

        {/* DESCRIPTION */}

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
          Whether you're dreaming about your first trip to India
          or planning your next adventure, we're here to help
          turn your ideas into a journey worth remembering.
        </p>

      </div>

      {/* =====================================================
          BOTTOM CURVE
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