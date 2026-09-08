import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  MapPin,
  Package,
  FolderOpen,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminDestination,
  deleteAdminDestination,
} from "../../services/adminApi";

export default function AdminDestinationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [destination, setDestination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminDestination(id);

        if (!response.destination) {
          throw new Error(
            "Destination data was not returned."
          );
        }

        setDestination(
          response.destination
        );
      } catch (err) {
        console.error(
          "Failed to load destination:",
          err
        );

        setError(
          err.message ||
            "Unable to load destination."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);


  const handleDelete = async () => {
    if (!destination) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${destination.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteAdminDestination(
        destination.id
      );

      navigate("/destinations");
    } catch (err) {
      
      setError(
        err.message ||
          "Unable to delete destination."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading destination...
        </div>
      </div>
    );
  }


  if (error && !destination) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">

        <button
          type="button"
          onClick={() =>
            navigate("/destinations")
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Destinations
        </button>

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Unable to load destination
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

        </div>

      </div>
    );
  }

  if (!destination) {
    return null;
  }

  const categories =
    destination.categories || [];

  const totalPackages =
    categories.reduce(
      (total, category) =>
        total +
        (category.packages?.length || 0),
      0
    );

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/destinations"
              )
            }
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Destinations
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Destination
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {destination.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {destination.tagline}
          </p>

        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>navigate(`/destinations/${destination.id}/edit`)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Edit3 size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {deleting ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={16} />
            )}

            {deleting
              ? "Deleting..."
              : "Delete"}

          </button>

        </div>

      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Action failed
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="relative h-72 bg-slate-100 sm:h-96">

          {destination.heroImage ? (
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-300">

              <ImageIcon size={42} />

              <p className="mt-3 text-sm font-medium">
                No hero image
              </p>

            </div>
          )}

          {/* OVERLAY */}

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6">

            <div className="flex flex-wrap items-end justify-between gap-4">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Destination ID
                </p>

                <p className="mt-1 font-mono text-sm text-white">
                  {destination.id}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* DESTINATION */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Destination
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                1
              </p>
            </div>

          </div>

        </div>

        {/* CATEGORIES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FolderOpen size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Tour Categories
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {categories.length}
              </p>
            </div>

          </div>

        </div>

        {/* PACKAGES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Package size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Tour Packages
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {totalPackages}
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-4">

          <h2 className="text-base font-bold text-slate-900">
            About {destination.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Destination description
          </p>

        </div>

        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
          {destination.description}
        </p>

      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-base font-bold text-slate-900">
            Tour Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Categories associated with this destination
            and their available tour packages.
          </p>

        </div>

        {categories.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">

            <FolderOpen
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-semibold text-slate-600">
              No tour categories
            </p>

            <p className="mt-1 text-xs text-slate-400">
              No tour categories are currently
              associated with this destination.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {categories.map((category) => {

              const packages =
                category.packages || [];

              return (
                <div
                  key={category.id}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >

                  {/* CATEGORY HEADER */}

                  <div className="flex flex-col gap-3 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <FolderOpen
                          size={16}
                          className="shrink-0 text-orange-500"
                        />

                        <h3 className="truncate text-sm font-bold text-slate-900">
                          {category.name}
                        </h3>

                      </div>

                      <p className="mt-1 truncate pl-6 font-mono text-xs text-slate-400">
                        {category.id}
                      </p>

                    </div>

                    <div className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {packages.length}{" "}
                      {packages.length === 1
                        ? "package"
                        : "packages"}
                    </div>

                  </div>

                  {/* PACKAGES */}

                  {packages.length > 0 ? (

                    <div className="divide-y divide-slate-100">

                      {packages.map((tourPackage) => (

                        <button
                          key={tourPackage.id}
                          type="button"
                          onClick={() =>
                            navigate(
                              `/tour-packages/${tourPackage.id}`
                            )
                          }
                          className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50"
                        >

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-orange-50 group-hover:text-orange-600">
                              <Package size={16} />
                            </div>

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-slate-800">
                                {tourPackage.name ||
                                  tourPackage.title ||
                                  tourPackage.id}
                              </p>

                              {tourPackage.duration && (
                                <p className="mt-0.5 text-xs text-slate-400">
                                  {tourPackage.duration?.label}
                                </p>
                              )}

                            </div>

                          </div>

                          <ChevronRight
                            size={17}
                            className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500"
                          />

                        </button>

                      ))}

                    </div>

                  ) : (

                    <div className="px-4 py-6 text-center">

                      <p className="text-xs text-slate-400">
                        No tour packages are associated
                        with this category.
                      </p>

                    </div>

                  )}

                </div>
              );
            })}

          </div>

        )}

      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/destinations"
            )
          }
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Destinations
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/destinations/${destination.id}/edit`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Edit3 size={17} />
          Edit Destination
        </button>

      </div>

    </div>
  );
}
