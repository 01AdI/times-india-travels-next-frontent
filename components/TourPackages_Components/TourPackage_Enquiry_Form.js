"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";

import PhoneInput from "react-phone-input-2";

import CountrySelect from "../../utils/CountrySelect";

import DatePicker from "react-datepicker";

import {
  fetchTourPackagesDropDown,
} from "../../features/Tour-packages/tour_Package_Dropdown_Slice";

import { createTourEnquiry } from "../../services/PublicApi";

/* =========================================================
   MONTHS
========================================================= */

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

/* =========================================================
   YEARS
========================================================= */

const CURRENT_YEAR = new Date().getFullYear();

const YEAR_OPTIONS = Array.from(
  { length: 15 },
  (_, index) => CURRENT_YEAR + index
);

/* =========================================================
   COMMON STYLES
========================================================= */

const inputClass =
  "w-full h-[52px] rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10";

const labelClass =
  "block mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#124d56]/65";

const selectClass =
  `${inputClass} cursor-pointer appearance-none pl-4 pr-12`;

/* =========================================================
   SELECT WRAPPER
========================================================= */

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

/* =========================================================
   COMPONENT
========================================================= */

export default function TourPackage_Enquiry_Form({
  onClose,
  info = null,
}) {
  const dispatch = useDispatch();

  /* =========================================================
     REDUX — TOUR PACKAGES
  ========================================================= */

  const {
    packages: tourPackages = [],
    status: tourPackageStatus,
    error: tourPackageError,
  } = useSelector(
    (state) => state.tourPackageDropdown
  );

  /* =========================================================
     INITIAL FORM
  ========================================================= */

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    nationality: "",
    travelDate: "",
    duration: "",
    adults: "",
    children: "",
    tourPackage: info?.id || "",
    hotelType: "",
    reference: "",
    details: "",
  };

  const [form, setForm] = useState(initialForm);

  /* =========================================================
     UI STATE
  ========================================================= */

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [
    isPackageDropdownOpen,
    setIsPackageDropdownOpen,
  ] = useState(false);

  const [packageSearch, setPackageSearch] =
    useState("");

  /* =========================================================
     REFS
  ========================================================= */

  const datePickerRef = useRef(null);

  const packageDropdownRef =
    useRef(null);

  const packageSearchRef =
    useRef(null);

  const submitMessageRef =
    useRef(null);

  /* =========================================================
     FETCH TOUR PACKAGES FROM REDUX
  ========================================================= */

  useEffect(() => {
    if (tourPackageStatus === "idle") {
      dispatch(fetchTourPackagesDropDown());
    }
  }, [
    dispatch,
    tourPackageStatus,
  ]);

  /* =========================================================
     UPDATE PACKAGE IF INFO CHANGES

     If this form is opened from a specific package,
     info.id is used as the selected package ID.
  ========================================================= */

  useEffect(() => {
    if (!info) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      tourPackage: info.id || "",
    }));
  }, [info?.id]);

  /* =========================================================
     PREVENT BACKGROUND SCROLL
  ========================================================= */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  /* =========================================================
     ESC KEY
  ========================================================= */

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

  /* =========================================================
     CLICK OUTSIDE PACKAGE DROPDOWN
  ========================================================= */

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

  /* =========================================================
     FOCUS PACKAGE SEARCH
  ========================================================= */

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

  /* =========================================================
     SCROLL TO SUBMIT MESSAGE
  ========================================================= */

  useEffect(() => {
    if (submitted || submitError) {
      requestAnimationFrame(() => {
        submitMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [
    submitted,
    submitError,
  ]);

  /* =========================================================
     CLEAR SUBMIT ERROR
  ========================================================= */

  const clearSubmitError = () => {
    if (submitError) {
      setSubmitError("");
    }
  };

  /* =========================================================
     GENERIC INPUT CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    clearSubmitError();

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     PHONE CHANGE
  ========================================================= */

  const handlePhoneChange = (phone) => {
    clearSubmitError();

    setForm((previous) => ({
      ...previous,
      phone,
    }));
  };

  /* =========================================================
     NATIONALITY CHANGE
  ========================================================= */

  const handleNationalityChange = (
    value
  ) => {
    clearSubmitError();

    setForm((previous) => ({
      ...previous,
      nationality: value,
    }));
  };

  /* =========================================================
     TRAVEL DATE
  ========================================================= */

  const selectedTravelDate =
    form.travelDate
      ? new Date(
          `${form.travelDate}T00:00:00`
        )
      : null;

  const handleTravelDateChange = (
    date
  ) => {
    if (!date) {
      setForm((previous) => ({
        ...previous,
        travelDate: "",
      }));

      return;
    }

    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    clearSubmitError();

    setForm((previous) => ({
      ...previous,
      travelDate: `${year}-${month}-${day}`,
    }));
  };

  /* =========================================================
     PACKAGE SELECT
  ========================================================= */

  const handlePackageSelect = (
    pkg
  ) => {
    clearSubmitError();

    setForm((previous) => ({
      ...previous,
      tourPackage: pkg.id,
    }));

    setIsPackageDropdownOpen(false);
    setPackageSearch("");
  };

  /* =========================================================
     RETRY PACKAGES
  ========================================================= */

  const handleRetryPackages = () => {
    dispatch(fetchTourPackagesDropDown());
  };

  /* =========================================================
     SELECTED PACKAGE

     IMPORTANT:
     form.tourPackage stores the package ID.
  ========================================================= */

  const selectedPackage =
    tourPackages.find(
      (pkg) =>
        pkg.id === form.tourPackage
    );

  /* =========================================================
     FILTER PACKAGES
  ========================================================= */

  const filteredTourPackages =
    tourPackages.filter((pkg) => {
      const search =
        packageSearch
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
    });

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    /* -----------------------------
       BASIC VALIDATION
    ----------------------------- */

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

    if (!selectedPackage) {
      setSubmitError(
        "Selected tour package could not be found. Please select again."
      );
      return;
    }

    /* =====================================================
       BACKEND PAYLOAD
    ===================================================== */

    const enquiryData = {
      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      nationality:
        form.nationality || null,

      /*
       * IMPORTANT:
       * Backend expects the actual package ID.
       */
      tourPackageId:
        selectedPackage.id,

      /*
       * Also send the package name for the
       * enquiry/email/admin record.
       */
      tourPackageName:
        selectedPackage.name,

      travelDate:
        form.travelDate || null,

      /*
       * Backend expects Number.
       */
      duration: form.duration
        ? Number(form.duration)
        : null,

      /*
       * Backend accepts values such as "10+".
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

        setIsPackageDropdownOpen(
          false
        );

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

  /* =========================================================
     HEADER
  ========================================================= */

  const enquiryTitle =
    info?.name
      ? `Plan Your ${info.name} Journey`
      : "Plan Your India Journey";

  const enquiryDescription =
    info?.name
      ? `Tell us a little about your plans for ${info.name} and our travel experts will help create the right experience for you.`
      : "Tell us a little about your travel plans and our experts will help create the right experience for you.";

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div
      role="presentation"
      className="
        fixed
        inset-0
        z-[9999]
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
      {/* =====================================================
          DATEPICKER PORTAL
      ====================================================== */}

      <div id="tour-enquiry-datepicker-portal" />

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-enquiry-heading"
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
        {/* ===================================================
            HEADER
        ==================================================== */}

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
          {/* ORANGE GLOW */}

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

          {/* TEAL GLOW */}

          <div
            className="
              absolute
              -bottom-32
              -left-24
              h-64
              w-64
              rounded-full
              bg-white/[0.04]
              blur-3xl
            "
          />

          {/* ORANGE ACCENT */}

          <div
            className="
              absolute
              left-10
              right-10
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-[#F58634]
              to-transparent
              opacity-80
            "
          />

          {/* HEADER CONTENT */}

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
              Start Your Journey
            </p>

            <h2
              id="tour-enquiry-heading"
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
              {enquiryTitle}
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
              {enquiryDescription}
            </p>
          </div>

          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
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

        {/* ===================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          {!submitted ? (
            <>
              {/* =================================================
                  TRUST STRIP
              ================================================== */}

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
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
                  Govt. of India Approved
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
                  24×7 Support
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
                  Tailor-Made
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
                  Expert Planning
                </span>
              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="
                  mx-5
                  mb-6
                  mt-6
                  rounded-[24px]
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
                  {/* =================================================
                      NAME
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-name"
                    >
                      Name
                    </label>

                    <input
                      id="tour-enquiry-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* =================================================
                      EMAIL
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-email"
                    >
                      Email
                    </label>

                    <input
                      id="tour-enquiry-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {/* =================================================
                      PHONE
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-phone"
                    >
                      Phone
                    </label>

                    <PhoneInput
                      country="in"
                      value={form.phone}
                      onChange={
                        handlePhoneChange
                      }
                      enableSearch
                      searchPlaceholder="Search country..."
                      inputProps={{
                        name: "phone",
                        id: "tour-enquiry-phone",
                        required: true,
                        autoComplete: "tel",
                      }}
                      disabled={isSubmitting}
                      containerClass="!w-full"
                      inputClass="
                        !w-full
                        !h-[52px]
                        !rounded-xl
                        !border
                        !border-[#124d56]/15
                        !bg-white
                        !text-[#0B3C49]
                        !text-sm
                        !pl-[52px]
                        !pr-4
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

                  {/* =================================================
                      NATIONALITY
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-nationality"
                    >
                      Nationality
                    </label>

                    <div className="quotation-country-select quotation-country-select--light">
                      <CountrySelect
                        value={
                          form.nationality
                        }
                        onChange={
                          handleNationalityChange
                        }
                        name="nationality"
                        placeholder="Select your nationality"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      TRAVEL DATE
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-date"
                    >
                      Travel Date
                    </label>

                    <div className="relative w-full">
                      <DatePicker
                        ref={datePickerRef}
                        id="tour-enquiry-date"
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
                        className="
                          !w-full
                          !h-[52px]
                          !rounded-xl
                          !border
                          !border-[#124d56]/15
                          !bg-white
                          !px-4
                          !pr-12
                          !py-3
                          !text-sm
                          !text-[#0B3C49]
                          placeholder:!text-[#124d56]/35
                          focus:!border-[#F58634]
                          focus:!ring-4
                          focus:!ring-[#F58634]/10
                          outline-none
                          cursor-pointer
                        "
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                        withPortal
                        portalId="tour-enquiry-datepicker-portal"
                        autoComplete="off"
                        disabled={
                          isSubmitting
                        }
                        calendarClassName="
                          !border-0
                          !rounded-[20px]
                          !overflow-hidden
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
                              h-[76px]
                              items-center
                              justify-between
                              gap-2
                              bg-gradient-to-br
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
                                h-[38px]
                                w-[38px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/[0.06]
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
                              <ChevronLeft
                                size={18}
                                strokeWidth={2}
                              />
                            </button>

                            {/* MONTH / YEAR */}

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

                              <div className="relative flex items-center">
                                <select
                                  value={
                                    date.getMonth()
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    changeMonth(
                                      Number(
                                        event
                                          .target
                                          .value
                                      )
                                    )
                                  }
                                  className="
                                    h-[38px]
                                    min-w-[118px]
                                    cursor-pointer
                                    appearance-none
                                    rounded-[10px]
                                    border
                                    border-white/14
                                    bg-[#07111f]/45
                                    px-[13px]
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
                                        key={
                                          month
                                        }
                                        value={
                                          index
                                        }
                                        className="bg-[#07111f] text-white"
                                      >
                                        {
                                          month
                                        }
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

                              <div className="relative flex items-center">
                                <select
                                  value={
                                    date.getFullYear()
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    changeYear(
                                      Number(
                                        event
                                          .target
                                          .value
                                      )
                                    )
                                  }
                                  className="
                                    h-[38px]
                                    min-w-[88px]
                                    cursor-pointer
                                    appearance-none
                                    rounded-[10px]
                                    border
                                    border-white/14
                                    bg-[#07111f]/45
                                    px-[13px]
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
                                    (
                                      year
                                    ) => (
                                      <option
                                        key={
                                          year
                                        }
                                        value={
                                          year
                                        }
                                        className="bg-[#07111f] text-white"
                                      >
                                        {
                                          year
                                        }
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
                                h-[38px]
                                w-[38px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/[0.06]
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
                              <ChevronRight
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
                                h-[38px]
                                w-[38px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-white/12
                                bg-white/[0.06]
                                text-white/60
                                transition-all
                                duration-200
                                hover:border-white/25
                                hover:bg-white/[0.12]
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
                      Select your preferred
                      travel date
                    </p>
                  </div>

                  {/* =================================================
                      DURATION
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-duration"
                    >
                      Duration
                    </label>

                    <input
                      id="tour-enquiry-duration"
                      name="duration"
                      type="text"
                      value={form.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 10 days"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* =================================================
                      ADULTS
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-adults"
                    >
                      Adults
                    </label>

                    <SelectWrapper>
                      <select
                        id="tour-enquiry-adults"
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
                          {
                            length: 10,
                          },
                          (
                            _,
                            index
                          ) =>
                            index + 1
                        ).map(
                          (number) => (
                            <option
                              key={
                                number
                              }
                              value={
                                number
                              }
                            >
                              {number}
                            </option>
                          )
                        )}

                        <option value="10+">
                          10+
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* =================================================
                      CHILDREN
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-children"
                    >
                      Children
                    </label>

                    <SelectWrapper>
                      <select
                        id="tour-enquiry-children"
                        name="children"
                        value={
                          form.children
                        }
                        onChange={
                          handleChange
                        }
                        className={
                          selectClass
                        }
                        disabled={
                          isSubmitting
                        }
                      >
                        <option value="">
                          Select number
                        </option>

                        {Array.from(
                          {
                            length: 7,
                          },
                          (
                            _,
                            index
                          ) => index
                        ).map(
                          (number) => (
                            <option
                              key={
                                number
                              }
                              value={
                                number
                              }
                            >
                              {number}
                            </option>
                          )
                        )}

                        <option value="6+">
                          6+
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* =================================================
                      DYNAMIC TOUR PACKAGE
                  ================================================== */}

                  <div
                    ref={
                      packageDropdownRef
                    }
                    className="relative"
                  >
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-package"
                    >
                      Tour / Package
                    </label>

                    {/* SELECT BUTTON */}

                    <button
                      type="button"
                      id="tour-enquiry-package"
                      disabled={
                        isSubmitting ||
                        tourPackageStatus ===
                          "loading"
                      }
                      onClick={() => {
                        if (
                          tourPackageStatus !==
                          "failed"
                        ) {
                          setIsPackageDropdownOpen(
                            (
                              previous
                            ) =>
                              !previous
                          );
                        }
                      }}
                      className={`
                        ${inputClass}
                        flex
                        cursor-pointer
                        items-center
                        justify-between
                        text-left
                        ${
                          isPackageDropdownOpen
                            ? "!border-[#F58634] !ring-4 !ring-[#F58634]/10"
                            : ""
                        }
                        ${
                          isSubmitting
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }
                      `}
                      aria-haspopup="listbox"
                      aria-expanded={
                        isPackageDropdownOpen
                      }
                    >
                      <span
                        className={
                          selectedPackage
                            ? "text-[#0B3C49]"
                            : "text-[#124d56]/35"
                        }
                      >
                        {tourPackageStatus ===
                        "loading"
                          ? "Loading packages..."
                          : tourPackageStatus ===
                            "failed"
                          ? "Unable to load packages"
                          : selectedPackage
                          ? selectedPackage.name
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

                    {/* PACKAGE ERROR */}

                    {tourPackageStatus ===
                      "failed" && (
                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          justify-between
                          gap-3
                          rounded-lg
                          border
                          border-red-200
                          bg-red-50
                          px-3
                          py-2
                        "
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <AlertCircle
                            size={14}
                            className="shrink-0 text-red-500"
                          />

                          <span
                            className="
                              truncate
                              font-['Inter']
                              text-[10px]
                              text-red-600
                            "
                          >
                            {tourPackageError ||
                              "Unable to load tour packages."}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={
                            handleRetryPackages
                          }
                          className="
                            shrink-0
                            cursor-pointer
                            font-['Inter']
                            text-[10px]
                            font-semibold
                            text-[#124d56]
                            underline
                            underline-offset-2
                            hover:text-[#F58634]
                          "
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {/* =================================================
                        PACKAGE DROPDOWN
                    ================================================== */}

                    {isPackageDropdownOpen &&
                      tourPackageStatus !==
                        "failed" && (
                        <div
                          className="
                            absolute
                            left-0
                            right-0
                            top-full
                            z-[100]
                            mt-2
                            overflow-hidden
                            rounded-xl
                            border
                            border-[#124d56]/15
                            bg-white
                            shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                          "
                        >
                          {/* SEARCH */}

                          <div
                            className="
                              border-b
                              border-[#124d56]/10
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
                                  text-[#124d56]/40
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
                                onChange={(
                                  event
                                ) =>
                                  setPackageSearch(
                                    event
                                      .target
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
                                  border-[#124d56]/10
                                  bg-[#F2FAFB]
                                  pl-9
                                  pr-9
                                  text-sm
                                  text-[#0B3C49]
                                  outline-none
                                  placeholder:text-[#124d56]/35
                                  focus:border-[#F58634]/60
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
                                    rounded-full
                                    text-[#124d56]/45
                                    transition
                                    hover:bg-[#124d56]/10
                                    hover:text-[#124d56]
                                  "
                                  aria-label="Clear package search"
                                >
                                  <X
                                    size={14}
                                  />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* PACKAGE LIST */}

                          <div
                            className="
                              max-h-[260px]
                              overflow-y-auto
                            "
                            role="listbox"
                          >
                            {filteredTourPackages.length ===
                            0 ? (
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
                                    text-[#124d56]/20
                                  "
                                />

                                <p
                                  className="
                                    mt-2
                                    font-['Inter']
                                    text-xs
                                    text-[#124d56]/50
                                  "
                                >
                                  No tour packages
                                  found
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
                                      font-['Inter']
                                      text-[11px]
                                      font-semibold
                                      text-[#F58634]
                                    "
                                  >
                                    Clear search
                                  </button>
                                )}
                              </div>
                            ) : (
                              filteredTourPackages.map(
                                (pkg) => {
                                  const isSelected =
                                    pkg.id ===
                                    form.tourPackage;

                                  return (
                                    <button
                                      type="button"
                                      key={
                                        pkg.id
                                      }
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
                                            : "text-[#0B3C49] hover:bg-[#F2FAFB] hover:text-[#124d56]"
                                        }
                                      `}
                                    >
                                      <span className="pr-4">
                                        {
                                          pkg.name
                                        }
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
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* SELECTED PACKAGE INFO */}

                    {selectedPackage && (
                      <p
                        className="
                          mt-2
                          font-['Inter']
                          text-[10px]
                          text-[#124d56]/40
                        "
                      >
                        Selected:{" "}
                        {
                          selectedPackage.name
                        }
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      HOTEL
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-hotel-type"
                    >
                      Type of Hotel
                    </label>

                    <SelectWrapper>
                      <select
                        id="tour-enquiry-hotel-type"
                        name="hotelType"
                        value={
                          form.hotelType
                        }
                        onChange={
                          handleChange
                        }
                        className={
                          selectClass
                        }
                        disabled={
                          isSubmitting
                        }
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

                  {/* =================================================
                      REFERENCE
                  ================================================== */}

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-reference"
                    >
                      How Did You Hear About Us?
                    </label>

                    <SelectWrapper>
                      <select
                        id="tour-enquiry-reference"
                        name="reference"
                        value={
                          form.reference
                        }
                        onChange={
                          handleChange
                        }
                        className={
                          selectClass
                        }
                        disabled={
                          isSubmitting
                        }
                      >
                        <option value="">
                          Select
                        </option>

                        <option value="Google Search">
                          Google Search
                        </option>

                        <option value="TripAdvisor">
                          TripAdvisor
                        </option>

                        <option value="Friend / Family Referral">
                          Friend / Family
                          Referral
                        </option>

                        <option value="Social Media">
                          Social Media
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* =================================================
                      DETAILS
                  ================================================== */}

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="tour-enquiry-details"
                    >
                      Tell Us About Your Trip
                    </label>

                    <textarea
                      id="tour-enquiry-details"
                      name="details"
                      rows={4}
                      value={
                        form.details
                      }
                      onChange={
                        handleChange
                      }
                      className={`
                        ${inputClass}
                        !h-auto
                        resize-none
                      `}
                      placeholder="Tell us about places you want to visit, your interests, preferred pace, budget range, or anything else..."
                      disabled={
                        isSubmitting
                      }
                    />
                  </div>
                </div>

                {/* =================================================
                    SUBMIT ERROR
                ================================================== */}

                {submitError && (
                  <div
                    ref={
                      submitMessageRef
                    }
                    className="
                      mt-6
                      flex
                      items-start
                      gap-3
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                    "
                    role="alert"
                  >
                    <AlertCircle
                      size={18}
                      className="
                        mt-0.5
                        shrink-0
                        text-red-500
                      "
                    />

                    <p
                      className="
                        font-['Inter']
                        text-xs
                        leading-relaxed
                        text-red-600
                      "
                    >
                      {submitError}
                    </p>
                  </div>
                )}

                {/* =================================================
                    ACTION
                ================================================== */}

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
                    No obligation. Tell us what
                    you have in mind and our
                    travel experts will take it
                    from there.
                  </p>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
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
                      disabled:opacity-60
                      disabled:hover:bg-[#F58634]
                      disabled:hover:shadow-[0_12px_30px_-12px_rgba(245,134,52,0.65)]
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
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* =================================================
                  FOOTER
              ================================================== */}

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
                  planning · India travel
                  specialists
                </p>
              </div>
            </>
          ) : (
            /* =================================================
               SUCCESS STATE
            ================================================= */

            <div
              ref={
                submitMessageRef
              }
              className="
                flex
                min-h-[500px]
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
                Enquiry Received
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
                Your journey starts
                here.
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
                Our travel team will
                review your enquiry and
                get back to you with a
                tailored journey.
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
          )}
        </div>
      </div>
    </div>
  );
}
