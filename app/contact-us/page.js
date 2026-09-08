import { buildMetadata } from "../../lib/buildMetadata";
import ContactUs from "../../components/pages/Contact_Us";

export const metadata = buildMetadata({
  title: "Contact Times India Travels | Plan Your Journey",
  description:
    "Get in touch with Times India Travels to plan your personalised India or Asia holiday. Speak with our travel experts about tours, destinations and private journeys.",
  path: "/contact-us",
  imageAlt: "Contact Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <ContactUs />;
}
