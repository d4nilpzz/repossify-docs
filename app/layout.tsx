import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { basePath, siteConfig } from "@/site.config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// The wordmark. Italic Playfair is the one piece of the old landing worth keeping.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://repossify.dev"),
  title: { default: `${siteConfig.name} · ${siteConfig.tagline}`, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  icons: { icon: `${basePath}${siteConfig.logo}` },
  openGraph: {
    type: "website",
    url: "https://repossify.dev/",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/repossify.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/repossify.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
