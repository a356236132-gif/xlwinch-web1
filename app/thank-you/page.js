import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  MessageCircle,
  ShieldCheck,
  TimerReset
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getRequestLocale } from "../lib/i18n-server";
import { localizedPath } from "../lib/i18n-config";
import { CONTACT_EMAIL } from "../lib/site-config";

export const metadata = {
  title: "Thank You | Inquiry Submitted",
  description:
    "Thank you for contacting XLIGHTING. Our team has received your kinetic lighting inquiry and will follow up with product advice, quotation or catalog information.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/thank-you"
  }
};

const nextSteps = [
  {
    icon: CheckCircle2,
    title: "Inquiry received",
    text: "Your project request has been sent to the XLIGHTING sales team."
  },
  {
    icon: TimerReset,
    title: "Reply within 24 hours",
    text: "We will review your product requirement, country, quantity and timeline."
  },
  {
    icon: ShieldCheck,
    title: "Project support",
    text: "Our team can help with product matching, OEM/ODM options and catalog details."
  }
];

export default async function ThankYouPage() {
  const locale = await getRequestLocale();
  const pageHref = (href) => localizedPath(locale, href);

  return (
    <main>
      <SiteHeader />

      <section className="thank-you-hero" aria-labelledby="thank-you-title">
        <div>
          <p>Inquiry Submitted</p>
          <h1 id="thank-you-title">Thank You. Your Inquiry Has Been Received.</h1>
          <span>
            XLIGHTING will review your requirement and contact you with product advice,
            quotation details or catalog information as soon as possible.
          </span>

          <div className="thank-you-actions">
            <Link className="button button-primary" href={pageHref("/products")}>
              Explore Products
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="button button-secondary" href="/assets/xlighting-xlwinch-catalog.pdf">
              <Download size={18} aria-hidden="true" />
              Download Catalog
            </a>
          </div>
        </div>
      </section>

      <section className="thank-you-panel" aria-label="What happens next">
        <div className="thank-you-steps">
          {nextSteps.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="thank-you-contact">
          <p>Need a faster reply?</p>
          <h2>Contact Cherry Jiang directly.</h2>
          <div>
            <a href="https://wa.me/8615975490982?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.">
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={18} aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
