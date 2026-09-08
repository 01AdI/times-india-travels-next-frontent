"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";


import CountrySelect from "../../utils/CountrySelect";

import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import {
  fetchTourPackagesDropDown,
} from "../../features/Tour-packages/tour_Package_Dropdown_Slice";

import { createTourEnquiry } from "../../services/PublicApi";


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
  (_, index) => CURRENT_YEAR + index,
);

const INITIAL_FORM = {
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


export default function Contact_Us_Form() {
  const dispatch = useDispatch();

  const {
    packages: tourPackages,
    status: tourPackageStatus,
    error: tourPackageError,
  } = useSelector((state) => state.tourPackageDropdown,);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isPackageDropdownOpen, setIsPackageDropdownOpen] =useState(false);

  const [packageSearch, setPackageSearch] = useState("");

  const packageDropdownRef = useRef(null);
  const packageSearchRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] =useState("idle");

  const [submitError, setSubmitError] = useState("");

  const submitMessageRef = useRef(null);

  useEffect(() => {
    if (tourPackageStatus === "idle") {
      dispatch(fetchTourPackagesDropDown());
    }
  }, [dispatch, tourPackageStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        packageDropdownRef.current &&
        !packageDropdownRef.current.contains(event.target)
      ) {
        setIsPackageDropdownOpen(false);
        setPackageSearch("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
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
    if (
      submitStatus === "success" ||
      submitStatus === "error"
    ) {
      requestAnimationFrame(() => {
        submitMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone) => {
    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }

    setFormData((previous) => ({
      ...previous,
      phone,
    }));
  };

  const handleNationalityChange = (value) => {
    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }

    setFormData((previous) => ({
      ...previous,
      nationality: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (!date) {
      setFormData((previous) => ({
        ...previous,
        travelDate: "",
      }));

      return;
    }

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0");

    const day = String(
      date.getDate(),
    ).padStart(2, "0");

    setFormData((previous) => ({
      ...previous,
      travelDate: `${year}-${month}-${day}`,
    }));

    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const handlePackageSelect = (pkg) => {
    setFormData((previous) => ({
      ...previous,
      tourPackage: pkg.id,
    }));

    setIsPackageDropdownOpen(false);
    setPackageSearch("");

    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const selectedPackage = tourPackages.find(
    (pkg) => pkg.id === formData.tourPackage,
  );

  const filteredTourPackages =
    tourPackages.filter((pkg) => {
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
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Prevent duplicate submission */

    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    if (!formData.name.trim()) {
      setSubmitStatus("error");
      setSubmitError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setSubmitStatus("error");
      setSubmitError(
        "Please enter your email address.",
      );
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitStatus("error");
      setSubmitError(
        "Please enter your phone number.",
      );
      return;
    }

    if (!formData.tourPackage) {
      setSubmitStatus("error");
      setSubmitError(
        "Please select a tour package.",
      );
      return;
    }

    const enquiryData = {
      name: formData.name.trim(),

      email: formData.email.trim(),

      phone: formData.phone.trim(),

      nationality:
        formData.nationality || null,

      tourPackageId:
        formData.tourPackage,

      travelDate:
        formData.travelDate || null,

      // Backend expects Number
      duration: formData.duration
        ? Number(formData.duration)
        : null,

      // Backend accepts values such as "10+"
      adults:
        formData.adults || "1",

      children:
        formData.children || "0",

      hotelType:
        formData.hotelType || null,

      reference:
        formData.reference || null,

      details:
        formData.details.trim() || null,
    };

    try {
      setIsSubmitting(true);
      setSubmitStatus("loading");

      const response =
        await createTourEnquiry(
          enquiryData,
        );

      if (response?.success) {
        setSubmitStatus("success");

        setSubmitError("");

        /* Reset form */

        setFormData(INITIAL_FORM);

        setSelectedDate(null);

        /* Reset package dropdown */

        setIsPackageDropdownOpen(false);
        setPackageSearch("");

        return;
      }

      setSubmitStatus("error");

      setSubmitError(
        response?.message ||
          "Unable to submit your enquiry. Please try again.",
      );
    } catch (error) {
      console.error(
        "Tour enquiry submission error:",
        error,
      );

      setSubmitStatus("error");

      setSubmitError(
        error?.message ||
          "Something went wrong while submitting your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryPackages = () => {
    dispatch(fetchTourPackagesDropDown());
  };

  return (
    <section
      id="plan-your-journey"
      className="
        relative
        overflow-hidden
        bg-[#0B3C49]
        px-4
        py-13
        sm:px-6
        sm:py-13
        lg:px-8
        lg:py-15
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-150
          w-150
          rounded-full
          bg-[#F58634]/6
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-60
          -left-40
          h-125
          w-125
          rounded-full
          bg-[#F2FAFB]/4
          blur-[100px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-337.5
          overflow-hidden
          rounded-4xl
          border
          border-white/10
          bg-[#082F39]
          shadow-[0_40px_120px_rgba(0,0,0,0.28)]
        "
      >
        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

          <div
            className="
              relative
              min-h-130
              overflow-hidden
              lg:min-h-225
            "
          >
            <img
              src="https://i.pinimg.com/736x/ea/3b/aa/ea3baa720fabc7eceb9705826f139f97.jpg"
              alt="India travel"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-linear-to-t
                from-[#071F27]
                via-[#0B3C49]/35
                to-[#0B3C49]/10
              "
            />

            {/* SECONDARY IMAGE */}

            <div
              className="
                absolute
                right-6
                top-6
                hidden
                h-44
                w-32
                overflow-hidden
                rounded-2xl
                border
                border-white/20
                shadow-2xl
                sm:block
                lg:right-8
                lg:top-8
                lg:h-52
                lg:w-36
              "
            >
              <img
                src="https://i.pinimg.com/736x/33/71/0d/33710db2c6f74435a4b94b4929a08b40.jpg"
                alt="India destination"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

              <div className="absolute inset-0 bg-[#0B3C49]/20" />
            </div>

            {/* EDITORIAL CONTENT */}

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-7
                sm:p-10
                lg:p-12
              "
            >
              <div className="mb-6 flex items-center gap-4">
                <span
                  className="
                    font-['Fraunces']
                    text-xl
                    italic
                    text-[#F58634]
                  "
                >
                  Begin here
                </span>

                <span className="h-px w-12 bg-white/25" />

                <span
                  className="
                    font-['Inter']
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-white/60
                  "
                >
                  Your India
                </span>
              </div>

              <h2
                className="
                  max-w-md
                  font-['Fraunces']
                  text-5xl
                  font-medium
                  leading-[0.94]
                  tracking-[-0.04em]
                  text-white
                  sm:text-6xl
                "
              >
                Plan a journey

                <span className="block italic text-[#F58634]">
                  worth remembering.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-sm
                  font-['Inter']
                  text-sm
                  leading-7
                  text-white/65
                "
              >
                Tell us what you have in mind. We'll
                shape the details around the way you
                want to experience India.
              </p>

              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  font-['Inter']
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-white/6
                  "
                >
                  <MapPin
                    className="
                      h-3.5
                      w-3.5
                      text-[#F58634]
                    "
                  />
                </span>

                Rajasthan · Kerala · Kashmir · Beyond
              </div>
            </div>
          </div>

          <div
            className="
              relative
              flex
              flex-col
              justify-center
              px-6
              py-12
              sm:px-10
              sm:py-14
              md:px-14
              lg:px-16
              xl:px-20
            "
          >
            <div className="mb-8 flex items-center justify-between">
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

                <span className="h-px w-10 bg-white/15" />

                <span
                  className="
                    font-['Inter']
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-white/45
                  "
                >
                  Travel Enquiry
                </span>
              </div>

              <Sparkles
                className="
                  h-4
                  w-4
                  text-[#F58634]
                "
              />
            </div>

            <h3
              className="
                max-w-xl
                font-['Fraunces']
                text-4xl
                font-medium
                leading-[0.98]
                tracking-[-0.035em]
                text-white
                sm:text-5xl
              "
            >
              Tell us about

              <span className="block italic text-[#F58634]">
                your journey.
              </span>
            </h3>

            <p
              className="
                mt-5
                max-w-lg
                font-['Inter']
                text-sm
                leading-7
                text-white/55
              "
            >
              A few details are all we need to start
              designing your perfect Indian escape.
            </p>

            {submitStatus === "success" && (
              <div
                ref={submitMessageRef}
                className="
                  scroll-mt-24
                  mt-8
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-400/20
                  bg-emerald-500/10
                  px-5
                  py-4
                  backdrop-blur-md
                "
              >
                <CheckCircle2
                  size={20}
                  className="
                    mt-0.5
                    shrink-0
                    text-emerald-300
                  "
                />

                <div>
                  <p
                    className="
                      font-['Inter']
                      text-sm
                      font-semibold
                      text-emerald-200
                    "
                  >
                    Enquiry submitted successfully!
                  </p>

                  <p
                    className="
                      mt-1
                      font-['Inter']
                      text-xs
                      leading-relaxed
                      text-emerald-200/70
                    "
                  >
                    Thank you for reaching out. Our
                    travel team will get back to you
                    with a tailored itinerary.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" &&
              submitError && (
                <div
                  ref={submitMessageRef}
                  className="
                    scroll-mt-24
                    mt-8
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-red-400/20
                    bg-red-500/10
                    px-5
                    py-4
                    backdrop-blur-md
                  "
                >
                  <AlertCircle
                    size={20}
                    className="
                      mt-0.5
                      shrink-0
                      text-red-300
                    "
                  />

                  <div>
                    <p
                      className="
                        font-['Inter']
                        text-sm
                        font-semibold
                        text-red-200
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
                        text-red-200/70
                      "
                    >
                      {submitError}
                    </p>
                  </div>
                </div>
              )}

            <form
              onSubmit={handleSubmit}
              className="mt-10"
            >
              <div className="mb-5">
                <p
                  className="
                    font-['Inter']
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#F58634]
                  "
                >
                  Your details
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* NAME */}

                <Field
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  icon={<UserRound />}
                  disabled={isSubmitting}
                />

                {/* EMAIL */}

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  icon={<Mail />}
                  disabled={isSubmitting}
                />

                {/* PHONE */}

                <PhoneField
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={isSubmitting}
                />

                {/* NATIONALITY */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white/45
                    "
                  >
                    Nationality
                  </label>

                  <div
                    className="
                      quotation-country-select
                      quotation-country-select--dark
                    "
                  >
                    <CountrySelect
                      value={formData.nationality}
                      onChange={
                        handleNationalityChange
                      }
                      name="nationality"
                      placeholder="Select nationality"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5 mt-10">
                <p
                  className="
                    font-['Inter']
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#F58634]
                  "
                >
                  Your journey
                </p>
              </div>

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                {/* DURATION */}

                <Field
                  label="Duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  icon={<Clock3 />}
                  disabled={isSubmitting}
                />

                {/* DATE */}

                <DateField
                  value={selectedDate}
                  onChange={handleDateChange}
                  disabled={isSubmitting}
                />

                {/* ADULTS */}

                <SelectField
                  label="Adults"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  options={[
                    ...Array.from(
                      { length: 10 },
                      (_, index) => ({
                        value: String(index + 1),
                        label: String(index + 1),
                      }),
                    ),
                    {
                      value: "10+",
                      label: "10+",
                    },
                  ]}
                />

                {/* CHILDREN */}

                <SelectField
                  label="Children"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  options={[
                    ...Array.from(
                      { length: 7 },
                      (_, index) => ({
                        value: String(index),
                        label: String(index),
                      }),
                    ),
                    {
                      value: "6+",
                      label: "6+",
                    },
                  ]}
                />
              </div>

              <div className="mb-5 mt-10">
                <p
                  className="
                    font-['Inter']
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#F58634]
                  "
                >
                  Preferences
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div
                  ref={packageDropdownRef}
                  className="relative"
                >
                  <label
                    className="
                      mb-2
                      block
                      font-['Inter']
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white/45
                    "
                  >
                    Tour Package
                  </label>

                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={
                      isPackageDropdownOpen
                    }
                    disabled={isSubmitting}
                    onClick={() => {
                      if (
                        tourPackageStatus ===
                        "loading"
                      ) {
                        return;
                      }

                      setIsPackageDropdownOpen(
                        (previous) => !previous,
                      );
                    }}
                    className={`
                      flex
                      h-14
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/13
                      bg-white/5.5
                      px-4
                      text-left
                      font-['Inter']
                      text-[11px]
                      transition-all
                      duration-300
                      outline-none
                      ${
                        isPackageDropdownOpen
                          ? "border-[#F58634]/70 bg-white/8"
                          : "hover:border-white/25 hover:bg-white/[0.07]"
                      }
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    `}
                  >
                    <span
                      className={
                        selectedPackage
                          ? "text-white"
                          : "text-white/30"
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
                      <span
                        className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-white/20
                          border-t-[#F58634]
                        "
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className={`
                          shrink-0
                          text-white/45
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
                        border-white/15
                        bg-[#07111f]
                        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
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
                            size={15}
                            className="
                              pointer-events-none
                              absolute
                              left-3
                              top-1/2
                              -translate-y-1/2
                              text-white/35
                            "
                          />

                          <input
                            ref={packageSearchRef}
                            type="text"
                            value={packageSearch}
                            onChange={(e) =>
                              setPackageSearch(
                                e.target.value,
                              )
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "Escape"
                              ) {
                                setIsPackageDropdownOpen(
                                  false,
                                );

                                setPackageSearch("");
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
                              font-['Inter']
                              text-xs
                              text-white
                              outline-none
                              placeholder:text-white/30
                              focus:border-[#F58634]/60
                              focus:bg-white/8
                            "
                          />

                          {packageSearch && (
                            <button
                              type="button"
                              onClick={() =>
                                setPackageSearch("")
                              }
                              className="
                                absolute
                                right-2
                                top-1/2
                                flex
                                h-7
                                w-7
                                -translate-y-1/2
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

                      {/* PACKAGE LIST */}

                      <div
                        className="
                          max-h-60
                          overflow-y-auto
                          overscroll-contain
                          py-1
                        "
                        role="listbox"
                      >
                        {/* ERROR */}

                        {tourPackageStatus ===
                          "failed" && (
                          <div className="px-4 py-7 text-center">
                            <AlertCircle
                              size={21}
                              className="
                                mx-auto
                                text-red-300/70
                              "
                            />

                            <p
                              className="
                                mt-2
                                font-['Inter']
                                text-xs
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
                                rounded-lg
                                border
                                border-white/15
                                px-3
                                py-2
                                font-['Inter']
                                text-[10px]
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
                            <div className="px-4 py-8 text-center">
                              <Search
                                size={21}
                                className="
                                  mx-auto
                                  text-white/20
                                "
                              />

                              <p
                                className="
                                  mt-2
                                  font-['Inter']
                                  text-xs
                                  text-white/45
                                "
                              >
                                No tour packages found.
                              </p>

                              {packageSearch && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPackageSearch("")
                                  }
                                  className="
                                    mt-2
                                    font-['Inter']
                                    text-[10px]
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
                                formData.tourPackage;

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
                                      pkg,
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
                                    font-['Inter']
                                    text-xs
                                    transition
                                    duration-200
                                    ${
                                      isSelected
                                        ? "bg-[#F58634]/15 text-[#F58634]"
                                        : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                                    }
                                  `}
                                >
                                  <span className="pr-4">
                                    {pkg.name}
                                  </span>

                                  {isSelected && (
                                    <span className="shrink-0 font-semibold">
                                      ✓
                                    </span>
                                  )}
                                </button>
                              );
                            },
                          )}
                      </div>
                    </div>
                  )}
                </div>

                <SelectField
                  label="Type of Hotel"
                  name="hotelType"
                  value={formData.hotelType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  options={[
                    {
                      value:
                        "Heritage Hotel",
                      label:
                        "Heritage Hotel",
                    },
                    {
                      value:
                        "5 Star Luxury",
                      label:
                        "5 Star Luxury",
                    },
                    {
                      value: "4 Star",
                      label: "4 Star",
                    },
                    {
                      value: "3 Star",
                      label: "3 Star",
                    },
                  ]}
                />

                <div className="sm:col-span-2">
                  <SelectField
                    label="How Did You Hear About Us?"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    options={[
                      {
                        value: "google",
                        label:
                          "Google Search",
                      },
                      {
                        value: "tripadvisor",
                        label:
                          "TripAdvisor",
                      },
                      {
                        value: "referral",
                        label:
                          "Friend / Family Referral",
                      },
                      {
                        value: "social",
                        label:
                          "Social Media",
                      },
                      {
                        value: "other",
                        label: "Other",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="
                    mb-2
                    block
                    font-['Inter']
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-white/45
                  "
                >
                  Rough Itinerary & Details
                </label>

                <div className="relative">
                  <MessageSquare
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-4
                      h-4
                      w-4
                      text-[#F58634]
                    "
                  />

                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    disabled={isSubmitting}
                    placeholder="Tell us a little about what you're picturing — places you want to see, pace, budget range, anything helpful."
                    className="
                      min-h-27.5
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/13
                      bg-white/5.5
                      px-4
                      py-4
                      pl-11
                      font-['Inter']
                      text-[11px]
                      leading-6
                      text-white
                      outline-none
                      placeholder:text-white/30
                      transition-all
                      duration-300
                      hover:border-white/25
                      hover:bg-white/[0.07]
                      focus:border-[#F58634]/70
                      focus:bg-white/8
                      focus:ring-1
                      focus:ring-[#F58634]/20
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>
              </div>

              <div
                className="
                  mt-9
                  flex
                  flex-col
                  gap-6
                  border-t
                  border-white/10
                  pt-7
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      font-['Inter']
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    No obligation
                  </p>

                  <p
                    className="
                      mt-1
                      font-['Inter']
                      text-[10px]
                      text-white/40
                    "
                  >
                    We'll respond with your
                    personalised options.
                  </p>
                </div>

                {/* CTA */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    relative
                    inline-flex
                    h-14
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    gap-4
                    overflow-hidden
                    rounded-full
                    bg-[#F58634]
                    px-7
                    font-['Inter']
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#0B3C49]
                    shadow-[0_15px_40px_rgba(245,134,52,0.20)]
                    transition-all
                    duration-500
                    hover:scale-[1.03]
                    hover:shadow-[0_20px_55px_rgba(245,134,52,0.32)]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    disabled:hover:scale-100
                    disabled:hover:shadow-[0_15px_40px_rgba(245,134,52,0.20)]
                  "
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="
                          h-4
                          w-4
                          animate-spin
                          rounded-full
                          border-2
                          border-[#0B3C49]/25
                          border-t-[#0B3C49]
                        "
                      />

                      <span className="relative z-10">
                        Submitting...
                      </span>
                    </>
                  ) : submitStatus ===
                    "success" ? (
                    <>
                      <CheckCircle2
                        className="
                          relative
                          z-10
                          h-4
                          w-4
                        "
                      />

                      <span className="relative z-10">
                        Request Submitted
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">
                        Request My Quote
                      </span>

                      <span
                        className="
                          relative
                          z-10
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-[#0B3C49]
                          text-[#F58634]
                          transition-transform
                          duration-500
                          group-hover:translate-x-1
                        "
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5"
                        />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-7 text-center">
              <p
                className="
                  font-['Inter']
                  text-[9px]
                  uppercase
                  tracking-[0.12em]
                  text-white/25
                "
              >
                Personalised planning · No obligation ·
                India travel specialists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
  disabled = false,
  min,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          font-['Inter']
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/45
        "
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              z-10
              flex
              h-4
              w-4
              -translate-y-1/2
              items-center
              justify-center
              text-[#F58634]
            "
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          min={min}
          className={`
            h-14
            w-full
            rounded-xl
            border
            border-white/13
            bg-white/5.5
            px-4
            ${icon ? "pl-11" : ""}
            font-['Inter']
            text-[11px]
            font-medium
            text-white
            outline-none
            placeholder:text-white/30
            transition-all
            duration-300
            hover:border-white/25
            hover:bg-white/[0.07]
            focus:border-[#F58634]/70
            focus:bg-white/8
            focus:ring-1
            focus:ring-[#F58634]/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          `}
        />
      </div>
    </div>
  );
}

function PhoneField({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          font-['Inter']
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/45
        "
      >
        Phone Number
      </label>

      <PhoneInput
        country="in"
        value={value}
        onChange={onChange}
        enableSearch
        searchPlaceholder="Search country..."
        placeholder="Enter phone number"
        disabled={disabled}
        inputProps={{
          name: "phone",
          id: "phone",
          required: true,
          autoComplete: "tel",
        }}
        containerClass="!w-full"
        inputClass="
          !w-full
          !h-14
          !rounded-xl
          !border
          !border-white/[0.13]
          !bg-white/[0.055]
          !text-white
          !text-[11px]
          !font-medium
          !pl-[52px]
          !pr-4
          placeholder:!text-white/30
          focus:!border-[#F58634]/70
          focus:!bg-white/[0.08]
          focus:!ring-1
          focus:!ring-[#F58634]/20
          disabled:!cursor-not-allowed
          disabled:!opacity-60
        "
        buttonClass="
          !rounded-l-xl
          !border-white/[0.13]
          !bg-white/[0.055]
          hover:!bg-white/[0.08]
        "
        dropdownClass="
          !bg-[#07111f]
          !text-white
        "
        searchClass="
          !bg-[#07111f]
          !text-white
        "
      />
    </div>
  );
}

function DateField({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          font-['Inter']
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/45
        "
      >
        Travel Date
      </label>

      <div className="relative">
        <CalendarDays
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            z-20
            h-4
            w-4
            -translate-y-1/2
            text-white/45
          "
        />

        <DatePicker
          selected={value}
          onChange={onChange}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd/mm/yyyy"
          wrapperClassName="w-full"
          disabled={disabled}
          popperClassName="quotation-datepicker-popper"
          calendarClassName="quotation-datepicker"
          popperPlacement="bottom-start"
          showPopperArrow={false}
          autoComplete="off"
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => {
            return (
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
                  onClick={decreaseMonth}
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
                    text-xl
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
                  ‹
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
                            event.target.value,
                          ),
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
                        (month, index) => (
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
                        ),
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
                      value={date.getFullYear()}
                      onChange={(event) =>
                        changeYear(
                          Number(
                            event.target.value,
                          ),
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
                        ),
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
                  onClick={increaseMonth}
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
                    text-xl
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
                  ›
                </button>
              </div>
            );
          }}
          customInput={
            <input
              className="
                h-14
                w-full
                cursor-pointer
                rounded-xl
                border
                border-white/13
                bg-white/5.5
                px-4
                pr-11
                font-['Inter']
                text-[11px]
                font-medium
                text-white
                outline-none
                placeholder:text-white/30
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white/[0.07]
                focus:border-[#F58634]/70
                focus:bg-white/8
                focus:ring-1
                focus:ring-[#F58634]/20
              "
            />
          }
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          font-['Inter']
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-white/45
        "
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            h-14
            w-full
            cursor-pointer
            appearance-none
            rounded-xl
            border
            border-white/13
            bg-white/5.5
            px-4
            pr-11
            font-['Inter']
            text-[11px]
            font-medium
            text-white
            outline-none
            transition-all
            duration-300
            hover:border-white/25
            hover:bg-white/[0.07]
            focus:border-[#F58634]/70
            focus:bg-white/8
            focus:ring-1
            focus:ring-[#F58634]/20
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <option
            value=""
            className="
              bg-[#07111f]
              text-white
            "
          >
            Select
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="
                bg-[#07111f]
                text-white
              "
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-white/45
          "
        />
      </div>
    </div>
  );
}
