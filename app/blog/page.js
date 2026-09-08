import { buildMetadata } from "../../lib/buildMetadata";
import { getBlogs } from "../../lib/serverApi";
import Blog from "../../components/pages/Blog";

export const metadata = buildMetadata({
  title: "India Travel Blog | Travel Guides & Stories",
  description:
    "Read the Times India Travels blog for India travel guides, destination inspiration, cultural stories, travel tips and ideas for planning your next journey.",
  path: "/blog",
  imageAlt: "Times India Travels India Travel Blog",
});

export const revalidate = 300;

export default async function Page() {
  const response = await getBlogs(1, 50);
  const blogs = Array.isArray(response?.data) ? response.data : [];
  return <Blog initialBlogs={blogs} />;
}
