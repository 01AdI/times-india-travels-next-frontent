import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  MapPin,
  Clock,
  Check,
  X,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  createAdminTourPackage,
  getAdminTourCategories,
} from "../../services/adminApi";

const NAVY = "#101A2E";
const GOLD = "#C9A24B";

const initialForm = {
  name: "",
  slug: "",
  categorySlug: "",

  duration: {
    days: "",
    nights: "",
    label: "",
  },

  route: [],
  highlights: [""],
  itinerary: [
    {
      day: 1,
      title: "",
      description: "",
    },
  ],

  inclusions: [""],
  exclusions: [],

  alsoUnder: [],

  price: "",
  sourceUrl: "",

  mostLoved: false,
  specialPackage: false,

  thumbnail: null,
  heroImage: null,
};

export default function AdminTourPackageCreate() {
  const navigate = useNavigate();

  const errorRef = useRef(null);
  const itineraryTitleRefs = useRef([]);
  const itinerarySectionRefs = useRef([]);

  const [form, setForm] = useState(initialForm);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [heroImagePreview, setHeroImagePreview] = useState("");

  const [newItineraryDay, setNewItineraryDay] = useState(null);

  const showError = (message) => {
    setError(message);

    setTimeout(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoryError("");

        const response = await getAdminTourCategories();

        setCategories(response?.categories || response?.data || []);
      } catch (error) {
        setCategoryError(error.message || "Unable to load tour categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleNameChange = (value) => {
    setForm((previous) => ({
      ...previous,
      name: value,
      slug: previous.slug ? previous.slug : generateSlug(value),
    }));
  };

  const generateDurationLabel = (days, nights) => {
    if (days === "" || nights === "") return "";

    const dayCount = Number(days);
    const nightCount = Number(nights);

    if (!dayCount || dayCount < 1 || nightCount < 0) {
      return "";
    }

    return `${dayCount} ${dayCount === 1 ? "Day" : "Days"} / ${nightCount} ${
      nightCount === 1 ? "Night" : "Nights"
    }`;
  };

  const updateDuration = (field, value) => {
    setForm((previous) => {
      const duration = {
        ...previous.duration,
        [field]: value,
      };

      if (field === "days" || field === "nights") {
        duration.label = generateDurationLabel(
          duration.days,
          duration.nights,
        );
      }

      return {
        ...previous,
        duration,
      };
    });
  };

  const addRoute = () => {
    setForm((previous) => ({
      ...previous,
      route: [...previous.route, ""],
    }));
  };

  const updateRoute = (index, value) => {
    setForm((previous) => {
      const route = [...previous.route];

      route[index] = value;

      return {
        ...previous,
        route,
      };
    });
  };

  const removeRoute = (index) => {
    setForm((previous) => ({
      ...previous,
      route: previous.route.filter(
        (_, routeIndex) => routeIndex !== index,
      ),
    }));
  };

  const addHighlight = () => {
    setForm((previous) => ({
      ...previous,
      highlights: [...previous.highlights, ""],
    }));
  };

  const updateHighlight = (index, value) => {
    setForm((previous) => {
      const highlights = [...previous.highlights];

      highlights[index] = value;

      return {
        ...previous,
        highlights,
      };
    });
  };

  const removeHighlight = (index) => {
    setForm((previous) => ({
      ...previous,
      highlights: previous.highlights.filter(
        (_, highlightIndex) => highlightIndex !== index,
      ),
    }));
  };

  const addInclusion = () => {
    setForm((previous) => ({
      ...previous,
      inclusions: [...previous.inclusions, ""],
    }));
  };

  const updateInclusion = (index, value) => {
    setForm((previous) => {
      const inclusions = [...previous.inclusions];

      inclusions[index] = value;

      return {
        ...previous,
        inclusions,
      };
    });
  };

  const removeInclusion = (index) => {
    setForm((previous) => ({
      ...previous,
      inclusions: previous.inclusions.filter(
        (_, inclusionIndex) => inclusionIndex !== index,
      ),
    }));
  };

  const addExclusion = () => {
    setForm((previous) => ({
      ...previous,
      exclusions: [...previous.exclusions, ""],
    }));
  };

  const updateExclusion = (index, value) => {
    setForm((previous) => {
      const exclusions = [...previous.exclusions];

      exclusions[index] = value;

      return {
        ...previous,
        exclusions,
      };
    });
  };

  const removeExclusion = (index) => {
    setForm((previous) => ({
      ...previous,
      exclusions: previous.exclusions.filter(
        (_, exclusionIndex) => exclusionIndex !== index,
      ),
    }));
  };

  const addAlsoUnder = () => {
    setForm((previous) => ({
      ...previous,
      alsoUnder: [...previous.alsoUnder, ""],
    }));
  };

  const updateAlsoUnder = (index, value) => {
    setForm((previous) => {
      const alsoUnder = [...previous.alsoUnder];

      alsoUnder[index] = value;

      return {
        ...previous,
        alsoUnder,
      };
    });
  };

  const removeAlsoUnder = (index) => {
    setForm((previous) => ({
      ...previous,
      alsoUnder: previous.alsoUnder.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const addItineraryDay = () => {
    const newDayIndex = form.itinerary.length;

    setForm((previous) => ({
      ...previous,
      itinerary: [
        ...previous.itinerary,
        {
          day: previous.itinerary.length + 1,
          title: "",
          description: "",
        },
      ],
    }));

    setNewItineraryDay(newDayIndex);
  };

  useEffect(() => {
    if (newItineraryDay === null) return;

    const timer = setTimeout(() => {
      const section = itinerarySectionRefs.current[newItineraryDay];
      const titleInput = itineraryTitleRefs.current[newItineraryDay];

      section?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        titleInput?.focus();
        titleInput?.select();
      }, 350);

      setTimeout(() => {
        setNewItineraryDay(null);
      }, 1800);
    }, 50);

    return () => clearTimeout(timer);
  }, [newItineraryDay]);

  const updateItinerary = (index, field, value) => {
    setForm((previous) => {
      const itinerary = [...previous.itinerary];

      itinerary[index] = {
        ...itinerary[index],
        [field]: value,
      };

      return {
        ...previous,
        itinerary,
      };
    });
  };

  const removeItineraryDay = (index) => {
    setForm((previous) => {
      const itinerary = previous.itinerary
        .filter((_, itineraryIndex) => itineraryIndex !== index)
        .map((item, itineraryIndex) => ({
          ...item,
          day: itineraryIndex + 1,
        }));

      return {
        ...previous,
        itinerary,
      };
    });

    itineraryTitleRefs.current = itineraryTitleRefs.current.filter(
      (_, refIndex) => refIndex !== index,
    );

    itinerarySectionRefs.current =
      itinerarySectionRefs.current.filter(
        (_, refIndex) => refIndex !== index,
      );
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError(
        `${field === "thumbnail" ? "Thumbnail" : "Hero image"} must be an image file.`,
      );

      event.target.value = "";
      return;
    }

    setForm((previous) => ({
      ...previous,
      [field]: file,
    }));
  };

  useEffect(() => {
    if (!form.thumbnail) {
      setThumbnailPreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(form.thumbnail);

    setThumbnailPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [form.thumbnail]);

  useEffect(() => {
    if (!form.heroImage) {
      setHeroImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(form.heroImage);

    setHeroImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [form.heroImage]);

const validateForm = () => {
  if (!form.name.trim()) {
    return "Tour package name is required.";
  }

  if (!form.slug.trim()) {
    return "Tour package ID is required.";
  }

  if (!form.categorySlug) {
    return "Please select a tour category.";
  }

  // Duration is compulsory
  if (form.duration.days === "") {
    return "Duration in days is required.";
  }

  if (form.duration.nights === "") {
    return "Duration in nights is required.";
  }

  if (Number(form.duration.days) < 1) {
    return "Duration must contain at least 1 day.";
  }

  if (Number(form.duration.nights) < 0) {
    return "Nights cannot be negative.";
  }

  // Route is compulsory
  if (!form.route || form.route.length === 0) {
    return "At least one route location is required.";
  }

  const validRoutes = form.route.filter(
    (item) => item && item.trim()
  );

  if (validRoutes.length === 0) {
    return "At least one route location is required.";
  }

  // Validate itinerary if any itinerary days are added
  if (form.itinerary && form.itinerary.length > 0) {
    for (let i = 0; i < form.itinerary.length; i++) {
      const item = form.itinerary[i];

      if (!item.day || Number(item.day) < 1) {
        return `Day ${i + 1} is required in itinerary.`;
      }

      if (!item.title?.trim()) {
        return `Itinerary Day ${item.day}: title is required.`;
      }

      if (!item.description?.trim()) {
        return `Itinerary Day ${item.day}: description is required.`;
      }
    }
  }

  // Also Under validation
  const validAlsoUnder = form.alsoUnder.filter(
    (item) => item.trim()
  );

  const duplicateAlsoUnder =
    validAlsoUnder.length !== new Set(validAlsoUnder).size;

  if (duplicateAlsoUnder) {
    return "The same category cannot be added more than once in Also Under.";
  }

  if (validAlsoUnder.includes(form.categorySlug)) {
    return "The primary category cannot also be included in Also Under.";
  }

  return "";
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      showError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", form.name.trim());

      formData.append("id", form.slug.trim());

      formData.append("categorySlug", form.categorySlug);

      formData.append(
        "duration",
        JSON.stringify({
          days: Number(form.duration.days),
          nights: Number(form.duration.nights),
          label: form.duration.label.trim(),
        }),
      );

      formData.append(
        "route",
        JSON.stringify(
          form.route.map((item) => item.trim()).filter(Boolean),
        ),
      );

      formData.append(
        "highlights",
        JSON.stringify(
          form.highlights.map((item) => item.trim()).filter(Boolean),
        ),
      );

      formData.append(
        "itinerary",
        JSON.stringify(
          form.itinerary.map((item) => ({
            day: item.day,
            title: item.title.trim(),
            description: item.description.trim(),
          })),
        ),
      );

      formData.append(
        "inclusions",
        JSON.stringify(
          form.inclusions.map((item) => item.trim()).filter(Boolean),
        ),
      );

      formData.append(
        "exclusions",
        JSON.stringify(
          form.exclusions.map((item) => item.trim()).filter(Boolean),
        ),
      );

      formData.append(
        "alsoUnder",
        JSON.stringify(
          form.alsoUnder.map((item) => item.trim()).filter(Boolean),
        ),
      );

      if (form.price.trim()) {
        formData.append("price", form.price.trim());
      }

      if (form.sourceUrl.trim()) {
        formData.append("sourceUrl", form.sourceUrl.trim());
      }

      formData.append("mostLoved", String(form.mostLoved));

      formData.append("specialPackage", String(form.specialPackage));

      if (form.thumbnail instanceof File) {
        formData.append("thumbnail", form.thumbnail);
      }

      if (form.heroImage instanceof File) {
        formData.append("heroImage", form.heroImage);
      }

      const response = await createAdminTourPackage(formData);

      setSuccess("Tour package created successfully.");

      const createdPackage =
        response?.package || response?.tourPackage || response?.data;

      const createdId = createdPackage?.id || createdPackage?._id;

      setTimeout(() => {
        navigate(
          createdId
            ? `/tour-packages/${createdId}`
            : "/tour-packages",
        );
      }, 700);
    } catch (error) {
      showError(error.message || "Unable to create tour package.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#F5F7F6",
      }}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/tour-packages")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#101A2E]/12 bg-white text-[#101A2E]/65 transition-colors duration-200 hover:bg-[#101A2E]/[0.05]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: GOLD,
              }}
            >
              Tour Packages
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#101A2E] sm:text-3xl">
              Create Tour Package
            </h1>
          </div>
        </div>
      </div>

      {error && (
        <div
          ref={errorRef}
          className="mb-6 flex scroll-mt-6 items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <div className="flex-1">
            <p className="font-semibold">Unable to create package</p>

            <p className="mt-1">{error}</p>
          </div>

          <button type="button" onClick={() => setError("")}>
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <Check size={18} />

          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
              Section 01
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-[#101A2E]/55">
              Define the package name, URL and category.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                Package Name *
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder="Classic Golden Triangle Tour"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                Package ID (URL Slug) *
              </label>

              <input
                type="text"
                value={form.slug}
                onChange={(event) =>
                  updateField("slug", generateSlug(event.target.value))
                }
                placeholder="classic-golden-triangle-tour"
                className="admin-input"
              />

              <p className="mt-1.5 text-xs text-[#101A2E]/40">
                Used as the unique package ID.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                Tour Category *
              </label>

              <select
                value={form.categorySlug}
                onChange={(event) =>
                  updateField("categorySlug", event.target.value)
                }
                disabled={categoriesLoading}
                className="admin-input"
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>

                {!categoriesLoading &&
                  categories.map((category) => (
                    <option
                      key={category._id || category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>

              {categoryError && (
                <p className="mt-1 text-sm text-red-500">
                  {categoryError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                Price
              </label>

              <input
                type="text"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="Starting from ₹85,000"
                className="admin-input"
              />

              <p className="mt-1.5 text-xs text-[#101A2E]/40">
                Optional. Leave empty for quote-only packages.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                Source URL
              </label>

              <div className="relative">
                <ExternalLink
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#101A2E]/30"
                />

                <input
                  type="url"
                  value={form.sourceUrl}
                  onChange={(event) =>
                    updateField("sourceUrl", event.target.value)
                  }
                  placeholder="https://www.timesindiatravels.com/..."
                  className="admin-input pl-10"
                />
              </div>

              <p className="mt-1.5 text-xs text-[#101A2E]/40">
                Optional original/source package URL.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
              Section 02
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
              Duration & Route
            </h2>
          </div>

          <div className="mb-7">
            <div className="mb-3 flex items-center gap-2">
              <Clock
                size={17}
                style={{
                  color: GOLD,
                }}
              />

              <h3 className="text-sm font-semibold text-[#101A2E]/85">
                Duration
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-[#101A2E]/50">
                  Days *
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.duration.days}
                  onChange={(event) =>
                    updateDuration("days", event.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-[#101A2E]/50">
                  Nights *
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.duration.nights}
                  onChange={(event) =>
                    updateDuration("nights", event.target.value)
                  }
                  className="admin-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-medium text-[#101A2E]/50">
                  Duration Label *
                </label>

                <input
                  type="text"
                  value={form.duration.label}
                  readOnly
                  placeholder="8 Days / 7 Nights"
                  className="admin-input cursor-not-allowed"
                />

                <p className="mt-1.5 text-xs text-[#101A2E]/40">
                  Automatically generated from the number of days and nights.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin
                  size={17}
                  style={{
                    color: GOLD,
                  }}
                />

                <h3 className="text-sm font-semibold text-[#101A2E]/85">
                  Route
                </h3>
              </div>

              <button
                type="button"
                onClick={addRoute}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#101A2E]/70 hover:text-[#8B6D24]"
              >
                <Plus size={15} />
                Add Stop
              </button>
            </div>

            <div className="space-y-3">
              {form.route.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      updateRoute(index, event.target.value)
                    }
                    placeholder={`Stop ${index + 1} — Jaipur`}
                    className="admin-input"
                  />

                  <button
                    type="button"
                    onClick={() => removeRoute(index)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {!form.route.length && (
                <button
                  type="button"
                  onClick={addRoute}
                  className="w-full rounded-xl border border-dashed border-[#101A2E]/20 py-4 text-sm font-medium text-[#101A2E]/45 hover:border-[#101A2E]/35 hover:text-[#101A2E]/70"
                >
                  + Add first route stop
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
                Section 03
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
                Tour Highlights
              </h2>
            </div>

            <button
              type="button"
              onClick={addHighlight}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#F4EFE4] hover:bg-[#C9A24B] hover:text-[#101A2E]"
              style={{
                backgroundColor: NAVY,
              }}
            >
              <Plus size={15} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {form.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(event) =>
                    updateHighlight(index, event.target.value)
                  }
                  placeholder="Visit the Taj Mahal at sunrise"
                  className="admin-input"
                />

                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
                Section 04
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
                Day-by-Day Itinerary
              </h2>

              <p className="mt-1 text-sm text-[#101A2E]/55">
                Build the complete itinerary for the package.
              </p>
            </div>

            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#F4EFE4] shadow-sm transition-all duration-200 hover:bg-[#C9A24B] hover:text-[#101A2E]"
              style={{
                backgroundColor: NAVY,
              }}
            >
              <Plus size={15} />
              Add Day
            </button>
          </div>

          <div className="space-y-5">
            {form.itinerary.map((item, index) => (
              <div
                key={index}
                ref={(element) => {
                  itinerarySectionRefs.current[index] = element;
                }}
                className={`
                  rounded-2xl
                  border
                  p-4
                  transition-all
                  duration-500
                  sm:p-5
                  ${
                    newItineraryDay === index
                      ? "border-[#C9A24B] bg-[#FFF9EC] shadow-[0_0_0_4px_rgba(201,162,75,0.12),0_15px_40px_rgba(16,26,46,0.08)]"
                      : "border-[#101A2E]/8"
                  }
                `}
                style={{
                  backgroundColor:
                    newItineraryDay === index ? undefined : "#F5F7F6",
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        font-bold
                        transition-all
                        duration-300
                        ${
                          newItineraryDay === index
                            ? "scale-110 bg-[#C9A24B] text-[#101A2E] shadow-lg"
                            : "bg-[#101A2E] text-[#C9A24B]"
                        }
                      `}
                    >
                      {item.day}
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-[#101A2E]/85">
                        Day {item.day}
                      </span>

                      {newItineraryDay === index && (
                        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C9A24B]">
                          New day added
                        </p>
                      )}
                    </div>
                  </div>

                  {form.itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#101A2E]/50">
                      Day Title *
                    </label>

                    <input
                      ref={(element) => {
                        itineraryTitleRefs.current[index] = element;
                      }}
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        updateItinerary(index, "title", event.target.value)
                      }
                      placeholder="Arrival in Delhi"
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#101A2E]/50">
                      Description *
                    </label>

                    <textarea
                      rows={5}
                      value={item.description}
                      onChange={(event) =>
                        updateItinerary(
                          index,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Describe the activities, sightseeing and travel planned for this day..."
                      className="admin-input resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-500">
                  Included
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
                  Inclusions
                </h2>
              </div>

              <button
                type="button"
                onClick={addInclusion}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
              >
                <Plus size={17} />
              </button>
            </div>

            <div className="space-y-3">
              {form.inclusions.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Check size={16} />
                  </div>

                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      updateInclusion(index, event.target.value)
                    }
                    placeholder="Daily breakfast"
                    className="admin-input"
                  />

                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
                  Not Included
                </p>

                <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
                  Exclusions
                </h2>
              </div>

              <button
                type="button"
                onClick={addExclusion}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Plus size={17} />
              </button>
            </div>

            <div className="space-y-3">
              {form.exclusions.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <X size={16} />
                  </div>

                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      updateExclusion(index, event.target.value)
                    }
                    placeholder="International flights"
                    className="admin-input"
                  />

                  <button
                    type="button"
                    onClick={() => removeExclusion(index)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
                Organization
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
                Also Under
              </h2>

              <p className="mt-1 text-sm text-[#101A2E]/55">
                Select additional categories where this package should appear.
              </p>
            </div>

            <button
              type="button"
              onClick={addAlsoUnder}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#F4EFE4] hover:bg-[#C9A24B] hover:text-[#101A2E]"
              style={{
                backgroundColor: NAVY,
              }}
            >
              <Plus size={15} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {form.alsoUnder.map((item, index) => {
              const availableCategories = categories.filter(
                (category) =>
                  category.id !== form.categorySlug &&
                  (!form.alsoUnder.includes(category.id) ||
                    category.id === item),
              );

              return (
                <div key={index} className="flex gap-2">
                  <select
                    value={item}
                    onChange={(event) =>
                      updateAlsoUnder(index, event.target.value)
                    }
                    disabled={categoriesLoading}
                    className="admin-input"
                  >
                    <option value="">Select additional category</option>

                    {availableCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => removeAlsoUnder(index)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}

            {!form.alsoUnder.length && (
              <div className="rounded-xl border border-dashed border-[#101A2E]/20 px-4 py-5 text-center text-sm text-[#101A2E]/40">
                No additional categories added.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
              Visibility & Promotion
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
              Package Flags
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#101A2E]/10 bg-[#F5F7F6] p-4 transition-colors hover:border-[#C9A24B]/50">
              <input
                type="checkbox"
                checked={form.mostLoved}
                onChange={(event) =>
                  updateField("mostLoved", event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-[#C9A24B]"
              />

              <div>
                <p className="text-sm font-semibold text-[#101A2E]">
                  Most Loved
                </p>

                <p className="mt-1 text-xs text-[#101A2E]/50">
                  Mark this package as a customer-favourite package.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#101A2E]/10 bg-[#F5F7F6] p-4 transition-colors hover:border-[#C9A24B]/50">
              <input
                type="checkbox"
                checked={form.specialPackage}
                onChange={(event) =>
                  updateField("specialPackage", event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-[#C9A24B]"
              />

              <div>
                <p className="text-sm font-semibold text-[#101A2E]">
                  Special Package
                </p>

                <p className="mt-1 text-xs text-[#101A2E]/50">
                  Mark this package as a special/promotional package.
                </p>
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#101A2E]/8 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#101A2E]/35">
              Section 08
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[#101A2E]">
              Package Images
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                field: "thumbnail",
                label: "Thumbnail",
                cta: "Upload thumbnail",
                preview: thumbnailPreview,
              },
              {
                field: "heroImage",
                label: "Hero Image",
                cta: "Upload hero image",
                preview: heroImagePreview,
              },
            ].map((upload) => {
              const file = form[upload.field];

              return (
                <div key={upload.field}>
                  <label className="mb-2 block text-sm font-medium text-[#101A2E]/75">
                    {upload.label}
                  </label>

                  <label
                    className="group relative block min-h-44 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-colors duration-200 hover:border-[#C9A24B]"
                    style={{
                      borderColor: "rgba(16,26,46,0.15)",
                      backgroundColor: "#F5F7F6",
                    }}
                  >
                    {upload.preview ? (
                      <>
                        <img
                          src={upload.preview}
                          alt={`${upload.label} preview`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#101A2E]/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <Upload
                            size={26}
                            className="mb-2 text-white"
                          />

                          <p className="text-sm font-semibold text-white">
                            Click to replace
                          </p>

                          {file && (
                            <p className="mt-1 max-w-[85%] truncate text-xs text-white/70">
                              {file.name}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex min-h-44 flex-col items-center justify-center px-5 text-center">
                        <ImageIcon
                          size={28}
                          className="mb-2 text-[#101A2E]/30"
                        />

                        <p className="text-sm font-semibold text-[#101A2E]/75">
                          {upload.cta}
                        </p>

                        <p className="mt-1 text-xs text-[#101A2E]/40">
                          PNG, JPG or WEBP
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      onChange={(event) =>
                        handleFileChange(upload.field, event)
                      }
                      className="hidden"
                    />
                  </label>

                  {file && (
                    <p className="mt-2 truncate text-xs text-[#101A2E]/45">
                      {file.name}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-[#101A2E]/8 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={submitting}
            onClick={() => navigate("/tour-packages")}
            className="rounded-xl border border-[#101A2E]/12 px-5 py-3 text-sm font-semibold text-[#101A2E]/75 hover:bg-[#101A2E]/[0.05] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[#F4EFE4] cursor-pointer shadow-sm hover:bg-[#C9A24B] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: NAVY,
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Package...
              </>
            ) : (
              <>
                <Check size={18} />
                Create Tour Package
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .admin-input {
          width: 100%;
          border: 1px solid rgba(16, 26, 46, 0.12);
          border-radius: 0.75rem;
          background: #F5F7F6;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #101A2E;
          outline: none;
          transition: all 150ms ease;
        }

        .admin-input::placeholder {
          color: rgba(16, 26, 46, 0.35);
        }

        .admin-input:focus {
          border-color: #C9A24B;
          background: white;
          box-shadow: 0 0 0 3px rgba(201, 162, 75, 0.16);
        }

        .admin-input:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        select.admin-input {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
