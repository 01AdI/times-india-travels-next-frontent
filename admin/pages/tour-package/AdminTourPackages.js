import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  AlertCircle,
  PackageOpen,
  X,
  Heart,
  Star,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import {
  useNavigate,
  useSearchParams,
} from "react-router";

import {
  getAdminTourPackages,
  deleteAdminTourPackage,
  getAdminTourCategories,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";

const DEFAULT_PAGINATION = {
  currentPage: 1,
  limit: 20,
  totalPackages: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default function AdminTourPackages() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialPage = Math.max(
    Number(searchParams.get("page")) || 1,
    1
  );

  const initialSearch =
    searchParams.get("search") || "";

  const initialCategory =
    searchParams.get("categorySlug") || "";

  const initialSpecial =
    searchParams.get("specialPackage") === "true";

  const initialLoved =
    searchParams.get("mostLoved") === "true";

  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] =
    useState(initialSearch);

  const [debouncedSearch, setDebouncedSearch] =
    useState(initialSearch);

  const [categorySlug, setCategorySlug] =
    useState(initialCategory);

  const [specialPackage, setSpecialPackage] =
    useState(initialSpecial);

  const [mostLoved, setMostLoved] =
    useState(initialLoved);

  const [page, setPage] =
    useState(initialPage);

  const [pagination, setPagination] = useState(
    DEFAULT_PAGINATION
  );

  const limit = 20;

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    package: null,
  });

  const updateUrl = ({
    nextPage = page,
    nextSearch = search,
    nextCategory = categorySlug,
    nextSpecial = specialPackage,
    nextLoved = mostLoved,
  } = {}) => {
    const params = new URLSearchParams();

    if (nextPage > 1) {
      params.set(
        "page",
        String(nextPage)
      );
    }

    if (nextSearch.trim()) {
      params.set(
        "search",
        nextSearch.trim()
      );
    }

    if (nextCategory) {
      params.set(
        "categorySlug",
        nextCategory
      );
    }

    if (nextSpecial) {
      params.set(
        "specialPackage",
        "true"
      );
    }

    if (nextLoved) {
      params.set(
        "mostLoved",
        "true"
      );
    }

    setSearchParams(params);
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminTourPackages({
          page,
          limit,
          search: debouncedSearch,
          categorySlug,
          specialPackage:
            specialPackage
              ? true
              : undefined,
          mostLoved:
            mostLoved
              ? true
              : undefined,
        });

      const nextPackages =
        Array.isArray(response?.packages)
          ? response.packages
          : [];

      setPackages(nextPackages);

      setPagination(
        response?.pagination || {
          ...DEFAULT_PAGINATION,
          currentPage: page,
          limit,
        }
      );
    } catch (error) {
      setPackages([]);

      setError(
        error?.message ||
          "Unable to load tour packages."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response =
        await getAdminTourCategories();

      const list =
        response?.categories ||
        response?.data ||
        response ||
        [];

      setCategories(
        Array.isArray(list) ? list : []
      );
    } catch (error) {
      setError(
        error?.message ||
          "Unable to load tour categories."
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(
        search.trim()
      );
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchPackages();
  }, [
    page,
    categorySlug,
    specialPackage,
    mostLoved,
    debouncedSearch,
  ]);

  useEffect(() => {
    const currentSearch =
      searchParams.get("search") || "";

    if (
      debouncedSearch !== currentSearch
    ) {
      updateUrl({
        nextPage: page,
        nextSearch: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategorySlug(value);
    setPage(1);

    updateUrl({
      nextPage: 1,
      nextCategory: value,
    });
  };

  const handleSpecialPackageChange = (
    event
  ) => {
    const value = event.target.checked;

    setSpecialPackage(value);
    setPage(1);

    updateUrl({
      nextPage: 1,
      nextSpecial: value,
    });
  };

  const handleMostLovedChange = (event) => {
    const value = event.target.checked;

    setMostLoved(value);
    setPage(1);

    updateUrl({
      nextPage: 1,
      nextLoved: value,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategorySlug("");
    setSpecialPackage(false);
    setMostLoved(false);
    setPage(1);

    setSearchParams({});
  };

  const handlePreviousPage = () => {
    if (!pagination.hasPreviousPage) {
      return;
    }

    const nextPage = Math.max(
      page - 1,
      1
    );

    setPage(nextPage);

    updateUrl({
      nextPage,
    });
  };

  const handleNextPage = () => {
    if (!pagination.hasNextPage) {
      return;
    }

    const nextPage = page + 1;

    setPage(nextPage);

    updateUrl({
      nextPage,
    });
  };

  const handleDelete = async () => {
    const packageId =
      deleteModal.package?.id;

    if (!packageId) {
      setError(
        "Unable to identify the tour package."
      );
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteAdminTourPackage(
        packageId
      );

      setDeleteModal({
        open: false,
        package: null,
      });

      await fetchPackages();
    } catch (error) {
      setError(
        error?.message ||
          "Unable to delete tour package."
      );
    } finally {
      setDeleting(false);
    }
  };

  const getRoute = (tourPackage) => {
    if (
      Array.isArray(tourPackage?.route) &&
      tourPackage.route.length > 0
    ) {
      return tourPackage.route.join(" → ");
    }

    return "Route not specified";
  };

  const getDuration = (tourPackage) => {
    const duration =
      tourPackage?.duration;

    if (!duration) {
      return "Duration not specified";
    }

    if (
      typeof duration.label === "string" &&
      duration.label.trim()
    ) {
      return duration.label;
    }

    if (
      typeof duration.days === "number" &&
      typeof duration.nights === "number"
    ) {
      return `${duration.days} ${
        duration.days === 1
          ? "Day"
          : "Days"
      } / ${duration.nights} ${
        duration.nights === 1
          ? "Night"
          : "Nights"
      }`;
    }

    return "Duration not specified";
  };

  const getImage = (tourPackage) => {
    return (
      tourPackage?.heroImage ||
      tourPackage?.thumbnail ||
      null
    );
  };

  const getCategoryName = (
    categorySlug
  ) => {
    if (!categorySlug) {
      return "Uncategorized";
    }

    const category = categories.find(
      (item) =>
        item?.id === categorySlug
    );

    return (
      category?.name ||
      categorySlug
    );
  };

  const openPackage = (packageId) => {
    navigate(
      `/tour-packages/${packageId}`
    );
  };

  const editPackage = (packageId) => {
    navigate(
      `/tour-packages/${packageId}/edit`
    );
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }

    setDeleteModal({
      open: false,
      package: null,
    });
  };

  const hasActiveFilters =
    Boolean(search.trim()) ||
    Boolean(categorySlug) ||
    specialPackage ||
    mostLoved;

  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#F5F7F6",
      }}
    >
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <PackageOpen
              size={18}
              style={{ color: GOLD }}
            />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#101A2E]/50">
              Content Management
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#101A2E] sm:text-3xl">
            Tour Packages
          </h1>

          <p className="mt-1 text-sm text-[#101A2E]/55">
            Manage your tour packages,
            itineraries, routes and package
            information.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/tour-packages/create"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[#F4EFE4] shadow-sm transition-all duration-300 hover:text-[#101A2E]"
          style={{
            backgroundColor: NAVY,
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor =
              GOLD;
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor =
              NAVY;
          }}
        >
          <Plus size={18} />
          Create Tour Package
        </button>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-500 transition hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-[#101A2E]/8 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#101A2E]/35"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search all packages by name, ID, category or route..."
                className="w-full rounded-xl border border-[#101A2E]/12 bg-[#F5F7F6] py-2.5 pl-10 pr-4 text-sm text-[#101A2E] outline-none transition-all duration-300 placeholder:text-[#101A2E]/35 focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B]"
              />
            </div>

            <select
              value={categorySlug}
              onChange={
                handleCategoryChange
              }
              disabled={
                categoriesLoading
              }
              className="rounded-xl border border-[#101A2E]/12 bg-[#F5F7F6] px-4 py-2.5 text-sm text-[#101A2E] outline-none transition-all duration-300 focus:border-[#C9A24B] focus:bg-white focus:ring-1 focus:ring-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60 lg:min-w-[220px]"
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "All Categories"}
              </option>

              {!categoriesLoading &&
                categories.map(
                  (category) => (
                    <option
                      key={
                        category._id ||
                        category.id
                      }
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#101A2E]/10 bg-white px-4 py-2.5 text-sm font-medium text-[#101A2E]/65 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <RotateCcw size={15} />
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#101A2E]/8 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#101A2E]/45">
              <SlidersHorizontal
                size={14}
              />
              Filters
            </div>

            <label
              className={[
                "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                specialPackage
                  ? "border-[#C9A24B]/40 bg-[#C9A24B]/10 text-[#8D6D24]"
                  : "border-[#101A2E]/10 bg-white text-[#101A2E]/60 hover:border-[#C9A24B]/30",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={specialPackage}
                onChange={
                  handleSpecialPackageChange
                }
                className="sr-only"
              />

              <Star
                size={14}
                className={
                  specialPackage
                    ? "fill-current"
                    : ""
                }
              />

              Special Package
            </label>

            <label
              className={[
                "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                mostLoved
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-[#101A2E]/10 bg-white text-[#101A2E]/60 hover:border-rose-200",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={mostLoved}
                onChange={
                  handleMostLovedChange
                }
                className="sr-only"
              />

              <Heart
                size={14}
                className={
                  mostLoved
                    ? "fill-current"
                    : ""
                }
              />

              Most Loved
            </label>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#101A2E]/55">
            Showing{" "}
            <span className="font-semibold text-[#101A2E]">
              {packages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#101A2E]">
              {pagination.totalPackages}
            </span>{" "}
            packages
          </p>

          <p className="text-sm text-[#101A2E]/55">
            Page{" "}
            <span className="font-semibold text-[#101A2E]">
              {pagination.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#101A2E]">
              {pagination.totalPages ||
                1}
            </span>
          </p>
        </div>
      )}

      {loading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white"
              >
                <div className="h-48 animate-pulse bg-[#101A2E]/8" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#101A2E]/8" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#101A2E]/8" />

                  <div className="h-4 w-full animate-pulse rounded bg-[#101A2E]/8" />

                  <div className="h-10 w-full animate-pulse rounded bg-[#101A2E]/8" />
                </div>
              </div>
            )
          )}
        </div>
      )}

      {!loading &&
        packages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#101A2E]/15 bg-white px-6 py-16 text-center">
            <PackageOpen
              size={42}
              className="mx-auto mb-4 text-[#101A2E]/20"
            />

            <h2 className="text-lg font-semibold text-[#101A2E]">
              No tour packages found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#101A2E]/50">
              {hasActiveFilters
                ? "No packages match your current search or filters."
                : "Create your first tour package to get started."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#C9A24B] hover:text-[#101A2E]"
              >
                <RotateCcw size={16} />
                Clear Filters
              </button>
            )}
          </div>
        )}

      {!loading &&
        packages.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map(
              (tourPackage) => {
                const packageId =
                  tourPackage?.id;

                const image =
                  getImage(
                    tourPackage
                  );

                const categoryName =
                  getCategoryName(
                    tourPackage?.categorySlug
                  );

                const isSpecial =
                  Boolean(
                    tourPackage?.specialPackage
                  );

                const isMostLoved =
                  Boolean(
                    tourPackage?.mostLoved
                  );

                return (
                  <article
                    key={packageId}
                    className="group overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#101A2E]/5">
                      {image ? (
                        <img
                          src={image}
                          alt={
                            tourPackage?.name ||
                            "Tour package"
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(
                            event
                          ) => {
                            event.currentTarget.style.display =
                              "none";

                            event.currentTarget.parentElement
                              ?.querySelector(
                                "[data-image-fallback]"
                              )
                              ?.classList.remove(
                                "hidden"
                              );
                          }}
                        />
                      ) : null}

                      <div
                        data-image-fallback
                        className={`absolute inset-0 flex items-center justify-center ${
                          image
                            ? "hidden"
                            : ""
                        }`}
                      >
                        <PackageOpen
                          size={40}
                          className="text-[#101A2E]/20"
                        />
                      </div>

                      <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#101A2E] shadow-sm">
                        {categoryName}
                      </div>

                      <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
                        {isSpecial && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A24B] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#101A2E] shadow-sm">
                            <Star
                              size={11}
                              className="fill-current"
                            />
                            Special
                          </span>
                        )}

                        {isMostLoved && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-rose-600 shadow-sm">
                            <Heart
                              size={11}
                              className="fill-current"
                            />
                            Most Loved
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-[#101A2E]">
                        {tourPackage?.name ||
                          "Untitled Package"}
                      </h2>

                      <p className="mt-1 truncate text-xs text-[#101A2E]/35">
                        ID:{" "}
                        {packageId ||
                          "N/A"}
                      </p>

                      <div className="mt-4 space-y-2.5">
                        <div className="flex items-start gap-2 text-sm text-[#101A2E]/55">
                          <Clock
                            size={16}
                            className="mt-0.5 shrink-0"
                          />

                          <span className="line-clamp-1">
                            {getDuration(
                              tourPackage
                            )}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-[#101A2E]/55">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0"
                          />

                          <span className="line-clamp-2">
                            {getRoute(
                              tourPackage
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#101A2E]/8 pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            openPackage(
                              packageId
                            )
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#101A2E]/12 px-2 py-2 text-xs font-semibold text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.04]"
                        >
                          <Eye
                            size={15}
                          />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editPackage(
                              packageId
                            )
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#101A2E]/12 px-2 py-2 text-xs font-semibold text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.04]"
                        >
                          <Pencil
                            size={15}
                          />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              package:
                                tourPackage,
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-2 py-2 text-xs font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
                        >
                          <Trash2
                            size={15}
                          />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}

      {!loading &&
        pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#101A2E]/8 bg-white px-4 py-3 shadow-sm">
            <button
              type="button"
              disabled={
                !pagination.hasPreviousPage
              }
              onClick={
                handlePreviousPage
              }
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft
                size={17}
              />
              Previous
            </button>

            <span className="text-sm text-[#101A2E]/55">
              Page{" "}
              <span className="font-semibold text-[#101A2E]">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#101A2E]">
                {pagination.totalPages}
              </span>
            </span>

            <button
              type="button"
              disabled={
                !pagination.hasNextPage
              }
              onClick={
                handleNextPage
              }
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight
                size={17}
              />
            </button>
          </div>
        )}

      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101A2E]/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Trash2
                    size={20}
                  />
                </div>

                <h2 className="text-lg font-semibold text-[#101A2E]">
                  Delete tour package?
                </h2>

                <p className="mt-1 text-sm text-[#101A2E]/55">
                  This action cannot be
                  undone.
                </p>
              </div>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  closeDeleteModal
                }
                className="rounded-lg p-2 text-[#101A2E]/35 transition-colors duration-200 hover:bg-[#101A2E]/[0.06] hover:text-[#101A2E] disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-xl bg-[#F5F7F6] p-4">
              <p className="text-sm font-semibold text-[#101A2E]">
                {deleteModal.package
                  ?.name ||
                  "Untitled Package"}
              </p>

              <p className="mt-1 text-xs text-[#101A2E]/45">
                ID:{" "}
                {deleteModal.package
                  ?.id || "N/A"}
              </p>

              {deleteModal.package
                ?.categorySlug && (
                <p className="mt-1 text-xs text-[#101A2E]/50">
                  {getCategoryName(
                    deleteModal.package
                      .categorySlug
                  )}
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={
                  closeDeleteModal
                }
                className="flex-1 rounded-xl border border-[#101A2E]/12 px-4 py-2.5 text-sm font-semibold text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.04] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  handleDelete
                }
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Package"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}