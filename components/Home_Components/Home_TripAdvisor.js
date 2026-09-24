import Image from "next/image";

export default function Home_TripAdvisor() {
  return (
    <section className="overflow-hidden flex justify-around items-center w-full py-6 border-t border-[#C9A24B]/25 bg-white">
      <Image
        className="hover:scale-[1.15] cursor-pointer"
        src="https://www.timesindiatravels.com/wp-content/themes/timesindiatravels/assets/images/badge1.png"
        alt="TripAdvisor Travelers' Choice award"
        width="230"
        height="230"
        unoptimized
      />
      <Image
        className="hover:scale-[1.15] cursor-pointer"
        src="https://www.timesindiatravels.com/wp-content/themes/timesindiatravels/assets/images/badge2.png"
        alt="TripAdvisor certificate of excellence award"
        width="230"
        height="230"
        unoptimized
      />
      <Image
        className="hover:scale-[1.15] cursor-pointer"
        src="https://www.timesindiatravels.com/wp-content/themes/timesindiatravels/assets/images/badge3.png"
        alt="TripAdvisor top-rated tour operator badge"
        width="230"
        height="230"
        unoptimized
      />
    </section>
  );
}