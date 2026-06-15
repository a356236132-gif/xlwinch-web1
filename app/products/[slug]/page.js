import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Download, Mail, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import B2BInquiryForm from "../../components/B2BInquiryForm";
import SiteHeader from "../../components/SiteHeader";
import { getProductBySlug, productList } from "../../lib/product-data";
import { absoluteUrl } from "../../lib/site-config";

export function generateStaticParams() {
  return productList
    .filter((product) => product.slug !== "x-k16c-pro")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.title} | Kinetic Lighting Manufacturer`,
    description: product.summary,
    alternates: {
      canonical: product.href
    },
    openGraph: {
      title: product.title,
      description: product.summary,
      images: [
        {
          url: product.image,
          alt: product.title
        }
      ]
    }
  };
}

export default async function GenericProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.slug === "x-k16c-pro") {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: absoluteUrl(product.image),
    description: product.summary,
    brand: {
      "@type": "Brand",
      name: "XLIGHTING"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Guangzhou X Lighting Co., Ltd."
    },
    category: "Professional Stage Lighting"
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <section className="product-hero generic-product-hero">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="product-hero-grid">
          <div className="product-gallery">
            <div className="main-product-image">
              <Image
                src={product.image}
                alt={`${product.title} by XLIGHTING`}
                width={1400}
                height={1000}
                priority
              />
            </div>
          </div>

          <div className="product-summary">
            <p className="product-kicker">{product.eyebrow}</p>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>

            <div className="product-badges">
              <span>
                <BadgeCheck size={16} aria-hidden="true" />
                OEM/ODM support
              </span>
              <span>
                <BadgeCheck size={16} aria-hidden="true" />
                Global B2B delivery
              </span>
              <span>
                <BadgeCheck size={16} aria-hidden="true" />
                Project consultation
              </span>
            </div>

            <div className="product-actions">
              <a className="button button-primary" href="#product-inquiry">
                Send Inquiry
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="/assets/xlighting-xlwinch-catalog.pdf">
                <Download size={18} aria-hidden="true" />
                Download Catalog
              </a>
            </div>

            <div className="quick-contact">
              <span>
                <Mail size={16} aria-hidden="true" />
                info@xlwinch.com
              </span>
              <span>
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp: +86 159 7549 0982
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-section-title">
          <p>Product Overview</p>
          <h2>Built for professional stage lighting buyers and project teams.</h2>
        </div>
        <div className="advantage-grid">
          {product.features.map((feature) => (
            <article key={feature}>
              <BadgeCheck size={24} aria-hidden="true" />
              <h3>{feature}</h3>
              <p>
                XLIGHTING can discuss quantity, control requirements, installation
                environment and delivery planning before quotation.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-section-title">
          <p>Technical Planning</p>
          <h2>Key information for procurement and project communication.</h2>
        </div>
        <div className="spec-table">
          {product.specs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <div>
            <span>Applications</span>
            <strong>{product.applications}</strong>
          </div>
        </div>
      </section>

      <section className="product-inquiry" id="product-inquiry">
        <div>
          <p>Leave a Message</p>
          <h2>Request price, parameters or project advice.</h2>
          <p>
            Tell us your country, venue type, quantity and timeline. We will help
            match the right lighting setup for your project.
          </p>
        </div>
        <B2BInquiryForm defaultProductRequirement={product.title} />
      </section>
    </main>
  );
}
