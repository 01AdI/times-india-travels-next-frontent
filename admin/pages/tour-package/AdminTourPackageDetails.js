import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Tag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminTourPackage,
  getAdminTourCategory,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";

export default function AdminTourPackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourPackage, setTourPackage] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAdminTourPackage(id);

        const loadedPackage =
          response?.package ||
          response?.tourPackage ||
          response?.data ||
          null;

        if (!loadedPackage) {
          throw new Error(
            "Tour package data was not returned by the server."
          );
        }

        setTourPackage(loadedPackage);

        if (loadedPackage.categorySlug) {
          try {
            const categoryResponse = await getAdminTourCategory(
              loadedPackage.categorySlug
            );

            const category =
              categoryResponse?.category ||
              categoryResponse?.tourCategory ||
              categoryResponse?.data ||
              null;

            setCategoryName(category?.name || "");
          } catch (categoryError) {
            setError(
              categoryError.message ||
                "Unable to load the tour category."
            );
          }
        }
      } catch (error) {
        setError(
          error.message || "Unable to load tour package."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourPackage();
    }
  }, [id]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#101A2E]/60">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span className="text-sm font-medium">
            Loading tour package...
          </span>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !tourPackage) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-red-900">
                Unable to load tour package
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error ||
                  "The requested tour package could not be found."}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/tour-packages")
                }
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-[#F4EFE4] transition-colors duration-200 hover:bg-[#C9A24B] hover:text-[#101A2E]"
                style={{
                  backgroundColor: NAVY,
                }}
              >
                <ArrowLeft size={16} />
                Back to Tour Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // NORMALIZED DATA
  // ============================================================

  const duration = tourPackage.duration || {};

  const route = Array.isArray(tourPackage.route)
    ? tourPackage.route
    : [];

  const highlights = Array.isArray(
    tourPackage.highlights
  )
    ? tourPackage.highlights
    : [];

  const itinerary = Array.isArray(
    tourPackage.itinerary
  )
    ? tourPackage.itinerary
    : [];

  const inclusions = Array.isArray(
    tourPackage.inclusions
  )
    ? tourPackage.inclusions
    : [];

  const exclusions = Array.isArray(
    tourPackage.exclusions
  )
    ? tourPackage.exclusions
    : [];

  const alsoUnder = Array.isArray(
    tourPackage.alsoUnder
  )
    ? tourPackage.alsoUnder
    : [];

  const heroImage =
    tourPackage.heroImage ||
    tourPackage.thumbnail ||
    null;

  const thumbnail =
    tourPackage.thumbnail ||
    tourPackage.heroImage ||
    null;

  const durationLabel =
    duration.label ||
    (duration.days !== undefined
      ? `${duration.days} Days${
          duration.nights !== undefined
            ? ` / ${duration.nights} Nights`
            : ""
        }`
      : "—");

  const handleDelete = () => {
    navigate("/tour-packages", {
      state: {
        openDeleteModal: true,
        package: tourPackage,
      },
    });
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F5F7F6",
      }}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-[#101A2E]/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() =>
                  navigate("/tour-packages")
                }
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#101A2E]/55 transition-colors duration-200 hover:text-[#101A2E]"
              >
                <ArrowLeft size={16} />
                Back to Tour Packages
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-[#101A2E]">
                  {tourPackage.name || "Untitled Package"}
                </h1>

                {/* MOST LOVED */}

                {tourPackage.mostLoved === true && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${GOLD}1A`,
                      color: "#8B6D24",
                    }}
                  >
                    <Star
                      size={13}
                      fill="currentColor"
                    />
                    Most Loved
                  </span>
                )}

                {/* SPECIAL PACKAGE */}

                {tourPackage.specialPackage === true && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#101A2E] px-2.5 py-1 text-xs font-semibold text-white">
                    <Sparkles size={13} />
                    Special Package
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-[#101A2E]/50">
                Tour Package Details
              </p>
            </div>

            {/* ACTIONS */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/tour-packages/${id}/edit`
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#101A2E]/12 bg-white px-4 py-2.5 text-sm font-semibold text-[#101A2E]/75 transition-colors duration-200 hover:bg-[#101A2E]/[0.04]"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">

          {/* ==================================================
              LEFT COLUMN
          ================================================== */}

          <div className="space-y-6 lg:col-span-2">

            {/* HERO IMAGE */}

            <section className="overflow-hidden rounded-2xl border border-[#101A2E]/8 bg-white">
              <div className="relative aspect-[16/7] bg-[#101A2E]/5">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={
                      tourPackage.name ||
                      "Tour package"
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#101A2E]/35">
                    No package image available
                  </div>
                )}

                {/* IMAGE BADGES */}

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {tourPackage.mostLoved === true && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#101A2E] shadow-sm backdrop-blur-sm">
                      <Star
                        size={13}
                        fill={GOLD}
                        style={{ color: GOLD }}
                      />
                      Most Loved
                    </span>
                  )}

                  {tourPackage.specialPackage === true && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#101A2E]/95 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
                      <Sparkles size={13} />
                      Special Package
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* PACKAGE OVERVIEW */}

            <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-[#101A2E]">
                  Package Overview
                </h2>

                <p className="mt-1 text-sm text-[#101A2E]/50">
                  Core information about this tour package.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* CATEGORY */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#101A2E]">
                    {categoryName ||
                      tourPackage.categorySlug ||
                      "—"}
                  </p>
                </div>

                {/* DURATION */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Duration
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#101A2E]">
                    <Clock size={15} />

                    {durationLabel}
                  </div>
                </div>

                {/* PRICE */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Price
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#101A2E]">
                    {tourPackage.price !== null &&
                    tourPackage.price !== undefined &&
                    tourPackage.price !== ""
                      ? `₹${Number(
                          tourPackage.price
                        ).toLocaleString("en-IN")}`
                      : "Quote on request"}
                  </p>
                </div>

                {/* MOST LOVED */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Most Loved
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#101A2E]">
                    {tourPackage.mostLoved === true ? (
                      <>
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600"
                        />
                        Yes
                      </>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>

                {/* SPECIAL PACKAGE */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Special Package
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#101A2E]">
                    {tourPackage.specialPackage === true ? (
                      <>
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600"
                        />
                        Yes
                      </>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>

                {/* PACKAGE ID */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Package ID
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#101A2E]">
                    {tourPackage.id || "—"}
                  </p>
                </div>
              </div>
            </section>

            {/* ROUTE */}

            {route.length > 0 && (
              <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-[#101A2E]">
                    Route
                  </h2>

                  <p className="mt-1 text-sm text-[#101A2E]/50">
                    Destinations covered in this package.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {route.map((place, index) => (
                    <div
                      key={`${place}-${index}`}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#101A2E]/75"
                      style={{
                        backgroundColor: "#F5F7F6",
                      }}
                    >
                      <MapPin
                        size={15}
                        className="text-[#101A2E]/35"
                      />

                      {place}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* HIGHLIGHTS */}

            {highlights.length > 0 && (
              <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
                <h2 className="text-lg font-bold text-[#101A2E]">
                  Highlights
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highlights.map(
                    (highlight, index) => (
                      <div
                        key={index}
                        className="flex gap-3 rounded-lg p-3"
                        style={{
                          backgroundColor:
                            "#F5F7F6",
                        }}
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <span className="text-sm leading-6 text-[#101A2E]/75">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* ITINERARY */}

            {itinerary.length > 0 && (
              <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#101A2E]">
                    Day-by-Day Itinerary
                  </h2>

                  <p className="mt-1 text-sm text-[#101A2E]/50">
                    Complete itinerary for the package.
                  </p>
                </div>

                <div className="space-y-5">
                  {itinerary.map(
                    (day, index) => (
                      <div
                        key={index}
                        className="relative border-l-2 border-[#101A2E]/10 pl-5"
                      >
                        <div
                          className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white ring-1 ring-[#101A2E]/15"
                          style={{
                            backgroundColor: NAVY,
                          }}
                        />

                        <div className="text-xs font-bold uppercase tracking-wide text-[#101A2E]/35">
                          Day{" "}
                          {day?.day ??
                            index + 1}
                        </div>

                        <h3 className="mt-1 text-sm font-bold text-[#101A2E]">
                          {day?.title ||
                            `Day ${
                              day?.day ??
                              index + 1
                            }`}
                        </h3>

                        {day?.description && (
                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#101A2E]/60">
                            {day.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* INCLUSIONS / EXCLUSIONS */}

            {(inclusions.length > 0 ||
              exclusions.length > 0) && (
              <section className="grid gap-6 md:grid-cols-2">

                {/* INCLUSIONS */}

                {inclusions.length > 0 && (
                  <div className="rounded-2xl border border-emerald-100 bg-white p-6">
                    <h2 className="text-lg font-bold text-[#101A2E]">
                      Inclusions
                    </h2>

                    <ul className="mt-5 space-y-3">
                      {inclusions.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-[#101A2E]/70"
                          >
                            <CheckCircle2
                              size={17}
                              className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* EXCLUSIONS */}

                {exclusions.length > 0 && (
                  <div className="rounded-2xl border border-red-100 bg-white p-6">
                    <h2 className="text-lg font-bold text-[#101A2E]">
                      Exclusions
                    </h2>

                    <ul className="mt-5 space-y-3">
                      {exclusions.map(
                        (item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-[#101A2E]/70"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* ALSO UNDER */}

            {alsoUnder.length > 0 && (
              <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
                <h2 className="text-lg font-bold text-[#101A2E]">
                  Also Under
                </h2>

                <p className="mt-1 text-sm text-[#101A2E]/50">
                  This package is also associated with these categories.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {alsoUnder.map(
                    (category, index) => (
                      <span
                        key={`${category}-${index}`}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[#101A2E]/75"
                        style={{
                          backgroundColor:
                            "#F5F7F6",
                        }}
                      >
                        <Tag size={12} />
                        {category}
                      </span>
                    )
                  )}
                </div>
              </section>
            )}
          </div>

          {/* ==================================================
              RIGHT COLUMN
          ================================================== */}

          <aside className="space-y-6">

            {/* PACKAGE INFORMATION */}

            <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
              <h2 className="text-base font-bold text-[#101A2E]">
                Package Information
              </h2>

              <div className="mt-5 space-y-4">

                {/* ID */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Package ID
                  </p>

                  <p className="mt-1 break-all text-sm text-[#101A2E]/75">
                    {tourPackage.id || "—"}
                  </p>
                </div>

                {/* DATABASE ID */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Database Record ID
                  </p>

                  <p className="mt-1 break-all font-mono text-xs text-[#101A2E]/45">
                    {tourPackage._id || id}
                  </p>
                </div>

                {/* CATEGORY */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                    Category Slug
                  </p>

                  <p className="mt-1 break-all text-sm text-[#101A2E]/75">
                    {tourPackage.categorySlug ||
                      "—"}
                  </p>
                </div>

                {/* SOURCE */}

                {tourPackage.sourceUrl && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                      Source
                    </p>

                    <a
                      href={tourPackage.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                      style={{
                        color: "#8B6D24",
                      }}
                    >
                      View source
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {/* CREATED */}

                {tourPackage.createdAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                      Created
                    </p>

                    <p className="mt-1 text-sm text-[#101A2E]/70">
                      {new Date(
                        tourPackage.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                )}

                {/* UPDATED */}

                {tourPackage.updatedAt && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#101A2E]/35">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm text-[#101A2E]/70">
                      {new Date(
                        tourPackage.updatedAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* THUMBNAIL */}

            <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
              <h2 className="text-base font-bold text-[#101A2E]">
                Thumbnail
              </h2>

              <div className="mt-4 overflow-hidden rounded-xl bg-[#101A2E]/5">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={`${tourPackage.name} thumbnail`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-sm text-[#101A2E]/35">
                    No thumbnail
                  </div>
                )}
              </div>
            </section>

            {/* STATUS */}

            <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
              <h2 className="text-base font-bold text-[#101A2E]">
                Package Status
              </h2>

              <div className="mt-4 space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-[#F5F7F6] px-4 py-3">
                  <span className="text-sm text-[#101A2E]/65">
                    Most Loved
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      tourPackage.mostLoved === true
                        ? "text-emerald-600"
                        : "text-[#101A2E]/40"
                    }`}
                  >
                    {tourPackage.mostLoved === true
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F5F7F6] px-4 py-3">
                  <span className="text-sm text-[#101A2E]/65">
                    Special Package
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      tourPackage.specialPackage ===
                      true
                        ? "text-emerald-600"
                        : "text-[#101A2E]/40"
                    }`}
                  >
                    {tourPackage.specialPackage ===
                    true
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}

            <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-6">
              <h2 className="text-base font-bold text-[#101A2E]">
                Quick Actions
              </h2>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/tour-packages/${id}/edit`
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#F4EFE4] transition-colors duration-200 hover:bg-[#C9A24B] hover:text-[#101A2E]"
                  style={{
                    backgroundColor: NAVY,
                  }}
                >
                  <Pencil size={16} />
                  Edit Package
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete Package
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}