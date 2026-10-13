import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "asmiee — We Code for People", template: "%s | asmiee" },
  description:
    "An interactive command-line introduction to asmiee, a Sri Lankan digital team building approachable websites, software, mobile apps, AI experiences and brands.",
  metadataBase: new URL("https://asmiee.com"),
  openGraph: {
    title: "asmiee — We Code for People",
    description: "Making digital simpler, more human, and a lot more interesting.",
    type: "website",
    siteName: "asmiee",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0910",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
