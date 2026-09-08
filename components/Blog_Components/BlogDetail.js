"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MapPin,
  Share2,
} from "lucide-react";

import {
  fetchBlogBySlug,
  fetchBlogs,
} from "../../features/Blogs-page/blog_Slice";

import Floating_Quotation_Form from "../Floating_Quotation_Form";


const FALLBACK_IMAGE ="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=85";
const DETAIL_HERO_IMAGE ="https://i.pinimg.com/736x/3f/91/5d/3f915da54cea988a288766c123be003a.jpg";


function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadTime(text = "") {
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (!words) {
    return "3 min read";
  }

  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min read`;
}

function ArticleMeta({ blog, light = false }) {
  const date = formatDate(blog?.publishedAt);
  const readTime = calculateReadTime(blog?.content);

  return (
    <div
      className={`
        flex
        flex-wrap
        items-center
        gap-x-4
        gap-y-2
        font-['IBM_Plex_Mono']
        text-[8px]
        uppercase
        tracking-[0.13em]
        ${
          light
            ? "text-white/55"
            : "text-[#124D56]/45"
        }
      `}
    >
      {blog?.author && <span>By {blog.author}</span>}

      {blog?.author && date && (
        <span
          className={`
            h-1
            w-1
            rounded-full
            ${light ? "bg-white/25" : "bg-[#124D56]/20"}
          `}
        />
      )}

      {date && <span>{date}</span>}

      {date && (
        <span
          className={`
            h-1
            w-1
            rounded-full
            ${light ? "bg-white/25" : "bg-[#124D56]/20"}
          `}
        />
      )}

      <span>{readTime}</span>
    </div>
  );
}

function BlogContent({ content }) {
  if (!content) return null;

  const paragraphs = content
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div
      className="
        font-['Inter']
        text-[16px]
        leading-[1.95]
        text-[#183F48]/75
        md:text-[17px]
        md:leading-loose
      "
    >
      {paragraphs.map((paragraph, index) => {
        const lines = paragraph.split("\n");

        return (
          <p
            key={index}
            className="
              mb-8
              whitespace-pre-line
              last:mb-0
            "
          >
            {lines.join("\n")}
          </p>
        );
      })}
    </div>
  );
}


function RelatedPostCard({ blog }) {
  if (!blog) return null;

  const image = blog.image || FALLBACK_IMAGE;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-[28px]
        border
        border-[#124D56]/8
        bg-white
        shadow-[0_15px_50px_rgba(11,60,73,0.045)]
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_28px_70px_rgba(11,60,73,0.12)]
      "
    >
      {/* IMAGE */}

      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={image}
          alt={blog.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-1200
            ease-out
            group-hover:scale-[1.07]
          "
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-[#071D24]/70
            via-[#071D24]/5
            to-transparent
          "
        />

        {blog.category && (
          <div className="absolute left-5 top-5">
            <span
              className="
                rounded-full
                border
                border-white/20
                bg-black/20
                px-3.5
                py-2
                font-['Inter']
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                backdrop-blur-md
              "
            >
              {blog.category}
            </span>
          </div>
        )}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-['IBM_Plex_Mono']
              text-[8px]
              uppercase
              tracking-widest
              text-white/65
            "
          >
            {formatDate(blog.publishedAt)}
          </span>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-6 md:p-7">
        <h3
          className="
            font-['Fraunces']
            text-[clamp(1.5rem,2.5vw,2rem)]
            font-medium
            leading-[1.08]
            tracking-tight
            text-[#0B3C49]
          "
        >
          {blog.title}
        </h3>

        {blog.shortDescription && (
          <p
            className="
              mt-4
              line-clamp-3
              font-['Inter']
              text-[13px]
              leading-[1.75]
              text-[#124D56]/55
            "
          >
            {blog.shortDescription}
          </p>
        )}

        <div
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            border-b
            border-[#124D56]/15
            pb-1.5
            font-['Inter']
            text-[9px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-[#124D56]
            transition-all
            duration-300
            group-hover:border-[#F58634]
          "
        >
          <span>Read story</span>

          <ArrowRight
            className="
              h-3.5
              w-3.5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </div>
      </div>
    </Link>
  );
}

function RelatedPosts({ currentBlog, blogs }) {
  const relatedBlogs = useMemo(() => {
    if (!currentBlog || !blogs?.length) {
      return [];
    }

    const currentId = currentBlog._id;
    const currentSlug = currentBlog.slug;

    const currentCategory = currentBlog.category
      ?.trim()
      .toLowerCase();

    const candidates = blogs.filter((blog) => {
      if (!blog) return false;

      if (blog._id === currentId) {
        return false;
      }

      if (blog.slug === currentSlug) {
        return false;
      }

      return true;
    });

    const sameCategory = candidates.filter((blog) => {
      if (!currentCategory) return false;

      return (
        blog.category?.trim().toLowerCase() ===
        currentCategory
      );
    });

    const otherBlogs = candidates.filter((blog) => {
      if (!currentCategory) return true;

      return (
        blog.category?.trim().toLowerCase() !==
        currentCategory
      );
    });

    return [...sameCategory, ...otherBlogs].slice(0, 3);
  }, [currentBlog, blogs]);

  if (!relatedBlogs.length) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-[#124D56]/8
        bg-[#F2FAFB]
        px-5
        py-20
        md:px-10
        md:py-28
        lg:px-16
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div
          className="
            mb-12
            flex
            flex-col
            gap-7
            md:mb-14
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#F58634]
                "
              >
                Continue Exploring
              </span>
            </div>

            <h2
              className="
                mt-4
                max-w-2xl
                font-['Fraunces']
                text-[clamp(2.4rem,5vw,4.5rem)]
                font-medium
                leading-[0.95]
                tracking-[-0.035em]
                text-[#0B3C49]
              "
            >
              More stories from
              <br></br>
              <span className="text-cyan-500">
                the road.
              </span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-3
              border-b
              border-[#124D56]/15
              pb-2
              font-['Inter']
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#124D56]
              transition-all
              duration-300
              hover:border-[#F58634]
            "
          >
            <span>View all stories</span>

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* CARDS */}

        <div
          className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {relatedBlogs.map((blog) => (
            <RelatedPostCard
              key={blog._id || blog.slug}
              blog={blog}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogDetail({ initialBlog = null, initialBlogs = [] }) {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [showQuotationForm, setShowQuotationForm] =
    useState(false);

  const {
    selectedBlog: reduxSelectedBlog,
    blogs: reduxBlogs = [],
    detailStatus: reduxDetailStatus = "idle",
    detailError = null,
    status: reduxStatus = "idle",
  } = useSelector((state) => state.blog);

  const selectedBlog = initialBlog || reduxSelectedBlog;
  const blogs = initialBlogs.length > 0 ? initialBlogs : reduxBlogs;
  const detailStatus = initialBlog ? "succeeded" : reduxDetailStatus;
  const status = initialBlogs.length > 0 ? "succeeded" : reduxStatus;

  useEffect(() => {
    if (!slug || initialBlog) return;
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch, slug, initialBlog]);

  useEffect(() => {
    if (initialBlogs.length > 0 || status !== "idle") return;
    dispatch(fetchBlogs({ page: 1, limit: 10 }));
  }, [dispatch, status, initialBlogs.length]);

  if (detailStatus === "loading" ||detailStatus === "idle") {
    return (
      <main className="min-h-screen bg-[#F2FAFB]">
        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            px-5
          "
        >
          <div className="text-center">

            <div
              className="
                mx-auto
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
                className="
                  h-6
                  w-6
                  animate-spin
                  text-[#124D56]
                "
              />
            </div>

            <p
              className="
                mt-5
                font-['IBM_Plex_Mono']
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#124D56]/45
              "
            >
              Loading story
            </p>

          </div>
        </section>
      </main>
    );
  }

  if (detailStatus === "failed" ||!selectedBlog) {
    return (
      <main className="min-h-screen bg-[#F2FAFB]">
        <section
          className="
            flex
            min-h-[80vh]
            items-center
            justify-center
            px-5
          "
        >
          <div className="max-w-xl text-center">

            <span
              className="
                font-['Inter']
                text-[9px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#F58634]
              "
            >
              The India Travel Journal
            </span>

            <h1
              className="
                mt-5
                font-['Fraunces']
                text-[clamp(2.8rem,7vw,5rem)]
                font-medium
                leading-[0.95]
                tracking-[-0.035em]
                text-[#0B3C49]
              "
            >
              Story not found.
            </h1>

            <p
              className="
                mx-auto
                mt-5
                max-w-md
                font-['Inter']
                text-sm
                leading-[1.8]
                text-[#124D56]/55
              "
            >
              {detailError ||
                "The story you're looking for is no longer available."}
            </p>

            <Link
              href="/blog"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#124D56]
                px-6
                py-3.5
                font-['Inter']
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
                transition-all
                duration-300
                hover:bg-[#0B3C49]
              "
            >
              <ArrowLeft className="h-4 w-4" />

              <span>
                Back to journal
              </span>
            </Link>

          </div>
        </section>
      </main>
    );
  }

  const image =selectedBlog.image || FALLBACK_IMAGE;
  const date =formatDate(selectedBlog.publishedAt);
  const readTime =calculateReadTime(selectedBlog.content);

  return (
    <>
      <main className="bg-[#F2FAFB]">

        <section
          className="
            hero-section
            relative
            flex
            min-h-105
            items-center
            justify-center
            overflow-hidden
            bg-cover
            bg-center
            px-5
            py-28
            sm:min-h-117.5
            md:min-h-135
            md:px-10
            lg:px-16
          "
          style={{
            backgroundImage:
              `url('${DETAIL_HERO_IMAGE}')`,
          }}
        >

          {/* DARK OVERLAY */}

        <div
            className="absolute inset-0"
            style={{
            background:
                "radial-gradient(circle at 50% 42%, rgba(10,18,32,0.18), rgba(10,18,32,0.68) 88%)",
            }}
        />
          {/* HERO CONTENT */}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-4xl
              text-center
            "
          >

            <p
              className="
                mb-5
                font-['Inter']
                text-[9px]
                font-medium
                uppercase
                tracking-[0.38em]
                text-white/70
                sm:text-[10px]
              "
            >
              Beyond the Itinerary
            </p>

            <h1
              className="
                font-['Fraunces']
                text-[clamp(3rem,7vw,6.5rem)]
                font-medium
                leading-[0.92]
                tracking-[-0.035em]
                text-white
                drop-shadow-[0_8px_35px_rgba(0,0,0,0.25)]
              "
            >
              Stories Worth Sharing
            </h1>

            <div
              className="
                mx-auto
                mt-7
                h-0.5
                w-50
                bg-[#F58634]
              "
            />

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                font-['Inter']
                text-[13px]
                font-light
                leading-[1.8]
                tracking-wide
                text-white/70
                sm:text-[14px]
              "
            >
              Travel is more than where you go.
              It is everything you notice along
              the way.
            </p>

          </div>


          {/* CURVED TRANSITION */}

          <svg
            className="
              absolute
              bottom-0
              left-0
              z-10
              h-16.25
              w-full
              text-[#F2FAFB]
              sm:h-20
              md:h-25
            "
            viewBox="0 0 1440 120"
            fill="currentColor"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="
                M0,120
                Q720,15 1440,120
                L1440,120
                L0,120
                Z
              "
            />
          </svg>

        </section>

        <section
          className="
            relative
            px-5
            pb-20
            pt-8
            md:px-10
            md:pb-28
            md:pt-12
            lg:px-16
          "
        >

          <div className="mx-auto max-w-7xl">

            {/* EDITORIAL LABEL */}

            <div
              className="
                mb-10
                flex
                items-center
                justify-center
                gap-3
                md:mb-14
              "
            >
              <span className="h-px w-8 bg-[#F58634]" />

              <span
                className="
                  font-['Inter']
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-[#F58634]
                "
              >
                The Journal
              </span>

              <span className="h-px w-8 bg-[#F58634]" />
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-10
                lg:grid-cols-[1.15fr_0.85fr]
                lg:items-center
                lg:gap-16
                xl:gap-20
              "
            >

              {/* BLOG IMAGE */}

              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  bg-[#DDE9EA]
                  shadow-[0_30px_90px_rgba(11,60,73,0.13)]
                  md:rounded-[36px]
                "
              >

                <div className="aspect-16/11">

                  <img
                    src={image}
                    alt={selectedBlog.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-1400
                      ease-out
                      group-hover:scale-[1.035]
                    "
                    onError={(event) => {
                      event.currentTarget.src =
                        FALLBACK_IMAGE;
                    }}
                  />

                </div>


                {/* IMAGE GRADIENT */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-[#071D24]/35
                    via-transparent
                    to-transparent
                  "
                />


                {/* IMAGE NUMBER */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/15
                    bg-black/20
                    px-4
                    py-2.5
                    backdrop-blur-md
                  "
                >

                  <span
                    className="
                      font-['IBM_Plex_Mono']
                      text-[8px]
                      uppercase
                      tracking-[0.15em]
                      text-white/70
                    "
                  >
                    Field Note
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#F58634]" />

                  <span
                    className="
                      font-['IBM_Plex_Mono']
                      text-[8px]
                      uppercase
                      tracking-[0.15em]
                      text-white/70
                    "
                  >
                    India
                  </span>

                </div>

              </div>


              {/* ARTICLE INFORMATION */}

              <div
                className="
                  flex
                  flex-col
                  lg:py-8
                  xl:py-12
                "
              >

                {/* CATEGORY */}

                {selectedBlog.category && (
                  <div className="flex items-center gap-3">

                    <span className="h-px w-7 bg-[#F58634]" />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#F58634]
                      "
                    >
                      {selectedBlog.category}
                    </span>

                  </div>
                )}


                {/* TITLE */}

                <h2
                  className="
                    mt-6
                    font-['Fraunces']
                    text-[clamp(2.8rem,5vw,5.4rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.04em]
                    text-[#0B3C49]
                  "
                >
                  {selectedBlog.title}
                </h2>


                {/* ACCENT */}

                <div
                  className="
                    mt-7
                    h-px
                    w-16
                    bg-[#F58634]
                  "
                />


                {/* DESCRIPTION */}

                {selectedBlog.shortDescription && (
                  <p
                    className="
                      mt-7
                      max-w-xl
                      font-['Inter']
                      text-[14px]
                      font-light
                      leading-[1.9]
                      text-[#124D56]/65
                      md:text-[15px]
                    "
                  >
                    {selectedBlog.shortDescription}
                  </p>
                )}


                {/* META */}

                <div className="mt-8">
                  <ArticleMeta
                    blog={selectedBlog}
                  />
                </div>


                {/* AUTHOR LINE */}

                <div
                  className="
                    mt-8
                    border-t
                    border-[#124D56]/10
                    pt-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
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
                        bg-[#124D56]/7
                      "
                    >
                      <MapPin
                        className="
                          h-4
                          w-4
                          text-[#124D56]/50
                        "
                      />
                    </div>

                    <div>

                      <p
                        className="
                          font-['Inter']
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-[#124D56]/30
                        "
                      >
                        Written from
                      </p>

                      <p
                        className="
                          mt-1
                          font-['Fraunces']
                          text-lg
                          font-medium
                          text-[#0B3C49]
                        "
                      >
                        India
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        <section
          className="
            px-5
            pb-20
            md:px-10
            md:pb-28
            lg:px-16
          "
        >

          <div className="mx-auto max-w-7xl">

            <div
              className="
                grid
                grid-cols-1
                gap-12
                lg:grid-cols-[180px_minmax(0,720px)_1fr]
                lg:gap-16
              "
            >

              {/* LEFT EDITORIAL RAIL */}

              <aside className="hidden lg:block">

                <div className="sticky top-32">

                  <div className="flex items-center gap-3">

                    <span className="h-px w-6 bg-[#F58634]" />

                    <span
                      className="
                        font-['Inter']
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#F58634]
                      "
                    >
                      The story
                    </span>

                  </div>

                  <p
                    className="
                      mt-4
                      max-w-33.75
                      font-['IBM_Plex_Mono']
                      text-[9px]
                      uppercase
                      leading-[1.8]
                      tracking-wider
                      text-[#124D56]/30
                    "
                  >
                    Field notes from
                    Times India Travels
                  </p>

                  <div className="mt-8 flex items-center gap-3">

                    <MapPin
                      className="
                        h-3.5
                        w-3.5
                        text-[#124D56]/35
                      "
                    />

                    <span
                      className="
                        font-['IBM_Plex_Mono']
                        text-[8px]
                        uppercase
                        tracking-[0.08em]
                        text-[#124D56]/30
                      "
                    >
                      India
                    </span>

                  </div>

                </div>

              </aside>


              {/* ARTICLE */}

              <article>

                {/* MOBILE META */}

                <div className="mb-9 lg:hidden">
                  <ArticleMeta
                    blog={selectedBlog}
                  />
                </div>


                {/* LEAD */}

                {selectedBlog.shortDescription && (
                  <div
                    className="
                      mb-10
                      border-l-2
                      border-[#F58634]/55
                      pl-5
                      md:mb-12
                      md:pl-7
                    "
                  >

                    <p
                      className="
                        font-['Fraunces']
                        text-[clamp(1.5rem,3vw,2.15rem)]
                        font-medium
                        leading-[1.35]
                        tracking-[-0.015em]
                        text-[#0B3C49]
                      "
                    >
                      {selectedBlog.shortDescription}
                    </p>

                  </div>
                )}


                {/* BODY */}

                <BlogContent
                  content={selectedBlog.content}
                />


                {/* TAGS */}

                {selectedBlog.tags?.length > 0 && (
                  <div
                    className="
                      mt-14
                      border-t
                      border-[#124D56]/10
                      pt-7
                    "
                  >

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-2.5
                      "
                    >

                      <span
                        className="
                          mr-2
                          font-['Inter']
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#124D56]/35
                        "
                      >
                        Filed under
                      </span>

                      {selectedBlog.tags.map(
                        (tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="
                              rounded-full
                              border
                              border-[#124D56]/10
                              bg-white
                              px-3.5
                              py-1.5
                              font-['Inter']
                              text-[8px]
                              font-medium
                              uppercase
                              tracking-[0.08em]
                              text-[#124D56]/60
                            "
                          >
                            {tag}
                          </span>
                        )
                      )}

                    </div>

                  </div>
                )}


                {/* AUTHOR / SHARE */}

                <div
                  className="
                    mt-12
                    border-t
                    border-[#124D56]/10
                    pt-7
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          font-['Inter']
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#124D56]/35
                        "
                      >
                        Written by
                      </p>

                      <p
                        className="
                          mt-2
                          font-['Fraunces']
                          text-xl
                          font-medium
                          text-[#0B3C49]
                        "
                      >
                        {selectedBlog.author ||
                          "Times India Travels"}
                      </p>

                    </div>


                    {/* SHARE */}

                    <button
                      type="button"
                      className="
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#124D56]/10
                        bg-white
                        px-4
                        py-2.5
                        font-['Inter']
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-[#124D56]/65
                        transition-all
                        duration-300
                        hover:border-[#F58634]/40
                        hover:text-[#124D56]
                      "
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            window.location.href
                          );
                        } catch (error) {}
                      }}
                    >

                      <Share2 className="h-3.5 w-3.5" />

                      <span>
                        Share story
                      </span>

                    </button>

                  </div>

                </div>

              </article>


              {/* RIGHT EMPTY EDITORIAL SPACE */}

              <div className="hidden lg:block" />

            </div>

          </div>

        </section>

        <section
          className="
            px-5
            pb-20
            md:px-10
            md:pb-28
            lg:px-16
          "
        >

          <div
            className="
              relative
              mx-auto
              max-w-7xl
              overflow-hidden
              rounded-[34px]
              bg-[#0B3C49]
              px-7
              py-12
              md:px-12
              md:py-16
              lg:px-16
              lg:py-20
            "
          >

            {/* DECORATIVE ORBS */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-[#F58634]/10
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                left-1/3
                h-72
                w-72
                rounded-full
                bg-white/5
                blur-3xl
              "
            />

            {/* SUBTLE BORDER */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[34px]
                border
                border-white/5
              "
            />


            <div
              className="
                relative
                z-10
                flex
                flex-col
                gap-10
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              {/* COPY */}

              <div className="max-w-2xl">

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-[#F58634]" />

                  <span
                    className="
                      font-['Inter']
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-[#F58634]
                    "
                  >
                    Make it yours
                  </span>

                </div>

                <h2
                  className="
                    mt-5
                    font-['Fraunces']
                    text-[clamp(2.2rem,5vw,4.5rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.035em]
                    text-white
                  "
                >
                  Ready to experience
                  <br />
                  India for yourself?
                </h2>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-['Inter']
                    text-[13px]
                    leading-[1.8]
                    text-white/50
                  "
                >
                  Tell us what you're looking for
                  and we'll help shape the journey
                  around you.
                </p>

              </div>


              {/* BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setShowQuotationForm(true)
                }
                className="
                  cursor-pointer
                  group
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-3
                  rounded-full
                  bg-[#F58634]
                  px-7
                  py-4
                  font-['Inter']
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  shadow-[0_12px_35px_rgba(245,134,52,0.2)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_18px_45px_rgba(245,134,52,0.3)]
                "
              >

                <span>
                  Plan your journey
                </span>

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </div>

          </div>

        </section>

        <RelatedPosts
          currentBlog={selectedBlog}
          blogs={blogs}
        />

        <div
          className="
            bg-[#F2FAFB]
            px-5
            pb-12
            md:px-10
            lg:px-16
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-7xl
              items-center
              justify-center
              gap-4
              font-['IBM_Plex_Mono']
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#124D56]/25
            "
          >

            <span
              className="
                text-[12px]
                text-[#124D56]
              "
            >
              Times India Travels
            </span>

            <span
              className="
                h-px
                w-8
                bg-[#124D56]/15
              "
            />

            <span
              className="
                text-[12px]
                text-[#124D56]
              "
            >
              Stories from India
            </span>

          </div>

        </div>

      </main>

      {showQuotationForm && (
        <Floating_Quotation_Form
          onClose={() =>
            setShowQuotationForm(false)
          }
        />
      )}

    </>
  );
}