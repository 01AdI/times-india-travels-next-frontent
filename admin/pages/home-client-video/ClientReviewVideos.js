import { useEffect, useState } from "react";

import {
  AlertCircle,
  Check,
  Edit3,
  ExternalLink,
  Film,
  Link as LinkIcon,
  Loader2,
  MapPin,
  MoreVertical,
  Play,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";

import {
  createClientReviewVideo,
  deleteClientReviewVideo,
  getAdminClientReviewVideos,
  updateClientReviewVideo,
} from "../../services/adminApi";

// ============================================================
// CLIENT REVIEW VIDEOS
// ============================================================

export default function ClientReviewVideos() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [previewVideo, setPreviewVideo] = useState(null);

  const [videoInputType, setVideoInputType] =
    useState("upload");

  // Object URL generated for a locally-selected file so it
  // can be previewed inside the form before saving.
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    tour: "",
    video: "",
    videoFile: null,
    active: true,
  });

  // ==========================================================
  // LOAD VIDEOS
  // ==========================================================

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminClientReviewVideos();

      const data =
        response?.data ||
        response?.videos ||
        response?.clientReviewVideos ||
        [];

      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {

      setError(
        err.message ||
          "Unable to load client review videos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // ==========================================================
  // FORM VIDEO PREVIEW (object URL for uploaded files)
  // ==========================================================

  useEffect(() => {
    if (!form.videoFile) {
      setFilePreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(
      form.videoFile
    );

    setFilePreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [form.videoFile]);

  // Resolves what should actually be shown in the form's
  // preview player: a freshly selected file, a pasted URL,
  // or (when editing) the video already saved on the record.
  const formPreviewSrc =
    videoInputType === "upload"
      ? filePreviewUrl ||
        (editingVideo ? editingVideo.video : null)
      : form.video.trim() ||
        (editingVideo ? editingVideo.video : null);

  // ==========================================================
  // ALERTS
  // ==========================================================

  const clearAlerts = () => {
    setError("");
    setSuccess("");
  };

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setForm({
      name: "",
      location: "",
      tour: "",
      video: "",
      videoFile: null,
      active: true,
    });

    setVideoInputType("upload");
  };

  // ==========================================================
  // OPEN CREATE
  // ==========================================================

  const openCreateForm = () => {
    clearAlerts();

    setEditingVideo(null);

    resetForm();

    setShowForm(true);

    setOpenMenu(null);
  };

  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const openEditForm = (video) => {
    clearAlerts();

    setEditingVideo(video);

    setForm({
      name: video.name || "",
      location: video.location || "",
      tour: video.tour || "",
      video: video.video || "",
      videoFile: null,
      active: video.active !== false,
    });

    setVideoInputType("url");

    setShowForm(true);

    setOpenMenu(null);
  };

  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const closeForm = () => {
    if (saving) {
      return;
    }

    setShowForm(false);

    setEditingVideo(null);

    resetForm();
  };

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================================
  // VIDEO FILE CHANGE
  // ==========================================================

  const handleVideoFileChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("video/")) {
      setError(
        "Please select a valid video file."
      );

      event.target.value = "";

      return;
    }

    setError("");

    setForm((prev) => ({
      ...prev,
      videoFile: file,
      video: "",
    }));
  };

  // ==========================================================
  // CHANGE VIDEO INPUT TYPE
  // ==========================================================

  const handleVideoInputTypeChange = (
    type
  ) => {
    setVideoInputType(type);

    setForm((prev) => ({
      ...prev,
      video: "",
      videoFile: null,
    }));

    clearAlerts();
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearAlerts();

    if (!form.name.trim()) {
      setError(
        "Client name is required."
      );

      return;
    }

    if (!form.location.trim()) {
      setError(
        "Client location is required."
      );

      return;
    }

    if (!editingVideo) {
      if (
        videoInputType === "upload" &&
        !form.videoFile
      ) {
        setError(
          "Please select a video file."
        );

        return;
      }

      if (
        videoInputType === "url" &&
        !form.video.trim()
      ) {
        setError(
          "Please enter a video URL."
        );

        return;
      }
    }

    try {
      setSaving(true);

      // ======================================================
      // CREATE
      // ======================================================

      if (!editingVideo) {
        await createClientReviewVideo({
          name: form.name.trim(),

          location: form.location.trim(),

          tour: form.tour.trim(),

          video:
            videoInputType === "upload"
              ? form.videoFile
              : form.video.trim(),

          active: form.active,
        });

        setSuccess(
          "Client review video added successfully."
        );
      }

      // ======================================================
      // UPDATE
      // ======================================================

      else {
        const updateData = {
          name: form.name.trim(),

          location: form.location.trim(),

          tour: form.tour.trim(),

          active: form.active,
        };

        // Only send video when the admin
        // actually wants to replace it.

        if (videoInputType === "upload") {
          if (form.videoFile) {
            updateData.video =
              form.videoFile;
          }
        } else if (
          form.video.trim() &&
          form.video.trim() !==
            editingVideo.video
        ) {
          updateData.video =
            form.video.trim();
        }

        await updateClientReviewVideo(
          editingVideo._id ||
            editingVideo.id,
          updateData
        );

        setSuccess(
          "Client review video updated successfully."
        );
      }

      closeForm();

      await loadVideos();
    } catch (err) {
      setError(
        err.message ||
          "Unable to save client review video."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // OPEN DELETE
  // ==========================================================

  const openDeleteConfirmation = (
    video
  ) => {
    clearAlerts();

    setOpenMenu(null);

    setDeleteTarget(video);
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);

      clearAlerts();

      await deleteClientReviewVideo(
        deleteTarget._id ||
          deleteTarget.id
      );

      setDeleteTarget(null);

      setSuccess(
        "Client review video deleted successfully."
      );

      await loadVideos();
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete client review video."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Never";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Never";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================================
  // VIDEO COUNT
  // ==========================================================

  const activeCount = videos.filter(
    (video) => video.active !== false
  ).length;

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-[#F2FAFB]">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-[#F2FAFB]">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A24B]">
                Social Proof
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#101A2E]">
                Client Review Videos
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F7782]">
                Manage the client video testimonials
                displayed across your website.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#101A2E] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#101A2E]/15 transition hover:bg-[#18253D]"
            >
              <Plus size={18} />
              Add Review Video
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* ALERT */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            <Check
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{success}</p>

            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ====================================================
            SUMMARY
        ==================================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* TOTAL */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Total reviews
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#101A2E]">
                  {videos.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101A2E]/10">
                <Film
                  size={22}
                  className="text-[#101A2E]"
                />
              </div>
            </div>
          </div>

          {/* ACTIVE */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Active videos
                </p>

                <p className="mt-2 text-3xl font-semibold text-emerald-600">
                  {activeCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <Check
                  size={22}
                  className="text-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* INACTIVE */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Inactive videos
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-500">
                  {videos.length -
                    activeCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                <Film
                  size={22}
                  className="text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            VIDEO LIST
        ==================================================== */}

          <section className="relative rounded-[28px] border border-slate-200 bg-white shadow-sm">
            {/* SECTION HEADER */}

          <div className="border-b border-slate-100 px-6 py-5 lg:px-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#101A2E]">
                  Client Testimonials
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Video reviews shown to website
                  visitors.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                {videos.length}{" "}
                {videos.length === 1
                  ? "review"
                  : "reviews"}
              </span>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  size={28}
                  className="animate-spin text-[#101A2E]"
                />

                <p className="text-sm text-slate-500">
                  Loading client reviews...
                </p>
              </div>
            </div>
          ) : videos.length === 0 ? (
            /* EMPTY */

            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Film
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-5 font-semibold text-slate-700">
                No client review videos
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-400">
                Add your first client video
                testimonial to display it on the
                website.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                Add Review Video
              </button>
            </div>
          ) : (
            /* LIST */

            <div className="divide-y divide-slate-100">
              {videos.map((video) => {
                const videoId =
                  video._id ||
                  video.id;

                const isActive =
                  video.active !== false;

                return (
                  <div
                    key={videoId}
                    className="group flex flex-col gap-5 px-6 py-5 transition hover:bg-slate-50/70 lg:px-7"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      {/* VIDEO + INFO */}

                      <div className="flex min-w-0 items-center gap-4">
                        {/* VIDEO THUMBNAIL */}

                        <button
                          type="button"
                          onClick={() =>
                            setPreviewVideo(
                              video
                            )
                          }
                          className="group/video relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-[#101A2E]"
                        >
                          <video
                            src={video.video}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />

                          <span className="absolute inset-0 flex items-center justify-center bg-[#101A2E]/30 opacity-0 transition group-hover/video:opacity-100">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#101A2E]">
                              <Play
                                size={15}
                                fill="currentColor"
                              />
                            </span>
                          </span>
                        </button>

                        {/* INFO */}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {video.name ||
                                "Unnamed Client"}
                            </p>

                            <span
                              className={[
                                "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                                isActive
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-500",
                              ].join(" ")}
                            >
                              {isActive
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin
                                size={13}
                              />

                              {video.location ||
                                "Location not provided"}
                            </span>

                            {video.tour && (
                              <span className="inline-flex items-center gap-1.5">
                                <Film
                                  size={13}
                                />

                                {video.tour}
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-[11px] text-slate-400">
                            Added{" "}
                            {formatDate(
                              video.createdAt
                            )}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="relative flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewVideo(
                              video
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#101A2E]/30 hover:bg-[#101A2E]/5 hover:text-[#101A2E]"
                        >
                          <Play size={15} />
                          Preview
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              video
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#101A2E]/30 hover:bg-[#101A2E]/5 hover:text-[#101A2E]"
                        >
                          <Edit3 size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteConfirmation(
                              video
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2
                            size={15}
                          />
                          Delete
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                videoId
                                ? null
                                : videoId
                            )
                          }
                          className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:text-slate-700 lg:flex"
                        >
                          <MoreVertical
                            size={17}
                          />
                        </button>

                        {openMenu ===
                          videoId && (
                          <div className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewVideo(
                                  video
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                            >
                              <Play
                                size={15}
                              />
                              Preview
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(
                                  video
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                            >
                              <Edit3
                                size={15}
                              />
                              Edit video
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openDeleteConfirmation(
                                  video
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              <Trash2
                                size={15}
                              />
                              Delete video
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* ======================================================
          CREATE / EDIT MODAL
      ====================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06121B]/55 p-4 backdrop-blur-sm">
          <div
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]">
                  {editingVideo
                    ? "Testimonial"
                    : "New testimonial"}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#101A2E]">
                  {editingVideo
                    ? "Edit Review Video"
                    : "Add Review Video"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add the client's details and
                  testimonial video.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition hover:text-slate-700 disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-6"
            >
              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Client name
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    disabled={saving}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, India"
                    disabled={saving}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* TOUR */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tour visited
                  <span className="ml-2 font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <input
                  type="text"
                  name="tour"
                  value={form.tour}
                  onChange={handleChange}
                  placeholder="e.g. Golden Triangle Tour"
                  disabled={saving}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                />
              </div>

              {/* VIDEO SOURCE */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700">
                    Review video
                  </label>

                  {editingVideo && (
                    <span className="text-xs text-slate-400">
                      Optional when editing
                    </span>
                  )}
                </div>

                {/* SOURCE SWITCH */}

                <div className="mb-3 flex rounded-2xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleVideoInputTypeChange(
                        "upload"
                      )
                    }
                    disabled={saving}
                    className={[
                      "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition",
                      videoInputType ===
                      "upload"
                        ? "bg-white text-[#101A2E] shadow-sm"
                        : "text-slate-500 hover:text-slate-700",
                    ].join(" ")}
                  >
                    <Film size={15} />
                    Upload Video
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleVideoInputTypeChange(
                        "url"
                      )
                    }
                    disabled={saving}
                    className={[
                      "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition",
                      videoInputType ===
                      "url"
                        ? "bg-white text-[#101A2E] shadow-sm"
                        : "text-slate-500 hover:text-slate-700",
                    ].join(" ")}
                  >
                    <LinkIcon
                      size={15}
                    />
                    Video URL
                  </button>
                </div>

                {/* UPLOAD */}

                {videoInputType ===
                  "upload" && (
                  <div>
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center transition hover:border-[#101A2E]/30 hover:bg-white">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101A2E]/10">
                        <Film
                          size={22}
                          className="text-[#101A2E]"
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        {form.videoFile
                          ? form.videoFile
                              .name
                          : "Choose a video"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        MP4, WebM, MOV and
                        other supported video
                        formats
                      </p>

                      <input
                        type="file"
                        accept="video/*"
                        onChange={
                          handleVideoFileChange
                        }
                        disabled={saving}
                        className="hidden"
                      />
                    </label>

                    {editingVideo &&
                      form.video && (
                        <p className="mt-2 text-xs text-slate-400">
                          Leave the file empty to
                          keep the existing video.
                        </p>
                      )}
                  </div>
                )}

                {/* URL */}

                {videoInputType ===
                  "url" && (
                  <div className="relative">
                    <LinkIcon
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="url"
                      name="video"
                      value={form.video}
                      onChange={handleChange}
                      placeholder="https://example.com/video.mp4"
                      disabled={saving}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                    />

                    {editingVideo &&
                      form.video ===
                        editingVideo.video && (
                        <p className="mt-2 text-xs text-slate-400">
                          Leave this unchanged to
                          keep the current video.
                        </p>
                      )}
                  </div>
                )}

                {/* PREVIEW */}

                <div className="mt-3">
                  {formPreviewSrc ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
                      <video
                        key={formPreviewSrc}
                        src={formPreviewSrc}
                        controls
                        playsInline
                        preload="metadata"
                        className="max-h-64 w-full bg-black"
                      />
                    </div>
                  ) : (
                    <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
                      <Play
                        size={18}
                        className="text-slate-300"
                      />
                      <p className="text-xs text-slate-400">
                        {videoInputType ===
                        "upload"
                          ? "Select a video to preview it here"
                          : "Enter a video URL to preview it here"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIVE */}

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Display on website
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Inactive reviews will not be
                    displayed publicly.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-5 w-5 accent-[#101A2E]"
                />
              </label>

              {/* ACTIONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#101A2E] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#101A2E]/15 transition hover:bg-[#18253D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      {editingVideo
                        ? "Saving..."
                        : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingVideo ? (
                        <Check size={16} />
                      ) : (
                        <Plus size={16} />
                      )}

                      {editingVideo
                        ? "Save Changes"
                        : "Add Review Video"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================
          VIDEO PREVIEW
      ====================================================== */}

      {previewVideo && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center bg-[#06121B]/80 p-4 backdrop-blur-sm"
          onClick={() =>
            setPreviewVideo(null)
          }
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-black shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setPreviewVideo(null)
              }
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            >
              <X size={18} />
            </button>

            {/* VIDEO */}

            <video
              src={previewVideo.video}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-full bg-black"
            />

            {/* INFO */}

            <div className="bg-white px-6 py-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-[#101A2E]">
                    {previewVideo.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {previewVideo.location}
                    </span>

                    {previewVideo.tour && (
                      <span>
                        {previewVideo.tour}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={previewVideo.video}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <ExternalLink
                    size={14}
                  />
                  Open video
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          DELETE CONFIRMATION
      ====================================================== */}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#06121B]/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <Trash2
                size={21}
                className="text-red-600"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#101A2E]">
              Delete review video?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to permanently remove{" "}
              <span className="font-semibold text-slate-700">
                {deleteTarget.name}
              </span>{" "}
              from the client testimonials.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={deleting}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}