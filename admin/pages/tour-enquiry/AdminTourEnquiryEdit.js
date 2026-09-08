import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  Mail,
  Phone,
  Globe2,
  Package,
  CalendarDays,
  Clock3,
  Users,
  Hotel,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import {
  getTourEnquiry,
  updateTourEnquiry,
} from "../../services/adminApi";

const ADULT_OPTIONS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];

const CHILDREN_OPTIONS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "6+",
];

const HOTEL_OPTIONS = [
  {
    value: "",
    label: "Select hotel preference",
  },
  {
    value: "budget",
    label: "Budget",
  },
  {
    value: "3-star",
    label: "3 Star",
  },
  {
    value: "4-star",
    label: "4 Star",
  },
  {
    value: "5-star",
    label: "5 Star",
  },
  {
    value: "luxury",
    label: "Luxury",
  },
];

function FormField({
  label,
  icon: Icon,
  required = false,
  children,
  description,
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] font-medium text-[#68717D]">
        {Icon && (
          <Icon
            size={13}
            strokeWidth={1.5}
          />
        )}

        {label}

        {required && (
          <span className="text-red-500">*</span>
        )}
      </label>

      <div className="mt-2">
        {children}
      </div>

      {description && (
        <p className="mt-1.5 text-[10px] text-[#9AA1AA]">
          {description}
        </p>
      )}
    </div>
  );
}

const inputClass ="w-full h-11 px-3.5 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none placeholder:text-[#A6ADB5] focus:border-[#C9A24B] focus:bg-white transition-all";

const selectClass ="w-full h-11 px-3.5 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] focus:bg-white transition-all cursor-pointer";

const textareaClass ="w-full min-h-[130px] px-3.5 py-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none placeholder:text-[#A6ADB5] focus:border-[#C9A24B] focus:bg-white transition-all resize-y";

function formatDateForInput(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();

  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminTourEnquiryEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [enquiry, setEnquiry] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    tourPackageId: "",
    travelDate: "",
    duration: "",
    adults: "",
    children: "",
    hotelType: "",
    reference: "",
    details: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error(
            "Tour enquiry ID is missing."
          );
        }

        const response =
          await getTourEnquiry(id);

        const data =
          response.enquiry || response;

        if (!data) {
          throw new Error(
            "Tour enquiry not found."
          );
        }

        setEnquiry(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          nationality:
            data.nationality || "",
          tourPackageId:
            data.tourPackageId || "",
          travelDate:
            formatDateForInput(
              data.travelDate
            ),
          duration:
            data.duration || "",
          adults:
            data.adults !== undefined &&
            data.adults !== null
              ? String(data.adults)
              : "",
          children:
            data.children !== undefined &&
            data.children !== null
              ? String(data.children)
              : "",
          hotelType:
            data.hotelType || "",
          reference:
            data.reference || "",
          details:
            data.details || "",
        });
      } catch (error) {
        console.error(
          "Failed to fetch tour enquiry:",
          error
        );

        setError(
          error.message ||
            "Unable to load tour enquiry."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!id) {
      setError(
        "Tour enquiry ID is missing."
      );

      return;
    }

    if (!formData.name.trim()) {
      setError(
        "Customer name is required."
      );

      return;
    }

    if (!formData.email.trim()) {
      setError(
        "Customer email is required."
      );

      return;
    }

    if (!formData.phone.trim()) {
      setError(
        "Customer phone is required."
      );

      return;
    }

    if (!formData.nationality.trim()) {
      setError(
        "Nationality is required."
      );

      return;
    }

    if (!formData.tourPackageId.trim()) {
      setError(
        "Tour package is required."
      );

      return;
    }

    if (!formData.travelDate) {
      setError(
        "Travel date is required."
      );

      return;
    }

    if (!formData.duration.trim()) {
      setError(
        "Duration is required."
      );

      return;
    }

    if (!formData.adults) {
      setError(
        "Number of adults is required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: formData.name.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        nationality:
          formData.nationality.trim(),

        tourPackageId:
          formData.tourPackageId.trim(),

        travelDate:
          formData.travelDate,

        duration:
          formData.duration.trim(),

        adults:
          String(formData.adults),

        children:
          String(formData.children || "0"),

        hotelType:
          formData.hotelType.trim(),

        reference:
          formData.reference.trim(),

        details:
          formData.details.trim(),
      };

      const response =
        await updateTourEnquiry(
          id,
          payload
        );

      const updatedEnquiry =
        response.enquiry || response;

      setEnquiry(updatedEnquiry);

      setSuccess(
        "Tour enquiry updated successfully."
      );

      setTimeout(() => {
        navigate(
          `/tour-enquiries/${id}`
        );
      }, 900);
    } catch (error) {
      console.error(
        "Failed to update tour enquiry:",
        error
      );

      setError(
        error.message ||
          "Unable to update tour enquiry."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-125 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

          <p className="mt-4 text-sm text-[#7A828D]">
            Loading enquiry...
          </p>
        </div>
      </section>
    );
  }

  if (!enquiry && error) {
    return (
      <section className="space-y-6">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/tour-enquiries"
            )
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
        >
          <ArrowLeft size={14} />

          Back to enquiries
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-5 flex items-start gap-3">
          <AlertCircle
            size={18}
            className="text-red-500 shrink-0 mt-0.5"
          />

          <div>
            <p className="text-sm font-medium text-red-700">
              Unable to load enquiry
            </p>

            <p className="mt-1 text-xs text-red-600">
              {error}
            </p>
          </div>
        </div>

      </section>
    );
  }

  return (
    <section className="space-y-6 pb-10">

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/tour-enquiries/${id}`
              )
            }
            className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
          >
            <ArrowLeft size={14} />

            Back to enquiry
          </button>

          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
            Enquiry Management
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
            Edit Tour Enquiry
          </h2>

          <p className="mt-2 text-sm text-[#7A828D]">
            Update customer and travel
            information for this enquiry.
          </p>

        </div>

        {/* ENQUIRY ID */}

        <div className="text-left lg:text-right">

          <p className="text-[9px] uppercase tracking-[0.14em] text-[#9AA1AA]">
            Enquiry ID
          </p>

          <p className="mt-1 text-xs font-mono text-[#68717D]">
            {enquiry?._id || id}
          </p>

        </div>

      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">

          <AlertCircle
            size={17}
            className="text-red-500 shrink-0 mt-0.5"
          />

          <p className="text-sm text-red-600">
            {error}
          </p>

        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3">

          <CheckCircle2
            size={17}
            className="text-emerald-500 shrink-0 mt-0.5"
          />

          <p className="text-sm text-emerald-600">
            {success}
          </p>

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-[#101A2E]/8">

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
              Customer
            </p>

            <h3 className="mt-1 text-sm font-medium text-[#101A2E]">
              Customer Information
            </h3>

          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}

            <FormField
              label="Full Name"
              icon={User}
              required
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer full name"
                className={inputClass}
              />
            </FormField>

            {/* EMAIL */}

            <FormField
              label="Email Address"
              icon={Mail}
              required
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="customer@example.com"
                className={inputClass}
              />
            </FormField>

            {/* PHONE */}

            <FormField
              label="Phone Number"
              icon={Phone}
              required
            >
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91..."
                className={inputClass}
              />
            </FormField>

            {/* NATIONALITY */}

            <FormField
              label="Nationality"
              icon={Globe2}
              required
            >
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Nationality"
                className={inputClass}
              />
            </FormField>

          </div>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-[#101A2E]/8">

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
              Travel
            </p>

            <h3 className="mt-1 text-sm font-medium text-[#101A2E]">
              Travel Information
            </h3>

          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* TOUR PACKAGE */}

            <FormField
              label="Tour Package"
              icon={Package}
              required
              description="Enter the package ID used by the enquiry."
            >
              <input
                type="text"
                name="tourPackageId"
                value={
                  formData.tourPackageId
                }
                onChange={handleChange}
                placeholder="e.g. classic-golden-triangle"
                className={inputClass}
              />
            </FormField>

            {/* TRAVEL DATE */}

            <FormField
              label="Travel Date"
              icon={CalendarDays}
              required
            >
              <input
                type="date"
                name="travelDate"
                value={
                  formData.travelDate
                }
                onChange={handleChange}
                className={inputClass}
              />
            </FormField>

            {/* DURATION */}

            <FormField
              label="Duration"
              icon={Clock3}
              required
            >
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 6 Nights / 7 Days"
                className={inputClass}
              />
            </FormField>

            {/* HOTEL */}

            <FormField
              label="Hotel Preference"
              icon={Hotel}
            >
              <select
                name="hotelType"
                value={
                  formData.hotelType
                }
                onChange={handleChange}
                className={selectClass}
              >
                {HOTEL_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </FormField>

          </div>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-[#101A2E]/8">

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
              Travellers
            </p>

            <h3 className="mt-1 text-sm font-medium text-[#101A2E]">
              Number of Travellers
            </h3>

          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* ADULTS */}

            <FormField
              label="Adults"
              icon={Users}
              required
              description="Values such as 10+ are supported."
            >
              <select
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">
                  Select adults
                </option>

                {ADULT_OPTIONS.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                      {option === "1"
                        ? " Adult"
                        : " Adults"}
                    </option>
                  )
                )}
              </select>
            </FormField>

            {/* CHILDREN */}

            <FormField
              label="Children"
              icon={Users}
              description="Values such as 10+ are supported."
            >
              <select
                name="children"
                value={formData.children}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">
                  Select children
                </option>

                {CHILDREN_OPTIONS.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                      {option === "1"
                        ? " Child"
                        : " Children"}
                    </option>
                  )
                )}
              </select>
            </FormField>

          </div>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

          <div className="px-5 py-4 border-b border-[#101A2E]/8">

            <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
              Additional
            </p>

            <h3 className="mt-1 text-sm font-medium text-[#101A2E]">
              Additional Information
            </h3>

          </div>

          <div className="p-5 space-y-5">

            {/* REFERENCE */}

            <FormField
              label="Reference"
              icon={FileText}
              description="Optional reference or source information."
            >
              <input
                type="text"
                name="reference"
                value={
                  formData.reference
                }
                onChange={handleChange}
                placeholder="Reference"
                className={inputClass}
              />
            </FormField>

            {/* DETAILS */}

            <FormField
              label="Customer Requirements"
              icon={MessageSquare}
            >
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Customer requirements, special requests or additional details..."
                className={textareaClass}
              />
            </FormField>

          </div>

        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/tour-enquiries/${id}`
              )
            }
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-[#101A2E]/10 bg-white text-xs text-[#68717D] hover:bg-[#F8F9F9] hover:text-[#101A2E] transition-all disabled:opacity-50"
          >
            <ArrowLeft size={14} />

            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#1B2942] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />

                Saving Changes...
              </>
            ) : (
              <>
                <Save size={14} />

                Save Changes
              </>
            )}
          </button>

        </div>

      </form>

    </section>
  );
}