import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import {
  getAdminDestination,
  updateAdminDestination,
} from "../../services/adminApi";

export default function AdminDestinationEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const errorRef = useRef(null);

  // ==========================================================
  // DESTINATION DATA
  // ==========================================================

  const [form, setForm] = useState({
    id: "",
    name: "",
    tagline: "",
    description: "",
  });

  const [heroImage, setHeroImage] = useState(null);
  const [heroImageUrl, setHeroImageUrl] = useState("");

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!error) return;
  
     // Wait until the error banner has been rendered
    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [error]);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setInitialLoading(true);
        setError("");

        const response = await getAdminDestination(id);

        const destination = response.destination;

        if (!destination) {
          throw new Error("Destination data was not returned.");
        }

        setForm({
          id: destination.id || "",
          name: destination.name || "",
          tagline: destination.tagline || "",
          description: destination.description || "",
        });

        setHeroImageUrl(destination.heroImage || "");
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
        setInitialLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);

  // ==========================================================
  // BASIC INPUT
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // HERO IMAGE
  // ==========================================================

  const handleHeroImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setHeroImage(file);

    // New file replaces the existing URL.
    setHeroImageUrl("");

    // Allow selecting the same file again.
    event.target.value = "";
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

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

    try {
      setLoading(true);

      // ------------------------------------------------------
      // UPDATE DATA
      // ------------------------------------------------------

      const updateData = {
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
      };

      // ------------------------------------------------------
      // HERO IMAGE
      // ------------------------------------------------------

      if (heroImage instanceof File) {
        updateData.heroImage = heroImage;
      } else if (heroImageUrl.trim()) {
        updateData.heroImage = heroImageUrl.trim();
      }

      // ------------------------------------------------------
      // API
      // ------------------------------------------------------

      const response =
        await updateAdminDestination(
          id,
          updateData
        );

      setSuccess(
        response.message ||
          "Destination updated successfully."
      );

      // ------------------------------------------------------
      // REDIRECT
      // ------------------------------------------------------

      setTimeout(() => {
        navigate(
          `/destinations/${id}`
        );
      }, 700);
    } catch (err) {
      
      setError(
        err.message ||
          "Unable to update destination."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL LOADING
  // ==========================================================

  if (initialLoading) {
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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate("/destinations")
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
            Edit Destination
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update destination information and its
            hero image.
          </p>

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
        ref={errorRef} 
        role="alert"
         className="scroll-mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Unable to update destination
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

        </div>
      )}

      {/* ======================================================
          SUCCESS
      ====================================================== */}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">

          <CheckCircle2 size={18} />

          {success}

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ====================================================
            BASIC INFORMATION
        ==================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-base font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the content of this destination.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* ==================================================
                DESTINATION ID
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination ID
              </label>

              <input
                type="text"
                value={form.id}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                This ID is permanent because it is referenced
                by tour categories.
              </p>

            </div>

            {/* ==================================================
                NAME
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rajasthan"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

            </div>

            {/* ==================================================
                TAGLINE
            ================================================== */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tagline
              </label>

              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Discover the royal land of Rajasthan"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

            </div>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

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
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

            </div>

          </div>

        </section>

        {/* ====================================================
            HERO IMAGE
        ==================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-base font-bold text-slate-900">
              Hero Image
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Replace the current image with a new upload
              or provide an external image URL.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* ==================================================
                CURRENT / UPLOAD
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Replace Image
              </label>

              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center transition hover:border-slate-300 hover:bg-slate-100">

                <Upload
                  size={25}
                  className="text-slate-400"
                />

                <span className="mt-2 text-sm font-semibold text-slate-700">
                  Choose new hero image
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  JPG, PNG or WebP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageChange}
                  className="hidden"
                />

              </label>

              {heroImage && (
                <p className="mt-2 truncate text-xs text-slate-500">
                  New image: {heroImage.name}
                </p>
              )}

            </div>

            {/* ==================================================
                IMAGE PREVIEW / URL
            ================================================== */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label>

              <input
                type="url"
                value={heroImageUrl}
                onChange={(event) => {
                  setHeroImageUrl(
                    event.target.value
                  );

                  if (event.target.value) {
                    setHeroImage(null);
                  }
                }}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              {heroImageUrl ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={heroImageUrl}
                    alt="Destination hero"
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : heroImage ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={URL.createObjectURL(heroImage)}
                    alt="New destination hero"
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-4 flex h-48 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-center">

                    <ImageIcon
                      size={28}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Current hero image
                    </p>

                  </div>
                </div>
              )}

            </div>

          </div>

        </section>

        {/* ====================================================
            ACTIONS
        ==================================================== */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/destinations/${id}`
              )
            }
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
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
              ? "Saving Changes..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </div>
  );
}
