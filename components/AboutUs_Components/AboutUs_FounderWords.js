

export default function AboutUs_FounderWords(){
    return(
        <section className="bg-[#124d56] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-500">
              A Personal Note
            </span>
            <h2 className="font-['Fraunces'] font-medium text-white text-[clamp(1.75rem,3.5vw,2.75rem)] mt-4">
              Words from Our Founder & CEO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">
            {/* Photo — larger, framed like the review spotlight card */}
            <div
                data-aos="fade-right" 
                className="relative mx-auto md:mx-0 w-full max-w-[280px]"
            >
              <div className="absolute -inset-3 rounded-[24px] bg-[#F2FAFB] opacity-30" />
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
                <img
                  src="https://www.timesindiatravels.com/wp-content/uploads/2019/08/IMG-20190801-WA0013-300x300.jpg"
                  alt="Vijay Yadav, Founder & CEO of Times India Travels"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-['Inter'] text-center mt-4 text-white text-sm font-semibold">
                Vijay Yadav
              </p>
              <p className="font-['Inter'] text-center text-white/50 text-xs">
                Founder & CEO
              </p>
            </div>

            {/* Bio with a pull-quote and paragraph rhythm */}
            <div
                data-aos="fade-up"
            >
              <span
                className="font-['Fraunces'] block select-none leading-none text-[70px] text-[#7BCBDA] opacity-25"
                aria-hidden="true"
              >
                "
              </span>

              <p className="font-['Fraunces'] italic text-xl md:text-2xl text-white leading-relaxed -mt-10 mb-8">
                I founded Times India Travels in 2011, in the hope of creating
                tailor-made experiences for people who want to travel to
                India and Nepal, worry-free.
              </p>

              <div className="font-['Inter'] text-white/70 text-[15px] leading-relaxed flex flex-col gap-4">
                <p>
                  I've been working in the travel industry since 2008, with my
                  first job as a tour advisor — a life-changing experience
                  that deepened my understanding of different cultures and
                  gave me real insight into what travelers actually need.
                </p>
                <p>
                  In the years since, we've earned recognition for one reason:
                  a genuine commitment to high-quality service at a reasonable
                  price. We've served more than 10,000 people across the
                  world, helping them explore India and Nepal deeply — and
                  what stays with them isn't just the moments, but the care
                  behind them.
                </p>
                <p>
                  Customer satisfaction remains our only real priority. We
                  genuinely want to hear from our clients — every piece of
                  honest feedback helps us raise our standards further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}