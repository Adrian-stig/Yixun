import type { Metadata } from "next";
import { headers } from "next/headers";
import HuangshanExperience from "./HuangshanExperience";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "黄山九龙峰 · 一循地方";
  const description = "走进安徽黄山九龙峰自然保护区，通过可交互的森林价值图理解生态价值、社会价值与经济价值。";
  const image = `${origin}/places/huangshan-forest-values.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "zh_CN",
      images: [{ url: image, width: 1382, height: 974, alt: "九龙峰森林价值图" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function HuangshanPage() {
  return <HuangshanExperience />;
}
