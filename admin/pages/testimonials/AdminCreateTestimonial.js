import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ImagePlus,
  Star,
  ShieldCheck,
  Home,
  Save,
  X,
  Upload,
} from "lucide-react";

import { createAdminTestimonial } from "../../services/adminApi";

export default function AdminCreateTestimonial() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    review: "",
    rating: 5,
    accent: "blue",
    verified: false,
    source: "customer",
    featuredOnHomepage: false,
    status: "approved",
    avatarUrl: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarUrlFailed, setAvatarUrlFailed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Avatar image must be smaller than 5MB.");
      return;
    }

    setAvatar(file);

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);

    // Uploaded image takes priority over URL.
    setFormData((prev) => ({
      ...prev,
      avatarUrl: "",
    }));

    setAvatarUrlFailed(false);

    setError("");
    setSuccess("");
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
  };

  const handleAvatarUrlChange = (event) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      avatarUrl: value,
    }));

    // URL becomes the active avatar source.
    if (value.trim()) {
      setAvatar(null);
      setAvatarPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Reset broken state whenever URL changes.
      setAvatarUrlFailed(false);
    } else {
      setAvatarUrlFailed(false);
    }

    setError("");
    setSuccess("");
  };

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Reviewer name is required.");
      return;
    }

    if (!formData.review.trim()) {
      setError("Review is required.");
      return;
    }

    if (!formData.rating) {
      setError("Please select a rating.");
      return;
    }

    if (
      formData.featuredOnHomepage &&
      (formData.source !== "tripadvisor" ||
        formData.status !== "approved")
    ) {
      setError(
        "Only approved TripAdvisor testimonials can be featured on the homepage."
      );
      return;
    }

    try {
      setLoading(true);

      await createAdminTestimonial({
        name: formData.name.trim(),
        location: formData.location.trim(),
        avatar,
        avatarUrl: formData.avatarUrl.trim(),
        review: formData.review.trim(),
        rating: Number(formData.rating),
        accent: formData.accent,
        verified: formData.verified,
        source: formData.source,
        featuredOnHomepage: formData.featuredOnHomepage,
        status: formData.status,
      });

      setSuccess("Testimonial created successfully.");

      setTimeout(() => {
        navigate("/testimonials");
      }, 700);
    } catch (error) {
      setError(
        error.message ||
          "Unable to create testimonial. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const hasUploadedAvatar = Boolean(avatarPreview);

  const hasAvatarUrl =
    Boolean(formData.avatarUrl.trim()) &&
    !avatarUrlFailed &&
    !hasUploadedAvatar;

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/testimonials")}
            className="inline-flex cursor-pointer items-center gap-2 text-xs text-[#68717D] transition-colors hover:text-[#101A2E]"
          >
            <ArrowLeft size={14} />
            Back to testimonials
          </button>

          <p className="mt-6 font-['Inter'] text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
            Reputation Management
          </p>

          <h2 className="mt-2 font-['Inter'] text-2xl font-medium text-[#101A2E] md:text-3xl">
            Create Testimonial
          </h2>

          <p className="mt-2 font-['Inter'] text-sm text-[#6F7782]">
            Add a new customer or TripAdvisor testimonial.
          </p>

        </div>

      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">

          <div className="flex items-start justify-between gap-4">

            <p className="text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="cursor-pointer text-red-400 hover:text-red-600"
            >
              <X size={15} />
            </button>

          </div>

        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">

          <p className="text-sm text-emerald-600">
            {success}
          </p>

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">

          <div className="space-y-6">

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <div className="mb-6">

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                  Reviewer Details
                </p>

                <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                  Customer Information
                </h3>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none transition-colors placeholder:text-[#A5ABB2] focus:border-[#C9A24B]"
                  />

                </div>

                {/* LOCATION */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, India"
                    className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none transition-colors placeholder:text-[#A5ABB2] focus:border-[#C9A24B]"
                  />

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <div className="mb-6">

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                  Customer Feedback
                </p>

                <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                  Review
                </h3>

              </div>

              <div>

                <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                  Review <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Write the customer's testimonial..."
                  className="w-full resize-none rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 py-3 text-sm leading-6 text-[#101A2E] outline-none transition-colors placeholder:text-[#A5ABB2] focus:border-[#C9A24B]"
                />

                <div className="mt-2 flex justify-between">

                  <p className="text-[11px] text-[#9AA1AA]">
                    Keep the testimonial authentic and concise.
                  </p>

                  <p className="text-[11px] text-[#9AA1AA]">
                    {formData.review.length} characters
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <div className="mb-6">

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                  Profile Image
                </p>

                <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                  Reviewer Avatar
                </h3>

              </div>

              <div className="flex flex-col gap-6 sm:flex-row">

                <div className="shrink-0">

                  {hasUploadedAvatar ? (

                    <div className="relative">

                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="h-24 w-24 rounded-full border border-[#101A2E]/10 object-cover"
                      />

                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="absolute -right-2 -top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#101A2E]/10 bg-white text-[#68717D] shadow-sm transition-colors hover:text-red-500"
                      >
                        <X size={13} />
                      </button>

                    </div>

                  ) : hasAvatarUrl ? (

                    <div className="relative">

                      <img
                        src={formData.avatarUrl.trim()}
                        alt="Avatar URL preview"
                        onError={() => setAvatarUrlFailed(true)}
                        className="h-24 w-24 rounded-full border border-[#101A2E]/10 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            avatarUrl: "",
                          }));

                          setAvatarUrlFailed(false);
                        }}
                        className="absolute -right-2 -top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#101A2E]/10 bg-white text-[#68717D] shadow-sm transition-colors hover:text-red-500"
                      >
                        <X size={13} />
                      </button>

                    </div>

                  ) : (

                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-[#101A2E]/15 bg-[#F8F9F9]">

                      <ImagePlus
                        size={22}
                        strokeWidth={1.4}
                        className="text-[#9AA1AA]"
                      />

                    </div>

                  )}

                </div>

                <div className="flex-1">

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#101A2E]/10 bg-white px-4 text-xs text-[#101A2E] transition-all hover:bg-[#101A2E] hover:text-white"
                  >
                    <Upload size={14} />
                    Upload Image
                  </button>

                  <p className="mt-3 text-[11px] leading-5 text-[#9AA1AA]">
                    JPG, PNG or WebP. Maximum size 5MB.
                  </p>

                  <div className="mt-5">

                    <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                      Or use an Avatar URL
                    </label>

                    <input
                      type="url"
                      name="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={handleAvatarUrlChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] placeholder:text-[#A5ABB2]"
                    />

                    {/* URL STATUS */}

                    {formData.avatarUrl.trim() && avatarUrlFailed && (
                      <p className="mt-2 text-[11px] text-red-500">
                        Unable to load this image URL. Please check the URL.
                      </p>
                    )}

                    {formData.avatarUrl.trim() && !avatarUrlFailed && (
                      <p className="mt-2 text-[11px] text-emerald-600">
                        Avatar preview loaded from URL.
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="space-y-6">

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                Rating
              </p>

              <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                Customer Rating
              </h3>

              <div className="mt-5 flex items-center gap-2">

                {[1, 2, 3, 4, 5].map((star) => (

                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className="cursor-pointer p-1"
                    title={`${star} star`}
                  >

                    <Star
                      size={27}
                      strokeWidth={1.5}
                      className={
                        star <= Number(formData.rating)
                          ? "fill-[#C9A24B] text-[#C9A24B]"
                          : "text-[#D5D9DE]"
                      }
                    />

                  </button>

                ))}

              </div>

              <p className="mt-3 text-xs text-[#7A828D]">
                {formData.rating}/5 stars
              </p>

            </div>

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                Source
              </p>

              <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                Testimonial Source
              </h3>

              <div className="mt-5 space-y-3">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="radio"
                    name="source"
                    value="customer"
                    checked={formData.source === "customer"}
                    onChange={handleChange}
                    className="accent-[#C9A24B]"
                  />

                  <div>

                    <p className="text-sm text-[#101A2E]">
                      Customer
                    </p>

                    <p className="text-[11px] text-[#9AA1AA]">
                      Direct customer feedback
                    </p>

                  </div>

                </label>

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="radio"
                    name="source"
                    value="tripadvisor"
                    checked={formData.source === "tripadvisor"}
                    onChange={handleChange}
                    className="accent-[#C9A24B]"
                  />

                  <div>

                    <p className="text-sm text-[#101A2E]">
                      TripAdvisor
                    </p>

                    <p className="text-[11px] text-[#9AA1AA]">
                      Review sourced from TripAdvisor
                    </p>

                  </div>

                </label>

              </div>

            </div>

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                Publishing
              </p>

              <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                Status
              </h3>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-5 h-11 w-full cursor-pointer rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              >
                <option value="approved">
                  Approved
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>

              <p className="mt-2 text-[11px] leading-5 text-[#9AA1AA]">
                Approved testimonials can be displayed on the website.
              </p>

            </div>

            <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">

              <p className="text-[10px] uppercase tracking-[0.16em] text-[#C9A24B]">
                Visibility
              </p>

              <h3 className="mt-1 text-lg font-medium text-[#101A2E]">
                Display Options
              </h3>

              <div className="mt-5 space-y-4">

                {/* VERIFIED */}

                <label className="flex cursor-pointer items-start gap-3">

                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleChange}
                    className="mt-0.5 accent-[#C9A24B]"
                  />

                  <div>

                    <div className="flex items-center gap-1.5">

                      <ShieldCheck
                        size={14}
                        className="text-emerald-500"
                      />

                      <p className="text-sm text-[#101A2E]">
                        Verified
                      </p>

                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-[#9AA1AA]">
                      Mark this reviewer as verified.
                    </p>

                  </div>

                </label>

                {/* HOMEPAGE */}

                <label className="flex cursor-pointer items-start gap-3">

                  <input
                    type="checkbox"
                    name="featuredOnHomepage"
                    checked={formData.featuredOnHomepage}
                    onChange={handleChange}
                    disabled={
                      formData.source !== "tripadvisor" ||
                      formData.status !== "approved"
                    }
                    className="mt-0.5 accent-[#C9A24B]"
                  />

                  <div>

                    <div className="flex items-center gap-1.5">

                      <Home
                        size={14}
                        className="text-[#C9A24B]"
                      />

                      <p className="text-sm text-[#101A2E]">
                        Feature on homepage
                      </p>

                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-[#9AA1AA]">
                      Only approved TripAdvisor testimonials can be featured.
                    </p>

                  </div>

                </label>

              </div>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={() =>
                navigate("/testimonials")
              }
              disabled={loading}
              className="h-11 cursor-pointer rounded-xl border border-[#101A2E]/10 bg-white px-5 text-sm text-[#68717D] transition-all hover:bg-[#F8F9F9] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#101A2E] px-6 text-sm text-white transition-all hover:bg-[#17243D] disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Create Testimonial
                </>
              )}

            </button>

          </div>

        </div>

      </form>

    </section>
  );
}
