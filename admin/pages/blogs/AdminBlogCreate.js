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
import BlogRichTextEditor from "./BlogRichTextEditor";

export default function AdminBlogCreate() {
  const navigate = useNavigate();

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

  const errorRef = useRef(null);

  const [imageType, setImageType] = useState("upload");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleContentChange = (content) => {
    setFormData((previous) => ({
      ...previous,
      content,
    }));
  };

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

  const handleImageTypeChange = (type) => {
    setImageType(type);
    setImage(null);
    setImageUrl("");
    setImagePreview("");
    setError("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setImageUrl("");
  };

  const handleImageUrlChange = (event) => {
    const value = event.target.value;

    setImageUrl(value);
    setImage(null);
    setError("");

    if (value.trim()) {
      setImagePreview(value.trim());
    } else {
      setImagePreview("");
    }
  };

  const handleImagePreviewError = () => {
    if (imageType === "url" && imageUrl.trim()) {
      setError(
        "Unable to load this image URL. Please check that the URL is valid and publicly accessible."
      );
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl("");
    setImagePreview("");
    setError("");
  };

  const hasBlogContent = (html) => {
    const container = document.createElement("div");

    container.innerHTML = html;

    return Boolean(container.textContent?.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

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

      if (!hasBlogContent(formData.content)) {
        setError("Blog content is required.");
        return;
      }

      if (imageType === "upload" && !image) {
        setError("Please upload a cover image.");
        return;
      }

      if (imageType === "url" && !imageUrl.trim()) {
        setError("Please enter a cover image URL.");
        return;
      }

      const imageValue =
        imageType === "upload"
          ? image
          : imageUrl.trim();

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

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-xs text-[#68717D] transition-colors hover:text-[#101A2E]"
          >
            <ArrowLeft size={14} />
            Back to Blogs
          </button>

          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
            Editorial Management
          </p>

          <h2 className="mt-2 text-2xl font-medium text-[#101A2E] md:text-3xl">
            Create Blog
          </h2>

          <p className="mt-2 text-sm text-[#6F7782]">
            Create a new travel story, destination guide or
            travel insight.
          </p>
        </div>
      </div>

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
        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#101A2E]/5">
              <FileText
                size={17}
                className="text-[#101A2E]"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#101A2E]">
                Blog Information
              </h3>

              <p className="mt-1 text-xs text-[#8A929D]">
                Define the main information for your article.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Blog Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: The Ultimate Guide to Rajasthan"
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Slug *
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="ultimate-guide-to-rajasthan"
                  className="h-11 flex-1 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />

                <button
                  type="button"
                  onClick={generateSlug}
                  className="h-11 rounded-xl border border-[#101A2E]/10 px-3 text-xs text-[#68717D] transition-all hover:bg-[#101A2E] hover:text-white"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Rajasthan Travel"
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Rajasthan, Jaipur, Travel"
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                Separate tags with commas.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <h3 className="text-sm font-medium text-[#101A2E]">
            Cover Image
          </h3>

          <p className="mt-1 text-xs text-[#8A929D]">
            Upload an image or use an existing public image URL.
          </p>

          <div className="mt-5 flex w-fit items-center gap-2 rounded-xl border border-[#101A2E]/8 bg-[#F8F9F9] p-1">
            <button
              type="button"
              onClick={() =>
                handleImageTypeChange("upload")
              }
              className={[
                "inline-flex h-9 items-center gap-2 rounded-lg px-4 text-xs transition-all",
                imageType === "upload"
                  ? "bg-[#101A2E] text-white shadow-sm"
                  : "text-[#68717D] hover:text-[#101A2E]",
              ].join(" ")}
            >
              <Upload size={13} />
              Upload Image
            </button>

            <button
              type="button"
              onClick={() =>
                handleImageTypeChange("url")
              }
              className={[
                "inline-flex h-9 items-center gap-2 rounded-lg px-4 text-xs transition-all",
                imageType === "url"
                  ? "bg-[#101A2E] text-white shadow-sm"
                  : "text-[#68717D] hover:text-[#101A2E]",
              ].join(" ")}
            >
              <LinkIcon size={13} />
              Image URL
            </button>
          </div>

          {imageType === "upload" && !imagePreview && (
            <label className="mt-5 flex h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#101A2E]/15 bg-[#F8F9F9] transition-colors hover:border-[#C9A24B]">
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

          {imageType === "url" && (
            <div className="mt-5">
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
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
                  className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] pl-11 pr-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
                />
              </div>

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                Use a publicly accessible image URL.
              </p>
            </div>
          )}

          {imagePreview && (
            <div className="relative mt-5">
              <img
                src={imagePreview}
                alt="Blog preview"
                onError={handleImagePreviewError}
                className="h-64 w-full rounded-2xl border border-[#101A2E]/8 object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm transition-colors hover:bg-white"
                title="Remove image"
              >
                <X size={15} />
              </button>

              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[10px] text-white backdrop-blur-sm">
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

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <h3 className="text-sm font-medium text-[#101A2E]">
            Content
          </h3>

          <p className="mt-1 text-xs text-[#8A929D]">
            Write the complete article content.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Short Description *
              </label>

              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                placeholder="A short introduction that will appear on blog cards..."
                className="w-full resize-y rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Blog Content *
              </label>

              <BlogRichTextEditor
                value={formData.content}
                onChange={handleContentChange}
              />

              <p className="mt-2 text-[10px] text-[#9AA1AA]">
                Format your article using headings, bold, italic,
                underline, lists, links and highlights.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <h3 className="text-sm font-medium text-[#101A2E]">
            Publishing Settings
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Featured Story
              </label>

              <label className="flex h-11 cursor-pointer items-center gap-3 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      featured: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#C9A24B]"
                />

                <span className="text-sm text-[#68717D]">
                  Feature this blog on homepage
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="h-11 rounded-xl border border-[#101A2E]/10 bg-white px-5 text-xs text-[#101A2E] transition-all hover:bg-[#F8F9F9]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#101A2E] px-6 text-xs text-white transition-all hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Save size={14} />
            )}

            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </section>
  );
}