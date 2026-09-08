import { buildMetadata } from "../../lib/buildMetadata";
import { getTestimonials } from "../../lib/serverApi";
import Testimonials from "../../components/pages/Testimonial";

export const metadata = buildMetadata({
  title: "Traveller Stories & Reviews | Times India Travels",
  description:
    "Read real traveller stories and experiences from guests who explored India and Asia with Times India Travels.",
  path: "/testimonials",
  imageAlt: "Traveller stories - Times India Travels",
});

export const revalidate = 300;

export default async function Page() {
  const response = await getTestimonials();
  const testimonials = Array.isArray(response?.data) ? response.data : [];
  return <Testimonials initialTestimonials={testimonials} />;
}
