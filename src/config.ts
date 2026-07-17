export const SITE_URL = "https://usecollet.com";

// Waitlist signup endpoint — the Spring Boot WaitlistApi (POST /v1/waitlist).
// Override per-environment with NEXT_PUBLIC_WAITLIST_API.
export const WAITLIST_API =
  process.env.NEXT_PUBLIC_WAITLIST_API ??
  "https://api.usecollet.com/usecollet-api/v1/waitlist";

// The Collet demo video (Vimeo), shown after a successful waitlist signup.
// dnt=1 disables Vimeo tracking; byline/portrait are hidden for a cleaner frame.
export const DEMO_VIDEO_EMBED =
  "https://player.vimeo.com/video/1210701009?dnt=1&byline=0&portrait=0&title=0&playsinline=1";
