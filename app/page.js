import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Cable,
  ChevronRight,
  Download,
  Globe2,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Wand2,
  Zap
} from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import B2BInquiryForm from "./components/B2BInquiryForm";
import { getDictionary } from "./lib/dictionaries";
import { localizedPath } from "./lib/i18n-config";
import { getRequestLocale } from "./lib/i18n-server";
import { CONTACT_EMAIL, SITE_URL, absoluteUrl } from "./lib/site-config";

const productIcons = [Cable, Sparkles, Zap, Lightbulb, Wand2, Boxes];
const homeProductHrefs = [
  "/products/xlwinch",
  "/products/kinetic-ball",
  "/products/kinetic-tube",
  "/products/x-k16c-pro",
  "/products/smart-series",
  "/products/power-pro"
];

function buildJsonLd(faqs) {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "XLIGHTING",
      legalName: "X Lighting Co., Ltd.",
      alternateName: "Guangzhou Xingbolun Optoelectronic Technology Co., Ltd.",
      url: SITE_URL,
      logo: absoluteUrl("/assets/logo.png"),
      foundingDate: "2014",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Guangzhou",
        addressRegion: "Guangdong",
        addressCountry: "CN"
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        telephone: "+86-020-32789826",
        contactType: "sales"
      },
      sameAs: [
        "https://www.linkedin.com/company/xstagelight/",
        "https://youtube.com/@cherryjiang-do5pi",
        "https://www.tiktok.com/@cherry.xlight"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "XLIGHTING",
      publisher: { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "Product",
      name: "X-K16C PRO Beam Ring D90",
      brand: { "@id": `${SITE_URL}/#organization` },
      category: "Kinetic Stage Lighting",
      description:
        "A flying beam ring kinetic lighting product with RGBW LEDs, 0-8m lifting height, 900mm diameter and DMX512 / MADRIX control."
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ]
};
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const home = dictionary.home;

  return {
    title: home.hero.title,
    description: `${home.hero.subtitle}. ${home.hero.line}.`
  };
}

export default async function Home() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const home = dictionary.home;
  const common = dictionary.common;
  const pageHref = (href) => localizedPath(locale, href);
  const products = home.products.items.map((product, index) => ({
    ...product,
    href: homeProductHrefs[index] || "/products",
    icon: productIcons[index] || Cable
  }));
  const applications = home.applications.items;
  const proofPoints = home.trust.stats.map(([value, label]) => ({ value, label }));
  const specs = home.featured.specs;
  const faqs = home.faq.items;
  const jsonLd = buildJsonLd(faqs);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p>{home.hero.subtitle}</p>
          <p className="hero-system-line">
            {home.hero.line}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={pageHref("/products")}>
              {home.hero.primary}
              <ChevronRight size={18} aria-hidden="true" />
            </a>
            <a
              className="button button-secondary"
              href="/assets/xlighting-xlwinch-catalog.pdf"
              data-track-event="catalog_download"
              data-track-category="lead_generation"
              data-track-label="Homepage hero catalog"
              data-track-location="homepage_hero"
            >
              <Download size={18} aria-hidden="true" />
              {home.hero.secondary}
            </a>
          </div>
        </div>
      </section>

      <section className="product-section" id="products" aria-labelledby="products-title">
        <div className="section-heading">
          <p>{home.products.eyebrow}</p>
          <h2 id="products-title">{home.products.title}</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <a className="product-card" href={pageHref(product.href)} key={product.name}>
                <Icon size={24} aria-hidden="true" />
                <h3>{product.name}</h3>
                <p>{product.text}</p>
                <span>
                  {common.viewProduct}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <div className="featured-image">
          <Image
            src="/assets/xk16c-product.jpg"
            alt="X-K16C PRO Beam Ring D90 kinetic lighting system with XLWINCH modules"
            width={2400}
            height={2400}
          />
        </div>
        <div className="featured-copy">
          <p>{home.featured.eyebrow}</p>
          <h2 id="featured-title">{home.featured.title}</h2>
          <p>{home.featured.text}</p>
          <div className="spec-grid">
            {specs.map((spec) => (
              <span key={spec}>
                <BadgeCheck size={16} aria-hidden="true" />
                {spec}
              </span>
            ))}
          </div>
          <a
            className="text-link"
            href="#inquiry"
            data-track-event="quote_click"
            data-track-category="lead_generation"
            data-track-label="Featured product inquiry"
            data-track-location="homepage_featured"
          >
            {home.featured.link}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="applications" id="solutions" aria-labelledby="applications-title">
        <div className="section-heading">
          <p>{home.applications.eyebrow}</p>
          <h2 id="applications-title">{home.applications.title}</h2>
        </div>
        <div className="application-list">
          {applications.map((item) => (
            <a key={item} href="#inquiry">
              <span>{item}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="trust" id="about" aria-labelledby="trust-title">
        <div className="trust-media">
          <Image
            src="/assets/manufacturer-team.jpg"
            alt="XLIGHTING Guangzhou stage lighting manufacturer team"
            width={2048}
            height={1365}
          />
        </div>
        <div className="trust-copy">
          <p>{home.trust.eyebrow}</p>
          <h2 id="trust-title">
            {home.trust.titleLine1}
            <br />
            {home.trust.titleLine2}
          </h2>
          <p>{home.trust.text}</p>
          <div className="proof-grid">
            {proofPoints.map((item) => (
              <div key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq" id="resources" aria-labelledby="faq-title">
        <div className="section-heading">
          <p>{home.faq.eyebrow}</p>
          <h2 id="faq-title">{home.faq.title}</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inquiry" id="inquiry" aria-labelledby="inquiry-title">
        <div className="inquiry-copy">
          <p>{home.inquiry.eyebrow}</p>
          <h2 id="inquiry-title">{home.inquiry.title}</h2>
          <p>{home.inquiry.text}</p>
          <div className="contact-strip">
            <span>
              <Mail size={16} aria-hidden="true" />
              {CONTACT_EMAIL}
            </span>
            <span>
              <MessageCircle size={16} aria-hidden="true" />
              +86 159 7549 0982
            </span>
            <span>
              <MapPin size={16} aria-hidden="true" />
              Guangzhou, China
            </span>
          </div>
        </div>
        <B2BInquiryForm />
      </section>

      <footer className="site-footer" id="contact">
        <div>
          <a className="brand footer-brand" href={pageHref("/")} aria-label="XLIGHTING home">
            <Image src="/assets/logo.png" alt="XLIGHTING" width={150} height={41} />
            <span>
              <strong>XLIGHTING</strong>
              <small>Professional Stage Lighting</small>
            </span>
          </a>
          <p>{home.footer.text}</p>
        </div>
        <div>
          <h2>{home.footer.products}</h2>
          <a href={pageHref("/products")}>XLWINCH</a>
          <a href={pageHref("/products")}>Kinetic Ball</a>
          <a href={pageHref("/products")}>Kinetic Tube</a>
          <a href={pageHref("/products/x-k16c-pro")}>X-K16C PRO</a>
        </div>
        <div>
          <h2>{home.footer.contact}</h2>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href="https://www.linkedin.com/company/xstagelight/">LinkedIn</a>
          <a href="https://youtube.com/@cherryjiang-do5pi">YouTube</a>
          <a href="https://www.tiktok.com/@cherry.xlight">TikTok</a>
        </div>
        <div>
          <h2>{home.footer.why}</h2>
          <span>
            <ShieldCheck size={16} aria-hidden="true" />
            {home.footer.quality}
          </span>
          <span>
            <Globe2 size={16} aria-hidden="true" />
            {home.footer.delivery}
          </span>
          <span>
            <TimerReset size={16} aria-hidden="true" />
            {home.footer.custom}
          </span>
        </div>
      </footer>
    </main>
  );
}
