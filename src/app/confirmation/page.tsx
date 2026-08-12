import type { Metadata } from "next";
import { BookingConfirmation } from "@/components/BookingConfirmation";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Confirmation de visite",
  description:
    "Votre visite Optmiz est confirmée. Retrouvez le créneau, l’adresse et la suite du rendez-vous.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/confirmation`,
  },
};

export default function ConfirmationPage() {
  return (
    <section className="page-section visit-manage-section confirmation-section">
      <div className="container-site" style={{ maxWidth: 720 }}>
        <BookingConfirmation />
      </div>
    </section>
  );
}
