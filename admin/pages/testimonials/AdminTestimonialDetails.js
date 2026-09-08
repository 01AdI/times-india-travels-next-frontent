import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  User,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Home,
  Trash2,
  MessageSquare,
  CalendarDays,
  Clock,
  Globe,
  Image as ImageIcon,
  ShieldAlert,
} from "lucide-react";

import {
  getAdminTestimonial,
  approveTestimonial,
  rejectTestimonial,
  featureTestimonial,
  deleteTestimonial,
} from "../../services/adminApi";

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    },

    approved: {
      label: "Approved",
      className:
        "bg-emerald-50 text-emerald-600 border-emerald-100",
    },

    rejected: {
      label: "Rejected",
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

// ============================================================
// SOURCE BADGE
// ============================================================

function SourceBadge({ source }) {
  const isTripAdvisor = source === "tripadvisor";

  return (
    <span
      className={[
        "inline-flex items-center",
        "px-3 py-1.5",
        "rounded-full",
        "border",
        "text-[11px]",
        "font-medium",
        isTripAdvisor
          ? "bg-green-50 text-green-600 border-green-100"
          : "bg-blue-50 text-blue-600 border-blue-100",
      ].join(" ")}
    >
      {isTripAdvisor ? "TripAdvisor" : "Customer"}
    </span>
  );
}

// ============================================================
// RATING
// ============================================================

function Rating({ rating }) {
  const numericRating = Number(rating) || 0;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={18}
          strokeWidth={1.5}
          className={
            star <= numericRating
              ? "fill-[#C9A24B] text-[#C9A24B]"
              : "text-[#D5D9DE]"
          }
        />
      ))}

      <span className="ml-2 text-sm text-[#68717D]">
        {numericRating}/5
      </span>
    </div>
  );
}

// ============================================================
// FORMAT DATE
// ============================================================

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

// ============================================================
// FORMAT DATE + TIME
// ============================================================

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

// ============================================================
// INFO ITEM
// ============================================================

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

        <p className="mt-1 text-sm text-[#101A2E] break-words">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// DETAIL SECTION
// ============================================================

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

// ============================================================
// ADMIN TESTIMONIAL DETAILS
// ============================================================

export default function AdminTestimonialsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================================
  // DATA
  // ==========================================================

  const [testimonial, setTestimonial] =
    useState(null);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================================
  // FETCH TESTIMONIAL
  // ==========================================================

  const fetchTestimonial = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminTestimonial(id);

      setTestimonial(response.data || null);
    } catch (error) {
      setError(
        error.message ||
          "Unable to load testimonial."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  // ==========================================================
  // APPROVE
  // ==========================================================

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      setError("");

      const response =
        await approveTestimonial(id);

      setTestimonial(
        response.data || testimonial
      );

      await fetchTestimonial();
    } catch (error) {
      setError(
        error.message ||
          "Unable to approve testimonial."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================================
  // REJECT
  // ==========================================================

  const handleReject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this testimonial?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await rejectTestimonial(id);

      await fetchTestimonial();
    } catch (error) {

      setError(
        error.message ||
          "Unable to reject testimonial."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================================
  // FEATURE TOGGLE
  // ==========================================================

  const handleFeatureToggle = async () => {
    if (!testimonial) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await featureTestimonial(
        testimonial._id,
        !testimonial.featuredOnHomepage
      );

      await fetchTestimonial();
    } catch (error) {
      setError(
        error.message ||
          "Unable to update homepage feature."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!testimonial) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the testimonial from ${testimonial.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await deleteTestimonial(
        testimonial._id
      );

      navigate("/testimonials");
    } catch (error) {
      setError(
        error.message ||
          "Unable to delete testimonial."
      );

      setActionLoading(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-[#7A828D]">
            Loading testimonial...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR / NOT FOUND
  // ==========================================================

  if (error || !testimonial) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white border border-[#101A2E]/8 rounded-2xl p-8">
          <div className="w-11 h-11 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert
              size={20}
              className="text-red-500"
            />
          </div>

          <h2 className="mt-5 text-lg font-medium text-[#101A2E]">
            {error
              ? "Unable to load testimonial"
              : "Testimonial not found"}
          </h2>

          <p className="mt-2 text-sm text-[#7A828D]">
            {error ||
              "This testimonial may have been deleted or no longer exists."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/testimonials")
            }
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
          >
            <ArrowLeft size={14} />
            Back to testimonials
          </button>
        </div>
      </section>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <section className="space-y-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div>
        <button
          type="button"
          onClick={() =>
            navigate("/testimonials")
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to testimonials
        </button>

        <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
              Testimonial Details
            </p>

            <div className="mt-3 flex items-center gap-4">

              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border border-[#101A2E]/10"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#101A2E]/5 flex items-center justify-center">
                  <User
                    size={22}
                    className="text-[#68717D]"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-medium text-[#101A2E]">
                    {testimonial.name ||
                      "Customer"}
                  </h2>

                  {testimonial.verified && (
                    <ShieldCheck
                      size={18}
                      className="text-emerald-500"
                    />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-[#7A828D]">
                  <MapPin size={13} />
                  {testimonial.location ||
                    "Location not provided"}
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge
              status={testimonial.status}
            />

            <SourceBadge
              source={testimonial.source}
            />
          </div>

        </div>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* ======================================================
          ACTION BAR
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-4">

        <div className="flex flex-wrap items-center gap-2">

          {testimonial.status !==
            "approved" && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleApprove}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-xs hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              <CheckCircle2 size={14} />
              Approve
            </button>
          )}

          {testimonial.status !==
            "rejected" && (
            <button
              type="button"
              disabled={actionLoading}
              onClick={handleReject}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-100 text-red-500 text-xs hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <XCircle size={14} />
              Reject
            </button>
          )}

          {testimonial.status ===
            "approved" &&
            testimonial.source ===
              "tripadvisor" && (
              <button
                type="button"
                disabled={actionLoading}
                onClick={
                  handleFeatureToggle
                }
                className={[
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs transition-all disabled:opacity-50",
                  testimonial.featuredOnHomepage
                    ? "border-[#C9A24B]/30 text-[#C9A24B] bg-[#C9A24B]/5 hover:bg-[#C9A24B]/10"
                    : "border-[#101A2E]/10 text-[#68717D] hover:bg-[#101A2E]/5",
                ].join(" ")}
              >
                <Home size={14} />

                {testimonial.featuredOnHomepage
                  ? "Remove from Homepage"
                  : "Feature on Homepage"}
              </button>
            )}

          <button
            type="button"
            disabled={actionLoading}
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-100 text-red-500 text-xs hover:bg-red-50 transition-all disabled:opacity-50"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>
      </div>

      {/* ======================================================
          REVIEW + OVERVIEW
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* REVIEW */}

        <div className="xl:col-span-2">

          <DetailSection
            eyebrow="Customer Feedback"
            title="Review"
            icon={MessageSquare}
          >
            <div className="rounded-xl bg-[#F8F9F9] border border-[#101A2E]/6 p-6">

              <div className="flex items-center justify-between gap-4 mb-5">

                <Rating
                  rating={testimonial.rating}
                />

                {testimonial.verified && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
                    <ShieldCheck size={14} />
                    Verified
                  </span>
                )}

              </div>

              <p className="text-base leading-8 text-[#4E5762] whitespace-pre-wrap">
                {testimonial.review ||
                  "No review provided."}
              </p>

            </div>
          </DetailSection>

        </div>

        {/* OVERVIEW */}

        <DetailSection
          eyebrow="Overview"
          title="Testimonial Information"
          icon={MessageSquare}
        >
          <div className="space-y-6">

            <InfoItem
              icon={Star}
              label="Rating"
              value={`${testimonial.rating || 0}/5`}
            />

            <InfoItem
              icon={Globe}
              label="Source"
              value={
                testimonial.source ===
                "tripadvisor"
                  ? "TripAdvisor"
                  : "Customer"
              }
            />

            <InfoItem
              icon={MessageSquare}
              label="Accent"
              value={testimonial.accent}
            />

            <InfoItem
              icon={Home}
              label="Homepage"
              value={
                testimonial.featuredOnHomepage
                  ? "Featured"
                  : "Not Featured"
              }
            />

            <InfoItem
              icon={ShieldCheck}
              label="Verified"
              value={
                testimonial.verified
                  ? "Yes"
                  : "No"
              }
            />

          </div>
        </DetailSection>

      </div>

      {/* ======================================================
          REVIEWER
      ====================================================== */}

      <DetailSection
        eyebrow="Reviewer"
        title="Customer Information"
        icon={User}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <InfoItem
            icon={User}
            label="Name"
            value={testimonial.name}
          />

          <InfoItem
            icon={MapPin}
            label="Location"
            value={testimonial.location}
          />

          <InfoItem
            icon={ShieldCheck}
            label="Verified"
            value={
              testimonial.verified
                ? "Verified customer"
                : "Not verified"
            }
          />

        </div>
      </DetailSection>

      {/* ======================================================
          AVATAR
      ====================================================== */}

      {testimonial.avatar && (
        <DetailSection
          eyebrow="Profile"
          title="Reviewer Avatar"
          icon={ImageIcon}
        >
          <div className="flex items-center justify-center rounded-xl bg-[#F8F9F9] border border-[#101A2E]/6 p-8">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
            />
          </div>
        </DetailSection>
      )}

      {/* ======================================================
          MODERATION
      ====================================================== */}

      <DetailSection
        eyebrow="Moderation"
        title="Approval Information"
        icon={ShieldCheck}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <InfoItem
            icon={MessageSquare}
            label="Status"
            value={testimonial.status}
          />

          <InfoItem
            icon={CalendarDays}
            label="Created"
            value={formatDateTime(
              testimonial.createdAt
            )}
          />

          <InfoItem
            icon={CheckCircle2}
            label="Approved At"
            value={formatDateTime(
              testimonial.approvedAt
            )}
          />

          <InfoItem
            icon={XCircle}
            label="Rejected At"
            value={formatDateTime(
              testimonial.rejectedAt
            )}
          />

        </div>
      </DetailSection>

      {/* ======================================================
          METADATA
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 pb-4">

        <p className="text-[11px] text-[#9AA1AA]">
          Testimonial ID: {testimonial._id}
        </p>

        <p className="text-[11px] text-[#9AA1AA]">
          Last updated:{" "}
          {formatDateTime(
            testimonial.updatedAt
          )}
        </p>

      </div>

    </section>
  );
}
