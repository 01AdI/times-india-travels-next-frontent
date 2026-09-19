"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const affiliations = [
  {
    id: 1,
    name: "SITE",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816020/SITE_wordmark.png",
  },
  {
    id: 2,
    name: "IATO",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816051/IATO.png",
  },
  {
    id: 3,
    name: "One Tree Planted",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816074/1642a01257d76b79444e7d4800d4c096.jpg",
  },
  {
    id: 4,
    name: "Responsible Tourism",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816215/RTSOI-LOGO.png",
  },
  {
    id: 5,
    name: "TOFT Tigers",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816244/Toft.png",
  },
  {
    id: 6,
    name: "TourCert",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816268/Tourcert.png",
  },
  {
    id: 7,
    name: "Kerala Travel Mart",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816299/keralatravelmart.png",
  },
  {
    id: 8,
    name: "Trusted Site",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816321/trustedFITservice.png",
  },
  {
    id: 9,
    name: "USTOA",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816346/USTOA.png",
  },
  {
    id: 10,
    name: "sanderson-phillips",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816370/sanderson-phillips.png",
  },
  {
    id: 11,
    name: "TravellifeBW",
    image: "https://res.cloudinary.com/giz8nvjr/image/upload/v1789816408/TravelifeBW.png",
  },
  
];

const AffiliationCard = ({ affiliation }) => {
  return (
    <div
      className="
        relative
        shrink-0
        w-45
        sm:w-50
        md:w-55
        h-25
        md:h-30
        flex
        items-center
        justify-center
        px-5
        py-2.5
        md:py-3.75
      "
    >
      <Image
        src={affiliation.image}
        alt={affiliation.name}
        fill
        sizes="220px"
        className="
          object-contain
          opacity-90
          transition-all
          duration-300
          hover:opacity-100
          hover:scale-110
          cursor-pointer
        "
      />
    </div>
  );
};

const Affiliations = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Move the carousel every 4 seconds. */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  
    // After reaching the duplicated set,
    // silently jump back to the beginning.
   
  useEffect(() => {
    if (index >= affiliations.length) {
      const timeout = setTimeout(() => {
        setIndex(0);
      }, 750);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  
  //  Duplicate the affiliations so that the carousel
  //  doesn't visually end.
   
  const carouselItems = [...affiliations, ...affiliations];

  return (
    <section className="relative w-full overflow-hidden bg-[#124d56] py-14 md:py-14 ">
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-7xl px-6 text-center">
        <p className=" mb-4 text-[11px] font-['Playfair',serif] font-semibold uppercase tracking-[0.35em] text-cyan-300 " >
          Trusted & Recognized
        </p>

        <h2 className=" font-['Playfair_Display',serif] text-3xl font-medium text-white sm:text-4xl md:text-5xl " >
          Our Affiliations
        </h2>

        {/* Orange underline */}
        <div className=" mx-auto mt-5 h-px w-25 bg-[#F5823E] "/>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-[#032322] to-transparent md:w-32 "/>

        {/* Right fade */}
        <div className=" pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-[#032322] to-transparent md:w-32 " />

        <motion.div
          className="flex w-max items-center"
          animate={{
            x: `-${index * 220}px`,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {carouselItems.map((affiliation, i) => (
            <AffiliationCard
              key={`${affiliation.id}-${i}`}
              affiliation={affiliation}
              className="cursor-pointer"
            />
          ))}
        </motion.div>
      </div>

      {/* Small bottom divider */}
      <div className="mx-auto mt-12 h-px w-[80%] bg-white/10" />
    </section>
  );
};

export default Affiliations;