import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  Edit3,
  Loader2,
  Mail,
  MoreVertical,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  getCurrentAdmin,
  updateAdmin,
} from "../../services/adminApi";

export default function AdminManagement() {

  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Main page/API errors
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form-specific validation error
  const [formError, setFormError] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const [adminsResponse, currentResponse] =
        await Promise.all([
          getAdmins(),
          getCurrentAdmin(),
        ]);

      setAdmins(adminsResponse?.admins || []);
      setCurrentAdmin(currentResponse?.admin || null);
    } catch (err) {

      setError(
        err.message ||
          "Unable to load administrator accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);


  const clearAlerts = () => {
    setError("");
    setSuccess("");
  };


  const openCreateForm = () => {
    clearAlerts();
    setFormError("");

    setEditingAdmin(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setShowForm(true);
    setOpenMenu(null);
  };


  const openEditForm = (admin) => {
    clearAlerts();
    setFormError("");

    setEditingAdmin(admin);

    setForm({
      name: admin.name || "",
      email: admin.email || "",
      password: "",
    });

    setShowForm(true);
    setOpenMenu(null);
  };


  const closeForm = () => {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingAdmin(null);
    setFormError("");

    setForm({
      name: "",
      email: "",
      password: "",
    });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    // Clear form error when user starts correcting the field
    setFormError("");

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearAlerts();
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Admin name is required.");
      return;
    }

    if (!form.email.trim()) {
      setFormError("Admin email is required.");
      return;
    }

    // Password is required only when creating.
    if (!editingAdmin && !form.password.trim()) {
      setFormError("Admin password is required.");
      return;
    }

    // Password validation when editing.
    if (
      editingAdmin &&
      form.password &&
      form.password.length < 6
    ) {
      setFormError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Password validation when creating.
    if (
      !editingAdmin &&
      form.password &&
      form.password.length < 6
    ) {
      setFormError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setSaving(true);

      if (editingAdmin) {
        const updateData = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
        };

        if (form.password.trim()) {
          updateData.password = form.password;
        }

        await updateAdmin(
          editingAdmin._id ||
            editingAdmin.id,
          updateData
        );

        setSuccess(
          "Administrator updated successfully."
        );
      }

      else {
        await createAdmin({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });

        setSuccess(
          "Administrator created successfully."
        );
      }

      closeForm();

      await loadAdmins();
    } catch (err) {

      setError(
        err.message ||
          "Unable to save administrator."
      );
    } finally {
      setSaving(false);
    }
  };

  const openDeleteConfirmation = (admin) => {
    clearAlerts();

    setOpenMenu(null);

    const adminId =
      admin._id || admin.id;

    const currentAdminId =
      currentAdmin?._id ||
      currentAdmin?.id;

    // Extra frontend protection.
    if (
      String(adminId) ===
      String(currentAdminId)
    ) {
      setError(
        "You cannot delete your own admin account."
      );

      return;
    }

    setDeleteTarget(admin);
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const adminId =
      deleteTarget._id ||
      deleteTarget.id;

    try {
      setDeleting(true);
      clearAlerts();

      await deleteAdmin(adminId);

      setDeleteTarget(null);

      setSuccess(
        "Administrator deleted successfully."
      );

      await loadAdmins();
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete administrator."
      );
    } finally {
      setDeleting(false);
    }
  };

  const currentAdminId = useMemo(() => {
    return (
      currentAdmin?._id ||
      currentAdmin?.id ||
      ""
    );
  }, [currentAdmin]);

  const formatDate = (date) => {
    if (!date) {
      return "Never";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
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

  return (
    <div className="min-h-screen bg-[#f5f7f8]">

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f58634]">
                Administration
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#0b3c49]">
                Admin Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage the administrators who have access
                to your travel dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#124d56] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#124d56]/15 transition hover:bg-[#0b3c49]"
            >
              <Plus size={18} />
              Add New Admin
            </button>

          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">


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

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* TOTAL ADMINS */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Total admins
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#0b3c49]">
                  {admins.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#124d56]/10">
                <Users
                  size={22}
                  className="text-[#124d56]"
                />
              </div>

            </div>
          </div>

          {/* YOUR ACCOUNT */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Your account
                </p>

                <p className="mt-2 truncate text-lg font-semibold text-[#0b3c49]">
                  {currentAdmin?.name ||
                    "Loading..."}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <ShieldCheck
                  size={22}
                  className="text-emerald-600"
                />
              </div>

            </div>
          </div>

          {/* ACCESS LEVEL */}

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                  Access level
                </p>

                <p className="mt-2 text-lg font-semibold capitalize text-[#0b3c49]">
                  Administrator
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f58634]/10">
                <ShieldCheck
                  size={22}
                  className="text-[#f58634]"
                />
              </div>

            </div>
          </div>

        </div>

        <section className="relative rounded-[28px] border border-slate-200 bg-white shadow-sm">
          {/* SECTION HEADER */}

          <div className="border-b border-slate-100 px-6 py-5 lg:px-7">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-[#0b3c49]">
                  Administrators
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Everyone with access to the admin
                  dashboard.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                {admins.length}{" "}
                {admins.length === 1
                  ? "admin"
                  : "admins"}
              </span>

            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">

              <div className="flex flex-col items-center gap-3">

                <Loader2
                  size={28}
                  className="animate-spin text-[#124d56]"
                />

                <p className="text-sm text-slate-500">
                  Loading administrators...
                </p>

              </div>

            </div>

          ) : admins.length === 0 ? (

            /* EMPTY STATE */

            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Users
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-5 font-semibold text-slate-700">
                No administrators found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-400">
                Create an administrator account to give
                someone dashboard access.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#124d56] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                Add Admin
              </button>

            </div>

          ) : (

            /* ADMIN LIST */

            <div className="divide-y divide-slate-100">

              {admins.map((admin) => {

                const adminId =
                  admin._id || admin.id;

                const isCurrentAdmin =
                  String(adminId) ===
                  String(currentAdminId);

                return (
                  <div
                    key={adminId}
                    className="group flex flex-col gap-5 px-6 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between lg:px-7"
                  >

                    {/* ADMIN INFO */}

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#124d56] text-sm font-bold text-white">
                        {(admin.name || "A")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {admin.name ||
                              "Unnamed Admin"}
                          </p>

                          {isCurrentAdmin && (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                              You
                            </span>
                          )}

                          <span className="rounded-full bg-[#124d56]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#124d56]">
                            Administrator
                          </span>

                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                          <span className="inline-flex items-center gap-1.5">
                            <Mail size={13} />
                            {admin.email}
                          </span>

                          <span>
                            Last login:{" "}
                            {formatDate(
                              admin.lastLogin
                            )}
                          </span>

                        </div>

                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="relative flex shrink-0 items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(admin)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-[#124d56]/30 hover:bg-[#124d56]/5 hover:text-[#124d56]"
                      >
                        <Edit3 size={15} />
                        Edit
                      </button>

                      {!isCurrentAdmin && (
                        <button
                          type="button"
                          onClick={() =>
                            openDeleteConfirmation(
                              admin
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      )}

                      {/* EXTRA MENU */}

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === adminId
                              ? null
                              : adminId
                          )
                        }
                        className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:text-slate-700 sm:flex"
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === adminId && (
                        <div className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">

                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(admin)
                            }
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                          >
                            <Edit3 size={15} />
                            Edit admin
                          </button>

                          {!isCurrentAdmin && (
                            <button
                              type="button"
                              onClick={() =>
                                openDeleteConfirmation(
                                  admin
                                )
                              }
                              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete admin
                            </button>
                          )}

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

      </main>


      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061f26]/50 p-4 backdrop-blur-sm">

          <div
            className="w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f58634]">
                  {editingAdmin
                    ? "Administrator"
                    : "New account"}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#0b3c49]">
                  {editingAdmin
                    ? "Edit Admin"
                    : "Create Admin"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingAdmin
                    ? "Update this administrator's account details."
                    : "Create a new account with dashboard access."}
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

            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-6 py-6"
            >

              {formError && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">

                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="flex-1 font-medium">
                    {formError}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setFormError("")
                    }
                    className="shrink-0 text-red-400 transition hover:text-red-700"
                  >
                    <X size={16} />
                  </button>

                </div>
              )}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
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
                    placeholder="Admin name"
                    disabled={saving}
                    className={`w-full rounded-2xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 disabled:opacity-60 ${
                      formError &&
                      !form.name.trim()
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                        : "border-slate-200 focus:border-[#124d56] focus:ring-[#124d56]/10"
                    }`}
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    disabled={saving}
                    className={`w-full rounded-2xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 disabled:opacity-60 ${
                      formError &&
                      !form.email.trim()
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                        : "border-slate-200 focus:border-[#124d56] focus:ring-[#124d56]/10"
                    }`}
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  {editingAdmin
                    ? "New password"
                    : "Password"}

                  {editingAdmin && (
                    <span className="ml-2 font-normal text-slate-400">
                      Optional
                    </span>
                  )}

                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    editingAdmin
                      ? "Leave blank to keep current password"
                      : "Minimum 6 characters"
                  }
                  disabled={saving}
                  autoComplete="new-password"
                  className={`w-full rounded-2xl border bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 disabled:opacity-60 ${
                    formError &&
                    !editingAdmin &&
                    !form.password.trim()
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                      : "border-slate-200 focus:border-[#124d56] focus:ring-[#124d56]/10"
                  }`}
                />

                <p className="mt-2 text-xs text-slate-400">
                  {editingAdmin
                    ? "Only enter a password if you want to change it."
                    : "The password must contain at least 6 characters."}
                </p>

              </div>

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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#124d56] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#124d56]/15 transition hover:bg-[#0b3c49] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      {editingAdmin
                        ? "Saving..."
                        : "Creating..."}
                    </>
                  ) : (
                    <>
                      {editingAdmin ? (
                        <Check size={16} />
                      ) : (
                        <Plus size={16} />
                      )}

                      {editingAdmin
                        ? "Save Changes"
                        : "Create Admin"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#061f26]/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
              <Trash2
                size={21}
                className="text-red-600"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#0b3c49]">
              Delete administrator?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to permanently remove{" "}
              <span className="font-semibold text-slate-700">
                {deleteTarget.name}
              </span>{" "}
              from the admin dashboard.
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
                    Delete Admin
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