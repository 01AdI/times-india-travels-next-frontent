"use client";


import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  TrainFront,
  Plane,
  CalendarX2,
  Mail,
  ShieldCheck,
  Info,
} from "lucide-react";


export default function RefundPolicy() {
  const refundEmail ="mailto:tours@timesindiatravels.com?subject=Refund%20Request%20-%20Times%20India%20Travels&body=Hello%20Times%20India%20Travels%20Team,%0A%0AI%20would%20like%20to%20request%20information%20regarding%20a%20refund.%0A%0AName:%20%0ABooking%20Reference:%20%0ATravel%20Date:%20%0AReason%20for%20Cancellation:%20%0A%0APlease%20let%20me%20know%20the%20applicable%20refund%20terms.%0A%0AThank%20you.";

  const policies = [
    {
      number: "01",
      icon: Building2,
      title: "Hotel Bookings",
      description:
        "Refunds for hotel bookings are subject to the cancellation terms and conditions of the respective hotel or accommodation provider.",
    },
    {
      number: "02",
      icon: TrainFront,
      title: "Train Tickets",
      description:
        "Refunds and cancellation charges for train tickets are governed by the applicable railway cancellation and refund policies.",
    },
    {
      number: "03",
      icon: Plane,
      title: "Flight Tickets",
      description:
        "Flight cancellations and refunds are subject to the cancellation, refund, and fare conditions of the respective airline.",
    },
    {
      number: "04",
      icon: CalendarX2,
      title: "Trip Cancellation",
      description:
        "If a trip is cancelled after arrangements have already commenced, the refundable amount may be limited depending on payments made to hotels, transport providers, guides, contractors, and other suppliers.",
    },
  ];

  return (
    <>
    <section className="relative overflow-hidden bg-[#F8FBFB]">

      <div className="relative border-b border-[#124D56]/10">

        {/* Decorative background */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -right-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-[#F58634]/6
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -left-32
              -bottom-25
              h-80
              w-80
              rounded-full
              bg-[#124D56]/5
              blur-3xl
            "
          />
        </div>

        <div
          className="
            relative
            mx-auto
            max-w-350
            px-6
            pb-24
            pt-28
            sm:px-10
            sm:pb-28
            sm:pt-32
            md:px-16
            lg:px-20
            lg:pb-32
          "
        >

          {/* LABEL */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-4"
          >
            <span className="font-['Fraunces'] text-xl italic text-[#F58634]">
              05
            </span>

            <span className="h-px w-10 bg-[#124D56]/20" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-[#124D56]/70
              "
            >
              Travel Information
            </span>
          </motion.div>

          {/* HEADING */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-5xl
              font-['Fraunces']
              text-[clamp(3.2rem,7vw,7rem)]
              font-medium
              leading-[0.92]
              tracking-[-0.055em]
              text-[#0B3C49]
            "
          >
            Refunds,
            <span className="block italic text-[#F58634]">
              explained simply.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              max-w-2xl
              font-['Inter']
              text-sm
              font-light
              leading-7
              tracking-wide
              text-[#536D72]
              sm:text-base
              sm:leading-8
            "
          >
            We understand that travel plans can change. Our refund
            policy explains how cancellations and refunds are handled
            across different travel services and suppliers.
          </motion.p>

        </div>
      </div>

      <div
        className="
          mx-auto
          max-w-350
          px-6
          py-24
          sm:px-10
          sm:py-28
          md:px-16
          lg:px-20
          lg:py-36
        "
      >

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
        >

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#124D56]
                "
              >
                Our Policy
              </span>

            </div>

            <h2
              className="
                mt-6
                max-w-md
                font-['Fraunces']
                text-4xl
                font-medium
                leading-none
                tracking-[-0.035em]
                text-[#0B3C49]
                sm:text-5xl
              "
            >
              Every booking has
              <span className="block italic text-[#F58634]">
                its own terms.
              </span>
            </h2>

          </div>

          <div
            className="
              max-w-2xl
              font-['Inter']
              text-[15px]
              leading-8
              text-[#536D72]
              sm:text-base
            "
          >
            <p>
              Refunds depend on the services included in your
              itinerary and the cancellation conditions imposed by
              the individual suppliers. Hotels, airlines, railways,
              transport providers, and other travel partners may each
              have different cancellation rules.
            </p>

            <p className="mt-5">
              When you cancel a booking, we will help you understand
              the applicable terms and communicate with the relevant
              service providers wherever required.
            </p>
          </div>

        </motion.div>


        <div className="mt-24 sm:mt-28">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex items-center justify-between"
          >

            <div className="flex items-center gap-4">

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

              <span className="h-px w-10 bg-[#124D56]/20" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#124D56]/70
                "
              >
                Service-wise refunds
              </span>

            </div>

          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">

            {policies.map((policy, index) => {
              const Icon = policy.icon;

              return (
                <motion.div
                  key={policy.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#124D56]/10
                    bg-white
                    p-7
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-[0_25px_60px_rgba(11,60,73,0.10)]
                    sm:p-9
                  "
                >

                  {/* NUMBER */}

                  <span
                    className="
                      absolute
                      right-7
                      top-6
                      font-['Fraunces']
                      text-5xl
                      font-medium
                      tracking-tighter
                      text-[#124D56]/5.5
                      transition-colors
                      duration-500
                      group-hover:text-[#F58634]/12
                    "
                  >
                    {policy.number}
                  </span>

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F2FAFB]
                      text-[#124D56]
                      transition-all
                      duration-500
                      group-hover:bg-[#F58634]
                      group-hover:text-white
                    "
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  {/* CONTENT */}

                  <h3
                    className="
                      mt-7
                      font-['Fraunces']
                      text-2xl
                      font-medium
                      tracking-[-0.02em]
                      text-[#0B3C49]
                    "
                  >
                    {policy.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-lg
                      font-['Inter']
                      text-sm
                      leading-7
                      text-[#71878B]
                    "
                  >
                    {policy.description}
                  </p>

                  {/* BOTTOM LINE */}

                  <div
                    className="
                      mt-7
                      h-px
                      w-10
                      bg-[#F58634]/50
                      transition-all
                      duration-500
                      group-hover:w-20
                    "
                  />

                </motion.div>
              );
            })}

          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="
            mt-16
            rounded-3xl
            border
            border-[#F58634]/20
            bg-[#FFF9F4]
            p-7
            sm:p-9
          "
        >

          <div className="flex gap-5">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F58634]/10
                text-[#F58634]
              "
            >
              <Info size={19} strokeWidth={1.6} />
            </div>

            <div>

              <h3
                className="
                  font-['Fraunces']
                  text-xl
                  font-medium
                  text-[#0B3C49]
                "
              >
                A note about cancellations
              </h3>

              <p
                className="
                  mt-3
                  max-w-4xl
                  font-['Inter']
                  text-sm
                  leading-7
                  text-[#536D72]
                "
              >
                If you cancel your trip after arrangements have
                already been made, the refund may be restricted to
                the amount that can be recovered from the respective
                hotels, transport providers, contractors, or other
                suppliers. Amounts already paid for unused hotel
                accommodation, chartered transportation, missed
                meals, or other non-refundable services may not be
                recoverable.
              </p>

            </div>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="
            mt-28
            grid
            gap-12
            lg:grid-cols-[0.7fr_1.3fr]
            lg:gap-24
          "
        >

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#124D56]
                "
              >
                The process
              </span>

            </div>

            <h2
              className="
                mt-6
                font-['Fraunces']
                text-4xl
                font-medium
                leading-none
                tracking-[-0.035em]
                text-[#0B3C49]
                sm:text-5xl
              "
            >
              How a refund
              <span className="block italic text-[#F58634]">
                request works.
              </span>
            </h2>

          </div>

          {/* RIGHT */}

          <div className="space-y-0">

            {[
              {
                number: "01",
                title: "Contact our team",
                text:
                  "Send us your booking details and let us know that you would like to cancel or enquire about a refund.",
              },
              {
                number: "02",
                title: "We review the booking",
                text:
                  "Our team checks the applicable cancellation terms with the relevant hotels, airlines, railways, transport providers, or other suppliers.",
              },
              {
                number: "03",
                title: "Refund eligibility is confirmed",
                text:
                  "We explain what amount, if any, is refundable based on the applicable supplier policies and payments already made.",
              },
              {
                number: "04",
                title: "Refund is processed",
                text:
                  "Once the applicable refund has been confirmed and processed by the relevant provider, we assist with the next steps.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="
                  flex
                  gap-6
                  border-t
                  border-[#124D56]/10
                  py-6
                  sm:gap-8
                "
              >

                <span
                  className="
                    pt-1
                    font-['Fraunces']
                    text-lg
                    italic
                    text-[#F58634]
                  "
                >
                  {step.number}
                </span>

                <div>

                  <h3
                    className="
                      font-['Fraunces']
                      text-xl
                      font-medium
                      text-[#0B3C49]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-xl
                      font-['Inter']
                      text-sm
                      leading-7
                      text-[#71878B]
                    "
                  >
                    {step.text}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            mt-28
            overflow-hidden
            rounded-[30px]
            bg-[#0B3C49]
            px-7
            py-12
            sm:px-12
            sm:py-16
            lg:px-16
            lg:py-20
          "
        >

          {/* DECORATIVE CIRCLE */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
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
              -right-10
              -top-14
              h-52
              w-52
              rounded-full
              border
              border-[#F58634]/20
            "
          />

          <div className="relative z-10 max-w-3xl">

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/60
                "
              >
                Need assistance?
              </span>

            </div>

            <h2
              className="
                mt-6
                font-['Fraunces']
                text-4xl
                font-medium
                leading-none
                tracking-[-0.035em]
                text-white
                sm:text-5xl
              "
            >
              Have a question about
              <span className="block italic text-[#F58634]">
                your refund?
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                font-['Inter']
                text-sm
                leading-7
                text-white/60
                sm:text-base
              "
            >
              Send us your booking details and our team will help
              you understand the cancellation and refund terms
              applicable to your journey.
            </p>

            {/* EMAIL BUTTON */}

            <a
              href={refundEmail}
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-4
                rounded-full
                bg-[#F58634]
                px-6
                py-3.5
                font-['Inter']
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                transition-all
                duration-300
                hover:bg-[#e87524]
                hover:shadow-[0_12px_35px_rgba(245,134,52,0.25)]
              "
            >

              <Mail size={16} strokeWidth={1.7} />

              <span>
                Email Us About a Refund
              </span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />

            </a>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-20
            flex
            items-center
            justify-center
            gap-4
          "
        >

          <span className="h-px w-10 bg-[#F58634]/50" />

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={15}
              strokeWidth={1.5}
              className="text-[#124D56]/60"
            />

            <span
              className="
                font-['Fraunces']
                text-sm
                italic
                text-[#124D56]/65
                sm:text-base
              "
            >
              Clear terms. Thoughtful assistance.
            </span>

          </div>

          <span className="h-px w-10 bg-[#F58634]/50" />

        </motion.div>

      </div>
    </section>
  </>
  );
}