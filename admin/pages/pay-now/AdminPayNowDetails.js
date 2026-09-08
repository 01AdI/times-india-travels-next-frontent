import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clipboard,
  CreditCard,
  Edit3,
  ExternalLink,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Trash2,
  User,
  Wallet,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  deletePayNowEnquiry,
  getPayNowEnquiry,
  updatePayNowEnquiryNotes,
  updatePayNowEnquiryRisk,
  updatePayNowEnquiryStatus,
} from "../../services/adminApi";


// ============================================================
// STATUS
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


const formatRisk = (risk) => {
  if (!risk) return "Normal";

  return risk
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

  try {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return "—";
  }
};


const formatAmount = (amount) => {
  if (
    amount === undefined ||
    amount === null ||
    amount === ""
  ) {
    return "—";
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return String(amount);
  }

  return numericAmount.toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
};


const getInitials = (name) => {
  if (!name) return "P";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};


// ============================================================
// BADGES
// ============================================================

function StatusBadge({ status }) {
  const styles = {
    new:
      "bg-blue-50 text-blue-700 border-blue-200",

    contacted:
      "bg-amber-50 text-amber-700 border-amber-200",

    "payment-link-sent":
      "bg-violet-50 text-violet-700 border-violet-200",

    paid:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    cancelled:
      "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {formatStatus(status)}
    </span>
  );
}


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
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[riskLevel] ||
        "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      <ShieldAlert size={13} />
      {formatRisk(riskLevel)}
    </span>
  );
}


// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  icon: Icon,
  label,
  value,
  mono = false,
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 break-words text-sm font-medium text-slate-800 ${
            mono ? "font-mono text-xs" : ""
          }`}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}


// ============================================================
// SECTION
// ============================================================

function Section({
  icon: Icon,
  eyebrow,
  title,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Icon size={17} />
          </div>

          <div>
            {eyebrow && (
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {eyebrow}
              </p>
            )}

            <h2 className="mt-0.5 text-base font-semibold text-slate-900">
              {title}
            </h2>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-7">
        {children}
      </div>
    </section>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function AdminPayNowDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [enquiry, setEnquiry] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [updatingRisk, setUpdatingRisk] =
    useState(false);

  const [savingNotes, setSavingNotes] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [statusValue, setStatusValue] =
    useState("");

  const [riskValue, setRiskValue] =
    useState("");

  const [showRiskModal, setShowRiskModal] =
    useState(false);

  const [riskReason, setRiskReason] =
    useState("");

  const [showNotesModal, setShowNotesModal] =
    useState(false);

  const [notesValue, setNotesValue] =
    useState("");

  const [copied, setCopied] =
    useState(false);


  // ==========================================================
  // FETCH
  // ==========================================================

  const fetchEnquiry = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response =
        await getPayNowEnquiry(id);

      const data = response?.enquiry;

      if (!data) {
        throw new Error(
          "Pay Now enquiry could not be found."
        );
      }

      setEnquiry(data);

      setStatusValue(
        data.status || "new"
      );

      setRiskValue(
        data.leadMetadata?.riskLevel ||
          "normal"
      );

      setNotesValue(
        data.adminNotes || ""
      );
    } catch (err) {
      console.error(
        "Failed to fetch Pay Now enquiry:",
        err
      );

      setError(
        err.message ||
          "Unable to load Pay Now enquiry."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEnquiry();
  }, [id]);


  // ==========================================================
  // STATUS
  // ==========================================================

  const handleStatusChange = async (
    event
  ) => {
    const newStatus =
      event.target.value;

    if (
      !newStatus ||
      newStatus === enquiry?.status
    ) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const response =
        await updatePayNowEnquiryStatus(
          id,
          newStatus
        );

      setStatusValue(newStatus);

      setEnquiry((previous) => ({
        ...previous,
        status:
          response?.enquiry?.status ||
          newStatus,

        updatedAt:
          response?.enquiry?.updatedAt ||
          previous.updatedAt,
      }));
    } catch (err) {
      console.error(
        "Failed to update status:",
        err
      );

      setStatusValue(
        enquiry?.status || "new"
      );

      window.alert(
        err.message ||
          "Unable to update status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };


  // ==========================================================
  // RISK
  // ==========================================================

  const handleRiskSelect = (event) => {
    const newRisk =
      event.target.value;

    setRiskValue(newRisk);

    if (newRisk === "normal") {
      updateRisk(
        newRisk,
        ""
      );
      return;
    }

    setRiskReason("");

    setShowRiskModal(true);
  };


  const updateRisk = async (
    riskLevel,
    reason
  ) => {
    try {
      setUpdatingRisk(true);

      const response =
        await updatePayNowEnquiryRisk(
          id,
          riskLevel,
          reason
        );

      setEnquiry((previous) => ({
        ...previous,

        leadMetadata: {
          ...previous.leadMetadata,

          riskLevel:
            response?.enquiry?.riskLevel ||
            riskLevel,

          riskReasons:
            response?.enquiry?.riskReasons ||
            (riskLevel === "normal"
              ? []
              : [reason]),
        },

        updatedAt:
          response?.enquiry?.updatedAt ||
          previous.updatedAt,
      }));

      setShowRiskModal(false);
    } catch (err) {
      console.error(
        "Failed to update risk:",
        err
      );

      setRiskValue(
        enquiry?.leadMetadata?.riskLevel ||
          "normal"
      );

      window.alert(
        err.message ||
          "Unable to update risk."
      );
    } finally {
      setUpdatingRisk(false);
    }
  };


  const handleRiskSubmit = async () => {
    if (
      !riskReason.trim()
    ) {
      window.alert(
        "Please provide a reason."
      );

      return;
    }

    await updateRisk(
      riskValue,
      riskReason.trim()
    );
  };


  const closeRiskModal = () => {
    setShowRiskModal(false);

    setRiskValue(
      enquiry?.leadMetadata?.riskLevel ||
        "normal"
    );

    setRiskReason("");
  };


  // ==========================================================
  // NOTES
  // ==========================================================

  const openNotesModal = () => {
    setNotesValue(
      enquiry?.adminNotes || ""
    );

    setShowNotesModal(true);
  };


  const saveNotes = async () => {
    try {
      setSavingNotes(true);

      const response =
        await updatePayNowEnquiryNotes(
          id,
          notesValue
        );

      setEnquiry((previous) => ({
        ...previous,

        adminNotes:
          response?.enquiry?.adminNotes ??
          (notesValue.trim()
            ? notesValue.trim()
            : null),

        updatedAt:
          response?.enquiry?.updatedAt ||
          previous.updatedAt,
      }));

      setShowNotesModal(false);
    } catch (err) {
      console.error(
        "Failed to save notes:",
        err
      );

      window.alert(
        err.message ||
          "Unable to save notes."
      );
    } finally {
      setSavingNotes(false);
    }
  };


  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!enquiry) return;

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the Pay Now request from ${enquiry.customer?.name || "this customer"}? This action cannot be undone.`
      );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deletePayNowEnquiry(id);

      navigate("/pay-now");
    } catch (err) {
      console.error(
        "Failed to delete Pay Now enquiry:",
        err
      );

      window.alert(
        err.message ||
          "Unable to delete Pay Now enquiry."
      );
    } finally {
      setDeleting(false);
    }
  };


  // ==========================================================
  // COPY ID
  // ==========================================================

  const copyId = async () => {
    if (!enquiry?._id) return;

    try {
      await navigator.clipboard.writeText(
        enquiry._id
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        1800
      );
    } catch (err) {
      console.error(
        "Failed to copy ID:",
        err
      );
    }
  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded-xl bg-slate-200" />

            <div className="h-40 rounded-3xl bg-white" />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-72 rounded-3xl bg-white" />
              <div className="h-72 rounded-3xl bg-white" />
            </div>

            <div className="h-72 rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !enquiry) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() =>
              navigate("/pay-now")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Pay Now
          </button>

          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <ShieldAlert size={22} />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Unable to load Pay Now request
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error ||
                "The requested enquiry could not be found."}
            </p>

            <button
              onClick={fetchEnquiry}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }


  const customer =
    enquiry.customer || {};

  const billing =
    enquiry.billing || {};

  const lead =
    enquiry.leadMetadata || {};

  const riskLevel =
    lead.riskLevel || "normal";


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================================================== */}
        {/* TOP BAR */}
        {/* ================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <button
            onClick={() =>
              navigate("/pay-now")
            }
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Pay Now
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                navigate(
                  `/pay-now/${id}/edit`
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Edit3 size={16} />
              Edit
            </button>

            <button
              onClick={openNotesModal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FileText size={16} />
              Notes
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={16} />
              {deleting
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </div>


        {/* ================================================== */}
        {/* HERO */}
        {/* ================================================== */}

        <div className="relative mb-6 overflow-hidden rounded-[2rem] bg-[#102a30] shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_35%)]" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4 sm:gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white ring-1 ring-white/15">
                  {getInitials(
                    customer.name
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                      Pay Now Request
                    </p>

                    <span className="text-white/20">
                      •
                    </span>

                    <button
                      onClick={copyId}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/45 transition hover:text-white/80"
                      title="Copy enquiry ID"
                    >
                      {copied ? (
                        <>
                          <Check size={12} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Clipboard size={12} />
                          {String(
                            enquiry._id
                          ).slice(-8)}
                        </>
                      )}
                    </button>
                  </div>

                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {customer.name ||
                      "Unnamed Customer"}
                  </h1>

                  <p className="mt-2 text-sm text-white/55">
                    Submitted{" "}
                    {formatDate(
                      enquiry.createdAt
                    )}
                  </p>
                </div>
              </div>


              <div className="flex flex-wrap items-center gap-3">

                <StatusBadge
                  status={
                    enquiry.status
                  }
                />

                <RiskBadge
                  riskLevel={
                    riskLevel
                  }
                />

              </div>
            </div>


            {/* Payment summary */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center gap-2 text-white/45">
                  <Wallet size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Requested Amount
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-white">
                  ₹{" "}
                  {formatAmount(
                    enquiry.amount
                  )}
                </p>
              </div>


              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center gap-2 text-white/45">
                  <CreditCard size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Status
                  </span>
                </div>

                <div className="mt-3">
                  <select
                    value={
                      statusValue
                    }
                    onChange={
                      handleStatusChange
                    }
                    disabled={
                      updatingStatus
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white outline-none transition focus:border-white/25 disabled:opacity-60"
                  >
                    {STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                          className="text-slate-900"
                        >
                          {formatStatus(
                            status
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>


              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-white/45">
                  <Calendar size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Last Updated
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  {formatDate(
                    enquiry.updatedAt
                  )}
                </p>
              </div>

            </div>
          </div>
        </div>


        {/* ================================================== */}
        {/* PAYMENT REQUEST */}
        {/* ================================================== */}

        <Section
          icon={CreditCard}
          eyebrow="Request"
          title="Payment Request"
          className="mb-6"
        >
          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Amount
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                ₹{" "}
                {formatAmount(
                  enquiry.amount
                )}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Description
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {enquiry.description ||
                  "No description provided."}
              </p>
            </div>

          </div>
        </Section>


        {/* ================================================== */}
        {/* CUSTOMER + BILLING */}
        {/* ================================================== */}

        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          <Section
            icon={User}
            eyebrow="Customer"
            title="Customer Information"
          >
            <div className="grid gap-6 sm:grid-cols-2">

              <InfoItem
                icon={User}
                label="Name"
                value={
                  customer.name
                }
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value={
                  customer.email
                }
              />

              <InfoItem
                icon={Phone}
                label="Telephone"
                value={
                  customer.telephone
                }
              />

              <InfoItem
                icon={Globe}
                label="Country"
                value={
                  customer.country
                }
              />

              <div className="sm:col-span-2">
                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={[
                    customer.address,
                    customer.city,
                    customer.state,
                    customer.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-2">

              {customer.email && (
                <a
                  href={`mailto:${customer.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  <Mail size={14} />
                  Email Customer
                  <ExternalLink
                    size={13}
                  />
                </a>
              )}

              {customer.telephone && (
                <a
                  href={`tel:${customer.telephone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Phone size={14} />
                  Call Customer
                </a>
              )}

            </div>
          </Section>


          <Section
            icon={MapPin}
            eyebrow="Billing"
            title="Billing Information"
          >
            <div className="grid gap-6 sm:grid-cols-2">

              <InfoItem
                icon={User}
                label="Billing Name"
                value={
                  billing.name
                }
              />

              <InfoItem
                icon={Phone}
                label="Telephone"
                value={
                  billing.telephone
                }
              />

              <InfoItem
                icon={Globe}
                label="Country"
                value={
                  billing.country
                }
              />

              <div className="sm:col-span-2">
                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={[
                    billing.address,
                    billing.city,
                    billing.state,
                    billing.postalCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                />
              </div>

            </div>
          </Section>

        </div>


        {/* ================================================== */}
        {/* LEAD INTELLIGENCE */}
        {/* ================================================== */}

        <Section
          icon={Globe}
          eyebrow="Lead Intelligence"
          title="Lead Metadata"
          className="mb-6"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              icon={Globe}
              label="IP Address"
              value={
                lead.ipAddress
              }
              mono
            />

            <InfoItem
              icon={Globe}
              label="IP Country"
              value={
                lead.ipCountry
              }
            />

            <InfoItem
              icon={MapPin}
              label="IP Region"
              value={
                lead.ipRegion
              }
            />

            <InfoItem
              icon={MapPin}
              label="IP City"
              value={
                lead.ipCity
              }
            />

            <InfoItem
              icon={Phone}
              label="Phone Country"
              value={
                lead.phoneCountry
              }
            />

            <InfoItem
              icon={FileText}
              label="Source"
              value={
                lead.source
              }
            />

            <div className="sm:col-span-2 lg:col-span-3">
              <InfoItem
                icon={ExternalLink}
                label="Source Page"
                value={
                  lead.sourcePage
                }
                mono
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <InfoItem
                icon={FileText}
                label="User Agent"
                value={
                  lead.userAgent
                }
                mono
              />
            </div>

          </div>
        </Section>


        {/* ================================================== */}
        {/* RISK */}
        {/* ================================================== */}

        <Section
          icon={ShieldAlert}
          eyebrow="Security"
          title="Risk Assessment"
          className="mb-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Current Risk
              </p>

              <div className="mt-2">
                <RiskBadge
                  riskLevel={
                    riskLevel
                  }
                />
              </div>
            </div>

            <div className="w-full max-w-xs">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Change Risk
              </label>

              <select
                value={
                  riskValue
                }
                onChange={
                  handleRiskSelect
                }
                disabled={
                  updatingRisk
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 disabled:opacity-60"
              >
                {RISK_OPTIONS.map(
                  (risk) => (
                    <option
                      key={risk}
                      value={risk}
                    >
                      {formatRisk(
                        risk
                      )}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>


          <div className="mt-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Risk Reasons
            </p>

            {Array.isArray(
              lead.riskReasons
            ) &&
            lead.riskReasons.length > 0 ? (
              <div className="mt-3 space-y-2">
                {lead.riskReasons.map(
                  (reason, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3"
                    >
                      <ShieldAlert
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <p className="text-sm leading-6 text-slate-700">
                        {reason}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-400">
                No risk reasons recorded.
              </p>
            )}
          </div>
        </Section>


        {/* ================================================== */}
        {/* ADMIN NOTES */}
        {/* ================================================== */}

        <Section
          icon={FileText}
          eyebrow="Internal"
          title="Admin Notes"
          className="mb-8"
        >
          {enquiry.adminNotes ? (
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {enquiry.adminNotes}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
              <FileText
                size={22}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-500">
                No admin notes yet.
              </p>

              <button
                onClick={openNotesModal}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                <FileText size={14} />
                Add Note
              </button>
            </div>
          )}

          {enquiry.adminNotes && (
            <button
              onClick={openNotesModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Edit3 size={14} />
              Edit Notes
            </button>
          )}
        </Section>


        {/* ================================================== */}
        {/* FOOTER META */}
        {/* ================================================== */}

        <div className="pb-8 text-center">
          <p className="text-xs text-slate-400">
            Pay Now enquiry ID:{" "}
            <span className="font-mono text-slate-500">
              {enquiry._id}
            </span>
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Created {formatDate(
              enquiry.createdAt
            )}
          </p>
        </div>

      </div>


      {/* ==================================================== */}
      {/* RISK MODAL */}
      {/* ==================================================== */}

      {showRiskModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Risk Assessment
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Mark as{" "}
                  {formatRisk(
                    riskValue
                  )}
                </h3>
              </div>

              <button
                onClick={
                  closeRiskModal
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

            </div>

            <div className="px-6 py-6">

              <label className="text-sm font-semibold text-slate-800">
                Reason
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
                rows={5}
                placeholder="Explain why this Pay Now request should be marked suspicious or high-risk..."
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
              />

              <div className="mt-6 flex justify-end gap-2">

                <button
                  onClick={
                    closeRiskModal
                  }
                  disabled={
                    updatingRisk
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleRiskSubmit
                  }
                  disabled={
                    updatingRisk
                  }
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {updatingRisk
                    ? "Saving..."
                    : "Save Risk"}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}


      {/* ==================================================== */}
      {/* NOTES MODAL */}
      {/* ==================================================== */}

      {showNotesModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Internal Note
                </p>

                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Pay Now Notes
                </h3>
              </div>

              <button
                onClick={() =>
                  setShowNotesModal(
                    false
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

            </div>

            <div className="px-6 py-6">

              <textarea
                value={
                  notesValue
                }
                onChange={(event) =>
                  setNotesValue(
                    event.target.value
                  )
                }
                rows={7}
                placeholder="Add an internal note about this payment request..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
              />

              <div className="mt-5 flex justify-end gap-2">

                <button
                  onClick={() =>
                    setShowNotesModal(
                      false
                    )
                  }
                  disabled={
                    savingNotes
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={saveNotes}
                  disabled={
                    savingNotes
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  <Check size={15} />

                  {savingNotes
                    ? "Saving..."
                    : "Save Notes"}
                </button>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}