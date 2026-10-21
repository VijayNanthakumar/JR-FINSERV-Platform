import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jrfinserv.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/services/mutual-funds",
    "/services/lic",
    "/services/health-insurance",
    "/services/general-insurance",
    "/gallery",
    "/faq",
    "/notice-board",
    "/testimonials",
    "/achievements",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));
}
