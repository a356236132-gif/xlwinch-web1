import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Download,
  Factory,
  Globe2,
  Mail,
  MessageCircle,
  Ruler,
  Sparkles
} from "lucide-react";
import { notFound } from "next/navigation";
import B2BInquiryForm from "../../components/B2BInquiryForm";
import SiteHeader from "../../components/SiteHeader";
import { getProductBySlug, productList, xlwinchModelList } from "../../lib/product-data";
import { absoluteUrl } from "../../lib/site-config";
import { getLocalizedAlternates } from "../../lib/i18n-server";

function buildBuyerSegments(product) {
  return [
    {
      title: "Rental Companies",
      text: `${product.title} can be planned as a repeatable rental product for concerts, weddings, clubs and live events.`,
      meta: "Flexible inventory planning"
    },
    {
      title: "System Integrators",
      text: `Use XLIGHTING factory support to discuss control, lifting layout, installation conditions and project handover.`,
      meta: "Project specification support"
    },
    {
      title: "Venue Owners",
      text: `Suitable for permanent upgrades where visual impact, control stability and long-term service communication matter.`,
      meta: "Commercial venue upgrades"
    }
  ];
}

function buildSupportItems(product) {
  return [
    {
      icon: Ruler,
      title: "Project Layout Review",
      text: `Share venue size, ceiling height, quantity and show concept. XLIGHTING can help confirm whether ${product.title} fits the project.`
    },
    {
      icon: Sparkles,
      title: "Effect Matching",
      text: "We help match kinetic movement, lighting effect, control mode and product combinations for your application."
    },
    {
      icon: Factory,
      title: "OEM / ODM Discussion",
      text: "Factory-direct communication is available for qualified B2B buyers, distributors and custom project requirements."
    },
    {
      icon: Globe2,
      title: "Export Support",
      text: "Our team supports international quotations, packing details, shipping communication and after-sales follow-up."
    }
  ];
}

function buildProductFaqs(product) {
  return [
    {
      question: `Can ${product.title} be customized for my project?`,
      answer:
        "Yes. XLIGHTING supports project-based communication for quantity, control mode, installation environment, color effect and OEM/ODM requirements."
    },
    {
      question: `What information should I provide before quotation?`,
      answer:
        "Please share your country, venue type, quantity, expected effect, ceiling or rigging conditions, target delivery time and any control requirements."
    },
    {
      question: `Is ${product.title} suitable for international B2B buyers?`,
      answer:
        "Yes. XLIGHTING works with rental companies, integrators, event production teams, distributors and venue owners for global stage lighting projects."
    }
  ];
}

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
    keywords: [
      product.title,
      product.eyebrow,
      "kinetic lighting manufacturer",
      "stage lighting supplier",
      "OEM ODM stage lighting",
      "DMX kinetic lighting system"
    ],
    alternates: await getLocalizedAlternates(product.href),
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

  const buyerSegments = buildBuyerSegments(product);
  const supportItems = buildSupportItems(product);
  const productFaqs = buildProductFaqs(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        image: product.gallery.map((image) => absoluteUrl(image)),
        description: product.summary,
        brand: {
          "@type": "Brand",
          name: "XLIGHTING"
        },
        manufacturer: {
          "@type": "Organization",
          name: "Guangzhou X Lighting Co., Ltd."
        },
        category: "Professional Stage Lighting",
        additionalProperty: product.specs.map(([name, value]) => ({
          "@type": "PropertyValue",
          name,
          value
        }))
      },
      {
        "@type": "FAQPage",
        mainEntity: productFaqs.map((faq) => ({
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
            {product.gallery.length > 1 ? (
              <div className="product-thumbs">
                {product.gallery.map((image, index) => (
                  <Image
                    src={image}
                    alt={`${product.title} product view ${index + 1}`}
                    width={520}
                    height={520}
                    key={image}
                  />
                ))}
              </div>
            ) : null}
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
              <a
                className="button button-primary"
                href="#product-inquiry"
                data-track-event="quote_click"
                data-track-category="lead_generation"
                data-track-label={`${product.title} inquiry`}
                data-track-location="product_hero"
              >
                Send Inquiry
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href="/assets/xlighting-xlwinch-catalog.pdf"
                data-track-event="catalog_download"
                data-track-category="lead_generation"
                data-track-label={`${product.title} catalog`}
                data-track-location="product_hero"
              >
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

      {product.slug === "xlwinch" ? (
        <section className="product-detail-section xlwinch-model-section">
          <div className="product-section-title">
            <p>XLWINCH Models</p>
            <h2>Choose a kinetic winch model for your load and lifting height.</h2>
          </div>
          <div className="xlwinch-model-grid">
            {xlwinchModelList.map((model) => (
              <article key={model.slug}>
                <Image src={model.image} alt={`${model.title} kinetic winch`} width={900} height={650} />
                <div>
                  <span>{model.eyebrow}</span>
                  <h3>{model.title}</h3>
                  <p>{model.summary}</p>
                  <Link href={model.href}>
                    View model
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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

      <section className="product-detail-section product-buyer-section">
        <div className="product-section-title">
          <p>Buyer Fit</p>
          <h2>Recommended for B2B buyers who need reliable project support.</h2>
        </div>
        <div className="product-buyer-grid">
          {buyerSegments.map((item) => (
            <article key={item.title}>
              <span>{item.meta}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-section-title">
          <p>Factory Support</p>
          <h2>From product selection to delivery communication.</h2>
        </div>
        <div className="product-support-grid">
          {supportItems.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-section-title">
          <p>FAQ</p>
          <h2>Common questions before sending an inquiry.</h2>
        </div>
        <div className="product-faq-list">
          {productFaqs.map((faq) => (
            <article key={faq.question}>
              <ClipboardCheck size={22} aria-hidden="true" />
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
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
