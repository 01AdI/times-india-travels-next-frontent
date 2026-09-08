import { useEffect, useState } from "react";

import {
  AlertCircle,
  Check,
  Edit3,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  createClientGallery,
  deleteClientGallery,
  getAdminClientGallery,
  updateClientGallery,
} from "../../services/adminApi";

// ============================================================
// CLIENT GALLERY
// ============================================================

export default function ClientGallery() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [imageInputType, setImageInputType] =
    useState("upload");

  const [imagePreview, setImagePreview] =
    useState("");

  const [form, setForm] = useState({
    image: "",
    imageFile: null,
    title: "",
    place: "",
    active: true,
  });

  // ==========================================================
  // LOAD GALLERY
  // ==========================================================

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminClientGallery();

      const data =
        response?.data ||
        response?.gallery ||
        response?.clientGallery ||
        [];

      setGallery(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load client gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // ==========================================================
  // CLEANUP OBJECT URL
  // ==========================================================

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      image: "",
      imageFile: null,
      title: "",
      place: "",
      active: true,
    });

    setImageInputType("upload");
    setImagePreview("");
  };

  // ==========================================================
  // OPEN CREATE
  // ==========================================================

  const openCreateForm = () => {
    clearAlerts();

    setEditingItem(null);

    resetForm();

    setShowForm(true);

    setOpenMenu(null);
  };

  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const openEditForm = (item) => {
    clearAlerts();

    setEditingItem(item);

    setForm({
      image: item.image || "",
      imageFile: null,
      title: item.title || "",
      place: item.place || "",
      active: item.active !== false,
    });

    setImageInputType("url");

    setImagePreview(item.image || "");

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

    setEditingItem(null);

    resetForm();
  };

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    // --------------------------------------------------------
    // Live URL preview
    // --------------------------------------------------------

    if (
      name === "image" &&
      imageInputType === "url"
    ) {
      setImagePreview(value.trim());
    }
  };

  // ==========================================================
  // IMAGE FILE CHANGE
  // ==========================================================

  const handleImageFileChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      event.target.value = "";

      return;
    }

    clearAlerts();

    // --------------------------------------------------------
    // Revoke previous blob URL
    // --------------------------------------------------------

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      image: "",
    }));

    setImagePreview(previewUrl);
  };

  // ==========================================================
  // CHANGE IMAGE INPUT TYPE
  // ==========================================================

  const handleImageInputTypeChange = (
    type
  ) => {
    clearAlerts();

    setImageInputType(type);

    setForm((prev) => ({
      ...prev,
      image: "",
      imageFile: null,
    }));

    // --------------------------------------------------------
    // When editing:
    // Upload mode starts with existing image.
    // URL mode starts empty so admin can enter another URL.
    // --------------------------------------------------------

    if (
      type === "upload" &&
      editingItem?.image
    ) {
      setImagePreview(
        editingItem.image
      );
    } else {
      setImagePreview("");
    }
  };

  // ==========================================================
  // REMOVE / CLEAR CURRENT IMAGE
  // ==========================================================

  const clearImageSelection = () => {
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm((prev) => ({
      ...prev,
      image:
        editingItem?.image || "",
      imageFile: null,
    }));

    setImagePreview(
      editingItem?.image || ""
    );
  };

  // ==========================================================
  // IMAGE PREVIEW ERROR
  // ==========================================================

  const handlePreviewError = () => {
    setImagePreview("");
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearAlerts();

    // ========================================================
    // VALIDATE IMAGE
    // ========================================================

    if (!editingItem) {
      if (
        imageInputType === "upload" &&
        !form.imageFile
      ) {
        setError(
          "Please select an image file."
        );

        return;
      }

      if (
        imageInputType === "url" &&
        !form.image.trim()
      ) {
        setError(
          "Please enter an image URL."
        );

        return;
      }
    }

    try {
      setSaving(true);

      // ======================================================
      // CREATE
      // ======================================================

      if (!editingItem) {
        await createClientGallery({
          image:
            imageInputType === "upload"
              ? form.imageFile
              : form.image.trim(),

          title: form.title.trim(),

          place: form.place.trim(),

          active: form.active,
        });

        setSuccess(
          "Gallery photo added successfully."
        );
      }

      // ======================================================
      // UPDATE
      // ======================================================

      else {
        const updateData = {
          title: form.title.trim(),

          place: form.place.trim(),

          active: form.active,
        };

        // ----------------------------------------------------
        // Upload replacement image
        // ----------------------------------------------------

        if (
          imageInputType === "upload"
        ) {
          if (form.imageFile) {
            updateData.image =
              form.imageFile;
          }
        }

        // ----------------------------------------------------
        // URL replacement image
        // ----------------------------------------------------

        else if (
          form.image.trim() &&
          form.image.trim() !==
            editingItem.image
        ) {
          updateData.image =
            form.image.trim();
        }

        await updateClientGallery(
          editingItem._id ||
            editingItem.id,
          updateData
        );

        setSuccess(
          "Gallery photo updated successfully."
        );
      }

      closeForm();

      await loadGallery();
    } catch (err) {
      setError(
        err.message ||
          "Unable to save gallery photo."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // OPEN DELETE
  // ==========================================================

  const openDeleteConfirmation = (
    item
  ) => {
    clearAlerts();

    setOpenMenu(null);

    setDeleteTarget(item);
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

      await deleteClientGallery(
        deleteTarget._id ||
          deleteTarget.id
      );

      setDeleteTarget(null);

      setSuccess(
        "Gallery photo deleted successfully."
      );

      await loadGallery();
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete gallery photo."
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

    const parsedDate = new Date(date);

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
  // COUNTS
  // ==========================================================

  const activeCount = gallery.filter(
    (item) => item.active !== false
  ).length;

  const inactiveCount =
    gallery.length - activeCount;

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
                About Us
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#101A2E]">
                Client Gallery
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F7782]">
                Manage the travel photographs
                displayed in the About Us gallery.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#101A2E] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#101A2E]/15 transition hover:bg-[#18253D]"
            >
              <Plus size={18} />
              Add Gallery Photo
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* ====================================================
            ERROR
        ==================================================== */}

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

        {/* ====================================================
            SUCCESS
        ==================================================== */}

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
                  Total photos
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#101A2E]">
                  {gallery.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#101A2E]/10">
                <ImageIcon
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
                  Active photos
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
                  Inactive photos
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-500">
                  {inactiveCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                <ImageIcon
                  size={22}
                  className="text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            GALLERY
        ==================================================== */}

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          {/* SECTION HEADER */}

          <div className="border-b border-slate-100 px-6 py-5 lg:px-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#101A2E]">
                  About Us Gallery
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Photos shown to website visitors.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                {gallery.length}{" "}
                {gallery.length === 1
                  ? "photo"
                  : "photos"}
              </span>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2
                  size={28}
                  className="animate-spin text-[#101A2E]"
                />

                <p className="text-sm text-slate-500">
                  Loading gallery...
                </p>
              </div>
            </div>
          ) : gallery.length === 0 ? (
            /* EMPTY */

            <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <ImageIcon
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-5 font-semibold text-slate-700">
                No gallery photos
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-400">
                Add your first travel photograph
                to display it in the About Us
                gallery.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#101A2E] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                Add Gallery Photo
              </button>
            </div>
          ) : (
            /* GALLERY GRID */

            <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:p-7">
              {gallery.map((item) => {
                const itemId =
                  item._id || item.id;

                const isActive =
                  item.active !== false;

                return (
                  <div
                    key={itemId}
                    className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* IMAGE */}

                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImage(item)
                      }
                      className="relative block h-56 w-full overflow-hidden bg-[#101A2E]"
                    >
                      <img
                        src={item.image}
                        alt={
                          item.title ||
                          item.place ||
                          "Client gallery"
                        }
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-[#101A2E]/0 transition group-hover:bg-[#101A2E]/20" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#101A2E] shadow-lg">
                          <ExternalLink
                            size={17}
                          />
                        </span>
                      </div>

                      {/* STATUS */}

                      <span
                        className={[
                          "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm",
                          isActive
                            ? "bg-emerald-500/90 text-white"
                            : "bg-slate-700/80 text-white",
                        ].join(" ")}
                      >
                        {isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </button>

                    {/* INFO */}

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {item.title ? (
                            <h3 className="truncate text-sm font-semibold text-[#101A2E]">
                              {item.title}
                            </h3>
                          ) : (
                            <h3 className="text-sm font-medium italic text-slate-400">
                              No title
                            </h3>
                          )}

                          {item.place ? (
                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400">
                              <MapPin
                                size={12}
                              />
                              {item.place}
                            </p>
                          ) : (
                            <p className="mt-1 text-xs italic text-slate-300">
                              No place provided
                            </p>
                          )}

                          <p className="mt-2 text-[10px] text-slate-300">
                            Added{" "}
                            {formatDate(
                              item.createdAt
                            )}
                          </p>
                        </div>

                        {/* MENU */}

                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  itemId
                                  ? null
                                  : itemId
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreVertical
                              size={17}
                            />
                          </button>

                          {openMenu ===
                            itemId && (
                            <div className="absolute right-0 top-10 z-30 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewImage(
                                    item
                                  );
                                  setOpenMenu(null);
                                }}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                              >
                                <ExternalLink
                                  size={15}
                                />
                                Preview
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openEditForm(
                                    item
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                              >
                                <Edit3
                                  size={15}
                                />
                                Edit photo
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openDeleteConfirmation(
                                    item
                                  )
                                }
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                              >
                                <Trash2
                                  size={15}
                                />
                                Delete photo
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(item)
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#101A2E]/30 hover:bg-[#101A2E]/5 hover:text-[#101A2E]"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteConfirmation(
                              item
                            )
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06121B]/55 p-4 backdrop-blur-sm"
          onClick={closeForm}
        >
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
                  About Us
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#101A2E]">
                  {editingItem
                    ? "Edit Gallery Photo"
                    : "Add Gallery Photo"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a travel photograph and
                  optional details.
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
              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700">
                    Gallery image
                  </label>

                  {editingItem && (
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
                      handleImageInputTypeChange(
                        "upload"
                      )
                    }
                    disabled={saving}
                    className={[
                      "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition",
                      imageInputType ===
                      "upload"
                        ? "bg-white text-[#101A2E] shadow-sm"
                        : "text-slate-500 hover:text-slate-700",
                    ].join(" ")}
                  >
                    <ImageIcon size={15} />
                    Upload Image
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleImageInputTypeChange(
                        "url"
                      )
                    }
                    disabled={saving}
                    className={[
                      "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition",
                      imageInputType === "url"
                        ? "bg-white text-[#101A2E] shadow-sm"
                        : "text-slate-500 hover:text-slate-700",
                    ].join(" ")}
                  >
                    <ExternalLink
                      size={15}
                    />
                    Image URL
                  </button>
                </div>

                {/* =================================================
                    IMAGE PREVIEW
                ================================================= */}

                {imagePreview ? (
                  <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <div className="relative aspect-video w-full">
                      <img
                        src={imagePreview}
                        alt="Gallery preview"
                        className="h-full w-full object-cover"
                        onError={
                          handlePreviewError
                        }
                      />

                      {/* DARK GRADIENT */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                      {/* PREVIEW LABEL */}

                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-[#101A2E]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                          Image Preview
                        </span>
                      </div>

                      {/* IMAGE SOURCE */}

                      <div className="absolute bottom-3 left-3">
                        <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                          {form.imageFile
                            ? "Uploaded image"
                            : "Image URL"}
                        </span>
                      </div>

                      {/* CLEAR / REPLACE */}

                      {(form.imageFile ||
                        (imageInputType ===
                          "url" &&
                          form.image &&
                          form.image !==
                            editingItem?.image)) && (
                        <button
                          type="button"
                          onClick={
                            clearImageSelection
                          }
                          disabled={saving}
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <ImageIcon
                          size={21}
                          className="text-slate-300"
                        />
                      </div>

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        Image preview will appear
                        here
                      </p>
                    </div>
                  </div>
                )}

                {/* =================================================
                    UPLOAD
                ================================================= */}

                {imageInputType ===
                  "upload" && (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-7 text-center transition hover:border-[#101A2E]/30 hover:bg-white">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#101A2E]/10">
                      <ImageIcon
                        size={21}
                        className="text-[#101A2E]"
                      />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      {form.imageFile
                        ? form.imageFile.name
                        : "Choose an image"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      JPG, PNG, WebP and other
                      supported image formats
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageFileChange
                      }
                      disabled={saving}
                      className="hidden"
                    />
                  </label>
                )}

                {/* =================================================
                    URL
                ================================================= */}

                {imageInputType === "url" && (
                  <div>
                    <input
                      type="url"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      disabled={saving}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                    />

                    {editingItem &&
                      form.image ===
                        editingItem.image && (
                        <p className="mt-2 text-xs text-slate-400">
                          Leave this unchanged
                          to keep the current
                          image.
                        </p>
                      )}
                  </div>
                )}

                {/* EDIT UPLOAD HELP */}

                {editingItem &&
                  imageInputType ===
                    "upload" && (
                    <p className="mt-2 text-xs text-slate-400">
                      Select a new file only if
                      you want to replace the
                      existing image.
                    </p>
                  )}
              </div>

              {/* ==================================================
                  TITLE
              ================================================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Title
                  <span className="ml-2 font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Exploring Jaipur"
                  disabled={saving}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                />
              </div>

              {/* ==================================================
                  PLACE
              ================================================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Place
                  <span className="ml-2 font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur, Rajasthan"
                    disabled={saving}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#101A2E] focus:bg-white focus:ring-4 focus:ring-[#101A2E]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* ==================================================
                  ACTIVE
              ================================================== */}

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Display on website
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Inactive photos will not be
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

              {/* ==================================================
                  ACTIONS
              ================================================== */}

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

                      {editingItem
                        ? "Saving..."
                        : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingItem ? (
                        <Check size={16} />
                      ) : (
                        <Plus size={16} />
                      )}

                      {editingItem
                        ? "Save Changes"
                        : "Add Gallery Photo"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================
          IMAGE PREVIEW MODAL
      ====================================================== */}

      {previewImage && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center bg-[#06121B]/80 p-4 backdrop-blur-sm"
          onClick={() =>
            setPreviewImage(null)
          }
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-black shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setPreviewImage(null)
              }
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            >
              <X size={18} />
            </button>

            {/* IMAGE */}

            <img
              src={previewImage.image}
              alt={
                previewImage.title ||
                previewImage.place ||
                "Client gallery"
              }
              className="max-h-[75vh] w-full object-contain bg-black"
            />

            {/* INFO */}

            <div className="bg-white px-6 py-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  {previewImage.title && (
                    <h3 className="text-base font-semibold text-[#101A2E]">
                      {previewImage.title}
                    </h3>
                  )}

                  {previewImage.place && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin size={13} />
                      {previewImage.place}
                    </div>
                  )}

                  {!previewImage.title &&
                    !previewImage.place && (
                      <p className="text-sm text-slate-400">
                        No additional information
                        provided.
                      </p>
                    )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEditForm(
                      previewImage
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Edit3 size={14} />
                  Edit photo
                </button>
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
              Delete gallery photo?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to permanently remove{" "}
              <span className="font-semibold text-slate-700">
                {deleteTarget.title ||
                  deleteTarget.place ||
                  "this gallery photo"}
              </span>{" "}
              from the About Us gallery.
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
                    Delete Photo
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