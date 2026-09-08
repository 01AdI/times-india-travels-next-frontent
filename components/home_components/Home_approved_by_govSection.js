export default function Home_approved_by_govSection() {
  return (
    <section className="overflow-hidden w-full py-12.5 border-y border-[#C9A24B]/25 bg-[#124d56]">
      <div className="flex items-center gap-4.5 w-max whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-4.5 cursor-pointer">
            <span className="text-[13.5px] tracking-[0.06em] uppercase text-[#F58634] font-medium transition-transform duration-200 hover:scale-[1.10]">
              Govt. of India Approved
            </span>
            <span className="text-cyan-300">◆</span>
            <span className="text-[13.5px] tracking-[0.06em] uppercase text-cyan-300 transition-transform duration-200 hover:scale-[1.10] mr-2">
              Tailor-Made Journeys
            </span>
            <span className="text-[13.5px] tracking-[0.06em] uppercase text-[#F58634] font-medium transition-transform duration-200 hover:scale-[1.10]">
              24×7 Concierge
            </span>
            <span className="text-cyan-300">◆</span>
            <span className="text-[13.5px] tracking-[0.06em] uppercase text-cyan-300 transition-transform duration-200 hover:scale-[1.10] mr-2">
              Solo Female Traveller Care
            </span>
            <span className="text-[13.5px] tracking-[0.06em] uppercase text-[#F58634] font-medium transition-transform duration-200 hover:scale-[1.10]">
              15 Years in India
            </span>
            <span className="text-cyan-300">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}