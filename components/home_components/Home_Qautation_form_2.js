"use client";

import { useState } from "react";

export default function Home_Qautation_form_2() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    duration: "",
    travelDate: "",
    adults: "",
    children: "",
    tourPackage: "",
    hotelType: "",
    reference: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your actual submission endpoint.
    console.log("Quote request:", form);
  };

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F58634]/60 focus:ring-2 focus:ring-[#F58634]/20 transition-colors";
  const labelClass =
    "block text-[11px] uppercase tracking-[0.12em] text-white/50 mb-2 font-['Inter']";
  const selectClass = inputClass + " appearance-none cursor-pointer";

  return (
    <section className="w-full  bg-[#124d56] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F58634]">
            Plan Your Trip
          </span>
          <h2 className="font-['Fraunces'] font-medium text-white text-[clamp(1.75rem,3.5vw,2.75rem)] mt-4">
            Get a Free, No-Obligation Quote
          </h2>
          <p className="font-['Inter'] text-white/60 text-[15px] mt-4 max-w-lg mx-auto">
            Tell us roughly what you have in mind — we'll come back with a
            tailored itinerary, usually within one business day.
          </p>
        </div>

        {/* Slim trust strip — one line, not a repeat of the Why Choose Us cards */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-14 font-['Inter'] text-[12px] uppercase tracking-[0.06em] text-white/50">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#F58634]" />
            Govt. of India Approved
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#F58634]" />
            24×7 Support
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#F58634]" />
            100% Tailor-Made
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#F58634]" />
            Solo Traveller Care
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#1EA5BE]/20 bg-white/[0.03] p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your full name" required />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+1 234 567 8900" required />
            </div>

            <div>
              <label className={labelClass} htmlFor="nationality">Nationality</label>
              <select id="nationality" name="nationality" value={form.nationality} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select nationality</option>
                <option value="us" className="bg-[#0A1220]">United States</option>
                <option value="uk" className="bg-[#0A1220]">United Kingdom</option>
                <option value="ca" className="bg-[#0A1220]">Canada</option>
                <option value="au" className="bg-[#0A1220]">Australia</option>
                <option value="other" className="bg-[#0A1220]">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="duration">Duration of Travel</label>
              <input id="duration" name="duration" type="text" value={form.duration} onChange={handleChange} className={inputClass} placeholder="e.g. 10 days" />
            </div>

            <div>
              <label className={labelClass} htmlFor="travelDate">Travel Date</label>
              <input id="travelDate" name="travelDate" type="date" value={form.travelDate} onChange={handleChange} className={inputClass + " [color-scheme:dark]"} />
            </div>

            <div>
              <label className={labelClass} htmlFor="adults">Adults</label>
              <select id="adults" name="adults" value={form.adults} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-[#0A1220]">{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="children">Children</label>
              <select id="children" name="children" value={form.children} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select</option>
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-[#0A1220]">{n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="tourPackage">Tour Package</label>
              <select id="tourPackage" name="tourPackage" value={form.tourPackage} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select a package</option>
                <option value="golden-triangle" className="bg-[#0A1220]">Golden Triangle</option>
                <option value="rajasthan" className="bg-[#0A1220]">Rajasthan Tour</option>
                <option value="kerala" className="bg-[#0A1220]">Kerala Backwaters</option>
                <option value="himalayas" className="bg-[#0A1220]">Himalayan Adventure</option>
                <option value="custom" className="bg-[#0A1220]">Custom / Not Sure Yet</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="hotelType">Type of Hotel</label>
              <select id="hotelType" name="hotelType" value={form.hotelType} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select</option>
                <option value="budget" className="bg-[#0A1220]">Budget</option>
                <option value="standard" className="bg-[#0A1220]">Standard</option>
                <option value="luxury" className="bg-[#0A1220]">Luxury</option>
                <option value="heritage" className="bg-[#0A1220]">Heritage Property</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="reference">How Did You Hear About Us?</label>
              <select id="reference" name="reference" value={form.reference} onChange={handleChange} className={selectClass}>
                <option value="" className="bg-[#0A1220]">Select</option>
                <option value="google" className="bg-[#0A1220]">Google Search</option>
                <option value="tripadvisor" className="bg-[#0A1220]">TripAdvisor</option>
                <option value="referral" className="bg-[#0A1220]">Friend / Family Referral</option>
                <option value="social" className="bg-[#0A1220]">Social Media</option>
                <option value="other" className="bg-[#0A1220]">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="details">Rough Itinerary & Details</label>
              <textarea
                id="details"
                name="details"
                rows={4}
                value={form.details}
                onChange={handleChange}
                className={inputClass + " resize-none"}
                placeholder="Tell us a little about what you're picturing — places you want to see, pace, budget range, anything helpful."
              />
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-[#F58634] hover:bg-[#D9701F] text-white font-['Inter'] font-semibold text-sm tracking-wide rounded-full px-10 py-4 transition-colors cursor-pointer"
            >
              Submit Your Request
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}