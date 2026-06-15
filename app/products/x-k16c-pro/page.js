import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Cable,
  CheckCircle2,
  Download,
  Gauge,
  Mail,
  MessageCircle,
  Ruler,
  Settings2,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import B2BInquiryForm from "../../components/B2BInquiryForm";
import { absoluteUrl } from "../../lib/site-config";

export const metadata = {
  title: "X-K16C PRO Beam Ring D90 Kinetic Lighting System",
  description:
    "X-K16C PRO Beam Ring D90 is a kinetic beam ring stage lighting system with 48x20W RGBW LEDs, 0-8m lifting height, 900mm diameter, DMX512 / MADRIX control and OEM/ODM support.",
  keywords: [
    "X-K16C PRO",
    "beam ring D90",
    "kinetic beam ring",
    "kinetic lighting system",
    "DMX kinetic winch system",
    "stage kinetic lighting supplier"
  ]
};

const specs = [
  ["Product Name", "X-K16C PRO Beam Ring D90"],
  ["LED Source", "48x20W RGBW LEDs"],
  ["Lifting Height", "0-8 meters"],
  ["Winch System", "3x400W winch system"],
  ["Ring Diameter", "900mm"],
  ["Control Mode", "DMX512 / MADRIX"],
  ["Channel Mode", "20 / 48 / 96 / 144CH"],
  ["Power Supply", "AC100-240V, 50/60Hz"],
  ["Power Consumption", "960W"],
  ["Application", "Concerts, events, TV shows, clubs, theaters and installations"]
];

const advantages = [
  {
    icon: Sparkles,
    title: "Downward Beam Ring Effect",
    text: "A 360-degree ring design creates a clean downward beam effect for large stage impact."
  },
  {
    icon: Cable,
    title: "Smooth Kinetic Movement",
    text: "The 0-8m lifting range supports dynamic aerial choreography and repeatable show cues."
  },
  {
    icon: Settings2,
    title: "DMX512 / MADRIX Control",
    text: "Designed for professional lighting control workflows used by rental and production teams."
  },
  {
    icon: ShieldCheck,
    title: "Project Support",
    text: "XLIGHTING supports OEM/ODM customization, global delivery and technical project matching."
  }
];

const faqs = [
  [
    "Can the X-K16C PRO be customized for different venues?",
    "Yes. XLIGHTING can discuss lifting height, control mode, quantity, rigging plan and OEM/ODM requirements according to your project."
  ],
  [
    "What buyers is this product suitable for?",
    "It is suitable for rental companies, event production companies, system integrators, clubs, theaters, churches, TV studios and themed entertainment projects."
  ],
  [
    "Can I request the full parameter sheet or quotation?",
    "Yes. Send your country, venue type, quantity and timeline through the inquiry form, and the sales team will follow up with product details."
  ]
];

const related = ["XLWINCH", "Kinetic Ball", "Kinetic Tube"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "X-K16C PRO Beam Ring D90",
  brand: {
    "@type": "Brand",
    name: "XLIGHTING"
  },
  category: "Kinetic Stage Lighting",
  image: absoluteUrl("/assets/xk16c-product.jpg"),
  description:
    "A flying beam ring kinetic lighting system with RGBW LEDs, 0-8m lifting height, 900mm diameter and DMX512 / MADRIX control.",
  manufacturer: {
    "@type": "Organization",
    name: "X Lighting Co., Ltd."
  }
};

export default function Xk16cProductPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <section className="product-hero">
        <div className="breadcrumbs">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/#products">Products</a>
          <span>/</span>
          <span>X-K16C PRO Beam Ring</span>
        </div>

        <div className="product-hero-grid">
          <div className="product-gallery">
            <div className="main-product-image">
              <Image
                src="/assets/xk16c-product.jpg"
                alt="X-K16C PRO Beam Ring D90 kinetic lighting system"
                width={2400}
                height={2400}
                priority
              />
            </div>
            <div className="product-thumbs">
              <Image src="/assets/hero-xk16c.jpg" alt="X-K16C PRO stage effect banner" width={1672} height={941} />
              <Image src="/assets/xk16c-product.jpg" alt="X-K16C PRO product view" width={2400} height={2400} />
            </div>
          </div>

          <div className="product-summary">
            <p className="product-kicker">Kinetic Beam Ring System</p>
            <h1>X-K16C PRO Beam Ring D90</h1>
            <p>
              A flying beam ring kinetic lighting system for concerts, clubs, TV shows,
              touring events and immersive installations. Built for downward beam
              effects, smooth lifting movement and professional DMX512 / MADRIX control.
            </p>

            <div className="product-badges">
              <span>
                <Zap size={16} aria-hidden="true" />
                48x20W RGBW LEDs
              </span>
              <span>
                <Ruler size={16} aria-hidden="true" />
                900mm Diameter
              </span>
              <span>
                <Gauge size={16} aria-hidden="true" />
                0-8m Lifting Height
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
          <p>Product Details</p>
          <h2>Technical parameters for procurement and project planning.</h2>
        </div>
        <div className="spec-table">
          {specs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="product-detail-section product-showcase">
        <div className="product-section-title">
          <p>Picture Show</p>
          <h2>Designed for visible motion, clean beams and large-format stage scenes.</h2>
        </div>
        <div className="showcase-grid">
          <Image src="/assets/hero-xk16c.jpg" alt="X-K16C PRO beam effect stage scene" width={1672} height={941} />
          <Image src="/assets/xk16c-product.jpg" alt="X-K16C PRO product and winch system" width={2400} height={2400} />
        </div>
      </section>

      <section className="product-detail-section">
        <div className="product-section-title">
          <p>Advantages</p>
          <h2>Why B2B buyers choose this kinetic beam ring system.</h2>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="product-detail-section product-faq">
        <div className="product-section-title">
          <p>FAQ</p>
          <h2>Common questions before ordering kinetic lighting.</h2>
        </div>
        <div className="product-faq-list">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-detail-section related-products">
        <div className="product-section-title">
          <p>You May Also Like</p>
          <h2>Related kinetic lighting systems.</h2>
        </div>
        <div className="related-list">
          {related.map((item) => (
            <a key={item} href="/#products">
              <CheckCircle2 size={18} aria-hidden="true" />
              {item}
            </a>
          ))}
        </div>
      </section>

      <section className="product-inquiry" id="product-inquiry">
        <div>
          <p>Leave a Message</p>
          <h2>Request X-K16C PRO price, parameters or project advice.</h2>
          <p>
            Tell us your country, venue type, lifting height, quantity and timeline. We
            will help you match the right kinetic lighting setup.
          </p>
        </div>
        <B2BInquiryForm defaultProductRequirement="X-K16C PRO Beam Ring" />
      </section>
    </main>
  );
}
