"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

  const disclaimerSections = [
    {
      number: "01",
      title: "Use of Our Website",
      text: `User expressly agree that use of timeindiatravels.com is solely their responsibility. Neither timesindiatravels.com, its affiliates, nor any of their respective employees, agents, third-party content providers, or licensors, warrants that timesindiatravels.com will be uninterrupted or error-free; Nor do they make any warranty as to the results which may be obtained from the use of timeindiatravels.com or the accuracy, reliability or content of any information, services or products provided through timesindiatravels.com.
      `,
    },

    {
      number: "02",
      title: "Website Warranty",
      text: `timesindiatravels.com is provided “as is” without any express or implied warranty, including, but not limited to, the warranty of title or implied warranty of merchantability or fitness for a particular purpose, except as expressly excluded, restricted or modified pursuant to this Agreement laws.
      `,
    },

    {
      number: "03",
      title: "Limitation of Liability",
      text: `This disclaimer of liability applies to any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction or unauthorized access to, alteration of, or use of record, whether for breach of contract, tortuous behavior, negligence, or under any other cause of action. timesindiatravels.com does not warrant that defects would be corrected or make any representations regarding the use or the results of the use of the materials in this site in terms of their correctness, accuracy, reliability, or otherwise. You (and not timesindiatravels.com) assume the complete cost of all necessary servicing, repair or correction. Applicable law may not include implied warranties, so the above exclusion may not apply to you. User specifically acknowledges that timesindiatravels.com is not liable for the defamatory, offensive or illegal conduct of other users or third parties and that the risk of injury from the foregoing rests entirely with user.
      `,
    },

    {
      number: "04",
      title: "Damages & Responsibility",
      text: `In no event will timesindiatravels.com, or any person or entity involved in creating, producing or distributing timesindiatravels.com or the timesindiatravels.com software, be liable for any damages, including, without limitation, direct, indirect, incidental, special, consequential or punitive damages arising out of the use of or inability to us timesindiatravels.com. User hereby acknowledges that the provisions of this section shall apply to all content on timesindiatravels.com.
      `,
    },

    {
      number: "05",
      title: "Information Accuracy",
      text: `In addition to the terms set forth above, neither timesindiatravels.com, nor its affiliates, information providers or content partners shall be liable regardless of the cause or duration, for any errors, inaccuracies, omissions, or other defects in, or untimeliness or unauthenticity of the information contained within timesindiatravels.com, or for any delay or interruption in the transmission thereof to the user, or for any claims or losses arising therefrom or occasioned thereby. None of the foregoing parties shall be liable for any third-party claims or losses of any nature, including, but not limited to, lost profits, punitive or consequential damages. Neither timesindiatravels.com nor its affiliates, information providers or content providers warrant or guarantee the timeliness, sequence, accuracy or completeness of this information. Additionally, there are no warranties as to the results obtained from the use of the information.
      `,
    },
  ];


export default function Disclaimer() {
 
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
    <main className="bg-[#F2FAFB] text-[#0B3C49] relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">

      <section className="relative px-6 pb-16 pt-4 sm:px-8 sm:pt-8 lg:px-12 lg:pb-20">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            {/* SMALL LABEL */}

            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                Important Information
              </span>

              <span className="h-px w-8 bg-[#F58634]" />
            </div>

            {/* INTRO HEADING */}

            <h2
              className="
                font-['Fraunces']
                text-3xl
                font-medium
                leading-tight
                text-[#0B3C49]
                sm:text-4xl
                md:text-5xl
              "
            >
              Transparency is part of
              <span className="text-[#F58634]"> every journey.</span>
            </h2>

            {/* INTRO TEXT */}

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                font-['Inter']
                text-sm
                leading-7
                text-[#49656A]
                sm:text-base
              "
            >
              Please take a moment to review the following
              information regarding the use of our website,
              services, and content.
            </p>
          </motion.div>

        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mx-auto max-w-6xl">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">

            <aside className="hidden lg:block">

              <div className="sticky top-28">

                {/* LABEL */}

                <div className="mb-6 flex items-center gap-3">

                  <FileText
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
                      tracking-[0.25em]
                      text-[#0B3C49]
                    "
                  >
                    On This Page
                  </span>

                </div>

                {/* NAVIGATION */}

                <nav className="border-l border-[#124D56]/15">

                  {disclaimerSections.map((section) => (
                    <a
                      key={section.number}
                      href={`#disclaimer-${section.number}`}
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
                        text-[#668086]
                        transition-all
                        duration-300
                        hover:border-[#F58634]
                        hover:text-[#0B3C49]
                      "
                    >
                      <span
                        className="
                          font-medium
                          tracking-wider
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

                {/* SIDEBAR DIVIDER */}

                <div className="my-8 h-px w-full bg-[#124D56]/10" />

                {/* SIDEBAR NOTE */}

                <div className="rounded-2xl bg-white/70 p-5 shadow-[0_10px_40px_rgba(11,60,73,0.05)]">

                  <ShieldCheck
                    size={21}
                    strokeWidth={1.5}
                    className="mb-4 text-[#F58634]"
                  />

                  <p
                    className="
                      font-['Fraunces']
                      text-lg
                      leading-snug
                      text-[#0B3C49]
                    "
                  >
                    Your journey begins
                    with transparency.
                  </p>

                  <p
                    className="
                      mt-3
                      font-['Inter']
                      text-xs
                      leading-5
                      text-[#6B8185]
                    "
                  >
                    We aim to provide clear and
                    reliable information throughout
                    your travel experience.
                  </p>

                </div>

              </div>

            </aside>

            <div className="min-w-0">

              {/* DOCUMENT HEADER */}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="
                  mb-8
                  rounded-3xl
                  border
                  border-[#124D56]/10
                  bg-white
                  p-7
                  shadow-[0_20px_60px_rgba(11,60,73,0.06)]
                  sm:p-9
                  md:p-10
                "
              >

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p
                      className="
                        mb-2
                        font-['Inter']
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.28em]
                        text-[#F58634]
                      "
                    >
                      Official Website Policy
                    </p>

                    <h3
                      className="
                        font-['Fraunces']
                        text-2xl
                        font-medium
                        text-[#0B3C49]
                        sm:text-3xl
                      "
                    >
                      Disclaimer
                    </h3>

                  </div>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F2FAFB]
                    "
                  >
                    <FileText
                      size={21}
                      strokeWidth={1.4}
                      className="text-[#124D56]"
                    />
                  </div>

                </div>

                <div className="mt-7 h-px w-full bg-[#124D56]/10" />

                <p
                  className="
                    mt-6
                    max-w-2xl
                    font-['Inter']
                    text-sm
                    leading-7
                    text-[#61777B]
                    sm:text-[15px]
                  "
                >
                  The information below outlines the terms,
                  limitations, and responsibilities associated
                  with using the Times India Travels website.
                </p>

              </motion.div>

              <div className="space-y-6">

                {disclaimerSections.map((section, index) => (
                  <motion.article
                    key={section.number}
                    id={`disclaimer-${section.number}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    variants={fadeUp}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="
                      scroll-mt-28
                      rounded-3xl
                      border
                      border-[#124D56]/10
                      bg-white
                      p-7
                      shadow-[0_15px_50px_rgba(11,60,73,0.045)]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-[0_20px_60px_rgba(11,60,73,0.08)]
                      sm:p-9
                      md:p-10
                    "
                  >

                    {/* SECTION TOP */}

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
                          border-[#F58634]/30
                          bg-[#F58634]/5
                          font-['Fraunces']
                          text-lg
                          font-medium
                          text-[#F58634]
                          sm:h-14
                          sm:w-14
                          sm:text-xl
                        "
                      >
                        {section.number}
                      </div>

                      {/* TITLE */}

                      <div className="min-w-0 pt-1">

                        <p
                          className="
                            mb-1
                            font-['Inter']
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-[#F58634]
                          "
                        >
                          Disclaimer
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

                    <div className="my-7 h-px w-full bg-[#124D56]/10" />

                    {/* LEGAL TEXT */}

                    <div
                      className="
                        font-['Inter']
                        text-sm
                        leading-7
                        text-[#536D72]
                        sm:text-[15px]
                        sm:leading-8
                      "
                    >
                      {section.text
                        .trim()
                        .split("\n")
                        .filter(Boolean)
                        .map((paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className={
                              paragraphIndex > 0
                                ? "mt-5"
                                : ""
                            }
                          >
                            {paragraph.trim()}
                          </p>
                        ))}
                    </div>

                    {/* SECTION FOOTER */}

                    <div className="mt-8 flex items-center gap-3">

                      <span className="h-px w-8 bg-[#F58634]" />

                      <span
                        className="
                          font-['Inter']
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.25em]
                          text-[#8A9B9E]
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

      <section className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="
              relative
              overflow-hidden
              rounded-[30px]
              bg-[#0B3C49]
              px-7
              py-14
              text-center
              sm:px-12
              sm:py-16
              md:py-20
            "
          >

            {/* DECORATIVE CIRCLE */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
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

            {/* CTA CONTENT */}

            <div className="relative z-10 mx-auto max-w-2xl">

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
                Need More Information?
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
                We're here to help
                <span className="text-[#F58634]">.</span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-5
                  max-w-xl
                  font-['Inter']
                  text-sm
                  leading-7
                  text-white/70
                  sm:text-base
                "
              >
                If you have any questions about our policies,
                services, or the information provided on our
                website, our team would be happy to assist you.
              </p>

              {/* CTA BUTTON */}

              <a
                href="/contact-us"
                className="
                  group
                  mx-auto
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
                  hover:shadow-[0_12px_30px_rgba(245,134,52,0.25)]
                "
              >
                Contact Us

                <ArrowRight
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

      <div className="px-6 pb-10 sm:px-8 lg:px-12">

        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4">

          <span className="h-px flex-1 bg-[#124D56]/10" />

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-[#F58634]/30
              text-[#F58634]
            "
          >
            <ChevronRight
              size={13}
              strokeWidth={1.5}
            />
          </span>

          <span className="h-px flex-1 bg-[#124D56]/10" />

        </div>

      </div>

    </main>
  </>
  );
}