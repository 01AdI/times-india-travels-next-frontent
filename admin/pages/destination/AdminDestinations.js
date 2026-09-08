import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Package,
  FolderTree,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  getAdminDestinations,
  deleteAdminDestination,
} from "../../services/adminApi";

export default function AdminDestinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");


  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminDestinations();

      setDestinations(response.destinations || []);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load destinations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter((destination) => {
      return (
        destination.name
          ?.toLowerCase()
          .includes(query) ||
        destination.id
          ?.toLowerCase()
          .includes(query) ||
        destination.tagline
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [destinations, search]);

  const totalPackages = (destination) => {
    return (
      destination.categories?.reduce(
        (total, category) =>
          total +
          (category.packages?.length || 0),
        0
      ) || 0
    );
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteAdminDestination(
        deleteTarget.id
      );

      setDestinations((prev) =>
        prev.filter(
          (destination) =>
            destination.id !==
            deleteTarget.id
        )
      );

      setDeleteTarget(null);
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
      <div className="mx-auto flex min-h-100 max-w-7xl items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />

          Loading destinations...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Travel Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Destinations
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage destinations, their associated
            tour categories, and packages.
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            navigate(
              "/destinations/create"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Plus size={17} />

          Create Destination
        </button>

      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

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
            className="text-red-400 transition hover:text-red-600"
          >
            <X size={17} />
          </button>

        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:max-w-md">

          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search destinations..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
          />

        </div>


        <div className="text-sm text-slate-500">

          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredDestinations.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {destinations.length}
          </span>{" "}
          destinations

        </div>

      </div>

      {filteredDestinations.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <MapPin
              size={26}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-4 text-base font-bold text-slate-900">
            {search
              ? "No destinations found"
              : "No destinations yet"}
          </h2>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            {search
              ? "Try changing your search term."
              : "Create your first destination to start organizing your tour content."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/destinations/create"
                )
              }
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={17} />
              Create Destination
            </button>
          )}

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredDestinations.map(
            (destination) => {

              const categoryCount =
                destination.categories
                  ?.length || 0;

              const packageCount =
                totalPackages(destination);

              return (
                <article
                  key={destination.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >

                  <div className="relative h-52 overflow-hidden bg-slate-100">

                    {destination.heroImage ? (

                      <img
                        src={
                          destination.heroImage
                        }
                        alt={
                          destination.name
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <div className="text-center">

                          <ImageIcon
                            size={32}
                            className="mx-auto text-slate-300"
                          />

                          <p className="mt-2 text-xs font-medium text-slate-400">
                            No hero image
                          </p>

                        </div>

                      </div>

                    )}


                    {/* IMAGE OVERLAY */}

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />


                    {/* DESTINATION ID */}

                    <div className="absolute bottom-3 left-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {destination.id}
                    </div>

                  </div>

                  <div className="p-5">

                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                      {destination.name}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-sm font-medium text-orange-600">
                      {destination.tagline}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {destination.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-slate-50 p-3">

                        <div className="flex items-center gap-2">

                          <FolderTree
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="text-xs font-medium text-slate-500">
                            Categories
                          </span>

                        </div>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {categoryCount}
                        </p>

                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">

                        <div className="flex items-center gap-2">

                          <Package
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="text-xs font-medium text-slate-500">
                            Packages
                          </span>

                        </div>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {packageCount}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/destinations/${destination.id}`
                          )
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>


                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/destinations/${destination.id}/edit`
                          )
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget(
                            destination
                          )
                        }
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                        title="Delete destination"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Trash2 size={20} />
              </div>

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Delete destination?
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  You are about to delete{" "}
                  <span className="font-semibold text-slate-900">
                    {deleteTarget.name}
                  </span>
                  . This action cannot be undone.
                </p>

              </div>

            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700">

              If this destination is still associated
              with one or more tour categories, the
              backend will reject the deletion.

            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={deleting}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {deleting && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Destination"}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
