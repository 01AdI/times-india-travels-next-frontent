"use client";

// ============================================================
// CONTACT US — EDITORIAL INTRODUCTION
// ============================================================

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Contact_Us_LetsConnect() {
  return (
    <section
      id="Contact-info"
      className="relative overflow-hidden bg-[#F2FAFB]"
    >
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-350
          px-6
          py-13
          sm:px-10
          sm:py-13
          md:px-16
          md:py-15
          lg:px-20
          lg:py-15
        "
      >
        {/* =================================================
            EDITORIAL INTRO
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* SMALL LABEL */}

          <div className="mb-8 flex items-center justify-center gap-4 sm:mb-10">
            <span
              className="
                font-['Fraunces']
                text-xl
                italic
                text-[#F58634]
              "
            >
              01
            </span>

            <span className="h-px w-12 bg-[#124D56]/20" />

            <span
              className="
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F58634]
              "
            >
              Contact
            </span>
          </div>

          {/* MAIN HEADING */}

          <h2
            className="
              font-['Fraunces']
              text-5xl
              font-medium
              leading-[0.98]
              tracking-[-0.045em]
              text-[#0B3C49]
              sm:text-6xl
              md:text-7xl
              lg:text-[86px]
            "
          >
            Let's start a
            <span className="block italic text-cyan-500">
              conversation.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-9
              max-w-xl
              font-['Inter']
              text-sm
              font-light
              leading-7
              tracking-wide
              text-[#71878B]
              sm:text-base
              sm:leading-8
            "
          >
            Have a question, an idea, or a journey you've been
            dreaming about? Tell us where you'd like to go and
            we'll help you shape the experience.
          </p>

          {/* =================================================
              EMAIL CTA
          ================================================== */}

          <motion.a
            href="mailto:tours@timesindiatravels.com?subject=Travel%20Enquiry%20-%20Times%20India%20Travels&body=Hello%20Times%20India%20Travels%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20planning%20a%20trip%20with%20you.%0A%0ADestination%3A%0ATravel%20Dates%3A%0ANumber%20of%20Travellers%3A%0A%0AThank%20you."
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="
              group
              mx-auto
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#124D56]
              bg-[#124D56]
              px-7
              py-3.5
              font-['Inter']
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white
              shadow-[0_12px_30px_rgba(18,77,86,0.12)]
              transition-all
              duration-300
              hover:bg-[#0B3C49]
              hover:shadow-[0_18px_40px_rgba(18,77,86,0.18)]
              sm:px-8
              sm:py-4
            "
          >
            <Mail
              size={16}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-rotate-6"
            />

            <span>Email Us</span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </motion.a>

          {/* SMALL CTA NOTE */}

          <p
            className="
              mt-4
              font-['Inter']
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#124D56]/45
            "
          >
            Usually responds within 2-3 business day
          </p>
        </motion.div>

        {/* =================================================
            LARGE WHITE SPACE
        ================================================== */}

        <div className="h-15 sm:h-15 md:h-20" />

        {/* =================================================
            CONTACT DETAILS
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            max-w-[1100px]
            border-y
            border-[#124D56]/10
          "
        >
          <div className="grid md:grid-cols-3">

            {/* =================================================
                VISIT US
            ================================================== */}

            <div
              className="
                px-2
                py-10
                text-center
                md:px-10
                md:py-12
              "
            >
              <p
                className="
                  font-['Inter']
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Visit Us
              </p>

              <p
                className="
                  mt-5
                  font-['Fraunces']
                  text-2xl
                  font-medium
                  text-[#0B3C49]
                "
              >
                Jaipur
              </p>

              <p
                className="
                  mt-2
                  font-['Inter']
                  text-xs
                  font-bold
                  leading-6
                  text-[#71878B]
                "
              >
                Rajasthan, India
              </p>
            </div>

            {/* =================================================
                CALL US
            ================================================== */}

            <div
              className="
                border-t
                border-[#124D56]/10
                px-2
                py-10
                text-center
                md:border-l
                md:border-t-0
                md:px-10
                md:py-12
              "
            >
              <p
                className="
                  font-['Inter']
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Call Us
              </p>

              <a
                href="tel:+919610605261"
                className="
                  mt-5
                  block
                  font-['Fraunces']
                  text-2xl
                  font-medium
                  text-[#0B3C49]
                  transition-colors
                  duration-300
                  hover:text-[#F58634]
                "
              >
                +91 96106 05261
              </a>

              <p
                className="
                  mt-2
                  font-['Inter']
                  text-xs
                  font-bold
                  leading-6
                  text-[#71878B]
                "
              >
                Speak with our team
              </p>
            </div>

            {/* =================================================
                EMAIL US
            ================================================== */}

            <div
              className="
                border-t
                border-[#124D56]/10
                px-2
                py-10
                text-center
                md:border-l
                md:border-t-0
                md:px-10
                md:py-12
              "
            >
              <p
                className="
                  font-['Inter']
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Email Us
              </p>

              <a
                href="mailto:tours@timesindiatravels.com?subject=Travel%20Enquiry%20-%20Times%20India%20Travels&body=Hello%20Times%20India%20Travels%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20planning%20a%20trip%20with%20you.%0A%0ADestination%3A%0ATravel%20Dates%3A%0ANumber%20of%20Travellers%3A%0A%0AThank%20you."
                className="
                  mt-5
                  block
                  break-all
                  font-['Fraunces']
                  text-xl
                  font-medium
                  text-[#0B3C49]
                  transition-colors
                  duration-300
                  hover:text-[#F58634]
                "
              >
                tours@timesindiatravels.com
              </a>

              <p
                className="
                  mt-2
                  font-['Inter']
                  text-xs
                  font-bold
                  leading-6
                  text-[#71878B]
                "
              >
                Start a conversation
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            ADDRESS — QUIET SECONDARY DETAIL
        ================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-14 text-center"
        >
          <p
            className="
              font-['Inter']
              text-[15px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#F58634]
            "
          >
            Our Jaipur Office
          </p>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              font-['Inter']
              text-lg
              font-bold
              leading-6
              text-[#124D56]
            "
          >
            C2/106, Flat No S2 2nd FL, Sneh Villa,
            Chitrakoot Scheme, Jaipur , 302021, Rajasthan
          </p>
        </motion.div>

        {/* =================================================
            BOTTOM BRAND LINE
        ================================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="
            mt-15
            flex
            items-center
            justify-center
            gap-4
            sm:mt-20
          "
        >
          <span className="h-px w-10 bg-[#F58634]/50" />

          <span
            className="
              font-['Fraunces']
              text-[15px]
              italic
              text-[#124D56]/70
            "
          >
            India, thoughtfully experienced.
          </span>

          <span className="h-px w-10 bg-[#F58634]/50" />
        </motion.div>
      </div>
    </section>
  );
}