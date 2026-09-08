import { useEffect, useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  Clock,
  Edit3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldAlert,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";

import {
  deleteCarRentalEnquiry,
  getCarRentalEnquiry,
  updateCarRentalEnquiry,
  updateCarRentalNotes,
  updateCarRentalRisk,
  updateCarRentalStatus,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";

const STATUS_OPTIONS = [
  "new",
  "contacted",
  "quotation-sent",
  "follow-up",
  "confirmed",
  "cancelled",
];

const RISK_OPTIONS = [
  "normal",
  "suspicious",
  "high-risk",
];

const formatStatus = (status) => {
  if (!status) return "Unknown";

  return String(status)
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "contacted":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "quotation-sent":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "follow-up":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getRiskClass = (risk) => {
  switch (risk) {
    case "normal":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "suspicious":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "high-risk":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

function DetailCard({
  title,
  description,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white shadow-sm">
      <div className="border-b border-[#101A2E]/8 px-5 py-4">
        <h2 className="text-base font-semibold text-[#101A2E]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-[#101A2E]/50">
            {description}
          </p>
        )}
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
}

function InfoBox({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-[#101A2E]/7 bg-[#F8F9F8] p-4">
      <div className="flex items-center gap-2">
        {Icon && (
          <Icon
            size={15}
            className="text-[#101A2E]/35"
          />
        )}

        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101A2E]/40">
          {label}
        </p>
      </div>

      <p className="mt-2 wrap-break-word text-sm font-medium text-[#101A2E]">
        {value || "—"}
      </p>
    </div>
  );
}

export default function CarRentalEnquiryDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const editFromUrl =
    searchParams.get("edit") === "true";

  const [enquiry, setEnquiry] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [statusSaving, setStatusSaving] =
    useState(false);

  const [riskSaving, setRiskSaving] =
    useState(false);

  const [notesSaving, setNotesSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [editMode, setEditMode] =
    useState(editFromUrl);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    tourPackageId: "",
    tourPackageName: "",
    vehicle: "",
    duration: "",
    travelDate: "",
    adults: "",
    children: "",
    reference: "",
    details: "",
  });

  const [status, setStatus] =
    useState("new");

  const [riskLevel, setRiskLevel] =
    useState("normal");

  const [riskReason, setRiskReason] =
    useState("");

  const [adminNotes, setAdminNotes] =
    useState("");

  const loadEnquiry = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getCarRentalEnquiry(id);

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to fetch car rental enquiry."
        );
      }

      const data =
        response?.enquiry ||
        response?.data ||
        response;

      if (!data) {
        throw new Error(
          "Car rental enquiry was not found."
        );
      }

      setEnquiry(data);

      setStatus(
        data?.status || "new"
      );

      setRiskLevel(
        data?.leadMetadata?.riskLevel ||
          "normal"
      );

      setRiskReason(
        data?.leadMetadata?.riskReasons
          ? Array.isArray(
              data.leadMetadata.riskReasons
            )
            ? data.leadMetadata.riskReasons.join(
                ", "
              )
            : String(
                data.leadMetadata.riskReasons
              )
          : ""
      );

      setAdminNotes(
        data?.adminNotes || ""
      );

      setForm({
        name: data?.name || "",

        email: data?.email || "",

        phone: data?.phone || "",

        nationality:
          data?.nationality || "",

        tourPackageId:
          data?.tourPackageId || "",

        tourPackageName:
          data?.tourPackageName || "",

        vehicle:
          data?.vehicle || "",

        duration:
          data?.duration ?? "",

        travelDate: data?.travelDate
          ? String(data.travelDate).slice(
              0,
              10
            )
          : "",

        adults:
          data?.adults ?? "",

        children:
          data?.children ?? "",

        reference:
          data?.reference || "",

        details:
          data?.details || "",
      });
    } catch (err) {
      console.error(
        "Failed to load car rental enquiry:",
        err
      );

      setError(
        err?.message ||
          "Unable to load car rental enquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadEnquiry();
    }
  }, [id]);

  useEffect(() => {
    setEditMode(editFromUrl);
  }, [editFromUrl]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const startEditing = () => {
    setEditMode(true);

    setSearchParams(
      {
        edit: "true",
      },
      {
        replace: true,
      }
    );
  };

  const cancelEditing = () => {
    setEditMode(false);

    setSearchParams(
      {},
      {
        replace: true,
      }
    );

    loadEnquiry();
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const updateData = {
        name: form.name.trim(),

        email: form.email.trim(),

        phone: form.phone.trim(),

        nationality:
          form.nationality.trim(),

        tourPackageId:
          form.tourPackageId.trim(),

        vehicle:
          form.vehicle.trim(),

        duration:
          form.duration === ""
            ? undefined
            : Number(form.duration),

        travelDate:
          form.travelDate || undefined,

        /*
         * Your schema stores adults
         * and children as strings.
         */
        adults:
          form.adults === ""
            ? undefined
            : String(form.adults),

        children:
          form.children === ""
            ? undefined
            : String(form.children),

        reference:
          form.reference.trim(),

        details:
          form.details.trim(),
      };

      Object.keys(updateData).forEach(
        (key) => {
          if (
            updateData[key] ===
            undefined
          ) {
            delete updateData[key];
          }
        }
      );

      const response =
        await updateCarRentalEnquiry(
          id,
          updateData
        );

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to update enquiry."
        );
      }

      await loadEnquiry();

      setEditMode(false);

      setSearchParams(
        {},
        {
          replace: true,
        }
      );

      setSuccessMessage(
        "Enquiry details updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update enquiry:",
        err
      );

      setError(
        err?.message ||
          "Unable to update enquiry."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    event
  ) => {
    const nextStatus =
      event.target.value;

    try {
      setStatusSaving(true);
      setError("");
      setSuccessMessage("");

      const response =
        await updateCarRentalStatus(
          id,
          nextStatus
        );

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to update status."
        );
      }

      setStatus(nextStatus);

      setEnquiry((previous) =>
        previous
          ? {
              ...previous,
              status: nextStatus,
            }
          : previous
      );

      setSuccessMessage(
        "Status updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update status:",
        err
      );

      setError(
        err?.message ||
          "Unable to update status."
      );
    } finally {
      setStatusSaving(false);
    }
  };

  const handleRiskSave = async () => {
    try {
      setRiskSaving(true);
      setError("");
      setSuccessMessage("");

      if (
        riskLevel !== "normal" &&
        !riskReason.trim()
      ) {
        throw new Error(
          "Please provide a risk reason for suspicious or high-risk enquiries."
        );
      }

      const response =
        await updateCarRentalRisk(
          id,
          riskLevel,
          riskReason.trim()
        );

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to update risk."
        );
      }

      setEnquiry((previous) =>
        previous
          ? {
              ...previous,
              leadMetadata: {
                ...previous.leadMetadata,
                riskLevel,
                riskReasons:
                  riskReason.trim()
                    ? [riskReason.trim()]
                    : [],
              },
            }
          : previous
      );

      setSuccessMessage(
        "Risk information updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update risk:",
        err
      );

      setError(
        err?.message ||
          "Unable to update risk."
      );
    } finally {
      setRiskSaving(false);
    }
  };

  const handleNotesSave = async () => {
    try {
      setNotesSaving(true);
      setError("");
      setSuccessMessage("");

      const response =
        await updateCarRentalNotes(
          id,
          adminNotes
        );

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to update admin notes."
        );
      }

      setEnquiry((previous) =>
        previous
          ? {
              ...previous,
              adminNotes,
            }
          : previous
      );

      setSuccessMessage(
        "Admin notes updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update admin notes:",
        err
      );

      setError(
        err?.message ||
          "Unable to update admin notes."
      );
    } finally {
      setNotesSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this enquiry? This action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response =
        await deleteCarRentalEnquiry(id);

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to delete enquiry."
        );
      }

      navigate(
        "/car-rental-enquiries"
      );
    } catch (err) {
      console.error(
        "Failed to delete enquiry:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete enquiry."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F6] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-350">

          <div className="mb-6 h-8 w-64 animate-pulse rounded-lg bg-[#101A2E]/10" />

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">

            <div className="space-y-5">
              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="h-48 animate-pulse rounded-2xl bg-white"
                  />
                )
              )}
            </div>

            <div className="h-96 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="min-h-screen bg-[#F5F7F6] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center">

          <AlertCircle
            size={40}
            className="mx-auto mb-4 text-red-500"
          />

          <h1 className="text-xl font-semibold text-[#101A2E]">
            Enquiry not found
          </h1>

          <p className="mt-2 text-sm text-[#101A2E]/55">
            {error ||
              "The requested car rental enquiry could not be found."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/car-rental-enquiries"
              )
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />

            Back to Enquiries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6] px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-350">

        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/car-rental-enquiries"
                )
              }
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#101A2E]/55 transition hover:text-[#101A2E]"
            >
              <ArrowLeft size={16} />

              Back to Car Rental Enquiries
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101A2E]">

                <Car
                  size={20}
                  className="text-[#C9A24B]"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#101A2E]/40">
                  Car Rental Enquiry
                </p>

                <h1 className="text-2xl font-semibold tracking-tight text-[#101A2E]">
                  {enquiry?.name ||
                    "Customer Enquiry"}
                </h1>

              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            {!editMode ? (
              <button
                type="button"
                onClick={startEditing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C9A24B] hover:text-[#101A2E]"
              >
                <Edit3 size={16} />

                Edit Enquiry
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#101A2E]/12 bg-white px-4 py-2.5 text-sm font-semibold text-[#101A2E]/70 transition hover:bg-[#101A2E]/4 disabled:opacity-50"
                >
                  <X size={16} />

                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Clock
                        size={16}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />

                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}

          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">

              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
            >
              <X size={17} />
            </button>

          </div>
        )}

        {/* SUCCESS */}

        {successMessage && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

            <Check size={17} />

            <span>
              {successMessage}
            </span>

            <button
              type="button"
              onClick={() =>
                setSuccessMessage("")
              }
              className="ml-auto"
            >
              <X size={16} />
            </button>

          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">


          <div className="space-y-5">

            {/* CUSTOMER */}

            <DetailCard
              title="Customer information"
              description="Contact information provided with the enquiry."
            >
              {editMode ? (
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Name
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Nationality
                    </label>

                    <input
                      name="nationality"
                      value={
                        form.nationality
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Phone
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />
                  </div>

                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">

                  <InfoBox
                    label="Name"
                    value={
                      enquiry?.name
                    }
                    icon={User}
                  />

                  <InfoBox
                    label="Nationality"
                    value={
                      enquiry?.nationality
                    }
                  />

                  <InfoBox
                    label="Email"
                    value={
                      enquiry?.email
                    }
                    icon={Mail}
                  />

                  <InfoBox
                    label="Phone"
                    value={
                      enquiry?.phone
                    }
                    icon={Phone}
                  />

                </div>
              )}
            </DetailCard>

            <DetailCard
              title="Rental details"
              description="Vehicle, package and guest requirements."
            >
              {editMode ? (
                <div className="grid gap-4 sm:grid-cols-2">

                  {/* TOUR PACKAGE ID */}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Tour Package ID
                    </label>

                    <input
                      name="tourPackageId"
                      value={
                        form.tourPackageId
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />
                  </div>

                  {/* TOUR PACKAGE NAME */}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Tour Package Name
                    </label>

                    <input
                      value={
                        form.tourPackageName
                      }
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-[#101A2E]/8 bg-[#F1F3F2] px-3.5 py-3 text-sm text-[#101A2E]/60 outline-none"
                    />
                  </div>

                  {/* VEHICLE */}

                  <div className="sm:col-span-2">

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Vehicle
                    </label>

                    <input
                      name="vehicle"
                      value={
                        form.vehicle
                      }
                      onChange={handleChange}
                      placeholder="e.g. Toyota Innova"
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                  {/* ADULTS */}

                  <div>

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Adults
                    </label>

                    <input
                      type="text"
                      name="adults"
                      value={
                        form.adults
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                  {/* CHILDREN */}

                  <div>

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Children
                    </label>

                    <input
                      type="text"
                      name="children"
                      value={
                        form.children
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                  {/* DURATION */}

                  <div>

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Duration
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="duration"
                      value={
                        form.duration
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                  {/* REFERENCE */}

                  <div>

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Reference
                    </label>

                    <input
                      name="reference"
                      value={
                        form.reference
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">

                  <InfoBox
                    label="Tour Package"
                    value={
                      enquiry?.tourPackageName ||
                      "—"
                    }
                    icon={Car}
                  />

                  <InfoBox
                    label="Package ID"
                    value={
                      enquiry?.tourPackageId
                    }
                  />

                  <InfoBox
                    label="Adults"
                    value={
                      enquiry?.adults ??
                      "0"
                    }
                    icon={Users}
                  />

                  <InfoBox
                    label="Children"
                    value={
                      enquiry?.children ??
                      "0"
                    }
                  />

                  <InfoBox
                    label="Duration"
                    value={
                      enquiry?.duration
                        ? `${enquiry.duration} day${
                            Number(
                              enquiry.duration
                            ) !== 1
                              ? "s"
                              : ""
                          }`
                        : "—"
                    }
                    icon={Clock}
                  />

                  <InfoBox
                    label="Vehicle"
                    value={
                      enquiry?.vehicle
                    }
                    icon={Car}
                  />

                  <InfoBox
                    label="Reference"
                    value={
                      enquiry?.reference
                    }
                  />

                </div>
              )}
            </DetailCard>

            <DetailCard
              title="Travel details"
              description="Travel schedule associated with the rental enquiry."
            >
              {editMode ? (
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                      Travel Date
                    </label>

                    <input
                      type="date"
                      name="travelDate"
                      value={
                        form.travelDate
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                    />

                  </div>

                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">

                  <InfoBox
                    label="Travel Date"
                    value={formatDate(
                      enquiry?.travelDate
                    )}
                    icon={
                      CalendarDays
                    }
                  />

                </div>
              )}
            </DetailCard>

            <DetailCard
              title="Customer message"
              description="Additional requirements submitted by the customer."
            >
              {editMode ? (
                <textarea
                  name="details"
                  value={
                    form.details
                  }
                  onChange={handleChange}
                  rows={5}
                  placeholder="Customer's additional requirements..."
                  className="w-full resize-y rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-4 py-3 text-sm leading-relaxed text-[#101A2E] outline-none placeholder:text-[#101A2E]/30 focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                />
              ) : (
                <div className="whitespace-pre-wrap rounded-xl bg-[#F8F9F8] p-4 text-sm leading-relaxed text-[#101A2E]/75">
                  {enquiry?.details ||
                    "No additional message was provided."}
                </div>
              )}
            </DetailCard>

            <DetailCard
              title="Lead intelligence"
              description="Location, source and technical information captured with the enquiry."
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                <InfoBox
                  label="IP Address"
                  value={
                    enquiry?.leadMetadata
                      ?.ipAddress
                  }
                  icon={MapPin}
                />

                <InfoBox
                  label="IP Country"
                  value={
                    enquiry?.leadMetadata
                      ?.ipCountry
                  }
                  icon={Globe}
                />

                <InfoBox
                  label="Region"
                  value={
                    enquiry?.leadMetadata
                      ?.ipRegion
                  }
                  icon={MapPin}
                />

                <InfoBox
                  label="City"
                  value={
                    enquiry?.leadMetadata
                      ?.ipCity
                  }
                  icon={MapPin}
                />

                <InfoBox
                  label="Phone Country"
                  value={
                    enquiry?.leadMetadata
                      ?.phoneCountry
                  }
                  icon={Phone}
                />

                <InfoBox
                  label="Source"
                  value={
                    enquiry?.leadMetadata
                      ?.source
                  }
                  icon={Globe}
                />

              </div>

              {enquiry?.leadMetadata
                ?.sourcePage && (
                <div className="mt-5 rounded-xl border border-[#101A2E]/7 bg-[#F8F9F8] p-4">

                  <div className="flex items-center gap-2">

                    <Globe
                      size={15}
                      className="text-[#101A2E]/35"
                    />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101A2E]/40">
                      Source Page
                    </p>

                  </div>

                  <p className="mt-2 break-all text-sm font-medium text-[#101A2E]">
                    {
                      enquiry
                        .leadMetadata
                        .sourcePage
                    }
                  </p>

                </div>
              )}

              {enquiry?.leadMetadata
                ?.userAgent && (
                <div className="mt-3 rounded-xl border border-[#101A2E]/7 bg-[#F8F9F8] p-4">

                  <div className="flex items-center gap-2">

                    <Globe
                      size={15}
                      className="text-[#101A2E]/35"
                    />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101A2E]/40">
                      User Agent
                    </p>

                  </div>

                  <p className="mt-2 break-all text-xs leading-5 text-[#101A2E]/65">
                    {
                      enquiry
                        .leadMetadata
                        .userAgent
                    }
                  </p>

                </div>
              )}
            </DetailCard>

          </div>

          <div className="space-y-5">

            {/* STATUS */}

            <DetailCard
              title="Status"
              description="Update the current enquiry stage."
            >
              <select
                value={status}
                onChange={
                  handleStatusChange
                }
                disabled={
                  statusSaving
                }
                className={`w-full rounded-xl border px-3.5 py-3 text-sm font-semibold outline-none transition focus:border-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClass(
                  status
                )}`}
              >
                {STATUS_OPTIONS.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {formatStatus(
                        option
                      )}
                    </option>
                  )
                )}
              </select>

              {statusSaving && (
                <p className="mt-2 text-xs text-[#101A2E]/40">
                  Updating status...
                </p>
              )}
            </DetailCard>

            {/* RISK */}

            <DetailCard
              title="Lead risk"
              description="Review and update enquiry risk."
            >
              <div className="space-y-4">

                <div>

                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                    Risk Level
                  </label>

                  <select
                    value={riskLevel}
                    onChange={(event) =>
                      setRiskLevel(
                        event.target.value
                      )
                    }
                    disabled={
                      riskSaving
                    }
                    className={`w-full rounded-xl border px-3.5 py-3 text-sm font-semibold outline-none focus:border-[#C9A24B] disabled:opacity-60 ${getRiskClass(
                      riskLevel
                    )}`}
                  >
                    {RISK_OPTIONS.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {formatStatus(
                            option
                          )}
                        </option>
                      )
                    )}
                  </select>

                </div>

                <div>

                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#101A2E]/40">
                    Risk Reason
                  </label>

                  <textarea
                    value={
                      riskReason
                    }
                    onChange={(event) =>
                      setRiskReason(
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder={
                      riskLevel ===
                      "normal"
                        ? "Optional"
                        : "Explain why this lead is suspicious or high-risk..."
                    }
                    className="w-full resize-y rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm leading-relaxed text-[#101A2E] outline-none placeholder:text-[#101A2E]/30 focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
                  />

                </div>

                <button
                  type="button"
                  onClick={
                    handleRiskSave
                  }
                  disabled={
                    riskSaving
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {riskSaving ? (
                    <>
                      <Clock
                        size={15}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <ShieldAlert
                        size={15}
                      />

                      Save Risk
                    </>
                  )}
                </button>

              </div>
            </DetailCard>

            <DetailCard
              title="Enquiry information"
              description="System generated enquiry metadata."
            >
              <div className="space-y-3">

                <InfoBox
                  label="Submitted"
                  value={formatDateTime(
                    enquiry?.createdAt
                  )}
                  icon={
                    CalendarDays
                  }
                />

                <InfoBox
                  label="Last Updated"
                  value={formatDateTime(
                    enquiry?.updatedAt
                  )}
                  icon={Clock}
                />

                <InfoBox
                  label="Reference"
                  value={
                    enquiry?.reference
                  }
                />

                <InfoBox
                  label="Tour Package"
                  value={
                    enquiry
                      ?.tourPackageName
                  }
                  icon={Car}
                />

              </div>
            </DetailCard>

            {/* ADMIN NOTES */}

            <DetailCard
              title="Admin notes"
              description="Internal notes visible only to administrators."
            >
              <textarea
                value={
                  adminNotes
                }
                onChange={(event) =>
                  setAdminNotes(
                    event.target.value
                  )
                }
                rows={6}
                placeholder="Add internal notes about this customer..."
                className="w-full resize-y rounded-xl border border-[#101A2E]/12 bg-[#F8F9F8] px-3.5 py-3 text-sm leading-relaxed text-[#101A2E] outline-none placeholder:text-[#101A2E]/30 focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
              />

              <button
                type="button"
                onClick={
                  handleNotesSave
                }
                disabled={
                  notesSaving
                }
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#101A2E]/12 bg-white px-4 py-2.5 text-sm font-semibold text-[#101A2E]/75 transition hover:bg-[#101A2E]/4 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {notesSaving ? (
                  <>
                    <Clock
                      size={15}
                      className="animate-spin"
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />

                    Save Notes
                  </>
                )}
              </button>
            </DetailCard>

            {/* QUICK ACTIONS */}

            <DetailCard
              title="Quick actions"
              description="Contact the customer directly."
            >
              <div className="space-y-2">

                <a
                  href={
                    enquiry?.email
                      ? `mailto:${enquiry.email}`
                      : "#"
                  }
                  onClick={(event) => {
                    if (
                      !enquiry?.email
                    ) {
                      event.preventDefault();
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border border-[#101A2E]/10 px-4 py-3 text-sm font-semibold text-[#101A2E]/80 transition ${
                    enquiry?.email
                      ? "hover:bg-[#101A2E]/4"
                      : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <Mail size={17} />

                  Email customer
                </a>

                <a
                  href={
                    enquiry?.phone
                      ? `tel:${enquiry.phone}`
                      : "#"
                  }
                  onClick={(event) => {
                    if (
                      !enquiry?.phone
                    ) {
                      event.preventDefault();
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border border-[#101A2E]/10 px-4 py-3 text-sm font-semibold text-[#101A2E]/80 transition ${
                    enquiry?.phone
                      ? "hover:bg-[#101A2E]/4"
                      : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <Phone size={17} />

                  Call customer
                </a>

              </div>
            </DetailCard>

            {/* DELETE */}

            <button
              type="button"
              onClick={
                handleDelete
              }
              disabled={
                deleting
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={16} />

              {deleting
                ? "Deleting..."
                : "Delete Enquiry"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}