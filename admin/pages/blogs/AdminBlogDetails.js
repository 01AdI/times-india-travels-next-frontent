import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  RefreshCw,
  FileText,
  CalendarDays,
  User,
  Tag,
  Home,
  Clock3,
} from "lucide-react";

import {
  getAdminBlog,
  deleteAdminBlog,
} from "../../services/adminApi";

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  const config = {
    published: {
      label: "Published",
      className:
        "bg-emerald-50 text-emerald-600 border-emerald-100",
    },

    draft: {
      label: "Draft",
      className:
        "bg-amber-50 text-amber-600 border-amber-100",
    },
  };

  const current = config[status] || {
    label: status || "Unknown",
    className:
      "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <span
      className={[
        "inline-flex items-center",
        "px-2.5 py-1",
        "rounded-full",
        "border",
        "text-[10px]",
        "font-medium",
        current.className,
      ].join(" ")}
    >
      {current.label}
    </span>
  );
}

// ============================================================
// DATE FORMATTER
// ============================================================

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
    month: "long",
    year: "numeric",
  });
}

// ============================================================
// ADMIN BLOG DETAILS
// ============================================================

export default function AdminBlogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================================================
  // DATA
  // ==========================================================

  const [blog, setBlog] = useState(null);

  // ==========================================================
  // UI
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ==========================================================
  // FETCH
  // ==========================================================

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminBlog(id);

      setBlog(response.data || null);
    } catch (error) {
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
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!blog) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(true);
      setError("");

      await deleteAdminBlog(blog._id);

      navigate("/blogs");
    } catch (error) {
      setError(
        error.message ||
          "Unable to delete this blog."
      );
    } finally {
      setDeleteLoading(false);
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
  // ERROR / NOT FOUND
  // ==========================================================

  if (error || !blog) {
    return (
      <section className="space-y-6">

        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="inline-flex items-center gap-2 text-xs text-[#68717D] hover:text-[#101A2E]"
        >
          <ArrowLeft size={14} />
          Back to Blogs
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8">

          <p className="text-sm text-red-600">
            {error || "Blog not found."}
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

          <div className="flex flex-wrap items-center gap-3 mt-2">

            <h2 className="text-2xl md:text-3xl font-medium text-[#101A2E]">
              {blog.title}
            </h2>

            <StatusBadge status={blog.status} />

          </div>

          <p className="mt-2 text-sm text-[#6F7782]">
            Blog details and editorial information.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() =>
              navigate(`/blogs/${blog._id}/edit`)
            }
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            disabled={deleteLoading}
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-red-100 bg-white text-xs text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
          >
            {deleteLoading ? (
              <RefreshCw
                size={14}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={14} />
            )}

            Delete
          </button>

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">

          <p className="text-sm text-red-600">
            {error}
          </p>

        </div>
      )}

      {/* ======================================================
          HERO IMAGE
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[280px] md:h-[380px] object-cover"
          />
        ) : (
          <div className="w-full h-[280px] md:h-[380px] bg-[#F8F9F9] flex items-center justify-center">

            <FileText
              size={40}
              strokeWidth={1.3}
              className="text-[#B1B7BE]"
            />

          </div>
        )}

      </div>

      {/* ======================================================
          META
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <User
              size={15}
              className="text-[#9AA1AA]"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Author
            </p>

          </div>

          <p className="mt-3 text-sm text-[#101A2E]">
            {blog.author || "Times India Travels"}
          </p>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <Tag
              size={15}
              className="text-[#9AA1AA]"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Category
            </p>

          </div>

          <p className="mt-3 text-sm text-[#101A2E]">
            {blog.category || "Uncategorized"}
          </p>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <CalendarDays
              size={15}
              className="text-[#9AA1AA]"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Published
            </p>

          </div>

          <p className="mt-3 text-sm text-[#101A2E]">
            {formatDate(blog.publishedAt)}
          </p>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <Clock3
              size={15}
              className="text-[#9AA1AA]"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Created
            </p>

          </div>

          <p className="mt-3 text-sm text-[#101A2E]">
            {formatDate(blog.createdAt)}
          </p>

        </div>

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <Home
              size={15}
              className="text-[#C9A24B]"
            />

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Homepage
            </p>

          </div>

          <p
            className={
              blog.featured
                ? "mt-3 text-sm text-[#C9A24B]"
                : "mt-3 text-sm text-[#7A828D]"
            }
          >
            {blog.featured
              ? "Featured"
              : "Not featured"}
          </p>

        </div>

      </div>

      {/* ======================================================
          ARTICLE
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-6">

        {/* ARTICLE */}

        <article className="bg-white border border-[#101A2E]/8 rounded-2xl p-6 md:p-8">

          <p className="text-[10px] uppercase tracking-[0.18em] text-[#C9A24B]">
            {blog.category || "Travel"}
          </p>

          <h1 className="mt-3 text-2xl md:text-4xl font-medium leading-tight text-[#101A2E]">
            {blog.title}
          </h1>

          <p className="mt-5 text-base leading-7 text-[#68717D]">
            {blog.shortDescription}
          </p>

          <div className="my-8 h-px bg-[#101A2E]/8" />

          <div className="whitespace-pre-wrap text-sm md:text-base leading-7 text-[#4E5762]">
            {blog.content}
          </div>

        </article>

        {/* SIDEBAR */}

        <aside className="space-y-5">

          {/* SLUG */}

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              URL Slug
            </p>

            <p className="mt-3 break-all text-xs leading-5 text-[#68717D]">
              /{blog.slug}
            </p>

          </div>

          {/* TAGS */}

          <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Tags
            </p>

            {blog.tags?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">

                {blog.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-2.5 py-1 rounded-full bg-[#F8F9F9] border border-[#101A2E]/8 text-[10px] text-[#68717D]"
                  >
                    {tag}
                  </span>
                ))}

              </div>
            ) : (
              <p className="mt-3 text-xs text-[#9AA1AA]">
                No tags added.
              </p>
            )}

          </div>

        </aside>

      </div>

    </section>
  );
}