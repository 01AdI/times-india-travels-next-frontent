import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  Plus,
  Image,
  Video,
  Pencil,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Layers,
  ArrowUpRight,
} from "lucide-react";

import {
  getAdminHeroes,
  deleteAdminHero,
} from "../../services/adminApi";


export default function AdminHomeHero() {
  const navigate = useNavigate();

  const [heroes, setHeroes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =useState(false);

  const [deletingId, setDeletingId] =useState(null);

  const [error, setError] = useState("");

  const nextOrder =heroes.length > 0? Math.max(
          ...heroes.map((hero) => Number(hero.order) || 0)
        ) + 1
    : 0;

  const fetchHeroes = async (
    showRefreshing = false
  ) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response =
        await getAdminHeroes();

      setHeroes(
        Array.isArray(response?.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch hero slides:",
        error
      );

      setError(
        error.message ||
          "Unable to load hero slides."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    fetchHeroes();
  }, []);

  // ==========================================================
  // DELETE HERO
  // ==========================================================

  const handleDelete = async (hero) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete the hero slide "${hero.place}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(hero._id);
      setError("");

      await deleteAdminHero(
        hero._id
      );

      setHeroes((previous) =>
        previous.filter(
          (item) =>
            item._id !== hero._id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete hero slide:",
        error
      );

      setError(
        error.message ||
          "Unable to delete this hero slide."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // STATS
  // ==========================================================

  const totalSlides =
    heroes.length;

  const activeSlides =
    heroes.filter(
      (hero) => hero.active
    ).length;

  const inactiveSlides =
    heroes.filter(
      (hero) => !hero.active
    ).length;

  // ==========================================================
  // MEDIA PREVIEW
  // ==========================================================

  const renderMediaPreview = (
    hero,
    large = false
  ) => {
    const heightClass = large
      ? "h-72"
      : "h-56";

    // --------------------------------------------------------
    // VIDEO
    // --------------------------------------------------------

    if (
      hero.mediaType === "video"
    ) {
      return (
        <div
          className={`relative ${heightClass} w-full overflow-hidden bg-[#0B1220]`}
        >
          <video
            src={hero.mediaUrl}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />

          {/* VIDEO OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

          {/* VIDEO BADGE */}

          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white text-[10px] uppercase tracking-[0.16em]">
            <Video size={12} />
            Video
          </div>
        </div>
      );
    }

    // --------------------------------------------------------
    // IMAGE
    // --------------------------------------------------------

    return (
      <div
        className={`relative ${heightClass} w-full overflow-hidden bg-[#EEF2F3]`}
      >
        {hero.mediaUrl ? (
          <img
            src={hero.mediaUrl}
            alt={
              hero.place ||
              "Hero slide"
            }
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#9AA1AA]">
            <Image
              size={30}
              strokeWidth={1.3}
            />

            <p className="mt-3 text-xs">
              No image
            </p>
          </div>
        )}

        {/* IMAGE OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 pointer-events-none" />

        {/* IMAGE BADGE */}

        <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-[10px] uppercase tracking-[0.16em]">
          <Image size={12} />
          Image
        </div>
      </div>
    );
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <section className="space-y-6">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
              Homepage Management
            </p>

            <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
              Home Hero
            </h2>

            <p className="mt-2 text-sm text-[#6F7782]">
              Manage the visual stories displayed
              across your homepage.
            </p>
          </div>

        </div>

        {/* LOADING */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl min-h-[420px] flex items-center justify-center">

          <div className="flex flex-col items-center">

            <div className="w-8 h-8 border-2 border-[#C9A24B]/30 border-t-[#C9A24B] rounded-full animate-spin" />

            <p className="mt-4 text-sm text-[#7A828D]">
              Loading hero slides...
            </p>

          </div>

        </div>

      </section>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <section className="space-y-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        <div>

          <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
            Homepage Management
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-[#101A2E]">
            Home Hero
          </h2>

          <p className="mt-2 text-sm text-[#6F7782] max-w-xl">
            Manage the visual stories displayed
            across your homepage. Add images,
            videos, control their order and
            choose which slides are active.
          </p>

        </div>

        <div className="flex items-center gap-3">

          {/* REFRESH */}

          <button
            type="button"
            onClick={() =>
              fetchHeroes(true)
            }
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-[#101A2E]/10 bg-white text-xs text-[#101A2E] hover:bg-[#F8F9F9] transition-all disabled:opacity-50"
          >

            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

          {/* ADD HERO */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/home-hero/create",{
                  state: {
                    nextOrder,
                  },
                }
              )
            }
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
          >

            <Plus size={15} />

            Add Hero Slide

          </button>

        </div>

      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 flex items-center justify-between gap-4">

          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              fetchHeroes(true)
            }
            className="text-xs font-medium text-red-700 underline"
          >
            Retry
          </button>

        </div>
      )}

      {/* ======================================================
          STATS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* TOTAL */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-[#101A2E]/5 flex items-center justify-center">

              <Layers
                size={17}
                className="text-[#101A2E]"
              />

            </div>

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
              Total
            </span>

          </div>

          <p className="mt-5 text-2xl font-medium text-[#101A2E]">
            {totalSlides}
          </p>

          <p className="mt-1 text-xs text-[#7A828D]">
            Hero slides
          </p>

        </div>

        {/* ACTIVE */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">

              <Eye
                size={17}
                className="text-emerald-600"
              />

            </div>

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
              Live
            </span>

          </div>

          <p className="mt-5 text-2xl font-medium text-[#101A2E]">
            {activeSlides}
          </p>

          <p className="mt-1 text-xs text-[#7A828D]">
            Active slides
          </p>

        </div>

        {/* INACTIVE */}

        <div className="bg-white border border-[#101A2E]/8 rounded-2xl p-5">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-[#F8F4E8] flex items-center justify-center">

              <EyeOff
                size={17}
                className="text-[#C9A24B]"
              />

            </div>

            <span className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
              Hidden
            </span>

          </div>

          <p className="mt-5 text-2xl font-medium text-[#101A2E]">
            {inactiveSlides}
          </p>

          <p className="mt-1 text-xs text-[#7A828D]">
            Inactive slides
          </p>

        </div>

      </div>

      {/* ======================================================
          EMPTY STATE
      ====================================================== */}

      {heroes.length === 0 ? (
        <div className="bg-white border border-[#101A2E]/8 rounded-2xl min-h-[400px] flex items-center justify-center">

          <div className="text-center max-w-sm">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#101A2E]/5 flex items-center justify-center">

              <Layers
                size={25}
                strokeWidth={1.4}
                className="text-[#101A2E]"
              />

            </div>

            <h3 className="mt-5 text-base font-medium text-[#101A2E]">
              No hero slides yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#7A828D]">
              Create your first homepage hero
              slide using an image or video.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/home-hero/create"
                )
              }
              className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#101A2E] text-white text-xs hover:bg-[#C9A24B] hover:text-[#101A2E] transition-all"
            >
              <Plus size={14} />
              Create Hero Slide
            </button>

          </div>

        </div>
      ) : (
        /* ====================================================
           HERO GRID
        ==================================================== */

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {heroes.map(
            (hero, index) => (
              <article
                key={hero._id}
                className="group bg-white border border-[#101A2E]/8 rounded-2xl overflow-hidden hover:border-[#C9A24B]/40 hover:shadow-[0_16px_50px_rgba(16,26,46,0.07)] transition-all duration-300"
              >

                {/* ==========================================
                    MEDIA
                ========================================== */}

                <div className="relative">

                  {renderMediaPreview(
                    hero,
                    true
                  )}

                  {/* ORDER */}

                  <div className="absolute top-4 right-4 min-w-9 h-9 px-3 rounded-full bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center">

                    <span className="text-xs font-medium text-[#101A2E]">
                      {String(
                        hero.order ??
                          index
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                  </div>

                  {/* ACTIVE STATUS */}

                  <div className="absolute bottom-4 left-4">

                    {hero.active ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.14em]">

                        <span className="w-1.5 h-1.5 rounded-full bg-white" />

                        Active

                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.14em]">

                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />

                        Inactive

                      </span>
                    )}

                  </div>

                </div>

                {/* ==========================================
                    CONTENT
                ========================================== */}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24B]">
                        {hero.mediaType ===
                        "video"
                          ? "Video Story"
                          : "Image Story"}
                      </p>

                      <h3 className="mt-2 text-lg font-medium text-[#101A2E] truncate">
                        {hero.place ||
                          "Untitled Slide"}
                      </h3>

                    </div>

                    {/* MEDIA TYPE */}

                    <div className="shrink-0 w-9 h-9 rounded-xl bg-[#101A2E]/5 flex items-center justify-center">

                      {hero.mediaType ===
                      "video" ? (
                        <Video
                          size={16}
                          className="text-[#101A2E]"
                        />
                      ) : (
                        <Image
                          size={16}
                          className="text-[#101A2E]"
                        />
                      )}

                    </div>

                  </div>

                  {/* LINE */}

                  <p className="mt-3 text-sm leading-6 text-[#6F7782] line-clamp-2 min-h-[48px]">
                    {hero.line ||
                      "No hero headline has been added."}
                  </p>

                  {/* URL */}

                  {hero.mediaUrl && (
                    <div className="mt-4 flex items-center gap-2 min-w-0">

                      <ArrowUpRight
                        size={13}
                        className="shrink-0 text-[#9AA1AA]"
                      />

                      <p
                        title={
                          hero.mediaUrl
                        }
                        className="text-[10px] text-[#9AA1AA] truncate"
                      >
                        {hero.mediaUrl}
                      </p>

                    </div>
                  )}

                  {/* DIVIDER */}

                  <div className="my-5 border-t border-[#101A2E]/7" />

                  {/* ACTIONS */}

                  <div className="flex items-center justify-between gap-3">

                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#9AA1AA]">
                      Slide{" "}
                      {String(
                        hero.order ??
                          index
                      ).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="flex items-center gap-2">

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/home-hero/${hero._id}/edit`
                          )
                        }
                        className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[#101A2E]/10 text-xs text-[#101A2E] hover:bg-[#101A2E] hover:text-white transition-all"
                      >

                        <Pencil
                          size={13}
                        />

                        Edit

                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            hero
                          )
                        }
                        disabled={
                          deletingId ===
                          hero._id
                        }
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        title="Delete hero slide"
                      >

                        {deletingId ===
                        hero._id ? (
                          <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                        ) : (
                          <Trash2
                            size={14}
                          />
                        )}

                      </button>

                    </div>

                  </div>

                </div>

              </article>
            )
          )}

        </div>
      )}

    </section>
  );
}
