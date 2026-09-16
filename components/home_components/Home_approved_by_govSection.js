export default function Home_approved_by_govSection() {
  return (
    <section className="w-full overflow-hidden border-y border-[#C9A24B]/25 bg-[#124d56] py-12.5">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-4.5 whitespace-nowrap hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex cursor-pointer items-center gap-4.5"
          >
            <span className="text-[13.5px] font-medium uppercase tracking-[0.06em] text-[#F58634] transition-transform duration-200 hover:scale-[1.10]">
              Govt. of India Approved
            </span>

            <span className="text-[#C9A24B]">◆</span>

            <span className="mr-2 text-[13.5px] uppercase tracking-[0.06em] text-[#FAF5EB]/85 transition-transform duration-200 hover:scale-[1.10]">
              Tailor-Made Journeys
            </span>

            <span className="text-[13.5px] font-medium uppercase tracking-[0.06em] text-[#F58634] transition-transform duration-200 hover:scale-[1.10]">
              24×7 Concierge
            </span>

            <span className="text-[#C9A24B]">◆</span>

            <span className="mr-2 text-[13.5px] uppercase tracking-[0.06em] text-[#FAF5EB]/85 transition-transform duration-200 hover:scale-[1.10]">
              Solo Female Traveller Care
            </span>

            <span className="text-[13.5px] font-medium uppercase tracking-[0.06em] text-[#F58634] transition-transform duration-200 hover:scale-[1.10]">
              15 Years in India
            </span>

            <span className="text-[#C9A24B]">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}