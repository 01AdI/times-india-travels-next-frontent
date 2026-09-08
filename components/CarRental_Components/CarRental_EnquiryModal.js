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

import CountrySelect from "../../utils/CountrySelect";

import { fetchTourPackagesDropDown } from "../../features/Tour-packages/tour_Package_Dropdown_Slice";

import { createCarEnquary } from "../../services/PublicApi";

// ==========================================================
// MONTH NAMES
// ==========================================================

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

// ==========================================================
// YEAR OPTIONS
// ==========================================================

const CURRENT_YEAR = new Date().getFullYear();

const YEAR_OPTIONS = Array.from(
  { length: 12 },
  (_, index) => CURRENT_YEAR + index
);

// ==========================================================
// VEHICLE OPTIONS
// ==========================================================

const VEHICLE_OPTIONS = [
  {
    value: "Sedan",
    label: "Sedan",
  },
  {
    value: "Suv",
    label: "SUV",
  },
  {
    value: "Traveller",
    label: "Traveller",
  },
  {
    value: "Luxury Bus",
    label: "Luxury Bus",
  },
  {
    value: "Not Sure Yet",
    label: "Not Sure Yet",
  },
];

// ==========================================================
// INPUT STYLE
// ==========================================================

const inputClass =
  "w-full h-[52px] rounded-xl border border-[#124d56]/15 bg-white px-4 py-3 text-sm text-[#0B3C49] placeholder:text-[#124d56]/35 outline-none transition-all duration-300 focus:border-[#F58634] focus:ring-4 focus:ring-[#F58634]/10 disabled:cursor-not-allowed disabled:opacity-60";

// ==========================================================
// LABEL STYLE
// ==========================================================

const labelClass =
  "block mb-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#124d56]/65";

// ==========================================================
// SELECT STYLE
// ==========================================================

const selectClass =
  `${inputClass} cursor-pointer appearance-none pl-4 pr-12`;

// ==========================================================
// SELECT WRAPPER
// ==========================================================

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

// ==========================================================
// INITIAL FORM
// ==========================================================

const getInitialForm = () => ({
  name: "",
  email: "",
  phone: "",
  nationality: "",
  duration: "",
  travelDate: "",
  adults: "",
  children: "",
  carType: "",
  tourPackage: "",
  reference: "",
  details: "",
});

// ==========================================================
// COMPONENT
// ==========================================================

export default function CarRental_EnquiryModal({
  isOpen,
  onClose,
  selectedCar = "",
}) {
  const dispatch = useDispatch();

  // ========================================================
  // REDUX
  // ========================================================

  const {
    packages: tourPackages = [],
    status: tourPackageStatus,
    error: tourPackageError,
  } = useSelector(
    (state) => state.tourPackageDropdown
  );

  // ========================================================
  // STATE
  // ========================================================

  const [form, setForm] = useState(getInitialForm);

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  // ========================================================
  // PACKAGE DROPDOWN STATE
  // ========================================================

  const [isPackageDropdownOpen, setIsPackageDropdownOpen] =
    useState(false);

  const [packageSearch, setPackageSearch] = useState("");

  // ========================================================
  // REFS
  // ========================================================

  const datePickerRef = useRef(null);

  const packageDropdownRef = useRef(null);

  const packageSearchRef = useRef(null);

  // ========================================================
  // FETCH TOUR PACKAGES
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (tourPackageStatus === "idle") {
      dispatch(fetchTourPackagesDropDown());
    }
  }, [
    dispatch,
    isOpen,
    tourPackageStatus,
  ]);

  // ========================================================
  // AUTO SELECT VEHICLE
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      carType: selectedCar || "",
    }));
  }, [selectedCar, isOpen]);

  // ========================================================
  // RESET MODAL WHEN OPENING
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSubmitted(false);

    setIsSubmitting(false);

    setSubmitError("");

    setIsPackageDropdownOpen(false);

    setPackageSearch("");

    setForm((previous) => ({
      ...previous,
      carType: selectedCar || "",
    }));
  }, [isOpen, selectedCar]);

  // ========================================================
  // PREVENT BACKGROUND SCROLL
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  // ========================================================
  // ESC KEY
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
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
  }, [isOpen, onClose]);

  // ========================================================
  // CLICK OUTSIDE PACKAGE DROPDOWN
  // ========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen]);

  // ========================================================
  // FOCUS PACKAGE SEARCH
  // ========================================================

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

  // ========================================================
  // DON'T RENDER WHEN CLOSED
  // ========================================================

  if (!isOpen) {
    return null;
  }

  // ========================================================
  // INPUT CHANGE
  // ========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSubmitError("");

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================================
  // PHONE CHANGE
  // ========================================================

  const handlePhoneChange = (phone) => {
    setSubmitError("");

    setForm((previous) => ({
      ...previous,
      phone,
    }));
  };

  // ========================================================
  // NATIONALITY CHANGE
  // ========================================================

  const handleNationalityChange = (value) => {
    setSubmitError("");

    setForm((previous) => ({
      ...previous,
      nationality: value,
    }));
  };

  // ========================================================
  // DATE VALUE
  // ========================================================

  const selectedTravelDate = form.travelDate
    ? new Date(
        `${form.travelDate}T00:00:00`
      )
    : null;

  // ========================================================
  // DATE CHANGE
  // ========================================================

  const handleTravelDateChange = (date) => {
    setSubmitError("");

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
  };

  // ========================================================
  // PACKAGE SELECT
  // ========================================================

  const handlePackageSelect = (pkg) => {
    setSubmitError("");

    setForm((previous) => ({
      ...previous,
      tourPackage: pkg.id,
    }));

    setIsPackageDropdownOpen(false);

    setPackageSearch("");
  };

  // ========================================================
  // SELECTED PACKAGE
  // ========================================================

  const selectedPackage = tourPackages.find(
    (pkg) =>
      String(pkg.id) ===
      String(form.tourPackage)
  );

  // ========================================================
  // FILTER PACKAGES
  // ========================================================

  const searchTerm = packageSearch
    .trim()
    .toLowerCase();

  const filteredTourPackages =
    tourPackages.filter((pkg) => {
      if (!searchTerm) {
        return true;
      }

      return (
        pkg.name
          ?.toLowerCase()
          .includes(searchTerm) ||
        String(pkg.id)
          .toLowerCase()
          .includes(searchTerm)
      );
    });

  // ========================================================
  // RETRY PACKAGES
  // ========================================================

  const handleRetryPackages = () => {
    dispatch(fetchTourPackagesDropDown());
  };

  // ========================================================
  // VALIDATION
  // ========================================================

  const validateForm = () => {
    const name = form.name.trim();

    const email = form.email.trim();

    const phone = form.phone.trim();

    if (!name) {
      return "Please enter your name.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!phone) {
      return "Please enter your phone number.";
    }

    const digitsOnly =
      phone.replace(/\D/g, "");

    if (digitsOnly.length < 8) {
      return "Please enter a valid phone number.";
    }

    if (!form.adults) {
      return "Please select the number of adults.";
    }

    if (!form.tourPackage) {
      return "Please select a tour package.";
    }

    if (!selectedPackage) {
      return "Selected tour package could not be found. Please select again.";
    }

    return null;
  };

  // ========================================================
  // SUBMIT
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    const validationError =
      validateForm();

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    // ======================================================
    // DATA SENT TO BACKEND
    // ======================================================

    const enquiryData = {
      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      nationality:
        form.nationality || null,

      duration:
        form.duration.trim() || null,

      travelDate:
        form.travelDate || null,

      adults:
        form.adults || "1",

      children:
        form.children || "0",

      carType:
        form.carType || null,

      vehicle:
        form.carType || null,

      tourPackageId:
        selectedPackage.id,

      tourPackageName:
        selectedPackage.name,

      reference:
        form.reference || null,

      details:
        form.details.trim() || null,
    };

    try {
      setIsSubmitting(true);

      const response =
        await createCarEnquary(
          enquiryData
        );

      if (response?.success) {
        setSubmitted(true);

        setSubmitError("");

        setForm(getInitialForm());

        setIsPackageDropdownOpen(false);

        setPackageSearch("");

        return;
      }

      setSubmitError(
        response?.message ||
          "Unable to submit your car rental enquiry. Please try again."
      );
    } catch (error) {
      console.error(
        "Car rental enquiry submission error:",
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

  // ========================================================
  // RETURN
  // ========================================================

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
          onClose?.();
        }
      }}
    >
      {/* =====================================================
          DATEPICKER PORTAL
      ====================================================== */}

      <div id="car-rental-datepicker-portal" />

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-enquiry-title"
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
              bg-white/[0.04]
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
              bg-gradient-to-r
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
              Travel With Comfort
            </p>

            <h2
              id="car-enquiry-title"
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
              Plan Your Car Rental
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
              Tell us a few details about your
              journey and our travel experts will
              help arrange the right vehicle and
              travel experience.
            </p>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close car rental enquiry"
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
                  Chauffeur Driven
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
                  Expert Planning
                </span>
              </div>

              {/* =================================================
                  ERROR
              ================================================== */}

              {submitError && (
                <div
                  className="
                    mx-5
                    mt-6
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
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <div>
                    <p className="font-['Inter'] text-sm font-semibold text-red-700">
                      Unable to submit enquiry
                    </p>

                    <p className="mt-1 font-['Inter'] text-xs leading-relaxed text-red-600/80">
                      {submitError}
                    </p>
                  </div>
                </div>
              )}

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                noValidate
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
                      htmlFor="car-enquiry-name"
                    >
                      Name
                    </label>

                    <input
                      id="car-enquiry-name"
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

                  {/* =================================================
                      EMAIL
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-email"
                    >
                      Email
                    </label>

                    <input
                      id="car-enquiry-email"
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

                  {/* =================================================
                      PHONE
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-phone"
                    >
                      Phone
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
                        id: "car-enquiry-phone",
                        required: true,
                        autoComplete: "tel",
                      }}
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
                      htmlFor="car-enquiry-nationality"
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
                        placeholder="Select nationality"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      DURATION
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-duration"
                    >
                      Duration of Travel
                    </label>

                    <input
                      id="car-enquiry-duration"
                      name="duration"
                      type="text"
                      value={form.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 7 days"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* =================================================
                      TRAVEL DATE
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-date"
                    >
                      Travel Date
                    </label>

                    <div className="relative w-full">
                      <DatePicker
                        ref={datePickerRef}
                        id="car-enquiry-date"
                        selected={selectedTravelDate}
                        onChange={
                          handleTravelDateChange
                        }
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        wrapperClassName="w-full"
                        disabled={isSubmitting}
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
                        portalId="car-rental-datepicker-portal"
                        autoComplete="off"
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

                              <div className="relative flex items-center">
                                <select
                                  value={date.getMonth()}
                                  onChange={(event) =>
                                    changeMonth(
                                      Number(
                                        event.target.value
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

                              <div className="relative flex items-center">
                                <select
                                  value={
                                    date.getFullYear()
                                  }
                                  onChange={(event) =>
                                    changeYear(
                                      Number(
                                        event.target.value
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

                  {/* =================================================
                      ADULTS
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-adults"
                    >
                      Adults
                    </label>

                    <SelectWrapper>
                      <select
                        id="car-enquiry-adults"
                        name="adults"
                        value={form.adults}
                        onChange={handleChange}
                        className={selectClass}
                        required
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

                  {/* =================================================
                      CHILDREN
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-children"
                    >
                      Children
                    </label>

                    <SelectWrapper>
                      <select
                        id="car-enquiry-children"
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
                          (_, index) => index
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

                  {/* =================================================
                      VEHICLE
                  ================================================== */}

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-vehicle"
                    >
                      Vehicle
                    </label>

                    <SelectWrapper>
                      <select
                        id="car-enquiry-vehicle"
                        name="carType"
                        value={form.carType}
                        onChange={handleChange}
                        className={selectClass}
                        disabled={isSubmitting}
                      >
                        <option value="">
                          Select a vehicle
                        </option>

                        {VEHICLE_OPTIONS.map(
                          (vehicle) => (
                            <option
                              key={
                                vehicle.value
                              }
                              value={
                                vehicle.value
                              }
                            >
                              {vehicle.label}
                            </option>
                          )
                        )}
                      </select>
                    </SelectWrapper>
                  </div>

                  {/* =================================================
                      TOUR PACKAGE
                  ================================================== */}

                  <div
                    ref={packageDropdownRef}
                    className="relative"
                  >
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-package"
                    >
                      Tour / Package
                    </label>

                    <button
                      type="button"
                      id="car-enquiry-package"
                      disabled={
                        isSubmitting ||
                        tourPackageStatus ===
                          "loading"
                      }
                      onClick={() => {
                        setIsPackageDropdownOpen(
                          (previous) =>
                            !previous
                        );
                      }}
                      className={`
                        flex
                        h-[52px]
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        border
                        bg-white
                        px-4
                        text-left
                        text-sm
                        transition-all
                        duration-300
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        ${
                          isPackageDropdownOpen
                            ? "border-[#F58634]"
                            : "border-[#124d56]/15 hover:border-[#124d56]/25"
                        }
                      `}
                    >
                      <span
                        className={
                          selectedPackage
                            ? "truncate pr-3 text-[#0B3C49]"
                            : "truncate pr-3 text-[#124d56]/35"
                        }
                      >
                        {selectedPackage
                          ? selectedPackage.name
                          : tourPackageStatus ===
                            "loading"
                          ? "Loading packages..."
                          : tourPackageStatus ===
                            "failed"
                          ? "Unable to load packages"
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

                    {/* =================================================
                        PACKAGE DROPDOWN
                    ================================================== */}

                    {isPackageDropdownOpen && (
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

                        <div className="border-b border-[#124d56]/10 p-3">
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
                              onChange={(event) =>
                                setPackageSearch(
                                  event.target.value
                                )
                              }
                              placeholder="Search tour packages..."
                              className="
                                h-10
                                w-full
                                rounded-lg
                                border
                                border-[#124d56]/10
                                bg-[#F2FAFB]
                                pl-9
                                pr-4
                                text-sm
                                text-[#0B3C49]
                                outline-none
                                placeholder:text-[#124d56]/35
                                focus:border-[#F58634]/60
                              "
                            />
                          </div>
                        </div>

                        {/* LIST */}

                        <div className="max-h-60 overflow-y-auto py-1">
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
                                text-[#124d56]/50
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
                            <div className="px-4 py-6 text-center">
                              <AlertCircle
                                size={22}
                                className="mx-auto text-red-400"
                              />

                              <p className="mt-2 text-sm text-red-500">
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
                                  rounded-lg
                                  border
                                  border-[#124d56]/15
                                  px-3
                                  py-2
                                  text-xs
                                  font-medium
                                  text-[#124d56]
                                  transition
                                  hover:bg-[#F2FAFB]
                                "
                              >
                                Try Again
                              </button>
                            </div>
                          )}

                          {/* NO RESULTS */}

                          {tourPackageStatus ===
                            "succeeded" &&
                            filteredTourPackages.length ===
                              0 && (
                              <div className="px-4 py-8 text-center">
                                <Search
                                  size={22}
                                  className="mx-auto text-[#124d56]/25"
                                />

                                <p className="mt-2 text-sm text-[#124d56]/50">
                                  No tour packages
                                  found.
                                </p>
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
                                  String(
                                    pkg.id
                                  ) ===
                                  String(
                                    form.tourPackage
                                  );

                                return (
                                  <button
                                    key={pkg.id}
                                    type="button"
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
                                          ? "bg-[#F58634]/10 text-[#F58634]"
                                          : "text-[#124d56]/80 hover:bg-[#F2FAFB]"
                                      }
                                    `}
                                  >
                                    <span className="truncate pr-4">
                                      {pkg.name}
                                    </span>

                                    {isSelected && (
                                      <span className="shrink-0 text-xs font-semibold">
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

                  {/* =================================================
                      REFERENCE
                  ================================================== */}

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-reference"
                    >
                      How Did You Hear About Us?
                    </label>

                    <SelectWrapper>
                      <select
                        id="car-enquiry-reference"
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

                  {/* =================================================
                      DETAILS
                  ================================================== */}

                  <div className="sm:col-span-2">
                    <label
                      className={labelClass}
                      htmlFor="car-enquiry-details"
                    >
                      Tell Us About Your Journey
                    </label>

                    <textarea
                      id="car-enquiry-details"
                      name="details"
                      rows={4}
                      value={form.details}
                      onChange={handleChange}
                      className={`
                        ${inputClass}
                        !h-auto
                        resize-none
                      `}
                      placeholder="Tell us where you'd like to go, places you want to visit, your preferred pace, budget range, or anything else we should know..."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

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
                    Share as much or as little as you
                    know. Our travel team will help
                    arrange the right vehicle and
                    travel experience.
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
                          size={18}
                          className="animate-spin"
                        />

                        Submitting...
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

              {/* FOOTER */}

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
          ) : (
            /* =================================================
               SUCCESS STATE
            ================================================== */

            <div
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
                <CheckCircle2 className="h-8 w-8 text-[#124d56]" />
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
                Thank you for reaching out to
                Times India Travels. Our travel team
                will review your enquiry and get back
                to you with a tailored journey.
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
