"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ArrowRight, Loader2, X } from "lucide-react";

import { fetchBlogs } from "../../features/Blogs-page/blog_Slice";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85";

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

function calculateReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (!words) {
    return "3 min read";
  }

  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min read`;
}

function MetaRow({ date, readTime, light = false }) {
  return (
    <div
      className={`
        flex
        items-center
        gap-2.5
        font-['IBM_Plex_Mono']
        text-[9px]
        uppercase
        tracking-wider
        sm:gap-3
        sm:text-[10px]
        ${light ? "text-white/55" : "text-[#0B3C49]/40"}
      `}
    >
      {date && <span>{date}</span>}

      {date && readTime && (
        <span
          className={`
            h-1
            w-1
            shrink-0
            rounded-full
            ${light ? "bg-white/30" : "bg-[#0B3C49]/25"}
          `}
        />
      )}

      {readTime && <span>{readTime}</span>}
    </div>
  );
}

function FeaturedStory({ blog }) {
  const router = useRouter();

  if (!blog) return null;

  const image = blog.image || FALLBACK_IMAGE;
  const date = formatDate(blog.publishedAt);
  const readTime = calculateReadTime(blog.shortDescription);

  return (
    <article
      className="
        group
        relative
        mb-8
        overflow-hidden
        rounded-3xl
        bg-[#0B3C49]
        shadow-[0_15px_40px_rgba(11,60,73,0.12)]
        md:mb-14
        md:rounded-4xl
        md:shadow-[0_25px_70px_rgba(11,60,73,0.12)]
      "
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={blog.title || "Featured story"}
          fill
          sizes="100vw"
          className="
            object-cover
            transition-transform
            duration-1400
            ease-out
            group-hover:scale-[1.07]
          "
          priority
          fetchPriority="high"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        
        <div
          className="
          absolute
          inset-0
          bg-linear-to-r
          from-black/55
          via-black/20
          to-transparent
          md:from-black/60
          md:via-black/20
          md:to-transparent
          "
        />
      </div>

      <div
        className="
          absolute
          left-4
          top-4
          z-10
          flex
          items-center
          gap-3
          sm:left-7
          sm:top-7
          md:left-10
          md:top-10
          md:gap-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/30
            backdrop-blur-md
            sm:h-12
            sm:w-12
          "
        >
          <span className="font-['IBM_Plex_Mono'] text-[9px] text-white sm:text-[11px]">
            01
          </span>
        </div>

        <div className="hidden h-px w-12 bg-white/25 sm:block" />

        <span
          className="
            font-['Playfair',serif]
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-white/75
            sm:text-[10px]
            sm:tracking-[0.25em]
          "
        >
          Featured story
        </span>
      </div>

      <div
        className="
          relative
          z-10
          flex
          min-h-105
          items-end
          p-5
          pt-24
          sm:min-h-130
          sm:p-8
          sm:pt-28
          md:min-h-155
          md:p-10
          md:pt-10
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
          <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
            {blog.category && (
              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#F58634]
                  sm:text-[10px]
                  sm:tracking-[0.22em]
                "
              >
                {blog.category}
              </span>
            )}

            {blog.category && blog.tags?.length > 0 && (
              <span className="h-px w-6 bg-[#F58634]/70 sm:w-8" />
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

          <h2
            className="
              max-w-3xl
              font-['Fraunces']
              text-[clamp(1.9rem,7vw,4.7rem)]
              font-medium
              leading-[1.02]
              tracking-tight
              text-white
              sm:leading-[0.98]
            "
          >
            {blog.title}
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              font-['Inter']
              text-[13px]
              leading-[1.65]
              text-white/70
              sm:mt-6
              sm:text-[14px]
              sm:leading-[1.75]
              md:text-[15px]
            "
          >
            {blog.shortDescription}
          </p>

          <div
            className="
              mt-5
              flex
              flex-col
              items-start
              gap-4
              sm:mt-8
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-5
            "
          >
            <MetaRow date={date} readTime={readTime} light />

            <button
              type="button"
              onClick={() => router.push(`/blog/${blog.slug}`)}
              className="
                inline-flex
                w-fit
                cursor-pointer
                items-center
                gap-2.5
                border-b
                border-white/30
                pb-2
                font-['Inter']
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white
                transition-all
                duration-500
                hover:border-[#F58634]
                active:border-[#F58634]
                sm:gap-3
                sm:text-[11px]
                sm:tracking-[0.16em]
              "
            >
              <span>Explore story</span>

              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F58634]
                  transition-transform
                  duration-500
                  group-hover:translate-x-2
                  sm:h-7
                  sm:w-7
                "
              >
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </button>
          </div>

          {blog.author && (
            <p
              className="
                mt-3
                font-['IBM_Plex_Mono']
                text-[8px]
                uppercase
                tracking-[0.06em]
                text-white/35
                sm:mt-5
                sm:text-[9px]
                sm:tracking-[0.08em]
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
        rounded-3xl
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        sm:rounded-[28px]
        ${
          expanded
            ? "min-h-110 bg-[#0B3C49] shadow-[0_20px_50px_rgba(11,60,73,0.22)] sm:min-h-120 md:min-h-140 md:shadow-[0_30px_80px_rgba(11,60,73,0.22)]"
            : "bg-transparent shadow-[0_6px_20px_rgba(11,60,73,0.04)] sm:shadow-[0_8px_30px_rgba(11,60,73,0.04)]"
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
          rounded-3xl
          sm:rounded-[26px]
          ${
            expanded
              ? "min-h-110 sm:min-h-120 md:min-h-140"
              : "aspect-4/3 sm:aspect-16/11"
          }
        `}
      >
        <Image
          src={image}
          alt={blog.title || "Journal story"}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`
            object-cover
            transition-transform
            duration-1200
            ease-out
            ${
              expanded
                ? "scale-[1.04] group-hover:scale-[1.07]"
                : "group-hover:scale-[1.08]"
            }
          `}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div
          className={`
            absolute
            inset-0
            transition-all
            duration-700
            ${
              expanded
                ? "bg-linear-to-t from-black/95 via-black/55 to-black/5"
                : "bg-linear-to-t from-black/75 via-black/20 to-transparent"
            }
          `}
        />

        <div
          className={`
            absolute
            inset-0
            hidden
            bg-linear-to-r
            from-black/75
            via-transparent
            to-transparent
            transition-opacity
            duration-700
            sm:block
            ${expanded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Number badge */}
        <div
          className="
            absolute
            left-3.5
            top-3.5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/30
            backdrop-blur-md
            sm:left-5
            sm:top-5
            sm:h-11
            sm:w-11
          "
        >
          <span className="font-['IBM_Plex_Mono'] text-[9px] text-white sm:text-[10px]">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        {/* Category badge */}
        {blog.category && (
          <div
            className="
              absolute
              right-3.5
              top-3.5
              rounded-full
              border
              border-white/20
              bg-black/30
              px-3
              py-1.5
              backdrop-blur-md
              sm:right-5
              sm:top-5
              sm:px-3.5
              sm:py-2
            "
          >
            <span
              className="
                font-['Playfair',serif]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white
                sm:text-[9px]
                sm:tracking-[0.16em]
              "
            >
              {blog.category}
            </span>
          </div>
        )}

        {/* Collapsed preview text */}
        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            p-4
            transition-all
            duration-500
            sm:p-5
            ${
              expanded ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
            }
          `}
        >
          <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
            <span className="h-px w-5 bg-[#F58634] sm:w-6" />

            {blog.tags?.length > 0 ? (
              <span
                className="
                  font-['Playfair',serif]
                  text-[8px]
                  uppercase
                  tracking-[0.06em]
                  text-white/70
                  sm:text-[9px]
                  sm:tracking-[0.08em]
                "
              >
                {blog.tags.slice(0, 3).join(" · ")}
              </span>
            ) : (
              blog.category && (
                <span
                  className="
                    font-['Playfair',serif]
                    text-[8px]
                    uppercase
                    tracking-[0.06em]
                    text-white/70
                    sm:text-[9px]
                    sm:tracking-[0.08em]
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
              font-['Playfair_Display',serif]
              text-[clamp(1.25rem,5vw,2.2rem)]
              font-medium
              leading-[1.1]
              text-white
              sm:leading-[1.08]
            "
          >
            {blog.title}
          </h3>
        </div>

        {/* Expanded content */}
        <div
          className={`
            absolute
            inset-x-0
            bottom-0
            p-5
            transition-all
            duration-700
            sm:p-7
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
            <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
              {blog.category && (
                <span
                  className="
                    font-['Inter']
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#F58634]
                    sm:text-[10px]
                    sm:tracking-[0.22em]
                  "
                >
                  {blog.category}
                </span>
              )}

              {blog.category && blog.tags?.length > 0 && (
                <span className="h-px w-6 bg-[#F58634]/70 sm:w-8" />
              )}

              {blog.tags?.length > 0 && (
                <span
                  className="
                    hidden
                    font-['IBM_Plex_Mono']
                    text-[9px]
                    uppercase
                    tracking-[0.06em]
                    text-white/55
                    sm:block
                  "
                >
                  {blog.tags.slice(0, 4).join(" · ")}
                </span>
              )}
            </div>

            <h3
              className="
                max-w-3xl
                font-['Playfair_Display',serif]
                text-[clamp(1.5rem,7vw,3.6rem)]
                font-medium
                leading-[1.05]
                tracking-[-0.01em]
                text-white
                sm:leading-none
                sm:tracking-[-0.02em]
              "
            >
              {blog.title}
            </h3>

            <p
              className="
                mt-3
                max-w-2xl
                font-['Noto_Sans',sans-serif]
                text-[12px]
                leading-[1.7]
                text-white/70
                sm:mt-5
                sm:text-[13px]
                sm:leading-[1.8]
                md:text-[14px]
              "
            >
              {blog.shortDescription}
            </p>

            {blog.author && (
              <p
                className="
                  mt-3
                  font-['Noto_Sans',sans-serif]
                  text-[8px]
                  uppercase
                  tracking-[0.06em]
                  text-white/35
                  sm:mt-4
                  sm:text-[9px]
                  sm:tracking-[0.08em]
                "
              >
                By {blog.author}
              </p>
            )}

            <div
              className="
                mt-5
                flex
                flex-col
                items-start
                gap-4
                sm:mt-7
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:gap-5
              "
            >
              <MetaRow date={date} readTime={readTime} light />

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
                  gap-2.5
                  border-b
                  border-[#F58634]/50
                  bg-transparent
                  pb-2
                  font-['Inter']
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#F58634]
                  active:border-[#F58634]
                  sm:gap-3
                  sm:text-[11px]
                  sm:tracking-[0.16em]
                "
              >
                <span>Read More</span>

                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F58634]
                    text-white
                    transition-transform
                    duration-300
                    group-hover/read:translate-x-1
                    sm:h-7
                    sm:w-7
                  "
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {expanded && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/40
              font-['Inter']
              text-base
              font-light
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-black/70
              active:bg-black/70
              sm:right-6
              sm:top-6
              sm:h-9
              sm:w-9
              sm:text-lg
            "
            aria-label="Close story"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

export default function BlogJournal({ initialBlogs = [] }) {
  const dispatch = useDispatch();

  const {
    blogs: reduxBlogs = [],
    status: reduxStatus = "idle",
    error = null,
    pagination = {
      currentPage: 1,
      limit: initialBlogs.length || 10,
      totalPages: 1,
    },
  } = useSelector((state) => state.blog);

  const blogs = initialBlogs.length > 0 ? initialBlogs : reduxBlogs;

  const status = initialBlogs.length > 0 ? "succeeded" : reduxStatus;

  const [active, setActive] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

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

  const featuredBlog = useMemo(() => {
    if (!blogs.length) {
      return null;
    }

    const featuredBlogs = blogs
      .filter((blog) => blog.featured === true)
      .sort(
        (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
      );

    if (featuredBlogs.length > 0) {
      return featuredBlogs[0];
    }

    return [...blogs].sort(
      (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
    )[0];
  }, [blogs]);

  const journalBlogs = useMemo(() => {
    if (!blogs.length) {
      return [];
    }

    return blogs.filter((blog) => blog._id !== featuredBlog?._id);
  }, [blogs, featuredBlog]);

  const visibleBlogs = useMemo(() => {
    if (!blogs.length) {
      return [];
    }

    if (active === "All") {
      return journalBlogs;
    }

    return blogs.filter(
      (blog) =>
        blog.category?.trim().toLowerCase() === active.trim().toLowerCase(),
    );
  }, [active, blogs, journalBlogs]);

  const handleCategoryChange = (category) => {
    setActive(category);
    setExpandedPost(null);
  };

  const handleCardToggle = (id) => {
    setExpandedPost((current) => (current === id ? null : id));
  };

  const handleLoadMore = () => {
    if (!pagination?.hasNextPage) {
      return;
    }

    const nextPage = Number(pagination.currentPage || 1) + 1;

    dispatch(
      fetchBlogs({
        page: nextPage,
        limit: pagination.limit || 10,
      }),
    );
  };

  if (status === "loading" && blogs.length === 0) {
    return (
      <section className="bg-[#FAF5EB] px-4 py-14 sm:px-5 sm:py-20 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center py-16 text-center sm:py-24">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#124D56]/8
              sm:h-14
              sm:w-14
            "
          >
            <Loader2 className="h-5 w-5 animate-spin text-[#124D56] sm:h-6 sm:w-6" />
          </div>

          <p
            className="
              mt-4
              font-['IBM_Plex_Mono']
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-[#124D56]/45
              sm:mt-5
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            Loading journal
          </p>
        </div>
      </section>
    );
  }

  if (status === "failed" && blogs.length === 0) {
    return (
      <section className="bg-[#FAF5EB] px-4 py-14 sm:px-5 sm:py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl py-14 text-center sm:py-20">
          <span
            className="
              font-['Inter']
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#F58634]
              sm:text-[10px]
              sm:tracking-[0.25em]
            "
          >
            The Journal
          </span>

          <h2
            className="
              mt-4
              font-['Fraunces']
              text-[clamp(1.75rem,7vw,2.25rem)]
              font-medium
              text-[#0B3C49]
            "
          >
            We couldn&apos;t load the stories.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              font-['Inter']
              text-[13px]
              leading-relaxed
              text-[#124D56]/60
              sm:text-sm
            "
          >
            {error || "Something went wrong while loading our travel journal."}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                fetchBlogs({
                  page: 1,
                  limit: 10,
                }),
              )
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
              active:bg-[#0B3C49]
              sm:mt-7
            "
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section className="bg-[#FAF5EB] px-4 py-14 sm:px-5 sm:py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl py-14 text-center sm:py-20">
          <span
            className="
              font-['Playfair',serif]
              text-[9px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#F58634]
              sm:text-[10px]
              sm:tracking-[0.25em]
            "
          >
            The Journal
          </span>

          <h2
            className="
              mt-4
              font-['Playfair_Display',serif]
              text-[clamp(1.75rem,7vw,2.25rem)]
              font-medium
              text-[#0B3C49]
            "
          >
            Stories are on their way.
          </h2>

          <p
            className="
              mt-4
              font-['Playfair_Display',serif]
              text-[13px]
              text-[#124D56]/60
              sm:text-sm
            "
          >
            We don&apos;t have any published stories yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        bg-[#FAF5EB]
        px-4
        py-10
        sm:px-5
        sm:py-13
        md:px-10
        lg:px-16
        lg:py-14
      "
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-12 md:mb-14">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 bg-[#B85128] sm:w-8" />

            <span
              className="
                font-['Playfair',serif]
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#B85128]
                sm:text-[10px]
                sm:tracking-[0.28em]
              "
            >
              The Journal
            </span>

            <span className="h-px w-6 bg-[#B85128] sm:w-8" />
          </div>

          <h2
            className="
              mt-4
              font-['Playfair_Display',serif]
              text-[clamp(2rem,8vw,4.2rem)]
              font-medium
              leading-[1.06]
              tracking-tight
              text-[#173C3A]
              sm:mt-5
              sm:leading-[1.02]
            "
          >
            Notes from the road,
            <br />
            <span className="text-[#476763]/60">before you book it.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-['Noto_Sans',sans-serif]
              text-[14px]
              leading-[1.7]
              text-[#476763]/65
              sm:mt-7
              sm:text-[17px]
              sm:leading-[1.8]
              md:text-[18px]
              md:leading-[1.85]
            "
          >
            Field-tested routes, honest timing advice, and the details our
            travellers wished someone had told them first.
          </p>
        </div>

        {/* Category filter: horizontally scrollable on mobile, wraps from sm up */}
        <div
          className="
            mb-8
            -mx-4
            flex
            gap-2
            overflow-x-auto
            px-4
            pb-1
            scrollbar-none
            [&::-webkit-scrollbar]:hidden
            sm:mx-0
            sm:mb-12
            sm:flex-wrap
            sm:overflow-visible
            sm:px-0
            sm:pb-0
            md:mb-14
          "
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`
                shrink-0
                cursor-pointer
                rounded-full
                border
                px-4
                py-2
                font-['Playfair',serif]
                text-[11px]
                font-medium
                whitespace-nowrap
                transition-all
                duration-300
                sm:px-5
                sm:text-[12px]
                ${
                  active === category
                    ? "border-[#124D56] bg-[#124D56] text-white shadow-[0_5px_18px_rgba(18,77,86,0.15)]"
                    : "border-[#124D56]/15 bg-transparent text-[#124D56]/65 hover:border-[#124D56]/35 hover:bg-white hover:text-[#0B3C49] active:border-[#124D56]/35 active:bg-white active:text-[#0B3C49]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {active === "All" && featuredBlog && (
          <FeaturedStory blog={featuredBlog} />
        )}

        {visibleBlogs.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-x-6
              gap-y-6
              sm:gap-x-10
              sm:gap-y-10
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
                expanded={expandedPost === (blog._id || blog.slug)}
                onToggle={() => handleCardToggle(blog._id || blog.slug)}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-3xl
              border
              border-[#124D56]/10
              bg-white
              px-5
              py-12
              text-center
              sm:rounded-[28px]
              sm:px-6
              sm:py-16
            "
          >
            <h3
              className="
                font-['Fraunces']
                text-2xl
                font-medium
                text-[#0B3C49]
                sm:text-3xl
              "
            >
              No stories in this category yet.
            </h3>

            <p
              className="
                mt-3
                font-['Inter']
                text-[13px]
                text-[#124D56]/55
                sm:text-sm
              "
            >
              Try another category from the journal.
            </p>

            <button
              type="button"
              onClick={() => handleCategoryChange("All")}
              className="
                mt-5
                cursor-pointer
                rounded-full
                bg-[#124D56]
                px-6
                py-3
                font-['Playfair_Display',serif]
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#0B3C49]
                active:bg-[#0B3C49]
                sm:mt-6
              "
            >
              View all stories
            </button>
          </div>
        )}

        {pagination?.hasNextPage && (
          <div className="mt-14 text-center sm:mt-20 md:mt-24">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={status === "loading"}
              className="
                group
                inline-flex
                cursor-pointer
                items-center
                gap-2.5
                rounded-full
                border
                border-[#124D56]/20
                bg-transparent
                px-6
                py-3
                font-['Inter']
                text-[11px]
                font-semibold
                text-[#124D56]
                transition-all
                duration-300
                hover:border-[#124D56]
                hover:bg-[#124D56]
                hover:text-white
                hover:shadow-[0_8px_25px_rgba(18,77,86,0.15)]
                active:border-[#124D56]
                active:bg-[#124D56]
                active:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:gap-3
                sm:px-7
                sm:text-[12px]
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

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            font-['Playfair',serif]
            text-[8px]
            uppercase
            tracking-[0.14em]
            text-[#124D56]/25
            sm:mt-12
            sm:gap-4
            sm:text-[9px]
            sm:tracking-[0.18em]
          "
        >
          <span className="text-[12px] text-[#124D56] sm:text-[14px]">
            Times India Travels
          </span>

          <span className="h-px w-6 bg-[#124D56]/15 sm:w-8" />

          <span className="text-[12px] text-[#124D56] sm:text-[14px]">
            Stories from India
          </span>
        </div>
      </div>
    </section>
  );
}