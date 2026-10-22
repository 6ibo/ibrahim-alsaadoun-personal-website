import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibrahim Alsaadoun — IT Student & Content Creator",
  description: "The personal website of Ibrahim Alsaadoun: technology, photography, football content, and projects.",
  metadataBase: new URL(process.env.SITE_URL || "https://6ibo.github.io"),
  openGraph: { title: "Ibrahim Alsaadoun", description: "Technology, stories, and what’s next.", type: "website" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
