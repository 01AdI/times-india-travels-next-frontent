"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { ArrowRight, Loader2, X } from "lucide-react";

import { fetchBlogs } from "../../features/Blogs-page/blog_Slice";

/* ============================================================
   FALLBACK IMAGE
============================================================ */

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85";

/* ============================================================
   DATE FORMATTER
============================================================ */

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ============================================================
   READING TIME

   Since your listing API does not currently return readTime,
   calculate an approximate reading time from shortDescription.

   If you later add readTime to the API, we can use that instead.
============================================================ */

function calculateReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (!words) {
    return "3 min read";
  }

  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min read`;
}

/* ============================================================
   META ROW
============================================================ */

function MetaRow({ date, readTime, light = false }) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        font-['IBM_Plex_Mono']
        text-[10px]
        uppercase
        tracking-[0.05em]
        ${light ? "text-white/55" : "text-[#0B3C49]/40"}
      `}
    >
      {date && <span>{date}</span>}

      {date && readTime && (
        <span
          className={`
            h-1
            w-1
            rounded-full
            ${light ? "bg-white/30" : "bg-[#0B3C49]/25"}
          `}
        />
      )}

      {readTime && <span>{readTime}</span>}
    </div>
  );
}

/* ============================================================
   FEATURED STORY
============================================================ */

function FeaturedStory({ blog }) {
  if (!blog) return null;
  const router = useRouter();

  const image = blog.image || FALLBACK_IMAGE;

  const date = formatDate(blog.publishedAt);

  const readTime = calculateReadTime(blog.shortDescription);

  return (
    <article
      className="
        group
        relative
        mb-14
        overflow-hidden
        rounded-[32px]
        bg-[#0B3C49]
        shadow-[0_25px_70px_rgba(11,60,73,0.12)]
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={blog.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1400ms]
            ease-out
            group-hover:scale-[1.07]
          "
          loading="eager"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        {/* CINEMATIC OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/90
            via-black/55
            to-black/10
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-2/3
            bg-gradient-to-t
            from-black/90
            via-black/40
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          TOP LABEL
      ====================================================== */}

      <div
        className="
          absolute
          left-7
          top-7
          z-10
          flex
          items-center
          gap-4
          md:left-10
          md:top-10
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/30
            backdrop-blur-md
          "
        >
          <span
            className="
              font-['IBM_Plex_Mono']
              text-[11px]
              text-white
            "
          >
            01
          </span>
        </div>

        <div className="hidden h-px w-12 bg-white/25 sm:block" />

        <span
          className="
            font-['Inter']
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-white/75
          "
        >
          Featured story
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[620px]
          items-end
          p-7
          md:p-10
          lg:p-14
        "
      >
        <div
          className="
            max-w-3xl
            transition-transform
            duration-700
            group-hover:-translate-y-2
          "
        >
          {/* CATEGORY */}

          <div className="mb-5 flex flex-wrap items-center gap-3">
            {blog.category && (
              <span
                className="
                  font-['Inter']
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#F58634]
                "
              >
                {blog.category}
              </span>
            )}

            {blog.category && blog.tags?.length > 0 && (
              <span className="h-px w-8 bg-[#F58634]/70" />
            )}

            {blog.tags?.length > 0 && (
              <span
                className="
                  hidden
                  font-['IBM_Plex_Mono']
                  text-[9px]
                  uppercase
                  text-white/50
                  sm:block
                "
              >
                {blog.tags.slice(0, 3).join(" · ")}
              </span>
            )}
          </div>

          {/* TITLE */}

          <h2
            className="
              max-w-3xl
              font-['Fraunces']
              text-[clamp(2.4rem,5vw,4.7rem)]
              font-medium
              leading-[0.98]
              tracking-[-0.025em]
              text-white
            "
          >
            {blog.title}
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-6
              max-w-2xl
              font-['Inter']
              text-[14px]
              leading-[1.75]
              text-white/70
              md:text-[15px]
            "
          >
            {blog.shortDescription}
          </p>

          {/* BOTTOM */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <MetaRow
              date={date}
              readTime={readTime}
              light
            />

            <button
              type="button"
              onClick={() => {router.push(`/blog/${blog.slug}`);}}
              className="
                inline-flex
                w-fit
                cursor-pointer
                items-center
                gap-3
                border-b
                border-white/30
                pb-2
                font-['Inter']
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                transition-all
                duration-500
                hover:border-[#F58634]
              "
            >
              <span>Explore story</span>

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F58634]
                  transition-transform
                  duration-500
                  group-hover:translate-x-2
                "
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* AUTHOR */}

          {blog.author && (
            <p
              className="
                mt-5
                font-['IBM_Plex_Mono']
                text-[9px]
                uppercase
                tracking-[0.08em]
                text-white/35
              "
            >
              By {blog.author}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   JOURNAL CARD
============================================================ */

function JournalCard({ blog, number, expanded, onToggle }) {
  const router = useRouter();
  if (!blog) return null;

  const image = blog.image || FALLBACK_IMAGE;

  const date = formatDate(blog.publishedAt);

  const readTime = calculateReadTime(blog.shortDescription);

  return (
    <article
      className={`
        group
        overflow-hidden
        rounded-[28px]
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          expanded
            ? "min-h-[560px] bg-[#0B3C49] shadow-[0_30px_80px_rgba(11,60,73,0.22)]"
            : "bg-transparent shadow-[0_8px_30px_rgba(11,60,73,0.04)]"
        }
      `}
    >
      <div
        onClick={onToggle}
        className={`
          relative
          cursor-pointer
          overflow-hidden
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            expanded
              ? "min-h-[560px] rounded-[28px]"
              : "aspect-[16/11] rounded-[26px]"
          }
        `}
      >
        {/* =====================================================
            IMAGE
        ====================================================== */}

        <img
          src={image}
          alt={blog.title}
          className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            ${
              expanded
                ? "scale-[1.04] group-hover:scale-[1.07]"
                : "group-hover:scale-[1.08]"
            }
          `}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        {/* =====================================================
            BLACK OVERLAY
        ====================================================== */}

        <div
          className={`
            absolute
            inset-0
            transition-all
            duration-700
            ${
              expanded
                ? "bg-gradient-to-t from-black/95 via-black/55 to-black/5"
                : "bg-gradient-to-t from-black/75 via-black/20 to-transparent"
            }
          `}
        />

        {/* EXPANDED SIDE OVERLAY */}

        <div
          className={`
            absolute
            inset-0
            bg-gradient-to-r
            from-black/75
            via-transparent
            to-transparent
            transition-opacity
            duration-700
            ${expanded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* =====================================================
            NUMBER
        ====================================================== */}

        <div
          className="
            absolute
            left-5
            top-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/30
            backdrop-blur-md
          "
        >
          <span
            className="
              font-['IBM_Plex_Mono']
              text-[10px]
              text-white
            "
          >
            {String(number).padStart(2, "0")}
          </span>
        </div>

        {/* =====================================================
            CATEGORY
        ====================================================== */}

        {blog.category && (
          <div
            className="
              absolute
              right-5
              top-5
              rounded-full
              border
              border-white/20
              bg-black/30
              px-3.5
              py-2
              backdrop-blur-md
            "
          >
            <span
              className="
                font-['Inter']
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
              "
            >
              {blog.category}
            </span>
          </div>
        )}

        {/* =====================================================
            COLLAPSED CONTENT
        ====================================================== */}

        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            p-5
            transition-all
            duration-500
            ${
              expanded
                ? "translate-y-5 opacity-0"
                : "translate-y-0 opacity-100"
            }
          `}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-[#F58634]" />

            {blog.tags?.length > 0 ? (
              <span
                className="
                  font-['IBM_Plex_Mono']
                  text-[9px]
                  uppercase
                  tracking-[0.08em]
                  text-white/70
                "
              >
                {blog.tags.slice(0, 3).join(" · ")}
              </span>
            ) : (
              blog.category && (
                <span
                  className="
                    font-['IBM_Plex_Mono']
                    text-[9px]
                    uppercase
                    tracking-[0.08em]
                    text-white/70
                  "
                >
                  {blog.category}
                </span>
              )
            )}
          </div>

          <h3
            className="
              max-w-lg
              font-['Fraunces']
              text-[clamp(1.5rem,2.6vw,2.2rem)]
              font-medium
              leading-[1.08]
              text-white
            "
          >
            {blog.title}
          </h3>
        </div>

        {/* =====================================================
            EXPANDED CONTENT
        ====================================================== */}

        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            p-7
            transition-all
            duration-700
            md:p-10
            lg:p-12
            ${
              expanded
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-8 opacity-0"
            }
          `}
        >
          <div className="max-w-3xl">
            {/* CATEGORY / TAGS */}

            <div className="mb-5 flex flex-wrap items-center gap-3">
              {blog.category && (
                <span
                  className="
                    font-['Inter']
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#F58634]
                  "
                >
                  {blog.category}
                </span>
              )}

              {blog.category && blog.tags?.length > 0 && (
                <span className="h-px w-8 bg-[#F58634]/70" />
              )}

              {blog.tags?.length > 0 && (
                <span
                  className="
                    font-['IBM_Plex_Mono']
                    text-[9px]
                    uppercase
                    tracking-[0.06em]
                    text-white/55
                  "
                >
                  {blog.tags.slice(0, 4).join(" · ")}
                </span>
              )}
            </div>

            {/* TITLE */}

            <h3
              className="
                max-w-3xl
                font-['Fraunces']
                text-[clamp(2rem,4vw,3.6rem)]
                font-medium
                leading-[1]
                tracking-[-0.02em]
                text-white
              "
            >
              {blog.title}
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-2xl
                font-['Inter']
                text-[13px]
                leading-[1.8]
                text-white/70
                md:text-[14px]
              "
            >
              {blog.shortDescription}
            </p>

            {/* AUTHOR */}

            {blog.author && (
              <p
                className="
                  mt-4
                  font-['IBM_Plex_Mono']
                  text-[9px]
                  uppercase
                  tracking-[0.08em]
                  text-white/35
                "
              >
                By {blog.author}
              </p>
            )}

            {/* BOTTOM ROW */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <MetaRow
                date={date}
                readTime={readTime}
                light
              />

              {/* READ MORE */}

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/blog/${blog.slug}`);
                }}
                className="
                  group/read
                  inline-flex
                  w-fit
                  cursor-pointer
                  items-center
                  gap-3
                  border-b
                  border-[#F58634]/50
                  bg-transparent
                  pb-2
                  font-['Inter']
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#F58634]
                "
              >
                <span>Read More</span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F58634]
                    text-white
                    transition-transform
                    duration-300
                    group-hover/read:translate-x-1
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            CLOSE BUTTON
        ====================================================== */}

        {expanded && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              onToggle();
            }}
            className="
              absolute
              right-6
              top-6
              z-20
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              font-['Inter']
              text-lg
              font-light
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-black/70
            "
            aria-label="Close story"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function BlogJournal({ initialBlogs = [] }) {
  const dispatch = useDispatch();
  /* ============================================================
     REDUX
  ============================================================ */

  const {
    blogs: reduxBlogs = [],
    status: reduxStatus = "idle",
    error = null,
    pagination = { currentPage: 1, limit: initialBlogs.length || 10, totalPages: 1 },
  } = useSelector((state) => state.blog);

  const blogs = initialBlogs.length > 0 ? initialBlogs : reduxBlogs;
  const status = initialBlogs.length > 0 ? "succeeded" : reduxStatus;

  /* ============================================================
     LOCAL STATE
  ============================================================ */

  const [active, setActive] = useState("All");

  const [expandedPost, setExpandedPost] = useState(null);

  /* ============================================================
     INITIAL FETCH
  ============================================================ */

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  /* ============================================================
     DYNAMIC CATEGORIES
  ============================================================ */
const categories = useMemo(() => {
  const categoryMap = new Map();

  blogs.forEach((blog) => {
    const category = blog.category?.trim();

    if (!category) return;

    const normalized = category.toLowerCase();

    if (!categoryMap.has(normalized)) {
      categoryMap.set(normalized, category);
    }
  });

  return ["All", ...categoryMap.values()];
}, [blogs]);

  /* ============================================================
     FEATURED BLOG

     Backend:
       featured: true

     If multiple are marked featured, the newest one is used.

     If none are featured, we use the newest blog as fallback.
  ============================================================ */

  const featuredBlog = useMemo(() => {
    if (!blogs.length) {
      return null;
    }

    const featuredBlogs = blogs
      .filter((blog) => blog.featured === true)
      .sort(
        (a, b) =>
          new Date(b.publishedAt || 0) -
          new Date(a.publishedAt || 0)
      );

    if (featuredBlogs.length > 0) {
      return featuredBlogs[0];
    }

    return [...blogs].sort(
      (a, b) =>
        new Date(b.publishedAt || 0) -
        new Date(a.publishedAt || 0)
    )[0];
  }, [blogs]);

  /* ============================================================
     NON-FEATURED BLOGS
  ============================================================ */

  const journalBlogs = useMemo(() => {
    if (!blogs.length) {
      return [];
    }

    return blogs.filter(
      (blog) => blog._id !== featuredBlog?._id
    );
  }, [blogs, featuredBlog]);

  /* ============================================================
     FILTER BLOGS
  ============================================================ */
const visibleBlogs = useMemo(() => {
  if (!blogs.length) {
    return [];
  }
  if (active === "All") {
    return journalBlogs;
  }

  return blogs.filter(
    (blog) =>blog.category?.trim().toLowerCase() ===active.trim().toLowerCase()
  );
}, [active, blogs, journalBlogs]);

  /* ============================================================
     CATEGORY CHANGE
  ============================================================ */

  const handleCategoryChange = (category) => {
    setActive(category);

    setExpandedPost(null);
  };

  /* ============================================================
     CARD TOGGLE
  ============================================================ */

  const handleCardToggle = (id) => {
    setExpandedPost((current) =>
      current === id ? null : id
    );
  };

  /* ============================================================
     LOAD MORE
  ============================================================ */

  const handleLoadMore = () => {
    if (!pagination?.hasNextPage) {
      return;
    }

    const nextPage =
      Number(pagination.currentPage || 1) + 1;

    dispatch(
      fetchBlogs({
        page: nextPage,
        limit: pagination.limit || 10,
      })
    );
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (status === "loading" && blogs.length === 0) {
    return (
      <section className="bg-[#F2FAFB] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-24 text-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#124D56]/8
            "
          >
            <Loader2
              className="h-6 w-6 animate-spin text-[#124D56]"
            />
          </div>

          <p
            className="
              mt-5
              font-['IBM_Plex_Mono']
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#124D56]/45
            "
          >
            Loading journal
          </p>
        </div>
      </section>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (status === "failed" && blogs.length === 0) {
    return (
      <section className="bg-[#F2FAFB] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl py-20 text-center">
          <span
            className="
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#F58634]
            "
          >
            The Journal
          </span>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-4xl
              font-medium
              text-[#0B3C49]
            "
          >
            We couldn't load the stories.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              font-['Inter']
              text-sm
              leading-relaxed
              text-[#124D56]/60
            "
          >
            {error ||
              "Something went wrong while loading our travel journal."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                fetchBlogs({
                  page: 1,
                  limit: 10,
                })
              )
            }
            className="
              mt-7
              cursor-pointer
              rounded-full
              bg-[#124D56]
              px-6
              py-3
              font-['Inter']
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#0B3C49]
            "
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* ============================================================
     EMPTY
  ============================================================ */

  if (!blogs.length) {
    return (
      <section className="bg-[#F2FAFB] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl py-20 text-center">
          <span
            className="
              font-['Inter']
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#F58634]
            "
          >
            The Journal
          </span>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-4xl
              font-medium
              text-[#0B3C49]
            "
          >
            Stories are on their way.
          </h2>

          <p
            className="
              mt-4
              font-['Inter']
              text-sm
              text-[#124D56]/60
            "
          >
            We don't have any published stories yet.
          </p>
        </div>
      </section>
    );
  }

  /* ============================================================
     RETURN
  ============================================================ */

  return (
    <section
      className="
        bg-[#F2FAFB]
        px-5
        py-13
        md:px-10
        lg:px-16
        lg:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* ==================================================
            SECTION INTRO
        ================================================== */}

        <div className="mb-12 max-w-2xl md:mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#F58634]" />

            <span
              className="
                font-['Inter']
                text-[10px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#F58634]
              "
            >
              The Journal
            </span>
          </div>

          <h2
            className="
              mt-5
              font-['Fraunces']
              text-[clamp(2.3rem,4vw,3.7rem)]
              font-medium
              leading-[1.03]
              tracking-[-0.02em]
              text-[#0B3C49]
            "
          >
            Notes from the road,
            <br />

            <span className="text-[#124D56]/40">
              before you book it.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              font-['Inter']
              text-[15px]
              leading-[1.75]
              text-[#124D56]/60
            "
          >
            Field-tested routes, honest timing advice, and the details our
            travellers wished someone had told them first.
          </p>
        </div>

        {/* ==================================================
            CATEGORY FILTER
        ================================================== */}

        <div
          className="
            mb-12
            flex
            flex-wrap
            gap-2
            md:mb-14
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                handleCategoryChange(category)
              }
              className={`
                cursor-pointer
                rounded-full
                border
                px-5
                py-2
                font-['Inter']
                text-[12px]
                font-medium
                transition-all
                duration-300
                ${
                  active === category
                    ? `
                      border-[#124D56]
                      bg-[#124D56]
                      text-white
                      shadow-[0_5px_18px_rgba(18,77,86,0.15)]
                    `
                    : `
                      border-[#124D56]/15
                      bg-transparent
                      text-[#124D56]/65
                      hover:border-[#124D56]/35
                      hover:bg-white
                      hover:text-[#0B3C49]
                    `
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ==================================================
            FEATURED STORY

            Always show the featured blog on "All".
        ================================================== */}

        {active === "All" && featuredBlog && (
          <FeaturedStory blog={featuredBlog} />
        )}

        {/* ==================================================
            JOURNAL GRID
        ================================================== */}

        {visibleBlogs.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-x-10
              gap-y-10
              md:grid-cols-2
              lg:gap-x-12
              lg:gap-y-12
            "
          >
            {visibleBlogs.map((blog, index) => (
              <JournalCard
                key={blog._id || blog.slug}
                blog={blog}
                number={active === "All" ? index + 2 : index + 1}
                expanded={
                  expandedPost === (blog._id || blog.slug)
                }
                onToggle={() =>
                  handleCardToggle(blog._id || blog.slug)
                }
              />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-[28px]
              border
              border-[#124D56]/10
              bg-white
              px-6
              py-16
              text-center
            "
          >
            <h3
              className="
                font-['Fraunces']
                text-3xl
                font-medium
                text-[#0B3C49]
              "
            >
              No stories in this category yet.
            </h3>

            <p
              className="
                mt-3
                font-['Inter']
                text-sm
                text-[#124D56]/55
              "
            >
              Try another category from the journal.
            </p>

            <button
              type="button"
              onClick={() =>
                handleCategoryChange("All")
              }
              className="
                mt-6
                cursor-pointer
                rounded-full
                bg-[#124D56]
                px-6
                py-3
                font-['Inter']
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#0B3C49]
              "
            >
              View all stories
            </button>
          </div>
        )}

        {/* ==================================================
            LOAD MORE
        ================================================== */}

        {pagination?.hasNextPage && (
          <div className="mt-20 text-center md:mt-24">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={status === "loading"}
              className="
                group
                inline-flex
                cursor-pointer
                items-center
                gap-3
                rounded-full
                border
                border-[#124D56]/20
                bg-transparent
                px-7
                py-3
                font-['Inter']
                text-[12px]
                font-semibold
                text-[#124D56]
                transition-all
                duration-300
                hover:border-[#124D56]
                hover:bg-[#124D56]
                hover:text-white
                hover:shadow-[0_8px_25px_rgba(18,77,86,0.15)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />

                  <span>Loading stories</span>
                </>
              ) : (
                <>
                  <span>Load more stories</span>

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-y-1
                    "
                  >
                    ↓
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ==================================================
            FOOTER LABEL
        ================================================== */}

        <div
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-4
            font-['IBM_Plex_Mono']
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#124D56]/25
          "
        >
          <span className="text-[14px] text-[#124D56]">
            Times India Travels
          </span>

          <span className="h-px w-8 bg-[#124D56]/15" />

          <span className="text-[14px] text-[#124D56]">
            Stories from India
          </span>
        </div>
      </div>
    </section>
  );
}