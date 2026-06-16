import { ArrowRight, Building2, Clock3, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import B2BInquiryForm from "../components/B2BInquiryForm";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.contactPage;

  return {
    title: `${page.eyebrow} XLIGHTING | Get a Quote`,
    description: page.description
  };
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.contactPage;

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.description}</span>
      </section>
      <section className="product-inquiry" id="contact-form">
        <div className="sales-contact-card">
          <p>{page.sales}</p>
          <h2>Cherry Jiang</h2>
          <div className="contact-strip">
            <span><Mail size={16} />info@xlwinch.com</span>
            <span><MessageCircle size={16} />+86 159 7549 0982</span>
            <span><MapPin size={16} />Guangzhou, China</span>
          </div>
        </div>
        <B2BInquiryForm />
      </section>
      <section className="contact-location" id="location" aria-labelledby="location-title">
        <div className="location-map-card">
          <iframe
            allowFullScreen
            className="location-map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=113.246%2C23.365%2C113.276%2C23.385&layer=mapnik&marker=23.3749369%2C113.2610973"
            title="OpenStreetMap location near Meiwa Technology Park, Guangtang South Street, Huadu, Guangzhou"
          />
        </div>
        <div className="location-info-card">
          <p>{page.location.eyebrow}</p>
          <h2 id="location-title">{page.location.title}</h2>
          <h3>{page.location.company}</h3>
          <address>
            {page.location.address.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <div className="location-manufacturer-note">
            <Building2 size={18} aria-hidden="true" />
            <span>{page.location.manufacturer}</span>
          </div>
          <p className="location-product-line">
            {page.location.line}
          </p>
          <div className="location-visit-list">
            <span><Clock3 size={16} aria-hidden="true" />{page.location.visit1}</span>
            <span><MapPin size={16} aria-hidden="true" />{page.location.visit2}</span>
            <span><Navigation size={16} aria-hidden="true" />{page.location.visit3}</span>
          </div>
          <div className="location-actions">
            <a
              className="button button-primary"
              href="https://wa.me/8615975490982?text=Hello%2C%20I%20would%20like%20to%20visit%20your%20factory%20or%20learn%20more%20about%20your%20stage%20lighting%20products."
              rel="noopener noreferrer"
              target="_blank"
              data-track-event="whatsapp_click"
              data-track-category="lead_generation"
              data-track-label="Contact location WhatsApp"
              data-track-location="contact_location"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {page.location.whatsapp}
            </a>
            <a className="button button-secondary" href="mailto:info@xlwinch.com">
              <Mail size={18} aria-hidden="true" />
              {page.location.email}
            </a>
            <a
              className="location-open-map"
              href="https://www.openstreetmap.org/?mlat=23.3749369&mlon=113.2610973#map=15/23.3749369/113.2610973"
              rel="noopener noreferrer"
              target="_blank"
            >
              {page.location.openMap}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
