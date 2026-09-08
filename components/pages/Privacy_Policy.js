"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  LockKeyhole,
  Cookie,
  UserRound,
  ChevronRight,
  Mail,
} from "lucide-react";

const privacySections = [
  {
    number: "01",
    title: "Website Privacy",
    eyebrow: "Privacy",
    paragraphs: [
      "This privacy policy sets out how Times India Travels uses and protects any information that you give Times India Travels when you use this website.",
      "Times India Travels is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used by this privacy statement.",
      "Times India Travels may change this policy from time to time by updating this page. So for this you have to check this page from time to time.",
    ],
  },

  {
    number: "02",
    title: "What We Collect",
    eyebrow: "Information",
    intro: "We may collect the following information:",
    bullets: [
      "Name and Job title",
      "Contact information (Phone Number, email address)",
      "Demographic information (postcode, preferences, and interests)",
      "Other information relevant to customer surveys and/or offers",
    ],
  },

  {
    number: "03",
    title: "What We Do With The Information We Gather",
    eyebrow: "How We Use It",
    intro:
      "We need this information to understand your needs and to provide you with a better service, and in particular for the following reasons:",
    bullets: [
      "Internal record keeping.",
      "To improve our products and services.",
      "We may periodically send promotional emails to the email address you provided. The emails will be about new products, special offers or other information which we think you may find interesting.",
      "We might use your information from time-to-time to contact you by email, phone, fax or mail for market research purposes.",
    ],
  },

  {
    number: "04",
    title: "Security",
    eyebrow: "Protection",
    paragraphs: [
      "We are committed to keeping your information secure. To prevent unauthorized access or disclosure, we have in place appropriate physical, electronic and management procedures to protect and safeguard the information we collect online.",
    ],
  },

  {
    number: "05",
    title: "How We Use Cookies",
    eyebrow: "Cookies",
    paragraphs: [
      "A cookie is a small file that requests permission to be placed on your computer's hard drive. If you agree, the file is attached and the cookie will help you analyze your web traffic or let you know when you visit a particular site. Cookies allow web applications to respond individually to you. The web application can tailor its actions to your needs, likes, and dislikes, by collecting and memorizing information about your preferences.",
      "We use traffic log cookies to identify the pages you use. This helps us analyze website traffic data and refine our website to meet customer needs. We use this information only for statistical analysis and then the data is removed from the system.",
      "In general, cookies help us to provide you with a better website by allowing us to track which pages are useful to you and which are not. Under no circumstances will cookies give us access to your computer or any information about you, except to the extent that you choose to share it with us.",
      "You can accept or decline cookies. Most web browsers automatically accept cookies, but you can usually change your browser settings to decline cookies if you like. This can prevent you from taking full advantage of the website.",
    ],
  },

  {
    number: "06",
    title: "How Can You Keep Control Of Your Personal Information?",
    eyebrow: "Your Control",
    intro:
      "You may restrict the collection or use of your personal information in the following ways:",
    bullets: [
      "Whenever you are asked to fill out a form on a website, look for the field you can use to indicate that you do not want anyone to use this information for direct marketing purposes.",
      "If you have previously agreed to use your personal information for direct marketing purposes, you may change your mind at any time by writing to us or by sending an email to tours@timesindiatravels.com.",
    ],
    paragraphs: [
      "We will not sell, distribute or rent your personal information to third parties unless we have your permission or are required by law. We may use your personal information to provide you with advertising information about third parties that you may find interesting if you tell us that you would like this to happen.",
      "If you think any of the information we hold about you is incorrect or incomplete, please email us as soon as possible. We will correct any information that is found to be inaccurate immediately.",
    ],
  },
];


const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <>
    <main className="bg-[#F2FAFB]">


      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">

        {/* DECORATIVE BACKGROUND */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-0
            h-105
            w-105
            rounded-full
            border
            border-[#124D56]/5
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            bottom-0
            h-90
            w-90
            rounded-full
            border
            border-[#F58634]/5
          "
        />

        <div className="relative z-10 mx-auto max-w-6xl">

          {/* TOP LABEL */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-[#F58634]" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F58634]
              "
            >
              Your Privacy Matters
            </span>

            <span className="h-px w-10 bg-[#F58634]" />
          </motion.div>

          {/* HEADING */}

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              mx-auto
              mt-7
              max-w-4xl
              text-center
              font-['Fraunces']
              text-5xl
              font-medium
              leading-[0.98]
              tracking-[-0.04em]
              text-[#0B3C49]
              sm:text-6xl
              md:text-7xl
              lg:text-[82px]
            "
          >
            Your privacy,
            <span className="block italic text-[#F58634]">
              thoughtfully protected.
            </span>
          </motion.h1>

          {/* INTRO */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-center
              font-['Inter']
              text-sm
              font-light
              leading-7
              tracking-wide
              text-[#61777B]
              sm:text-base
              sm:leading-8
            "
          >
            We believe that transparency should be part of every
            traveller's experience. This policy explains how
            Times India Travels collects, uses and protects
            information provided through our website.
          </motion.p>

          {/* LAST UPDATED STYLE */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <ShieldCheck
              size={15}
              strokeWidth={1.5}
              className="text-[#F58634]"
            />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#124D56]/60
              "
            >
              Privacy & Data Protection
            </span>
          </motion.div>

        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <div className="mx-auto max-w-6xl">

          <div
            className="
              grid
              grid-cols-1
              gap-12
              lg:grid-cols-[220px_minmax(0,1fr)]
              lg:gap-16
            "
          >

            <aside className="hidden lg:block">

              <div className="sticky top-28">

                {/* LABEL */}

                <div className="mb-6 flex items-center gap-3">

                  <LockKeyhole
                    size={17}
                    strokeWidth={1.5}
                    className="text-[#F58634]"
                  />

                  <span
                    className="
                      font-['Inter']
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.28em]
                      text-[#0B3C49]
                    "
                  >
                    On This Page
                  </span>

                </div>


                {/* NAV */}

                <nav className="border-l border-[#124D56]/10">

                  {privacySections.map((section) => (
                    <a
                      key={section.number}
                      href={`#privacy-${section.number}`}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        border-l-2
                        border-transparent
                        py-3
                        pl-5
                        font-['Inter']
                        text-xs
                        text-[#71878B]
                        transition-all
                        duration-300
                        hover:border-[#F58634]
                        hover:text-[#0B3C49]
                      "
                    >

                      <span
                        className="
                          font-['Fraunces']
                          text-sm
                          text-[#F58634]
                          opacity-70
                          transition-opacity
                          group-hover:opacity-100
                        "
                      >
                        {section.number}
                      </span>

                      <span>
                        {section.title}
                      </span>

                    </a>
                  ))}

                </nav>


                {/* SIDEBAR NOTE */}

                <div className="mt-10 border-t border-[#124D56]/10 pt-7">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={19}
                      strokeWidth={1.4}
                      className="mt-0.5 shrink-0 text-[#F58634]"
                    />

                    <p
                      className="
                        font-['Fraunces']
                        text-base
                        leading-snug
                        text-[#0B3C49]
                      "
                    >
                      Your information deserves
                      to be handled with care.
                    </p>

                  </div>

                </div>

              </div>

            </aside>

            <div className="min-w-0">

              {/* DOCUMENT HEADER */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={fadeUp}
                className="
                  mb-8
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#124D56]/10
                  bg-white
                  shadow-[0_20px_60px_rgba(11,60,73,0.055)]
                "
              >

                <div className="grid md:grid-cols-[1fr_auto]">

                  <div className="p-7 sm:p-9 md:p-10">

                    <p
                      className="
                        font-['Inter']
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-[#F58634]
                      "
                    >
                      Official Website Policy
                    </p>

                    <h2
                      className="
                        mt-3
                        font-['Fraunces']
                        text-3xl
                        font-medium
                        text-[#0B3C49]
                        sm:text-4xl
                      "
                    >
                      Privacy Policy
                    </h2>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        font-['Inter']
                        text-sm
                        leading-7
                        text-[#71878B]
                      "
                    >
                      The following information explains how
                      Times India Travels handles information
                      shared through this website.
                    </p>

                  </div>

                  {/* ICON BLOCK */}

                  <div
                    className="
                      flex
                      min-h-37.5
                      items-center
                      justify-center
                      bg-[#0B3C49]
                      px-10
                    "
                  >

                    <LockKeyhole
                      size={42}
                      strokeWidth={1}
                      className="text-[#F58634]"
                    />

                  </div>

                </div>

              </motion.div>

              <div className="space-y-7">

                {privacySections.map((section, index) => (
                  <motion.article
                    key={section.number}
                    id={`privacy-${section.number}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    variants={fadeUp}
                    className="
                      scroll-mt-28
                      rounded-[26px]
                      border
                      border-[#124D56]/10
                      bg-white
                      p-7
                      shadow-[0_15px_50px_rgba(11,60,73,0.035)]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-[0_22px_60px_rgba(11,60,73,0.07)]
                      sm:p-9
                      md:p-10
                    "
                  >

                    {/* SECTION HEADER */}

                    <div className="flex items-start gap-5">

                      {/* NUMBER */}

                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#F58634]/25
                          bg-[#F58634]/5
                          font-['Fraunces']
                          text-lg
                          text-[#F58634]
                          sm:h-14
                          sm:w-14
                          sm:text-xl
                        "
                      >
                        {section.number}
                      </div>


                      {/* TITLE */}

                      <div className="min-w-0">

                        <p
                          className="
                            mb-1.5
                            font-['Inter']
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-[#F58634]
                          "
                        >
                          {section.eyebrow}
                        </p>

                        <h3
                          className="
                            font-['Fraunces']
                            text-2xl
                            font-medium
                            leading-tight
                            text-[#0B3C49]
                            sm:text-3xl
                          "
                        >
                          {section.title}
                        </h3>

                      </div>

                    </div>


                    {/* DIVIDER */}

                    <div className="my-7 h-px bg-[#124D56]/10" />


                    {/* INTRO */}

                    {section.intro && (
                      <p
                        className="
                          mb-6
                          font-['Inter']
                          text-sm
                          leading-7
                          text-[#536D72]
                          sm:text-[15px]
                          sm:leading-8
                        "
                      >
                        {section.intro}
                      </p>
                    )}


                    {/* PARAGRAPHS */}

                    {section.paragraphs?.map(
                      (paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className={`
                            font-['Inter']
                            text-sm
                            leading-7
                            text-[#536D72]
                            sm:text-[15px]
                            sm:leading-8
                            ${
                              paragraphIndex > 0
                                ? "mt-6"
                                : ""
                            }
                          `}
                        >
                          {paragraph}
                        </p>
                      )
                    )}


                    {/* BULLETS */}

                    {section.bullets && (
                      <div className="mt-6">

                        <ul className="space-y-3">

                          {section.bullets.map(
                            (bullet, bulletIndex) => (
                              <li
                                key={bulletIndex}
                                className="
                                  flex
                                  items-start
                                  gap-3
                                  font-['Inter']
                                  text-sm
                                  leading-7
                                  text-[#536D72]
                                  sm:text-[15px]
                                "
                              >

                                <span
                                  className="
                                    mt-2.75
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-[#F58634]
                                  "
                                />

                                <span>
                                  {bullet}
                                </span>

                              </li>
                            )
                          )}

                        </ul>

                      </div>
                    )}


                    {/* FOOTER LINE */}

                    <div className="mt-8 flex items-center gap-3">

                      <span className="h-px w-8 bg-[#F58634]" />

                      <span
                        className="
                          font-['Inter']
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.25em]
                          text-[#9AA9AC]
                        "
                      >
                        Times India Travels
                      </span>

                    </div>

                  </motion.article>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={fadeUp}
            className="
              relative
              overflow-hidden
              rounded-4xl
              bg-[#0B3C49]
              px-7
              py-14
              text-center
              sm:px-12
              sm:py-16
              md:py-20
            "
          >

            {/* DECORATIVE CIRCLES */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-28
                h-72
                w-72
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                -left-20
                h-72
                w-72
                rounded-full
                border
                border-[#F58634]/20
              "
            />


            <div className="relative z-10 mx-auto max-w-2xl">

              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#F58634]/30
                  bg-[#F58634]/10
                "
              >
                <Mail
                  size={20}
                  strokeWidth={1.4}
                  className="text-[#F58634]"
                />
              </div>


              <p
                className="
                  mb-4
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Questions About Your Privacy?
              </p>


              <h2
                className="
                  font-['Fraunces']
                  text-3xl
                  font-medium
                  leading-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                We're happy to
                <span className="text-[#F58634]">
                  {" "}help.
                </span>
              </h2>


              <p
                className="
                  mx-auto
                  mt-5
                  max-w-xl
                  font-['Inter']
                  text-sm
                  leading-7
                  text-white/65
                  sm:text-base
                "
              >
                If you have questions about how your information
                is collected, used or protected, please get in
                touch with our team.
              </p>


              <a
                href="mailto:tours@timesindiatravels.com"
                className="
                  group
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#F58634]
                  px-7
                  py-3.5
                  font-['Inter']
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#e87827]
                  hover:shadow-[0_15px_35px_rgba(245,134,52,0.25)]
                "
              >
                Contact Our Team

                <ChevronRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>

            </div>

          </motion.div>

        </div>

      </section>

      <div className="px-6 pb-12 sm:px-8 lg:px-12">

        <div
          className="
            mx-auto
            flex
            max-w-6xl
            items-center
            justify-center
            gap-4
          "
        >

          <span className="h-px flex-1 bg-[#124D56]/10" />

          <span
            className="
              font-['Fraunces']
              text-sm
              italic
              text-[#124D56]/50
            "
          >
            India, thoughtfully experienced.
          </span>

          <span className="h-px flex-1 bg-[#124D56]/10" />

        </div>

      </div>

    </main>
  </>
  );
}