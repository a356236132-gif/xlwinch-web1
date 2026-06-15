import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MessageCircle } from "lucide-react";
import SiteHeader from "./SiteHeader";
import { localizedPath } from "../lib/i18n-config";

export default function ResourceArticlePage({ article, backHref, backLabel, locale, related = [] }) {
  const pageHref = (href) => localizedPath(locale, href);

  return (
    <main className="info-page article-detail-page">
      <SiteHeader />

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
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00Z`));
}
