"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CalendarDays,
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";

import PhoneInput from "react-phone-input-2";

import DatePicker from "react-datepicker";

import CountrySelect from "../utils/CountrySelect";

import {fetchTourPackagesDropDown,} from "../features/Tour-packages/tour_Package_Dropdown_Slice";

import { createTourEnquiry } from "../services/PublicApi";


const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_YEAR = new Date().getFullYear();

const YEAR_OPTIONS = Array.from(
  { length: 15 },
  (_, index) => CURRENT_YEAR + index
);

const inputClass =
  "w-full h-[52px] rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10";

const labelClass =
  "block mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#124d56]/65";

const selectClass =
  `${inputClass} cursor-pointer appearance-none pl-4 pr-12`;


function SelectWrapper({ children }) {
  return (
    <div className="relative w-full">
      {children}

      <ChevronDown
        size={18}
        strokeWidth={1.8}
        className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-[#124d56]/55
        "
        aria-hidden="true"
      />
    </div>
  );
}


export default function Floating_Quotation_Form({ onClose }) {
  const dispatch = useDispatch();

  const {
    packages: tourPackages,
    status: tourPackageStatus,
    error: tourPackageError,
  } = useSelector(
    (state) => state.tourPackageDropdown
  );

  const initialForm = {
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
  };

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const [isPackageDropdownOpen, setIsPackageDropdownOpen] =useState(false);
  const [packageSearch, setPackageSearch] = useState("");

  const datePickerRef = useRef(null);
  const packageDropdownRef = useRef(null);
  const packageSearchRef = useRef(null);
  const submitMessageRef = useRef(null);

  useEffect(() => {
    if (tourPackageStatus === "idle") {
      dispatch(fetchTourPackagesDropDown());
    }
  }, [dispatch, tourPackageStatus]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);


  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        packageDropdownRef.current &&
        !packageDropdownRef.current.contains(
          event.target
        )
      ) {
        setIsPackageDropdownOpen(false);
        setPackageSearch("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (
      isPackageDropdownOpen &&
      tourPackageStatus === "succeeded"
    ) {
      requestAnimationFrame(() => {
        packageSearchRef.current?.focus();
      });
    }
  }, [
    isPackageDropdownOpen,
    tourPackageStatus,
  ]);

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

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    if (submitError) {
      setSubmitError("");
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone) => {
    if (submitError) {
      setSubmitError("");
    }

    setForm((previous) => ({
      ...previous,
      phone,
    }));
  };

  const handleNationalityChange = (value) => {
    if (submitError) {
      setSubmitError("");
    }

    setForm((previous) => ({
      ...previous,
      nationality: value,
    }));
  };

  const handleTravelDateChange = (date) => {
    if (!date) {
      setForm((previous) => ({
        ...previous,
        travelDate: "",
      }));

      return;
    }

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    setForm((previous) => ({
      ...previous,
      travelDate: `${year}-${month}-${day}`,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handlePackageSelect = (pkg) => {
    setForm((previous) => ({
      ...previous,
      tourPackage: pkg.id,
    }));

    setIsPackageDropdownOpen(false);
    setPackageSearch("");

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleRetryPackages = () => {
    dispatch(fetchTourPackagesDropDown());
  };

  const selectedPackage =
    tourPackages?.find(
      (pkg) =>
        pkg.id === form.tourPackage
    );

  const filteredTourPackages =
    tourPackages?.filter((pkg) => {
      const search = packageSearch
        .trim()
        .toLowerCase();

      if (!search) {
        return true;
      }

      return (
        pkg.name
          ?.toLowerCase()
          .includes(search) ||
        pkg.id
          ?.toLowerCase()
          .includes(search)
      );
    }) || [];

  const selectedTravelDate =
    form.travelDate
      ? new Date(
          `${form.travelDate}T00:00:00`
        )
      : null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Prevent duplicate submission */
    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    if (!form.name.trim()) {
      setSubmitError(
        "Please enter your name."
      );
      return;
    }

    if (!form.email.trim()) {
      setSubmitError(
        "Please enter your email address."
      );
      return;
    }

    if (!form.phone.trim()) {
      setSubmitError(
        "Please enter your phone number."
      );
      return;
    }

    if (!form.tourPackage) {
      setSubmitError(
        "Please select a tour package."
      );
      return;
    }

    const enquiryData = {
      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      nationality:
        form.nationality || null,

      tourPackageId:
        form.tourPackage,

      travelDate:
        form.travelDate || null,

      /*
       * Backend expects Number.
       */
      duration: form.duration
        ? Number(form.duration)
        : null,

      /*
       * Backend accepts strings such as "10+".
       */
      adults:
        form.adults || "1",

      children:
        form.children || "0",

      hotelType:
        form.hotelType || null,

      reference:
        form.reference || null,

      details:
        form.details.trim() || null,
    };

    try {
      setIsSubmitting(true);

      const response =
        await createTourEnquiry(
          enquiryData
        );

      if (response?.success) {
        setSubmitted(true);

        setSubmitError("");

        setForm(initialForm);

        setIsPackageDropdownOpen(false);

        setPackageSearch("");

        return;
      }

      setSubmitError(
        response?.message ||
          "Unable to submit your enquiry. Please try again."
      );
    } catch (error) {
      console.error(
        "Tour enquiry submission error:",
        error
      );

      setSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while submitting your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="presentation"
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-[#061B1F]/70
        p-4
        backdrop-blur-md
        md:p-8
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <div id="quotation-datepicker-portal" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quotation-form-heading"
        className="
          relative
          my-6
          flex
          max-h-[94vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-[26px]
          bg-[#F2FAFB]
          shadow-[0_40px_120px_rgba(0,0,0,0.4)]
          animate-[modalIn_.3s_ease-out]
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div
          className="
            relative
            shrink-0
            overflow-hidden
            bg-[#124d56]
            px-6
            py-7
            sm:px-9
            sm:py-8
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-28
              h-64
              w-64
              rounded-full
              bg-[#F58634]/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-32
              -left-24
              h-64
              w-64
              rounded-full
              bg-white/4
              blur-3xl
            "
          />

          <div
            className="
              absolute
              left-10
              right-10
              top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-[#F58634]
              to-transparent
              opacity-80
            "
          />

          <div className="relative pr-12">
            <p
              className="
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#F58634]
                sm:text-[11px]
              "
            >
              Plan Your Journey
            </p>

            <h2
              id="quotation-form-heading"
              className="
                mt-2
                font-['Fraunces']
                text-3xl
                font-medium
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              Tell Us About Your Trip
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                font-['Inter']
                text-sm
                leading-relaxed
                text-white/65
              "
            >
              Give us a few details about
              your plans and our travel
              experts will help shape the
              journey around you.
            </p>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
            className="
              absolute
              right-5
              top-5
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/10
              text-white/70
              transition-all
              duration-300
              hover:rotate-90
              hover:border-white/30
              hover:bg-white/20
              hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
          "
        >

          {submitted ? (
            <div
              ref={submitMessageRef}
              className="
                flex
                min-h-125
                flex-col
                items-center
                justify-center
                px-6
                py-16
                text-center
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#124d56]/10
                "
              >
                <CheckCircle2
                  className="
                    h-8
                    w-8
                    text-[#124d56]
                  "
                />
              </div>

              <span
                className="
                  mt-6
                  font-['Inter']
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#F58634]
                "
              >
                Request Received
              </span>

              <h3
                className="
                  mt-3
                  font-['Fraunces']
                  text-3xl
                  font-medium
                  text-[#0B3C49]
                  sm:text-4xl
                "
              >
                Your journey starts here.
              </h3>

              <p
                className="
                  mt-4
                  max-w-md
                  font-['Inter']
                  text-sm
                  leading-relaxed
                  text-[#124d56]/60
                "
              >
                Thank you for reaching
                out to Times India Travels.
                Our travel team will review
                your request and get back to
                you with a tailored itinerary.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="
                  mt-7
                  cursor-pointer
                  rounded-full
                  bg-[#124d56]
                  px-7
                  py-3
                  font-['Inter']
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#0B3C49]
                  hover:shadow-[0_10px_30px_rgba(18,77,86,0.2)]
                "
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <>

              <div
                className="
                  mx-5
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-7
                  gap-y-3
                  rounded-2xl
                  border
                  border-[#124d56]/10
                  bg-white
                  px-5
                  py-4
                  font-['Inter']
                  text-[10px]
                  uppercase
                  tracking-[0.07em]
                  text-[#124d56]/55
                  sm:mx-8
                  lg:mx-9
                "
              >
                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#F58634]
                    "
                  />
                  Govt. of India Approved
                </span>

                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#F58634]
                    "
                  />
                  24×7 Support
                </span>

                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#F58634]
                    "
                  />
                  100% Tailor-Made
                </span>

                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#F58634]
                    "
                  />
                  Personalised Planning
                </span>
              </div>

              {submitError && (
                <div
                  ref={submitMessageRef}
                  className="
                    mx-5
                    mt-5
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-5
                    py-4
                    sm:mx-8
                    lg:mx-9
                  "
                >
                  <AlertCircle
                    size={20}
                    className="
                      mt-0.5
                      shrink-0
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
                      Unable to submit enquiry
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
                className="
                  mx-5
                  mb-6
                  mt-6
                  rounded-3xl
                  border
                  border-[#124d56]/10
                  bg-white
                  p-5
                  shadow-[0_10px_40px_rgba(18,77,86,0.05)]
                  sm:mx-8
                  sm:p-7
                  lg:mx-9
                  lg:p-8
                "
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-x-5
                    gap-y-5
                    sm:grid-cols-2
                  "
                >
                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-name"
                    >
                      Name
                    </label>

                    <input
                      id="about-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-email"
                    >
                      Email
                    </label>

                    <input
                      id="about-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-phone"
                    >
                      Phone Number
                    </label>

                    <PhoneInput
                      country="in"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      enableSearch
                      searchPlaceholder="Search country..."
                      disabled={isSubmitting}
                      inputProps={{
                        name: "phone",
                        id: "about-phone",
                        required: true,
                        autoComplete: "tel",
                      }}
                      containerClass="!w-full"
                      inputClass="
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
                      "
                      buttonClass="
                        !rounded-l-xl
                        !border-[#124d56]/15
                        !bg-white
                        hover:!bg-[#F2FAFB]
                      "
                      dropdownClass="
                        !bg-[#07111f]
                        !text-white
                      "
                      searchClass="
                        !bg-[#07111f]
                        !text-white
                      "
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-nationality"
                    >
                      Nationality
                    </label>

                    <div
                      className="
                        quotation-country-select
                        quotation-country-select--light
                      "
                    >
                      <CountrySelect
                        value={form.nationality}
                        onChange={
                          handleNationalityChange
                        }
                        name="nationality"
                        placeholder="Select your nationality"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-duration"
                    >
                      Duration of Travel
                    </label>

                    <input
                      id="about-duration"
                      name="duration"
                      type="number"
                      min="1"
                      value={form.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 10"
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
                      Enter number of days
                    </p>
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-date"
                    >
                      Travel Date
                    </label>

                    <div className="relative w-full">
                      <DatePicker
                        ref={datePickerRef}
                        id="about-date"
                        selected={
                          selectedTravelDate
                        }
                        onChange={
                          handleTravelDateChange
                        }
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        wrapperClassName="w-full"
                        disabled={isSubmitting}
                        className="
                          h-13!
                          w-full!
                          rounded-xl!
                          border!
                          border-[#124d56]/15!
                          bg-white!
                          px-4!
                          py-3!
                          pr-12!
                          text-sm!
                          text-[#0B3C49]!
                          outline-none
                          placeholder:text-[#124d56]/35!
                          focus:border-[#F58634]!
                          focus:ring-4!
                          focus:ring-[#F58634]/10!
                          cursor-pointer
                        "
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                        withPortal
                        portalId="quotation-datepicker-portal"
                        autoComplete="off"
                        calendarClassName="
                          !overflow-hidden
                          !rounded-[20px]
                          !border-0
                          !font-['Inter']
                          !shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                        "
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            className="
                              flex
                              h-19
                              items-center
                              justify-between
                              gap-2
                              bg-linear-to-br
                              from-[#124d56]
                              to-[#0d3d46]
                              px-3.5
                              py-3
                            "
                          >
                            {/* PREVIOUS */}

                            <button
                              type="button"
                              onClick={
                                decreaseMonth
                              }
                              disabled={
                                prevMonthButtonDisabled
                              }
                              aria-label="Previous month"
                              className="
                                flex
                                h-9.5
                                w-9.5
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/6
                                text-white/85
                                transition-all
                                duration-200
                                hover:-translate-y-px
                                hover:border-[#F58634]/45
                                hover:bg-[#F58634]/16
                                hover:text-[#F58634]
                                disabled:cursor-not-allowed
                                disabled:opacity-25
                              "
                            >
                              <ChevronLeftIcon
                                size={18}
                                strokeWidth={2}
                              />
                            </button>

                            {/* MONTH + YEAR */}

                            <div
                              className="
                                flex
                                flex-1
                                items-center
                                justify-center
                                gap-2
                              "
                            >
                              {/* MONTH */}

                              <div
                                className="
                                  relative
                                  flex
                                  items-center
                                "
                              >
                                <select
                                  value={date.getMonth()}
                                  onChange={(
                                    event
                                  ) =>
                                    changeMonth(
                                      Number(
                                        event.target
                                          .value
                                      )
                                    )
                                  }
                                  className="
                                    h-9.5
                                    min-w-29.5
                                    cursor-pointer
                                    appearance-none
                                    rounded-[10px]
                                    border
                                    border-white/14
                                    bg-[#07111f]/45
                                    px-3.25
                                    pr-8
                                    text-[13px]
                                    font-semibold
                                    text-white
                                    outline-none
                                    transition-all
                                    duration-200
                                    hover:border-[#F58634]/45
                                    hover:bg-[#07111f]/70
                                    focus:border-[#F58634]
                                    focus:ring-[3px]
                                    focus:ring-[#F58634]/15
                                  "
                                >
                                  {MONTH_NAMES.map(
                                    (
                                      month,
                                      index
                                    ) => (
                                      <option
                                        key={month}
                                        value={index}
                                        className="
                                          bg-[#07111f]
                                          text-white
                                        "
                                      >
                                        {month}
                                      </option>
                                    )
                                  )}
                                </select>

                                <ChevronDown
                                  size={13}
                                  className="
                                    pointer-events-none
                                    absolute
                                    right-2.5
                                    text-white/65
                                  "
                                />
                              </div>

                              {/* YEAR */}

                              <div
                                className="
                                  relative
                                  flex
                                  items-center
                                "
                              >
                                <select
                                  value={date.getFullYear()}
                                  onChange={(
                                    event
                                  ) =>
                                    changeYear(
                                      Number(
                                        event.target
                                          .value
                                      )
                                    )
                                  }
                                  className="
                                    h-9.5
                                    min-w-22
                                    cursor-pointer
                                    appearance-none
                                    rounded-[10px]
                                    border
                                    border-white/14
                                    bg-[#07111f]/45
                                    px-3.25
                                    pr-8
                                    text-[13px]
                                    font-semibold
                                    text-white
                                    outline-none
                                    transition-all
                                    duration-200
                                    hover:border-[#F58634]/45
                                    hover:bg-[#07111f]/70
                                    focus:border-[#F58634]
                                    focus:ring-[3px]
                                    focus:ring-[#F58634]/15
                                  "
                                >
                                  {YEAR_OPTIONS.map(
                                    (year) => (
                                      <option
                                        key={year}
                                        value={year}
                                        className="
                                          bg-[#07111f]
                                          text-white
                                        "
                                      >
                                        {year}
                                      </option>
                                    )
                                  )}
                                </select>

                                <ChevronDown
                                  size={13}
                                  className="
                                    pointer-events-none
                                    absolute
                                    right-2.5
                                    text-white/65
                                  "
                                />
                              </div>
                            </div>

                            {/* NEXT */}

                            <button
                              type="button"
                              onClick={
                                increaseMonth
                              }
                              disabled={
                                nextMonthButtonDisabled
                              }
                              aria-label="Next month"
                              className="
                                flex
                                h-9.5
                                w-9.5
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/6
                                text-white/85
                                transition-all
                                duration-200
                                hover:-translate-y-px
                                hover:border-[#F58634]/45
                                hover:bg-[#F58634]/16
                                hover:text-[#F58634]
                                disabled:cursor-not-allowed
                                disabled:opacity-25
                              "
                            >
                              <ChevronRightIcon
                                size={18}
                                strokeWidth={2}
                              />
                            </button>

                            {/* CLOSE CALENDAR */}

                            <button
                              type="button"
                              onClick={() =>
                                datePickerRef.current?.setOpen(
                                  false
                                )
                              }
                              aria-label="Close calendar"
                              className="
                                ml-1.5
                                flex
                                h-9.5
                                w-9.5
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/6
                                text-white/60
                                transition-all
                                duration-200
                                hover:border-white/25
                                hover:bg-white/12
                                hover:text-white
                              "
                            >
                              <X
                                size={16}
                                strokeWidth={2}
                              />
                            </button>
                          </div>
                        )}
                      />

                      <CalendarDays
                        size={19}
                        strokeWidth={1.8}
                        className="
                          pointer-events-none
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-[#124d56]/45
                        "
                        aria-hidden="true"
                      />
                    </div>

                    <p
                      className="
                        mt-2
                        font-['Inter']
                        text-[10px]
                        text-[#124d56]/40
                      "
                    >
                      Select your preferred travel
                      date
                    </p>
                  </div>


                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-adults"
                    >
                      Adults
                    </label>

                    <SelectWrapper>
                      <select
                        id="about-adults"
                        name="adults"
                        value={form.adults}
                        onChange={handleChange}
                        className={selectClass}
                        disabled={isSubmitting}
                      >
                        <option value="">
                          Select number
                        </option>

                        {Array.from(
                          { length: 10 },
                          (_, index) =>
                            index + 1
                        ).map((number) => (
                          <option
                            key={number}
                            value={String(
                              number
                            )}
                          >
                            {number}
                          </option>
                        ))}

                        <option value="10+">
                          10+
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-children"
                    >
                      Children
                    </label>

                    <SelectWrapper>
                      <select
                        id="about-children"
                        name="children"
                        value={form.children}
                        onChange={handleChange}
                        className={selectClass}
                        disabled={isSubmitting}
                      >
                        <option value="">
                          Select number
                        </option>

                        {Array.from(
                          { length: 7 },
                          (_, index) =>
                            index
                        ).map((number) => (
                          <option
                            key={number}
                            value={String(
                              number
                            )}
                          >
                            {number}
                          </option>
                        ))}

                        <option value="6+">
                          6+
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  <div
                    ref={packageDropdownRef}
                    className="relative"
                  >
                    <label
                      className={labelClass}
                      htmlFor="about-tour-package"
                    >
                      Tour Package
                    </label>

                    <button
                      type="button"
                      id="about-tour-package"
                      aria-haspopup="listbox"
                      aria-expanded={
                        isPackageDropdownOpen
                      }
                      disabled={
                        isSubmitting ||
                        tourPackageStatus ===
                          "loading"
                      }
                      onClick={() => {
                        if (
                          tourPackageStatus ===
                          "loading"
                        ) {
                          return;
                        }

                        setIsPackageDropdownOpen(
                          (previous) =>
                            !previous
                        );
                      }}
                      className={`
                        flex
                        h-13
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-[#124d56]/15
                        bg-white
                        px-4
                        text-left
                        text-sm
                        transition-all
                        duration-300
                        focus:outline-none
                        focus:ring-4
                        focus:ring-[#F58634]/10
                        ${
                          isPackageDropdownOpen
                            ? "border-[#F58634]"
                            : "hover:border-[#124d56]/30"
                        }
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      `}
                    >
                      <span
                        className={
                          selectedPackage
                            ? "truncate pr-3 text-[#0B3C49]"
                            : "text-[#124d56]/35"
                        }
                      >
                        {selectedPackage
                          ? selectedPackage.name
                          : tourPackageStatus ===
                            "loading"
                          ? "Loading packages..."
                          : "Select a package"}
                      </span>

                      {tourPackageStatus ===
                      "loading" ? (
                        <Loader2
                          size={18}
                          className="
                            shrink-0
                            animate-spin
                            text-[#124d56]/50
                          "
                        />
                      ) : (
                        <ChevronDown
                          size={18}
                          strokeWidth={1.8}
                          className={`
                            shrink-0
                            text-[#124d56]/55
                            transition-transform
                            duration-300
                            ${
                              isPackageDropdownOpen
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      )}
                    </button>

                    {/* PACKAGE DROPDOWN */}

                    {isPackageDropdownOpen && (
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-full
                          z-100
                          mt-2
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#124d56]/15
                          bg-[#07111f]
                          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                        "
                      >
                        {/* SEARCH */}

                        <div
                          className="
                            border-b
                            border-white/10
                            p-3
                          "
                        >
                          <div className="relative">
                            <Search
                              size={16}
                              strokeWidth={1.8}
                              className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-white/40
                              "
                            />

                            <input
                              ref={
                                packageSearchRef
                              }
                              type="text"
                              value={
                                packageSearch
                              }
                              onChange={(event) =>
                                setPackageSearch(
                                  event.target
                                    .value
                                )
                              }
                              onKeyDown={(
                                event
                              ) => {
                                if (
                                  event.key ===
                                  "Escape"
                                ) {
                                  setIsPackageDropdownOpen(
                                    false
                                  );

                                  setPackageSearch(
                                    ""
                                  );
                                }
                              }}
                              placeholder="Search tour packages..."
                              className="
                                h-10
                                w-full
                                rounded-lg
                                border
                                border-white/10
                                bg-white/6
                                pl-9
                                pr-9
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-white/35
                                focus:border-[#F58634]/60
                                focus:bg-white/8
                              "
                            />

                            {packageSearch && (
                              <button
                                type="button"
                                onClick={() =>
                                  setPackageSearch(
                                    ""
                                  )
                                }
                                className="
                                  absolute
                                  right-2
                                  top-1/2
                                  flex
                                  h-7
                                  w-7
                                  -translate-y-1/2
                                  cursor-pointer
                                  items-center
                                  justify-center
                                  rounded-md
                                  text-white/40
                                  transition
                                  hover:bg-white/10
                                  hover:text-white
                                "
                                aria-label="Clear package search"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* LIST */}

                        <div
                          className="
                            max-h-60
                            overflow-y-auto
                            overscroll-contain
                            py-1
                          "
                          role="listbox"
                        >
                          {/* LOADING */}

                          {tourPackageStatus ===
                            "loading" && (
                            <div
                              className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-4
                                py-8
                                text-sm
                                text-white/50
                              "
                            >
                              <Loader2
                                size={17}
                                className="animate-spin"
                              />

                              Loading tour
                              packages...
                            </div>
                          )}

                          {/* ERROR */}

                          {tourPackageStatus ===
                            "failed" && (
                            <div
                              className="
                                px-4
                                py-6
                                text-center
                              "
                            >
                              <AlertCircle
                                size={22}
                                className="
                                  mx-auto
                                  text-red-300/70
                                "
                              />

                              <p
                                className="
                                  mt-2
                                  text-sm
                                  text-red-300
                                "
                              >
                                {tourPackageError ||
                                  "Unable to load tour packages."}
                              </p>

                              <button
                                type="button"
                                onClick={
                                  handleRetryPackages
                                }
                                className="
                                  mt-3
                                  cursor-pointer
                                  rounded-lg
                                  border
                                  border-white/15
                                  px-3
                                  py-2
                                  text-xs
                                  font-medium
                                  text-white
                                  transition
                                  hover:bg-white/10
                                "
                              >
                                Try Again
                              </button>
                            </div>
                          )}

                          {/* EMPTY */}

                          {tourPackageStatus ===
                            "succeeded" &&
                            filteredTourPackages.length ===
                              0 && (
                              <div
                                className="
                                  px-4
                                  py-8
                                  text-center
                                "
                              >
                                <Search
                                  size={22}
                                  className="
                                    mx-auto
                                    text-white/25
                                  "
                                />

                                <p
                                  className="
                                    mt-2
                                    text-sm
                                    text-white/50
                                  "
                                >
                                  No tour packages
                                  found.
                                </p>

                                {packageSearch && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPackageSearch(
                                        ""
                                      )
                                    }
                                    className="
                                      mt-2
                                      cursor-pointer
                                      text-xs
                                      font-medium
                                      text-[#F58634]
                                      hover:underline
                                    "
                                  >
                                    Clear search
                                  </button>
                                )}
                              </div>
                            )}

                          {/* PACKAGES */}

                          {tourPackageStatus ===
                            "succeeded" &&
                            filteredTourPackages.length >
                              0 &&
                            filteredTourPackages.map(
                              (pkg) => {
                                const isSelected =
                                  pkg.id ===
                                  form.tourPackage;

                                return (
                                  <button
                                    key={pkg.id}
                                    type="button"
                                    role="option"
                                    aria-selected={
                                      isSelected
                                    }
                                    onClick={() =>
                                      handlePackageSelect(
                                        pkg
                                      )
                                    }
                                    className={`
                                      flex
                                      w-full
                                      items-center
                                      justify-between
                                      px-4
                                      py-3
                                      text-left
                                      text-sm
                                      transition
                                      duration-200
                                      ${
                                        isSelected
                                          ? "bg-[#F58634]/15 text-[#F58634]"
                                          : "text-white/80 hover:bg-white/[0.07] hover:text-white"
                                      }
                                    `}
                                  >
                                    <span className="pr-4">
                                      {pkg.name}
                                    </span>

                                    {isSelected && (
                                      <span
                                        className="
                                          shrink-0
                                          text-xs
                                          font-semibold
                                        "
                                      >
                                        ✓
                                      </span>
                                    )}
                                  </button>
                                );
                              }
                            )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="about-hotel-type"
                    >
                      Type of Hotel
                    </label>

                    <SelectWrapper>
                      <select
                        id="about-hotel-type"
                        name="hotelType"
                        value={form.hotelType}
                        onChange={handleChange}
                        className={selectClass}
                        disabled={isSubmitting}
                      >
                        <option value="">
                          Select hotel type
                        </option>

                        <option value="Heritage Hotel">
                          Heritage Hotel
                        </option>

                        <option value="5 Star Luxury">
                          5 Star Luxury
                        </option>

                        <option value="4 Star">
                          4 Star
                        </option>

                        <option value="3 Star">
                          3 Star
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="about-reference"
                    >
                      How Did You Hear About Us?
                    </label>

                    <SelectWrapper>
                      <select
                        id="about-reference"
                        name="reference"
                        value={form.reference}
                        onChange={handleChange}
                        className={selectClass}
                        disabled={isSubmitting}
                      >
                        <option value="">
                          Select
                        </option>

                        <option value="google">
                          Google Search
                        </option>

                        <option value="tripadvisor">
                          TripAdvisor
                        </option>

                        <option value="referral">
                          Friend / Family Referral
                        </option>

                        <option value="social">
                          Social Media
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="about-details"
                    >
                      Rough Itinerary & Details
                    </label>

                    <textarea
                      id="about-details"
                      name="details"
                      rows={4}
                      value={form.details}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#124d56]/15
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-[#0B3C49]
                        placeholder:text-[#124d56]/35
                        outline-none
                        transition-all
                        duration-300
                        focus:border-[#F58634]
                        focus:ring-4
                        focus:ring-[#F58634]/10
                        resize-none
                      "
                      placeholder="Tell us a little about what you're picturing — places you want to see, pace, budget range, anything helpful."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-7
                    flex
                    flex-col-reverse
                    gap-5
                    border-t
                    border-[#124d56]/10
                    pt-6
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <p
                    className="
                      max-w-md
                      font-['Inter']
                      text-xs
                      leading-relaxed
                      text-[#124d56]/50
                    "
                  >
                    Share as much or as little
                    as you know. Our travel team
                    will help shape the journey
                    around your requirements.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      inline-flex
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#F58634]
                      px-7
                      py-3.5
                      font-['Inter']
                      text-sm
                      font-semibold
                      text-white
                      shadow-[0_12px_30px_-12px_rgba(245,134,52,0.65)]
                      transition-all
                      duration-300
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
                            h-4
                            w-4
                            animate-spin
                          "
                        />

                        Sending...
                      </>
                    ) : (
                      <>
                        Send Enquiry

                        <span
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
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
              </form>

              <div className="px-6 pb-7 text-center">
                <p
                  className="
                    font-['Inter']
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    text-[#124d56]/35
                  "
                >
                  No obligation · Personalised
                  planning · India travel specialists
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
