import { buildMetadata } from "../../lib/buildMetadata";
import PayOnline from "../../components/pages/Pay_Online";

export const metadata = buildMetadata({
  title: "Pay Online | Times India Travels",
  description:
    "Make a secure payment for your Times India Travels booking or travel arrangements.",
  path: "/pay-online",
  // Transactional page reached only via a direct link from a booking —
  // no organic search intent to capture, so keep it out of the index
  // rather than compete for crawl budget with real content pages.
  noindex: true,
  imageAlt: "Secure online payment - Times India Travels",
});

export default function Page() {
  return <PayOnline />;
}
