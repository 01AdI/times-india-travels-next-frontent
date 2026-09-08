import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Loader2,
  AlertCircle,
  MapPin,
  Image as ImageIcon,
  CalendarDays,
  Tag,
  FolderOpen,
  Package,
  Clock,
  ChevronRight,
  Eye,
  EyeOff,
  Navigation,
  Compass,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminTourCategory,
  getAdminTourPackages,
} from "../../services/adminApi";

export default function AdminTourCategoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [packagesLoading, setPackagesLoading] = useState(true);

  const [error, setError] = useState("");
  const [packagesError, setPackagesError] = useState("");

  const [errorReference, setErrorReference] = useState("");
  const [packagesErrorReference, setPackagesErrorReference] = useState("");

  const [tourPackages, setTourPackages] = useState([]);

  const createErrorReference = () => {
    return `ERR-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        setError("");
        setErrorReference("");

        if (!id) {
          throw new Error("Tour category ID is missing.");
        }

        const response = await getAdminTourCategory(id);

        const categoryData =
          response?.category ||
          response?.data ||
          response;

        setCategory(categoryData);

        try {
          setPackagesLoading(true);
          setPackagesError("");
          setPackagesErrorReference("");

          const categorySlug =
            categoryData?.id ||
            categoryData?.slug ||
            id;

          const packageResponse = await getAdminTourPackages({
            page: 1,
            limit: 100,
            categorySlug,
          });

          const packages =
            packageResponse?.packages ||
            packageResponse?.data ||
            [];

          setTourPackages(
            Array.isArray(packages) ? packages : []
          );
        } catch (packageErr) {
          const reference = createErrorReference();

          setPackagesError(
            packageErr?.message ||
              "Unable to load tour packages for this category."
          );

          setPackagesErrorReference(reference);
        } finally {
          setPackagesLoading(false);
        }
      } catch (err) {
        const reference = createErrorReference();

        setError(
          err?.message ||
            "Unable to load tour category."
        );

        setErrorReference(reference);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading category...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <button
          type="button"
          onClick={() =>
            navigate("/tour-categories")
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Unable to load category
            </p>

            <p className="mt-1">
              {error}
            </p>

            {errorReference && (
              <p className="mt-2 font-mono text-xs text-red-500">
                Reference: {errorReference}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <button
          type="button"
          onClick={() =>
            navigate("/tour-categories")
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <FolderOpen
            size={35}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Category not found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            The requested tour category could not
            be found.
          </p>
        </div>
      </div>
    );
  }

  const destinations = Array.isArray(category.destinations)
    ? category.destinations
    : [];

  const gallery = Array.isArray(category.destinations_gallery)
    ? category.destinations_gallery
    : [];

  const heroImage =
    category.heroImage ||
    category.hero_image ||
    "";

  const showInExplore =
    category.showInExplore !== undefined
      ? Boolean(category.showInExplore)
      : category.show_in_explore !== undefined
        ? Boolean(category.show_in_explore)
        : true;

  const showInNavbar =
    category.showInNavbar !== undefined
      ? Boolean(category.showInNavbar)
      : category.show_in_navbar !== undefined
        ? Boolean(category.show_in_navbar)
        : true;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() =>
              navigate("/tour-categories")
            }
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Categories
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Tour Category
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {category.name || "Untitled Category"}
          </h1>

          {category.tagline && (
            <p className="mt-1 text-sm text-slate-500">
              {category.tagline}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/tour-categories/${
                category.id || id
              }/edit`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Edit3 size={16} />
          Edit Category
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {heroImage ? (
          <div className="relative h-72 w-full bg-slate-100 sm:h-80 lg:h-96">
            <img
              src={heroImage}
              alt={
                category.name ||
                "Tour category"
              }
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Category
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {category.name}
              </h2>

              {category.tagline && (
                <p className="mt-2 max-w-2xl text-sm text-white/80">
                  {category.tagline}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-72 items-center justify-center bg-slate-50 sm:h-80 lg:h-96">
            <div className="text-center">
              <ImageIcon
                size={38}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                No hero image
              </p>

              <p className="mt-1 text-xs text-slate-400">
                This category does not have a hero
                image yet.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 border-t border-slate-200 sm:grid-cols-4">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Tag size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Category ID
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                {category.id || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-slate-200 p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <MapPin size={18} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Destinations
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {destinations.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-slate-200 p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Package size={18} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Tour Packages
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {tourPackages.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <ImageIcon size={18} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Gallery Images
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {gallery.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Eye size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Visibility
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Control where this tour category is displayed on the website.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            className={`rounded-2xl border p-5 ${
              showInExplore
                ? "border-emerald-200 bg-emerald-50/60"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    showInExplore
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Compass size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Show in Explore
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Controls whether this category appears in the Explore section.
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  showInExplore
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {showInExplore ? (
                  <Eye size={13} />
                ) : (
                  <EyeOff size={13} />
                )}

                {showInExplore ? "Visible" : "Hidden"}
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              showInNavbar
                ? "border-emerald-200 bg-emerald-50/60"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    showInNavbar
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <Navigation size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Show in Navbar
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Controls whether this category appears in the website navigation.
                  </p>
                </div>
              </div>

              <div
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  showInNavbar
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {showInNavbar ? (
                  <Eye size={13} />
                ) : (
                  <EyeOff size={13} />
                )}

                {showInNavbar ? "Visible" : "Hidden"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-base font-bold text-slate-900">
            Description
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Category description shown to visitors.
          </p>
        </div>

        {category.description ? (
          <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
            {category.description}
          </p>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-500">
              No description available
            </p>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-base font-bold text-slate-900">
            Destinations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Destinations connected to this category.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <MapPin
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              No destinations connected
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {destinations.map(
              (destination, index) => {
                const destinationId =
                  typeof destination === "string"
                    ? destination
                    : destination?.id ||
                      destination?._id ||
                      "";

                const destinationName =
                  typeof destination === "string"
                    ? destination
                    : destination?.name ||
                      destination?.title ||
                      destinationId;

                return (
                  <div
                    key={
                      destinationId ||
                      index
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700"
                  >
                    <MapPin size={13} />
                    {destinationName}
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Tour Packages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tour packages available under this category.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {tourPackages.length}{" "}
            {tourPackages.length === 1
              ? "package"
              : "packages"}
          </span>
        </div>

        {packagesError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Unable to load tour packages
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {packagesError}
                </p>

                {packagesErrorReference && (
                  <p className="mt-2 font-mono text-xs text-red-500">
                    Reference: {packagesErrorReference}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : packagesLoading ? (
          <div className="flex min-h-45 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Loader2
                size={20}
                className="animate-spin"
              />
              Loading tour packages...
            </div>
          </div>
        ) : tourPackages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <Package
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              No tour packages
            </p>

            <p className="mt-1 text-xs text-slate-400">
              There are no tour packages associated
              with this category yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tourPackages.map((tourPackage, index) => {
              const packageId =
                tourPackage.id ||
                tourPackage._id;

              const packageImage =
                tourPackage.heroImage ||
                tourPackage.thumbnail ||
                tourPackage.hero_image ||
                "";

              const duration =
                tourPackage.duration || {};

              const durationText =
                duration.label ||
                (duration.days !== undefined
                  ? `${duration.days} Days${
                      duration.nights !== undefined
                        ? ` / ${duration.nights} Nights`
                        : ""
                    }`
                  : "Duration not specified");

              const route = Array.isArray(
                tourPackage.route
              )
                ? tourPackage.route
                : [];

              return (
                <button
                  key={
                    packageId ||
                    `${tourPackage.name}-${index}`
                  }
                  type="button"
                  onClick={() =>
                    packageId &&
                    navigate(
                      `/tour-packages/${packageId}`
                    )
                  }
                  className="group flex w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="relative h-28 w-40 shrink-0 overflow-hidden bg-slate-100 sm:h-32 sm:w-48">
                    {packageImage ? (
                      <img
                        src={packageImage}
                        alt={
                          tourPackage.name ||
                          "Tour package"
                        }
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon
                          size={26}
                          className="text-slate-300"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {tourPackage.name ||
                          "Untitled Package"}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={13} />
                          {durationText}
                        </span>

                        {route.length > 0 && (
                          <span className="inline-flex min-w-0 items-center gap-1.5">
                            <MapPin size={13} />

                            <span className="truncate">
                              {route.join(" · ")}
                            </span>
                          </span>
                        )}
                      </div>

                      {tourPackage.featured && (
                        <span className="mt-3 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-slate-900 group-hover:text-white">
                      <ChevronRight size={17} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Destination Gallery
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Images associated with this tour category.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {gallery.length}{" "}
              {gallery.length === 1
                ? "image"
                : "images"}
            </span>
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <ImageIcon
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              No gallery images
            </p>

            <p className="mt-1 text-xs text-slate-400">
              This category does not have any
              destination gallery images.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(
              (image, index) => {
                const imageUrl =
                  typeof image === "string"
                    ? image
                    : image?.url;

                const caption =
                  typeof image === "object"
                    ? image?.caption || ""
                    : "";

                return (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="relative h-48 bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            caption ||
                            `Gallery image ${
                              index + 1
                            }`
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon
                            size={28}
                            className="text-slate-300"
                          />
                        </div>
                      )}

                      <div className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-black/60 px-2 text-[11px] font-semibold text-white">
                        {index + 1}
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="truncate text-xs font-medium text-slate-500">
                        {imageUrl ||
                          "No image URL"}
                      </p>

                      {caption && (
                        <p className="mt-2 text-sm leading-5 text-slate-700">
                          {caption}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {(category.createdAt || category.updatedAt) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">
              Record Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Administrative information for this
              category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {category.createdAt && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <CalendarDays
                  size={18}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Created
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {new Date(
                      category.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {category.updatedAt && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <CalendarDays
                  size={18}
                  className="text-slate-400"
                />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {new Date(
                      category.updatedAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() =>
            navigate("/tour-categories")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Back to Categories
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/tour-categories/${
                category.id || id
              }/edit`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Edit3 size={16} />
          Edit Category
        </button>
      </div>
    </div>
  );
}