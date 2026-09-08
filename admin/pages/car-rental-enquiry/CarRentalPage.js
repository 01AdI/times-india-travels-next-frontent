import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Filter,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { useNavigate } from "react-router";

import {
  deleteCarRentalEnquiry,
  getCarRentalDashboardStats,
  getCarRentalEnquiries,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";
const BACKGROUND = "#F5F7F6";

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

const DEFAULT_PAGINATION = {
  currentPage: 1,
  perPage: 20,
  totalEnquiries: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

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

const STATUS_CONFIG = {
  new: {
    label: "New",
    dot: "bg-blue-500",
    badge:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  contacted: {
    label: "Contacted",
    dot: "bg-violet-500",
    badge:
      "bg-violet-50 text-violet-700 border-violet-200",
  },

  "quotation-sent": {
    label: "Quotation Sent",
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200",
  },

  "follow-up": {
    label: "Follow Up",
    dot: "bg-orange-500",
    badge:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  confirmed: {
    label: "Confirmed",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    badge:
      "bg-red-50 text-red-700 border-red-200",
  },
};

const RISK_CONFIG = {
  normal: {
    label: "Normal",
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  suspicious: {
    label: "Suspicious",
    dot: "bg-amber-500",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200",
  },

  "high-risk": {
    label: "High Risk",
    dot: "bg-red-500",
    badge:
      "bg-red-50 text-red-700 border-red-200",
  },
};

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] || {
      label: formatStatus(status),
      dot: "bg-gray-400",
      badge:
        "bg-gray-50 text-gray-600 border-gray-200",
    };

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold ${config.badge}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
      />

      {config.label}
    </span>
  );
}

function RiskBadge({ riskLevel }) {
  const config =
    RISK_CONFIG[riskLevel] || {
      label: formatStatus(riskLevel),
      dot: "bg-gray-400",
      badge:
        "bg-gray-50 text-gray-600 border-gray-200",
    };

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold ${config.badge}`}
    >
      {riskLevel !== "normal" ? (
        <ShieldAlert size={12} />
      ) : (
        <span
          className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
        />
      )}

      {config.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#101A2E]/40">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#101A2E]">
            {value ?? 0}
          </p>

          <p className="mt-1 text-xs text-[#101A2E]/40">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#101A2E]/5">
          <Icon
            size={18}
            strokeWidth={1.7}
            className="text-[#101A2E]/65"
          />
        </div>
      </div>
    </div>
  );
}

function TableSkeletonRow() {
  return (
    <tr className="border-b border-[#101A2E]/7">
      <td className="px-6 py-6">
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-[#101A2E]/[0.07]" />
          <div className="h-3 w-44 animate-pulse rounded bg-[#101A2E]/5" />
          <div className="h-3 w-32 animate-pulse rounded bg-[#101A2E]/4" />
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-[#101A2E]/[0.07]" />
          <div className="h-3 w-24 animate-pulse rounded bg-[#101A2E]/5" />
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="h-4 w-28 animate-pulse rounded bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-4 w-24 animate-pulse rounded bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-4 w-20 animate-pulse rounded bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-4 w-16 animate-pulse rounded bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-7 w-24 animate-pulse rounded-full bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-7 w-20 animate-pulse rounded-full bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="h-4 w-24 animate-pulse rounded bg-[#101A2E]/[0.07]" />
      </td>

      <td className="px-6 py-6">
        <div className="flex justify-end gap-2">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#101A2E]/[0.07]" />
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#101A2E]/[0.07]" />
          <div className="h-9 w-9 animate-pulse rounded-lg bg-[#101A2E]/[0.07]" />
        </div>
      </td>
    </tr>
  );
}

export default function CarRentalEnquiriesPage() {
  const navigate = useNavigate();


  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [stats, setStats] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =useState("");
  const [riskFilter, setRiskFilter] =useState("");

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] =useState(true);

  const [refreshing, setRefreshing] =useState(false);

  const [deleting, setDeleting] =useState(false);

  const [error, setError] = useState("");

  const [deleteModal, setDeleteModal] =useState({open: false,enquiry: null,});


  const loadEnquiries = async ({requestedPage = page,showRefresh = false,} = {}) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response =
        await getCarRentalEnquiries({
          page: requestedPage,
          limit: 20,
          status:
            statusFilter || undefined,
          riskLevel:
            riskFilter || undefined,
          search:
            search.trim() || undefined,
        });

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Failed to fetch car rental enquiries."
        );
      }

      const enquiryList =
        response?.enquiries ||
        response?.data?.enquiries ||
        [];

      setEnquiries(
        Array.isArray(enquiryList)
          ? enquiryList
          : []
      );

      const apiPagination =
        response?.pagination ||
        response?.data?.pagination ||
        {};

      setPagination({
        ...DEFAULT_PAGINATION,
        ...apiPagination,
        currentPage:
          apiPagination.currentPage ||
          requestedPage,
      });
    } catch (err) {
      console.error(
        "Failed to load car rental enquiries:",
        err
      );

      setError(
        err?.message ||
          "Failed to fetch car rental enquiries."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadStats = async () => {
    try {
      setStatsLoading(true);

      const response =
        await getCarRentalDashboardStats();

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Failed to fetch dashboard statistics."
        );
      }

      setStats(
        response?.data ||
          response ||
          null
      );
    } catch (err) {
      console.error(
        "Failed to load car rental stats:",
        err
      );
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEnquiries({
        requestedPage: page,
      });
    }, 350);

    return () =>
      clearTimeout(timer);
  }, [
    page,
    search,
    statusFilter,
    riskFilter,
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const handleRefresh = async () => {
    await Promise.all([
      loadEnquiries({
        requestedPage:
          pagination.currentPage || 1,
        showRefresh: true,
      }),
      loadStats(),
    ]);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(
      event.target.value
    );

    setPage(1);
  };

  const handleRiskChange = (event) => {
    setRiskFilter(
      event.target.value
    );

    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setRiskFilter("");
    setPage(1);
  };

  const hasFilters =
    Boolean(search.trim()) ||
    Boolean(statusFilter) ||
    Boolean(riskFilter);

  const handleDelete = async () => {
    const enquiryId =
      deleteModal.enquiry?._id;

    if (!enquiryId) {
      setError(
        "Unable to identify the car rental enquiry."
      );

      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response =
        await deleteCarRentalEnquiry(
          enquiryId
        );

      if (response?.success === false) {
        throw new Error(
          response?.message ||
            "Unable to delete enquiry."
        );
      }

      setDeleteModal({
        open: false,
        enquiry: null,
      });

      if (
        enquiries.length === 1 &&
        page > 1
      ) {
        setPage((previousPage) =>
          Math.max(
            previousPage - 1,
            1
          )
        );
      } else {
        await loadEnquiries({
          requestedPage: page,
        });
      }

      await loadStats();
    } catch (err) {
      console.error(
        "Failed to delete car rental enquiry:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete car rental enquiry."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handlePreviousPage = () => {
    if (
      !pagination.hasPreviousPage
    ) {
      return;
    }

    setPage((previousPage) =>
      Math.max(
        previousPage - 1,
        1
      )
    );
  };

  const handleNextPage = () => {
    if (
      !pagination.hasNextPage
    ) {
      return;
    }

    setPage(
      (previousPage) =>
        previousPage + 1
    );
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setDeleteModal({
      open: false,
      enquiry: null,
    });
  };

  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"
      style={{
        backgroundColor: BACKGROUND,
      }}
    >
      <div className="mx-auto max-w-[1750px]">

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Car
                size={17}
                style={{
                  color: GOLD,
                }}
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#101A2E]/45">
                Enquiry Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#101A2E] sm:text-3xl">
              Car Rental Enquiries
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#101A2E]/50">
              Review customer rental
              requests, understand their
              requirements and manage each
              enquiry through the sales
              process.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#101A2E] px-5 text-sm font-semibold text-[#F4EFE4] shadow-sm transition-all duration-300 hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:cursor-not-allowed disabled:opacity-60"
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

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-red-700">
                Something went wrong
              </p>

              <p className="mt-1 text-xs leading-relaxed text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="rounded-lg p-1 text-red-400 transition hover:bg-red-100 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            label="Total Enquiries"
            value={
              statsLoading
                ? "—"
                : stats?.overview
                    ?.total
            }
            icon={FileText}
            description="All rental enquiries"
          />

          <StatCard
            label="Today"
            value={
              statsLoading
                ? "—"
                : stats?.period
                    ?.today
            }
            icon={CalendarDays}
            description="Received today"
          />

          <StatCard
            label="This Week"
            value={
              statsLoading
                ? "—"
                : stats?.period
                    ?.thisWeek
            }
            icon={Clock}
            description="Received this week"
          />

          <StatCard
            label="Confirmed"
            value={
              statsLoading
                ? "—"
                : stats?.overview
                    ?.confirmed
            }
            icon={CheckCircle2}
            description="Confirmed rentals"
          />

        </div>

        <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
              New
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-blue-600">
              {statsLoading
                ? "—"
                : stats?.overview
                    ?.new ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
              Contacted
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-violet-600">
              {statsLoading
                ? "—"
                : stats?.overview
                    ?.contacted ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
              Suspicious
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-amber-600">
              {statsLoading
                ? "—"
                : stats?.risk
                    ?.suspicious ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white px-5 py-4 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
              High Risk
            </p>

            <p className="mt-1.5 text-2xl font-semibold text-red-600">
              {statsLoading
                ? "—"
                : stats?.risk
                    ?.highRisk ?? 0}
            </p>
          </div>

        </div>

        <div className="mb-7 overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white shadow-sm">

          {/* FILTER HEADER */}

          <div className="flex flex-col gap-3 border-b border-[#101A2E]/7 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#101A2E]/5">
                <Filter
                  size={16}
                  className="text-[#101A2E]/60"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#101A2E]">
                  Find enquiries
                </p>

                <p className="mt-0.5 text-[11px] text-[#101A2E]/40">
                  Search and narrow down
                  customer requests.
                </p>
              </div>

            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={
                  handleClearFilters
                }
                className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-2 text-xs font-semibold text-[#101A2E]/55 transition hover:bg-[#101A2E]/5 hover:text-[#101A2E] sm:self-auto"
              >
                <X size={13} />
                Clear all
              </button>
            )}

          </div>

          {/* FILTER BODY */}

          <div className="p-5">

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_210px_210px]">

              {/* SEARCH */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                  Search
                </label>

                <div className="relative">

                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#101A2E]/30"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(
                        event.target.value
                      );

                      if (page !== 1) {
                        setPage(1);
                      }
                    }}
                    placeholder="Name, email, phone, package or vehicle..."
                    className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F7F8F7] pl-10 pr-4 text-sm text-[#101A2E] outline-none transition-all duration-200 placeholder:text-[#101A2E]/30 focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/10"
                  />

                </div>
              </div>

              {/* STATUS */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                  Status
                </label>

                <div className="relative">

                  <select
                    value={statusFilter}
                    onChange={
                      handleStatusChange
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-[#101A2E]/10 bg-[#F7F8F7] px-3.5 pr-9 text-sm text-[#101A2E] outline-none transition-all duration-200 focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/10"
                  >
                    <option value="">
                      All statuses
                    </option>

                    {STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {formatStatus(
                            status
                          )}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#101A2E]/35"
                  />

                </div>
              </div>

              {/* RISK */}

              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                  Risk Level
                </label>

                <div className="relative">

                  <select
                    value={riskFilter}
                    onChange={
                      handleRiskChange
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-[#101A2E]/10 bg-[#F7F8F7] px-3.5 pr-9 text-sm text-[#101A2E] outline-none transition-all duration-200 focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/10"
                  >
                    <option value="">
                      All risk levels
                    </option>

                    {RISK_OPTIONS.map(
                      (risk) => (
                        <option
                          key={risk}
                          value={risk}
                        >
                          {formatStatus(
                            risk
                          )}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#101A2E]/35"
                  />

                </div>
              </div>

            </div>

            {/* ACTIVE FILTERS */}

            {hasFilters && (
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#101A2E]/7 pt-4">

                <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#101A2E]/35">
                  Active:
                </span>

                {search.trim() && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#101A2E]/8 bg-[#101A2E]/4 px-3 py-1.5 text-[11px] font-medium text-[#101A2E]/65">
                    Search:
                    <span className="max-w-45 truncate">
                      {search.trim()}
                    </span>
                  </span>
                )}

                {statusFilter && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700">
                    Status:
                    {formatStatus(
                      statusFilter
                    )}
                  </span>
                )}

                {riskFilter && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-700">
                    Risk:
                    {formatStatus(
                      riskFilter
                    )}
                  </span>
                )}

              </div>
            )}

          </div>
        </div>

        {!loading && (
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-[#101A2E]/55">
                Showing{" "}
                <span className="font-semibold text-[#101A2E]">
                  {enquiries.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#101A2E]">
                  {pagination.totalEnquiries ??
                    0}
                </span>{" "}
                enquiries
              </p>
            </div>

            <p className="text-xs text-[#101A2E]/40">
              Page{" "}
              <span className="font-semibold text-[#101A2E]/70">
                {pagination.currentPage ||
                  1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#101A2E]/70">
                {pagination.totalPages ||
                  1}
              </span>
            </p>

          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-362.5 border-collapse">

              {/* TABLE HEAD */}

              <thead>
                <tr className="border-b border-[#101A2E]/10 bg-[#F8F9F8]">

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Package
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Vehicle
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Travel Date
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Duration
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Guests
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Risk
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Received
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/40">
                    Actions
                  </th>

                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>

                {/* LOADING */}

                {loading &&
                  Array.from({
                    length: 8,
                  }).map(
                    (_, index) => (
                      <TableSkeletonRow
                        key={index}
                      />
                    )
                  )}

                {/* EMPTY */}

                {!loading &&
                  enquiries.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-6 py-24 text-center"
                      >
                        <div className="mx-auto max-w-md">

                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#101A2E]/5">
                            <Car
                              size={27}
                              strokeWidth={
                                1.5
                              }
                              className="text-[#101A2E]/30"
                            />
                          </div>

                          <h2 className="mt-5 text-base font-semibold text-[#101A2E]">
                            No enquiries
                            found
                          </h2>

                          <p className="mt-2 text-sm leading-relaxed text-[#101A2E]/45">
                            {hasFilters
                              ? "No enquiries match your current search or filters."
                              : "There are no car rental enquiries yet."}
                          </p>

                          {hasFilters && (
                            <button
                              type="button"
                              onClick={
                                handleClearFilters
                              }
                              className="mt-5 rounded-xl bg-[#101A2E] px-4 py-2.5 text-xs font-semibold text-[#F4EFE4] transition hover:bg-[#C9A24B] hover:text-[#101A2E]"
                            >
                              Clear Filters
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  )}

                {/* DATA */}

                {!loading &&
                  enquiries.length >
                    0 &&
                  enquiries.map(
                    (enquiry) => {
                      const riskLevel =
                        enquiry
                          ?.leadMetadata
                          ?.riskLevel ||
                        "normal";

                      const customerName =
                        enquiry?.name ||
                        "Unknown Customer";

                      const email =
                        enquiry?.email ||
                        "No email";

                      const phone =
                        enquiry?.phone ||
                        "No phone";

                      const packageName =
                        enquiry?.tourPackageName ||
                        "No package specified";

                      const packageId =
                        enquiry?.tourPackageId ||
                        "N/A";

                      const vehicle =
                        enquiry?.vehicle ||
                        "Not specified";

                      const adults =
                        Number(
                          enquiry?.adults ||
                            0
                        );

                      const children =
                        Number(
                          enquiry?.children ||
                            0
                        );

                      const duration =
                        enquiry?.duration;

                      const receivedDate =
                        enquiry?.createdAt ||
                        enquiry?.submittedAt;

                      return (
                        <tr
                          key={
                            enquiry._id
                          }
                          className="group border-b border-[#101A2E]/7 transition-colors duration-200 last:border-b-0 hover:bg-[#FBFCFB]"
                        >

                          {/* CUSTOMER */}

                          <td className="px-6 py-6 align-middle">

                            <div className="max-w-62.5">

                              <p className="truncate text-sm font-semibold text-[#101A2E]">
                                {
                                  customerName
                                }
                              </p>

                              <div className="mt-2 space-y-1">

                                <div className="flex items-center gap-1.5">
                                  <Mail
                                    size={
                                      11
                                    }
                                    className="shrink-0 text-[#101A2E]/25"
                                  />

                                  <span className="truncate text-[11px] text-[#101A2E]/50">
                                    {email}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <Phone
                                    size={
                                      11
                                    }
                                    className="shrink-0 text-[#101A2E]/25"
                                  />

                                  <span className="truncate text-[11px] text-[#101A2E]/45">
                                    {phone}
                                  </span>
                                </div>

                              </div>

                            </div>

                          </td>

                          {/* PACKAGE */}

                          <td className="px-6 py-6 align-middle">

                            <div className="max-w-57.5">

                              <p
                                title={
                                  packageName
                                }
                                className="truncate text-sm font-medium leading-5 text-[#101A2E]"
                              >
                                {
                                  packageName
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-[#101A2E]/30">
                                Package ID:{" "}
                                {
                                  packageId
                                }
                              </p>

                            </div>

                          </td>

                          {/* VEHICLE */}

                          <td className="px-6 py-6 align-middle">

                            <div className="flex items-center gap-2.5">

                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#101A2E]/5">
                                <Car
                                  size={
                                    14
                                  }
                                  className="text-[#101A2E]/55"
                                />
                              </div>

                              <span
                                title={
                                  vehicle
                                }
                                className="max-w-32.5 truncate text-xs font-medium text-[#101A2E]"
                              >
                                {
                                  vehicle
                                }
                              </span>

                            </div>

                          </td>

                          {/* TRAVEL DATE */}

                          <td className="px-6 py-6 align-middle">

                            <div className="flex items-center gap-2">

                              <CalendarDays
                                size={
                                  14
                                }
                                className="shrink-0 text-[#101A2E]/30"
                              />

                              <span className="whitespace-nowrap text-xs font-medium text-[#101A2E]/65">
                                {formatDate(
                                  enquiry?.travelDate
                                )}
                              </span>

                            </div>

                          </td>

                          {/* DURATION */}

                          <td className="px-6 py-6 align-middle">

                            <div className="flex items-center gap-2">

                              <Clock
                                size={
                                  14
                                }
                                className="shrink-0 text-[#101A2E]/30"
                              />

                              <span className="whitespace-nowrap text-xs font-medium text-[#101A2E]/65">
                                {duration
                                  ? `${duration} day${
                                      Number(
                                        duration
                                      ) !==
                                      1
                                        ? "s"
                                        : ""
                                    }`
                                  : "—"}
                              </span>

                            </div>

                          </td>

                          {/* GUESTS */}

                          <td className="px-6 py-6 align-middle">

                            <div>

                              <div className="flex items-center gap-2">

                                <Users
                                  size={
                                    14
                                  }
                                  className="text-[#101A2E]/30"
                                />

                                <span className="whitespace-nowrap text-xs font-semibold text-[#101A2E]/70">
                                  {
                                    adults
                                  }{" "}
                                  adult
                                  {adults !==
                                  1
                                    ? "s"
                                    : ""}
                                </span>

                              </div>

                              <p className="ml-6 mt-1 text-[10px] text-[#101A2E]/35">
                                {
                                  children
                                }{" "}
                                children
                              </p>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-6 align-middle">
                            <StatusBadge
                              status={
                                enquiry?.status
                              }
                            />
                          </td>

                          {/* RISK */}

                          <td className="px-6 py-6 align-middle">
                            <RiskBadge
                              riskLevel={
                                riskLevel
                              }
                            />
                          </td>

                          {/* RECEIVED */}

                          <td className="px-6 py-6 align-middle">

                            <div
                              title={formatDateTime(
                                receivedDate
                              )}
                            >
                              <p className="whitespace-nowrap text-xs font-medium text-[#101A2E]/65">
                                {formatDate(
                                  receivedDate
                                )}
                              </p>

                              {receivedDate && (
                                <p className="mt-1 whitespace-nowrap text-[10px] text-[#101A2E]/35">
                                  {new Date(
                                    receivedDate
                                  ).toLocaleTimeString(
                                    "en-IN",
                                    {
                                      hour: "2-digit",
                                      minute:
                                        "2-digit",
                                    }
                                  )}
                                </p>
                              )}
                            </div>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-6 align-middle">

                            <div className="flex items-center justify-end gap-2">

                              {/* VIEW */}

                              <button
                                type="button"
                                title="View enquiry"
                                onClick={() =>
                                  navigate(
                                    `/car-rental-enquiries/${enquiry._id}`
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#101A2E]/10 bg-white text-[#101A2E]/55 transition-all duration-200 hover:border-[#101A2E]/20 hover:bg-[#101A2E] hover:text-white"
                              >
                                <Eye
                                  size={
                                    15
                                  }
                                />
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                title="Edit enquiry"
                                onClick={() =>
                                  navigate(
                                    `/car-rental-enquiries/${enquiry._id}?edit=true`
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#101A2E]/10 bg-white text-[#101A2E]/55 transition-all duration-200 hover:border-[#C9A24B]/40 hover:bg-[#C9A24B] hover:text-[#101A2E]"
                              >
                                <Pencil
                                  size={
                                    15
                                  }
                                />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                title="Delete enquiry"
                                onClick={() =>
                                  setDeleteModal(
                                    {
                                      open: true,
                                      enquiry,
                                    }
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition-all duration-200 hover:bg-red-50"
                              >
                                <Trash2
                                  size={
                                    15
                                  }
                                />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

              </tbody>

            </table>

          </div>

          {!loading &&
            enquiries.length > 0 && (
              <div className="border-t border-[#101A2E]/8 bg-[#FAFBFA] px-5 py-4">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs text-[#101A2E]/40">
                    {pagination.totalEnquiries ??
                      enquiries.length}{" "}
                    total enquiries
                  </p>

                  <div className="flex items-center justify-between gap-3">

                    <button
                      type="button"
                      disabled={
                        !pagination.hasPreviousPage ||
                        loading
                      }
                      onClick={
                        handlePreviousPage
                      }
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#101A2E]/10 bg-white px-3 text-xs font-semibold text-[#101A2E]/60 transition hover:bg-[#101A2E]/4 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft
                        size={14}
                      />

                      Previous
                    </button>

                    <span className="whitespace-nowrap text-xs text-[#101A2E]/45">
                      Page{" "}
                      <span className="font-semibold text-[#101A2E]/75">
                        {pagination.currentPage ||
                          1}
                      </span>{" "}
                      /{" "}
                      <span className="font-semibold text-[#101A2E]/75">
                        {pagination.totalPages ||
                          1}
                      </span>
                    </span>

                    <button
                      type="button"
                      disabled={
                        !pagination.hasNextPage ||
                        loading
                      }
                      onClick={
                        handleNextPage
                      }
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#101A2E]/10 bg-white px-3 text-xs font-semibold text-[#101A2E]/60 transition hover:bg-[#101A2E]/4 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Next

                      <ChevronRight
                        size={14}
                      />
                    </button>

                  </div>

                </div>

              </div>
            )}

        </div>
      </div>

      {deleteModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#101A2E]/60 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeDeleteModal();
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="px-6 pb-5 pt-6">

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3.5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Trash2
                      size={19}
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-[#101A2E]">
                      Delete enquiry?
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-[#101A2E]/45">
                      This action is permanent
                      and cannot be undone.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={
                    closeDeleteModal
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#101A2E]/35 transition hover:bg-[#101A2E]/5 hover:text-[#101A2E] disabled:opacity-40"
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {/* ENQUIRY DETAILS */}

            <div className="px-6">

              <div className="rounded-xl border border-[#101A2E]/7 bg-[#F7F8F7] p-4">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-[#101A2E]">
                      {deleteModal.enquiry
                        ?.name ||
                        "Unknown customer"}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#101A2E]/45">
                      {deleteModal.enquiry
                        ?.email ||
                        "No email"}
                    </p>

                    {deleteModal
                      .enquiry
                      ?.phone && (
                      <p className="mt-1 text-xs text-[#101A2E]/40">
                        {
                          deleteModal
                            .enquiry
                            .phone
                        }
                      </p>
                    )}

                  </div>

                  {deleteModal.enquiry
                    ?.status && (
                    <StatusBadge
                      status={
                        deleteModal
                          .enquiry
                          .status
                      }
                    />
                  )}

                </div>

                <div className="my-4 h-px bg-[#101A2E]/7" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#101A2E]/35">
                  Rental Package
                </p>

                <p className="mt-1.5 text-sm font-medium leading-5 text-[#101A2E]">
                  {deleteModal.enquiry
                    ?.tourPackageName ||
                    "No package specified"}
                </p>

              </div>

            </div>

            {/* MODAL ACTIONS */}

            <div className="mt-6 flex gap-3 border-t border-[#101A2E]/7 bg-[#FAFBFA] px-6 py-5">

              <button
                type="button"
                disabled={deleting}
                onClick={
                  closeDeleteModal
                }
                className="h-10 flex-1 rounded-xl border border-[#101A2E]/10 bg-white px-4 text-xs font-semibold text-[#101A2E]/65 transition hover:bg-[#101A2E]/4 disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {deleting ? (
                  <>
                    <RefreshCw
                      size={14}
                      className="animate-spin"
                    />

                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2
                      size={14}
                    />

                    Delete Enquiry
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
