import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import {
  ArrowLeft,
  ImagePlus,
  Link as LinkIcon,
  X,
  Save,
  FileText,
  Upload,
} from "lucide-react";

import { createAdminBlog } from "../../services/adminApi";

// ============================================================
// ADMIN CREATE BLOG
// ============================================================

export default function AdminBlogCreate() {
  const navigate = useNavigate();

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    content: "",
    category: "",
    tags: "",
    author: "Times India Travels",
    status: "draft",
    featured: false,
  });

  // ==========================================================
  // IMAGE STATE
  // ==========================================================

  // "upload" | "url"
  const errorRef = useRef(null);

  const [imageType, setImageType] = useState("upload");

  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [imagePreview, setImagePreview] = useState("");

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  useEffect(() => {
  if (!error || !errorRef.current) {
    return;
  }

  errorRef.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}, [error]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================================
  // GENERATE SLUG
  // ==========================================================

  const generateSlug = () => {
    const slug = formData.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((previous) => ({
      ...previous,
      slug,
    }));
  };

  // ==========================================================
  // CHANGE IMAGE TYPE
  // ==========================================================

  const handleImageTypeChange = (type) => {
    setImageType(type);

    // Reset image state when switching methods
    setImage(null);
    setImageUrl("");
    setImagePreview("");

    setError("");
  };

  // ==========================================================
  // IMAGE FILE UPLOAD
  // ==========================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // --------------------------------------------------------
    // VALIDATE FILE TYPE
    // --------------------------------------------------------

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    // --------------------------------------------------------
    // VALIDATE FILE SIZE
    // --------------------------------------------------------

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");

    setImage(file);

    // --------------------------------------------------------
    // CREATE PREVIEW
    // --------------------------------------------------------

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    // Make sure URL field is cleared
    setImageUrl("");
  };

  // ==========================================================
  // IMAGE URL
  // ==========================================================

  const handleImageUrlChange = (event) => {
    const value = event.target.value;

    setImageUrl(value);

    // Clear uploaded file
    setImage(null);

    setError("");

    // --------------------------------------------------------
    // PREVIEW URL
    // --------------------------------------------------------

    if (value.trim()) {
      setImagePreview(value.trim());
    } else {
      setImagePreview("");
    }
  };

  // ==========================================================
  // URL IMAGE ERROR
  // ==========================================================

  const handleImagePreviewError = () => {
    if (imageType === "url" && imageUrl.trim()) {
      setError(
        "Unable to load this image URL. Please check that the URL is valid and publicly accessible."
      );
    }
  };

  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  const removeImage = () => {
    setImage(null);
    setImageUrl("");
    setImagePreview("");

    setError("");
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // ======================================================
      // VALIDATION
      // ======================================================

      if (!formData.title.trim()) {
        setError("Blog title is required.");
        return;
      }

      if (!formData.slug.trim()) {
        setError("Blog slug is required.");
        return;
      }

      if (!formData.shortDescription.trim()) {
        setError("Short description is required.");
        return;
      }

      if (!formData.content.trim()) {
        setError("Blog content is required.");
        return;
      }

      // ======================================================
      // IMAGE VALIDATION
      // ======================================================

      if (imageType === "upload" && !image) {
        setError("Please upload a cover image.");
        return;
      }

      if (imageType === "url" && !imageUrl.trim()) {
        setError("Please enter a cover image URL.");
        return;
      }

      // ======================================================
      // IMAGE VALUE
      // ======================================================

      const imageValue =
        imageType === "upload"
          ? image
          : imageUrl.trim();

      // ======================================================
      // CREATE BLOG
      // ======================================================

      const response = await createAdminBlog({
        title: formData.title,
        slug: formData.slug,
        image: imageValue,
        shortDescription: formData.shortDescription,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        author: formData.author,
        status: formData.status,
        featured: formData.featured,
      });

      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        response?.message ||
          "Blog created successfully."
      );

      setTimeout(() => {
        navigate("/blogs");
      }, 700);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong while creating the blog."
      );
    } finally {
      setLoading(false);
    }
  };

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

          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
          >
            <ArrowLeft size={14} />

            Back to Blogs
          </button>

          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
            Editorial Management
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
            Create Blog
          </h2>

          <p className="mt-2 text-sm text-[#6F7782]">
            Create a new travel story, destination guide or
            travel insight.
          </p>

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
         ref={errorRef} 
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">

          <p className="text-sm text-red-600">
            {error}
          </p>

        </div>
      )}

      {/* ======================================================
          SUCCESS
      ====================================================== */}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">

          <p className="text-sm text-emerald-600">
            {success}
          </p>

        </div>
      )}

      {/* ======================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ====================================================
            BASIC INFORMATION
        ==================================================== */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-9 h-9 rounded-xl bg-[#101A2E]/5 flex items-center justify-center">

              <FileText
                size={17}
                className="text-[#101A2E]"
              />

            </div>

            <div>

              <h3 className="text-sm font-medium text-[#101A2E]">
                Blog Information
              </h3>

              <p className="text-xs text-[#8A929D] mt-1">
                Define the main information for your article.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* TITLE */}

            <div className="lg:col-span-2">

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Blog Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: The Ultimate Guide to Rajasthan"
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

            </div>

            {/* SLUG */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Slug *
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="ultimate-guide-to-rajasthan"
                  className="flex-1 h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />

                <button
                  type="button"
                  onClick={generateSlug}
                  className="h-11 px-3 rounded-xl border border-[#101A2E]/10 text-xs text-[#68717D] hover:bg-[#101A2E] hover:text-white transition-all"
                >
                  Generate
                </button>

              </div>

            </div>

            {/* CATEGORY */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Rajasthan Travel"
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

            </div>

            {/* AUTHOR */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

            </div>

            {/* TAGS */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Rajasthan, Jaipur, Travel"
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                Separate tags with commas.
              </p>

            </div>

          </div>

        </div>

        {/* ====================================================
            IMAGE
        ==================================================== */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

          <h3 className="text-sm font-medium text-[#101A2E]">
            Cover Image
          </h3>

          <p className="mt-1 text-xs text-[#8A929D]">
            Upload an image or use an existing public image URL.
          </p>

          {/* ==================================================
              IMAGE TYPE SELECTOR
          ================================================== */}

          <div className="mt-5 flex items-center gap-2 p-1 rounded-xl bg-[#F8F9F9] border border-[#101A2E]/8 w-fit">

            {/* UPLOAD */}

            <button
              type="button"
              onClick={() =>
                handleImageTypeChange("upload")
              }
              className={[
                "inline-flex items-center gap-2",
                "h-9 px-4",
                "rounded-lg",
                "text-xs",
                "transition-all",
                imageType === "upload"
                  ? "bg-[#101A2E] text-white shadow-sm"
                  : "text-[#68717D] hover:text-[#101A2E]",
              ].join(" ")}
            >
              <Upload size={13} />

              Upload Image
            </button>

            {/* URL */}

            <button
              type="button"
              onClick={() =>
                handleImageTypeChange("url")
              }
              className={[
                "inline-flex items-center gap-2",
                "h-9 px-4",
                "rounded-lg",
                "text-xs",
                "transition-all",
                imageType === "url"
                  ? "bg-[#101A2E] text-white shadow-sm"
                  : "text-[#68717D] hover:text-[#101A2E]",
              ].join(" ")}
            >
              <LinkIcon size={13} />

              Image URL
            </button>

          </div>

          {/* ==================================================
              UPLOAD IMAGE
          ================================================== */}

          {imageType === "upload" && !imagePreview && (
            <label className="mt-5 flex flex-col items-center justify-center h-52 rounded-2xl border border-dashed border-[#101A2E]/15 bg-[#F8F9F9] cursor-pointer hover:border-[#C9A24B] transition-colors">

              <ImagePlus
                size={28}
                strokeWidth={1.4}
                className="text-[#9AA1AA]"
              />

              <p className="mt-3 text-sm text-[#68717D]">
                Click to upload an image
              </p>

              <p className="mt-1 text-[10px] text-[#9AA1AA]">
                JPG, PNG or WEBP · Maximum 5MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>
          )}

          {/* ==================================================
              IMAGE URL
          ================================================== */}

          {imageType === "url" && (
            <div className="mt-5">

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Image URL
              </label>

              <div className="relative">

                <LinkIcon
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA1AA]"
                />

                <input
                  type="url"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/images/rajasthan.jpg"
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />

              </div>

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                Use a publicly accessible image URL.
              </p>

            </div>
          )}

          {/* ==================================================
              IMAGE PREVIEW
          ================================================== */}

          {imagePreview && (
            <div className="mt-5 relative">

              <img
                src={imagePreview}
                alt="Blog preview"
                onError={handleImagePreviewError}
                className="w-full h-64 object-cover rounded-2xl border border-[#101A2E]/8"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-red-500 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                title="Remove image"
              >
                <X size={15} />
              </button>

              {/* IMAGE TYPE LABEL */}

              <div className="absolute bottom-3 left-3">

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 text-white text-[10px] backdrop-blur-sm">

                  {imageType === "upload" ? (
                    <>
                      <Upload size={11} />
                      Uploaded Image
                    </>
                  ) : (
                    <>
                      <LinkIcon size={11} />
                      Image URL
                    </>
                  )}

                </span>

              </div>

            </div>
          )}

        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

          <h3 className="text-sm font-medium text-[#101A2E]">
            Content
          </h3>

          <p className="mt-1 text-xs text-[#8A929D]">
            Write the complete article content.
          </p>

          <div className="mt-5 space-y-5">

            {/* SHORT DESCRIPTION */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Short Description *
              </label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                placeholder="A short introduction that will appear on blog cards..."
                className="w-full px-4 py-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none resize-y focus:border-[#C9A24B]"
              />

            </div>

            {/* CONTENT */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Blog Content *
              </label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={18}
                placeholder="Write your complete travel article here..."
                className="w-full px-4 py-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm leading-6 text-[#101A2E] outline-none resize-y focus:border-[#C9A24B]"
              />

            </div>

          </div>

        </div>

        {/* ====================================================
            PUBLISH SETTINGS
        ==================================================== */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-6">

          <h3 className="text-sm font-medium text-[#101A2E]">
            Publishing Settings
          </h3>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* STATUS */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

              </select>

            </div>

            {/* FEATURED */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Featured Story
              </label>

              <label className="h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      featured:
                        event.target.checked,
                    }))
                  }
                  className="w-4 h-4 accent-[#C9A24B]"
                />

                <span className="text-sm text-[#68717D]">
                  Feature this blog on homepage
                </span>

              </label>

            </div>

          </div>

        </div>

        {/* ====================================================
            ACTIONS
        ==================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">

          {/* CANCEL */}

          <button
            type="button"
            onClick={() =>
              navigate("/blogs")
            }
            className="h-11 px-5 rounded-xl border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#F8F9F9] transition-all"
          >
            Cancel
          </button>

          {/* CREATE */}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all disabled:opacity-50"
          >

            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={14} />
            )}

            {loading
              ? "Creating..."
              : "Create Blog"}

          </button>

        </div>

      </form>

    </section>
  );
}