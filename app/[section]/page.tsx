import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGES } from "@/lib/config";
import PlaceholderPage from "@/components/PlaceholderPage";

type PageProps = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return PAGES.map((page) => ({ section: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const page = PAGES.find((item) => item.slug === section);
  return { title: page ? `${page.title} — Preview` : "Not Found", robots: { index: false, follow: false } };
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const page = PAGES.find((item) => item.slug === section);
  if (!page) notFound();
  return <PlaceholderPage page={page} />;
}
