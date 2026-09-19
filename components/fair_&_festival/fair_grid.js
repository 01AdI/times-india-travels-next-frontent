import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fairFestivals } from "../../utils/fairFestivals";

export default function Fair_Grid() {
  return (
    <section className="bg-[#FAF5EB] px-5 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B85128]" />
            <span className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B85128]">
              India in Celebration
            </span>
            <span className="h-px w-8 bg-[#B85128]" />
          </div>

          <h2 className="font-['Playfair_Display',serif] text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-none tracking-[-0.035em] text-[#173C3A]">
            Festivals that bring
            <br />
            <span className="text-[#173C3A]/45">India to life.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-['Noto_Sans',sans-serif] text-[15px] leading-7 text-[#476763] sm:text-[16px] sm:leading-8">
            Discover vibrant celebrations, timeless traditions and colourful
            gatherings that reveal the spirit of India through every season.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {fairFestivals.map((festival) => (
            <article
              key={festival.id}
              className="group overflow-hidden rounded-2xl border border-[#173C3A]/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#173C3A]/20 hover:shadow-[0_20px_50px_rgba(23,60,58,0.10)]"
            >
              <Link
                href={`/fair-festival/${festival.slug}`}
                className="block"
              >
                <div className="relative h-67.5 overflow-hidden sm:h-71.25">
                  <img
                    src={festival.image}
                    alt={festival.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-['Noto_Sans',sans-serif] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B85128]">
                      {festival.location}
                    </span>

                    <span className="h-px w-6 bg-[#B85128]/50" />
                  </div>

                  <h3 className="font-['Playfair_Display',serif] text-[27px] font-medium leading-[1.08] tracking-[-0.02em] text-[#173C3A] transition-colors duration-300 group-hover:text-[#B85128]">
                    {festival.title}
                  </h3>

                  <p className="mt-4 font-['Noto_Sans',sans-serif] text-[14px] leading-6 text-[#476763]">
                    {festival.shortDescription}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-[#173C3A]/10 pt-5">
                    <span className="font-['Noto_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.22em] text-[#173C3A]">
                      Read Story
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#173C3A]/15 text-[#173C3A] transition-all duration-300 group-hover:border-[#B85128] group-hover:bg-[#B85128] group-hover:text-white">
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}