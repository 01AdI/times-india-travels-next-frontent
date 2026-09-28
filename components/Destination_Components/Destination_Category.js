"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_MS = 5000;
const LONG_DESCRIPTION = 260;

/* Cloudinary → auto format/quality + capped width. Non-Cloudinary URLs pass through. */
const optimize = (url, width = 1600) => {
  if (!url) return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

/* Download + decode once; later calls reuse the same promise (and the browser cache). */
const preloadCache = new Map();
const preloadImage = (url) => {
  if (!url || typeof window === "undefined") return Promise.resolve();
  if (preloadCache.has(url)) return preloadCache.get(url);

  const promise = new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => (img.decode ? img.decode().then(resolve, resolve) : resolve());
    img.onerror = resolve;
    img.src = url;
  });

  preloadCache.set(url, promise);
  return promise;
};

export default function Destination_Category({ data }) {
  const categories = useMemo(() => data?.categories || [], [data]);

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [prevImage, setPrevImage] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loadedUrls, setLoadedUrls] = useState(() => new Set());

  const navToken = useRef(0);

  const selectedCategory = categories[activeCategory];

  const gallery = useMemo(() => {
    if (!selectedCategory) return [];

    if (
      Array.isArray(selectedCategory.destinations_gallery) &&
      selectedCategory.destinations_gallery.length > 0
    ) {
      return selectedCategory.destinations_gallery.map((item) => ({
        ...item,
        url: optimize(item.url),
      }));
    }

    if (selectedCategory.heroImage) {
      return [{ url: optimize(selectedCategory.heroImage), caption: selectedCategory.name }];
    }

    return [];
  }, [selectedCategory]);

  const currentImage = gallery[activeImage];
  const packageCount = selectedCategory?.packages?.length || 0;
  const description = selectedCategory?.description || "";
  const isLong = description.length > LONG_DESCRIPTION;

  const markLoaded = useCallback((url) => {
    setLoadedUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);

  /* Warm the first image of every category so switching tabs is instant */
  useEffect(() => {
    categories.forEach((category) => {
      const first = category.destinations_gallery?.[0]?.url || category.heroImage;
      preloadImage(optimize(first));
    });
  }, [categories]);

  /* Warm every image in the active category */
  useEffect(() => {
    gallery.forEach((img) => preloadImage(img.url));
  }, [gallery]);

  const commitImage = useCallback(
    (index) => {
      setPrevImage(activeImage);
      setActiveImage(index);
    },
    [activeImage]
  );

  /* Auto-advance: only switch once the NEXT image is ready. Restarts on manual clicks. */
  useEffect(() => {
    if (gallery.length <= 1) return;

    let cancelled = false;

    const timer = setTimeout(async () => {
      const next = (activeImage + 1) % gallery.length;
      await preloadImage(gallery[next].url);
      if (!cancelled) commitImage(next);
    }, SLIDE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeImage, gallery, commitImage]);

  const handleCategoryChange = (index) => {
    if (index === activeCategory) return;
    navToken.current += 1;
    setActiveCategory(index);
    setActiveImage(0);
    setPrevImage(null);
    setExpanded(false);
  };

  const goToImage = async (index) => {
    if (index === activeImage) return;
    const token = ++navToken.current;
    await preloadImage(gallery[index]?.url);
    if (token === navToken.current) commitImage(index);
  };

  if (!data || !categories.length) return null;

  const categoryNumber = (index) => String(index + 1).padStart(2, "0");

  return (
    <section
      id="destination-categories"
      className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-150 w-150 rounded-full bg-[#B85128]/5 blur-[140px]" />
      <div className="pointer-events-none absolute -left-60 bottom-0 h-137.5 w-137.5 rounded-full bg-[#173C3A]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-375 px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-4xl text-center sm:mb-20 lg:mb-24"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B85128]" />
            <span className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B85128] sm:text-[11px]">
              Explore {data.name}
            </span>
            <span className="h-px w-10 bg-[#B85128]" />
          </div>

          <h2 className="mx-auto max-w-4xl font-['Playfair_Display',serif] text-[clamp(2.8rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.035em] text-[#173C3A]">
            Find the journey
            <br />
            <span className="italic text-[#173C3A]/45">that feels like yours.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl font-['Playfair',serif] text-sm leading-[1.9] text-[#476763] sm:text-base">
            From iconic routes to slower, more immersive journeys, explore the
            different ways to experience {data.name}.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-20">
          {/* ───────── Categories ───────── */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="mb-5 flex items-center justify-between lg:mb-7">
              <span className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#476763]/60">
                Tour categories
              </span>
              <span className="font-['Playfair',serif] text-[10px] lining-nums tabular-nums tracking-[0.12em] text-[#476763]/50">
                {String(categories.length).padStart(2, "0")}
              </span>
            </div>

            {/* Mobile / tablet: horizontal pills */}
            <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:-mx-10 sm:px-10 lg:hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
              {categories.map((category, index) => {
                const isActive = index === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(index)}
                    className={`shrink-0 rounded-full border px-4 py-2 font-['Playfair',serif] text-[12px] font-semibold tracking-[0.06em] transition-colors duration-300 ${
                      isActive
                        ? "border-[#B85128] bg-[#B85128] text-white"
                        : "border-[#173C3A]/15 text-[#476763] hover:border-[#173C3A]/40"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden border-t border-[#173C3A]/10 lg:block">
              {categories.map((category, index) => {
                const isActive = index === activeCategory;
                const count = category?.packages?.length || 0;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(index)}
                    className="group relative flex w-full items-center gap-4 border-b border-[#173C3A]/10 py-6 text-left"
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-0.5 origin-top bg-[#B85128] transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    <span
                      className={`w-7 shrink-0 pl-1 font-['Playfair',serif] text-[10px] lining-nums tabular-nums tracking-[0.12em] transition-colors duration-300 ${
                        isActive
                          ? "text-[#B85128]"
                          : "text-[#476763]/40 group-hover:text-[#476763]/70"
                      }`}
                    >
                      {categoryNumber(index)}
                    </span>

                    <span
                      className={`flex-1 font-['Playfair_Display',serif] text-[22px] leading-[1.15] transition-all duration-300 ${
                        isActive
                          ? "translate-x-1 text-[#173C3A]"
                          : "text-[#476763]/55 group-hover:text-[#173C3A]"
                      }`}
                    >
                      {category.name}
                    </span>

                    <span
                      className={`font-['Playfair',serif] text-[10px] lining-nums tabular-nums tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#476763]/70" : "text-[#476763]/35"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>

                    <ChevronRight
                      size={16}
                      strokeWidth={1.4}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-[#B85128] opacity-100"
                          : "-translate-x-2 text-[#476763] opacity-0 group-hover:opacity-50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ───────── Hero + details ───────── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            <div className="relative overflow-hidden bg-[#173C3A]">
              <div className="relative aspect-16/10 overflow-hidden sm:aspect-video lg:aspect-16/8.5">
                {/* Skeleton shown only until the first image is ready */}
                <div className="absolute inset-0 animate-pulse bg-linear-to-br from-[#173C3A] via-[#21524e] to-[#173C3A]" />

                {/* All images are stacked; we only crossfade opacity, never unmount mid-transition */}
                {gallery.map((img, index) => {
                  const isCurrent = index === activeImage;
                  const isPrev = index === prevImage;
                  const ready = loadedUrls.has(img.url);

                  return (
                    <img
                      key={`${selectedCategory.id}-${index}`}
                      src={img.url}
                      alt={img.caption || selectedCategory.name}
                      loading="eager"
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      ref={(el) => {
                        if (el?.complete && el.naturalWidth) markLoaded(img.url);
                      }}
                      onLoad={() => markLoaded(img.url)}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                        isCurrent && ready
                          ? "z-20 opacity-100"
                          : isPrev
                          ? "z-10 opacity-100"
                          : "z-0 opacity-0"
                      }`}
                    />
                  );
                })}

                {!currentImage?.url && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#173C3A]">
                    <span className="font-['Playfair_Display',serif] text-2xl italic text-white/40">
                      {selectedCategory.name}
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 z-30 bg-linear-to-t from-[#173C3A]/90 via-[#173C3A]/10 to-[#173C3A]/20" />

                <div className="absolute left-5 right-5 top-5 z-40 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#B85128]" />
                    <span className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                      Category {categoryNumber(activeCategory)}
                    </span>
                  </div>

                  {gallery.length > 1 && (
                    <span className="font-['Playfair',serif] text-[10px] lining-nums tabular-nums tracking-[0.12em] text-white/70">
                      {String(activeImage + 1).padStart(2, "0")}
                      {" / "}
                      {String(gallery.length).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-6 left-5 right-5 z-40 sm:bottom-8 sm:left-7 sm:right-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                    <h3 className="max-w-xl font-['Playfair_Display',serif] text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-tight text-white">
                      {selectedCategory.name}
                    </h3>

                    {currentImage?.caption && (
                      <motion.div
                        key={`${selectedCategory.id}-${activeImage}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex w-fit max-w-full items-start gap-2.5 rounded-xl border border-white/25 bg-black/40 px-4 py-3 backdrop-blur-md sm:max-w-[42%] sm:shrink-0"
                      >
                        <MapPin size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#F0A070]" />
                        <span className="line-clamp-2 font-['Playfair',serif] text-[13px] font-medium leading-snug tracking-[0.02em] text-white sm:text-[14px]">
                          {currentImage.caption}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-col gap-6 border-b border-[#173C3A]/10 py-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="font-['Playfair',serif] text-[10px] lining-nums tabular-nums uppercase tracking-[0.12em] text-[#476763]/50">
                  {categoryNumber(activeCategory)}
                </span>
                <span className="h-px w-8 bg-[#173C3A]/15" />
                <p className="max-w-md font-['Playfair',serif] text-[13px] leading-[1.7] text-[#476763]">
                  Explore curated tour packages designed around{" "}
                  {selectedCategory.name.toLowerCase()}.
                </p>
              </div>

              {packageCount > 0 ? (
                <Link
                  href={`/tours/${selectedCategory.id}`}
                  className="group inline-flex w-fit shrink-0 items-center gap-4 rounded-full border border-[#B85128] px-5 py-3 font-['Playfair',serif] text-[11px] font-bold uppercase tracking-[0.14em] text-[#173C3A] transition-all duration-300 hover:bg-[#B85128] hover:text-white"
                >
                  <span>
                    Explore {packageCount} {packageCount === 1 ? "package" : "packages"}
                  </span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.6}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              ) : (
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-[#173C3A]/15 px-5 py-3 font-['Playfair',serif] text-[11px] font-bold uppercase tracking-[0.14em] text-[#476763]/50">
                  Packages coming soon
                </span>
              )}
            </div>

            {/* Slider progress */}
            {gallery.length > 1 && (
              <div className="mt-6 flex gap-1.5">
                {gallery.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`View image ${index + 1}`}
                    onClick={() => goToImage(index)}
                    className="relative h-0.5 flex-1 overflow-hidden bg-[#173C3A]/10"
                  >
                    {index === activeImage && (
                      <motion.span
                        key={`${selectedCategory.id}-${activeImage}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-[#B85128]"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Description — right under the slider, tied to the category by name */}
            {description && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 grid gap-4 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
                >
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin size={12} strokeWidth={1.5} className="text-[#B85128]" />
                      <span className="font-['Playfair',serif] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#476763]/60">
                        About this journey
                      </span>
                    </div>
                    <p className="font-['Playfair_Display',serif] text-xl leading-tight text-[#173C3A]">
                      {selectedCategory.name}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`max-w-2xl whitespace-pre-line font-['Playfair',serif] text-[16px] leading-[1.9] text-[#476763] ${
                        expanded ? "" : "line-clamp-4"
                      }`}
                    >
                      {description}
                    </p>

                    {isLong && (
                      <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="mt-3 font-['Playfair',serif] text-[11px] font-bold uppercase tracking-[0.16em] text-[#B85128] transition-opacity hover:opacity-70"
                      >
                        {expanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 flex flex-col gap-6 border-t border-[#173C3A]/10 pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-24"
        >
          <p className="font-['Playfair',serif] text-[10px] uppercase tracking-[0.18em] text-[#476763]/50">
            {data.name} · Times India Travels
          </p>
          <p className="max-w-md font-['Playfair_Display',serif] text-sm italic text-[#476763] sm:text-right">
            Every route is a beginning. Let us shape what comes next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}