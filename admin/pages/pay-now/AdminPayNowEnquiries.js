"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Edit3,
  Eye,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

import {
  deletePayNowEnquiry,
  getPayNowDashboardStats,
  getPayNowEnquiries,
  updatePayNowEnquiryNotes,
  updatePayNowEnquiryRisk,
  updatePayNowEnquiryStatus,
} from "../../services/adminApi";


// ============================================================
// CONSTANTS
// ============================================================

const STATUS_OPTIONS = [
  "new",
  "contacted",
  "payment-link-sent",
  "paid",
  "cancelled",
];

const RISK_OPTIONS = [
  "normal",
  "suspicious",
  "high-risk",
];


// ============================================================
// HELPERS
// ============================================================

const formatStatus = (status) => {
  if (!status) return "Unknown";

  return status
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

const formatCurrency = (amount) => {
  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(Number(amount))
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount));
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const styles = {
    new: "bg-blue-50 text-blue-700 border-blue-200",
    contacted:
      "bg-amber-50 text-amber-700 border-amber-200",
    "payment-link-sent":
      "bg-purple-50 text-purple-700 border-purple-200",
    paid:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled:
      "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    new: Clock3,
    contacted: MessageSquare,
    "payment-link-sent": CreditCard,
    paid: CheckCircle2,
    cancelled: X,
  };

  const Icon = icons[status] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      <Icon size={13} />
      {formatStatus(status)}
    </span>
  );
}


// ============================================================
// RISK BADGE
// ============================================================

function RiskBadge({ riskLevel }) {
  const styles = {
    normal:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    suspicious:
      "bg-amber-50 text-amber-700 border-amber-200",

    "high-risk":
      "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        styles[riskLevel] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {riskLevel !== "normal" && (
        <ShieldAlert size={13} />
      )}

      {formatStatus(riskLevel || "normal")}
    </span>
  );
}


// ============================================================
// SELECT
// ============================================================

function SelectField({
  value,
  onChange,
  options,
  disabled = false,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={disabled}
        className="h-10 appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-[#124d56] focus:ring-2 focus:ring-[#124d56]/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatStatus(option)}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}


// ============================================================
// NOTES MODAL
// ============================================================

function NotesModal({
  enquiry,
  onClose,
  onSave,
  saving,
}) {
  const [notes, setNotes] = useState(
    enquiry?.adminNotes || ""
  );

  if (!enquiry) return null;

  const customerName =
    enquiry.customer?.name || "Customer";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#124d56]">
              Internal notes
            </p>

            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {customerName}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={7}
            placeholder="Add internal notes about this payment request..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
          />

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => onSave(notes)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#124d56] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0e3e45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              )}

              Save notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// RISK MODAL
// ============================================================

function RiskModal({
  enquiry,
  onClose,
  onSave,
  saving,
}) {
  const [riskLevel, setRiskLevel] = useState(
    enquiry?.leadMetadata?.riskLevel ||
      "normal"
  );

  const [riskReason, setRiskReason] = useState(
    enquiry?.leadMetadata?.riskReasons?.[0] ||
      ""
  );

  if (!enquiry) return null;

  const requiresReason =
    riskLevel === "suspicious" ||
    riskLevel === "high-risk";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#124d56]">
              Risk assessment
            </p>

            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              Update risk level
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Risk level
            </label>

            <SelectField
              value={riskLevel}
              onChange={setRiskLevel}
              options={RISK_OPTIONS}
            />
          </div>

          {requiresReason && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Reason
              </label>

              <textarea
                value={riskReason}
                onChange={(event) =>
                  setRiskReason(
                    event.target.value
                  )
                }
                rows={5}
                placeholder="Explain why this payment request is suspicious..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                saving ||
                (requiresReason &&
                  !riskReason.trim())
              }
              onClick={() =>
                onSave(
                  riskLevel,
                  riskReason
                )
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[#124d56] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0e3e45] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              )}

              Update risk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  label,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#124d56]/10 text-[#124d56]">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AdminPayNowEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [perPage] = useState(20);

  const [totalEnquiries, setTotalEnquiries] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const [hasNextPage, setHasNextPage] =
    useState(false);

  const [
    hasPreviousPage,
    setHasPreviousPage,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [riskLevel, setRiskLevel] =
    useState("");

  const [stats, setStats] =
    useState(null);

  const [notesEnquiry, setNotesEnquiry] =
    useState(null);

  const [riskEnquiry, setRiskEnquiry] =
    useState(null);

  const [savingNotes, setSavingNotes] =
    useState(false);

  const [savingRisk, setSavingRisk] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [updatingStatusId, setUpdatingStatusId] =
    useState(null);


  // ==========================================================
  // FETCH ENQUIRIES
  // ==========================================================

  const fetchEnquiries = useCallback(
    async (
      page = currentPage,
      showRefresh = false
    ) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response =
          await getPayNowEnquiries({
            page,
            limit: perPage,
            status,
            riskLevel,
            search,
          });

        setEnquiries(
          response?.enquiries || []
        );

        const pagination =
          response?.pagination || {};

        setCurrentPage(
          pagination.currentPage ||
            page
        );

        setTotalEnquiries(
          pagination.totalEnquiries || 0
        );

        setTotalPages(
          pagination.totalPages || 0
        );

        setHasNextPage(
          Boolean(
            pagination.hasNextPage
          )
        );

        setHasPreviousPage(
          Boolean(
            pagination.hasPreviousPage
          )
        );
      } catch (err) {
        console.error(
          "Failed to fetch Pay Now enquiries:",
          err
        );

        setError(
          err?.message ||
            "Unable to load Pay Now enquiries."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      currentPage,
      perPage,
      status,
      riskLevel,
      search,
    ]
  );


  // ==========================================================
  // FETCH STATS
  // ==========================================================

  const fetchStats = useCallback(
    async () => {
      try {
        const response =
          await getPayNowDashboardStats();

        setStats(
          response?.data || null
        );
      } catch (err) {
        console.error(
          "Failed to fetch Pay Now dashboard stats:",
          err
        );
      }
    },
    []
  );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchEnquiries(
      currentPage,
      false
    );
  }, [
    currentPage,
    status,
    riskLevel,
    fetchEnquiries,
  ]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);


  // ==========================================================
  // SEARCH
  // ==========================================================

  useEffect(() => {
    const timeout =
      setTimeout(() => {
        setCurrentPage(1);

        fetchEnquiries(1);
      }, 450);

    return () => clearTimeout(timeout);
  }, [search]);


  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (
    enquiry
  ) => {
    const customerName =
      enquiry?.customer?.name ||
      "this customer";

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the Pay Now request from ${customerName}? This action cannot be undone.`
      );

    if (!confirmed) return;

    try {
      setDeletingId(enquiry._id);

      await deletePayNowEnquiry(
        enquiry._id
      );

      setEnquiries((previous) =>
        previous.filter(
          (item) =>
            item._id !== enquiry._id
        )
      );

      setTotalEnquiries(
        (previous) =>
          Math.max(previous - 1, 0)
      );

      fetchStats();
    } catch (err) {
      window.alert(
        err?.message ||
          "Unable to delete Pay Now request."
      );
    } finally {
      setDeletingId(null);
    }
  };


  // ==========================================================
  // STATUS
  // ==========================================================

  const handleStatusChange = async (
    enquiry,
    nextStatus
  ) => {
    if (
      !nextStatus ||
      nextStatus === enquiry.status
    ) {
      return;
    }

    try {
      setUpdatingStatusId(
        enquiry._id
      );

      const response =
        await updatePayNowEnquiryStatus(
          enquiry._id,
          nextStatus
        );

      const updated =
        response?.enquiry;

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id === enquiry._id
            ? {
                ...item,
                status:
                  updated?.status ||
                  nextStatus,
                updatedAt:
                  updated?.updatedAt ||
                  item.updatedAt,
              }
            : item
        )
      );

      fetchStats();
    } catch (err) {
      window.alert(
        err?.message ||
          "Unable to update status."
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };


  // ==========================================================
  // SAVE NOTES
  // ==========================================================

  const handleSaveNotes = async (
    notes
  ) => {
    if (!notesEnquiry) return;

    try {
      setSavingNotes(true);

      const response =
        await updatePayNowEnquiryNotes(
          notesEnquiry._id,
          notes
        );

      const updated =
        response?.enquiry;

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id ===
          notesEnquiry._id
            ? {
                ...item,
                adminNotes:
                  updated?.adminNotes ??
                  notes,
                updatedAt:
                  updated?.updatedAt ||
                  item.updatedAt,
              }
            : item
        )
      );

      setNotesEnquiry(null);
    } catch (err) {
      window.alert(
        err?.message ||
          "Unable to save notes."
      );
    } finally {
      setSavingNotes(false);
    }
  };


  // ==========================================================
  // SAVE RISK
  // ==========================================================

  const handleSaveRisk = async (
    nextRiskLevel,
    riskReason
  ) => {
    if (!riskEnquiry) return;

    try {
      setSavingRisk(true);

      const response =
        await updatePayNowEnquiryRisk(
          riskEnquiry._id,
          nextRiskLevel,
          riskReason
        );

      const updated =
        response?.enquiry;

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id ===
          riskEnquiry._id
            ? {
                ...item,
                leadMetadata: {
                  ...item.leadMetadata,
                  riskLevel:
                    updated?.riskLevel ||
                    nextRiskLevel,
                  riskReasons:
                    updated?.riskReasons ||
                    (nextRiskLevel ===
                    "normal"
                      ? []
                      : [riskReason]),
                },
                updatedAt:
                  updated?.updatedAt ||
                  item.updatedAt,
              }
            : item
        )
      );

      setRiskEnquiry(null);
    } catch (err) {
      window.alert(
        err?.message ||
          "Unable to update risk."
      );
    } finally {
      setSavingRisk(false);
    }
  };


  // ==========================================================
  // STATS VALUES
  // ==========================================================

  const overview =
    stats?.overview || {};

  const riskStats =
    stats?.risk || {};

  const totalRequested =
    stats?.amounts?.totalRequested || 0;

  const totalPaid =
    stats?.amounts?.totalPaid || 0;


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f7f9f9]">
      <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#124d56]">
              <CreditCard size={15} />
              Payment requests
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Pay Now Enquiries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage customer payment requests,
              review risk signals and track
              payment progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              fetchEnquiries(
                currentPage,
                true
              );
              fetchStats();
            }}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>


        {/* ====================================================
            STATS
        ==================================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Total requests"
            value={overview.total ?? totalEnquiries}
            icon={FileText}
            description={`${stats?.period?.thisMonth || 0} this month`}
          />

          <StatCard
            label="New"
            value={overview.new || 0}
            icon={Clock3}
            description="Awaiting action"
          />

          <StatCard
            label="Payment link sent"
            value={overview.paymentLinkSent || 0}
            icon={CreditCard}
            description="Awaiting payment"
          />

          <StatCard
            label="Paid"
            value={overview.paid || 0}
            icon={CheckCircle2}
            description={formatCurrency(totalPaid)}
          />

          <StatCard
            label="High risk"
            value={riskStats.highRisk || 0}
            icon={ShieldAlert}
            description={`${riskStats.suspicious || 0} suspicious`}
          />
        </div>


        {/* ====================================================
            AMOUNT SUMMARY
        ==================================================== */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#124d56]/10 text-[#124d56]">
                <CreditCard size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Total requested
                </p>

                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {formatCurrency(
                    totalRequested
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  Total paid
                </p>

                <p className="mt-1 text-xl font-semibold text-slate-900">
                  {formatCurrency(
                    totalPaid
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* ====================================================
            FILTERS
        ==================================================== */}

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search customer, email, telephone or description..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                  className="h-11 min-w-[180px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#124d56] focus:ring-4 focus:ring-[#124d56]/10"
                >
                  <option value="">
                    All statuses
                  </option>

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

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={riskLevel}
                  onChange={(event) => {
                    setRiskLevel(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                  className="h-11 min-w-[160px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#124d56] focus:ring-4 focus:ring-[#124d56]/10"
                >
                  <option value="">
                    All risk levels
                  </option>

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

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {(search ||
                status ||
                riskLevel) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatus("");
                    setRiskLevel("");
                    setCurrentPage(1);
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={15} />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>


        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">
                Unable to load payment requests
              </p>

              <p className="mt-1 text-xs text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchEnquiries(
                  currentPage,
                  true
                )
              }
              className="text-xs font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}


        {/* ====================================================
            TABLE
        ==================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Description
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Risk
                  </th>

                  <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Created
                  </th>

                  <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-20 text-center"
                    >
                      <Loader2
                        size={28}
                        className="mx-auto animate-spin text-[#124d56]"
                      />

                      <p className="mt-3 text-sm text-slate-500">
                        Loading payment requests...
                      </p>
                    </td>
                  </tr>
                ) : enquiries.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-20 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <CreditCard size={22} />
                      </div>

                      <p className="mt-4 text-sm font-medium text-slate-800">
                        No payment requests found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your filters
                        or search term.
                      </p>
                    </td>
                  </tr>
                ) : (
                  enquiries.map(
                    (enquiry) => {
                      const customer =
                        enquiry.customer ||
                        {};

                      const enquiryRisk =
                        enquiry
                          .leadMetadata
                          ?.riskLevel ||
                        "normal";

                      return (
                        <tr
                          key={enquiry._id}
                          className="group transition hover:bg-slate-50/70"
                        >
                          {/* CUSTOMER */}

                          <td className="px-5 py-5">
                            <div>
                              <p className="font-medium text-slate-900">
                                {customer.name ||
                                  "—"}
                              </p>

                              <div className="mt-1 space-y-0.5">
                                <a
                                  href={`mailto:${customer.email || ""}`}
                                  className="block text-xs text-slate-500 transition hover:text-[#124d56]"
                                >
                                  {customer.email ||
                                    "—"}
                                </a>

                                <a
                                  href={`tel:${customer.telephone || ""}`}
                                  className="block text-xs text-slate-400 transition hover:text-[#124d56]"
                                >
                                  {customer.telephone ||
                                    "—"}
                                </a>
                              </div>
                            </div>
                          </td>


                          {/* AMOUNT */}

                          <td className="px-5 py-5">
                            <p className="font-semibold text-slate-900">
                              {formatCurrency(
                                enquiry.amount
                              )}
                            </p>
                          </td>


                          {/* DESCRIPTION */}

                          <td className="max-w-[260px] px-5 py-5">
                            <p
                              title={
                                enquiry.description
                              }
                              className="truncate text-sm text-slate-600"
                            >
                              {enquiry.description ||
                                "—"}
                            </p>
                          </td>


                          {/* STATUS */}

                          <td className="px-5 py-5">
                            <SelectField
                              value={
                                enquiry.status ||
                                "new"
                              }
                              onChange={(
                                value
                              ) =>
                                handleStatusChange(
                                  enquiry,
                                  value
                                )
                              }
                              options={
                                STATUS_OPTIONS
                              }
                              disabled={
                                updatingStatusId ===
                                enquiry._id
                              }
                            />
                          </td>


                          {/* RISK */}

                          <td className="px-5 py-5">
                            <button
                              type="button"
                              onClick={() =>
                                setRiskEnquiry(
                                  enquiry
                                )
                              }
                              className="transition hover:scale-[1.02]"
                              title="Update risk"
                            >
                              <RiskBadge
                                riskLevel={
                                  enquiryRisk
                                }
                              />
                            </button>
                          </td>


                          {/* CREATED */}

                          <td className="whitespace-nowrap px-5 py-5">
                            <p className="text-sm text-slate-700">
                              {formatDate(
                                enquiry.createdAt
                              )}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {formatDateTime(
                                enquiry.createdAt
                              )
                                .split(",")
                                .slice(1)
                                .join(",")
                                .trim()}
                            </p>
                          </td>


                          {/* ACTIONS */}

                          <td className="px-5 py-5">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setNotesEnquiry(
                                    enquiry
                                  )
                                }
                                title="Notes"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#124d56]"
                              >
                                <MessageSquare
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/pay-now/${enquiry._id}`
                                  )
                                }
                                title="View"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#124d56]"
                              >
                                <Eye
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/pay-now/${enquiry._id}/edit`
                                  )
                                }
                                title="Edit"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#124d56]"
                              >
                                <Edit3
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    enquiry
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  enquiry._id
                                }
                                title="Delete"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {deletingId ===
                                enquiry._id ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={16}
                                  />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>


          {/* ==================================================
              PAGINATION
          ================================================== */}

          {!loading &&
            enquiries.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-medium text-slate-700">
                    {(currentPage - 1) *
                      perPage +
                      1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-slate-700">
                    {Math.min(
                      currentPage *
                        perPage,
                      totalEnquiries
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-700">
                    {totalEnquiries}
                  </span>{" "}
                  requests
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={
                      !hasPreviousPage ||
                      loading
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            page - 1,
                            1
                          )
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft
                      size={16}
                    />
                  </button>

                  <span className="min-w-[90px] text-center text-xs font-medium text-slate-600">
                    Page {currentPage}{" "}
                    of{" "}
                    {Math.max(
                      totalPages,
                      1
                    )}
                  </span>

                  <button
                    type="button"
                    disabled={
                      !hasNextPage ||
                      loading
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          page + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            )}
        </div>


        {/* ====================================================
            MODALS
        ==================================================== */}

        {notesEnquiry && (
          <NotesModal
            enquiry={notesEnquiry}
            onClose={() =>
              setNotesEnquiry(null)
            }
            onSave={handleSaveNotes}
            saving={savingNotes}
          />
        )}

        {riskEnquiry && (
          <RiskModal
            enquiry={riskEnquiry}
            onClose={() =>
              setRiskEnquiry(null)
            }
            onSave={handleSaveRisk}
            saving={savingRisk}
          />
        )}
      </div>
    </div>
  );
}