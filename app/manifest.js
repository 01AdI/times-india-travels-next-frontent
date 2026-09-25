export default function manifest() {
  return {
    name: "Times India Travels",
    short_name: "Times India Travels",
    description:
      "Curated tours, destinations, travel experiences and personalised holidays across India and Asia.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2FAFB",
    theme_color: "#123138",
    lang: "en-IN",
    icons: [
      {
        src: "/images/fevicon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/fevicon_app.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
