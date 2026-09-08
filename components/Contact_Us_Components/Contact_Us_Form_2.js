"use client";

// ============================================================
// CONTACT US — PLAN YOUR JOURNEY
// PREMIUM TRAVEL ENQUIRY FORM
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  Phone,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function Contact_Us_PlanJourney_2() {
  const [formData, setFormData] = useState({
    destination: "",
    travelDate: "",
    travellers: "2",
    name: "",
    email: "",
    phone: "",
    duration: "",
    hotel: "",
    reference: "",
    itinerary: "",
  });

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // HANDLE SUBMIT
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Travel Enquiry:", formData);

    alert(
      "Thank you! Your journey request has been received. Our travel specialist will be in touch shortly."
    );
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#0B3C49]
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-12
        lg:py-28
      "
    >
      {/* ======================================================
          BACKGROUND ATMOSPHERE
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
      >
        <div
          className="
            absolute
            left-[18%]
            top-0
            h-full
            w-px
            bg-white
          "
        />

        <div
          className="
            absolute
            left-[50%]
            top-0
            h-full
            w-px
            bg-white
          "
        />

        <div
          className="
            absolute
            left-[82%]
            top-0
            h-full
            w-px
            bg-white
          "
        />
      </div>

      {/* LARGE SOFT LIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#F58634]/[0.07]
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#124D56]/40
          blur-[120px]
        "
      />

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
        "
      >
        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[0.82fr_1.18fr]
            lg:gap-20
          "
        >
          {/* ==================================================
              LEFT — EDITORIAL CONTENT
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* SECTION NUMBER */}

            <div className="mb-8 flex items-center gap-4">
              <span
                className="
                  font-['Fraunces']
                  text-xl
                  text-[#F58634]
                "
              >
                02
              </span>

              <span
                className="
                  h-px
                  w-12
                  bg-white/20
                "
              />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                  text-white/45
                "
              >
                Plan Your Journey
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                max-w-[560px]
                font-['Fraunces']
                text-[52px]
                font-medium
                leading-[0.92]
                tracking-[-0.045em]
                text-white
                sm:text-[64px]
                md:text-[72px]
                lg:text-[76px]
              "
            >
              Your India.

              <span
                className="
                  block
                  italic
                  text-[#F58634]
                "
              >
                Your way.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                max-w-[470px]
                font-['Inter']
                text-[14px]
                font-light
                leading-7
                text-white/55
                sm:text-[15px]
              "
            >
              Tell us where you want to go, when you want to
              travel and what you want to experience. We'll take
              care of the rest.
            </p>

            {/* =================================================
                JOURNEY STEPS
            ================================================== */}

            <div className="mt-12 max-w-[500px]">
              <div className="relative flex items-start justify-between">
                {/* CONNECTING LINE */}

                <div
                  className="
                    absolute
                    left-[22px]
                    right-[22px]
                    top-[15px]
                    h-px
                    bg-white/10
                  "
                />

                {/* STEP 1 */}

                <div className="relative z-10 flex flex-col items-start">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F58634]
                      font-['Inter']
                      text-[9px]
                      font-bold
                      text-[#0B3C49]
                    "
                  >
                    01
                  </div>

                  <span
                    className="
                      mt-3
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/45
                    "
                  >
                    Tell us
                  </span>
                </div>

                {/* STEP 2 */}

                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-[#0B3C49]
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      text-white/35
                    "
                  >
                    02
                  </div>

                  <span
                    className="
                      mt-3
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    We plan
                  </span>
                </div>

                {/* STEP 3 */}

                <div className="relative z-10 flex flex-col items-end">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-[#0B3C49]
                      font-['Inter']
                      text-[9px]
                      font-semibold
                      text-white/35
                    "
                  >
                    03
                  </div>

                  <span
                    className="
                      mt-3
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    You travel
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                SMALL SIGNATURE
            ================================================== */}

            <div className="mt-14 flex items-center gap-4">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#F58634]/25
                  bg-[#F58634]/[0.06]
                "
              >
                <Sparkles
                  className="
                    h-4
                    w-4
                    text-[#F58634]
                  "
                />
              </div>

              <span
                className="
                  font-['Inter']
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                "
              >
                Tailor-made · Personal · Effortless
              </span>
            </div>
          </motion.div>

          {/* ==================================================
              RIGHT — FORM
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
            "
          >
            {/* =================================================
                GLASS FORM CONTAINER
            ================================================== */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-white/[0.14]
                bg-white/[0.055]
                p-5
                shadow-[0_35px_100px_rgba(0,0,0,0.18)]
                backdrop-blur-xl
                sm:p-7
                md:p-8
              "
            >
              {/* INNER LIGHT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#F58634]/[0.06]
                  blur-3xl
                "
              />

              {/* =================================================
                  FORM HEADER
              ================================================== */}

              <div className="relative mb-7">
                <p
                  className="
                    mb-2
                    font-['Inter']
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#F58634]
                  "
                >
                  Begin your journey
                </p>

                <h3
                  className="
                    font-['Fraunces']
                    text-2xl
                    font-medium
                    tracking-[-0.02em]
                    text-white
                    sm:text-3xl
                  "
                >
                  Where will you go?
                </h3>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="relative"
              >
                {/* =================================================
                    DESTINATION — FULL WIDTH
                ================================================== */}

                <div className="relative">
                  <MapPin
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      z-10
                      h-[16px]
                      w-[16px]
                      -translate-y-1/2
                      text-[#F58634]
                    "
                  />

                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="
                      h-[52px]
                      w-full
                      appearance-none
                      rounded-[14px]
                      border
                      border-white/[0.13]
                      bg-white/[0.055]
                      pl-11
                      pr-11
                      font-['Inter']
                      text-[11px]
                      font-medium
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/25
                      hover:bg-white/[0.075]
                      focus:border-[#F58634]/60
                      focus:bg-white/[0.08]
                      focus:ring-1
                      focus:ring-[#F58634]/15
                    "
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#0B3C49] text-white"
                    >
                      Select your destination
                    </option>

                    <option
                      value="Rajasthan"
                      className="bg-[#0B3C49] text-white"
                    >
                      Rajasthan
                    </option>

                    <option
                      value="Golden Triangle"
                      className="bg-[#0B3C49] text-white"
                    >
                      Golden Triangle
                    </option>

                    <option
                      value="Kerala"
                      className="bg-[#0B3C49] text-white"
                    >
                      Kerala
                    </option>

                    <option
                      value="Goa"
                      className="bg-[#0B3C49] text-white"
                    >
                      Goa
                    </option>

                    <option
                      value="South India"
                      className="bg-[#0B3C49] text-white"
                    >
                      South India
                    </option>

                    <option
                      value="North India"
                      className="bg-[#0B3C49] text-white"
                    >
                      North India
                    </option>

                    <option
                      value="India Wildlife"
                      className="bg-[#0B3C49] text-white"
                    >
                      India Wildlife
                    </option>

                    <option
                      value="Custom India Journey"
                      className="bg-[#0B3C49] text-white"
                    >
                      Custom India Journey
                    </option>
                  </select>

                  <ChevronDown
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-white/45
                    "
                  />
                </div>

                {/* =================================================
                    DATE + TRAVELLERS
                ================================================== */}

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {/* DATE */}

                  <div className="relative">
                    <CalendarDays
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        h-[16px]
                        w-[16px]
                        -translate-y-1/2
                        text-[#F58634]
                      "
                    />

                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="
                        h-[52px]
                        w-full
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        pl-11
                        pr-3
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    />
                  </div>

                  {/* TRAVELLERS */}

                  <div className="relative">
                    <Users
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        h-[16px]
                        w-[16px]
                        -translate-y-1/2
                        text-[#F58634]
                      "
                    />

                    <select
                      name="travellers"
                      value={formData.travellers}
                      onChange={handleChange}
                      className="
                        h-[52px]
                        w-full
                        appearance-none
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        pl-11
                        pr-10
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                        (number) => (
                          <option
                            key={number}
                            value={number}
                            className="bg-[#0B3C49] text-white"
                          >
                            {number}{" "}
                            {number === 1
                              ? "Traveller"
                              : "Travellers"}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/45
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    NAME + EMAIL
                ================================================== */}

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="
                      h-[52px]
                      w-full
                      rounded-[14px]
                      border
                      border-white/[0.13]
                      bg-white/[0.055]
                      px-4
                      font-['Inter']
                      text-[11px]
                      font-medium
                      text-white
                      outline-none
                      placeholder:text-white/40
                      transition-all
                      duration-300
                      hover:border-white/25
                      hover:bg-white/[0.075]
                      focus:border-[#F58634]/60
                      focus:bg-white/[0.08]
                      focus:ring-1
                      focus:ring-[#F58634]/15
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email address"
                    className="
                      h-[52px]
                      w-full
                      rounded-[14px]
                      border
                      border-white/[0.13]
                      bg-white/[0.055]
                      px-4
                      font-['Inter']
                      text-[11px]
                      font-medium
                      text-white
                      outline-none
                      placeholder:text-white/40
                      transition-all
                      duration-300
                      hover:border-white/25
                      hover:bg-white/[0.075]
                      focus:border-[#F58634]/60
                      focus:bg-white/[0.08]
                      focus:ring-1
                      focus:ring-[#F58634]/15
                    "
                  />
                </div>

                {/* =================================================
                    PHONE + DURATION
                ================================================== */}

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {/* PHONE */}

                  <div className="relative">
                    <Phone
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        z-10
                        h-[15px]
                        w-[15px]
                        -translate-y-1/2
                        text-[#F58634]
                      "
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone number"
                      className="
                        h-[52px]
                        w-full
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        pl-11
                        pr-4
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        placeholder:text-white/40
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    />
                  </div>

                  {/* DURATION */}

                  <div className="relative">
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="
                        h-[52px]
                        w-full
                        appearance-none
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        px-4
                        pr-10
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    >
                      <option
                        value=""
                        className="bg-[#0B3C49] text-white"
                      >
                        Duration
                      </option>

                      <option
                        value="3-5 Days"
                        className="bg-[#0B3C49] text-white"
                      >
                        3–5 Days
                      </option>

                      <option
                        value="6-8 Days"
                        className="bg-[#0B3C49] text-white"
                      >
                        6–8 Days
                      </option>

                      <option
                        value="9-12 Days"
                        className="bg-[#0B3C49] text-white"
                      >
                        9–12 Days
                      </option>

                      <option
                        value="13-16 Days"
                        className="bg-[#0B3C49] text-white"
                      >
                        13–16 Days
                      </option>

                      <option
                        value="17+ Days"
                        className="bg-[#0B3C49] text-white"
                      >
                        17+ Days
                      </option>
                    </select>

                    <ChevronDown
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/45
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    HOTEL + REFERENCE
                ================================================== */}

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {/* HOTEL */}

                  <div className="relative">
                    <select
                      name="hotel"
                      value={formData.hotel}
                      onChange={handleChange}
                      className="
                        h-[52px]
                        w-full
                        appearance-none
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        px-4
                        pr-10
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    >
                      <option
                        value=""
                        className="bg-[#0B3C49] text-white"
                      >
                        Hotel preference
                      </option>

                      <option
                        value="3 Star"
                        className="bg-[#0B3C49] text-white"
                      >
                        3 Star
                      </option>

                      <option
                        value="4 Star"
                        className="bg-[#0B3C49] text-white"
                      >
                        4 Star
                      </option>

                      <option
                        value="5 Star"
                        className="bg-[#0B3C49] text-white"
                      >
                        5 Star
                      </option>

                      <option
                        value="Luxury"
                        className="bg-[#0B3C49] text-white"
                      >
                        Luxury / Boutique
                      </option>

                      <option
                        value="Heritage"
                        className="bg-[#0B3C49] text-white"
                      >
                        Heritage Hotels
                      </option>

                      <option
                        value="Flexible"
                        className="bg-[#0B3C49] text-white"
                      >
                        Open to suggestions
                      </option>
                    </select>

                    <ChevronDown
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/45
                      "
                    />
                  </div>

                  {/* REFERENCE */}

                  <div className="relative">
                    <select
                      name="reference"
                      value={formData.reference}
                      onChange={handleChange}
                      className="
                        h-[52px]
                        w-full
                        appearance-none
                        rounded-[14px]
                        border
                        border-white/[0.13]
                        bg-white/[0.055]
                        px-4
                        pr-10
                        font-['Inter']
                        text-[11px]
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/25
                        hover:bg-white/[0.075]
                        focus:border-[#F58634]/60
                        focus:bg-white/[0.08]
                        focus:ring-1
                        focus:ring-[#F58634]/15
                      "
                    >
                      <option
                        value=""
                        className="bg-[#0B3C49] text-white"
                      >
                        How did you find us?
                      </option>

                      <option
                        value="Google"
                        className="bg-[#0B3C49] text-white"
                      >
                        Google
                      </option>

                      <option
                        value="Instagram"
                        className="bg-[#0B3C49] text-white"
                      >
                        Instagram
                      </option>

                      <option
                        value="Facebook"
                        className="bg-[#0B3C49] text-white"
                      >
                        Facebook
                      </option>

                      <option
                        value="YouTube"
                        className="bg-[#0B3C49] text-white"
                      >
                        YouTube
                      </option>

                      <option
                        value="Friend or Family"
                        className="bg-[#0B3C49] text-white"
                      >
                        Friend or Family
                      </option>

                      <option
                        value="Travel Agent"
                        className="bg-[#0B3C49] text-white"
                      >
                        Travel Agent
                      </option>

                      <option
                        value="Other"
                        className="bg-[#0B3C49] text-white"
                      >
                        Other
                      </option>
                    </select>

                    <ChevronDown
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/45
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    MESSAGE
                ================================================== */}

                <textarea
                  name="itinerary"
                  value={formData.itinerary}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us what you'd love to experience..."
                  className="
                    mt-3
                    min-h-[80px]
                    w-full
                    resize-none
                    rounded-[14px]
                    border
                    border-white/[0.13]
                    bg-white/[0.055]
                    px-4
                    py-4
                    font-['Inter']
                    text-[11px]
                    font-medium
                    leading-6
                    text-white
                    outline-none
                    placeholder:text-white/40
                    transition-all
                    duration-300
                    hover:border-white/25
                    hover:bg-white/[0.075]
                    focus:border-[#F58634]/60
                    focus:bg-white/[0.08]
                    focus:ring-1
                    focus:ring-[#F58634]/15
                  "
                />

                {/* =================================================
                    SUBMIT BUTTON
                ================================================== */}

                <button
                  type="submit"
                  className="
                    group
                    mt-6
                    flex
                    h-[56px]
                    w-full
                    items-center
                    justify-between
                    rounded-full
                    bg-[#F58634]
                    pl-7
                    pr-2
                    font-['Inter']
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#0B3C49]
                    shadow-[0_15px_35px_rgba(245,134,52,0.16)]
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:shadow-[0_18px_45px_rgba(255,255,255,0.1)]
                  "
                >
                  <span>
                    Request My Quote
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0B3C49]
                      text-white
                      transition-all
                      duration-300
                      group-hover:translate-x-[-2px]
                      group-hover:bg-[#F58634]
                      group-hover:text-[#0B3C49]
                    "
                  >
                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </span>
                </button>

                {/* =================================================
                    MICRO TRUST LINE
                ================================================== */}

                <p
                  className="
                    mt-4
                    text-center
                    font-['Inter']
                    text-[8px]
                    tracking-[0.16em]
                    text-white/30
                  "
                >
                  No obligation · Personalised itinerary · Expert
                  guidance
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}