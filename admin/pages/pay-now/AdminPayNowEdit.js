import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  CreditCard,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";

import {
  getPayNowEnquiry,
  updatePayNowEnquiry,
} from "../../services/adminApi";

export default function AdminPayNowEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    amount: "",
    description: "",

    customer: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      email: "",
      telephone: "",
    },

    billing: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      telephone: "",
    },
  });

  // ==========================================================
  // FETCH ENQUIRY
  // ==========================================================

  useEffect(() => {
    if (!id) {
      setError("Pay Now enquiry ID is missing.");
      setLoading(false);
      return;
    }

    fetchEnquiry();
  }, [id]);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPayNowEnquiry(id);

      const enquiry = response?.enquiry;

      if (!enquiry) {
        throw new Error("Pay Now enquiry not found.");
      }

      setFormData({
        amount:
          enquiry.amount !== undefined &&
          enquiry.amount !== null
            ? enquiry.amount
            : "",

        description:
          enquiry.description || "",

        customer: {
          name: enquiry.customer?.name || "",
          address: enquiry.customer?.address || "",
          city: enquiry.customer?.city || "",
          state: enquiry.customer?.state || "",
          postalCode:
            enquiry.customer?.postalCode || "",
          country: enquiry.customer?.country || "",
          email: enquiry.customer?.email || "",
          telephone:
            enquiry.customer?.telephone || "",
        },

        billing: {
          name: enquiry.billing?.name || "",
          address: enquiry.billing?.address || "",
          city: enquiry.billing?.city || "",
          state: enquiry.billing?.state || "",
          postalCode:
            enquiry.billing?.postalCode || "",
          country: enquiry.billing?.country || "",
          telephone:
            enquiry.billing?.telephone || "",
        },
      });
    } catch (err) {
      console.error(
        "Failed to fetch Pay Now enquiry:",
        err
      );

      setError(
        err?.message ||
          "Failed to load Pay Now enquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INPUT HANDLERS
  // ==========================================================

  const handleTopLevelChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomerChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const handleBillingChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        [field]: value,
      },
    }));
  };

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateForm = () => {
    const amount = Number(formData.amount);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return "Please enter a valid positive payment amount.";
    }

    if (
      !formData.description.trim()
    ) {
      return "Payment description is required.";
    }

    const customerFields = [
      ["name", "Customer name"],
      ["address", "Customer address"],
      ["city", "Customer city"],
      ["state", "Customer state"],
      ["postalCode", "Customer postal code"],
      ["country", "Customer country"],
      ["email", "Customer email"],
      ["telephone", "Customer telephone"],
    ];

    for (const [field, label] of customerFields) {
      if (
        !formData.customer[field] ||
        !String(
          formData.customer[field]
        ).trim()
      ) {
        return `${label} is required.`;
      }
    }

    const EMAIL_REGEX =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !EMAIL_REGEX.test(
        formData.customer.email
          .trim()
          .toLowerCase()
      )
    ) {
      return "Please enter a valid customer email address.";
    }

    if (
      formData.customer.telephone.trim()
        .length < 7 ||
      formData.customer.telephone.trim()
        .length > 20
    ) {
      return "Customer telephone must be between 7 and 20 characters.";
    }

    const billingFields = [
      ["name", "Billing name"],
      ["address", "Billing address"],
      ["city", "Billing city"],
      ["state", "Billing state"],
      ["postalCode", "Billing postal code"],
      ["country", "Billing country"],
      ["telephone", "Billing telephone"],
    ];

    for (const [field, label] of billingFields) {
      if (
        !formData.billing[field] ||
        !String(
          formData.billing[field]
        ).trim()
      ) {
        return `${label} is required.`;
      }
    }

    if (
      formData.billing.telephone.trim()
        .length < 7 ||
      formData.billing.telephone.trim()
        .length > 20
    ) {
      return "Billing telephone must be between 7 and 20 characters.";
    }

    return null;
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    try {
      setSaving(true);

      const payload = {
        amount: Number(formData.amount),

        description:
          formData.description.trim(),

        customer: {
          name:
            formData.customer.name.trim(),

          address:
            formData.customer.address.trim(),

          city:
            formData.customer.city.trim(),

          state:
            formData.customer.state.trim(),

          postalCode:
            formData.customer.postalCode.trim(),

          country:
            formData.customer.country.trim(),

          email:
            formData.customer.email
              .trim()
              .toLowerCase(),

          telephone:
            formData.customer.telephone.trim(),
        },

        billing: {
          name:
            formData.billing.name.trim(),

          address:
            formData.billing.address.trim(),

          city:
            formData.billing.city.trim(),

          state:
            formData.billing.state.trim(),

          postalCode:
            formData.billing.postalCode.trim(),

          country:
            formData.billing.country.trim(),

          telephone:
            formData.billing.telephone.trim(),
        },
      };

      await updatePayNowEnquiry(
        id,
        payload
      );

      setSuccess(
        "Pay Now enquiry updated successfully."
      );

      setTimeout(() => {
        navigate(`/pay-now/${id}`);
      }, 700);
    } catch (err) {
      console.error(
        "Failed to update Pay Now enquiry:",
        err
      );

      setError(
        err?.message ||
          "Failed to update Pay Now enquiry."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f7fafb]">
        <div className="flex items-center gap-3 text-[#124d56]">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span className="text-sm font-medium">
            Loading Pay Now enquiry...
          </span>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR WITHOUT DATA
  // ==========================================================

  if (
    error &&
    !formData.customer.name
  ) {
    return (
      <div className="min-h-[70vh] bg-[#f7fafb] px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() =>
              navigate("/pay-now")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#124d56] hover:opacity-70"
          >
            <ArrowLeft size={17} />
            Back to Pay Now enquiries
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f7fafb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate(`/pay-now/${id}`)
            }
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#124d56] transition hover:opacity-70"
          >
            <ArrowLeft size={17} />
            Back to enquiry
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d47a45]">
                <CreditCard size={15} />
                Pay Now
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-[#123138] sm:text-4xl">
                Edit payment request
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Update the payment request,
                customer information, or billing
                information.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            ALERTS
        ================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ==================================================
              PAYMENT REQUEST
          ================================================== */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(18,49,56,0.05)]">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#124d56]/10 text-[#124d56]">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#123138]">
                    Payment request
                  </h2>

                  <p className="text-sm text-slate-500">
                    Payment amount and request
                    description.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-6 py-7 sm:px-8 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Amount
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.amount}
                    onChange={(event) =>
                      handleTopLevelChange(
                        "amount",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#124d56] focus:ring-2 focus:ring-[#124d56]/10"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={17}
                    className="pointer-events-none absolute left-4 top-4 text-slate-400"
                  />

                  <textarea
                    rows={4}
                    value={
                      formData.description
                    }
                    onChange={(event) =>
                      handleTopLevelChange(
                        "description",
                        event.target.value
                      )
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-[#124d56] focus:ring-2 focus:ring-[#124d56]/10"
                    placeholder="Describe what this payment request is for..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              CUSTOMER INFORMATION
          ================================================== */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(18,49,56,0.05)]">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#124d56]/10 text-[#124d56]">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#123138]">
                    Customer information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Customer contact and address
                    details.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-6 py-7 sm:px-8 md:grid-cols-2">

              <InputField
                label="Full name"
                value={
                  formData.customer.name
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "name",
                    value
                  )
                }
                icon={<User size={16} />}
              />

              <InputField
                label="Email"
                type="email"
                value={
                  formData.customer.email
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "email",
                    value
                  )
                }
                icon={<Mail size={16} />}
              />

              <InputField
                label="Telephone"
                value={
                  formData.customer.telephone
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "telephone",
                    value
                  )
                }
                icon={<Phone size={16} />}
              />

              <InputField
                label="Country"
                value={
                  formData.customer.country
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "country",
                    value
                  )
                }
                icon={<MapPin size={16} />}
              />

              <InputField
                label="Address"
                value={
                  formData.customer.address
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "address",
                    value
                  )
                }
                icon={<MapPin size={16} />}
                fullWidth
              />

              <InputField
                label="City"
                value={
                  formData.customer.city
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "city",
                    value
                  )
                }
              />

              <InputField
                label="State"
                value={
                  formData.customer.state
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "state",
                    value
                  )
                }
              />

              <InputField
                label="Postal code"
                value={
                  formData.customer.postalCode
                }
                onChange={(value) =>
                  handleCustomerChange(
                    "postalCode",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* ==================================================
              BILLING INFORMATION
          ================================================== */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(18,49,56,0.05)]">
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d47a45]/10 text-[#d47a45]">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#123138]">
                    Billing information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Billing name, address, and
                    telephone.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-6 py-7 sm:px-8 md:grid-cols-2">

              <InputField
                label="Billing name"
                value={
                  formData.billing.name
                }
                onChange={(value) =>
                  handleBillingChange(
                    "name",
                    value
                  )
                }
                icon={<User size={16} />}
              />

              <InputField
                label="Billing telephone"
                value={
                  formData.billing.telephone
                }
                onChange={(value) =>
                  handleBillingChange(
                    "telephone",
                    value
                  )
                }
                icon={<Phone size={16} />}
              />

              <InputField
                label="Billing country"
                value={
                  formData.billing.country
                }
                onChange={(value) =>
                  handleBillingChange(
                    "country",
                    value
                  )
                }
                icon={<MapPin size={16} />}
              />

              <InputField
                label="Billing address"
                value={
                  formData.billing.address
                }
                onChange={(value) =>
                  handleBillingChange(
                    "address",
                    value
                  )
                }
                icon={<MapPin size={16} />}
                fullWidth
              />

              <InputField
                label="Billing city"
                value={
                  formData.billing.city
                }
                onChange={(value) =>
                  handleBillingChange(
                    "city",
                    value
                  )
                }
              />

              <InputField
                label="Billing state"
                value={
                  formData.billing.state
                }
                onChange={(value) =>
                  handleBillingChange(
                    "state",
                    value
                  )
                }
              />

              <InputField
                label="Billing postal code"
                value={
                  formData.billing.postalCode
                }
                onChange={(value) =>
                  handleBillingChange(
                    "postalCode",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_15px_50px_rgba(18,49,56,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={() =>
                navigate(`/pay-now/${id}`)
              }
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={17} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#124d56] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#124d56]/20 transition hover:bg-[#0e3f47] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Saving changes...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// REUSABLE INPUT
// ============================================================

function InputField({
  label,
  value,
  onChange,
  type = "text",
  icon = null,
  fullWidth = false,
}) {
  return (
    <div
      className={
        fullWidth
          ? "md:col-span-2"
          : ""
      }
    >
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#124d56] focus:ring-2 focus:ring-[#124d56]/10 ${
            icon
              ? "pl-11"
              : "pl-4"
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}