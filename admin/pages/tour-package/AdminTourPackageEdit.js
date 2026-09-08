import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Upload,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminTourPackage,
  updateAdminTourPackage,
  getAdminTourCategories,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";

const parseJSONField = (value, fallback = []) => {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      return fallback;
    }
  }

  return value;
};

const createErrorReference = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `ERR-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
};

const createItineraryId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `itinerary-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

const normalizeDuration = (duration) => {
  const parsed = parseJSONField(duration, {});

  if (!parsed || typeof parsed !== "object") {
    return {
      days: "",
      nights: "",
      label: "",
    };
  }

  return {
    days: parsed.days ?? "",
    nights: parsed.nights ?? "",
    label: parsed.label ?? "",
  };
};

const normalizeItinerary = (itinerary) => {
  const parsed = parseJSONField(itinerary, []);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.map((item, index) => ({
    _clientId: createItineraryId(),
    day: item?.day ?? index + 1,
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));
};

const normalizeFormData = (packageData) => {
  return {
    id: packageData.id || "",
    name: packageData.name || "",
    categorySlug: packageData.categorySlug || "",
    price: packageData.price ?? "",

    thumbnail: packageData.thumbnail || "",
    heroImage: packageData.heroImage || "",

    duration: normalizeDuration(packageData.duration),

    route: parseJSONField(packageData.route, []),
    highlights: parseJSONField(packageData.highlights, []),
    itinerary: normalizeItinerary(packageData.itinerary),
    inclusions: parseJSONField(packageData.inclusions, []),
    exclusions: parseJSONField(packageData.exclusions, []),
    alsoUnder: parseJSONField(packageData.alsoUnder, []),

    mostLoved: Boolean(packageData.mostLoved),
    specialPackage: Boolean(packageData.specialPackage),
  };
};

export default function AdminTourPackageEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [errorReference, setErrorReference] = useState("");

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [heroImageFile, setHeroImageFile] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [heroImagePreview, setHeroImagePreview] = useState("");

  const itineraryFocusIdRef = useRef(null);
  const itinerarySectionRefs = useRef({});
  const itineraryTitleRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        setErrorReference("");

        const [packageResponse, categoryResponse] = await Promise.all([
          getAdminTourPackage(id),
          getAdminTourCategories(),
        ]);

        const packageData =
          packageResponse?.package ||
          packageResponse?.tourPackage ||
          packageResponse?.data;

        if (!packageData) {
          throw new Error("Tour package data was not returned.");
        }

        const normalizedData = normalizeFormData(packageData);

        setFormData(normalizedData);

        setThumbnailPreview(normalizedData.thumbnail || "");
        setHeroImagePreview(normalizedData.heroImage || "");

        const categoryList =
          categoryResponse?.categories ||
          categoryResponse?.data ||
          categoryResponse ||
          [];

        setCategories(Array.isArray(categoryList) ? categoryList : []);
      } catch (err) {
        const reference = createErrorReference();

        setErrorReference(reference);
        setError(err?.message || "Unable to load tour package.");
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (thumbnailPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }

      if (heroImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(heroImagePreview);
      }
    };
  }, [thumbnailPreview, heroImagePreview]);

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleDurationChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      duration: {
        ...previous.duration,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((previous) => {
      const updated = [...previous[field]];

      updated[index] = value;

      return {
        ...previous,
        [field]: updated,
      };
    });
  };

  const addArrayItem = (field, defaultValue = "") => {
    setFormData((previous) => ({
      ...previous,
      [field]: [...previous[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((previous) => ({
      ...previous,
      [field]: previous[field].filter((_, i) => i !== index),
    }));
  };

  const addItineraryDay = () => {
    const newClientId = createItineraryId();

    itineraryFocusIdRef.current = newClientId;

    setFormData((previous) => {
      const nextDay =
        previous.itinerary.length > 0
          ? Math.max(
              ...previous.itinerary.map((item) => Number(item.day) || 0),
            ) + 1
          : 1;

      return {
        ...previous,
        itinerary: [
          ...previous.itinerary,
          {
            _clientId: newClientId,
            day: nextDay,
            title: "",
            description: "",
          },
        ],
      };
    });
  };

  const scrollAndFocusNewItinerary = (clientId, element) => {
    if (!element) {
      delete itineraryTitleRefs.current[clientId];
      return;
    }

    itineraryTitleRefs.current[clientId] = element;

    if (itineraryFocusIdRef.current !== clientId) {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (itineraryFocusIdRef.current !== clientId) {
          return;
        }

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.focus();

        element.setSelectionRange(
          element.value.length,
          element.value.length,
        );
      });
    });
  };

  const removeItineraryDay = (clientId) => {
    setFormData((previous) => ({
      ...previous,
      itinerary: previous.itinerary
        .filter((item) => item._clientId !== clientId)
        .map((item, index) => ({
          ...item,
          day: index + 1,
        })),
    }));

    delete itineraryTitleRefs.current[clientId];
    delete itinerarySectionRefs.current[clientId];

    if (itineraryFocusIdRef.current === clientId) {
      itineraryFocusIdRef.current = null;
    }
  };

  const updateItinerary = (clientId, field, value) => {
    setFormData((previous) => ({
      ...previous,
      itinerary: previous.itinerary.map((item) =>
        item._clientId === clientId
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Thumbnail must be an image file.");
      return;
    }

    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setThumbnailFile(file);
    setThumbnailPreview(previewUrl);

    event.target.value = "";
  };

  const handleHeroImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Hero image must be an image file.");
      return;
    }

    if (heroImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(heroImagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setHeroImageFile(file);
    setHeroImagePreview(previewUrl);

    event.target.value = "";
  };

  const removeThumbnailFile = () => {
    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnailFile(null);
    setThumbnailPreview(formData.thumbnail || "");
  };

  const removeHeroImageFile = () => {
    if (heroImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(heroImagePreview);
    }

    setHeroImageFile(null);
    setHeroImagePreview(formData.heroImage || "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setErrorReference("");

      if (!formData.name.trim()) {
        throw new Error("Package name is required.");
      }

      if (!formData.categorySlug) {
        throw new Error("Tour category is required.");
      }

      if (!formData.duration.days) {
        throw new Error("Duration days are required.");
      }

      if (formData.duration.nights === "") {
        throw new Error("Duration nights are required.");
      }

      if (!formData.duration.label.trim()) {
        throw new Error("Duration label is required.");
      }

      if (!formData.itinerary.length) {
        throw new Error("At least one itinerary day is required.");
      }

      const invalidItinerary = formData.itinerary.some(
        (item) =>
          !String(item.title || "").trim() ||
          !String(item.description || "").trim(),
      );

      if (invalidItinerary) {
        throw new Error(
          "Every itinerary day must have a title and description.",
        );
      }

      const payload = new FormData();

      payload.append("name", formData.name.trim());
      payload.append("categorySlug", formData.categorySlug);

      payload.append(
        "price",
        formData.price === "" ? "" : String(formData.price),
      );

      payload.append(
        "duration",
        JSON.stringify({
          days: Number(formData.duration.days),
          nights: Number(formData.duration.nights),
          label: formData.duration.label.trim(),
        }),
      );

      payload.append(
        "route",
        JSON.stringify(
          formData.route
            .map((item) => String(item || "").trim())
            .filter(Boolean),
        ),
      );

      payload.append(
        "highlights",
        JSON.stringify(
          formData.highlights
            .map((item) => String(item || "").trim())
            .filter(Boolean),
        ),
      );

      payload.append(
        "itinerary",
        JSON.stringify(
          formData.itinerary.map((item, index) => ({
            day: Number(item.day) || index + 1,
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          })),
        ),
      );

      payload.append(
        "inclusions",
        JSON.stringify(
          formData.inclusions
            .map((item) => String(item || "").trim())
            .filter(Boolean),
        ),
      );

      payload.append(
        "exclusions",
        JSON.stringify(
          formData.exclusions
            .map((item) => String(item || "").trim())
            .filter(Boolean),
        ),
      );

      payload.append(
        "alsoUnder",
        JSON.stringify(
          formData.alsoUnder
            .map((item) => String(item || "").trim())
            .filter(Boolean),
        ),
      );

      payload.append(
        "mostLoved",
        JSON.stringify(Boolean(formData.mostLoved)),
      );

      payload.append(
        "specialPackage",
        JSON.stringify(Boolean(formData.specialPackage)),
      );

      if (thumbnailFile) {
        payload.append("thumbnail", thumbnailFile);
      }

      if (heroImageFile) {
        payload.append("heroImage", heroImageFile);
      }

      await updateAdminTourPackage(id, payload);

      navigate(`/tour-packages/${id}`);
    } catch (err) {
      const reference = createErrorReference();

      setErrorReference(reference);
      setError(
        err?.message || "Unable to update tour package.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2
          size={32}
          className="animate-spin text-slate-700"
        />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3 text-red-700">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-medium">
                  Unable to load tour package
                </p>

                <p className="mt-1 text-sm">
                  {error ||
                    "Tour package could not be loaded."}
                </p>

                {errorReference && (
                  <p className="mt-3 text-xs">
                    Error reference:{" "}
                    <span className="font-mono">
                      {errorReference}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/tour-packages")
            }
            className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Tour Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate(`/tour-packages/${id}`)
              }
              className="mb-3 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to Package
            </button>

            <h1 className="text-3xl font-semibold text-slate-900">
              Edit Tour Package
            </h1>

            <p className="mt-1 text-slate-500">
              Update the details of this tour package.
            </p>
          </div>

          <button
            type="submit"
            form="tour-package-edit-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Save size={18} />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p className="font-medium">
                Something went wrong
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>

              {errorReference && (
                <p className="mt-2 text-xs">
                  Error reference:{" "}
                  <span className="font-mono">
                    {errorReference}
                  </span>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setError("");
                setErrorReference("");
              }}
              className="rounded-lg p-1 text-red-500 hover:bg-red-100"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <form
          id="tour-package-edit-form"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Package ID
                </label>

                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Package ID is immutable.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Package Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    handleChange(
                      "name",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tour Category
                </label>

                <select
                  value={formData.categorySlug}
                  onChange={(event) =>
                    handleChange(
                      "categorySlug",
                      event.target.value,
                    )
                  }
                  disabled={categoriesLoading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-300 disabled:bg-slate-100"
                  required
                >
                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={
                        category._id ||
                        category.id
                      }
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(event) =>
                    handleChange(
                      "price",
                      event.target.value,
                    )
                  }
                  placeholder="Leave empty for quote-based pricing"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Package Visibility
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Control how this package is highlighted across
              the website.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
                <div>
                  <p className="font-medium text-slate-900">
                    Most Loved
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Show this package as a popular / most-loved
                    tour.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={formData.mostLoved}
                  onChange={(event) =>
                    handleChange(
                      "mostLoved",
                      event.target.checked,
                    )
                  }
                  className="h-5 w-5 rounded border-slate-300"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
                <div>
                  <p className="font-medium text-slate-900">
                    Special Package
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Mark this package as a special package.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={formData.specialPackage}
                  onChange={(event) =>
                    handleChange(
                      "specialPackage",
                      event.target.checked,
                    )
                  }
                  className="h-5 w-5 rounded border-slate-300"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Package Images
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a new image only when you want to replace
              the existing one.
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Thumbnail
                </label>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon
                          size={42}
                          className="text-slate-300"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                      <Upload size={17} />

                      {thumbnailFile
                        ? "Choose Different Image"
                        : "Replace Thumbnail"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                    </label>

                    {thumbnailFile && (
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                        <p className="truncate text-xs text-slate-600">
                          {thumbnailFile.name}
                        </p>

                        <button
                          type="button"
                          onClick={
                            removeThumbnailFile
                          }
                          className="ml-3 shrink-0 text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Hero Image
                </label>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    {heroImagePreview ? (
                      <img
                        src={heroImagePreview}
                        alt="Hero image preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon
                          size={42}
                          className="text-slate-300"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                      <Upload size={17} />

                      {heroImageFile
                        ? "Choose Different Image"
                        : "Replace Hero Image"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageChange}
                        className="hidden"
                      />
                    </label>

                    {heroImageFile && (
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                        <p className="truncate text-xs text-slate-600">
                          {heroImageFile.name}
                        </p>

                        <button
                          type="button"
                          onClick={
                            removeHeroImageFile
                          }
                          className="ml-3 shrink-0 text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Duration
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Days
                </label>

                <input
                  type="number"
                  min="1"
                  value={formData.duration.days}
                  onChange={(event) =>
                    handleDurationChange(
                      "days",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nights
                </label>

                <input
                  type="number"
                  min="0"
                  value={formData.duration.nights}
                  onChange={(event) =>
                    handleDurationChange(
                      "nights",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Duration Label
                </label>

                <input
                  type="text"
                  value={formData.duration.label}
                  onChange={(event) =>
                    handleDurationChange(
                      "label",
                      event.target.value,
                    )
                  }
                  placeholder="7 Days / 6 Nights"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                  required
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Route
              </h2>

              <button
                type="button"
                onClick={() => addArrayItem("route")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {formData.route.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      handleArrayChange(
                        "route",
                        index,
                        event.target.value,
                      )
                    }
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                    placeholder="Jaipur"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        "route",
                        index,
                      )
                    }
                    className="rounded-xl px-4 text-sm text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Highlights
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem("highlights")
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {formData.highlights.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <input
                      type="text"
                      value={item}
                      onChange={(event) =>
                        handleArrayChange(
                          "highlights",
                          index,
                          event.target.value,
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "highlights",
                          index,
                        )
                      }
                      className="rounded-xl px-4 text-sm text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Itinerary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Build the complete day-by-day itinerary.
                </p>
              </div>

              <button
                type="button"
                onClick={addItineraryDay}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Plus size={16} />
                Add Day
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {formData.itinerary.map(
                (item, index) => (
                  <div
                    key={item._clientId}
                    ref={(element) => {
                      if (element) {
                        itinerarySectionRefs.current[
                          item._clientId
                        ] = element;
                      } else {
                        delete itinerarySectionRefs.current[
                          item._clientId
                        ];
                      }
                    }}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-[#C9A24B]">
                          {index + 1}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            Day {index + 1}
                          </p>

                          <p className="text-xs text-slate-500">
                            Itinerary day
                          </p>
                        </div>
                      </div>

                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeItineraryDay(
                              item._clientId,
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 size={15} />
                          Remove Day
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Day
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={item.day ?? ""}
                          onChange={(event) =>
                            updateItinerary(
                              item._clientId,
                              "day",
                              event.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Title
                        </label>

                        <input
                          ref={(element) =>
                            scrollAndFocusNewItinerary(
                              item._clientId,
                              element,
                            )
                          }
                          type="text"
                          placeholder="Arrival in Delhi"
                          value={item.title || ""}
                          onChange={(event) =>
                            updateItinerary(
                              item._clientId,
                              "title",
                              event.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Description
                      </label>

                      <textarea
                        rows={5}
                        placeholder="Describe the activities and experiences for this day..."
                        value={
                          item.description || ""
                        }
                        onChange={(event) =>
                          updateItinerary(
                            item._clientId,
                            "description",
                            event.target.value,
                          )
                        }
                        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                        required
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Inclusions
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem("inclusions")
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {formData.inclusions.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Check size={16} />
                    </div>

                    <input
                      type="text"
                      value={item}
                      onChange={(event) =>
                        handleArrayChange(
                          "inclusions",
                          index,
                          event.target.value,
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "inclusions",
                          index,
                        )
                      }
                      className="rounded-xl px-4 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Exclusions
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem("exclusions")
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {formData.exclusions.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <X size={16} />
                    </div>

                    <input
                      type="text"
                      value={item}
                      onChange={(event) =>
                        handleArrayChange(
                          "exclusions",
                          index,
                          event.target.value,
                        )
                      }
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "exclusions",
                          index,
                        )
                      }
                      className="rounded-xl px-4 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Also Under
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Additional categories where this package
                  should appear.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  addArrayItem("alsoUnder")
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {formData.alsoUnder.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-3"
                  >
                    <select
                      value={item}
                      onChange={(event) =>
                        handleArrayChange(
                          "alsoUnder",
                          index,
                          event.target.value,
                        )
                      }
                      disabled={categoriesLoading}
                      className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-300"
                    >
                      <option value="">
                        Select additional category
                      </option>

                      {categories
                        .filter(
                          (category) =>
                            category.id !==
                              formData.categorySlug &&
                            (item === category.id ||
                              !formData.alsoUnder.includes(
                                category.id,
                              )),
                        )
                        .map((category) => (
                          <option
                            key={
                              category._id ||
                              category.id
                            }
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        ))}
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "alsoUnder",
                          index,
                        )
                      }
                      className="rounded-xl px-4 text-red-500 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ),
              )}

              {!formData.alsoUnder.length && (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-400">
                  No additional categories added.
                </div>
              )}
            </div>
          </section>

          <div className="flex justify-end gap-4 pb-10">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/tour-packages/${id}`,
                )
              }
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}