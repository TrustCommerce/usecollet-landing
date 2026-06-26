export const SITE_URL = "https://usecollet.com";

// Waitlist signup endpoint — the Spring Boot WaitlistApi (POST /v1/waitlist).
// Override per-environment with NEXT_PUBLIC_WAITLIST_API.
export const WAITLIST_API =
  process.env.NEXT_PUBLIC_WAITLIST_API ??
  "https://api.usecollet.com/usecollet-api/v1/waitlist";
