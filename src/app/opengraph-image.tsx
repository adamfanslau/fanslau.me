import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — websites, automation and AWS cloud services, Killarney, Kerry`;
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
          backgroundColor: "#05060a",
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e6f1ff",
        }}
      >
        <div style={{ fontSize: 26, color: "#00e5ff", letterSpacing: 4 }}>
          WEBSITES · AUTOMATION · AWS CLOUD
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            marginTop: 18,
            textShadow: "0 0 32px rgba(0,229,255,0.55)",
          }}
        >
          adamfanslau
        </div>
        <div
          style={{
            width: 220,
            height: 4,
            marginTop: 24,
            backgroundImage: "linear-gradient(90deg, #00e5ff, #ff2ad4)",
          }}
        />
        <div
          style={{
            fontSize: 30,
            color: "#8b9bb8",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Freelance software engineer · Killarney, Co. Kerry, Ireland
        </div>
        <div style={{ fontSize: 28, color: "#00e5ff", marginTop: 48 }}>
          fanslau.me
        </div>
      </div>
    ),
    size,
  );
}
