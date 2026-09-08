import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";

import {
  createAdminDestination,
} from "../../services/adminApi";

export default function AdminDestinationCreate() {
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [heroImage, setHeroImage] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [imageUrlError, setImageUrlError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    tagline: "",
    description: "",
  });

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
    return () => {
      if (heroImagePreview) {
        URL.revokeObjectURL(heroImagePreview);
      }
    };
  }, [heroImagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleHeroImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Hero image must be smaller than 5MB.");
      return;
    }

    if (heroImagePreview) {
      URL.revokeObjectURL(heroImagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setHeroImage(file);
    setHeroImagePreview(previewUrl);

    setHeroImageUrl("");
    setImageUrlError(false);

    setError("");
    setSuccess("");
  };

    const handleHeroImageUrlChange = (event) => {
    const value = event.target.value;

    setHeroImageUrl(value);
    setImageUrlError(false);

    if (value.trim()) {
      setHeroImage(null);

      if (heroImagePreview) {
        URL.revokeObjectURL(heroImagePreview);
      }

      setHeroImagePreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    setError("");
    setSuccess("");
  };

  const handleRemoveHeroImage = () => {
    setHeroImage(null);

    if (heroImagePreview) {
      URL.revokeObjectURL(heroImagePreview);
    }

    setHeroImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
  };

  const handleRemoveHeroImageUrl = () => {
    setHeroImageUrl("");
    setImageUrlError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.id.trim()) {
      setError("Destination ID is required.");
      return;
    }

    if (!form.name.trim()) {
      setError("Destination name is required.");
      return;
    }

    if (!form.tagline.trim()) {
      setError("Destination tagline is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Destination description is required.");
      return;
    }

    if (!heroImage && !heroImageUrl.trim()) {
      setError("Please upload a hero image or provide an image URL.");
      return;
    }

    try {
      setLoading(true);

      let selectedHeroImage;

      if (heroImage instanceof File) {
        selectedHeroImage = heroImage;
      } else if (heroImageUrl.trim()) {
        selectedHeroImage = heroImageUrl.trim();
      }

      const response = await createAdminDestination({
        id: form.id.trim(),
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        heroImage: selectedHeroImage,
      });

      setSuccess(
        response.message || "Destination created successfully."
      );

      setTimeout(() => {
        navigate(
          `/destinations/${form.id.trim().toLowerCase()}`
        );
      }, 700);
    } catch (err) {
      setError(
        err.message || "Unable to create destination."
      );
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
            onClick={() => navigate("/destinations")}
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-500
              transition
              hover:text-slate-900
            "
          >
            <ArrowLeft size={16} />

            Back to Destinations
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
            Destination
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Create Destination
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new travel destination with its description
            and hero image.
          </p>

        </div>

      </div>

      {error && (
        <div
          ref={errorRef}
          role="alert"
          className="
            scroll-mt-6
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>

            <p className="font-semibold">
              Unable to create destination
            </p>

            <p className="mt-1">
              {error}
            </p>

          </div>
        </div>
      )}

      {success && (
        <div className="
          rounded-xl
          border
          border-emerald-200
          bg-emerald-50
          p-4
          text-sm
          font-medium
          text-emerald-700
        ">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <section className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        ">

          <div className="mb-6">

            <h2 className="text-base font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Define the identity and content of this destination.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* DESTINATION ID */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination ID
              </label>

              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="e.g. jaipur"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />

              <p className="mt-1.5 text-xs text-slate-400">
                This becomes the permanent destination ID.
              </p>

            </div>

            {/* DESTINATION NAME */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jaipur"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />

            </div>

            {/* TAGLINE */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tagline
              </label>

              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="The Pink City of royal Rajasthan"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Describe this destination..."
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  leading-6
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />

            </div>

          </div>

        </section>

        <section className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        ">

          <div className="mb-6">

            <h2 className="text-base font-bold text-slate-900">
              Hero Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload an image or provide a Cloudinary / external
              image URL.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Upload Image
              </label>

              <div className="relative">

                <label
                  htmlFor="destination-hero-upload"
                  className="
                    flex
                    min-h-48
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-slate-200
                    bg-slate-50
                    px-6
                    text-center
                    transition
                    hover:border-slate-300
                    hover:bg-slate-100
                  "
                >

                  <Upload
                    size={26}
                    className="text-slate-400"
                  />

                  <span className="mt-2 text-sm font-semibold text-slate-700">
                    Choose destination image
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG or WebP · Max 5MB
                  </span>

                  <input
                    ref={fileInputRef}
                    id="destination-hero-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleHeroImageChange}
                    className="hidden"
                  />

                </label>

              </div>

              {/* UPLOADED IMAGE PREVIEW */}

              {heroImagePreview && (
                <div className="mt-4">

                  <div className="
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-100
                  ">

                    <img
                      src={heroImagePreview}
                      alt="Uploaded destination hero preview"
                      className="
                        h-56
                        w-full
                        object-cover
                      "
                    />

                    {/* IMAGE OVERLAY */}

                    <div className="
                      absolute
                      inset-x-0
                      bottom-0
                      flex
                      items-center
                      justify-between
                      gap-3
                      bg-black/55
                      px-4
                      py-3
                      backdrop-blur-sm
                    ">

                      <div className="min-w-0">

                        <p className="truncate text-xs font-medium text-white">
                          {heroImage?.name}
                        </p>

                        {heroImage && (
                          <p className="mt-0.5 text-[10px] text-white/65">
                            {(heroImage.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        )}

                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveHeroImage}
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-white/15
                          text-white
                          transition
                          hover:bg-red-500
                        "
                        aria-label="Remove uploaded image"
                      >
                        <X size={15} />
                      </button>

                    </div>

                  </div>

                  <p className="mt-2 text-xs text-emerald-600">
                    Image selected successfully.
                  </p>

                </div>
              )}

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Or Image URL
              </label>

              <div className="relative">

                <input
                  type="url"
                  value={heroImageUrl}
                  onChange={handleHeroImageUrlChange}
                  placeholder="https://..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    pr-11
                    text-sm
                    outline-none
                    transition
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

                {heroImageUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveHeroImageUrl}
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-7
                      w-7
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      text-slate-400
                      transition
                      hover:bg-slate-100
                      hover:text-red-500
                    "
                    aria-label="Clear image URL"
                  >
                    <X size={14} />
                  </button>
                )}

              </div>

              {/* URL PREVIEW */}

              {heroImageUrl.trim() && !imageUrlError && (
                <div className="
                  relative
                  mt-4
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-100
                ">

                  <img
                    src={heroImageUrl.trim()}
                    alt="Destination hero URL preview"
                    className="
                      h-56
                      w-full
                      object-cover
                    "
                    onError={() => {
                      setImageUrlError(true);
                    }}
                  />

                  <div className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-black/55
                    px-4
                    py-3
                    backdrop-blur-sm
                  ">

                    <p className="truncate text-xs font-medium text-white">
                      External image
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-white/60">
                      {heroImageUrl}
                    </p>

                  </div>

                </div>
              )}

              {/* URL ERROR */}

              {heroImageUrl.trim() && imageUrlError && (
                <div className="
                  mt-4
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                ">

                  <div className="flex items-start gap-3">

                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-red-500"
                    />

                    <div>

                      <p className="text-xs font-semibold text-red-700">
                        Unable to preview image
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-red-600/80">
                        Check that the URL points directly to a valid
                        image and is publicly accessible.
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* EMPTY PREVIEW */}

              {!heroImageUrl.trim() && !heroImagePreview && (
                <div className="
                  mt-4
                  flex
                  h-56
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                ">

                  <div className="text-center">

                    <ImageIcon
                      size={28}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Image preview will appear here
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

        </section>

        <div className="
          flex
          flex-col-reverse
          gap-3
          sm:flex-row
          sm:justify-end
        ">

          {/* CANCEL */}

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-200
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          {/* CREATE */}

          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-900
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {loading
              ? "Creating..."
              : "Create Destination"}

          </button>

        </div>

      </form>

    </div>
  );
}