import type { Metadata } from "next";
import { VisitManager } from "@/components/VisitManager";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gérer votre visite",
  description: "Annulez ou modifiez votre rendez-vous Optmiz.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${siteConfig.url}/visite/gerer`,
  },
};

type PageProps = {
  searchParams: Promise<{ token?: string; action?: string }>;
};

export default async function ManageVisitPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token?.trim() || "";
  const action = params.action?.trim() || null;

  return (
    <section className="page-section visit-manage-section">
      <div className="container-site visit-manage-wrap">
        {token ? (
          <VisitManager token={token} initialAction={action} />
        ) : (
          <div className="visit-manage-card">
            <p className="page-kicker font-mono">Lien manquant</p>
            <h1 className="font-display visit-manage-title">Ouvrez le lien reçu par e-mail</h1>
            <p>
              Cette page permet d’annuler ou de modifier une visite déjà réservée. Utilisez le
              lien personnel envoyé dans votre confirmation Optmiz.
            </p>
            <p>
              Besoin d’aide ?{" "}
              <a className="text-link" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              ·{" "}
              <a className="text-link" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
