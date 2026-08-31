import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 28, color: "#60a5fa" }}>{siteConfig.role}</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a3a3a3",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          Cloud platforms · Mobile apps · Websites
        </div>
        <div style={{ fontSize: 28, color: "#525252", marginTop: 48 }}>
          fanslau.me
        </div>
      </div>
    ),
    size,
  );
}
