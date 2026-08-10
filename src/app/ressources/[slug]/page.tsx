import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { articles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { articleMetadata, buildArticleJsonLd, buildBreadcrumbJsonLd, siteConfig } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return articleMetadata(article);
}

const dateFormatter = new Intl.DateTimeFormat("fr-BE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug);

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Ressources", path: "/ressources" },
          { name: article.title, path: `/ressources/${article.slug}` },
        ])}
      />

      <section className="page-shell">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Ressources", href: "/ressources" },
              { label: article.title },
            ]}
          />
          <p className="page-kicker font-mono">Ressources</p>
          <h1 className="font-display">{article.title}</h1>
          <p className="section-lead">{article.excerpt}</p>
          <p className="article-card-meta" style={{ marginTop: "0.85rem" }}>
            {dateFormatter.format(new Date(article.publishedAt))} · {article.readingMinutes} min de
            lecture · Par {siteConfig.founder.name}
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site" style={{ maxWidth: 760 }}>
          <article className="article-body">
            {article.sections.map((section, index) => (
              <div key={section.heading ?? `intro-${index}`}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </article>

          <div className="article-related">
            <p className="page-kicker font-mono">Pour aller plus loin</p>
            <ul>
              {article.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-link">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {related.length ? (
            <div className="article-related">
              <p className="page-kicker font-mono">Autres ressources</p>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/ressources/${item.slug}`} className="text-link">
                      {item.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-block cta-section">
        <div className="container-site">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
