import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Optmiz — Automatisation & Digitalisation des Processus en Wallonie",
    template: "%s | Optmiz",
  },
  description:
    "Optmiz aide les PME belges à automatiser leurs tâches répétitives et digitaliser leurs processus. Diagnostic gratuit. Prix fixe. Résultats visibles rapidement.",
  metadataBase: new URL("https://optmiz.be"),
  openGraph: {
    title: "Optmiz — Automatisation & Digitalisation des Processus en Wallonie",
    description:
      "Optmiz aide les PME belges à automatiser leurs tâches répétitives et digitaliser leurs processus. Diagnostic gratuit. Prix fixe. Résultats visibles rapidement.",
    siteName: "Optmiz",
    locale: "fr_BE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-text">
        <SmoothScroll>
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
