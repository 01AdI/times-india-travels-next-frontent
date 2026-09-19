"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Contact_Us_LetsConnect() {
  return (
    <section
      id="Contact-info"
      className="relative overflow-hidden bg-[#FAF5EB]"
    >

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
                font-['Playfair_Display',serif]
                text-xl
                italic
                text-[#B85128]
              "
            >
              01
            </span>

            <span className="h-px w-12 bg-[#B85128]/60" />

            <span
              className="
                font-['Playfair',serif]
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#B85128]
              "
            >
              Contact
            </span>
          </div>

          {/* MAIN HEADING */}

          <h2
            className="
              font-['Playfair_Display',serif]
              text-5xl
              font-medium
              leading-[0.98]
              tracking-[-0.045em]
              text-[#173C3A]
              sm:text-6xl
              md:text-7xl
              lg:text-[86px]
            "
          >
            Let&apos;s start a
            <span className="block italic text-[#476763]/70">
              conversation.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-9
              max-w-xl
              font-['Noto_Sans',sans-serif]
              text-sm
              font-light
              leading-7
              tracking-wide
              text-[#476763]
              sm:text-base
              sm:leading-8
            "
          >
            Have a question, an idea, or a journey you&apos;ve been
            dreaming about? Tell us where you&apos;d like to go and
            we&apos;ll help you shape the experience.
          </p>

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
              bg-[#F58634]
              px-7
              py-3.5
              font-['Noto_Sans',sans-serif]
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white
              shadow-[0_12px_30px_rgba(18,77,86,0.12)]
              transition-all
              duration-300
              hover:bg-[#de7429]
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
              mt-5
              font-['Noto_Sans',sans-serif]
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#476763]/70
            "
          >
            Usually responds within 2-3 business day
          </p>
        </motion.div>

        <div className="h-15 sm:h-15 md:h-20" />

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
            max-w-275
            border-y
            border-[#124D56]/10
          "
        >
          <div className="grid md:grid-cols-3">

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
                  font-['Playfair',serif]
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#B85128]
                "
              >
                Visit Us
              </p>

              <p
                className="
                  mt-5
                  font-['Playfair_Display',serif]
                  text-2xl
                  font-medium
                  text-[#173C3A]
                "
              >
                Jaipur
              </p>

              <p
                className="
                  mt-2
                  font-['Playfair',serif]
                  text-xs
                  font-bold
                  leading-6
                  text-[#71878B]
                "
              >
                Rajasthan, India
              </p>
            </div>

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
                  font-['Playfair',serif]
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#B85128]
                "
              >
                Call Us
              </p>

              <a
                href="tel:+919610605261"
                className="
                  mt-5
                  block
                  font-['Playfair_Display',serif]
                  text-2xl
                  font-medium
                  text-[#173C3A]
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
                  font-['Playfair',serif]
                  text-xs
                  font-bold
                  leading-6
                  text-[#71878B]
                "
              >
                Speak with our team
              </p>
            </div>

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
                  font-['Playfair',serif]
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#B85128]
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
                  font-['Playfair_Display',serif]
                  text-xl
                  font-medium
                  text-[#173C3A]
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
                  font-['Playfair',serif]
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
              font-['Playfair',serif]
              text-[15px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#B85128]
            "
          >
            Our Jaipur Office
          </p>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              font-['Noto_Sans',sans-serif]
              text-lg
              font-medium
              leading-6
              text-[#173C3A]
            "
          >
            C2/106, Flat No S2 2nd FL, Sneh Villa,
            Chitrakoot Scheme, Jaipur , 302021, Rajasthan
          </p>
        </motion.div>

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
        </motion.div>
      </div>
    </section>
  );
}