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

function BlogContent({ content }) {
  if (!content) {
    return (
      <p className="text-sm text-[#9AA1AA]">
        No content available.
      </p>
    );
  }

  return (
    <div
      className="
        blog-content
        font-['Inter']
        text-sm
        leading-7
        text-[#4E5762]
        md:text-base
        md:leading-8

        [&_p]:mb-6
        [&_p:last-child]:mb-0

        [&_h1]:mt-10
        [&_h1]:mb-5
        [&_h1]:font-['Fraunces']
        [&_h1]:text-3xl
        [&_h1]:font-medium
        [&_h1]:leading-tight
        [&_h1]:text-[#101A2E]
        md:[&_h1]:text-4xl

        [&_h2]:mt-10
        [&_h2]:mb-5
        [&_h2]:font-['Fraunces']
        [&_h2]:text-2xl
        [&_h2]:font-medium
        [&_h2]:leading-tight
        [&_h2]:text-[#101A2E]
        md:[&_h2]:text-3xl

        [&_h3]:mt-8
        [&_h3]:mb-4
        [&_h3]:font-['Fraunces']
        [&_h3]:text-xl
        [&_h3]:font-medium
        [&_h3]:leading-tight
        [&_h3]:text-[#101A2E]
        md:[&_h3]:text-2xl

        [&_strong]:font-bold
        [&_strong]:text-[#101A2E]

        [&_em]:italic

        [&_u]:underline
        [&_u]:underline-offset-4

        [&_ul]:my-6
        [&_ul]:list-disc
        [&_ul]:pl-6

        [&_ol]:my-6
        [&_ol]:list-decimal
        [&_ol]:pl-6

        [&_li]:my-2
        [&_li]:pl-1

        [&_blockquote]:my-8
        [&_blockquote]:border-l-4
        [&_blockquote]:border-[#C9A24B]
        [&_blockquote]:bg-[#F8F9F9]
        [&_blockquote]:px-5
        [&_blockquote]:py-4
        [&_blockquote]:font-['Fraunces']
        [&_blockquote]:text-lg
        [&_blockquote]:italic
        [&_blockquote]:leading-7
        [&_blockquote]:text-[#101A2E]

        [&_a]:text-[#124D56]
        [&_a]:underline
        [&_a]:decoration-[#C9A24B]
        [&_a]:underline-offset-4
        [&_a]:transition-colors
        [&_a:hover]:text-[#C9A24B]

        [&_mark]:rounded
        [&_mark]:bg-yellow-200
        [&_mark]:px-1

        [&_hr]:my-10
        [&_hr]:border-0
        [&_hr]:border-t
        [&_hr]:border-[#101A2E]/10

        [&_img]:my-8
        [&_img]:block
        [&_img]:h-auto
        [&_img]:w-full
        [&_img]:rounded-xl
        [&_img]:border
        [&_img]:border-[#101A2E]/8
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default function AdminBlogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

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

  if (error || !blog) {
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

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-medium text-[#101A2E] md:text-3xl">
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
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#101A2E]/10 bg-white px-4 text-xs text-[#101A2E] transition-all hover:bg-[#101A2E] hover:text-white"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            type="button"
            disabled={deleteLoading}
            onClick={handleDelete}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-100 bg-white px-4 text-xs text-red-500 transition-all hover:bg-red-50 disabled:opacity-50"
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

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="h-[280px] w-full object-cover md:h-[380px]"
          />
        ) : (
          <div className="flex h-[280px] w-full items-center justify-center bg-[#F8F9F9] md:h-[380px]">
            <FileText
              size={40}
              strokeWidth={1.3}
              className="text-[#B1B7BE]"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
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

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
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

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
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

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
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

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="rounded-2xl border border-[#101A2E]/8 bg-white p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#C9A24B]">
            {blog.category || "Travel"}
          </p>

          <h1 className="mt-3 text-2xl font-medium leading-tight text-[#101A2E] md:text-4xl">
            {blog.title}
          </h1>

          {blog.shortDescription && (
            <p className="mt-5 text-base leading-7 text-[#68717D]">
              {blog.shortDescription}
            </p>
          )}

          <div className="my-8 h-px bg-[#101A2E]/8" />

          <BlogContent content={blog.content} />
        </article>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              URL Slug
            </p>

            <p className="mt-3 break-all text-xs leading-5 text-[#68717D]">
              /{blog.slug}
            </p>
          </div>

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
              Tags
            </p>

            {blog.tags?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full border border-[#101A2E]/8 bg-[#F8F9F9] px-2.5 py-1 text-[10px] text-[#68717D]"
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