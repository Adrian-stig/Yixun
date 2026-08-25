import type { Metadata } from "next";
import { headers } from "next/headers";

type HuangshanMetadataOptions = {
  title: string;
  description: string;
  includeForestImage?: boolean;
};

export async function createHuangshanMetadata({
  title,
  description,
  includeForestImage = false,
}: HuangshanMetadataOptions): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/places/huangshan-forest-values.png`;
  const images = includeForestImage
    ? [{ url: image, width: 1382, height: 974, alt: "九龙峰森林价值图" }]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "zh_CN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: includeForestImage ? [image] : [],
    },
  };
}
