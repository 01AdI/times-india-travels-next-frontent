import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/buildMetadata";
import { getTestimonialDetail, getTestimonials } from "../../../lib/serverApi";
import TestimonialStructuredData from "../../../components/StructuredData/TestimonialStructuredData";
import Testimonial_Detail from "../../../components/pages/Testimonial_Detail";

export const revalidate = 300;

async function getReview(id) {
  const data = await getTestimonialDetail(id);
  return data?.data || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const review = await getReview(id);
  const path = `/testimonials/${id}`;

  if (!review) {
    return buildMetadata({
      title: "Traveller Story Not Found | Times India Travels",
      description: "The traveller story you are looking for does not exist or may have been removed.",
      path,
      noindex: true,
    });
  }

  const meta = buildMetadata({
    title: `${review.name}'s Travel Story | Times India Travels`,
    description: review.review || `Read ${review.name}'s travel story and experience with Times India Travels.`,
    path,
    image: review.avatar,
    imageAlt: `${review.name} – Times India Travels traveller story`,
  });

  meta.openGraph.type = "article";
  return meta;
}

export default async function Page({ params }) {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) notFound();

  const testimonialsResponse = await getTestimonials();
  const testimonials = Array.isArray(testimonialsResponse?.data)
    ? testimonialsResponse.data
    : [];

  return (
    <>
      <TestimonialStructuredData review={review} id={id} />
      <Testimonial_Detail
        initialReview={review}
        initialTestimonials={testimonials}
        id={id}
      />
    </>
  );
}
