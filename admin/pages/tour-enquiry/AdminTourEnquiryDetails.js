import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Edit3,
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  Hotel,
  Globe,
  ShieldAlert,
  FileText,
  Clock,
  Package,
  AlertTriangle,
} from "lucide-react";

import { getTourEnquiry } from "../../services/adminApi";

function StatusBadge({ status }) {
  const config = {
    new: {
      label: "New",
      className:
        "bg-blue-50 text-blue-600 border-blue-100",
    },

    contacted: {
      label: "Contacted",
      className:
        "bg-purple-50 text-purple-600 border-purple-100",
    },

    "quotation-sent": {
      label: "Quotation Sent",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    },

    "follow-up": {
      label: "Follow Up",
      className:
        "bg-orange-50 text-orange-600 border-orange-100",
    },

    confirmed: {
      label: "Confirmed",
      className:
        "bg-emerald-50 text-emerald-600 border-emerald-100",
    },

    cancelled: {
      label: "Cancelled",
      className:
        "bg-red-50 text-red-600 border-red-100",
    },
  };

  const current = config[status] || {
    label: status || "Unknown",
    className:
      "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={[
        "inline-flex items-center",
        "px-3 py-1.5",
        "rounded-full",
        "border",
        "text-[11px]",
        "font-medium",
        current.className,
      ].join(" ")}
    >
      {current.label}
    </span>
  );
}

function RiskBadge({ riskLevel }) {
  const config = {
    normal: {
      label: "Normal",
      className:
        "bg-emerald-50 text-emerald-600 border-emerald-100",
    },

    suspicious: {
      label: "Suspicious",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    },

    "high-risk": {
      label: "High Risk",
      className:
        "bg-red-50 text-red-600 border-red-100",
    },
  };

  const current = config[riskLevel] || {
    label: "Unknown",
    className:
      "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "px-3 py-1.5",
        "rounded-full",
        "border",
        "text-[11px]",
        "font-medium",
        current.className,
      ].join(" ")}
    >
      {riskLevel !== "normal" && (
        <ShieldAlert
          size={12}
          strokeWidth={1.7}
        />
      )}

      {current.label}
    </span>
  );
}

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date) {
  if (!date) {
    return "—";
  }

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
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 shrink-0 rounded-lg bg-[#101A2E]/5 flex items-center justify-center">
        <Icon
          size={16}
          strokeWidth={1.6}
          className="text-[#68717D]"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A929D]">
          {label}
        </p>

        <p className="mt-1 text-sm text-[#101A2E] wrap-break-word">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function DetailSection({
  eyebrow,
  title,
  icon: Icon,
  children,
}) {
  return (
    <section className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-[#101A2E]/8 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#101A2E]/5 flex items-center justify-center">
          <Icon
            size={17}
            strokeWidth={1.6}
            className="text-[#101A2E]"
          />
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
            {eyebrow}
          </p>

          <h3 className="mt-0.5 text-base font-medium text-[#101A2E]">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

export default function AdminTourEnquiryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTourEnquiry(id);

        setEnquiry(response.enquiry || null);
      } catch (error) {
        console.error(
          "Failed to fetch tour enquiry:",
          error
        );

        setError(
          error.message ||
            "Unable to load this enquiry."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEnquiry();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-[#7A828D]">
            Loading enquiry...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-red-100 rounded-2xl p-8">
          <div className="w-11 h-11 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert
              size={20}
              className="text-red-500"
            />
          </div>

          <h2 className="mt-5 text-lg font-medium text-[#101A2E]">
            Unable to load enquiry
          </h2>

          <p className="mt-2 text-sm text-[#7A828D]">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/tour-enquiries")
            }
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
          >
            <ArrowLeft size={14} />

            Back to enquiries
          </button>
        </div>
      </section>
    );
  }

  if (!enquiry) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-[#101A2E]">
            Enquiry not found
          </h2>

          <p className="mt-2 text-sm text-[#7A828D]">
            This enquiry may have been deleted or no longer exists.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/tour-enquiries")
            }
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
          >
            <ArrowLeft size={14} />

            Back to enquiries
          </button>
        </div>
      </section>
    );
  }

  const riskLevel =
    enquiry.leadMetadata?.riskLevel || "normal";

  return (
    <section className="space-y-6">

      <div>
        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/tour-enquiries")
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
        >
          <ArrowLeft size={14} />

          Back to enquiries
        </button>

        {/* HEADER */}

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
              Enquiry Details
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
              {enquiry.name || "Customer Enquiry"}
            </h2>

            <p className="mt-2 text-sm text-[#6F7782]">
              Submitted on{" "}
              {formatDateTime(enquiry.createdAt)}
            </p>
          </div>

          {/* STATUS + RISK + EDIT */}

          <div className="flex flex-wrap items-center gap-3">

            <StatusBadge
              status={enquiry.status}
            />

            <RiskBadge
              riskLevel={riskLevel}
            />

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/tour-enquiries/${enquiry._id}/edit`
                )
              }
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
            >
              <Edit3 size={13} />

              Edit Enquiry
            </button>

          </div>
        </div>
      </div>

      <section className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#101A2E]/8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#101A2E]/5 flex items-center justify-center">
            <Phone
              size={17}
              strokeWidth={1.6}
              className="text-[#101A2E]"
            />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9A24B]">
              Actions
            </p>

            <h3 className="mt-0.5 text-base font-medium text-[#101A2E]">
              Quick Actions
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* EMAIL CUSTOMER */}

            <a
              href={`mailto:${enquiry?.email || ""}`}
              className="inline-flex items-center gap-3 rounded-xl border border-[#101A2E]/8 bg-white px-3.5 py-2.5 text-sm font-medium text-[#101A2E] transition-colors duration-200 hover:bg-[#101A2E]/4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101A2E]/5">
                <Mail
                  size={16}
                  strokeWidth={1.7}
                  className="text-[#68717D]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#101A2E]">
                  Email customer
                </p>

                <p className="mt-0.5 truncate text-xs text-[#8A929D]">
                  {enquiry.email || "No email available"}
                </p>
              </div>
            </a>

            {/* CALL CUSTOMER */}

            <a
              href={`tel:${enquiry?.phone || ""}`}
              className="inline-flex items-center gap-3 rounded-xl border border-[#101A2E]/8 bg-white px-3.5 py-2.5 text-sm font-medium text-[#101A2E] transition-colors duration-200 hover:bg-[#101A2E]/4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101A2E]/5">
                <Phone
                  size={16}
                  strokeWidth={1.7}
                  className="text-[#68717D]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#101A2E]">
                  Call customer
                </p>

                <p className="mt-0.5 truncate text-xs text-[#8A929D]">
                  {enquiry.phone || "No phone available"}
                </p>
              </div>
            </a>

          </div>
        </div>
      </section>


      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* CUSTOMER */}

        <DetailSection
          eyebrow="Customer"
          title="Contact Information"
          icon={User}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InfoItem
              icon={User}
              label="Name"
              value={enquiry.name}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={enquiry.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={enquiry.phone}
            />

            <InfoItem
              icon={Globe}
              label="Nationality"
              value={enquiry.nationality}
            />

          </div>
        </DetailSection>

        {/* TRIP */}

        <DetailSection
          eyebrow="Travel"
          title="Trip Information"
          icon={Package}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InfoItem
              icon={Package}
              label="Tour Package"
              value={
                enquiry.tourPackageName ||
                enquiry.tourPackageId
              }
            />

            <InfoItem
              icon={CalendarDays}
              label="Travel Date"
              value={formatDate(
                enquiry.travelDate
              )}
            />

            {/* DURATION */}

            <InfoItem
              icon={Clock}
              label="Duration"
              value={
                enquiry.duration || "—"
              }
            />

            {/* TRAVELLERS */}

            <InfoItem
              icon={Users}
              label="Travellers"
              value={`${enquiry.adults || 0} Adults · ${
                enquiry.children || 0
              } Children`}
            />

            <InfoItem
              icon={Hotel}
              label="Hotel Type"
              value={enquiry.hotelType}
            />

            <InfoItem
              icon={FileText}
              label="Reference"
              value={enquiry.reference}
            />

          </div>
        </DetailSection>

      </div>

      {/* CUSTOMER MESSAGE */}

      <DetailSection
        eyebrow="Customer Message"
        title="Travel Requirements"
        icon={FileText}
      >
        <div className="rounded-xl bg-[#F8F9F9] border border-[#101A2E]/6 p-5">
          <p className="text-sm leading-7 text-[#4E5762] whitespace-pre-wrap">
            {enquiry.details ||
              "No additional details provided."}
          </p>
        </div>
      </DetailSection>

      {/* LEAD INTELLIGENCE */}

      <DetailSection
        eyebrow="Lead Intelligence"
        title="Location & Source"
        icon={MapPin}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <InfoItem
            icon={MapPin}
            label="IP Address"
            value={
              enquiry.leadMetadata?.ipAddress
            }
          />

          <InfoItem
            icon={Globe}
            label="IP Country"
            value={
              enquiry.leadMetadata?.ipCountry
            }
          />

          <InfoItem
            icon={MapPin}
            label="Region"
            value={
              enquiry.leadMetadata?.ipRegion
            }
          />

          <InfoItem
            icon={MapPin}
            label="City"
            value={
              enquiry.leadMetadata?.ipCity
            }
          />

          <InfoItem
            icon={Phone}
            label="Phone Country"
            value={
              enquiry.leadMetadata?.phoneCountry
            }
          />

          <InfoItem
            icon={Globe}
            label="Source"
            value={
              enquiry.leadMetadata?.source
            }
          />

        </div>

        {enquiry.leadMetadata?.sourcePage && (
          <div className="mt-6 pt-5 border-t border-[#101A2E]/8">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A929D]">
              Source Page
            </p>

            <p className="mt-2 text-xs text-[#68717D] break-all">
              {enquiry.leadMetadata.sourcePage}
            </p>

          </div>
        )}
      </DetailSection>

      {/* RISK */}

      <DetailSection
        eyebrow="Lead Safety"
        title="Risk Assessment"
        icon={ShieldAlert}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <RiskBadge
            riskLevel={riskLevel}
          />

          {riskLevel === "normal" ? (
            <p className="text-sm text-[#6F7782]">
              No risk indicators have been detected
              for this enquiry.
            </p>
          ) : (
            <p className="text-sm text-[#6F7782]">
              Review the reasons below before
              proceeding with this lead.
            </p>
          )}

        </div>

        {enquiry.leadMetadata?.riskReasons?.length > 0 && (
          <div className="mt-5 space-y-2">

            {enquiry.leadMetadata.riskReasons.map(
              (reason, index) => (
                <div
                  key={`${reason}-${index}`}
                  className="flex gap-3 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3"
                >
                  <AlertTriangle
                    size={15}
                    className="shrink-0 text-amber-500 mt-0.5"
                  />

                  <p className="text-xs leading-5 text-amber-700">
                    {reason}
                  </p>
                </div>
              )
            )}

          </div>
        )}
      </DetailSection>

      {/* ADMIN NOTES */}

      <DetailSection
        eyebrow="Internal"
        title="Admin Notes"
        icon={FileText}
      >
        <div className="rounded-xl bg-[#F8F9F9] border border-[#101A2E]/6 p-5">

          <p className="text-sm leading-7 text-[#4E5762] whitespace-pre-wrap">
            {enquiry.adminNotes ||
              "No internal notes added yet."}
          </p>

        </div>
      </DetailSection>

      {/* EDIT BUTTON */}

      <div className="flex justify-end pt-2">

        <button
          type="button"
          onClick={() =>
            navigate(
              `/tour-enquiries/${enquiry._id}/edit`
            )
          }
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
        >
          <Edit3 size={14} />

          Edit Enquiry
        </button>

      </div>

      {/* FOOTER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 pb-4">

        <p className="text-[11px] text-[#9AA1AA]">
          Enquiry ID: {enquiry._id}
        </p>

        <p className="text-[11px] text-[#9AA1AA]">
          Last updated:{" "}
          {formatDateTime(
            enquiry.updatedAt
          )}
        </p>

      </div>

    </section>
  );
}