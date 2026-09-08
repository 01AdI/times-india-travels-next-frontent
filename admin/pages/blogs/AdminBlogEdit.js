import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  ImagePlus,
  X,
  Save,
  RefreshCw,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

import {
  getAdminBlog,
  updateAdminBlog,
} from "../../services/adminApi";

// ============================================================
// ADMIN EDIT BLOG
// ============================================================

export default function AdminBlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================================================
  // ERROR REF
  // ==========================================================

  const errorRef = useRef(null);

  // ==========================================================
  // FORM
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
  // IMAGE
  // ==========================================================

  // Uploaded file
  const [image, setImage] = useState(null);

  // Image URL
  const [imageUrl, setImageUrl] = useState("");

  // Preview of either uploaded file or URL
  const [imagePreview, setImagePreview] = useState("");

  // ==========================================================
  // UI
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================================
  // SCROLL TO ERROR
  // ==========================================================

  useEffect(() => {
    if (!error || !errorRef.current) {
      return;
    }

    // Wait until React has rendered the error element
    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [error]);

  // ==========================================================
  // FETCH BLOG
  // ==========================================================

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await getAdminBlog(id);

      const blog = response.data;

      if (!blog) {
        throw new Error("Blog not found.");
      }

      // --------------------------------------------------------
      // SET FORM DATA
      // --------------------------------------------------------

      setFormData({
        title: blog.title || "",

        slug: blog.slug || "",

        shortDescription:
          blog.shortDescription || "",

        content:
          blog.content || "",

        category:
          blog.category || "",

        tags:
          Array.isArray(blog.tags)
            ? blog.tags.join(", ")
            : blog.tags || "",

        author:
          blog.author || "Times India Travels",

        status:
          blog.status || "draft",

        featured:
          Boolean(blog.featured),
      });

      // --------------------------------------------------------
      // EXISTING IMAGE
      // --------------------------------------------------------

      if (blog.image) {
        setImageUrl(blog.image);
        setImagePreview(blog.image);
      } else {
        setImageUrl("");
        setImagePreview("");
      }

      setImage(null);
    } catch (error) {
      console.error(
        "Failed to fetch blog:",
        error
      );

      setError(
        error.message ||
          "Unable to load this blog."
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
      fetchBlog();
    }
  }, [id]);

  // ==========================================================
  // INPUT
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================================
  // IMAGE FILE
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
      setError(
        "Image size must be less than 5MB."
      );
      return;
    }

    setError("");

    // --------------------------------------------------------
    // FILE TAKES PRIORITY OVER URL
    // --------------------------------------------------------

    setImage(file);

    // Clear URL because uploaded image takes priority
    setImageUrl("");

    // --------------------------------------------------------
    // CREATE PREVIEW
    // --------------------------------------------------------

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ==========================================================
  // IMAGE URL
  // ==========================================================

  const handleImageUrlChange = (event) => {
    const value = event.target.value;

    setImageUrl(value);

    // --------------------------------------------------------
    // URL TAKES PRIORITY
    // --------------------------------------------------------

    if (image) {
      setImage(null);
    }

    setImagePreview(value);

    setError("");
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
  // IMAGE PREVIEW ERROR
  // ==========================================================

  const handleImagePreviewError = () => {
    setError(
      "Unable to load this image. Please check the image URL."
    );
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
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
        setError(
          "Short description is required."
        );
        return;
      }

      if (!formData.content.trim()) {
        setError("Blog content is required.");
        return;
      }

      // ======================================================
      // IMAGE
      //
      // Uploaded file has priority.
      // Otherwise use image URL.
      // ======================================================

      const imageValue =
        image || imageUrl.trim();

      // ======================================================
      // UPDATE BLOG
      // ======================================================

      const response = await updateAdminBlog(
        id,
        {
          title: formData.title,
          slug: formData.slug,

          image: imageValue,

          shortDescription:
            formData.shortDescription,

          content:
            formData.content,

          category:
            formData.category,

          tags:
            formData.tags,

          author:
            formData.author,

          status:
            formData.status,

          featured:
            formData.featured,
        }
      );

      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        response?.message ||
          "Blog updated successfully."
      );

      // ======================================================
      // REDIRECT
      // ======================================================

      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 700);
    } catch (error) {
      console.error(
        "Failed to update blog:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while updating the blog."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center">

            <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

            <p className="mt-4 text-sm text-[#7A828D]">
              Loading blog...
            </p>

          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // INITIAL FETCH ERROR
  // ==========================================================

  if (error && !formData.title) {
    return (
      <section className="space-y-6">

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() =>
            navigate("/blogs")
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
        >
          <ArrowLeft size={14} />

          Back to Blogs
        </button>

        {/* ERROR */}

        <div
          ref={errorRef}
          className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8"
        >
          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchBlog}
            className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-red-700 underline"
          >
            <RefreshCw size={12} />

            Try again
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
            navigate(`/blogs/${id}`)
          }
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E] transition-colors"
        >
          <ArrowLeft size={14} />

          Back to Blog
        </button>

        <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
          Editorial Management
        </p>

        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
          Edit Blog
        </h2>

        <p className="mt-2 text-sm text-[#6F7782]">
          Update your travel story and publishing
          settings.
        </p>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          ref={errorRef}
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4"
        >
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
            INFORMATION
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
                Update the main information for this
                article.
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
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

            </div>

            {/* SLUG */}

            <div>

              <label className="block text-xs font-medium text-[#4E5762] mb-2">
                Slug *
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

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

          <div className="flex items-start justify-between gap-4">

            <div>

              <h3 className="text-sm font-medium text-[#101A2E]">
                Cover Image
              </h3>

              <p className="mt-1 text-xs text-[#8A929D]">
                Upload an image or use an external image
                URL.
              </p>

            </div>

          </div>

          {/* IMAGE URL */}

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
                placeholder="https://example.com/travel-image.jpg"
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

            </div>

            <p className="mt-2 text-[10px] text-[#9AA1AA]">
              Paste a publicly accessible image URL.
              Selecting a file will replace this URL.
            </p>

          </div>

          {/* DIVIDER */}

          <div className="flex items-center gap-4 my-6">

            <div className="h-px flex-1 bg-[#101A2E]/8" />

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
              Or
            </span>

            <div className="h-px flex-1 bg-[#101A2E]/8" />

          </div>

          {/* FILE UPLOAD */}

          <label className="flex flex-col items-center justify-center h-40 rounded-2xl border border-dashed border-[#101A2E]/15 bg-[#F8F9F9] cursor-pointer hover:border-[#C9A24B] transition-colors">

            <ImagePlus
              size={28}
              strokeWidth={1.4}
              className="text-[#9AA1AA]"
            />

            <p className="mt-3 text-sm text-[#68717D]">
              Click to upload a new image
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

          {/* PREVIEW */}

          {imagePreview && (
            <div className="mt-5">

              <div className="flex items-center justify-between mb-2">

                <p className="text-xs font-medium text-[#4E5762]">
                  Image Preview
                </p>

                <button
                  type="button"
                  onClick={removeImage}
                  className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600"
                >
                  <X size={13} />

                  Remove image
                </button>

              </div>

              <div className="relative">

                <img
                  src={imagePreview}
                  alt="Blog cover preview"
                  onError={handleImagePreviewError}
                  className="w-full h-64 object-cover rounded-2xl border border-[#101A2E]/8 bg-[#F8F9F9]"
                />

                {/* FILE INDICATOR */}

                {image && (
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 text-white text-[10px]">
                    Uploaded image
                  </div>
                )}

                {/* URL INDICATOR */}

                {!image && imageUrl && (
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 text-white text-[10px]">
                    Image URL
                  </div>
                )}

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
                className="w-full px-4 py-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm leading-6 text-[#101A2E] outline-none resize-y focus:border-[#C9A24B]"
              />

            </div>

          </div>

        </div>

        {/* ====================================================
            PUBLISHING
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
              navigate(`/blogs/${id}`)
            }
            className="h-11 px-5 rounded-xl border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#F8F9F9] transition-all"
          >
            Cancel
          </button>

          {/* SAVE */}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all disabled:opacity-50"
          >

            {saving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={14} />
            )}

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </section>
  );
}