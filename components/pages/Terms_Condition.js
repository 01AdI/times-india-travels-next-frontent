import {
  ArrowRight,
  Building2,
  CalendarClock,
  CreditCard,
  FileText,
  Landmark,
  Mail,
  Scale,
  ShieldCheck,
  WalletCards,
  ChevronRight,
} from "lucide-react";

export default function TermsCondition() {
  const cancellationRules = [
    {
      days: "60 DAYS",
      title: "Before arrival",
      description: "20% of the Tour/service cost",
    },
    {
      days: "45 DAYS",
      title: "Before arrival",
      description: "50% of the Tour/service cost",
    },
    {
      days: "30 DAYS",
      title: "Before arrival",
      description: "100% of the Tour/service cost",
    },
  ];

  const refundPolicies = [
    "Refund for hotel payment will follow the hotel's cancellation policy.",
    "Train tickets cancellations will follow the Railway's policy.",
    "Flight tickets cancellations will follow the airline's company policy.",
    "If you cancel the trip after it starts, the refund will be restricted to a limited amount only, which will also depend on the amount we charge the hoteliers / contractors. For unused hotel accommodation, chartered transportation and missed meals, etc., we do not take refund responsibility.",
  ];

  return (
    <>
     <main className="min-h-screen bg-[#F2FAFB] text-[#0B3C49]">

      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">
        {/* Decorative circles */}

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
          {/* Top label */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              font-['Inter']
            "
          >
            <span className="h-px w-10 bg-[#F58634]" />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#F58634]
              "
            >
              Travel With Confidence
            </span>

            <span className="h-px w-10 bg-[#F58634]" />
          </div>

          {/* Heading */}

          <h1
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
            Terms &
            <span className="block italic text-[#F58634]">Conditions.</span>
          </h1>

          {/* Intro */}

          <p
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
            Clear policies, transparent communication and carefully considered
            terms to make every journey with Times India Travels comfortable and
            dependable.
          </p>

          {/* Policy label */}

          <div className="mt-8 flex items-center justify-center gap-3">
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
              Official Travel Terms
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="space-y-7">

          <PolicyCard
            icon={<CreditCard size={25} />}
            eyebrow="01"
            title="Payment Terms"
          >
            <p>
              For all services contracted, some advance payment must be made
              based on the confirmation of the booking and the balance can be
              paid before departure from your country or upon arrival in INDIA
              but certainly before the commencement of services.
            </p>

            <p>
              Management personnel have the right to decide on the amount to be
              paid as an advance payment based on the nature of service and the
              time of commencement of service.
            </p>

            {/* IMPORTANT PAYMENT NOTICE */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-[#F58634]/30
                bg-[#FFF8F1]
                p-5
              "
            >
              <div className="flex gap-4">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-[#F58634]"
                  size={22}
                  strokeWidth={1.7}
                />

                <p className="font-medium leading-7 text-[#74512E]">
                  Apart from above in some cases like Special Train Journeys,
                  hotels or resorts bookings during the peak season (X-Mas, New
                  Year), full payment is required to be sent in advance.
                </p>
              </div>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<Landmark size={25} />}
            eyebrow="02"
            title="Wire or Swift Bank Transfer"
          >
            <p>
              Wire or Swift Bank Transfer can be made by your Bank to our Bank.
              Please ask your bank to transfer the amount to:
            </p>

            <div className="mt-7 overflow-hidden rounded-2xl border border-[#124D56]/10 bg-[#FBFAF7]">
              <BankRow
                icon={<Building2 size={19} />}
                label="Beneficiary Account Name"
                value="Times India Travels"
              />

              <BankRow
                icon={<WalletCards size={19} />}
                label="Beneficiary Account Number"
                value="912020010981906"
              />

              <BankRow
                icon={<Landmark size={19} />}
                label="Bank Name & Branch"
                value="AXIS Bank LTD, G-4 Saurav Tower, Amrapali Circle Vaishali Nagar, Jaipur - Rajasthan, PIN-302021 INDIA"
              />

              <BankRow
                icon={<ShieldCheck size={19} />}
                label="SWIFT CODE"
                value="AXISINBB010"
                last
              />
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm leading-7 text-[#476366]">
                  Please let us know the purpose of
                  remittance..............................................
                </p>

                <p className="mt-2 text-sm leading-7 text-[#476366]">
                  For
                  Mr/Ms.........................................................
                  (Name of Passenger)
                </p>
              </div>

              <div className="rounded-2xl bg-[#EEF5F3] p-5">
                <div className="flex gap-3">
                  <Mail size={19} className="mt-1 shrink-0 text-[#F58634]" />

                  <p className="text-sm leading-7 text-[#35565A]">
                    The transfer details should be sent by Email. On
                    confirmation from our Bank, we shall provide you the ordered
                    goods/services instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border-l-4 border-[#F58634] bg-[#FFF8F1] px-5 py-4">
              <p className="text-sm leading-7 text-[#74512E]">
                <strong>Please note —</strong> All respective transfer charges
                will be paid by the guest, our quote amount is the net payable
                basis and transfer fees/charges are excluding.
              </p>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<CalendarClock size={25} />}
            eyebrow="03"
            title="Cancellation Policy"
          >
            <p>
              In the event of cancellation of tour / travel services due to any
              avoidable / unavoidable reason, we should be informed in writing.
              Cancellation fees will be effective from the date we receive
              advice in writing, and cancellation fees will be as follows:
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {cancellationRules.map((rule) => (
                <div
                  key={rule.days}
                  className="
                    group
                    rounded-2xl
                    border
                    border-[#124D56]/10
                    bg-white
                    p-6
                    shadow-[0_8px_30px_rgba(18,59,63,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#F58634]/50
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0B3C49]
                      text-[#F58634]
                    "
                  >
                    <CalendarClock size={20} />
                  </div>

                  <p className="text-2xl font-semibold tracking-wide text-[#0B3C49]">
                    {rule.days}
                  </p>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F58634]">
                    {rule.title}
                  </p>

                  <div className="my-4 h-px bg-[#124D56]/10" />

                  <p className="text-sm leading-6 text-[#506A6D]">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#124D56]/10 bg-[#FBFAF7] p-6">
              <div className="flex gap-4">
                <FileText className="mt-1 shrink-0 text-[#F58634]" size={22} />

                <p className="text-sm leading-7 text-[#476366]">
                  In case of Special Trains Journeys and peak season hotel
                  bookings a separate cancellation policy is applicable (which
                  can be advised as and when required).
                </p>
              </div>
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<ShieldCheck size={25} />}
            eyebrow="04"
            title="Cancellation & Refund Policies"
          >
            <p className="mb-7 text-sm uppercase tracking-[0.15em] text-[#F58634]">
              Some cancellation and refund policies are out of our tender
            </p>

            <div className="space-y-4">
              {refundPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="
                    flex
                    gap-4
                    rounded-xl
                    border
                    border-[#124D56]/8
                    bg-white
                    p-4
                  "
                >
                  <span
                    className="
                      mt-1
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#EEF5F3]
                      text-[#F58634]
                    "
                  >
                    <ShieldCheck size={14} />
                  </span>

                  <p className="text-sm leading-7 text-[#476366]">{policy}</p>
                </div>
              ))}
            </div>
          </PolicyCard>

          <PolicyCard
            icon={<Scale size={25} />}
            eyebrow="05"
            title="Our Liabilities & Limitations"
          >
            <div className="space-y-6">
              <p>
                Please note that after the finalization of the cost of the tour
                / service, if any entry fees of monuments / museums, taxes, fuel
                cost or guide fees are increased by the Government of India, an
                additional fee will be charged.
              </p>

              <p>
                We are not responsible for any delays, cancellations and changes
                in programs or expenses incurred directly or indirectly due to
                natural hazards, flight / train cancellations, accidents,
                breakdown of machinery or equipment, transportation, weather,
                disease, landslides, political Will be Closed or any untoward
                incident.
              </p>
            </div>
          </PolicyCard>
        </div>

        <section
          className="
            relative
            mt-12
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
          {/* Decorative circles */}

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
            {/* Icon */}

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
              <Mail size={20} strokeWidth={1.4} className="text-[#F58634]" />
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
              Need Clarification?
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
              <span className="text-[#F58634]"> help.</span>
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
              If you have any questions about our payment, cancellation or
              travel terms, our team is happy to clarify anything before you
              travel.
            </p>

            {/* Divider */}

            <div className="mx-auto mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-[#F58634]/50" />

              <span className="h-1.5 w-1.5 rotate-45 bg-[#F58634]" />

              <span className="h-px w-10 bg-[#F58634]/50" />
            </div>

            {/* Contact button */}

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
                hover:bg-[#E87827]
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
        </section>
      </section>
    </main>
  </>
  );
}

function PolicyCard({ icon, eyebrow, title, children }) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[#124D56]/10
        bg-white
        p-6
        shadow-[0_12px_40px_rgba(18,59,63,0.045)]
        transition-all
        duration-300
        hover:shadow-[0_18px_55px_rgba(18,59,63,0.08)]
        sm:p-8
        lg:p-10
      "
    >
      {/* Decorative corner */}

      <div
        className="
          absolute
          right-0
          top-0
          h-28
          w-28
          translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#F58634]/20
        "
      />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:gap-10">
        {/* Icon */}

        <div className="shrink-0">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#0B3C49]
              text-[#F58634]
              shadow-[0_8px_25px_rgba(11,60,73,0.15)]
            "
          >
            {icon}
          </div>
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#F58634]">
              {eyebrow}
            </span>

            <span className="h-px w-8 bg-[#F58634]" />
          </div>

          <h2
            className="
              font-['Fraunces']
              text-2xl
              font-semibold
              tracking-wide
              text-[#0B3C49]
              sm:text-3xl
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-6
              space-y-5
              font-['Inter']
              text-[15px]
              leading-8
              text-[#4C6669]
            "
          >
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

function BankRow({ icon, label, value, last = false }) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-2
        px-5
        py-4
        sm:flex-row
        sm:items-start
        sm:gap-5
        ${!last ? "border-b border-[#124D56]/8" : ""}
      `}
    >
      <div className="flex items-center gap-3 sm:w-60 sm:shrink-0">
        <span className="text-[#F58634]">{icon}</span>

        <span className="text-sm font-semibold text-[#0B3C49]">{label}</span>
      </div>

      <span className="text-sm leading-6 text-[#506A6D]">{value}</span>
    </div>
  );
}
