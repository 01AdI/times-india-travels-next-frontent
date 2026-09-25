import { notFound } from "next/navigation";
import { buildMetadata } from "../../../lib/buildMetadata";
import { getBlogBySlug, getBlogs } from "../../../lib/serverApi";
import BlogStructuredData from "../../../components/StructuredData/BlogStructuredData";
import BreadcrumbStructuredData from "../../../components/StructuredData/BreadcrumbStructuredData";
import BlogDetail from "../../../components/Blog_Components/BlogDetail";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=85";

export const revalidate = 300;

async function getBlog(slug) {
  const data = await getBlogBySlug(slug);
  return data?.data || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const path = `/blog/${slug}`;

  if (!blog) {
    return buildMetadata({
      title: "Blog Not Found | Times India Travels",
      description: "The blog post you are looking for does not exist.",
      path,
      noindex: true,
    });
  }

  const meta = buildMetadata({
    title: `${blog.title} | Times India Travels`,
    description: blog.shortDescription || `Read ${blog.title} from the Times India Travels journal. Discover travel stories, insights and inspiration from India.`,
    path,
    keywords: [blog.title, "India travel blog", "India travel guide"],
    image: blog.image || FALLBACK_IMAGE,
    imageAlt: `${blog.title} - Times India Travels`,
  });

  meta.openGraph.type = "article";
  return meta;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const relatedResponse = await getBlogs(1, 10);
  const relatedBlogs = Array.isArray(relatedResponse?.data)
    ? relatedResponse.data
    : [];

  return (
    <>
      <BlogStructuredData blog={blog} />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: blog.title, path: `/blog/${slug}` },
        ]}
      />
      <BlogDetail initialBlog={blog} initialBlogs={relatedBlogs} />
    </>
  );
}
