import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

export default function BlogStructuredData({ blog }) {
    if (!blog || blog.status !== "published") {
        return null;
    }

    const blogUrl = `${SITE_URL}/blog/${blog.slug}`;

    const publishedDate = blog.publishedAt || blog.createdAt;
    const modifiedDate = blog.updatedAt || publishedDate;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",

        "@id": `${blogUrl}#article`,

        headline: blog.title,

        description: blog.shortDescription,

        url: blogUrl,

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": blogUrl,
        },

        ...(blog.image && {
            image: [blog.image],
        }),

        ...(publishedDate && {
            datePublished: new Date(publishedDate).toISOString(),
        }),

        ...(modifiedDate && {
            dateModified: new Date(modifiedDate).toISOString(),
        }),

        author: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: blog.author || "Times India Travels",
        },

        publisher: {
            "@type": "TravelAgency",
            "@id": `${SITE_URL}/#organization`,
            name: "Times India Travels",
            url: SITE_URL,
        },

        ...(blog.category && {
            articleSection: blog.category,
        }),

        ...(Array.isArray(blog.tags) &&
            blog.tags.length > 0 && {
                keywords: blog.tags.join(", "),
            }),
    };

    return (
        <StructuredData
            id={`blog-${blog.slug}`}
            data={schema}
        />
    );
}