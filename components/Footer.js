"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { fetchTourCategories } from "../features/tour-categories/tourCategory_Slice";

const contactInfo = {
  address:
    "C2/106, Flat No S2, 2nd Floor, Sneh Villa, Chitrakoot Scheme, Jaipur - 302021, Rajasthan",
  phone: "+91 9610605261",
  email: "tours@timesindiatravels.com",
};

const companyLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Tour Categories",
    href: "/tours",
  },
  {
    label: "Car Rental",
    href: "/car-rental",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const exploreLinks = [
  {
    label: "Wonders of India",
    href: "/tours/wonders-of-india",
  },
  {
    label: "Destinations",
    href: "/destinations-all",
  },
  {
    label: "Fairs & Festivals",
    href: "/tours/fairs-&-festivals",
  },
  {
    label: "Private Day Tours",
    href: "/tours/private-day-tours",
  },
];

const bottomLinks = [
  {
    label: "Testimonials",
    href: "/testimonials",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-condition",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Refund Policy",
    href: "/refund-policy",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
  },
  {
    label: "Pay Online",
    href: "/pay-online",
  },
];


const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/timesindiatravelsofficial",
    icon: "facebook",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/times_travels",
    icon: "twitter",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/timesindiatravels/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/times-india-travels-1a92633b/",
    icon: "linkedin",
  },
];

function getPackages(category) {
  if (!category) return [];

  return (
    category.packages ||
    category.subPackages ||
    category.tours ||
    category.tourPackages ||
    []
  );
}

export default function Footer() {

  const dispatch = useDispatch();
  const pathname = usePathname();

  const categories =useSelector(
      (state) => state.tourCategory?.categories
    ) || [];

  const categoriesStatus =useSelector(
      (state) => state.tourCategory?.status
    ) || "idle";

  const [openCategoryId, setOpenCategoryId] =
    useState(null);

  useEffect(() => {
    dispatch(fetchTourCategories());
  }, [dispatch]);

  const handleCategoryToggle = (categoryId) => {
    setOpenCategoryId((current) =>
      current === categoryId ? null : categoryId
    );
  };

   if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>

      <div className="relative w-full overflow-hidden bg-[#F2FAFB] pt-10 leading-0">
        <img
          src="https://res.cloudinary.com/images-backend/image/upload/v1786119995/india_skyline_teal_transparent_pplv6o.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          width="1440"
          height="83"
          className="block h-auto w-full select-none pointer-events-none"
        />
      </div>

      <footer className="bg-[#0f3b42] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">

            <section className="lg:col-span-2">

              <Link
                href="/"
                aria-label="Times India Travels"
                className="
                  inline-flex
                  items-center
                  transition-transform
                  duration-300
                  hover:scale-[1.02]
                "
              >
                <img
                  src="https://res.cloudinary.com/images-backend/image/upload/v1786170474/times_logo_dyybpz.png"
                  alt="Times India Travels"
                  className="
                    h-[58px]
                    sm:h-[64px]
                    w-auto
                    max-w-[230px]
                    object-contain
                  "
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#7BCBDA]">
                Bringing the world to India
              </p>

              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
                Hand-crafted journeys across India — from royal Rajasthan to
                the backwaters of the South — planned with care, guided with
                pride.
              </p>
            </section>

            <nav aria-labelledby="footer-company">
              <h2
                id="footer-company"
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  text-[#7BCBDA]
                "
              >
                Company
              </h2>

              <ul className="space-y-3.5 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-white/60
                        transition-colors
                        hover:text-white
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-explore">
              <h2
                id="footer-explore"
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  text-[#7BCBDA]
                "
              >
                Explore
              </h2>

              <ul className="space-y-3.5 text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-white/60
                        transition-colors
                        hover:text-white
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-labelledby="footer-tour-packages"
              className="min-w-0"
            >
              <h2
                id="footer-tour-packages"
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  text-[#7BCBDA]
                "
              >
                Tour Packages
              </h2>

              <div
                className="
                  max-h-[330px]
                  overflow-y-auto
                  pr-2
                  footer-tour-scroll
                "
              >
                {categoriesStatus === "loading" &&
                categories.length === 0 ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="
                          h-4
                          w-28
                          rounded
                          bg-white/[0.06]
                          animate-pulse
                        "
                      />
                    ))}
                  </div>
                ) : categories.filter(
                    (category) => category.showInNavbar === true
                  ).length === 0 ? (
                  <p className="text-sm text-white/35">
                    No tour categories available.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {categories
                      .filter(
                        (category) => category.showInNavbar === true
                      )
                      .map((category) => {
                        const categoryId =
                          category.id || category._id;

                        const categoryName =
                          category.name ||
                          category.title ||
                          "Tour Category";

                        return (
                          <li key={categoryId}>
                            <Link
                              href={`/tours/${categoryId}`}
                              className="
                                group
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-2
                                py-2
                                text-sm
                                font-medium
                                text-white/65
                                transition-all
                                duration-200
                                hover:bg-white/[0.05]
                                hover:text-white
                              "
                            >
                              <ArrowRight
                                className="
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  -translate-x-1
                                  text-[#F58634]
                                  opacity-0
                                  transition-all
                                  duration-200
                                  group-hover:translate-x-0
                                  group-hover:opacity-100
                                "
                              />

                              <span className="truncate">
                                {categoryName}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>

              <Link
                href="/tours"
                className="
                  group
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#7BCBDA]
                  transition-colors
                  hover:text-white
                "
              >
                Explore All Tours

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </nav>
            <section aria-labelledby="footer-contact-heading">
              <h2
                id="footer-contact-heading"
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  text-[#7BCBDA]
                "
              >
                Get in Touch
              </h2>

              <address className="not-italic space-y-4 text-sm">

                {/* ADDRESS */}

                <p className="flex gap-3 text-white/70">
                  <MapPin
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-white/40
                    "
                    aria-hidden="true"
                  />

                  <span>
                    {contactInfo.address}
                  </span>
                </p>

                {/* PHONE */}

                <a
                  href={`tel:${contactInfo.phone.replace(
                    /\s+/g,
                    ""
                  )}`}
                  className="
                    flex
                    items-center
                    gap-3
                    text-white/70
                    transition-colors
                    hover:text-white
                  "
                >
                  <Phone
                    className="
                      h-4
                      w-4
                      shrink-0
                      text-white/40
                    "
                    aria-hidden="true"
                  />

                  <span>
                    {contactInfo.phone}
                  </span>
                </a>

                {/* EMAIL */}

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="
                    flex
                    items-center
                    gap-3
                    text-white/70
                    transition-colors
                    hover:text-white
                  "
                >
                  <Mail
                    className="
                      h-4
                      w-4
                      shrink-0
                      text-white/40
                    "
                    aria-hidden="true"
                  />

                  <span>
                    {contactInfo.email}
                  </span>
                </a>
              </address>

              <ul className="mt-8 flex gap-2.5">
                {socialLinks.map(
                  ({ label, href, icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${label}`}
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/15
                          text-white/60
                          transition-colors
                          hover:border-white/40
                          hover:text-white
                        "
                      >

                        {/* FACEBOOK */}

                        {icon === "facebook" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          >
                            <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1z" />
                          </svg>
                        )}

                        {/* TWITTER */}

                        {icon === "twitter" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          >
                            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.4L2.9 2h6.4l4.4 5.8L18.9 2zm-1.1 17.8h1.7L8.3 4.1H6.5l11.3 15.7z" />
                          </svg>
                        )}

                        {/* INSTAGRAM */}

                        {icon === "instagram" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="
                              h-4
                              w-4
                              fill-none
                              stroke-current
                            "
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="5"
                            />

                            <circle
                              cx="12"
                              cy="12"
                              r="4"
                            />

                            <circle
                              cx="17.5"
                              cy="6.5"
                              r="1"
                              fill="currentColor"
                              stroke="none"
                            />
                          </svg>
                        )}

                        {/* LINKEDIN */}

                        {icon === "linkedin" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current"
                            aria-hidden="true"
                          >
                            <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5zM3.5 9h3.4v11.5H3.5V9zm5.5 0h3.3v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.1h-3.4v-5.4c0-1.3 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.5H9V9z" />
                          </svg>
                        )}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </section>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col-reverse
              items-center
              justify-between
              gap-4
              px-6
              py-6
              md:flex-row
              lg:px-10
            "
          >

            {/* COPYRIGHT */}

            <p
              className="
                text-center
                text-xs
                text-white/40
                md:text-left
              "
            >
              © {new Date().getFullYear()} Times India Travels.
              All rights reserved.
            </p>

            {/* LEGAL LINKS */}

            <nav aria-label="Legal">
              <ul
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-x-6
                  gap-y-2
                  text-xs
                  text-white/50
                "
              >
                {bottomLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        transition-colors
                        hover:text-white/80
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-tour-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
        }

        .footer-tour-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .footer-tour-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .footer-tour-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.18);
          border-radius: 999px;
        }

        .footer-tour-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 134, 52, 0.7);
        }
      `}</style>
    </>
  );
}