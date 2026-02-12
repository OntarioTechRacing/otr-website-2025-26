/**
 * Converts a share/post link to the embed URL used in iframes.
 * If the URL is already an embed URL or unrecognized, returns it as-is (trimmed).
 */

export function shareLinkToEmbedLink(
  type: "instagram" | "linkedin",
  url: string
): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  if (type === "instagram") {
    return instagramShareToEmbed(trimmed);
  }
  return linkedInShareToEmbed(trimmed);
}

function instagramShareToEmbed(url: string): string {
  // Already an embed URL
  if (url.includes("/embed")) return url;
  // Strip query params and hash (e.g. ?utm_source=ig_web_copy_link&igsh=...)
  const withoutQuery = url.split("?")[0].split("#")[0];
  // Extract path and shortcode: instagram.com/p/SHORTCODE or /reel/SHORTCODE or /tv/SHORTCODE
  const match = withoutQuery.match(
    /instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/
  );
  if (match) {
    const [, pathType, shortcode] = match;
    return `https://www.instagram.com/${pathType}/${shortcode}/embed/`;
  }
  return url;
}

function linkedInShareToEmbed(url: string): string {
  // Already an embed URL
  if (url.includes("/embed/feed/")) return url;
  // Has urn in URL: feed/update/urn:li:activity:1234567890
  const urnMatch = url.match(/urn:li:(?:activity|share):(\d+)/);
  if (urnMatch) {
    const id = urnMatch[1];
    const kind = url.includes("urn:li:share:") ? "share" : "activity";
    return `https://www.linkedin.com/embed/feed/update/urn:li:${kind}:${id}`;
  }
  // Share link format: .../posts/...-activity-1234567890-... or .../activity-1234567890
  const activityMatch = url.match(/[-.]activity[-_]?(\d+)/);
  if (activityMatch) {
    const id = activityMatch[1];
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`;
  }
  return url;
}
