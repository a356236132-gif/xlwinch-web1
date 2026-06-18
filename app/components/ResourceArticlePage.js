import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MessageCircle } from "lucide-react";
import SiteHeader from "./SiteHeader";
import { localizedPath } from "../lib/i18n-config";
import { COMPANY_NAME, SITE_NAME, SITE_URL } from "../lib/site-config";

export default function ResourceArticlePage({ article, backHref, backLabel, locale, related = [] }) {
  const pageHref = (href) => localizedPath(locale, href);
  const jsonLd = buildArticleJsonLd(article, locale);

  return (
    <main className="info-page article-detail-page">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="article-detail-hero">
        <div className="article-detail-media">
          <Image
            src={article.image}
            alt={`${article.title} cover image`}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="article-detail-copy">
          <Link href={pageHref(backHref)}>{backLabel}</Link>
          <span>{article.category}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <time dateTime={article.date}>
            <CalendarDays size={16} aria-hidden="true" />
            {formatDate(article.date)}
          </time>
        </div>
      </section>

      <section className="article-body-layout">
        <article className="article-content">
          {article.body.map((block, index) => renderArticleBlock(block, index, pageHref))}
          <div className="article-cta-panel">
            <p>Need product parameters or a project quotation?</p>
            <h2>Talk With XLIGHTING About Your Stage Lighting Project</h2>
            <div>
              <Link className="button button-primary" href={pageHref("/inquiry")}>
                Get A Quote
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="button button-secondary" href="mailto:info@xlwinch.com">
                <Mail size={18} aria-hidden="true" />
                Email Us
              </a>
            </div>
          </div>
        </article>

        <aside className="article-sidebar">
          <div>
            <p>Contact</p>
            <a href="mailto:info@xlwinch.com">
              <Mail size={16} aria-hidden="true" />
              info@xlwinch.com
            </a>
            <a
              href="https://wa.me/8615975490982?text=Hello%2C%20I%20am%20interested%20in%20your%20stage%20lighting%20products.%20Please%20send%20me%20more%20details."
              rel="noopener noreferrer"
              target="_blank"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          {related.length > 0 ? (
            <div>
              <p>Related Articles</p>
              {related.map((item) => (
                <Link href={pageHref(item.href)} key={item.href}>
                  {item.title}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

function renderArticleBlock(block, index, pageHref) {
  if (typeof block === "string") {
    return <p key={`paragraph-${index}`}>{block}</p>;
  }

  if (!block || typeof block !== "object") {
    return null;
  }

  switch (block.type) {
    case "p":
      return <p key={`paragraph-${index}`}>{block.text}</p>;
    case "h2":
      return <h2 key={`heading-${index}`}>{block.text}</h2>;
    case "h3":
      return <h3 key={`subheading-${index}`}>{block.text}</h3>;
    case "list":
      return (
        <ul key={`list-${index}`}>
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div className="article-inline-cta" key={`cta-${index}`}>
          {block.eyebrow ? <p>{block.eyebrow}</p> : null}
          <h2>{block.title}</h2>
          <span>{block.text}</span>
          <div>
            <Link
              className="button button-primary"
              data-track-category="lead_generation"
              data-track-event="quote_click"
              data-track-label={block.primaryLabel || "Send Your Requirements"}
              data-track-location="article_body"
              href={pageHref("/inquiry")}
            >
              {block.primaryLabel || "Send Your Requirements"}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="button button-secondary" href="mailto:info@xlwinch.com">
              <Mail size={18} aria-hidden="true" />
              {block.secondaryLabel || "Contact Us"}
            </a>
          </div>
        </div>
      );
    case "faq":
      return (
        <section className="article-faq-block" key={`faq-${index}`} aria-label="Article FAQ">
          <h2>FAQ</h2>
          {block.items?.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
      );
    default:
      return null;
  }
}

function buildArticleJsonLd(article, locale) {
  const articleUrl = `${SITE_URL}${localizedPath(locale, article.href)}`;
  const imageUrl = article.image?.startsWith("http")
    ? article.image
    : `${SITE_URL}${article.image}`;
  const faqBlock = article.body.find((block) => block?.type === "faq");
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.metaDescription || article.excerpt,
      image: imageUrl,
      datePublished: article.date,
      dateModified: article.date,
      mainEntityOfPage: articleUrl,
      author: {
        "@type": "Organization",
        name: SITE_NAME
      },
      publisher: {
        "@type": "Organization",
        name: COMPANY_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/logo-header-v2.png`
        }
      }
    }
  ];

  if (faqBlock?.items?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqBlock.items.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer
        }
      }))
    });
  }

  return graph;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00Z`));
}
