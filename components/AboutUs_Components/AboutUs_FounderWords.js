

import Image from "next/image";

export default function AboutUs_FounderWords(){
    return(
        <section className="bg-[#124d56] py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-['Playfair',serif] text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-500">
              A Personal Note
            </span>
            <h2 className="font-['Playfair_Display',serif] font-medium text-white text-[clamp(1.75rem,3.5vw,2.75rem)] mt-4">
              Words from Our Founder & CEO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">
            {/* Photo — larger, framed like the review spotlight card */}
            <div
                data-aos="fade-right" 
                className="relative mx-auto md:mx-0 w-full max-w-70"
            >
              <div className="absolute -inset-3 rounded-3xl bg-[#F2FAFB] opacity-30" />
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
                <Image
                  src="https://www.timesindiatravels.com/wp-content/uploads/2019/08/IMG-20190801-WA0013-300x300.jpg"
                  alt="Vijay Yadav, Founder & CEO of Times India Travels"
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              </div>
              <p className="font-['Playfair_Display',serif] text-center mt-4 text-white text-sm font-semibold">
                Vijay Yadav
              </p>
              <p className="font-['Playfair',serif] text-center text-white/50 text-xs">
                Founder & CEO
              </p>
            </div>

            {/* Bio with a pull-quote and paragraph rhythm */}
            <div
                data-aos="fade-up"
            >
              <span
                className="font-['Playfair_Display',serif] block select-none leading-none text-[70px] text-[#7BCBDA] opacity-25"
                aria-hidden="true"
              >
                &quot;
              </span>

              <p className="font-['Playfair_Display',serif] italic text-xl md:text-2xl text-white leading-relaxed -mt-10 mb-8">
                I founded Times India Travels in 2011, in the hope of creating
                tailor-made experiences for people who want to travel to
                India and Nepal, worry-free.
              </p>

              <div className="font-['Noto_Sans',sans-serif] text-white/70 text-[15px] leading-relaxed flex flex-col gap-4">
                <p>
                  I’ve been working in the travel industry since 2008, starting my journey as a tour advisor. 
                  That first experience changed the way I looked at travel. 
                  It helped me understand different cultures, meet people from around the world, 
                  and most importantly, learn what travellers truly value when they visit a new country.
                </p>
                <p>
                  Over the years, we’ve had the privilege of welcoming more than 10,000 travellers from across the world to India and Nepal. 
                  For us, every traveller is more than just a booking. We want you to feel comfortable, cared for, 
                  and connected to the places you visit.
                </p>
                
                <p>
                  Our focus has always been simple - good service, honest pricing, 
                  and journeys that people remember for the right reasons.
                  We also believe that every journey teaches us something. 
                  That’s why we truly value your feedback. Your experiences and suggestions help us learn, 
                  improve, and continue creating better journeys for every traveller who chooses to travel with us.
                 
                </p>
                <p>
                  Thank you for trusting us with your journey. We look forward to welcoming you to India.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
    )
}