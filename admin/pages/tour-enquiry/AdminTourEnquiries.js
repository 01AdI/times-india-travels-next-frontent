import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Eye,
  Edit3,
  Trash2,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  CalendarDays,
  Package,
  X,
  Save,
  ChevronDown,
  StickyNote,
} from "lucide-react";

import {
  getTourEnquiries,
  deleteTourEnquiry,
  updateTourEnquiryStatus,
  updateTourEnquiryRisk,
  updateTourEnquiryNotes,
} from "../../services/adminApi";

const STATUS_OPTIONS = [
  {
    value: "",
    label: "All Status",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "contacted",
    label: "Contacted",
  },
  {
    value: "quotation-sent",
    label: "Quotation Sent",
  },
  {
    value: "follow-up",
    label: "Follow Up",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

const RISK_OPTIONS = [
  {
    value: "",
    label: "All Risk Levels",
  },
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "suspicious",
    label: "Suspicious",
  },
  {
    value: "high-risk",
    label: "High Risk",
  },
];

const STATUS_CONFIG = {
  new: {
    label: "New",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },

  contacted: {
    label: "Contacted",
    className:
      "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
  },

  "quotation-sent": {
    label: "Quotation Sent",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  },

  "follow-up": {
    label: "Follow Up",
    className:
      "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
  },

  confirmed: {
    label: "Confirmed",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },
};


const RISK_CONFIG = {
  normal: {
    label: "Normal",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },

  suspicious: {
    label: "Suspicious",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  },

  "high-risk": {
    label: "High Risk",
    className:
      "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "Unknown",
    className:
      "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1",
        "rounded-full",
        "border",
        "text-[10px]",
        "font-semibold",
        config.className,
      ].join(" ")}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />

      {config.label}
    </span>
  );
}

function RiskBadge({ riskLevel }) {
  const config = RISK_CONFIG[riskLevel] || {
    label: riskLevel || "Unknown",
    className:
      "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1",
        "rounded-full",
        "border",
        "text-[10px]",
        "font-semibold",
        config.className,
      ].join(" ")}
    >
      {riskLevel === "high-risk" ? (
        <AlertTriangle size={11} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}

      {config.label}
    </span>
  );
}

function StatusSelect({
  value,
  onChange,
  disabled = false,
  loading = false,
}) {
  const config =
    STATUS_CONFIG[value] || STATUS_CONFIG.new;

  return (
    <div className="relative inline-flex">
      <select
        value={value || "new"}
        onChange={onChange}
        disabled={disabled}
        className={[
          "appearance-none",
          "h-9",
          "min-w-34",
          "pl-3.5",
          "pr-9",
          "rounded-full",
          "border",
          "text-[10px]",
          "font-semibold",
          "tracking-[0.01em]",
          "outline-none",
          "cursor-pointer",
          "transition-all duration-200",
          "shadow-sm",
          config.className,
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "focus:ring-2 focus:ring-[#C9A24B]/20",
        ].join(" ")}
      >
        {STATUS_OPTIONS.filter(
          (option) => option.value,
        ).map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <RefreshCw
            size={12}
            className="animate-spin text-current"
          />
        ) : (
          <ChevronDown size={12} />
        )}
      </div>
    </div>
  );
}


function RiskSelect({
  value,
  onChange,
  disabled = false,
  loading = false,
}) {
  const config =
    RISK_CONFIG[value] || RISK_CONFIG.normal;

  return (
    <div className="relative inline-flex">
      <select
        value={value || "normal"}
        onChange={onChange}
        disabled={disabled}
        className={[
          "appearance-none",
          "h-9",
          "min-w-29",
          "pl-3.5",
          "pr-9",
          "rounded-full",
          "border",
          "text-[10px]",
          "font-semibold",
          "tracking-[0.01em]",
          "outline-none",
          "cursor-pointer",
          "transition-all duration-200",
          "shadow-sm",
          config.className,
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "focus:ring-2 focus:ring-[#C9A24B]/20",
        ].join(" ")}
      >
        {RISK_OPTIONS.filter(
          (option) => option.value,
        ).map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <RefreshCw
            size={12}
            className="animate-spin text-current"
          />
        ) : value === "high-risk" ? (
          <AlertTriangle size={11} />
        ) : (
          <ChevronDown size={12} />
        )}
      </div>
    </div>
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

function StatCard({
  label,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5 hover:border-[#C9A24B]/20 transition-colors duration-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8A929D]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-medium text-[#101A2E]">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-[11px] text-[#9AA1AA]">
              {description}
            </p>
          )}
        </div>

        <div className="w-10 h-10 rounded-xl bg-[#101A2E]/5 flex items-center justify-center">
          <Icon
            size={16}
            strokeWidth={1.5}
            className="text-[#68717D]"
          />
        </div>
      </div>
    </div>
  );
}

export default function AdminTourEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 20,
    totalEnquiries: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [updatingStatusId, setUpdatingStatusId] =useState(null);
  const [updatingRiskId, setUpdatingRiskId] =useState(null);
  const [updatingNotesId, setUpdatingNotesId] =useState(null);

  const [riskModal, setRiskModal] = useState({
    open: false,
    enquiry: null,
    riskLevel: "",
    riskReason: "",
  });

  const [notesModal, setNotesModal] = useState({
    open: false,
    enquiry: null,
    notes: "",
  });

  const fetchEnquiries = async (
    page = 1,
    showRefresh = false,
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await getTourEnquiries({
        page,
        limit: 20,
        status,
        riskLevel,
        search,
      });

      setEnquiries(response.enquiries || []);

      setPagination(
        response.pagination || {
          currentPage: page,
          perPage: 20,
          totalEnquiries: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      );
    } catch (error) {
      console.error(
        "Failed to fetch tour enquiries:",
        error,
      );

      setError(
        error.message ||
          "Unable to load tour enquiries.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(1);
  }, [status, riskLevel]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    fetchEnquiries(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setRiskLevel("");
  };

  const handlePageChange = (page) => {
    if (page < 1) {
      return;
    }

    if (
      pagination.totalPages &&
      page > pagination.totalPages
    ) {
      return;
    }

    fetchEnquiries(page);
  };

  const updateLocalEnquiry = (id, updates) => {
    setEnquiries((current) =>
      current.map((item) =>
        item._id === id
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    );
  };

  const handleStatusChange = async (
    enquiry,
    newStatus,
  ) => {
    if (
      !newStatus ||
      newStatus === enquiry.status
    ) {
      return;
    }

    try {
      setUpdatingStatusId(enquiry._id);
      setError("");

      const response =
        await updateTourEnquiryStatus(
          enquiry._id,
          newStatus,
        );

      updateLocalEnquiry(enquiry._id, {
        status:
          response?.enquiry?.status ||
          newStatus,

        lastContactedAt:
          response?.enquiry?.lastContactedAt ||
          enquiry.lastContactedAt,

        updatedAt:
          response?.enquiry?.updatedAt ||
          enquiry.updatedAt,
      });
    } catch (error) {
      console.error(
        "Failed to update enquiry status:",
        error,
      );

      setError(
        error.message ||
          "Unable to update enquiry status.",
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleRiskChange = (
    enquiry,
    newRiskLevel,
  ) => {
    if (
      !newRiskLevel ||
      newRiskLevel ===
        enquiry.leadMetadata?.riskLevel
    ) {
      return;
    }

    if (
      newRiskLevel === "suspicious" ||
      newRiskLevel === "high-risk"
    ) {
      setRiskModal({
        open: true,
        enquiry,
        riskLevel: newRiskLevel,
        riskReason:
          enquiry.leadMetadata
            ?.riskReasons?.[0] || "",
      });

      return;
    }

    updateRisk(
      enquiry,
      newRiskLevel,
      "",
    );
  };

  const updateRisk = async (
    enquiry,
    newRiskLevel,
    riskReason = "",
  ) => {
    try {
      setUpdatingRiskId(enquiry._id);
      setError("");

      const response =
        await updateTourEnquiryRisk(
          enquiry._id,
          newRiskLevel,
          riskReason,
        );

      updateLocalEnquiry(enquiry._id, {
        leadMetadata: {
          ...enquiry.leadMetadata,

          riskLevel:
            response?.enquiry?.riskLevel ||
            newRiskLevel,

          riskReasons:
            response?.enquiry?.riskReasons ||
            (newRiskLevel === "normal"
              ? []
              : [riskReason]),
        },

        updatedAt:
          response?.enquiry?.updatedAt ||
          enquiry.updatedAt,
      });

      setRiskModal({
        open: false,
        enquiry: null,
        riskLevel: "",
        riskReason: "",
      });
    } catch (error) {
      console.error(
        "Failed to update enquiry risk:",
        error,
      );

      setError(
        error.message ||
          "Unable to update enquiry risk.",
      );
    } finally {
      setUpdatingRiskId(null);
    }
  };

  const handleSaveRisk = async () => {
    if (!riskModal.enquiry) {
      return;
    }

    if (
      (riskModal.riskLevel ===
        "suspicious" ||
        riskModal.riskLevel ===
          "high-risk") &&
      !riskModal.riskReason.trim()
    ) {
      setError(
        "A reason is required for suspicious or high-risk enquiries.",
      );

      return;
    }

    await updateRisk(
      riskModal.enquiry,
      riskModal.riskLevel,
      riskModal.riskReason.trim(),
    );
  };

  const handleCloseRiskModal = () => {
    setRiskModal({
      open: false,
      enquiry: null,
      riskLevel: "",
      riskReason: "",
    });
  };

  const handleOpenNotes = (enquiry) => {
    setNotesModal({
      open: true,
      enquiry,
      notes: enquiry.adminNotes || "",
    });
  };
  const handleSaveNotes = async () => {
    if (!notesModal.enquiry) {
      return;
    }

    try {
      setUpdatingNotesId(
        notesModal.enquiry._id,
      );

      setError("");

      const response =
        await updateTourEnquiryNotes(
          notesModal.enquiry._id,
          notesModal.notes.trim() || null,
        );

      updateLocalEnquiry(
        notesModal.enquiry._id,
        {
          adminNotes:
            response?.enquiry?.adminNotes ??
            (notesModal.notes.trim() ||
              null),

          updatedAt:
            response?.enquiry?.updatedAt ||
            notesModal.enquiry.updatedAt,
        },
      );

      setNotesModal({
        open: false,
        enquiry: null,
        notes: "",
      });
    } catch (error) {
      console.error(
        "Failed to update admin notes:",
        error,
      );

      setError(
        error.message ||
          "Unable to update admin notes.",
      );
    } finally {
      setUpdatingNotesId(null);
    }
  };

  const handleCloseNotesModal = () => {
    setNotesModal({
      open: false,
      enquiry: null,
      notes: "",
    });
  };

  const handleDelete = async (enquiry) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the enquiry from ${
        enquiry.name || "this customer"
      }?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(enquiry._id);
      setError("");

      await deleteTourEnquiry(enquiry._id);

      const remainingItems =
        enquiries.length - 1;

      if (
        remainingItems === 0 &&
        pagination.currentPage > 1
      ) {
        fetchEnquiries(
          pagination.currentPage - 1,
        );
      } else {
        fetchEnquiries(
          pagination.currentPage,
          true,
        );
      }
    } catch (error) {
      console.error(
        "Failed to delete enquiry:",
        error,
      );

      setError(
        error.message ||
          "Unable to delete enquiry.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (id) => {
    navigate(
      `/tour-enquiries/${id}`,
    );
  };

  const handleEdit = (id) => {
    navigate(
      `/tour-enquiries/${id}/edit`,
    );
  };

  if (loading) {
    return (
      <section className="min-h-125 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

          <p className="mt-4 text-sm text-[#7A828D]">
            Loading enquiries...
          </p>
        </div>
      </section>
    );
  }
  const newCount = enquiries.filter(
    (item) => item.status === "new",
  ).length;

  const confirmedCount = enquiries.filter(
    (item) => item.status === "confirmed",
  ).length;

  const highRiskCount = enquiries.filter(
    (item) =>
      item.leadMetadata?.riskLevel ===
      "high-risk",
  ).length;

  return (
    <>
      <section className="space-y-7">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
              Enquiry Management
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
              Tour Enquiries
            </h2>

            <p className="mt-2 text-sm text-[#7A828D]">
              Manage customer enquiries,
              follow-ups and lead information.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              fetchEnquiries(
                pagination.currentPage,
                true,
              )
            }
            disabled={refreshing}
            className="
              inline-flex items-center justify-center gap-2
              h-10 px-4
              rounded-lg
              border border-[#101A2E]/10
              bg-white
              text-xs text-[#101A2E]
              hover:bg-[#101A2E]
              hover:text-white
              transition-all
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={14}
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
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-center justify-between gap-4">
            <p className="text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Total Enquiries"
            value={pagination.totalEnquiries}
            icon={Users}
            description="Across all pages"
          />

          <StatCard
            label="New"
            value={newCount}
            icon={Clock3}
            description="On this page"
          />

          <StatCard
            label="Confirmed"
            value={confirmedCount}
            icon={CheckCircle2}
            description="On this page"
          />

          <StatCard
            label="High Risk"
            value={highRiskCount}
            icon={AlertTriangle}
            description="On this page"
          />
        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">
          <div className="flex flex-col xl:flex-row gap-3">

            {/* SEARCH */}

            <form
              onSubmit={handleSearchSubmit}
              className="flex-1"
            >
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA1AA]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search name, email, phone or tour package..."
                  className="
                    w-full
                    h-11
                    pl-11
                    pr-4
                    rounded-xl
                    border border-[#101A2E]/10
                    bg-[#F8F9F9]
                    text-sm text-[#101A2E]
                    outline-none
                    focus:border-[#C9A24B]
                    focus:bg-white
                    transition-all
                  "
                />
              </div>
            </form>

            {/* STATUS FILTER */}

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value,
                )
              }
              className="
                h-11
                px-3.5
                rounded-xl
                border border-[#101A2E]/10
                bg-[#F8F9F9]
                text-sm
                text-[#101A2E]
                outline-none
                focus:border-[#C9A24B]
                cursor-pointer
              "
            >
              {STATUS_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ),
              )}
            </select>

            {/* RISK FILTER */}

            <select
              value={riskLevel}
              onChange={(event) =>
                setRiskLevel(
                  event.target.value,
                )
              }
              className="
                h-11
                px-3.5
                rounded-xl
                border border-[#101A2E]/10
                bg-[#F8F9F9]
                text-sm
                text-[#101A2E]
                outline-none
                focus:border-[#C9A24B]
                cursor-pointer
              "
            >
              {RISK_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ),
              )}
            </select>

            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={() =>
                fetchEnquiries(1)
              }
              className="
                h-11
                px-5
                rounded-xl
                bg-[#101A2E]
                text-white
                text-xs
                font-medium
                hover:bg-[#1B2942]
                transition-all
              "
            >
              Search
            </button>

            {/* CLEAR */}

            {(search ||
              status ||
              riskLevel) && (
              <button
                type="button"
                onClick={
                  handleClearFilters
                }
                className="
                  h-11
                  px-4
                  rounded-xl
                  border border-[#101A2E]/10
                  bg-white
                  text-xs
                  text-[#68717D]
                  hover:bg-[#F8F9F9]
                  transition-all
                "
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

          {/* TABLE HEADER */}

          <div className="px-6 py-5 border-b border-[#101A2E]/8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#8A929D]">
                  Customer Leads
                </p>
              </div>

              <h3 className="mt-1.5 text-sm font-medium text-[#101A2E]">
                Enquiry Records
              </h3>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-[#F8F9F9] border border-[#101A2E]/8">
              <p className="text-[10px] font-medium text-[#68717D]">
                {pagination.totalEnquiries}{" "}
                total
              </p>
            </div>
          </div>

          {/* EMPTY */}

          {enquiries.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <Package
                size={32}
                className="mx-auto text-[#B1B7BE]"
                strokeWidth={1.5}
              />

              <p className="mt-4 text-sm font-medium text-[#101A2E]">
                No enquiries found
              </p>

              <p className="mt-1 text-xs text-[#8A929D]">
                Try changing your filters
                or search term.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-362.5">

                <thead>
                  <tr className="border-b border-[#101A2E]/8 bg-[#F8F9F9]/70">

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Tour Package
                    </th>

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Travel Date
                    </th>

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Risk
                    </th>

                    <th className="px-6 py-4 text-left text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-[9px] uppercase tracking-[0.14em] font-semibold text-[#8A929D]">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {enquiries.map(
                    (enquiry) => {
                      const currentRisk =
                        enquiry
                          .leadMetadata
                          ?.riskLevel || "";

                      return (
                        <tr
                          key={enquiry._id}
                          className="
                            border-b border-[#101A2E]/6
                            last:border-b-0
                            hover:bg-[#FCFCFB]
                            transition-colors duration-200
                          "
                        >

                          {/* CUSTOMER */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">

                              <div className="w-10 h-10 rounded-full bg-[#101A2E]/5 flex items-center justify-center shrink-0 border border-[#101A2E]/5">
                                <span className="text-xs font-medium text-[#68717D]">
                                  {(
                                    enquiry.name ||
                                    "?"
                                  )
                                    .charAt(0)
                                    .toUpperCase()}
                                </span>
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#101A2E] truncate max-w-52.5">
                                  {enquiry.name ||
                                    "—"}
                                </p>

                                <div className="mt-1.5 flex flex-col gap-1">
                                  <span className="inline-flex items-center gap-1.5 text-[10px] text-[#8A929D]">
                                    <Mail
                                      size={10}
                                    />

                                    {enquiry.email ||
                                      "—"}
                                  </span>

                                  <span className="inline-flex items-center gap-1.5 text-[10px] text-[#8A929D]">
                                    <Phone
                                      size={10}
                                    />

                                    {enquiry.phone ||
                                      "—"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* TOUR PACKAGE */}

                          <td className="px-6 py-5">
                            <div className="max-w-57.5">
                              <p className="text-xs font-medium text-[#101A2E] leading-5">
                                {enquiry.tourPackageName ||
                                  enquiry.tourPackageId ||
                                  "—"}
                              </p>

                              {enquiry.duration && (
                                <p className="mt-1 text-[10px] text-[#8A929D]">
                                  {enquiry.duration}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* TRAVEL DATE */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-xs text-[#68717D]">
                              <CalendarDays
                                size={13}
                                className="text-[#9AA1AA]"
                              />

                              {formatDate(
                                enquiry.travelDate,
                              )}
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">
                            <StatusSelect
                              value={
                                enquiry.status ||
                                "new"
                              }
                              onChange={(event) =>
                                handleStatusChange(
                                  enquiry,
                                  event.target
                                    .value,
                                )
                              }
                              disabled={
                                updatingStatusId ===
                                enquiry._id
                              }
                              loading={
                                updatingStatusId ===
                                enquiry._id
                              }
                            />
                          </td>

                          {/* RISK */}

                          <td className="px-6 py-5">
                            <div className="flex flex-col items-start gap-1.5">

                              <RiskSelect
                                value={
                                  currentRisk ||
                                  "normal"
                                }
                                onChange={(event) =>
                                  handleRiskChange(
                                    enquiry,
                                    event.target
                                      .value,
                                  )
                                }
                                disabled={
                                  updatingRiskId ===
                                  enquiry._id
                                }
                                loading={
                                  updatingRiskId ===
                                  enquiry._id
                                }
                              />

                              {currentRisk !==
                                "normal" &&
                                enquiry
                                  .leadMetadata
                                  ?.riskReasons
                                  ?.length >
                                  0 && (
                                  <p
                                    className={[
                                      "max-w-40",
                                      "text-[9px]",
                                      "leading-4",
                                      currentRisk ===
                                        "high-risk"
                                        ? "text-red-500"
                                        : "text-amber-600",
                                    ].join(" ")}
                                    title={
                                      enquiry
                                        .leadMetadata
                                        .riskReasons[0]
                                    }
                                  >
                                    {
                                      enquiry
                                        .leadMetadata
                                        .riskReasons[0]
                                    }
                                  </p>
                                )}
                            </div>
                          </td>

                          {/* CREATED */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-xs text-[#68717D]">
                              <Clock3
                                size={13}
                                className="text-[#9AA1AA]"
                              />

                              {formatDateTime(
                                enquiry.createdAt,
                              )}
                            </div>
                          </td>

                          {/* ACTIONS */}

                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-2.5">

                              {/* NOTES */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenNotes(
                                    enquiry,
                                  )
                                }
                                className={[
                                  "inline-flex items-center justify-center gap-1.5",
                                  "h-8 px-3",
                                  "rounded-lg",
                                  "border",
                                  enquiry.adminNotes
                                    ? "border-[#C9A24B]/30 bg-[#C9A24B]/5 text-[#A47D20]"
                                    : "border-[#101A2E]/10 bg-white text-[#68717D]",
                                  "text-[11px]",
                                  "hover:bg-[#101A2E] hover:text-white",
                                  "transition-all",
                                ].join(" ")}
                                title="Admin notes"
                              >
                                <StickyNote
                                  size={13}
                                />

                                Notes
                              </button>

                              {/* VIEW */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleView(
                                    enquiry._id,
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-1.5
                                  h-8
                                  px-3
                                  rounded-lg
                                  border
                                  border-[#101A2E]/10
                                  bg-white
                                  text-[11px]
                                  text-[#101A2E]
                                  hover:bg-[#101A2E]
                                  hover:text-white
                                  transition-all
                                "
                                title="View enquiry"
                              >
                                <Eye
                                  size={13}
                                />

                                View
                              </button>

                              {/* EDIT */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleEdit(
                                    enquiry._id,
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-1.5
                                  h-8
                                  px-3
                                  rounded-lg
                                  border
                                  border-[#C9A24B]/30
                                  bg-[#C9A24B]/5
                                  text-[11px]
                                  text-[#A47D20]
                                  hover:bg-[#C9A24B]
                                  hover:text-white
                                  transition-all
                                "
                                title="Edit enquiry"
                              >
                                <Edit3
                                  size={13}
                                />

                                Edit
                              </button>

                              {/* DELETE SEPARATOR */}

                              <div className="w-px h-5 bg-[#101A2E]/10 mx-0.5" />

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    enquiry,
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  enquiry._id
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  w-8
                                  h-8
                                  rounded-lg
                                  border
                                  border-red-100
                                  bg-white
                                  text-red-500
                                  hover:bg-red-50
                                  transition-all
                                  disabled:opacity-50
                                "
                                title="Delete enquiry"
                              >
                                {deletingId ===
                                enquiry._id ? (
                                  <RefreshCw
                                    size={13}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={13}
                                  />
                                )}
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    },
                  )}

                </tbody>
              </table>
            </div>
          )}

          {pagination.totalPages > 0 && (
            <div className="px-6 py-5 border-t border-[#101A2E]/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <p className="text-xs text-[#8A929D]">
                Page{" "}
                <span className="text-[#101A2E] font-medium">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="text-[#101A2E] font-medium">
                  {pagination.totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      pagination.currentPage -
                        1,
                    )
                  }
                  disabled={
                    !pagination.hasPreviousPage
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    h-9
                    px-3
                    rounded-lg
                    border
                    border-[#101A2E]/10
                    bg-white
                    text-xs
                    text-[#68717D]
                    hover:bg-[#F8F9F9]
                    transition-all
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  <ChevronLeft
                    size={14}
                  />

                  Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      pagination.currentPage +
                        1,
                    )
                  }
                  disabled={
                    !pagination.hasNextPage
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    h-9
                    px-3
                    rounded-lg
                    border
                    border-[#101A2E]/10
                    bg-white
                    text-xs
                    text-[#68717D]
                    hover:bg-[#F8F9F9]
                    transition-all
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Next

                  <ChevronRight
                    size={14}
                  />
                </button>

              </div>
            </div>
          )}
        </div>
      </section>

      {riskModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101A2E]/50 backdrop-blur-sm">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#101A2E]/10 overflow-hidden">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-[#101A2E]/8 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertTriangle
                    size={17}
                    className="text-amber-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[#101A2E]">
                    Update Risk Level
                  </h3>

                  <p className="text-[10px] text-[#8A929D] mt-0.5">
                    {riskModal.enquiry?.name ||
                      "Customer"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={
                  handleCloseRiskModal
                }
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#8A929D]
                  hover:bg-[#F8F9F9]
                  hover:text-[#101A2E]
                  transition-all
                "
              >
                <X size={16} />
              </button>

            </div>

            {/* BODY */}

            <div className="p-6 space-y-5">

              <div>
                <label className="block text-[10px] uppercase tracking-[0.12em] text-[#8A929D] mb-2">
                  Risk Level
                </label>

                <select
                  value={
                    riskModal.riskLevel
                  }
                  onChange={(event) =>
                    setRiskModal(
                      (prev) => ({
                        ...prev,
                        riskLevel:
                          event.target
                            .value,
                      }),
                    )
                  }
                  className="
                    w-full
                    h-11
                    px-3
                    rounded-xl
                    border
                    border-[#101A2E]/10
                    bg-[#F8F9F9]
                    text-sm
                    text-[#101A2E]
                    outline-none
                    focus:border-[#C9A24B]
                  "
                >
                  <option value="suspicious">
                    Suspicious
                  </option>

                  <option value="high-risk">
                    High Risk
                  </option>

                  <option value="normal">
                    Normal
                  </option>
                </select>
              </div>

              {(riskModal.riskLevel ===
                "suspicious" ||
                riskModal.riskLevel ===
                  "high-risk") && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.12em] text-[#8A929D] mb-2">
                    Reason
                  </label>

                  <textarea
                    value={
                      riskModal.riskReason
                    }
                    onChange={(event) =>
                      setRiskModal(
                        (prev) => ({
                          ...prev,
                          riskReason:
                            event.target
                              .value,
                        }),
                      )
                    }
                    rows={4}
                    placeholder="Explain why this enquiry should be marked as suspicious or high risk..."
                    className="
                      w-full
                      px-3.5
                      py-3
                      rounded-xl
                      border
                      border-[#101A2E]/10
                      bg-[#F8F9F9]
                      text-sm
                      text-[#101A2E]
                      outline-none
                      resize-none
                      focus:border-[#C9A24B]
                      focus:bg-white
                      transition-all
                    "
                  />
                </div>
              )}

            </div>

            {/* FOOTER */}

            <div className="px-6 py-5 border-t border-[#101A2E]/8 flex items-center justify-end gap-2">

              <button
                type="button"
                onClick={
                  handleCloseRiskModal
                }
                disabled={
                  updatingRiskId ===
                  riskModal.enquiry?._id
                }
                className="
                  h-9
                  px-4
                  rounded-lg
                  border
                  border-[#101A2E]/10
                  bg-white
                  text-xs
                  text-[#68717D]
                  hover:bg-[#F8F9F9]
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSaveRisk
                }
                disabled={
                  updatingRiskId ===
                  riskModal.enquiry?._id
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  h-9
                  px-4
                  rounded-lg
                  bg-[#101A2E]
                  text-white
                  text-xs
                  hover:bg-[#1B2942]
                  transition-all
                  disabled:opacity-50
                "
              >
                {updatingRiskId ===
                riskModal.enquiry?._id ? (
                  <RefreshCw
                    size={13}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={13} />
                )}

                Save Risk
              </button>

            </div>
          </div>
        </div>
      )}

      {notesModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#101A2E]/50 backdrop-blur-sm">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#101A2E]/10 overflow-hidden">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-[#101A2E]/8 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/10 flex items-center justify-center">
                  <StickyNote
                    size={17}
                    className="text-[#A47D20]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-[#101A2E]">
                    Admin Notes
                  </h3>

                  <p className="text-[10px] text-[#8A929D] mt-0.5">
                    {notesModal.enquiry?.name ||
                      "Customer"}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={
                  handleCloseNotesModal
                }
                className="
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-[#8A929D]
                  hover:bg-[#F8F9F9]
                  hover:text-[#101A2E]
                  transition-all
                "
              >
                <X size={16} />
              </button>

            </div>

            {/* BODY */}

            <div className="p-6">

              <label className="block text-[10px] uppercase tracking-[0.12em] text-[#8A929D] mb-2">
                Internal notes
              </label>

              <textarea
                value={notesModal.notes}
                onChange={(event) =>
                  setNotesModal(
                    (prev) => ({
                      ...prev,
                      notes:
                        event.target.value,
                    }),
                  )
                }
                rows={7}
                placeholder="Add notes about calls, follow-ups, customer preferences, quotation discussions..."
                className="
                  w-full
                  px-3.5
                  py-3
                  rounded-xl
                  border
                  border-[#101A2E]/10
                  bg-[#F8F9F9]
                  text-sm
                  text-[#101A2E]
                  outline-none
                  resize-none
                  focus:border-[#C9A24B]
                  focus:bg-white
                  transition-all
                "
              />

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                These notes are internal and
                are not visible to the customer.
              </p>

            </div>

            {/* FOOTER */}

            <div className="px-6 py-5 border-t border-[#101A2E]/8 flex items-center justify-end gap-2">

              <button
                type="button"
                onClick={
                  handleCloseNotesModal
                }
                disabled={
                  updatingNotesId ===
                  notesModal.enquiry?._id
                }
                className="
                  h-9
                  px-4
                  rounded-lg
                  border
                  border-[#101A2E]/10
                  bg-white
                  text-xs
                  text-[#68717D]
                  hover:bg-[#F8F9F9]
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSaveNotes
                }
                disabled={
                  updatingNotesId ===
                  notesModal.enquiry?._id
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  h-9
                  px-4
                  rounded-lg
                  bg-[#101A2E]
                  text-white
                  text-xs
                  hover:bg-[#1B2942]
                  transition-all
                  disabled:opacity-50
                "
              >
                {updatingNotesId ===
                notesModal.enquiry?._id ? (
                  <RefreshCw
                    size={13}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={13} />
                )}

                Save Notes
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
