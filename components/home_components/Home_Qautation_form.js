"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PhoneInput from "react-phone-input-2";

import DatePicker from "react-datepicker";

import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Search,
  X,
  AlertCircle,
} from "lucide-react";

import CountrySelect from "../../utils/CountrySelect";

import {fetchTourPackagesDropDown,} from "../../features/Tour-packages/tour_Package_Dropdown_Slice";
import {createTourEnquiry} from "../../services/PublicApi";

export default function Home_Quotation_form() {
  const dispatch = useDispatch();

  const {
    packages: tourPackages,
    status: tourPackageStatus,
    error: tourPackageError,
  } = useSelector((state) => state.tourPackageDropdown);

  const initial = {
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

  const [isPackageDropdownOpen, setIsPackageDropdownOpen] =useState(false);
  const [packageSearch, setPackageSearch] = useState("");

  const packageDropdownRef = useRef(null);
  const packageSearchRef = useRef(null);
  const submitMessageRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user starts editing after a successful submission,
    // remove the success message.
    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }

    if (submitError) {
      setSubmitError("");
    }

    setForm((prev) => ({
      ...prev,
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

    setForm((prev) => ({
      ...prev,
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

    setForm((prev) => ({
      ...prev,
      nationality: value,
    }));
  };

  const handleDateChange = (date) => {
    if (!date) {
      setForm((prev) => ({
        ...prev,
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

    setForm((prev) => ({
      ...prev,
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
    setForm((prev) => ({
      ...prev,
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
    (pkg) => pkg.id === form.tourPackage
  );

  const filteredTourPackages = tourPackages.filter((pkg) => {
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

    // Prevent duplicate submission
    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    if (!form.name.trim()) {
      setSubmitStatus("error");
      setSubmitError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setSubmitStatus("error");
      setSubmitError("Please enter your email address.");
      return;
    }

    if (!form.phone.trim()) {
      setSubmitStatus("error");
      setSubmitError("Please enter your phone number.");
      return;
    }

    if (!form.tourPackage) {
      setSubmitStatus("error");
      setSubmitError("Please select a tour package.");
      return;
    }
    const enquiryData = {
      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      nationality: form.nationality || null,

      tourPackageId: form.tourPackage,

      travelDate: form.travelDate || null,

      // Backend schema expects Number
      duration: form.duration
        ? Number(form.duration)
        : null,

      // These remain STRING because backend accepts
      // values such as "10+"
      adults: form.adults || "1",

      children: form.children || "0",

      // IMPORTANT:
      // These values match your Mongoose enum exactly.
      hotelType: form.hotelType || null,

      reference: form.reference || null,

      details: form.details.trim() || null,
    };

    try {
      setIsSubmitting(true);
      setSubmitStatus("loading");

      const response = await createTourEnquiry(
        enquiryData
      );

      if (response?.success) {
        setSubmitStatus("success");

        setSubmitError("");

        // Reset form
        setForm(initialForm);

        // Reset package dropdown UI
        setIsPackageDropdownOpen(false);
        setPackageSearch("");

        return;
      }

      setSubmitStatus("error");

      setSubmitError(response?.message ||"Unable to submit your enquiry. Please try again.");
    } catch (error) {
      console.error(
        "Tour enquiry submission error:",
        error
      );

      setSubmitStatus("error");

      setSubmitError(error?.message ||"Something went wrong while submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryPackages = () => {
    dispatch(fetchTourPackagesDropDown());
  };

  const inputClass = `
    w-full
    h-[52px]
    rounded-xl
    border
    border-white/20
    bg-white/[0.08]
    px-4
    py-3
    text-sm
    text-white
    placeholder-white/45
    focus:outline-none
    focus:border-[#F58634]
    focus:ring-2
    focus:ring-[#F58634]/20
    focus:bg-white/[0.11]
    transition-all
    duration-300
  `;

  const labelClass = `
    block
    text-[11px]
    uppercase
    tracking-[0.12em]
    text-white/75
    mb-2
    font-['Inter']
    font-medium
  `;

  const selectClass = `
    w-full
    h-[52px]
    rounded-xl
    border
    border-white/20
    bg-white/[0.08]
    pl-4
    pr-12
    py-3
    text-sm
    text-white
    cursor-pointer
    appearance-none
    focus:outline-none
    focus:border-[#F58634]
    focus:ring-2
    focus:ring-[#F58634]/20
    focus:bg-white/[0.11]
    transition-all
    duration-300
  `;

  const SelectWrapper = ({ children }) => {
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
            text-white/60
          "
        />
      </div>
    );
  };

  const selectedTravelDate = form.travelDate
    ? new Date(
        `${form.travelDate}T00:00:00`
      )
    : null;

  return (
    <section
      id="quatation"
      className="
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        border-t
        border-[#C9A24B]/25
        bg-[#F2FAFB]
        px-6
        py-24
        md:px-14
      "
    >

      <img
        className="
          absolute
          inset-0
          h-full
          w-full
          scale-105
          object-cover
        "
        src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=85"
        alt="India travel"
      />

      <div className="absolute inset-0 bg-[#050B14]/40" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(18,77,86,0.18) 0%, rgba(18,77,86,0.12) 45%, rgba(18,77,86,0.28) 100%)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(245,134,52,0.08), transparent 30%), radial-gradient(circle at 85% 80%, rgba(30,165,190,0.08), transparent 30%)",
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-4xl
        "
      >
        <div className="mb-10 text-center">
          <span
            className="
              font-['Inter']
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#F58634]
            "
          >
            Plan Your Trip
          </span>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-[clamp(1.75rem,3.5vw,2.75rem)]
              font-medium
              text-white
            "
          >
            Get a Free, No-Obligation Quote
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              font-['Inter']
              text-[15px]
              leading-relaxed
              text-white/70
            "
          >
            Tell us roughly what you have in mind — we'll
            come back with a tailored itinerary, usually
            within one business day.
          </p>
        </div>

        <div
          className="
            mb-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-8
            gap-y-3
            font-['Inter']
            text-[12px]
            uppercase
            tracking-[0.06em]
            text-white/65
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
            100% Tailor-Made
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F58634]" />
            Solo Traveller Care
          </span>
        </div>

        {submitStatus === "success" && (
          <div
            ref={submitMessageRef}
            className="
              scroll-mt-24
              mb-6
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
              className="mt-0.5 shrink-0 text-emerald-300"
            />

            <div>
              <p className="font-['Inter'] text-sm font-semibold text-emerald-200">
                Enquiry submitted successfully!
              </p>

              <p className="mt-1 font-['Inter'] text-xs leading-relaxed text-emerald-200/70">
                Thank you for reaching out. Our travel team
                will get back to you with a tailored itinerary.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && submitError && (
          <div
           ref={submitMessageRef}
            className="
              scroll-mt-24
              mb-6
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
              className="mt-0.5 shrink-0 text-red-300"
            />

            <div>
              <p className="font-['Inter'] text-sm font-semibold text-red-200">
                Unable to submit enquiry
              </p>

              <p className="mt-1 font-['Inter'] text-xs leading-relaxed text-red-200/70">
                {submitError}
              </p>
            </div>
          </div>
        )}

        <form
          data-aos="zoom-in"
          data-aos-duration="2500"
          data-aos-once="true"
          onSubmit={handleSubmit}
          className="
            relative
            rounded-3xl
            border
            border-white/15
            bg-[#124d56]/30
            p-7
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            md:p-10
          "
        >
          {/* TOP HIGHLIGHT */}

          <div
            className="
              absolute
              left-10
              right-10
              top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-[#F58634]/50
              to-transparent
            "
          />

          <div
            className="
              grid
              grid-cols-1
              gap-x-6
              gap-y-6
              md:grid-cols-2
            "
          >
            <div>
              <label
                className={labelClass}
                htmlFor="name"
              >
                Name
              </label>

              <input
                id="name"
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
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
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
                htmlFor="phone"
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
                  id: "phone",
                  required: true,
                  autoComplete: "tel",
                }}
                containerClass="!w-full"
                inputClass="
                  !h-[52px]
                  !w-full
                  !rounded-xl
                  !border
                  !border-white/20
                  !bg-white/[0.08]
                  !pl-[52px]
                  !pr-4
                  !text-sm
                  !text-white
                  focus:!border-[#F58634]
                  focus:!bg-white/[0.11]
                  focus:!ring-2
                  focus:!ring-[#F58634]/20
                "
                buttonClass="
                  !rounded-l-xl
                  !border-white/20
                  !bg-white/[0.08]
                  hover:!bg-white/[0.12]
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
                htmlFor="nationality"
              >
                Nationality
              </label>

              <div className="quotation-country-select">
                <CountrySelect
                  value={form.nationality}
                  onChange={handleNationalityChange}
                  name="nationality"
                  placeholder="Select your nationality"
                />
              </div>
            </div>

            <div>
              <label
                className={labelClass}
                htmlFor="duration"
              >
                Duration of Travel
              </label>

              <input
                id="duration"
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
                  text-white/45
                "
              >
                Enter number of days
              </p>
            </div>

            <div>
              <label
                className={labelClass}
                htmlFor="travelDate"
              >
                Travel Date
              </label>

              <div className="relative w-full">
                <DatePicker
                  id="travelDate"
                  selected={selectedTravelDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  wrapperClassName="w-full"
                  disabled={isSubmitting}
                  className={`
                    ${inputClass}
                    h-14!
                    px-4!
                    pr-12!
                    text-[15px]!
                    cursor-text
                  `}
                  popperPlacement="bottom-start"
                  showPopperArrow={false}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    changeMonth,
                    changeYear,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => {
                    const currentYear =
                      new Date().getFullYear();

                    const years = Array.from(
                      { length: 15 },
                      (_, index) =>
                        currentYear + index
                    );

                    const months = [
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

                    return (
                      <div className="quotation-datepicker-header">
                        {/* LEFT ARROW */}

                        <button
                          type="button"
                          onClick={decreaseMonth}
                          disabled={
                            prevMonthButtonDisabled
                          }
                          className="
                            quotation-datepicker-nav
                            quotation-datepicker-nav-left
                          "
                          aria-label="Previous month"
                        >
                          <span>‹</span>
                        </button>

                        {/* MONTH + YEAR */}

                        <div className="quotation-datepicker-selects">
                          {/* MONTH */}

                          <div className="quotation-datepicker-select-wrapper">
                            <select
                              value={date.getMonth()}
                              onChange={(e) =>
                                changeMonth(
                                  Number(
                                    e.target.value
                                  )
                                )
                              }
                              className="quotation-datepicker-select"
                              aria-label="Select month"
                            >
                              {months.map(
                                (
                                  month,
                                  index
                                ) => (
                                  <option
                                    key={month}
                                    value={index}
                                  >
                                    {month}
                                  </option>
                                )
                              )}
                            </select>

                            <ChevronDown
                              size={14}
                              strokeWidth={2}
                            />
                          </div>

                          {/* YEAR */}

                          <div className="quotation-datepicker-select-wrapper year">
                            <select
                              value={date.getFullYear()}
                              onChange={(e) =>
                                changeYear(
                                  Number(
                                    e.target.value
                                  )
                                )
                              }
                              className="quotation-datepicker-select"
                              aria-label="Select year"
                            >
                              {years.map(
                                (year) => (
                                  <option
                                    key={year}
                                    value={year}
                                  >
                                    {year}
                                  </option>
                                )
                              )}
                            </select>

                            <ChevronDown
                              size={14}
                              strokeWidth={2}
                            />
                          </div>
                        </div>

                        {/* RIGHT ARROW */}

                        <button
                          type="button"
                          onClick={increaseMonth}
                          disabled={
                            nextMonthButtonDisabled
                          }
                          className="
                            quotation-datepicker-nav
                            quotation-datepicker-nav-right
                          "
                          aria-label="Next month"
                        >
                          <span>›</span>
                        </button>
                      </div>
                    );
                  }}
                  autoComplete="off"
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
                    text-white/55
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  font-['Inter']
                  text-[10px]
                  text-white/45
                "
              >
                Select your preferred travel date
              </p>
            </div>

            <div>
              <label
                className={labelClass}
                htmlFor="adults"
              >
                Adults
              </label>

              <SelectWrapper>
                <select
                  id="adults"
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
                      value={String(number)}
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
                htmlFor="children"
              >
                Children
              </label>

              <SelectWrapper>
                <select
                  id="children"
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
                      value={String(number)}
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
                htmlFor="tourPackage"
              >
                Tour Package
              </label>

              <button
                type="button"
                id="tourPackage"
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
                    (prev) => !prev
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
                  border-white/20
                  bg-white/8
                  px-4
                  text-left
                  text-sm
                  transition-all
                  duration-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#F58634]/20
                  ${
                    isPackageDropdownOpen
                      ? "border-[#F58634] bg-white/11"
                      : "hover:bg-white/11"
                  }
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                `}
              >
                <span
                  className={
                    selectedPackage
                      ? "text-white"
                      : "text-white/45"
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
                      text-white/60
                    "
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    strokeWidth={1.8}
                    className={`
                      shrink-0
                      text-white/60
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

                  <div className="border-b border-white/10 p-3">
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
                        ref={packageSearchRef}
                        type="text"
                        value={packageSearch}
                        onChange={(e) =>
                          setPackageSearch(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
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

                        Loading tour packages...
                      </div>
                    )}

                    {/* ERROR */}

                    {tourPackageStatus ===
                      "failed" && (
                      <div className="px-4 py-6 text-center">
                        <AlertCircle
                          size={22}
                          className="mx-auto text-red-300/70"
                        />

                        <p className="mt-2 text-sm text-red-300">
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
                        <div className="px-4 py-8 text-center">
                          <Search
                            size={22}
                            className="mx-auto text-white/25"
                          />

                          <p className="mt-2 text-sm text-white/50">
                            No tour packages found.
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

            <div>
              <label
                className={labelClass}
                htmlFor="hotelType"
              >
                Type of Hotel
              </label>

              <SelectWrapper>
                <select
                  id="hotelType"
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

            <div className="md:col-span-2">
              <label
                className={labelClass}
                htmlFor="reference"
              >
                How Did You Hear About Us?
              </label>

              <SelectWrapper>
                <select
                  id="reference"
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

            <div className="md:col-span-2">
              <label
                className={labelClass}
                htmlFor="details"
              >
                Rough Itinerary & Details
              </label>

              <textarea
                id="details"
                name="details"
                rows={4}
                value={form.details}
                onChange={handleChange}
                className={`
                  ${inputClass}
                  h-auto!
                  resize-none
                `}
                placeholder="Tell us a little about what you're picturing — places you want to see, pace, budget range, anything helpful."
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex
                min-w-55
                cursor-pointer
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#F58634]
                px-10
                py-4
                font-['Inter']
                text-sm
                font-semibold
                tracking-wide
                text-white
                transition-all
                duration-300
                hover:bg-[#D9701F]
                hover:shadow-[0_10px_30px_rgba(245,134,52,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-70
                disabled:hover:bg-[#F58634]
                disabled:hover:shadow-none
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
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle2 size={18} />

                  Request Submitted
                </>
              ) : (
                <>
                  Submit Your Request

                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
