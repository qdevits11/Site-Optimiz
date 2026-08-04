import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="fr" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
