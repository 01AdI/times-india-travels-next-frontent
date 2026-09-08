import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Loader2,
  Save,
  Upload,
  Video,
  X,
  RefreshCw,
} from "lucide-react";

import {
  getAdminHero,
  updateAdminHero,
} from "../../services/adminApi";

// ============================================================
// ADMIN HOME HERO EDIT
// ============================================================

export default function AdminHomeHeroEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================================
  // REFS
  // ==========================================================

  const fileInputRef = useRef(null);
  const errorRef = useRef(null);

  // ==========================================================
  // STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    place: "",
    line: "",
    mediaType: "image",
    mediaUrl: "",
    active: true,
    order: 0,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // ==========================================================
  // SCROLL TO ERROR
  // ==========================================================

  useEffect(() => {
    if (!error || !errorRef.current) {
      return;
    }

    errorRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [error]);

  // ==========================================================
  // FETCH HERO SLIDE
  // ==========================================================

  const fetchHero = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        throw new Error("Hero slide ID is missing.");
      }

      const response = await getAdminHero(id);

      const hero = response?.data;

      if (!hero) {
        throw new Error("Hero slide not found.");
      }

      setForm({
        place: hero.place || "",

        line: hero.line || "",

        mediaType:
          hero.mediaType || "image",

        mediaUrl:
          hero.mediaUrl || "",

        active:
          hero.active === undefined
            ? true
            : Boolean(hero.active),

        order:
          hero.order === undefined
            ? 0
            : hero.order,
      });

      setError("");
    } catch (err) {
      console.error(
        "Failed to fetch hero slide:",
        err
      );

      setError(
        err.message ||
          "Unable to load the hero slide."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    fetchHero();
  }, [id]);

  // ==========================================================
  // CLEAN PREVIEW URL
  // ==========================================================

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // MEDIA TYPE CHANGE
  // ==========================================================

  const handleMediaTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      mediaType: type,
    }));

    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // FILE CHANGE
  // ==========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const expectedType =
      form.mediaType === "image"
        ? "image/"
        : "video/";

    if (!file.type.startsWith(expectedType)) {
      setError(
        `Please select a valid ${form.mediaType} file.`
      );

      event.target.value = "";
      return;
    }

    // --------------------------------------------------------
    // OPTIONAL SIZE VALIDATION
    // --------------------------------------------------------

    if (
      form.mediaType === "image" &&
      file.size > 5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5MB."
      );

      event.target.value = "";
      return;
    }

    setError("");
    setSuccess("");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const localPreview =
      URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(localPreview);
  };

  // ==========================================================
  // REMOVE SELECTED FILE
  // ==========================================================

  const removeSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.place.trim()) {
      setError("Place is required.");
      return;
    }

    if (!form.line.trim()) {
      setError("Hero line is required.");
      return;
    }

    if (
      form.mediaType !== "image" &&
      form.mediaType !== "video"
    ) {
      setError(
        "Media must be either an image or video."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await updateAdminHero(id, {
        place: form.place.trim(),

        line: form.line.trim(),

        mediaType: form.mediaType,

        media:
          selectedFile || undefined,

          mediaUrl: selectedFile
          ? undefined
          : form.mediaUrl.trim() || undefined,

        active: form.active,

        order: Number(form.order),
      });

      const updatedHero = response?.data;

      if (updatedHero) {
        setForm((prev) => ({
          ...prev,

          place:
            updatedHero.place ??
            prev.place,

          line:
            updatedHero.line ??
            prev.line,

          mediaType:
            updatedHero.mediaType ??
            prev.mediaType,

          mediaUrl:
            updatedHero.mediaUrl ??
            prev.mediaUrl,

          active:
            updatedHero.active ??
            prev.active,

          order:
            updatedHero.order ??
            prev.order,
        }));
      }

      // ======================================================
      // CLEAN FILE PREVIEW
      // ======================================================

      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess(
        response?.message ||
          "Hero slide updated successfully."
      );

      // ======================================================
      // REDIRECT
      // ======================================================

      setTimeout(() => {
        navigate("/home-hero");
      }, 900);
    } catch (err) {
      console.error(
        "Failed to update hero slide:",
        err
      );

      setError(
        err.message ||
          "Unable to update the hero slide."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // ACTIVE PREVIEW
  // ==========================================================

  const activePreview =
    previewUrl || form.mediaUrl;

  // ==========================================================
  // MEDIA PREVIEW
  // ==========================================================

  const renderMediaPreview = () => {
    if (!activePreview) {
      return (
        <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 bg-slate-100 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
            {form.mediaType === "video" ? (
              <Video
                size={28}
                className="text-slate-400"
              />
            ) : (
              <ImageIcon
                size={28}
                className="text-slate-400"
              />
            )}
          </div>

          <div>
            <p className="font-medium text-slate-700">
              No media available
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Upload media or provide a URL.
            </p>
          </div>
        </div>
      );
    }

    if (form.mediaType === "video") {
      return (
        <video
          key={activePreview}
          src={activePreview}
          controls
          muted
          playsInline
          className="h-full min-h-[320px] w-full object-cover"
        />
      );
    }

    return (
      <img
        key={activePreview}
        src={activePreview}
        alt={
          form.place ||
          "Homepage hero preview"
        }
        className="h-full min-h-[320px] w-full object-cover"
      />
    );
  };

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f8] p-6 lg:p-10">
        <div className="mx-auto flex max-w-7xl items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              size={30}
              className="animate-spin text-[#124d56]"
            />

            <p className="text-sm text-slate-500">
              Loading hero slide...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // LOAD ERROR STATE
  // ==========================================================

  if (error && !form.place && !form.line) {
    return (
      <div className="min-h-screen bg-[#f5f7f8] p-6 lg:p-10">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/home-hero"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#124d56]"
          >
            <ArrowLeft size={17} />

            Back to Home Hero
          </Link>

          <div
            ref={errorRef}
            className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <X
                  size={18}
                  className="text-red-500"
                />
              </div>

              <div>
                <p className="font-semibold text-red-600">
                  Unable to load hero slide
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchHero}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  <RefreshCw size={14} />

                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#f5f7f8]">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <Link
                to="/home-hero"
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#124d56]"
              >
                <ArrowLeft size={16} />

                Back to Home Hero
              </Link>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f58634]">
                  Homepage Experience
                </p>

                <h1 className="text-3xl font-semibold tracking-tight text-[#0b3c49]">
                  Edit Hero Slide
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Refine the visual and messaging used
                  in the homepage hero experience.
                </p>
              </div>
            </div>

            {/* STATUS */}

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
                form.active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  form.active
                    ? "bg-emerald-500"
                    : "bg-slate-400"
                }`}
              />

              {form.active
                ? "Live on homepage"
                : "Currently inactive"}
            </div>

          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">

        {/* ====================================================
            ALERTS
        ==================================================== */}

        {error && (
          <div
            ref={errorRef}
            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p>{error}</p>

              {error.toLowerCase().includes("load") && (
                <button
                  type="button"
                  onClick={fetchHero}
                  className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-red-700 underline"
                >
                  <RefreshCw size={12} />

                  Try again
                </button>
              )}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            <Check
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">

            {/* ==================================================
                LEFT — FORM
            ================================================== */}

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f58634]">
                  Slide Content
                </p>

                <h2 className="mt-2 text-xl font-semibold text-[#0b3c49]">
                  Hero information
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Keep the headline concise and visually
                  strong for the homepage.
                </p>
              </div>

              <div className="space-y-6">

                {/* PLACE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Place
                  </label>

                  <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="Rajasthan"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    The destination or place shown above
                    the hero message.
                  </p>
                </div>

                {/* LINE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Hero line
                  </label>

                  <textarea
                    name="line"
                    value={form.line}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Where every journey becomes a story."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    The primary message displayed over
                    the hero media.
                  </p>
                </div>

                {/* MEDIA TYPE */}

                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    Media type
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleMediaTypeChange(
                          "image"
                        )
                      }
                      className={`flex items-center justify-center gap-3 rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
                        form.mediaType === "image"
                          ? "border-[#124d56] bg-[#124d56] text-white shadow-lg shadow-[#124d56]/15"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <ImageIcon size={18} />

                      Image
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleMediaTypeChange(
                          "video"
                        )
                      }
                      className={`flex items-center justify-center gap-3 rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
                        form.mediaType === "video"
                          ? "border-[#124d56] bg-[#124d56] text-white shadow-lg shadow-[#124d56]/15"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <Video size={18} />

                      Video
                    </button>

                  </div>
                </div>

                {/* MEDIA URL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Media URL

                    <span className="ml-2 font-normal text-slate-400">
                      Optional
                    </span>
                  </label>

                  <input
                    type="url"
                    name="mediaUrl"
                    value={form.mediaUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#124d56] focus:bg-white focus:ring-4 focus:ring-[#124d56]/10"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Change this only if you want to use
                    a different external media URL.
                  </p>
                </div>

                {/* UPLOAD */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Replace media
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={
                      form.mediaType === "image"
                        ? "image/*"
                        : "video/*"
                    }
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {!selectedFile ? (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-sm font-medium text-slate-600 transition hover:border-[#124d56]/40 hover:bg-[#124d56]/5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Upload
                          size={19}
                          className="text-[#124d56] transition group-hover:-translate-y-0.5"
                        />
                      </span>

                      <span className="text-left">
                        <span className="block font-semibold text-slate-700">
                          Upload new{" "}
                          {form.mediaType}
                        </span>

                        <span className="mt-1 block text-xs text-slate-400">
                          Click to browse your device
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-2xl border border-[#124d56]/15 bg-[#124d56]/5 p-4">

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                            {form.mediaType ===
                            "video" ? (
                              <Video
                                size={18}
                                className="text-[#124d56]"
                              />
                            ) : (
                              <ImageIcon
                                size={18}
                                className="text-[#124d56]"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-700">
                              {selectedFile.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {(
                                selectedFile.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={
                            removeSelectedFile
                          }
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 transition hover:text-red-500"
                        >
                          <X size={17} />
                        </button>

                      </div>

                    </div>
                  )}
                </div>

                {/* ORDER + ACTIVE */}

                <div className="grid gap-5 sm:grid-cols-2">

                 <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Display order
                    </label>

                    <input
                      type="number"
                      value={form.order}
                      readOnly
                      tabIndex={-1}
                      className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-500 outline-none"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Automatically assigned. Lower numbers appear first.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Visibility
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          active: !prev.active,
                        }))
                      }
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 transition ${
                        form.active
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          form.active
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {form.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                      <span
                        className={`relative h-6 w-11 rounded-full transition ${
                          form.active
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                            form.active
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </span>
                    </button>
                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <Link
                  to="/home-hero"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#124d56] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#124d56]/15 transition hover:bg-[#0b3c49] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      Save changes
                    </>
                  )}
                </button>

              </div>

            </section>

            {/* ==================================================
                RIGHT — PREVIEW
            ================================================== */}

            <section className="lg:sticky lg:top-6 lg:self-start">

              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f58634]">
                      Live Preview
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-[#0b3c49]">
                      Homepage hero
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium capitalize text-slate-500">
                    {form.mediaType ===
                    "video" ? (
                      <Video size={14} />
                    ) : (
                      <ImageIcon size={14} />
                    )}

                    {form.mediaType}
                  </div>

                </div>

                <div className="p-4 lg:p-5">

                  <div className="group relative overflow-hidden rounded-[22px] bg-[#0b3c49]">

                    <div className="relative aspect-[16/10] overflow-hidden">

                      {renderMediaPreview()}

                      {activePreview && (
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061f26]/90 via-[#061f26]/25 to-transparent" />
                      )}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f58634]">
                          {form.place ||
                            "Destination"}
                        </p>

                        <h3 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                          {form.line ||
                            "Your hero message will appear here."}
                        </h3>

                      </div>

                      <div className="absolute right-4 top-4">

                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
                            form.active
                              ? "border-white/20 bg-emerald-500/90 text-white"
                              : "border-white/20 bg-black/40 text-white"
                          }`}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              form.active
                                ? "bg-white"
                                : "bg-slate-300"
                            }`}
                          />

                          {form.active
                            ? "Live"
                            : "Hidden"}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* PREVIEW DETAILS */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-400">
                        Media
                      </p>

                      <p className="mt-1 text-sm font-semibold capitalize text-slate-700">
                        {form.mediaType}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-medium text-slate-400">
                        Position
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        #{form.order}
                      </p>
                    </div>

                  </div>

                  {/* CURRENT MEDIA */}

                  {activePreview && (
                    <div className="mt-3 rounded-2xl bg-slate-50 p-4">

                      <p className="text-xs font-medium text-slate-400">
                        Current media
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-slate-600">
                        {selectedFile
                          ? selectedFile.name
                          : form.mediaUrl}
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* EDITING NOTE */}

              <div className="mt-4 rounded-2xl border border-[#f58634]/15 bg-[#f58634]/5 p-5">

                <p className="text-sm font-semibold text-[#0b3c49]">
                  Media replacement
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Uploading a new image or video will
                  replace the existing media on this hero
                  slide. If you do not upload a file or
                  change the URL, the existing media remains
                  unchanged.
                </p>

              </div>

            </section>

          </div>

        </form>

      </main>

    </div>
  );
}