import StructuredData from "../StructuredData";

const SITE_URL = "https://www.timesindiatravels.com";

export default function TestimonialStructuredData({ review, id }) {
    if (!review || review.status !== "approved") {
        return null;
    }

    const testimonialUrl = `${SITE_URL}/testimonials/${id}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Review",

        "@id": `${testimonialUrl}#review`,

        url: testimonialUrl,

        itemReviewed: {
            "@type": "TravelAgency",
            "@id": `${SITE_URL}/#organization`,
            name: "Times India Travels",
            url: SITE_URL,
        },

        author: {
            "@type": "Person",
            name: review.name,
        },

        reviewBody: review.review,

        reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
        },

        publisher: {
            "@type": "TravelAgency",
            "@id": `${SITE_URL}/#organization`,
            name: "Times India Travels",
            url: SITE_URL,
        },

        ...(review.avatar && {
            image: review.avatar,
        }),

        ...(review.approvedAt && {
            datePublished: new Date(review.approvedAt).toISOString(),
        }),
    };

    return (
        <StructuredData
            id={`testimonial-${id}`}
            data={schema}
        />
    );
}