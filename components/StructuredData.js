// Server-rendered JSON-LD. Previously this injected the <script> tag
// into document.head via useEffect (client-only, invisible to crawlers
// that don't execute JS). Now it's just JSX, so Next.js renders it
// straight into the server-generated HTML <head>/<body>.
export default function StructuredData({ id, data }) {
  if (!data) return null;

  return (
    <script
      id={`structured-data-${id}`}
      type="application/ld+json"
      // JSON.stringify output is safe here; we only escape a literal
      // "</script>" so embedded content can't prematurely close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
