import { notFound } from "next/navigation";
import { buildMetadata } from "../../../../lib/buildMetadata";
import { getTourPackageDetail } from "../../../../lib/serverApi";
import TourPackageStructuredData from "../../../../components/StructuredData/TourPackageStructuredData";
import BreadcrumbStructuredData from "../../../../components/StructuredData/BreadcrumbStructuredData";
import TourPackage_cat_sub from "../../../../components/pages/TourPackage_cat_sub";

export const revalidate = 300;

async function getTour(params) {
  const data = await getTourPackageDetail(params.sub);
  return data?.package || data?.tour || data || null;
}

export async function generateMetadata({ params }) {
  const { category, sub } = await params;
  const tour = await getTour({ sub });
  const path = `/tours/${category}/${sub}`;

  if (!tour || !tour.name) {
    return buildMetadata({
      title: "Tour Not Found | Times India Travels",
      description: "We couldn't find the tour package you're looking for.",
      path,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${tour.name} - ${tour.duration?.label || "India Tour"} | Times India Travels`,
    description: `Explore ${tour.name}, a ${tour.duration?.label || ""} journey through ${Array.isArray(tour.route) ? tour.route.join(", ") : tour.route || "India"}. Discover the itinerary and plan your India adventure with Times India Travels.`,
    path,
    keywords: [
      `${tour.name} tour package`,
      Array.isArray(tour.route) ? tour.route[0] : tour.route,
      "India tour itinerary",
    ].filter(Boolean),
    image: tour.heroImage || tour.thumbnail,
    imageAlt: `${tour.name} tour package - Times India Travels`,
  });
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const tour = await getTour(resolvedParams);

  if (!tour || !tour.name) notFound();

  return (
    <>
      <TourPackageStructuredData
        tour={tour}
        category={resolvedParams.category}
        sub={resolvedParams.sub}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Tours", path: "/tours" },
          { name: resolvedParams.category, path: `/tours/${resolvedParams.category}` },
          { name: tour.name, path: `/tours/${resolvedParams.category}/${resolvedParams.sub}` },
        ]}
      />
      <TourPackage_cat_sub
        initialTour={tour}
        category={resolvedParams.category}
        sub={resolvedParams.sub}
      />
    </>
  );
}
