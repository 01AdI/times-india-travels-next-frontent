export default function Home_Quote() {
  return (
    <section className="relative overflow-hidden w-full py-30 border-y border-[#C9A24B]/25 px-6 md:px-14 flex items-center justify-center min-h-[420px]">
      {/* Backdrop image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://i.pinimg.com/736x/cf/b8/e9/cfb8e9c87130078942da3f6443390676.jpg"
        alt="Sunrise over the Himalayas to sunset on the Arabian Sea"
      />

      {/* Dark tint so the quote stays legible over a busy photo */}
      <div className="absolute inset-0 bg-[#0A1220]/10" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(10,18,32,0.15), rgba(10,18,32,0.65) 80%)",
        }}
      />

      {/* Quote */}
      <div
      data-aos="zoom-out"
      className="relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="font-['Fraunces'] block select-none leading-none text-[70px] text-white opacity-50"
          aria-hidden="true"
        >
          "
        </span>
        <p className="font-['Fraunces'] font-medium text-2xl md:text-3xl text-white leading-relaxed">
          Between every sunrise over the Himalayas and every sunset along the
          Arabian Sea lies a journey that only India can offer.
        </p>
      </div>
    </section>
  );
}