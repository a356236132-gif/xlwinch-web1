import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Lightbulb,
  Newspaper
} from "lucide-react";
import { localizedPath } from "../lib/i18n-config";

const categoryIcons = {
  Blog: BookOpen,
  News: Newspaper,
  Exhibitions: CalendarDays,
  FAQ: CircleHelp,
  Knowledge: Lightbulb
};

export function InfoHero({ title, subtitle, description }) {
  return (
    <section className="info-hero" aria-labelledby="info-hero-title">
      <div className="info-hero-bg" aria-hidden="true" />
      <div className="info-hero-copy">
        <h1 id="info-hero-title">{title}</h1>
        <p>{subtitle}</p>
        {description ? <span>{description}</span> : null}
      </div>
    </section>
  );
}

export function CategoryCards({ categories, common, content, locale }) {
  return (
    <section className="info-section" aria-labelledby="info-categories-title">
      <div className="info-section-head">
        <h2 id="info-categories-title">{content.categoriesTitle}</h2>
        <p>{content.categoriesDescription}</p>
      </div>
      <div className="info-category-grid">
        {categories.map((category) => {
          const Icon = categoryIcons[category.title] || BookOpen;
          return (
            <Link
              className="info-category-card"
              href={localizedPath(locale, category.href)}
              key={category.title}
            >
              <Icon size={28} aria-hidden="true" />
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span>
                {common.viewMore}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ArticleGrid({ articles, common, content, locale, title }) {
  const heading = title || content.latestTitle;

  return (
    <section className="info-section" aria-labelledby={`${slugify(heading)}-title`}>
      <div className="info-section-head">
        <h2 id={`${slugify(heading)}-title`}>{heading}</h2>
        <p>{content.latestDescription}</p>
      </div>
      <div className="article-grid">
        {articles.map((article) => (
          <article className="article-card" key={`${article.category}-${article.title}`}>
            <div className="article-card-media">
              <Image
                src={article.image}
                alt={`${article.title} cover image`}
                fill
                sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
              />
            </div>
            <div>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <p>{article.excerpt}</p>
              <Link href={localizedPath(locale, article.href)}>
                {common.readMore}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ResourceListPage({ articles, common, content, heroSubtitle, heroTitle, locale }) {
  return (
    <>
      <InfoHero title={heroTitle} subtitle={heroSubtitle} />
      <section className="info-section resource-list-section" aria-labelledby="resource-list-title">
        <div className="info-section-head">
          <h2 id="resource-list-title">{heroTitle}</h2>
          <p>{content.resourceDescription}</p>
        </div>
        <div className="resource-list">
          {articles.map((article) => (
            <article className="resource-row" key={article.title}>
              <div className="resource-row-media">
                <Image
                  src={article.image}
                  alt={`${article.title} cover image`}
                  fill
                  sizes="(max-width: 680px) 100vw, 320px"
                />
              </div>
              <div>
                <span>{article.category}</span>
                <h2>{article.title}</h2>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <p>{article.excerpt}</p>
                <Link href={localizedPath(locale, article.href)}>
                  {common.readMore}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Pagination common={common} />
      </section>
    </>
  );
}

export function FaqPageContent({ common, content, heroSubtitle, heroTitle, items }) {
  return (
    <>
      <InfoHero title={heroTitle} subtitle={heroSubtitle} />
      <section className="info-section faq-resource-section" aria-labelledby="faq-list-title">
        <div className="info-section-head">
          <h2 id="faq-list-title">{content.faqTitle}</h2>
          <p>{content.faqDescription}</p>
        </div>
        <div className="faq-resource-layout">
          <aside>
            {items.map((item) => (
              <a href={`#${slugify(item.question)}`} key={item.question}>
                {item.question}
              </a>
            ))}
          </aside>
          <div className="faq-accordion">
            {items.map((item) => (
              <details id={slugify(item.question)} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <Pagination common={common} />
      </section>
    </>
  );
}

function Pagination({ common }) {
  return (
    <nav className="resource-pagination" aria-label="Resource pagination">
      <span>
        <ChevronLeft size={16} aria-hidden="true" />
        {common.previous}
      </span>
      <strong>1</strong>
      <span>
        {common.next}
        <ChevronRight size={16} aria-hidden="true" />
      </span>
    </nav>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00Z`));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
