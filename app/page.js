import { buildMetadata } from "../lib/buildMetadata";
import Home from "../components/pages/Home";

export const metadata = buildMetadata({
  title: "Times India Travels | Luxury Tours & Travel in India",
  description:
    "Discover unforgettable journeys across India and Asia with Times India Travels. Explore curated tours, destinations, travel experiences and personalised holidays.",
  path: "/",
  imageAlt: "Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <Home />;
}
