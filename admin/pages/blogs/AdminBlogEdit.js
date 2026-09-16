
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

import BlogRichTextEditor from "./BlogRichTextEditor";

export default function AdminBlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const errorRef = useRef(null);

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

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!error || !errorRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [error]);

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

      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        shortDescription: blog.shortDescription || "",
        content: blog.content || "",
        category: blog.category || "",
        tags: Array.isArray(blog.tags)
          ? blog.tags.join(", ")
          : blog.tags || "",
        author: blog.author || "Times India Travels",
        status: blog.status || "draft",
        featured: Boolean(blog.featured),
      });

      if (blog.image) {
        setImageUrl(blog.image);
        setImagePreview(blog.image);
      } else {
        setImageUrl("");
        setImagePreview("");
      }

      setImage(null);
    } catch (error) {
      console.error("Failed to fetch blog:", error);

      setError(
        error.message || "Unable to load this blog."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
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
    setImageUrl("");

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleImageUrlChange = (event) => {
    const value = event.target.value;

    setImageUrl(value);

    if (image) {
      setImage(null);
    }

    setImagePreview(value);
    setError("");
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl("");
    setImagePreview("");
    setError("");
  };

  const handleImagePreviewError = () => {
    setError(
      "Unable to load this image. Please check the image URL."
    );
  };

  const getPlainTextFromHtml = (html) => {
    const div = document.createElement("div");

    div.innerHTML = html;

    return div.textContent?.trim() || "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
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

      if (!getPlainTextFromHtml(formData.content)) {
        setError("Blog content is required.");
        return;
      }

      const imageValue = image || imageUrl.trim();

      const response = await updateAdminBlog(id, {
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
        response?.message || "Blog updated successfully."
      );

      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 700);
    } catch (error) {
      console.error("Failed to update blog:", error);

      setError(
        error.message ||
          "Something went wrong while updating the blog."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C9A24B]/30 border-t-[#C9A24B]" />

            <p className="mt-4 text-sm text-[#7A828D]">
              Loading blog...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error && !formData.title) {
    return (
      <section className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="inline-flex items-center gap-2 text-xs text-[#68717D] transition-colors hover:text-[#101A2E]"
        >
          <ArrowLeft size={14} />
          Back to Blogs
        </button>

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

  return (
    <section className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(`/blogs/${id}`)}
          className="inline-flex items-center gap-2 text-xs text-[#68717D] transition-colors hover:text-[#101A2E]"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </button>

        <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
          Editorial Management
        </p>

        <h2 className="mt-2 text-2xl font-medium text-[#101A2E] md:text-3xl">
          Edit Blog
        </h2>

        <p className="mt-2 text-sm text-[#6F7782]">
          Update your travel story and publishing settings.
        </p>
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
                Update the main information for this article.
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
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Slug *
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
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
          <div>
            <h3 className="text-sm font-medium text-[#101A2E]">
              Cover Image
            </h3>

            <p className="mt-1 text-xs text-[#8A929D]">
              Upload an image or use an external image URL.
            </p>
          </div>

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
                placeholder="https://example.com/travel-image.jpg"
                className="h-11 w-full rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] pl-11 pr-4 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <p className="mt-2 text-[10px] text-[#9AA1AA]">
              Paste a publicly accessible image URL. Selecting a file will replace this URL.
            </p>
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#101A2E]/8" />

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
              Or
            </span>

            <div className="h-px flex-1 bg-[#101A2E]/8" />
          </div>

          <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#101A2E]/15 bg-[#F8F9F9] transition-colors hover:border-[#C9A24B]">
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

          {imagePreview && (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
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
                  className="h-64 w-full rounded-2xl border border-[#101A2E]/8 bg-[#F8F9F9] object-cover"
                />

                {image && (
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-[10px] text-white">
                    Uploaded image
                  </div>
                )}

                {!image && imageUrl && (
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-[10px] text-white">
                    Image URL
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
          <h3 className="text-sm font-medium text-[#101A2E]">
            Content
          </h3>

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
                className="w-full resize-y rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 py-3 text-sm text-[#101A2E] outline-none focus:border-[#C9A24B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[#4E5762]">
                Blog Content *
              </label>

              <BlogRichTextEditor
                value={formData.content}
                onChange={(content) =>
                  setFormData((previous) => ({
                    ...previous,
                    content,
                  }))
                }
              />
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
            onClick={() => navigate(`/blogs/${id}`)}
            className="h-11 rounded-xl border border-[#101A2E]/10 bg-white px-5 text-xs text-[#101A2E] transition-all hover:bg-[#F8F9F9]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#101A2E] px-6 text-xs text-white transition-all hover:bg-[#C9A24B] hover:text-[#101A2E] disabled:opacity-50"
          >
            {saving ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Save size={14} />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}