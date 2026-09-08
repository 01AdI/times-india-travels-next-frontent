import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  MapPin,
  X,
  Navigation,
  Compass,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  createAdminTourCategory,
  getAdminDestinations,
} from "../../services/adminApi";

export default function AdminTourCategoryCreate() {
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    tagline: "",
    description: "",
    showInNavbar: true,
    showInExplore: true,
  });

  const [heroImage, setHeroImage] = useState(null);
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroImagePreview, setHeroImagePreview] = useState("");

  const [destinations, setDestinations] = useState([]);
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  const [gallery, setGallery] = useState([]);
  const [galleryUrl, setGalleryUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!error) return;

    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [error]);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setDestinationsLoading(true);
        setError("");

        const response = await getAdminDestinations();

        setAvailableDestinations(
          Array.isArray(response?.destinations)
            ? response.destinations
            : []
        );
      } catch (err) {
        console.error("Failed to load destinations:", err);

        setError(
          err.message || "Unable to load destinations."
        );
      } finally {
        setDestinationsLoading(false);
      }
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    return () => {
      if (heroImagePreview) {
        URL.revokeObjectURL(heroImagePreview);
      }
    };
  }, [heroImagePreview]);

  useEffect(() => {
    return () => {
      gallery.forEach((item) => {
        if (item.type === "file" && item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [gallery]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (error) {
      setError("");
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addDestination = (destinationId) => {
    if (!destinationId) {
      return;
    }

    if (destinations.includes(destinationId)) {
      return;
    }

    setDestinations((prev) => [
      ...prev,
      destinationId,
    ]);
  };

  const removeDestination = (destinationId) => {
    setDestinations((prev) =>
      prev.filter((id) => id !== destinationId)
    );
  };

  const handleHeroImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (heroImagePreview) {
      URL.revokeObjectURL(heroImagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setHeroImage(file);
    setHeroImagePreview(previewUrl);
    setHeroImageUrl("");
    setError("");

    event.target.value = "";
  };

  const removeHeroImage = () => {
    if (heroImagePreview) {
      URL.revokeObjectURL(heroImagePreview);
    }

    setHeroImage(null);
    setHeroImagePreview("");
  };

  const handleHeroImageUrlChange = (event) => {
    const value = event.target.value;

    setHeroImageUrl(value);

    if (value) {
      if (heroImagePreview) {
        URL.revokeObjectURL(heroImagePreview);
      }

      setHeroImage(null);
      setHeroImagePreview("");
    }

    setError("");
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) {
      return;
    }

    setGallery((prev) => {
      const remaining = 15 - prev.length;

      if (remaining <= 0) {
        return prev;
      }

      const newItems = files
        .slice(0, remaining)
        .map((file) => ({
          type: "file",
          file,
          url: "",
          caption: "",
          preview: URL.createObjectURL(file),
        }));

      return [...prev, ...newItems];
    });

    setError("");
    event.target.value = "";
  };

  const addGalleryUrl = () => {
    const url = galleryUrl.trim();

    if (!url) {
      setError("Please enter a gallery image URL.");
      return;
    }

    if (gallery.length >= 15) {
      setError(
        "A maximum of 15 gallery images is allowed."
      );
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        throw new Error();
      }
    } catch {
      setError("Please enter a valid image URL.");
      return;
    }

    if (
      gallery.some(
        (item) =>
          item.type === "url" &&
          item.url === url
      )
    ) {
      setError(
        "This gallery image URL has already been added."
      );
      return;
    }

    setGallery((prev) => [
      ...prev,
      {
        type: "url",
        file: null,
        url,
        caption: "",
        preview: url,
      },
    ]);

    setGalleryUrl("");
    setError("");
  };

  const removeGalleryImage = (index) => {
    setGallery((prev) => {
      const image = prev[index];

      if (
        image?.type === "file" &&
        image.preview
      ) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter(
        (_, itemIndex) => itemIndex !== index
      );
    });
  };

  const updateGalleryCaption = (
    index,
    caption
  ) => {
    setGallery((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              caption,
            }
          : item
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    const categoryId = form.id
      .trim()
      .toLowerCase();

    const categoryName = form.name.trim();
    const categoryTagline = form.tagline.trim();
    const categoryDescription =
      form.description.trim();

    if (!categoryId) {
      setError("Category ID is required.");
      return;
    }

    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    if (!categoryTagline) {
      setError("Category tagline is required.");
      return;
    }

    if (!categoryDescription) {
      setError("Category description is required.");
      return;
    }

    try {
      setLoading(true);

      const galleryFiles = gallery
        .filter((item) => item.type === "file")
        .map((item) => item.file);

      const galleryImageUrls = gallery
        .filter((item) => item.type === "url")
        .map((item) => ({
          url: item.url,
          caption: item.caption?.trim() || "",
        }));

      const galleryCaptions = gallery
        .filter((item) => item.type === "file")
        .map(
          (item) =>
            item.caption?.trim() || ""
        );

      const response =
        await createAdminTourCategory({
          id: categoryId,
          name: categoryName,
          tagline: categoryTagline,
          description: categoryDescription,
          showInNavbar: form.showInNavbar,
          showInExplore: form.showInExplore,
          heroImage:
            heroImage instanceof File
              ? heroImage
              : heroImageUrl.trim() || "",
          destinations,
          galleryImages: galleryFiles,
          galleryCaptions,
          galleryImageUrls,
        });

      setSuccess(
        response?.message ||
          "Tour category created successfully."
      );

      setTimeout(() => {
        navigate(
          `/tour-categories/${categoryId}`
        );
      }, 700);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create tour category."
      );

      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() =>
              navigate("/tour-categories")
            }
            disabled={loading}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Back to Categories
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Tour Category
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Create Category
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new tour category and connect it
            with destinations and gallery images.
          </p>
        </div>
      </div>

      {error && (
        <div
          ref={errorRef}
          role="alert"
          className="scroll-mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="min-w-0">
            <p className="font-semibold">
              Unable to create category
            </p>

            <p className="mt-1 wrap-break-word">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-auto shrink-0 text-red-400 transition hover:text-red-700"
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Define the identity and content of this tour
              category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category ID
              </label>

              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="e.g. rajasthan-tours"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                This becomes the category slug/ID.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rajasthan Tours"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tagline
              </label>

              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Discover the royal heritage of Rajasthan"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe this tour category..."
                disabled={loading}
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Visibility
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose where this tour category should
              appear on the website.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label
              className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition ${
                form.showInNavbar
                  ? "border-orange-200 bg-orange-50/50"
                  : "border-slate-200 bg-slate-50"
              } ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                name="showInNavbar"
                checked={form.showInNavbar}
                onChange={handleChange}
                disabled={loading}
                className="sr-only"
              />

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                  form.showInNavbar
                    ? "bg-orange-100 text-orange-600"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                <Navigation size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Show in Navbar
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Display this category in the main
                      website navigation.
                    </p>
                  </div>

                  <div
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      form.showInNavbar
                        ? "bg-orange-500"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.showInNavbar
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>

                <p
                  className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    form.showInNavbar
                      ? "text-orange-600"
                      : "text-slate-400"
                  }`}
                >
                  {form.showInNavbar
                    ? "Visible in navigation"
                    : "Hidden from navigation"}
                </p>
              </div>
            </label>

            <label
              className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition ${
                form.showInExplore
                  ? "border-teal-200 bg-teal-50/50"
                  : "border-slate-200 bg-slate-50"
              } ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                name="showInExplore"
                checked={form.showInExplore}
                onChange={handleChange}
                disabled={loading}
                className="sr-only"
              />

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                  form.showInExplore
                    ? "bg-teal-100 text-teal-600"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                <Compass size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Show in Explore
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Display this category when users
                      explore all tour categories.
                    </p>
                  </div>

                  <div
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      form.showInExplore
                        ? "bg-teal-500"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        form.showInExplore
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>

                <p
                  className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    form.showInExplore
                      ? "text-teal-600"
                      : "text-slate-400"
                  }`}
                >
                  {form.showInExplore
                    ? "Visible in explore"
                    : "Hidden from explore"}
                </p>
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Hero Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload an image or provide a Cloudinary/
              external image URL.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Upload Image
              </label>

              {!heroImagePreview ? (
                <label
                  className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-slate-300 hover:bg-slate-100 ${
                    loading
                      ? "pointer-events-none opacity-60"
                      : ""
                  }`}
                >
                  <Upload
                    size={25}
                    className="text-slate-400"
                  />

                  <span className="mt-2 text-sm font-semibold text-slate-700">
                    Choose hero image
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG or WebP
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageChange}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="relative h-56">
                    <img
                      src={heroImagePreview}
                      alt="Hero preview"
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeHeroImage}
                      disabled={loading}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {heroImage?.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Hero image selected
                      </p>
                    </div>

                    <label className="shrink-0 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-900">
                      Change

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageChange}
                        disabled={loading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Or Image URL
              </label>

              <input
                type="url"
                value={heroImageUrl}
                onChange={handleHeroImageUrlChange}
                placeholder="https://..."
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              {heroImageUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={heroImageUrl}
                    alt="Hero preview"
                    className="h-56 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Destinations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select destinations belonging to this
              category.
            </p>
          </div>

          {destinationsLoading ? (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2
                size={17}
                className="animate-spin"
              />
              Loading destinations...
            </div>
          ) : (
            <>
              <select
                value=""
                onChange={(event) =>
                  addDestination(
                    event.target.value
                  )
                }
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                <option value="">
                  Select a destination to add
                </option>

                {availableDestinations
                  .filter(
                    (destination) =>
                      !destinations.includes(
                        destination.id
                      )
                  )
                  .map((destination) => (
                    <option
                      key={destination.id}
                      value={destination.id}
                    >
                      {destination.name ||
                        destination.id}
                    </option>
                  ))}
              </select>

              {destinations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {destinations.map(
                    (destinationId) => {
                      const destination =
                        availableDestinations.find(
                          (item) =>
                            item.id ===
                            destinationId
                        );

                      return (
                        <div
                          key={destinationId}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          <MapPin size={13} />

                          {destination?.name ||
                            destinationId}

                          <button
                            type="button"
                            onClick={() =>
                              removeDestination(
                                destinationId
                              )
                            }
                            disabled={loading}
                            className="text-slate-400 transition hover:text-red-500 disabled:opacity-50"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Destination Gallery
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add up to 15 gallery images using uploads
                or external image URLs.
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
              {gallery.length} / 15
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <LinkIcon
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="url"
                  value={galleryUrl}
                  onChange={(event) =>
                    setGalleryUrl(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      event.preventDefault();
                      addGalleryUrl();
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  disabled={
                    loading ||
                    gallery.length >= 15
                  }
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              <button
                type="button"
                onClick={addGalleryUrl}
                disabled={
                  loading ||
                  gallery.length >= 15
                }
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Add URL
              </button>
            </div>

            <label
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${
                loading ||
                gallery.length >= 15
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <Upload size={16} />
              Upload Images

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                disabled={
                  loading ||
                  gallery.length >= 15
                }
                className="hidden"
              />
            </label>
          </div>

          {gallery.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <ImageIcon
                size={28}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-600">
                No gallery images added
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Upload images or add image URLs above.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map(
                (item, index) => (
                  <div
                    key={`${item.type}-${item.url || item.file?.name}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="relative h-40 bg-slate-100">
                      <img
                        src={item.preview}
                        alt={`Gallery ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <div className="absolute left-2 top-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm ${
                            item.type === "file"
                              ? "bg-black/60"
                              : "bg-orange-500/90"
                          }`}
                        >
                          {item.type === "file" ? (
                            <Upload size={11} />
                          ) : (
                            <LinkIcon size={11} />
                          )}

                          {item.type === "file"
                            ? "Upload"
                            : "URL"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeGalleryImage(
                            index
                          )
                        }
                        disabled={loading}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600 disabled:opacity-50"
                        aria-label={`Remove gallery image ${
                          index + 1
                        }`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="p-3">
                      <p className="mb-2 truncate text-xs font-medium text-slate-500">
                        {item.type === "file"
                          ? item.file?.name
                          : item.url}
                      </p>

                      <input
                        type="text"
                        value={item.caption}
                        onChange={(event) =>
                          updateGalleryCaption(
                            index,
                            event.target.value
                          )
                        }
                        placeholder="Image caption (optional)"
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate("/tour-categories")
            }
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {loading
              ? "Creating..."
              : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
}