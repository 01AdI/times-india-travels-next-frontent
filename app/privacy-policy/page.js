import { buildMetadata } from "../../lib/buildMetadata";
import PrivacyPolicy from "../../components/pages/Privacy_Policy";

export const metadata = buildMetadata({
  title: "Privacy Policy | Times India Travels",
  description:
    "Read the Times India Travels privacy policy to understand how we collect, use and protect information submitted through our website.",
  path: "/privacy-policy",
  imageAlt: "Privacy Policy Times India Travels , Luxury Tours & Travel in India",
});

export default function Page() {
  return <PrivacyPolicy />;
}
