import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock3,
  Home,
  Trash2,
  Eye,
  Pencil,
  Plus,
  Tag,
  User,
  CalendarDays,
} from "lucide-react";

import {
  getAdminBlogs,
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
        "rounded-full",
        "border",
        "px-2.5 py-1",
        "text-[10px]",
        "font-medium",
        current.className,
      ].join(" ")}
    >
      {current.label}
    </span>
  );
}

function FeaturedBadge({ featured }) {
  if (!featured) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#9AA1AA]">
        <Home size={12} />
        Not featured
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#C9A24B]">
      <Home size={12} />
      Featured
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
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalBlogs: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminBlogs({
        page,
        limit: 10,
        status: statusFilter,
      });

      setBlogs(response.data || []);

      setPagination(
        response.pagination || {
          currentPage: page,
          limit: 10,
          totalBlogs: response.data?.length || 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, [statusFilter]);

  const handleCreate = () => {
    navigate("/blogs/create");
  };

  const handleView = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/blogs/${id}/edit`);
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(`delete-${blog._id}`);
      setError("");

      await deleteAdminBlog(blog._id);

      const shouldGoBack =
        blogs.length === 1 &&
        pagination.currentPage > 1;

      const nextPage = shouldGoBack
        ? pagination.currentPage - 1
        : pagination.currentPage;

      await fetchBlogs(nextPage);
    } catch (error) {
      setError(
        error.message ||
          "Unable to delete blog."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const featuredCount = blogs.filter(
    (blog) => blog.featured
  ).length;

  const handlePreviousPage = () => {
    if (
      !pagination.hasPreviousPage ||
      loading
    ) {
      return;
    }

    fetchBlogs(
      pagination.currentPage - 1
    );
  };

  const handleNextPage = () => {
    if (
      !pagination.hasNextPage ||
      loading
    ) {
      return;
    }

    fetchBlogs(
      pagination.currentPage + 1
    );
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.22em] text-[#C9A24B]">
            Editorial Management
          </p>

          <h2 className="mt-2 font-['Inter'] text-2xl font-medium tracking-tight text-[#101A2E] md:text-3xl">
            Blog
          </h2>

          <p className="mt-2 max-w-2xl font-['Inter'] text-sm leading-6 text-[#6F7782]">
            Create, publish and manage travel stories,
            guides and destination insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              fetchBlogs(
                pagination.currentPage
              )
            }
            disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#101A2E]/10 bg-white px-4 text-xs text-[#101A2E] transition-all hover:bg-[#101A2E] hover:text-white disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              strokeWidth={1.7}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#101A2E] px-4 text-xs text-white transition-all hover:bg-[#C9A24B] hover:text-[#101A2E]"
          >
            <Plus
              size={14}
              strokeWidth={1.8}
            />
            Create Blog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A828D]">
              Total
            </p>

            <FileText
              size={16}
              className="text-[#68717D]"
            />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {pagination.totalBlogs}
          </p>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A828D]">
              Published
            </p>

            <CheckCircle2
              size={16}
              className="text-emerald-500"
            />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {publishedCount}
          </p>

          <p className="mt-1 text-[10px] text-[#9AA1AA]">
            Current page
          </p>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A828D]">
              Drafts
            </p>

            <Clock3
              size={16}
              className="text-amber-500"
            />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {draftCount}
          </p>

          <p className="mt-1 text-[10px] text-[#9AA1AA]">
            Current page
          </p>
        </div>

        <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A828D]">
              Featured
            </p>

            <Home
              size={16}
              className="text-[#C9A24B]"
            />
          </div>

          <p className="mt-3 text-2xl font-medium text-[#101A2E]">
            {featuredCount}
          </p>

          <p className="mt-1 text-[10px] text-[#9AA1AA]">
            Current page
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="h-11 cursor-pointer rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] px-4 text-sm text-[#101A2E] outline-none transition-colors focus:border-[#C9A24B]"
          >
            <option value="all">
              All Status
            </option>

            <option value="published">
              Published
            </option>

            <option value="draft">
              Drafts
            </option>
          </select>

          <p className="text-xs text-[#7A828D]">
            {pagination.totalBlogs}{" "}
            {pagination.totalBlogs === 1
              ? "blog"
              : "blogs"}{" "}
            found
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              fetchBlogs(
                pagination.currentPage
              )
            }
            className="mt-2 text-xs font-medium text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white"
              >
                <div className="h-48 animate-pulse bg-[#EEF1F1]" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#EEF1F1]" />

                  <div className="h-6 w-4/5 animate-pulse rounded bg-[#EEF1F1]" />

                  <div className="h-4 w-full animate-pulse rounded bg-[#EEF1F1]" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#EEF1F1]" />

                  <div className="flex gap-2 pt-2">
                    <div className="h-9 flex-1 animate-pulse rounded-lg bg-[#EEF1F1]" />
                    <div className="h-9 w-10 animate-pulse rounded-lg bg-[#EEF1F1]" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : !error &&
        blogs.length === 0 ? (
        <div className="rounded-2xl border border-[#101A2E]/8 bg-white px-6 py-16 text-center">
          <FileText
            size={30}
            strokeWidth={1.4}
            className="mx-auto text-[#B1B7BE]"
          />

          <p className="mt-4 text-sm text-[#6F7782]">
            No blogs found.
          </p>

          <p className="mt-1 text-xs text-[#9AA1AA]">
            Create your first travel story
            to get started.
          </p>

          <button
            type="button"
            onClick={handleCreate}
            className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-[#101A2E] px-4 text-xs text-white transition-all hover:bg-[#C9A24B] hover:text-[#101A2E]"
          >
            <Plus size={13} />
            Create Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => {
            const deleteLoading =
              actionLoading ===
              `delete-${blog._id}`;

            return (
              <article
                key={blog._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B]/30 hover:shadow-[0_18px_45px_rgba(16,26,46,0.08)]"
              >
                <button
                  type="button"
                  onClick={() =>
                    handleView(blog._id)
                  }
                  className="relative block w-full overflow-hidden bg-[#101A2E]/5 text-left"
                >
                  <div className="aspect-[16/9]">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={
                          blog.title ||
                          "Blog"
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText
                          size={34}
                          strokeWidth={1.3}
                          className="text-[#9AA1AA]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                    <StatusBadge
                      status={blog.status}
                    />

                    {blog.featured && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#C9A24B] shadow-sm backdrop-blur-sm">
                        <Home size={11} />
                        Featured
                      </span>
                    )}
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Tag
                        size={12}
                        className="shrink-0 text-[#C9A24B]"
                      />

                      <span className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[#68717D]">
                        {blog.category ||
                          "Uncategorized"}
                      </span>
                    </div>

                    <FeaturedBadge
                      featured={blog.featured}
                    />
                  </div>

                  <h3 className="mt-3 line-clamp-2 font-['Inter'] text-lg font-semibold leading-7 text-[#101A2E]">
                    {blog.title ||
                      "Untitled Blog"}
                  </h3>

                  {blog.shortDescription && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#6F7782]">
                      {
                        blog.shortDescription
                      }
                    </p>
                  )}

                  <div className="mt-5 space-y-2.5 border-t border-[#101A2E]/7 pt-4">
                    <div className="flex items-center gap-2">
                      <User
                        size={13}
                        className="shrink-0 text-[#9AA1AA]"
                      />

                      <span className="truncate text-xs text-[#68717D]">
                        {blog.author ||
                          "Times India Travels"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={13}
                        className="shrink-0 text-[#9AA1AA]"
                      />

                      <span className="text-xs text-[#68717D]">
                        {formatDate(
                          blog.publishedAt ||
                            blog.createdAt
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleView(
                          blog._id
                        )
                      }
                      className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#101A2E] text-xs font-medium text-white transition-all hover:bg-[#C9A24B] hover:text-[#101A2E]"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          blog._id
                        )
                      }
                      className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#101A2E]/10 bg-white text-[#68717D] transition-all hover:border-[#101A2E] hover:bg-[#101A2E] hover:text-white"
                      title="Edit blog"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      type="button"
                      disabled={
                        deleteLoading
                      }
                      onClick={() =>
                        handleDelete(blog)
                      }
                      className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#101A2E]/10 bg-white text-[#68717D] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                      title="Delete blog"
                    >
                      {deleteLoading ? (
                        <RefreshCw
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading &&
        blogs.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-[#101A2E]/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#7A828D]">
              Showing{" "}
              <span className="font-medium text-[#101A2E]">
                {blogs.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-[#101A2E]">
                {pagination.totalBlogs}
              </span>{" "}
              blogs
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={
                  !pagination.hasPreviousPage ||
                  loading
                }
                onClick={
                  handlePreviousPage
                }
                className="h-9 rounded-lg border border-[#101A2E]/10 bg-white px-3 text-xs text-[#101A2E] transition-all hover:bg-[#101A2E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="min-w-[90px] text-center text-xs text-[#68717D]">
                Page{" "}
                <span className="font-medium text-[#101A2E]">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-[#101A2E]">
                  {pagination.totalPages ||
                    1}
                </span>
              </span>

              <button
                type="button"
                disabled={
                  !pagination.hasNextPage ||
                  loading
                }
                onClick={handleNextPage}
                className="h-9 rounded-lg border border-[#101A2E]/10 bg-white px-3 text-xs text-[#101A2E] transition-all hover:bg-[#101A2E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
    </section>
  );
}