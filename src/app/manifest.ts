import type { MetadataRoute } from "next";

// Web app manifest — Next emits <link rel="manifest"> and serves this at /manifest.webmanifest.
// The maskable icons are the android-chrome PNGs shipped in /public.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Collet",
    short_name: "Collet",
    description:
      "Collet collects every tenant's rent, splits each owner's share to the naira, remits it automatically, and proves where every payment went.",
    start_url: "/",
    display: "standalone",
    background_color: "#1C3A2E",
    theme_color: "#1C3A2E",
    icons: [
      { src: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/android-chrome-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
