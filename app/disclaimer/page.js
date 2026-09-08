import { buildMetadata } from "../../lib/buildMetadata";
import Disclaimer from "../../components/pages/Disclaimer";

export const metadata = buildMetadata({
  title: "Disclaimer | Times India Travels",
  description:
    "Read the Times India Travels website disclaimer covering travel information, content, pricing and third-party services.",
  path: "/disclaimer",
  imageAlt: "Disclaimer Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <Disclaimer />;
}
