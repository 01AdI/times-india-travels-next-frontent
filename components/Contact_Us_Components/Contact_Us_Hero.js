export default function Contact_Us_Hero() {
  return (
    <section
      className="
        hero-section
        relative
        flex
        h-95
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
        sm:h-110
        md:h-125
        hero-section
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(10,18,32,0.2), rgba(10,18,32,0.55) 85%)",
        }}
      />

      <div className="relative z-10 -mt-4 px-6 text-center">

        {/* EYEBROW */}

        <p
          className="
            mb-4
            font-['Playfair',serif]
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.35em]
            text-white/80
            sm:text-xs
          "
        >
          We&apos;d Love To Hear From You
        </p>

        {/* HEADING */}

        <h1
          className="
            font-['Playfair_Display',serif]
            text-5xl
            font-medium
            tracking-[0.01em]
            text-white
            drop-shadow-lg
            sm:text-6xl
            md:text-7xl
          "
        >
          Let&apos;s Talk
        </h1>

        {/* ACCENT LINE */}

        <div
          className="
            mx-auto
            mt-5
            h-px
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
            font-['Playfair',serif]
            text-sm
            font-light
            leading-relaxed
            tracking-wide
            text-white/90
            sm:text-base
          "
        >
          Whether you&apos;re dreaming about your first trip to India
          or planning your next adventure, we&apos;re here to help
          turn your ideas into a journey worth remembering.
        </p>

      </div>

      <svg
        className="
          absolute
          bottom-0
          left-0
          z-10
          h-17.5
          w-full
          text-[#FAF5EB]
          sm:h-21.25
          md:h-25
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