import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Dynamic 1200×630 share image (the preview that shows when the link is shared on social/chat).
// Next serves it at an absolute URL derived from metadataBase, so nothing here needs external hosting.
export const alt = "Collet · for property managers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "android-chrome-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1C3A2E",
          backgroundImage:
            "radial-gradient(1100px 500px at 50% -10%, rgba(172,130,63,0.22), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        { }
        <img src={logoSrc} width={132} height={132} alt="" style={{ borderRadius: 28 }} />
        <div
          style={{
            marginTop: 30,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-3px",
            color: "#F7F5EF",
          }}
        >
          Collet
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 34,
            color: "#C9D6CE",
            maxWidth: 820,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Collect rent, split each owner&apos;s share to the naira, and prove where every payment went.
        </div>
        <div style={{ marginTop: 40, width: 96, height: 5, backgroundColor: "#AC823F", borderRadius: 999 }} />
      </div>
    ),
    { ...size }
  );
}
