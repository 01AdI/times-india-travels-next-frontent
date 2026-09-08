"use client";

import { useState } from "react";

const features = [
  {
    title: "10,000+ Happy Clients",
    desc: "Served across every corner of India, worldwide.",
    path: "M8 12l3 3 5-6",
    extra: <circle cx="12" cy="12" r="9" />,
  },
  {
    title: "Govt. of India Approved",
    desc: "Recognized by the Ministry of Tourism.",
    path: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
    extra: <path d="M9.5 12l1.7 1.7L15 10" />,
  },
  {
    title: "24×7 Availability",
    desc: "Available round the clock, wherever you are.",
    path: "M12 7v5l3 3",
    extra: <circle cx="12" cy="12" r="9" />,
  },
  {
    title: "100% Tailor-Made",
    desc: "Itineraries customized exactly the way you want.",
    path: "M4 12h16M4 7h10M4 17h13",
    extra: (
      <>
        <circle cx="17" cy="7" r="1.4" fill="white" />
        <circle cx="9" cy="17" r="1.4" fill="white" />
      </>
    ),
  },
];

const testimonials = [
  {
    id: 1,
    video:
      "https://www.timesindiatravels.com/wp-content/uploads/2023/06/David-and-Carol-from-UK-.mp4",
  },
  {
    id: 2,
    video: "https://www.timesindiatravels.com/wp-content/uploads/2023/06/John-and-Audrey-from-Scottland-.mp4",
  },
  {
    id: 3,
    video: "https://www.timesindiatravels.com/wp-content/uploads/2023/06/Jackie-Keith-from-UK-.mp4",
  },
  {
    id: 4,
    video: "https://www.timesindiatravels.com/wp-content/uploads/2023/06/David-and-Linda-Valdes-USA-from-Hollywood-.mp4",
  },
  {
    id: 5,
    video: "https://www.timesindiatravels.com/wp-content/uploads/2019/07/memed-io-output-1.webm",
  },
  
];

export default function Home_WhyChooseUs() {
    const [currentVideo, setCurrentVideo] = useState(0);
    
    const nextVideo = () => {
        setCurrentVideo((prev) => (prev + 1) % testimonials.length);
    };

    const prevVideo = () => {
        setCurrentVideo((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

  return (
    <>
      <section className="overflow-hidden w-full py-20 border-y border-[#C9A24B]/25 bg-[#124d56] px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
              <span className="font-['Inter'] text-[11px] tracking-[0.28em] uppercase text-[#C9A24B]">
                The Difference
              </span>
              <span className="w-8 h-[1.5px] bg-[#C9A24B]" />
            </div>
            <h2 className="font-['Fraunces'] font-medium text-white text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#1EA5BE]/30 bg-white/[0.04] p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F58634]/60 hover:bg-white/[0.07]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F58634] to-[#b56223] flex items-center justify-center mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-white fill-none"
                    strokeWidth="1.8"
                  >
                    <path d={f.path} />
                    {f.extra}
                  </svg>
                </div>
                <h3 className="font-['Inter'] text-white text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="font-['Inter'] text-white/60 text-sm mt-2 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="#"
              className="font-['Inter'] inline-block  bg-[#b56223] hover:bg-[#D9701F] text-white font-semibold text-sm tracking-wide rounded-full px-8 py-4 transition-colors cursor-pointer"
            >
              Discuss Your Tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}