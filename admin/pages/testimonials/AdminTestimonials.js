import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  RefreshCw,
  Star,
  CheckCircle2,
  XCircle,
  Home,
  Trash2,
  ShieldCheck,
  MapPin,
  User,
  MessageSquare,
  Eye,
  Plus,
} from "lucide-react";

import {
  getAdminTestimonials,
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
      className: "bg-amber-50 text-amber-600 border-amber-100",
    },

    approved: {
      label: "Approved",
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },

    rejected: {
      label: "Rejected",
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };

  const current = config[status] || {
    label: status || "Unknown",
    className: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={[
        "inline-flex items-center",
        "px-2.5 py-1",
        "rounded-full",
        "border",
        "text-[10px]",
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
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1",
        "rounded-full",
        "border",
        "text-[10px]",
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
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            strokeWidth={1.5}
            className={
              star <= numericRating
                ? "fill-[#C9A24B] text-[#C9A24B]"
                : "text-[#D5D9DE]"
            }
          />
        ))}
      </div>

      <span className="ml-1 text-xs text-[#68717D]">{numericRating}/5</span>
    </div>
  );
}

// ============================================================
// ADMIN TESTIMONIALS
// ============================================================

export default function AdminTestimonials() {
  const navigate = useNavigate();

  // ==========================================================
  // DATA
  // ==========================================================

  const [testimonials, setTestimonials] = useState([]);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(null);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // ==========================================================
  // FETCH TESTIMONIALS
  // ==========================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminTestimonials();

      setTestimonials(response.data || []);
    } catch (error) {
      setError(error.message || "Unable to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ==========================================================
  // FILTERED TESTIMONIALS
  // ==========================================================

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesStatus =
      statusFilter === "all" || testimonial.status === statusFilter;

    const matchesSource =
      sourceFilter === "all" || testimonial.source === sourceFilter;

    return matchesStatus && matchesSource;
  });

  // ==========================================================
  // VIEW TESTIMONIAL
  // ==========================================================

  const handleView = (id) => {
    navigate(`/testimonials/${id}`);
  };

  // ==========================================================
  // ACTION HELPER
  // ==========================================================

  const runAction = async (id, action, actionFunction) => {
    try {
      setActionLoading(`${action}-${id}`);
      setError("");

      await actionFunction(id);

      await fetchTestimonials();
    } catch (error) {
      setError(error.message || `Unable to ${action} testimonial.`);
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================================
  // FEATURE / UNFEATURE
  // ==========================================================

  const handleFeatureToggle = async (testimonial) => {
    try {
      setActionLoading(`feature-${testimonial._id}`);

      setError("");

      await featureTestimonial(
        testimonial._id,
        !testimonial.featuredOnHomepage,
      );

      await fetchTestimonials();
    } catch (error) {
      setError(error.message || "Unable to update homepage feature.");
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the testimonial from ${testimonial.name}?`,
    );

    if (!confirmed) {
      return;
    }

    await runAction(testimonial._id, "delete", deleteTestimonial);
  };

  // ==========================================================
  // COUNTS
  // ==========================================================

  const pendingCount = testimonials.filter(
    (item) => item.status === "pending",
  ).length;

  const approvedCount = testimonials.filter(
    (item) => item.status === "approved",
  ).length;

  const rejectedCount = testimonials.filter(
    (item) => item.status === "rejected",
  ).length;

  const featuredCount = testimonials.filter(
    (item) => item.featuredOnHomepage,
  ).length;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <section className="space-y-6">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B] font-['Inter']">
            Reputation Management
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E] font-['Inter']">
            Testimonials
          </h2>

          <p className="mt-2 text-sm text-[#6F7782] font-['Inter']">
            Review customer feedback and manage homepage testimonials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/testimonials/create")}
            className="cursor-pointer inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#17243D] transition-all"
          >
            <Plus size={14} strokeWidth={1.8} />
            Create Testimonial
          </button>

          <button
            type="button"
            onClick={fetchTestimonials}
            disabled={loading}
            className="cursor-pointer inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              strokeWidth={1.7}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Total
            </p>

            <MessageSquare size={16} className="text-[#68717D]" />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {testimonials.length}
          </p>
        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Pending
            </p>

            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {pendingCount}
          </p>
        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Approved
            </p>

            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {approvedCount}
          </p>
        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Homepage
            </p>

            <Home size={16} className="text-[#C9A24B]" />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {featuredCount}
          </p>
        </div>
      </div>

      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] cursor-pointer"
          >
            <option value="all">All Status</option>

            <option value="pending">Pending</option>

            <option value="approved">Approved</option>

            <option value="rejected">Rejected</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] cursor-pointer"
          >
            <option value="all">All Sources</option>

            <option value="customer">Customer</option>

            <option value="tripadvisor">TripAdvisor</option>
          </select>
        </div>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchTestimonials}
            className="mt-2 text-xs font-medium text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-[#101A2E]/8 bg-[#F8F9F9]">
                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Reviewer
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Review
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Rating
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Source
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Status
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Homepage
                </th>

                <th className="text-right px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading && (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

                      <p className="mt-4 text-sm text-[#7A828D]">
                        Loading testimonials...
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* ==================================================
                  EMPTY
              ================================================== */}

              {!loading && !error && filteredTestimonials.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <MessageSquare
                      size={25}
                      strokeWidth={1.4}
                      className="mx-auto text-[#B1B7BE]"
                    />

                    <p className="mt-4 text-sm text-[#6F7782]">
                      No testimonials found.
                    </p>

                    <p className="text-xs text-[#9AA1AA] mt-1">
                      Try changing your filters.
                    </p>
                  </td>
                </tr>
              )}

              {/* ==================================================
                  TESTIMONIALS
              ================================================== */}

              {!loading &&
                filteredTestimonials.map((testimonial) => {
                  const approveLoading =
                    actionLoading === `approve-${testimonial._id}`;

                  const rejectLoading =
                    actionLoading === `reject-${testimonial._id}`;

                  const featureLoading =
                    actionLoading === `feature-${testimonial._id}`;

                  const deleteLoading =
                    actionLoading === `delete-${testimonial._id}`;

                  return (
                    <tr
                      key={testimonial._id}
                      className="border-b border-[#101A2E]/6 last:border-b-0 hover:bg-[#FAFBFB] transition-colors"
                    >
                      {/* REVIEWER */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {testimonial.avatar ? (
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-10 h-10 rounded-full object-cover border border-[#101A2E]/8"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#101A2E]/5 flex items-center justify-center">
                              <User size={16} className="text-[#68717D]" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-[#101A2E]">
                                {testimonial.name || "—"}
                              </p>

                              {testimonial.verified && (
                                <ShieldCheck
                                  size={13}
                                  className="text-emerald-500"
                                />
                              )}
                            </div>

                            <div className="flex items-center gap-1 mt-1">
                              <MapPin size={11} className="text-[#9AA1AA]" />

                              <p className="text-[11px] text-[#8A929D]">
                                {testimonial.location || "—"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* REVIEW */}

                      <td className="px-5 py-4">
                        <p className="max-w-[330px] text-xs leading-5 text-[#4E5762] line-clamp-3">
                          {testimonial.review || "—"}
                        </p>
                      </td>

                      {/* RATING */}

                      <td className="px-5 py-4">
                        <Rating rating={testimonial.rating} />
                      </td>

                      {/* SOURCE */}

                      <td className="px-5 py-4">
                        <SourceBadge source={testimonial.source} />
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <StatusBadge status={testimonial.status} />
                      </td>

                      {/* HOMEPAGE */}

                      <td className="px-5 py-4">
                        {testimonial.featuredOnHomepage ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#C9A24B]">
                            <Home size={13} />
                            Featured
                          </span>
                        ) : (
                          <span className="text-xs text-[#9AA1AA]">
                            Not featured
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() => handleView(testimonial._id)}
                            className="w-8 h-8 rounded-lg border border-[#101A2E]/10 text-[#68717D] hover:bg-[#101A2E] hover:text-white flex items-center justify-center transition-all"
                            title="View testimonial"
                          >
                            <Eye size={14} />
                          </button>

                          {/* APPROVE */}

                          {testimonial.status !== "approved" && (
                            <button
                              type="button"
                              disabled={
                                approveLoading ||
                                rejectLoading ||
                                featureLoading ||
                                deleteLoading
                              }
                              onClick={() =>
                                runAction(
                                  testimonial._id,
                                  "approve",
                                  approveTestimonial,
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-emerald-100 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-all disabled:opacity-40"
                              title="Approve"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}

                          {/* REJECT */}

                          {testimonial.status !== "rejected" && (
                            <button
                              type="button"
                              disabled={
                                approveLoading ||
                                rejectLoading ||
                                featureLoading ||
                                deleteLoading
                              }
                              onClick={() =>
                                runAction(
                                  testimonial._id,
                                  "reject",
                                  rejectTestimonial,
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 flex items-center justify-center transition-all disabled:opacity-40"
                              title="Reject"
                            >
                              <XCircle size={14} />
                            </button>
                          )}

                          {/* FEATURE */}

                          {testimonial.status === "approved" &&
                            testimonial.source === "tripadvisor" && (
                              <button
                                type="button"
                                disabled={
                                  featureLoading ||
                                  approveLoading ||
                                  rejectLoading ||
                                  deleteLoading
                                }
                                onClick={() => handleFeatureToggle(testimonial)}
                                className={[
                                  "w-8 h-8 rounded-lg border flex items-center justify-center transition-all disabled:opacity-40",
                                  testimonial.featuredOnHomepage
                                    ? "border-[#C9A24B]/30 text-[#C9A24B] bg-[#C9A24B]/5 hover:bg-[#C9A24B]/10"
                                    : "border-[#101A2E]/10 text-[#68717D] hover:bg-[#101A2E]/5",
                                ].join(" ")}
                                title={
                                  testimonial.featuredOnHomepage
                                    ? "Remove from homepage"
                                    : "Feature on homepage"
                                }
                              >
                                <Home size={14} />
                              </button>
                            )}

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={
                              approveLoading ||
                              rejectLoading ||
                              featureLoading ||
                              deleteLoading
                            }
                            onClick={() => handleDelete(testimonial)}
                            className="w-8 h-8 rounded-lg border border-[#101A2E]/10 text-[#68717D] hover:bg-red-50 hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all disabled:opacity-40"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* ======================================================
            FOOTER
        ====================================================== */}

        {!loading && filteredTestimonials.length > 0 && (
          <div className="border-t border-[#101A2E]/8 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-[#7A828D]">
              Showing{" "}
              <span className="font-medium text-[#101A2E]">
                {filteredTestimonials.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[#101A2E]">
                {testimonials.length}
              </span>{" "}
              testimonials
            </p>

            <p className="text-[11px] text-[#9AA1AA]">
              Rejected: {rejectedCount}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
