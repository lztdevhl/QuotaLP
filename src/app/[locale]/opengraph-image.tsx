import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale, QUOTA_VERSION_LABEL } from "@/lib/site";
import { getDictionary } from "@/locales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  const capture = await readFile(
    join(process.cwd(), "public/product/social-codex.png"),
  );
  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        color: "#f5f5f5",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 60,
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", fontSize: 30, alignItems: "center", gap: 15 }}
      >
        Quota
        <span style={{ color: "#a78bfa", fontSize: 16, marginLeft: 18 }}>
          {QUOTA_VERSION_LABEL}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: -2,
          marginTop: 110,
          maxWidth: 610,
        }}
      >
        <span>{t.hero.lines[0]}</span>
        <span>{t.hero.lines[1]}</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 40,
          fontSize: 18,
          color: "#a3a3a3",
        }}
      >
        Windows 10/11 · x64 · {t.hero.free}
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 115,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Satori renders the original raster capture; Next Image is not supported here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${capture.toString("base64")}`}
          width={420}
          height={388}
          alt={t.product.detailAlt}
        />
        <span style={{ fontSize: 11, color: "#a3a3a3", marginTop: 14 }}>
          {t.product.label}
        </span>
      </div>
    </div>,
    size,
  );
}
