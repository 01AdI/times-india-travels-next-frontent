import { buildMetadata } from "../../lib/buildMetadata";
import About_Us from "../../components/pages/About";

export const metadata = buildMetadata({
  title: "About Times India Travels | India Travel Experts",
  description:
    "Learn about Times India Travels, a trusted India travel company creating personalised journeys, private tours and unforgettable travel experiences across India and Asia.",
  path: "/about-us",
  imageAlt: "About Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <About_Us />;
}
