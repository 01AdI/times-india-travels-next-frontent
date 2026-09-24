const VIDEO_TRANSFORM = "c_limit,w_1280/q_auto";

function buildCloudinaryVideoUrl(src, format, codec) {
  if (typeof src !== "string" || !src.trim()) return src;

  const url = src.trim();

  if (!url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) {
    return url;
  }

  const marker = "/video/upload/";
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) return url;

  const before = url.slice(0, markerIndex + marker.length);
  const after = url.slice(markerIndex + marker.length);
  const [path, query = ""] = after.split("?", 2);
  const segments = path.split("/").filter(Boolean);
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const publicPath = versionIndex === -1
    ? segments.join("/")
    : segments.slice(versionIndex + 1).join("/");

  if (!publicPath) return url;

  const extensionIndex = publicPath.lastIndexOf(".");
  const publicId = extensionIndex > -1
    ? publicPath.slice(0, extensionIndex)
    : publicPath;

  const extension = format || (
    extensionIndex > -1
      ? publicPath.slice(extensionIndex + 1)
      : "mp4"
  );

  const querySuffix = query ? `?${query}` : "";

  return `${before}${VIDEO_TRANSFORM}/${codec}/${publicId}.${extension}${querySuffix}`;
}

export function getCloudinaryVideoSources(src) {
  return {
    webm: buildCloudinaryVideoUrl(src, "webm", "vc_vp9"),
    mp4: buildCloudinaryVideoUrl(src, "mp4", "vc_h264"),
  };
}
