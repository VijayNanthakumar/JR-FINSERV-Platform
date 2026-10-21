/**
 * lib/youtube.ts
 * Robust helper utilities for YouTube URL parsing, Video ID extraction,
 * and high-availability thumbnail/embed URL generation.
 */

/**
 * Extracts the 11-character YouTube video ID from any YouTube URL format.
 * Supported formats:
 * - https://youtu.be/videoId
 * - https://www.youtube.com/watch?v=videoId
 * - https://m.youtube.com/watch?v=videoId
 * - https://www.youtube.com/embed/videoId
 * - https://www.youtube.com/shorts/videoId
 * - https://www.youtube.com/live/videoId
 * - Raw 11-character Video ID
 */
export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. Check if raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    let parsedUrl = trimmed;
    if (!parsedUrl.startsWith("http://") && !parsedUrl.startsWith("https://")) {
      parsedUrl = "https://" + parsedUrl;
    }
    const parsed = new URL(parsedUrl);

    // YouTube domain variants
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtube-nocookie.com")) {
      // a. Check query string `v=` parameter
      const vParam = parsed.searchParams.get("v");
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) {
        return vParam;
      }

      // b. Check path segments (embed, shorts, live, v)
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      for (let i = 0; i < pathParts.length; i++) {
        if (
          ["embed", "shorts", "live", "v"].includes(pathParts[i]) &&
          pathParts[i + 1] &&
          /^[a-zA-Z0-9_-]{11}$/.test(pathParts[i + 1])
        ) {
          return pathParts[i + 1];
        }
      }
    }

    // Shortened URL format (youtu.be/videoId)
    if (parsed.hostname.includes("youtu.be")) {
      const firstPathPart = parsed.pathname.split("/").filter(Boolean)[0];
      if (firstPathPart && /^[a-zA-Z0-9_-]{11}$/.test(firstPathPart)) {
        return firstPathPart;
      }
    }
  } catch {
    // If URL constructor fails, fall through to regex parsing
  }

  // 2. Comprehensive fallback regex pattern matching
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i
  );
  if (match && match[1]) {
    return match[1];
  }

  // 3. Fallback check for ?v= or &v= anywhere in string
  const vMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (vMatch && vMatch[1]) {
    return vMatch[1];
  }

  return null;
}

/**
 * Returns the primary high-quality (hqdefault) thumbnail URL.
 * `hqdefault` is guaranteed to exist for 100% of YouTube videos without 404 failures.
 */
export function getYouTubeThumbnailUrl(videoId: string): string {
  if (!videoId) return "";
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Returns the maxresdefault thumbnail URL (may return 404 image for low-res videos).
 */
export function getYouTubeMaxResThumbnailUrl(videoId: string): string {
  if (!videoId) return "";
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Returns an ordered array of candidate thumbnail URLs for fallback resolution.
 */
export function getYouTubeThumbnailCandidates(videoId: string): string[] {
  if (!videoId) return [];
  return [
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`,
  ];
}

/**
 * Returns the standard YouTube embed URL for iframe embedding.
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;
}
