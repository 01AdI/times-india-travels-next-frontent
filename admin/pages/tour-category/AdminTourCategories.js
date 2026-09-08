import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  MapPin,
  Package,
  Image as ImageIcon,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  getAdminTourCategories,
  deleteAdminTourCategory,
} from "../../services/adminApi";

export default function AdminTourCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    category: null,
  });

  const [deleting, setDeleting] = useState(false);

  // --------------------------------------------------
  // Fetch categories
  // --------------------------------------------------

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminTourCategories();

      const receivedCategories = Array.isArray(
        response?.categories
      )
        ? response.categories
        : [];

      setCategories(receivedCategories);
    } catch (err) {
      console.error(
        "Failed to fetch tour categories:",
        err
      );

      setError(
        err?.message ||
          "Unable to load tour categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  const getArrayLength = (value) => {
    return Array.isArray(value) ? value.length : 0;
  };

  const getPackageCount = (category) => {
    return getArrayLength(category?.packages);
  };

  const getDestinationCount = (category) => {
    return getArrayLength(
      category?.destinations
    );
  };

  const getGalleryCount = (category) => {
    return getArrayLength(
      category?.destinations_gallery
    );
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const openDeleteModal = (category) => {
    if (deleting) return;

    setError("");

    setDeleteModal({
      open: true,
      category,
    });
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModal({
      open: false,
      category: null,
    });
  };

  const handleDelete = async () => {
    const category = deleteModal.category;

    if (!category?.id || deleting) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteAdminTourCategory(category.id);

      setCategories((prev) =>
        prev.filter(
          (item) => item.id !== category.id
        )
      );

      setDeleteModal({
        open: false,
        category: null,
      });
    } catch (err) {
      console.error(
        "Failed to delete tour category:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete tour category."
      );

      setDeleteModal({
        open: false,
        category: null,
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      const name =
        category?.name?.toLowerCase() || "";

      const id =
        category?.id?.toLowerCase() || "";

      const tagline =
        category?.tagline?.toLowerCase() || "";

      const description =
        category?.description?.toLowerCase() || "";

      return (
        name.includes(query) ||
        id.includes(query) ||
        tagline.includes(query) ||
        description.includes(query)
      );
    });
  }, [categories, search]);

  const totalPackages = useMemo(() => {
    return categories.reduce(
      (total, category) =>
        total + getPackageCount(category),
      0
    );
  }, [categories]);

  const totalDestinations = useMemo(() => {
    return categories.reduce(
      (total, category) =>
        total + getDestinationCount(category),
      0
    );
  }, [categories]);

  const totalGalleryImages = useMemo(() => {
    return categories.reduce(
      (total, category) =>
        total + getGalleryCount(category),
      0
    );
  }, [categories]);


  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span className="text-sm font-medium">
            Loading tour categories...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Content Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Tour Categories
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage tour categories, destinations,
            galleries and associated tour packages.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/tour-categories/create"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
        >
          <Plus size={17} />

          Create Category
        </button>

      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1 wrap-break-word">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 rounded-md p-1 text-red-400 transition hover:bg-red-100 hover:text-red-700"
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>

        </div>
      )}

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

        <Search
          size={18}
          className="shrink-0 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by name, ID, tagline or description..."
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            Clear
          </button>
        )}

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Categories */}

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Categories
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {categories.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
              <MapPin
                size={17}
                className="text-orange-600"
              />
            </div>

          </div>

        </div>

        {/* Packages */}

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Packages
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalPackages}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <Package
                size={17}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Destinations */}

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Destinations
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalDestinations}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
              <MapPin
                size={17}
                className="text-teal-600"
              />
            </div>

          </div>

        </div>

        {/* Gallery */}

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Gallery Images
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalGalleryImages}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
              <ImageIcon
                size={17}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>

      </div>

      {categories.length > 0 && (
        <div className="flex items-center justify-between">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">
              {categories.length}
            </span>{" "}
            categories
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Clear search
            </button>
          )}

        </div>
      )}

      {filteredCategories.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            {search ? (
              <Search
                size={22}
                className="text-slate-500"
              />
            ) : (
              <MapPin
                size={22}
                className="text-slate-500"
              />
            )}
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            {search
              ? "No categories found"
              : "No tour categories yet"}
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            {search
              ? "Try changing your search query or clear the search."
              : "Create your first tour category to get started."}
          </p>

          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <X size={16} />

              Clear Search
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/tour-categories/create"
                )
              }
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={16} />

              Create Category
            </button>
          )}

        </div>
      )}

      {filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {filteredCategories.map(
            (category) => {

              const packageCount =
                getPackageCount(category);

              const destinationCount =
                getDestinationCount(category);

              const galleryCount =
                getGalleryCount(category);

              return (
                <div
                  key={category.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >

                  <div className="relative h-52 overflow-hidden bg-slate-100">

                    {category.heroImage ? (
                      <img
                        src={category.heroImage}
                        alt={
                          category.name ||
                          "Tour category"
                        }
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon
                          size={34}
                          className="text-slate-300"
                        />
                      </div>
                    )}

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

                    {/* Category information */}

                    <div className="absolute inset-x-0 bottom-0 p-5">

                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                        {category.id ||
                          "category"}
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-white">
                        {category.name ||
                          "Untitled Category"}
                      </h2>

                    </div>

                  </div>

                  <div className="p-5">

                    <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
                      {category.tagline ||
                        category.description ||
                        "No description available."}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-3">

                      {/* Packages */}

                      <div className="rounded-lg bg-slate-50 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">

                          <Package size={15} />

                          <span className="text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                            Packages
                          </span>

                        </div>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {packageCount}
                        </p>

                      </div>

                      {/* Destinations */}

                      <div className="rounded-lg bg-slate-50 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">

                          <MapPin size={15} />

                          <span className="text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                            Destinations
                          </span>

                        </div>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {destinationCount}
                        </p>

                      </div>

                      {/* Gallery */}

                      <div className="rounded-lg bg-slate-50 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">

                          <ImageIcon size={15} />

                          <span className="text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
                            Gallery
                          </span>

                        </div>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {galleryCount}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">

                      {/* View */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/tour-categories/${category.id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Eye size={15} />

                        <span>View</span>
                      </button>

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/tour-categories/${category.id}/edit`
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Pencil size={15} />

                        <span>Edit</span>
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(category)
                        }
                        disabled={deleting}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={15} />

                        <span>Delete</span>
                      </button>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {deleteModal.open &&
        deleteModal.category && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDeleteModal();
              }
            }}
          >

            <div
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-category-title"
            >

              {/* Icon */}

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <Trash2
                  size={20}
                  className="text-red-600"
                />
              </div>

              {/* Heading */}

              <h2
                id="delete-category-title"
                className="mt-4 text-lg font-bold text-slate-900"
              >
                Delete tour category?
              </h2>

              {/* Description */}

              <p className="mt-2 text-sm leading-6 text-slate-600">
                You are about to delete{" "}
                <span className="font-semibold text-slate-900">
                  {deleteModal.category.name ||
                    deleteModal.category.id}
                </span>
                .
              </p>

              {/* Warning */}

              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3">

                <p className="text-xs leading-5 text-red-700">
                  This category cannot be deleted if
                  tour packages are still associated
                  with it.
                </p>

                {getPackageCount(
                  deleteModal.category
                ) > 0 && (
                  <p className="mt-2 text-xs font-semibold text-red-700">
                    This category currently has{" "}
                    {getPackageCount(
                      deleteModal.category
                    )}{" "}
                    associated package
                    {getPackageCount(
                      deleteModal.category
                    ) === 1
                      ? ""
                      : "s"}
                    .
                  </p>
                )}

              </div>

              {/* Actions */}

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">

                <button
                  type="button"
                  disabled={deleting}
                  onClick={closeDeleteModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {deleting && (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {deleting
                    ? "Deleting..."
                    : "Delete Category"}

                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}