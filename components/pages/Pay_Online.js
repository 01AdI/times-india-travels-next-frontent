"use client";

import { useEffect, useRef, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

import PhoneInput from "react-phone-input-2";

import CountrySelect from "@/utils/CountrySelect";
import { createPayNowEnquiry } from "@/services/PublicApi";

const inputClass =
  "w-full h-[52px] rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
  "block mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#124d56]/65";

const textareaClass =
  "w-full rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10 resize-none disabled:cursor-not-allowed disabled:opacity-60";

const countryWrapperClass =
  "pay-online-country-select pay-online-country-select--light";

const phoneInputClass = `
  !h-[52px]
  !w-full
  !rounded-xl
  !border
  !border-[#124d56]/15
  !bg-white
  !pl-[52px]
  !pr-4
  !text-sm
  !text-[#0B3C49]
  focus:!border-[#F58634]
  focus:!ring-4
  focus:!ring-[#F58634]/10
`;

const phoneButtonClass = `
  !rounded-l-xl
  !border-[#124d56]/15
  !bg-white
  hover:!bg-[#F2FAFB]
`;

const phoneDropdownClass = `
  !bg-[#07111f]
  !text-white
`;

const phoneSearchClass = `
  !bg-[#07111f]
  !text-white
`;

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl bg-[#124d56]/8 text-[#124d56]
          "
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <div>
          <p
            className="
              font-['Inter'] text-[9px] font-semibold uppercase
              tracking-[0.25em] text-[#F58634]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-1 font-['Fraunces'] text-2xl font-medium
              tracking-tight text-[#0B3C49] sm:text-[27px]
            "
          >
            {title}
          </h2>
        </div>
      </div>

      {description && (
        <p
          className="
            mt-3 max-w-2xl pl-0 font-['Inter'] text-xs
            leading-relaxed text-[#124d56]/55 sm:pl-[52px]
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function PayOnline() {
  const initialForm = {
    amount: "",

    paymentFor: "",
    paymentDetails: "",

    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",

    email: "",
    confirmEmail: "",
    telephone: "",

    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
    billingTelephone: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submitMessageRef = useRef(null);

  useEffect(() => {
    if (submitted || submitError) {
      requestAnimationFrame(() => {
        submitMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [submitted, submitError]);

  const clearSubmitError = () => {
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    clearSubmitError();

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCustomerPhoneChange = (telephone) => {
    clearSubmitError();

    setFormData((previous) => ({
      ...previous,
      telephone,
    }));
  };

  const handleBillingPhoneChange = (billingTelephone) => {
    clearSubmitError();

    setFormData((previous) => ({
      ...previous,
      billingTelephone,
    }));
  };

  const handleCustomerCountryChange = (value) => {
    clearSubmitError();

    setFormData((previous) => ({
      ...previous,
      country: value,
    }));
  };

  const handleBillingCountryChange = (value) => {
    clearSubmitError();

    setFormData((previous) => ({
      ...previous,
      billingCountry: value,
    }));
  };

  /*
   * -------------------------------------------------------------
   * GET A VALUE FROM THE ACTUAL HTML FORM
   * -------------------------------------------------------------
   *
   * This is important for browser autofill.
   *
   * Chrome/Safari can sometimes fill an input visually without
   * triggering React's onChange event.
   *
   * Therefore React state may still contain:
   *
   * formData.name === ""
   *
   * while the actual input contains:
   *
   * "Aditya Rathore"
   *
   * FormData reads the actual DOM value.
   */
  const getFormValue = (
    htmlFormData,
    fieldName,
    fallback = ""
  ) => {
    const value = htmlFormData.get(fieldName);

    if (
      value !== null &&
      value !== undefined
    ) {
      return value.toString().trim();
    }

    return fallback?.toString().trim() || "";
  };

  /*
   * -------------------------------------------------------------
   * BUILD ACTUAL FORM DATA
   * -------------------------------------------------------------
   */
  const getActualFormData = (formElement) => {
    const htmlFormData = new FormData(formElement);

    return {
      amount: getFormValue(
        htmlFormData,
        "amount",
        formData.amount
      ),

      paymentFor: getFormValue(
        htmlFormData,
        "paymentFor",
        formData.paymentFor
      ),

      paymentDetails: getFormValue(
        htmlFormData,
        "paymentDetails",
        formData.paymentDetails
      ),

      /*
       * CUSTOMER
       */

      name: getFormValue(
        htmlFormData,
        "name",
        formData.name
      ),

      address: getFormValue(
        htmlFormData,
        "address",
        formData.address
      ),

      city: getFormValue(
        htmlFormData,
        "city",
        formData.city
      ),

      state: getFormValue(
        htmlFormData,
        "state",
        formData.state
      ),

      postalCode: getFormValue(
        htmlFormData,
        "postalCode",
        formData.postalCode
      ),

      /*
       * CountrySelect is a custom React component.
       *
       * React state is therefore used as fallback.
       */
      country:
        getFormValue(
          htmlFormData,
          "country",
          formData.country
        ) || formData.country,

      email: getFormValue(
        htmlFormData,
        "email",
        formData.email
      ),

      confirmEmail: getFormValue(
        htmlFormData,
        "confirmEmail",
        formData.confirmEmail
      ),

      /*
       * PhoneInput is also a custom React component.
       *
       * Use DOM value first, React state as fallback.
       */
      telephone:
        getFormValue(
          htmlFormData,
          "telephone",
          formData.telephone
        ) || formData.telephone,

      /*
       * BILLING
       */

      billingName: getFormValue(
        htmlFormData,
        "billingName",
        formData.billingName
      ),

      billingAddress: getFormValue(
        htmlFormData,
        "billingAddress",
        formData.billingAddress
      ),

      billingCity: getFormValue(
        htmlFormData,
        "billingCity",
        formData.billingCity
      ),

      billingState: getFormValue(
        htmlFormData,
        "billingState",
        formData.billingState
      ),

      billingPostalCode: getFormValue(
        htmlFormData,
        "billingPostalCode",
        formData.billingPostalCode
      ),

      billingCountry:
        getFormValue(
          htmlFormData,
          "billingCountry",
          formData.billingCountry
        ) || formData.billingCountry,

      billingTelephone:
        getFormValue(
          htmlFormData,
          "billingTelephone",
          formData.billingTelephone
        ) || formData.billingTelephone,
    };
  };

  /*
   * -------------------------------------------------------------
   * SAME AS CUSTOMER
   * -------------------------------------------------------------
   *
   * We also read the actual DOM values here so browser autofill
   * works with this checkbox too.
   */
  const handleSameAsCustomerChange = (event) => {
    const checked = event.target.checked;

    setSameAsCustomer(checked);
    clearSubmitError();

    if (checked) {
      const formElement = event.currentTarget.form;

      if (!formElement) {
        return;
      }

      const actualData = getActualFormData(formElement);

      setFormData((previous) => ({
        ...previous,

        billingName: actualData.name,
        billingAddress: actualData.address,
        billingCity: actualData.city,
        billingState: actualData.state,
        billingPostalCode: actualData.postalCode,
        billingCountry:
          actualData.country || previous.country,
        billingTelephone:
          actualData.telephone || previous.telephone,
      }));
    }
  };

  /*
   * -------------------------------------------------------------
   * VALIDATION
   * -------------------------------------------------------------
   */
  const validateForm = (data) => {
    const amount = Number(data.amount);

    if (
      !data.amount ||
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      return "Please enter a valid payment amount.";
    }

    if (!data.paymentFor.trim()) {
      return "Please enter what this payment is for.";
    }

    if (!data.paymentDetails.trim()) {
      return "Please enter the payment details.";
    }

    if (!data.name.trim()) {
      return "Please enter your full name.";
    }

    if (!data.address.trim()) {
      return "Please enter your address.";
    }

    if (!data.city.trim()) {
      return "Please enter your city.";
    }

    if (!data.state.trim()) {
      return "Please enter your state.";
    }

    if (!data.postalCode.trim()) {
      return "Please enter your postal code.";
    }

    if (!data.country) {
      return "Please select your country.";
    }

    if (!data.email.trim()) {
      return "Please enter your email address.";
    }

    if (!data.confirmEmail.trim()) {
      return "Please confirm your email address.";
    }

    if (
      data.email.trim().toLowerCase() !==
      data.confirmEmail.trim().toLowerCase()
    ) {
      return "Email addresses do not match.";
    }

    if (!data.telephone.trim()) {
      return "Please enter your telephone number.";
    }

    if (!data.billingName.trim()) {
      return "Please enter the billing name.";
    }

    if (!data.billingAddress.trim()) {
      return "Please enter the billing address.";
    }

    if (!data.billingCity.trim()) {
      return "Please enter the billing city.";
    }

    if (!data.billingState.trim()) {
      return "Please enter the billing state.";
    }

    if (!data.billingPostalCode.trim()) {
      return "Please enter the billing postal code.";
    }

    if (!data.billingCountry) {
      return "Please select the billing country.";
    }

    if (!data.billingTelephone.trim()) {
      return "Please enter the billing telephone number.";
    }

    return "";
  };

  /*
   * -------------------------------------------------------------
   * SUBMIT
   * -------------------------------------------------------------
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    /*
     * IMPORTANT:
     *
     * Read the actual HTML form.
     *
     * This captures browser autofill values even when React
     * state has not received an onChange event.
     */
    let actualData = getActualFormData(
      event.currentTarget
    );

    /*
     * If "Same as customer" is enabled, billing information
     * should always be copied from the ACTUAL customer values.
     */
    if (sameAsCustomer) {
      actualData = {
        ...actualData,

        billingName: actualData.name,

        billingAddress: actualData.address,

        billingCity: actualData.city,

        billingState: actualData.state,

        billingPostalCode: actualData.postalCode,

        billingCountry: actualData.country,

        billingTelephone: actualData.telephone,
      };
    }

    /*
     * Validate actual browser values.
     */
    const validationError =
      validateForm(actualData);

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    /*
     * -----------------------------------------------------------
     * FLAT PAYLOAD
     * -----------------------------------------------------------
     *
     * Your backend /pay-now/create route expects:
     *
     * req.body.name
     * req.body.email
     * req.body.address
     * etc.
     *
     * NOT:
     *
     * req.body.customer.name
     *
     * Therefore we send everything at the top level.
     */
    const enquiryData = {
      amount: Number(actualData.amount),

      description: [
        `Payment For: ${actualData.paymentFor}`,
        `Payment Details: ${actualData.paymentDetails}`,
      ].join("\n\n"),

      /*
       * CUSTOMER
       */
      name: actualData.name,

      address: actualData.address,

      city: actualData.city,

      state: actualData.state,

      postalCode: actualData.postalCode,

      country: actualData.country,

      email: actualData.email
        .toLowerCase(),

      confirmEmail: actualData.confirmEmail
        .toLowerCase(),

      telephone: actualData.telephone,

      /*
       * BILLING
       */
      billingName: actualData.billingName,

      billingAddress: actualData.billingAddress,

      billingCity: actualData.billingCity,

      billingState: actualData.billingState,

      billingPostalCode:
        actualData.billingPostalCode,

      billingCountry:
        actualData.billingCountry,

      billingTelephone:
        actualData.billingTelephone,
    };

    /*
     * DEBUG
     *
     * Keep these for now.
     *
     * When you submit the form, the console should show:
     *
     * name: "Your Name"
     *
     * instead of:
     *
     * name: ""
     */
    console.log(
      "Pay Now actual form values:",
      actualData
    );

    console.log(
      "Pay Now backend payload:",
      enquiryData
    );

    try {
      setIsSubmitting(true);

      const response =
        await createPayNowEnquiry(
          enquiryData
        );

      if (response?.success) {
        setSubmitted(true);
        setSubmitError("");

        setFormData({
          ...initialForm,
        });

        setSameAsCustomer(false);

        return;
      }

      setSubmitError(
        response?.message ||
          "Unable to submit your payment request. Please try again."
      );
    } catch (error) {
      console.error(
        "Pay Now submission error:",
        error
      );

      setSubmitError(
        error?.message ||
          "Something went wrong while submitting your payment request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#F2FAFB]
        text-[#0B3C49]
      "
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative overflow-hidden
          border-b border-[#124d56]/8
          bg-[#F2FAFB]
        "
      >
        <div
          className="
            pointer-events-none absolute
            -right-32 -top-36 h-96 w-96
            rounded-full bg-[#F58634]/8 blur-3xl
          "
        />

        <div
          className="
            pointer-events-none absolute
            -left-40 bottom-[-180px]
            h-105 w-105 rounded-full
            bg-[#124d56]/6 blur-3xl
          "
        />

        <div
          className="
            pointer-events-none absolute
            right-[15%] top-[20%]
            h-24 w-24 rounded-full
            border border-[#F58634]/15
          "
        />

        <div
          className="
            pointer-events-none absolute
            left-[12%] top-[30%]
            h-12 w-12 rounded-full
            border border-[#124d56]/10
          "
        />

        <div
          className="
            relative mx-auto max-w-7xl
            px-5 pb-14 pt-16
            sm:px-8 sm:pb-16 sm:pt-20
            lg:px-10 lg:pb-20 lg:pt-24
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full border border-[#124d56]/10
                bg-white px-4 py-2
                shadow-[0_8px_30px_rgba(18,77,86,0.04)]
              "
            >
              <LockKeyhole
                size={13}
                strokeWidth={2}
                className="text-[#F58634]"
              />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#124d56]/65
                "
              >
                Secure Payment Request
              </span>
            </div>

            <h1
              className="
                mt-6
                font-['Fraunces']
                text-4xl
                font-medium
                leading-[1.05]
                tracking-tight
                text-[#0B3C49]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Make Your Payment
              <span className="text-[#F58634]">
                {" "}
                Simply.
              </span>
            </h1>

            <p
              className="
                mt-5 max-w-2xl
                font-['Inter']
                text-sm
                leading-7
                text-[#124d56]/60
                sm:text-base
              "
            >
              Submit your payment details below and
              our team will review your request. Once
              confirmed, we will assist you with the
              next step of your payment.
            </p>

            <div
              className="
                mt-7 flex flex-wrap
                gap-x-6 gap-y-3
              "
            >
              <span
                className="
                  flex items-center gap-2
                  font-['Inter']
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  text-[#124d56]/50
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-[#124d56]"
                />

                Secure Request
              </span>

              <span
                className="
                  flex items-center gap-2
                  font-['Inter']
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  text-[#124d56]/50
                "
              >
                <Mail
                  size={16}
                  className="text-[#124d56]"
                />

                Email Confirmation
              </span>

              <span
                className="
                  flex items-center gap-2
                  font-['Inter']
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  text-[#124d56]/50
                "
              >
                <WalletCards
                  size={16}
                  className="text-[#124d56]"
                />

                Tailored Assistance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUCCESS
      ========================================================= */}

      {submitted ? (
        <section
          ref={submitMessageRef}
          className="
            mx-auto max-w-4xl
            px-5 py-16
            sm:px-8 sm:py-20
            lg:px-10 lg:py-24
          "
        >
          <div
            className="
              rounded-[28px]
              border border-[#124d56]/10
              bg-white
              px-6 py-14
              text-center
              shadow-[0_25px_80px_rgba(18,77,86,0.07)]
              sm:px-10 sm:py-20
            "
          >
            <div
              className="
                mx-auto flex h-20 w-20
                items-center justify-center
                rounded-full bg-[#124d56]/8
              "
            >
              <CheckCircle2
                className="
                  h-10 w-10
                  text-[#124d56]
                "
                strokeWidth={1.8}
              />
            </div>

            <span
              className="
                mt-7 block
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#F58634]
              "
            >
              Request Received
            </span>

            <h2
              className="
                mt-3
                font-['Fraunces']
                text-3xl
                font-medium
                tracking-tight
                text-[#0B3C49]
                sm:text-4xl
              "
            >
              Thank you.
            </h2>

            <p
              className="
                mx-auto mt-4 max-w-lg
                font-['Inter']
                text-sm
                leading-7
                text-[#124d56]/60
              "
            >
              Your payment request has been
              successfully submitted to Times India
              Travels. Our team will review the details
              and contact you with the next steps.
            </p>

            <div
              className="
                mx-auto mt-8 flex max-w-md
                items-start gap-3
                rounded-2xl
                border border-[#124d56]/8
                bg-[#F2FAFB]
                px-5 py-4
                text-left
              "
            >
              <ShieldCheck
                size={19}
                className="
                  mt-0.5 shrink-0
                  text-[#124d56]
                "
              />

              <p
                className="
                  font-['Inter']
                  text-xs
                  leading-relaxed
                  text-[#124d56]/60
                "
              >
                Please wait for our team to confirm
                the payment details before making any
                transfer or payment.
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* =========================================================
           FORM
        ========================================================= */

        <section
          className="
            mx-auto max-w-7xl
            px-5 py-10
            sm:px-8 sm:py-14
            lg:px-10 lg:py-16
          "
        >
          <div
            className="
              grid grid-cols-1 gap-7
              lg:grid-cols-[minmax(0,1fr)_320px]
            "
          >
            {/* =====================================================
                MAIN FORM
            ===================================================== */}

            <div>
              {submitError && (
                <div
                  ref={submitMessageRef}
                  className="
                    mb-6 flex items-start gap-3
                    rounded-2xl
                    border border-red-200
                    bg-red-50
                    px-5 py-4
                  "
                >
                  <AlertCircle
                    size={20}
                    className="
                      mt-0.5 shrink-0
                      text-red-500
                    "
                  />

                  <div>
                    <p
                      className="
                        font-['Inter']
                        text-sm
                        font-semibold
                        text-red-700
                      "
                    >
                      Unable to submit request
                    </p>

                    <p
                      className="
                        mt-1
                        font-['Inter']
                        text-xs
                        leading-relaxed
                        text-red-600/75
                      "
                    >
                      {submitError}
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="
                  overflow-hidden
                  rounded-[28px]
                  border border-[#124d56]/10
                  bg-white
                  shadow-[0_20px_70px_rgba(18,77,86,0.06)]
                "
              >
                {/* =================================================
                    PAYMENT REQUEST
                ================================================= */}

                <div
                  className="
                    border-b border-[#124d56]/8
                    p-6
                    sm:p-8
                    lg:p-9
                  "
                >
                  <SectionHeading
                    icon={CreditCard}
                    eyebrow="Payment"
                    title="Payment Request"
                    description="Tell us the amount and what the payment relates to."
                  />

                  <div
                    className="
                      grid grid-cols-1
                      gap-5
                      sm:grid-cols-2
                    "
                  >
                    {/* AMOUNT */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-amount"
                      >
                        Amount
                      </label>

                      <div className="relative">
                        <span
                          className="
                            pointer-events-none
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            font-['Inter']
                            text-sm font-semibold
                            text-[#124d56]/45
                          "
                        >
                          ₹
                        </span>

                        <input
                          id="pay-online-amount"
                          name="amount"
                          type="number"
                          min="1"
                          step="0.01"
                          inputMode="decimal"
                          value={formData.amount}
                          onChange={handleChange}
                          className={`${inputClass} pl-9`}
                          placeholder="Enter amount"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* PAYMENT FOR */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-payment-for"
                      >
                        Payment For
                      </label>

                      <input
                        id="pay-online-payment-for"
                        name="paymentFor"
                        type="text"
                        value={formData.paymentFor}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. Golden Triangle tour"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* PAYMENT DETAILS */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-payment-details"
                      >
                        Payment Details
                      </label>

                      <textarea
                        id="pay-online-payment-details"
                        name="paymentDetails"
                        rows={4}
                        value={formData.paymentDetails}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Briefly describe what this payment is for..."
                        disabled={isSubmitting}
                      />

                      <p
                        className="
                          mt-2
                          font-['Inter']
                          text-[10px]
                          text-[#124d56]/40
                        "
                      >
                        Please provide enough information
                        for our team to identify your payment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CUSTOMER INFORMATION
                ================================================= */}

                <div
                  className="
                    border-b border-[#124d56]/8
                    p-6
                    sm:p-8
                    lg:p-9
                  "
                >
                  <SectionHeading
                    icon={UserRound}
                    eyebrow="Customer"
                    title="Your Information"
                    description="Enter the details we should use to contact you."
                  />

                  <div
                    className="
                      grid grid-cols-1
                      gap-5
                      sm:grid-cols-2
                    "
                  >
                    {/* NAME */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-name"
                      >
                        Full Name
                      </label>

                      <input
                        id="pay-online-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your full name"
                        autoComplete="name"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* EMAIL */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-email"
                      >
                        Email Address
                      </label>

                      <input
                        id="pay-online-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* CONFIRM EMAIL */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-confirm-email"
                      >
                        Confirm Email
                      </label>

                      <input
                        id="pay-online-confirm-email"
                        name="confirmEmail"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Re-enter your email"
                        autoComplete="email"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* PHONE */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-telephone"
                      >
                        Telephone
                      </label>

                      <PhoneInput
                        country="in"
                        value={formData.telephone}
                        onChange={
                          handleCustomerPhoneChange
                        }
                        enableSearch
                        searchPlaceholder="Search country..."
                        disabled={isSubmitting}
                        inputProps={{
                          name: "telephone",
                          id: "pay-online-telephone",
                          required: true,
                          autoComplete: "tel",
                        }}
                        containerClass="!w-full"
                        inputClass={phoneInputClass}
                        buttonClass={phoneButtonClass}
                        dropdownClass={phoneDropdownClass}
                        searchClass={phoneSearchClass}
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* ADDRESS */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-address"
                      >
                        Address
                      </label>

                      <textarea
                        id="pay-online-address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Street address, building, apartment..."
                        autoComplete="street-address"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* CITY */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-city"
                      >
                        City
                      </label>

                      <input
                        id="pay-online-city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="City"
                        autoComplete="address-level2"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* STATE */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-state"
                      >
                        State / Province
                      </label>

                      <input
                        id="pay-online-state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="State / Province"
                        autoComplete="address-level1"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* POSTAL */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-postal-code"
                      >
                        Postal Code
                      </label>

                      <input
                        id="pay-online-postal-code"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Postal / ZIP code"
                        autoComplete="postal-code"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* COUNTRY */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-country"
                      >
                        Country
                      </label>

                      <div
                        className={
                          countryWrapperClass
                        }
                      >
                        <CountrySelect
                          value={formData.country}
                          onChange={
                            handleCustomerCountryChange
                          }
                          name="country"
                          placeholder="Select country"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    BILLING INFORMATION
                ================================================= */}

                <div className="p-6 sm:p-8 lg:p-9">
                  <div
                    className="
                      flex flex-col gap-4
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div className="min-w-0">
                      <SectionHeading
                        icon={MapPin}
                        eyebrow="Billing"
                        title="Billing Information"
                        description="Provide the billing details associated with this payment."
                      />
                    </div>

                    {/* SAME AS CUSTOMER */}

                    <label
                      className="
                        flex shrink-0 cursor-pointer
                        items-center gap-3
                        rounded-xl
                        border border-[#124d56]/10
                        bg-[#F2FAFB]
                        px-4 py-3
                        transition
                        hover:border-[#124d56]/20
                      "
                    >
                      <input
                        type="checkbox"
                        checked={sameAsCustomer}
                        onChange={
                          handleSameAsCustomerChange
                        }
                        disabled={isSubmitting}
                        className="
                          h-4 w-4 cursor-pointer
                          accent-[#F58634]
                        "
                      />

                      <span
                        className="
                          font-['Inter']
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-[#124d56]/65
                        "
                      >
                        Same as customer
                      </span>
                    </label>
                  </div>

                  <div
                    className="
                      grid grid-cols-1
                      gap-5
                      sm:grid-cols-2
                    "
                  >
                    {/* BILLING NAME */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-name"
                      >
                        Billing Name
                      </label>

                      <input
                        id="pay-online-billing-name"
                        name="billingName"
                        type="text"
                        value={formData.billingName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Billing name"
                        autoComplete="section-billing name"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* BILLING PHONE */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-telephone"
                      >
                        Billing Telephone
                      </label>

                      <PhoneInput
                        country="in"
                        value={
                          formData.billingTelephone
                        }
                        onChange={
                          handleBillingPhoneChange
                        }
                        enableSearch
                        searchPlaceholder="Search country..."
                        disabled={isSubmitting}
                        inputProps={{
                          name: "billingTelephone",
                          id: "pay-online-billing-telephone",
                          required: true,
                          autoComplete:
                            "section-billing tel",
                        }}
                        containerClass="!w-full"
                        inputClass={phoneInputClass}
                        buttonClass={phoneButtonClass}
                        dropdownClass={phoneDropdownClass}
                        searchClass={phoneSearchClass}
                        placeholder="Enter billing phone number"
                      />
                    </div>

                    {/* BILLING ADDRESS */}

                    <div className="sm:col-span-2">
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-address"
                      >
                        Billing Address
                      </label>

                      <textarea
                        id="pay-online-billing-address"
                        name="billingAddress"
                        rows={3}
                        value={formData.billingAddress}
                        onChange={handleChange}
                        className={textareaClass}
                        placeholder="Billing street address..."
                        autoComplete="section-billing street-address"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* BILLING CITY */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-city"
                      >
                        Billing City
                      </label>

                      <input
                        id="pay-online-billing-city"
                        name="billingCity"
                        type="text"
                        value={formData.billingCity}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Billing city"
                        autoComplete="section-billing address-level2"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* BILLING STATE */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-state"
                      >
                        Billing State / Province
                      </label>

                      <input
                        id="pay-online-billing-state"
                        name="billingState"
                        type="text"
                        value={formData.billingState}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Billing state / province"
                        autoComplete="section-billing address-level1"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* BILLING POSTAL */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-postal-code"
                      >
                        Billing Postal Code
                      </label>

                      <input
                        id="pay-online-billing-postal-code"
                        name="billingPostalCode"
                        type="text"
                        value={formData.billingPostalCode}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Billing postal / ZIP code"
                        autoComplete="section-billing postal-code"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* BILLING COUNTRY */}

                    <div>
                      <label
                        className={labelClass}
                        htmlFor="pay-online-billing-country"
                      >
                        Billing Country
                      </label>

                      <div
                        className={
                          countryWrapperClass
                        }
                      >
                        <CountrySelect
                          value={
                            formData.billingCountry
                          }
                          onChange={
                            handleBillingCountryChange
                          }
                          name="billingCountry"
                          placeholder="Select billing country"
                        />
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      SUBMIT
                  ================================================= */}

                  <div
                    className="
                      mt-8
                      border-t border-[#124d56]/8
                      pt-7
                    "
                  >
                    <div
                      className="
                        flex flex-col gap-5
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >
                      <div
                        className="
                          flex max-w-xl
                          items-start gap-3
                        "
                      >
                        <ShieldCheck
                          size={19}
                          className="
                            mt-0.5 shrink-0
                            text-[#124d56]/65
                          "
                        />

                        <p
                          className="
                            font-['Inter']
                            text-xs
                            leading-relaxed
                            text-[#124d56]/50
                          "
                        >
                          Your information is used only
                          to process and respond to your
                          payment request. Our team will
                          contact you with the next steps.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          group inline-flex shrink-0
                          cursor-pointer
                          items-center justify-center
                          gap-3
                          rounded-full
                          bg-[#F58634]
                          px-7 py-3.5
                          font-['Inter']
                          text-sm font-semibold
                          text-white
                          shadow-[0_12px_30px_-12px_rgba(245,134,52,0.65)]
                          transition-all duration-300
                          hover:bg-[#D9701F]
                          hover:shadow-[0_16px_35px_-10px_rgba(245,134,52,0.7)]
                          active:scale-[0.98]
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2
                              className="
                                h-4 w-4
                                animate-spin
                              "
                            />

                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Payment Request

                            <span
                              className="
                                flex h-7 w-7
                                items-center justify-center
                                rounded-full
                                bg-white/15
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                              "
                            >
                              <ArrowRight
                                className="h-4 w-4"
                              />
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p
                  className="
                    font-['Inter']
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-[#124d56]/35
                  "
                >
                  Secure request · Personalised assistance ·
                  Times India Travels
                </p>
              </div>
            </div>

            {/* =====================================================
                SIDE INFORMATION
            ===================================================== */}

            <aside
              className="
                h-fit
                lg:sticky
                lg:top-28
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-[28px]
                  bg-[#0B3C49]
                  shadow-[0_25px_70px_rgba(11,60,73,0.16)]
                "
              >
                <div
                  className="
                    relative overflow-hidden
                    px-6 py-7
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute -right-16 -top-20
                      h-48 w-48
                      rounded-full
                      bg-[#F58634]/10
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute -bottom-20 -left-20
                      h-44 w-44
                      rounded-full
                      bg-white/5
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <div
                      className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-xl
                        bg-[#F58634]
                        text-white
                      "
                    >
                      <WalletCards
                        size={20}
                        strokeWidth={1.8}
                      />
                    </div>

                    <h3
                      className="
                        mt-5
                        font-['Fraunces']
                        text-2xl
                        font-medium
                        text-white
                      "
                    >
                      How it works
                    </h3>

                    <p
                      className="
                        mt-2
                        font-['Inter']
                        text-xs
                        leading-relaxed
                        text-white/55
                      "
                    >
                      A simple request process handled
                      directly by our team.
                    </p>

                    <div className="mt-7 space-y-5">
                      {/* STEP 1 */}

                      <div className="flex gap-3">
                        <div
                          className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full bg-white/8
                            font-['Inter']
                            text-[10px]
                            font-bold
                            text-[#F58634]
                          "
                        >
                          01
                        </div>

                        <div>
                          <p
                            className="
                              font-['Inter']
                              text-xs
                              font-semibold
                              text-white/90
                            "
                          >
                            Submit your request
                          </p>

                          <p
                            className="
                              mt-1
                              font-['Inter']
                              text-[11px]
                              leading-relaxed
                              text-white/45
                            "
                          >
                            Tell us the amount and payment
                            details.
                          </p>
                        </div>
                      </div>

                      {/* STEP 2 */}

                      <div className="flex gap-3">
                        <div
                          className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full bg-white/8
                            font-['Inter']
                            text-[10px]
                            font-bold
                            text-[#F58634]
                          "
                        >
                          02
                        </div>

                        <div>
                          <p
                            className="
                              font-['Inter']
                              text-xs
                              font-semibold
                              text-white/90
                            "
                          >
                            Our team reviews it
                          </p>

                          <p
                            className="
                              mt-1
                              font-['Inter']
                              text-[11px]
                              leading-relaxed
                              text-white/45
                            "
                          >
                            We verify the request and
                            contact you.
                          </p>
                        </div>
                      </div>

                      {/* STEP 3 */}

                      <div className="flex gap-3">
                        <div
                          className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-full bg-white/8
                            font-['Inter']
                            text-[10px]
                            font-bold
                            text-[#F58634]
                          "
                        >
                          03
                        </div>

                        <div>
                          <p
                            className="
                              font-['Inter']
                              text-xs
                              font-semibold
                              text-white/90
                            "
                          >
                            Complete the payment
                          </p>

                          <p
                            className="
                              mt-1
                              font-['Inter']
                              text-[11px]
                              leading-relaxed
                              text-white/45
                            "
                          >
                            Follow the payment instructions
                            provided by our team.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    border-t border-white/8
                    px-6 py-5
                  "
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={18}
                      className="
                        mt-0.5 shrink-0
                        text-[#F58634]
                      "
                    />

                    <div>
                      <p
                        className="
                          font-['Inter']
                          text-xs
                          font-semibold
                          text-white/80
                        "
                      >
                        Your details stay protected
                      </p>

                      <p
                        className="
                          mt-1
                          font-['Inter']
                          text-[10px]
                          leading-relaxed
                          text-white/40
                        "
                      >
                        We use the information submitted
                        here only for handling your payment
                        request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}