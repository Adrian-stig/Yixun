import type { Metadata } from "next";
import { headers } from "next/headers";
import ImpactExperience from "./ImpactExperience";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "公开成果地图 · 一循地方";
  const description = "在一循地方公开成果地图中，按真实地点查看工作坊参与者的匿名反馈，并参与点赞、回复与新的在地讨论。";
  const image = `${origin}/maps/yixun-project-map.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      images: [{ url: image, width: 1009, height: 706, alt: "一循地方公开成果地图" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ImpactPage() {
  return <ImpactExperience />;
}
