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
} from "lucide-react";

import {
  getAdminBlogs,
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
// FEATURED BADGE
// ============================================================

function FeaturedBadge({ featured }) {
  if (!featured) {
    return (
      <span className="text-xs text-[#9AA1AA]">
        Not featured
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#C9A24B]">
      <Home size={13} />
      Featured
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
    month: "short",
    year: "numeric",
  });
}

// ============================================================
// ADMIN BLOGS
// ============================================================

export default function AdminBlogs() {
  const navigate = useNavigate();

  // ==========================================================
  // DATA
  // ==========================================================

  const [blogs, setBlogs] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalBlogs: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [statusFilter, setStatusFilter] = useState("all");

  // ==========================================================
  // FETCH BLOGS
  // ==========================================================

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

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    fetchBlogs(1);
  }, [statusFilter]);

  // ==========================================================
  // CREATE
  // ==========================================================

  const handleCreate = () => {
    navigate("/blogs/create");
  };

  // ==========================================================
  // VIEW
  // ==========================================================

  const handleView = (id) => {
    navigate(`/blogs/${id}`);
  };

  // ==========================================================
  // EDIT
  // ==========================================================

  const handleEdit = (id) => {
    navigate(`/blogs/${id}/edit`);
  };

  // ==========================================================
  // DELETE
  // ==========================================================

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

      // ------------------------------------------------------
      // If the current page only had one item and we're not
      // on the first page, move back one page.
      // ------------------------------------------------------

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

  // ==========================================================
  // COUNTS
  // ==========================================================
  //
  // NOTE:
  // The admin API is paginated, so these counts are based on
  // the current loaded page only.
  //
  // If later you want global counts, we can add a dedicated
  // dashboard stats endpoint.
  // ==========================================================

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const featuredCount = blogs.filter(
    (blog) => blog.featured
  ).length;

  // ==========================================================
  // PAGINATION
  // ==========================================================

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
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B] font-['Inter']">
            Editorial Management
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E] font-['Inter']">
            Blog
          </h2>

          <p className="mt-2 text-sm text-[#6F7782] font-['Inter']">
            Create, publish and manage travel stories,
            guides and destination insights.
          </p>
        </div>

        <div className="flex items-center gap-2">

          {/* REFRESH */}

          <button
            type="button"
            onClick={() =>
              fetchBlogs(
                pagination.currentPage
              )
            }
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all disabled:opacity-50"
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

          {/* CREATE */}

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
          >
            <Plus
              size={14}
              strokeWidth={1.8}
            />

            Create Blog
          </button>

        </div>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* TOTAL */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
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

        {/* PUBLISHED */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
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

        {/* DRAFT */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
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

        {/* FEATURED */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7A828D]">
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

      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-3">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] text-sm text-[#101A2E] outline-none focus:border-[#C9A24B] cursor-pointer"
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

          </div>

          <p className="text-xs text-[#7A828D]">
            {pagination.totalBlogs}{" "}
            {pagination.totalBlogs === 1
              ? "blog"
              : "blogs"}{" "}
            found
          </p>

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

      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead>

              <tr className="border-b border-[#101A2E]/8 bg-[#F8F9F9]">

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Blog
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Category
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Author
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Status
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Published
                </th>

                <th className="text-left px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Homepage
                </th>

                <th className="text-right px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-[#7A828D] font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {/* ==================================================
                  LOADING
              ================================================== */}

              {loading && (
                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-7 h-7 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

                      <p className="mt-4 text-sm text-[#7A828D]">
                        Loading blogs...
                      </p>

                    </div>

                  </td>

                </tr>
              )}

              {/* ==================================================
                  EMPTY
              ================================================== */}

              {!loading &&
                !error &&
                blogs.length === 0 && (
                  <tr>

                    <td
                      colSpan="7"
                      className="px-5 py-16 text-center"
                    >

                      <FileText
                        size={27}
                        strokeWidth={1.4}
                        className="mx-auto text-[#B1B7BE]"
                      />

                      <p className="mt-4 text-sm text-[#6F7782]">
                        No blogs found.
                      </p>

                      <p className="text-xs text-[#9AA1AA] mt-1">
                        Create your first travel story
                        to get started.
                      </p>

                      <button
                        type="button"
                        onClick={handleCreate}
                        className="mt-5 inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
                      >
                        <Plus size={13} />

                        Create Blog
                      </button>

                    </td>

                  </tr>
                )}

              {/* ==================================================
                  BLOGS
              ================================================== */}

              {!loading &&
                blogs.map((blog) => {

                  const deleteLoading =
                    actionLoading ===
                    `delete-${blog._id}`;

                  return (
                    <tr
                      key={blog._id}
                      className="border-b border-[#101A2E]/6 last:border-b-0 hover:bg-[#FAFBFB] transition-colors"
                    >

                      {/* BLOG */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-16 h-11 rounded-lg object-cover border border-[#101A2E]/8 shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-11 rounded-lg bg-[#101A2E]/5 border border-[#101A2E]/8 flex items-center justify-center shrink-0">
                              <FileText
                                size={16}
                                className="text-[#68717D]"
                              />
                            </div>
                          )}

                          <div className="min-w-0">

                            <p className="text-sm font-medium text-[#101A2E] line-clamp-1">
                              {blog.title || "Untitled Blog"}
                            </p>

                            <p className="mt-1 text-[11px] text-[#9AA1AA] line-clamp-1">
                              /{blog.slug || "—"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1.5">

                          <Tag
                            size={12}
                            className="text-[#9AA1AA]"
                          />

                          <span className="text-xs text-[#68717D]">
                            {blog.category ||
                              "Uncategorized"}
                          </span>

                        </div>

                      </td>

                      {/* AUTHOR */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-1.5">

                          <User
                            size={12}
                            className="text-[#9AA1AA]"
                          />

                          <span className="text-xs text-[#68717D]">
                            {blog.author ||
                              "Times India Travels"}
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={blog.status}
                        />

                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4">

                        <span className="text-xs text-[#68717D]">
                          {formatDate(
                            blog.publishedAt
                          )}
                        </span>

                      </td>

                      {/* HOMEPAGE */}

                      <td className="px-5 py-4">

                        <FeaturedBadge
                          featured={blog.featured}
                        />

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              handleView(
                                blog._id
                              )
                            }
                            className="w-8 h-8 rounded-lg border border-[#101A2E]/10 text-[#68717D] hover:bg-[#101A2E] hover:text-white flex items-center justify-center transition-all"
                            title="View blog"
                          >
                            <Eye size={14} />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                blog._id
                              )
                            }
                            className="w-8 h-8 rounded-lg border border-[#101A2E]/10 text-[#68717D] hover:bg-[#101A2E] hover:text-white flex items-center justify-center transition-all"
                            title="Edit blog"
                          >
                            <Pencil size={14} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={
                              deleteLoading
                            }
                            onClick={() =>
                              handleDelete(blog)
                            }
                            className="w-8 h-8 rounded-lg border border-[#101A2E]/10 text-[#68717D] hover:bg-red-50 hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all disabled:opacity-40"
                            title="Delete blog"
                          >
                            {deleteLoading ? (
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={14}
                              />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

            </tbody>

          </table>

        </div>

        {/* ======================================================
            PAGINATION FOOTER
        ====================================================== */}

        {!loading &&
          blogs.length > 0 && (
            <div className="border-t border-[#101A2E]/8 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

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
                  className="h-9 px-3 rounded-lg border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="min-w-[80px] text-center text-xs text-[#68717D]">
                  Page{" "}
                  <span className="font-medium text-[#101A2E]">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#101A2E]">
                    {pagination.totalPages || 1}
                  </span>
                </span>

                <button
                  type="button"
                  disabled={
                    !pagination.hasNextPage ||
                    loading
                  }
                  onClick={
                    handleNextPage
                  }
                  className="h-9 px-3 rounded-lg border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>

              </div>

            </div>
          )}

      </div>

    </section>
  );
}
