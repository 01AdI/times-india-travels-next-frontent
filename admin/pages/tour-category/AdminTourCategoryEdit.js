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
  Save,
  Eye,
  Compass,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminTourCategory,
  updateAdminTourCategory,
  updateTourCategoryGalleryCaption,
  getAdminDestinations,
} from "../../services/adminApi";

export default function AdminTourCategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const errorRef = useRef(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    tagline: "",
    description: "",
    showInNavbar: false,
    showInExplore: false,
  });

  const [existingHeroImage, setExistingHeroImage] = useState("");
  const [heroImage, setHeroImage] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  const [destinations, setDestinations] = useState([]);
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  const [existingGallery, setExistingGallery] = useState([]);
  const [removedGalleryImageIds, setRemovedGalleryImageIds] = useState([]);

  const [newGallery, setNewGallery] = useState([]);

  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryUrlPreview, setGalleryUrlPreview] = useState("");
  const [galleryUrlError, setGalleryUrlError] = useState("");

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!error || !errorRef.current) return;

    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [error]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setInitialLoading(true);
        setError("");

        const response = await getAdminTourCategory(id);

        const category =
          response?.category ||
          response?.data?.category ||
          response?.data ||
          response;

        if (!category) {
          throw new Error("Tour category data was not returned.");
        }

        setForm({
          id: category.id || category._id || id || "",
          name: category.name || "",
          tagline: category.tagline || "",
          description: category.description || "",
          showInNavbar: Boolean(category.showInNavbar),
          showInExplore: Boolean(category.showInExplore),
        });

        const hero = category.heroImage || "";

        setExistingHeroImage(hero);
        setHeroImageUrl(hero);
        setHeroImage(null);
        setHeroImagePreview("");

        const categoryDestinations = Array.isArray(
          category.destinations
        )
          ? category.destinations
          : [];

        const destinationIds = categoryDestinations
          .map((destination) => {
            if (typeof destination === "string") {
              return destination;
            }

            return destination?.id || destination?._id || null;
          })
          .filter(Boolean);

        setDestinations(destinationIds);

        const gallery = Array.isArray(category.destinations_gallery)
          ? category.destinations_gallery
          : [];

        setExistingGallery(
          gallery.map((item) => ({
            id: item?._id || item?.id || null,
            url: item?.url || "",
            caption: item?.caption || "",
            originalCaption: item?.caption || "",
            publicId: item?.publicId || null,
          }))
        );

        setRemovedGalleryImageIds([]);
        setNewGallery([]);
      } catch (err) {
        console.error("Failed to load tour category:", err);

        setError(
          err?.message || "Unable to load tour category."
        );
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id]);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setDestinationsLoading(true);

        const response = await getAdminDestinations();

        setAvailableDestinations(
          Array.isArray(response?.destinations)
            ? response.destinations
            : []
        );
      } catch (err) {
        console.error("Failed to load destinations:", err);

        setError(
          err?.message || "Unable to load destinations."
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
      newGallery.forEach((item) => {
        if (
          item?.type === "upload" &&
          item?.preview
        ) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleToggleChange = (name) => {
    setForm((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setError("");
    setSuccess("");
  };

  const addDestination = (destinationId) => {
    if (!destinationId) return;

    if (destinations.includes(destinationId)) return;

    setDestinations((prev) => [...prev, destinationId]);

    setError("");
    setSuccess("");
  };

  const removeDestination = (destinationId) => {
    setDestinations((prev) =>
      prev.filter((item) => item !== destinationId)
    );

    setError("");
    setSuccess("");
  };

  const handleHeroImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
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
    setSuccess("");

    event.target.value = "";
  };

  const removeHeroImage = () => {
    if (heroImagePreview) {
      URL.revokeObjectURL(heroImagePreview);
    }

    setHeroImage(null);
    setHeroImagePreview("");
    setHeroImageUrl(existingHeroImage || "");

    setError("");
    setSuccess("");
  };

  const handleHeroUrlChange = (event) => {
    const value = event.target.value;

    setHeroImageUrl(value);

    if (value.trim()) {
      if (heroImagePreview) {
        URL.revokeObjectURL(heroImagePreview);
      }

      setHeroImage(null);
      setHeroImagePreview("");
    }

    setError("");
    setSuccess("");
  };

  const updateExistingGalleryCaption = (index, caption) => {
    setExistingGallery((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              caption,
            }
          : item
      )
    );

    setError("");
    setSuccess("");
  };

  const removeExistingGalleryImage = (index) => {
    const image = existingGallery[index];

    if (!image) return;

    if (
      image.id &&
      !removedGalleryImageIds.includes(image.id)
    ) {
      setRemovedGalleryImageIds((prev) => [
        ...prev,
        image.id,
      ]);
    }

    setExistingGallery((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    );

    setError("");
    setSuccess("");
  };

  const totalGalleryImages =
    existingGallery.length + newGallery.length;

  const remainingGallerySlots =
    15 - totalGalleryImages;

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const remaining =
      15 -
      existingGallery.length -
      newGallery.length;

    if (remaining <= 0) {
      setError(
        "A maximum of 15 gallery images is allowed."
      );

      event.target.value = "";
      return;
    }

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!imageFiles.length) {
      setError("Please select valid image files.");
      event.target.value = "";
      return;
    }

    const filesToAdd = imageFiles.slice(0, remaining);

    const newItems = filesToAdd.map((file) => ({
      type: "upload",
      file,
      caption: "",
      preview: URL.createObjectURL(file),
    }));

    setNewGallery((prev) => [...prev, ...newItems]);

    if (imageFiles.length > remaining) {
      setError(
        `Only ${remaining} image${
          remaining === 1 ? "" : "s"
        } could be added. Maximum gallery size is 15 images.`
      );
    } else {
      setError("");
    }

    setSuccess("");
    event.target.value = "";
  };

  const handleGalleryUrlChange = (event) => {
    const value = event.target.value;

    setGalleryUrl(value);
    setGalleryUrlError("");

    if (!value.trim()) {
      setGalleryUrlPreview("");
      return;
    }

    setGalleryUrlPreview(value.trim());
  };

  const addGalleryUrl = () => {
    const url = galleryUrl.trim();

    if (!url) {
      setGalleryUrlError("Please enter an image URL.");
      return;
    }

    if (remainingGallerySlots <= 0) {
      setGalleryUrlError(
        "A maximum of 15 gallery images is allowed."
      );
      return;
    }

    try {
      new URL(url);
    } catch {
      setGalleryUrlError(
        "Please enter a valid image URL."
      );
      return;
    }

    const duplicate =
      newGallery.some(
        (item) =>
          item.type === "url" &&
          item.url === url
      ) ||
      existingGallery.some(
        (item) => item.url === url
      );

    if (duplicate) {
      setGalleryUrlError(
        "This image URL has already been added."
      );
      return;
    }

    setNewGallery((prev) => [
      ...prev,
      {
        type: "url",
        url,
        preview: url,
        caption: "",
      },
    ]);

    setGalleryUrl("");
    setGalleryUrlPreview("");
    setGalleryUrlError("");

    setError("");
    setSuccess("");
  };

  const removeNewGalleryImage = (index) => {
    setNewGallery((prev) => {
      const image = prev[index];

      if (
        image?.type === "upload" &&
        image?.preview
      ) {
        URL.revokeObjectURL(image.preview);
      }

      return prev.filter(
        (_, itemIndex) => itemIndex !== index
      );
    });

    setError("");
    setSuccess("");
  };

  const updateNewGalleryCaption = (index, caption) => {
    setNewGallery((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              caption,
            }
          : item
      )
    );

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (!form.tagline.trim()) {
      setError("Category tagline is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Category description is required.");
      return;
    }

    const totalImages =
      existingGallery.length +
      newGallery.length;

    if (totalImages > 15) {
      setError(
        "A maximum of 15 gallery images is allowed."
      );
      return;
    }

    let heroImagePayload;

    if (heroImage instanceof File) {
      heroImagePayload = heroImage;
    } else if (
      heroImageUrl.trim() !==
      existingHeroImage.trim()
    ) {
      heroImagePayload = heroImageUrl.trim();
    } else {
      heroImagePayload = undefined;
    }

    const galleryUploadItems =
      newGallery.filter(
        (item) =>
          item.type === "upload" &&
          item.file instanceof File
      );

    const galleryUploadImages =
      galleryUploadItems.map(
        (item) => item.file
      );

    const galleryUploadCaptions =
      galleryUploadItems.map(
        (item) =>
          item.caption?.trim() || ""
      );

    const galleryUrlItems =
      newGallery.filter(
        (item) =>
          item.type === "url"
      );

    const galleryUrls =
      galleryUrlItems.map(
        (item) => item.url
      );

    const galleryUrlCaptions =
      galleryUrlItems.map(
        (item) =>
          item.caption?.trim() || ""
      );

    try {
      setLoading(true);

      const response =
        await updateAdminTourCategory(
          id,
          {
            name: form.name.trim(),
            tagline: form.tagline.trim(),
            description: form.description.trim(),
            showInNavbar: Boolean(form.showInNavbar),
            showInExplore: Boolean(form.showInExplore),
            heroImage: heroImagePayload,
            destinations,
            galleryImages: galleryUploadImages,
            galleryCaptions: galleryUploadCaptions,
            galleryUrls,
            galleryUrlCaptions,
            removeGalleryImageIds:
              removedGalleryImageIds,
          }
        );

      const captionUpdates =
        existingGallery
          .filter(
            (item) =>
              item.id &&
              item.caption.trim() !==
                item.originalCaption.trim()
          )
          .map((item) =>
            updateTourCategoryGalleryCaption(
              id,
              item.id,
              item.caption.trim()
            )
          );

      if (captionUpdates.length > 0) {
        await Promise.all(captionUpdates);
      }

      setSuccess(
        response?.message ||
          "Tour category updated successfully."
      );

      setTimeout(() => {
        navigate(
          `/tour-categories/${id}`
        );
      }, 700);
    } catch (err) {
      console.error(
        "Failed to update tour category:",
        err
      );

      setError(
        err?.message ||
          "Unable to update tour category."
      );

      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <Loader2
            size={20}
            className="animate-spin"
          />
          Loading tour category...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/tour-categories/${id}`
            )
          }
          disabled={loading}
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={16} />
          Back to Category
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          Tour Category
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Edit Category
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update category information,
          destinations, visibility and
          destination gallery.
        </p>
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

          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              Unable to update category
            </p>

            <p className="mt-1 wrap-break-word">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 text-red-400 transition hover:text-red-700"
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
              Update the identity and
              content of this tour
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
                value={form.id}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Category ID cannot be
                changed.
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
              Control where this tour
              category appears on the
              website.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                handleToggleChange(
                  "showInNavbar"
                )
              }
              disabled={loading}
              className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                form.showInNavbar
                  ? "border-orange-200 bg-orange-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    form.showInNavbar
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Eye size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    Show in Navbar
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-slate-500">
                    Display this category in
                    the website navigation
                    menu.
                  </p>
                </div>
              </div>

              <span
                className={`relative ml-4 h-6 w-11 shrink-0 rounded-full transition ${
                  form.showInNavbar
                    ? "bg-orange-500"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    form.showInNavbar
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleToggleChange(
                  "showInExplore"
                )
              }
              disabled={loading}
              className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                form.showInExplore
                  ? "border-orange-200 bg-orange-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    form.showInExplore
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Compass size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    Show in Explore
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-slate-500">
                    Display this category in
                    the Explore section.
                  </p>
                </div>
              </div>

              <span
                className={`relative ml-4 h-6 w-11 shrink-0 rounded-full transition ${
                  form.showInExplore
                    ? "bg-orange-500"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    form.showInExplore
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </span>
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Hero Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Replace the existing image
              or provide a new image URL.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image
              </label>

              <div className="overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
                <div className="relative h-56">
                  {heroImagePreview ? (
                    <>
                      <img
                        src={heroImagePreview}
                        alt="New hero preview"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
                        <p className="truncate text-xs font-semibold text-white">
                          New hero image
                        </p>

                        <p className="mt-0.5 truncate text-xs text-white/70">
                          {heroImage?.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={removeHeroImage}
                        disabled={loading}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Remove new hero image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : existingHeroImage ? (
                    <>
                      <img
                        src={existingHeroImage}
                        alt="Current hero"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
                        <p className="text-xs font-semibold text-white">
                          Current hero image
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                      <Upload
                        size={28}
                        className="text-slate-400"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        No hero image
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Upload an image using
                        the button below.
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 bg-white p-3">
                  <label
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 ${
                      loading
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <Upload size={15} />

                    {heroImage
                      ? "Change Image"
                      : existingHeroImage
                        ? "Replace Image"
                        : "Choose Image"}

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
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <input
                type="url"
                value={heroImageUrl}
                onChange={handleHeroUrlChange}
                placeholder="https://..."
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              {heroImageUrl && (
                <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <img
                    src={heroImageUrl}
                    alt="Hero URL preview"
                    className="h-56 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Entering a URL removes any
                selected upload.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Destinations
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage destinations belonging
              to this category.
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
                  Select a destination
                  to add
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
                            aria-label={`Remove ${
                              destination?.name ||
                              destinationId
                            }`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {destinations.length === 0 && (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center">
                  <MapPin
                    size={24}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    No destinations
                    selected
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Select destinations
                    from the dropdown
                    above.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Destination Gallery
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add gallery images using
                uploads or image URLs.
              </p>
            </div>

            <label
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 ${
                loading ||
                remainingGallerySlots <= 0
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <Upload size={15} />
              Upload Images

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                disabled={
                  loading ||
                  remainingGallerySlots <= 0
                }
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Gallery Images
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {totalGalleryImages} / 15
              </p>
            </div>

            <ImageIcon
              size={20}
              className="text-slate-400"
            />
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <LinkIcon
                size={16}
                className="text-slate-500"
              />

              <p className="text-sm font-bold text-slate-700">
                Add Image URL
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="url"
                value={galleryUrl}
                onChange={handleGalleryUrlChange}
                placeholder="https://example.com/image.jpg"
                disabled={
                  loading ||
                  remainingGallerySlots <= 0
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <button
                type="button"
                onClick={addGalleryUrl}
                disabled={
                  loading ||
                  remainingGallerySlots <= 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={15} />
                Add URL
              </button>
            </div>

            {galleryUrlError && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {galleryUrlError}
              </p>
            )}

            {galleryUrlPreview && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative h-48">
                  <img
                    src={galleryUrlPreview}
                    alt="Gallery URL preview"
                    className="h-full w-full object-cover"
                    onError={() => {
                      setGalleryUrlError(
                        "Unable to load this image URL. Please check the URL."
                      );
                    }}
                    onLoad={() => {
                      setGalleryUrlError("");
                    }}
                  />
                </div>

                <div className="border-t border-slate-200 px-3 py-2">
                  <p className="truncate text-xs text-slate-500">
                    {galleryUrlPreview}
                  </p>
                </div>
              </div>
            )}

            <p className="mt-2 text-[11px] text-slate-400">
              You can mix uploaded images
              and external image URLs.
            </p>
          </div>

          {existingGallery.length > 0 && (
            <div className="mt-7">
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Existing Images
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {existingGallery.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        `${item.url}-${index}`
                      }
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="relative h-40 bg-slate-100">
                        {item.url ? (
                          <img
                            src={item.url}
                            alt={
                              item.caption ||
                              `Gallery ${
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

                        <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Existing
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeExistingGalleryImage(
                              index
                            )
                          }
                          disabled={loading}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Remove gallery image ${
                            index + 1
                          }`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-slate-500">
                            Existing gallery
                            image
                          </p>

                          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                            {item.publicId
                              ? "Cloudinary"
                              : "External URL"}
                          </span>
                        </div>

                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                          Caption
                        </label>

                        <input
                          type="text"
                          value={item.caption}
                          onChange={(event) =>
                            updateExistingGalleryCaption(
                              index,
                              event.target.value
                            )
                          }
                          placeholder="Image caption (optional)"
                          disabled={loading}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                        />

                        {item.caption.trim() !==
                          item.originalCaption.trim() && (
                          <p className="mt-1.5 text-[11px] font-medium text-orange-500">
                            Caption modified
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {newGallery.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-500">
                  New Images
                </p>

                <p className="text-xs font-medium text-slate-400">
                  Uploads + URLs
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {newGallery.map(
                  (item, index) => (
                    <div
                      key={
                        item.type ===
                        "upload"
                          ? `${item.file.name}-${item.file.lastModified}-${index}`
                          : `${item.url}-${index}`
                      }
                      className="overflow-hidden rounded-xl border border-orange-200 bg-white"
                    >
                      <div className="relative h-40 bg-slate-100">
                        <img
                          src={item.preview}
                          alt={
                            item.caption ||
                            `New gallery ${
                              index + 1
                            }`
                          }
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            if (
                              item.type ===
                              "url"
                            ) {
                              event.currentTarget.style.display =
                                "none";
                            }
                          }}
                        />

                        <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          {item.type ===
                          "upload"
                            ? "Upload"
                            : "URL"}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeNewGalleryImage(
                              index
                            )
                          }
                          disabled={loading}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={`Remove new gallery image ${
                            index + 1
                          }`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="p-3">
                        {item.type ===
                        "upload" ? (
                          <p className="mb-2 truncate text-xs font-medium text-slate-500">
                            {item.file?.name}
                          </p>
                        ) : (
                          <p className="mb-2 truncate text-xs font-medium text-slate-500">
                            {item.url}
                          </p>
                        )}

                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                          Caption
                        </label>

                        <input
                          type="text"
                          value={item.caption}
                          onChange={(event) =>
                            updateNewGalleryCaption(
                              index,
                              event.target.value
                            )
                          }
                          placeholder="Image caption (optional)"
                          disabled={loading}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:bg-slate-50"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {existingGallery.length === 0 &&
            newGallery.length === 0 && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                <ImageIcon
                  size={28}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No gallery images
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Upload images or add
                  image URLs above.
                </p>
              </div>
            )}
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/tour-categories/${id}`
              )
            }
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              loading ||
              initialLoading
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Save size={17} />
            )}

            {loading
              ? "Saving Changes..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}