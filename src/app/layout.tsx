import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Collet · for property managers",
    template: "%s",
  },
  description:
    "Collet collects every tenant's rent, splits each owner's share to the naira, remits it automatically, and proves where every payment went. The back office Nigerian property managers have been doing by hand.",
  other: {
    "geo.region": "NG",
    "geo.placename": "Lagos, Nigeria",
    "theme-color": "#1C3A2E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* In the App Router root layout this loads site-wide, so the
            pages/_document-oriented rule below is a false positive. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
