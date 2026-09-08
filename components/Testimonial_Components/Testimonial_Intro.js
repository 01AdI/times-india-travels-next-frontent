// ============================================================
// TESTIMONIALS — INTRO SECTION
// ============================================================

export default function Testimonial_Intro() {
  return (
    <section className="bg-[#F2FAFB] px-6 py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-5xl">

        {/* Small eyebrow */}
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[#F58634]" />

          <p className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6D6D6D]">
            The Journey Through Their Eyes
          </p>
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">

          {/* Heading */}
          <div>
            <h2 className="font-['Fraunces'] text-4xl font-medium leading-[1.1] text-[#123138] sm:text-5xl md:text-6xl">
              Every journey leaves
              <br />
              <span className="text-[#123138]/70">
                a story behind.
              </span>
            </h2>
          </div>

          {/* Description */}
          <div className="md:pb-1">
            <p className="font-['Inter'] text-sm leading-7 text-[#6D6D6D] sm:text-base">
              From first-time visitors discovering India to seasoned
              travellers returning for another journey, these stories
              capture the experiences that stay with them long after
              they return home.
            </p>

            <p className="mt-5 font-['Inter'] text-sm leading-7 text-[#6D6D6D] sm:text-base">
              Read their experiences, memories, and moments from the road
              with Times India Travels.
            </p>
          </div>
        </div>

        {/* Minimal bottom detail */}
        <div className="mt-14 flex items-center justify-between border-t border-[#123138]/10 pt-5">
          <p className="font-['Inter'] text-[14px] font-semibold uppercase tracking-[0.2em] text-[#123138]/50">
            Real travellers · Real experiences
          </p>

          <div className="hidden sm:flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
            <span className="font-['Inter'] text-[14px] font-semibold text-[#123138]">
              Times India Travels
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}