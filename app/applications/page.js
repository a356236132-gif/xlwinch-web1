import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Church,
  Clapperboard,
  Factory,
  Globe2,
  Handshake,
  Headphones,
  Music2,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Users2,
  Wrench
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { localizedPath } from "../lib/i18n-config";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "Kinetic Lighting Solutions for Concerts, Events & Venues",
  description:
    "Explore XLIGHTING kinetic lighting solutions for concerts, touring productions, weddings, nightclubs, churches, broadcast studios and commercial installations."
};

const applicationCards = [
  {
    image: "/assets/hero-concert-banner.jpg",
    icon: Music2
  },
  {
    image: "/assets/hero-xk16c.jpg",
    icon: Sparkles
  },
  {
    image: "/assets/exhibition.jpg",
    icon: PartyPopper
  },
  {
    image: "/assets/team.jpg",
    icon: Church
  },
  {
    image: "/assets/hero-concert-banner.jpg",
    icon: Clapperboard
  },
  {
    image: "/assets/exhibition.jpg",
    icon: Building2
  }
];

const buyerCards = [
  Users2,
  Wrench,
  Globe2,
  Factory,
  Sparkles,
  ShieldCheck
];

const projects = [
  {
    title: "Arena Touring Rig",
    location: "Asia-Pacific",
    type: "Concert production",
    products: "K66 XL Winch, K01 LED Lifting Ball",
    image: "/assets/hero-concert-banner.jpg"
  },
  {
    title: "Immersive Nightclub Ceiling",
    location: "Middle East",
    type: "Permanent venue",
    products: "Kinetic LED Bar, Pixel Controller",
    image: "/assets/hero-xk16c.jpg"
  },
  {
    title: "Commercial Brand Experience",
    location: "Europe",
    type: "Exhibition installation",
    products: "X-K16C PRO Beam Ring, XL Winch",
    image: "/assets/exhibition.jpg"
  }
];

const products = [
  ["K66 XL Winch", "Heavy-duty lifting system for kinetic arrays.", "/assets/xk16c-product.jpg"],
  ["K01 LED Lifting Ball", "Suspended light sphere for smooth vertical movement.", "/assets/product-led-bsw-front.jpg"],
  ["X-K16C PRO Beam Ring", "Flying beam ring with DMX512 / MADRIX control.", "/assets/xk16c-product.jpg"],
  ["Kinetic LED Bar", "Linear kinetic fixture for architectural stage effects.", "/assets/hero-xk16c.jpg"],
  ["Pixel Controller", "Control hardware for synchronized kinetic systems.", "/assets/product-led-bsw-back.jpg"]
];

export default async function ApplicationsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.applicationsPage;
  const common = dictionary.common;
  const pageHref = (href) => localizedPath(locale, href);

  return (
    <main className="applications-page">
      <SiteHeader />

      <section className="applications-hero">
        <div className="applications-hero-bg" aria-hidden="true" />
        <div className="applications-hero-copy">
          <h1>
            {page.hero.titleLine1}
            <br />
            {page.hero.titleLine2}
          </h1>
          <p>{page.hero.description}</p>
          <div className="applications-actions">
            <Link className="button button-primary" href="#application-categories">
              {page.hero.primary}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button button-secondary" href={pageHref("/projects")}>
              {page.hero.secondary}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="applications-section" id="application-categories">
        <div className="applications-section-head">
          <span>{page.categories.eyebrow}</span>
          <h2>{page.categories.title}</h2>
        </div>
        <div className="application-image-grid">
          {applicationCards.map(({ image, icon: Icon }, index) => {
            const [title, text] = page.categories.items[index];
            return (
            <Link className="application-image-card" href={pageHref("/contact")} key={title}>
              <Image src={image} alt={`${title} kinetic lighting solution`} width={900} height={680} />
              <div>
                <Icon size={28} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>
                  {common.discussSolution}
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <section className="applications-section buyer-section">
        <div className="applications-section-head">
          <span>{page.buyers.eyebrow}</span>
          <h2>{page.buyers.title}</h2>
        </div>
        <div className="buyer-grid">
          {page.buyers.items.map(([buyer, size, recommended], index) => {
            const Icon = buyerCards[index];
            return (
            <article className="buyer-card" key={buyer}>
              <Icon size={25} aria-hidden="true" />
              <h3>{buyer}</h3>
              <dl>
                <div>
                  <dt>{page.buyers.typical}</dt>
                  <dd>{size}</dd>
                </div>
                <div>
                  <dt>{page.buyers.recommended}</dt>
                  <dd>{recommended}</dd>
                </div>
              </dl>
              <Link href={pageHref("/contact")}>
                {common.viewSolution}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            );
          })}
        </div>
      </section>

      <section className="applications-section">
        <div className="applications-section-head">
          <span>{page.projects.eyebrow}</span>
          <h2>{page.projects.title}</h2>
        </div>
        <div className="featured-project-grid">
          {projects.map((project) => (
            <article className="featured-project-card" key={project.title}>
              <Image src={project.image} alt={project.title} width={900} height={640} />
              <div>
                <span>{project.location}</span>
                <h3>{project.title}</h3>
                <p>{project.type}</p>
                <strong>{project.products}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="applications-section">
        <div className="applications-section-head">
          <span>{page.recommended.eyebrow}</span>
          <h2>{page.recommended.title}</h2>
        </div>
        <div className="recommended-product-grid">
          {products.map(([name, text, image]) => (
            <article className="recommended-product-card" key={name}>
              <div className="recommended-product-media">
                <Image src={image} alt={name} width={620} height={520} />
              </div>
              <h3>{name}</h3>
              <p>{text}</p>
              <Link href={pageHref("/products")}>
                {common.viewProduct}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="applications-trust">
        <div>
          <span>{page.trust.eyebrow}</span>
          <h2>{page.trust.title}</h2>
        </div>
        <div className="applications-stat-grid">
          {page.trust.stats.map(([number, label]) => (
            <div key={label}>
              <strong>{number}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="applications-final-cta">
        <BadgeCheck size={34} aria-hidden="true" />
        <h2>{page.cta.title}</h2>
        <div className="applications-actions">
          <Link className="button button-primary" href={pageHref("/contact")}>
            {common.getQuote}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="button button-secondary" href={pageHref("/contact")}>
            <Headphones size={18} aria-hidden="true" />
            {common.contactTeam}
          </Link>
        </div>
      </section>
    </main>
  );
}
