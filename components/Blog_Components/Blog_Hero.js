export default function Blog_Hero() {
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
      "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/30312127/pexels-photo-30312127.jpeg')",
      }}
    >

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(10,18,32,0.18), rgba(10,18,32,0.68) 88%)",
        }}
      />

      <div className="relative z-10 -mt-4 px-6 text-center">

        {/* Eyebrow */}

        <p
          className="
            mb-4
            font-['Playfair',serif]
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
            font-['Playfair_Display',serif]
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
            h-px
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
            font-['Playfair',serif]
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