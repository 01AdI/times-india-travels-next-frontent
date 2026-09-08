import { buildMetadata } from "../../lib/buildMetadata";
import TermsCondition from "../../components/pages/Terms_Condition";

export const metadata = buildMetadata({
  title: "Terms & Conditions | Times India Travels",
  description:
    "Read the terms and conditions governing the use of the Times India Travels website and travel services.",
  path: "/terms-and-condition",
  imageAlt: "Terms & Conditions Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <TermsCondition />;
}
