import { NextResponse } from "next/server";

const redirects = {
  "/About_Us": "/about-us",
  "/Tour": "/tours",
  "/CarRental": "/car-rental",
  "/Blog": "/blog",
  "/Contact-Us": "/contact-us",
  "/Testimonials": "/testimonials",
  "/Disclaimer": "/disclaimer",
  "/Privacy-Policy": "/privacy-policy",
  "/Refund-Policy": "/refund-policy",
};

export function proxy(request) {
  const { pathname } = request.nextUrl;

  /*
   * IMPORTANT:
   * Next.js Proxy matchers are case-insensitive.
   *
   * Therefore, we perform the final legacy-URL check here
   * using JavaScript's case-sensitive comparisons.
   */

  // Exact legacy redirects
  if (Object.prototype.hasOwnProperty.call(redirects, pathname)) {
    const destination = redirects[pathname];

    const url = request.nextUrl.clone();
    url.pathname = destination;

    return NextResponse.redirect(url, 307);
  }

  /*
   * Legacy Tour URLs
   *
   * Only accept URLs whose actual pathname starts with /Tour/
   * with capital T.
   */
  if (pathname.startsWith("/Tour/")) {
    const parts = pathname.split("/").filter(Boolean);

    // /Tour/:category
    if (parts.length === 2) {
      const url = request.nextUrl.clone();
      url.pathname = `/tours/${parts[1]}`;

      return NextResponse.redirect(url, 307);
    }

    // /Tour/:category/:sub
    if (parts.length === 3) {
      const url = request.nextUrl.clone();
      url.pathname = `/tours/${parts[1]}/${parts[2]}`;

      return NextResponse.redirect(url, 307);
    }
  }

  /*
   * Legacy testimonial URLs
   *
   * Only accept actual /Testimonials/... URLs.
   */
  if (pathname.startsWith("/Testimonials/")) {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length === 2) {
      const url = request.nextUrl.clone();
      url.pathname = `/testimonials/${parts[1]}`;

      return NextResponse.redirect(url, 307);
    }
  }

  // Everything else passes through normally.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/About_Us",
    "/Tour/:path*",
    "/CarRental",
    "/Blog",
    "/Contact-Us",
    "/Testimonials/:path*",
    "/Disclaimer",
    "/Privacy-Policy",
    "/Refund-Policy",
  ],
};