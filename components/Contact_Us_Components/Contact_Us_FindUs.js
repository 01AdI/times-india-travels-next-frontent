"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Phone, Mail } from "lucide-react";

// Same contact details as the site footer — keeping one source of truth
// would be even better (import from a shared constants file if you have one).
const contactInfo = {
  address:
    "C2/106, Flat No S2, 2nd Floor, Sneh Villa, Chitrakoot Scheme, Jaipur - 302021, Rajasthan",
  phone: "+91 9610605261",
  email: "tours@timesindiatravels.com",
};

const mapQuery = encodeURIComponent(contactInfo.address);

export default function Contact_Us_FindUs() {
  return (
    <section className="relative overflow-hidden bg-[#0B3C49] py-13 sm:py-13 md:py-15">
      <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute bottom-[-220px] left-[-180px] h-[450px] w-[450px] rounded-full border border-[#F58634]/[0.04]" />

      <div className="relative mx-auto max-w-[1350px] px-6 sm:px-10 md:px-14 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-['Fraunces'] text-xl italic text-[#F58634]">
                Find us
              </span>
              <span className="h-px w-14 bg-white/20" />
              <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
                Jaipur · Rajasthan
              </span>
            </div>

            <h2 className="max-w-4xl font-['Fraunces'] text-5xl font-medium leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl">
              A place to begin
              <span className="block italic text-[#F58634]">your India story.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="font-['Inter'] text-sm leading-7 text-white/55 sm:text-base">
              From the heart of Jaipur, we create journeys that
              take you beyond the familiar — into the places,
              people and experiences that make India unforgettable.
            </p>
          </div>
        </motion.div>

        {/* MAP + CONTACT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-[30px] border border-white/10 bg-[#082F39] shadow-[0_35px_100px_rgba(0,0,0,0.28)] sm:mt-20"
        >
          <div className="h-[420px] sm:h-[500px] md:h-[570px]">
            <iframe
              title="Times India Travels Jaipur"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full border-0 grayscale-[20%]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Real contact card — address, phone, email, directions —
              replaces the small decorative "Jaipur" pill */}
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:w-[340px]">
            <div className="rounded-2xl border border-white/15 bg-[#0B3C49]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F58634]">
                  <MapPin className="h-4 w-4 text-[#0B3C49]" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-['Inter'] text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    Our Office
                  </p>
                  <p className="mt-1 font-['Inter'] text-[13px] leading-relaxed text-white/70">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 font-['Inter'] text-[13px] text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#F58634]" aria-hidden="true" />
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 font-['Inter'] text-[13px] text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#F58634]" aria-hidden="true" />
                  {contactInfo.email}
                </a>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center justify-center gap-2 rounded-full bg-[#F58634] px-4 py-2.5 font-['Inter'] text-[12px] font-bold uppercase tracking-[0.1em] text-[#0B3C49] hover:bg-white transition-colors"
              >
                Get Directions
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM EDITORIAL LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="font-['Inter'] text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
              Jaipur
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span className="font-['Inter'] text-[11px] uppercase tracking-[0.2em] text-white/35">
              The Pink City
            </span>
          </div>

          <div className="flex items-center gap-2 font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Where every journey begins
            <ArrowUpRight className="h-3.5 w-3.5 text-[#F58634]" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}