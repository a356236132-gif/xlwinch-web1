import { CheckCircle2, Clock3, Globe2, Mail, ShieldCheck } from "lucide-react";
import B2BInquiryForm from "../components/B2BInquiryForm";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "B2B Inquiry Form | Kinetic Lighting Quote",
  description:
    "Submit your B2B inquiry for XLIGHTING kinetic lighting systems, XL Winch systems, LED lifting balls, beam rings and OEM/ODM stage lighting projects.",
  alternates: {
    canonical: "/inquiry"
  }
};

const processItems = [
  ["1", "Submit project details", "Send product, country, quantity and timeline information."],
  ["2", "Engineer review", "Our team checks lifting height, venue type and control requirements."],
  ["3", "Quotation & support", "Receive product recommendations, pricing and project follow-up."]
];

const trustItems = [
  ["Direct factory communication", CheckCircle2],
  ["Global B2B project support", Globe2],
  ["Reply within 24 hours", Clock3],
  ["Private business information", ShieldCheck]
];

export default function InquiryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inquiry-page-hero">
        <div>
          <p>B2B Inquiry</p>
          <h1>Get A Quote For Your Kinetic Lighting Project</h1>
          <span>
            Tell us your product requirement, venue type and timeline. XLIGHTING will help match
            the right kinetic lighting system for your project.
          </span>
        </div>
      </section>

      <section className="b2b-inquiry-layout">
        <aside className="inquiry-support-panel" aria-label="Inquiry support information">
          <p>Project Support</p>
          <h2>Designed For Global Buyers, Rental Companies & Integrators</h2>
          <span>
            Use this form for XL Winch systems, LED lifting balls, beam rings, kinetic LED bars,
            OEM/ODM requests and stage lighting project quotations.
          </span>

          <div className="inquiry-process">
            {processItems.map(([step, title, text]) => (
              <article key={step}>
                <strong>{step}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="inquiry-trust-list">
            {trustItems.map(([label, Icon]) => (
              <span key={label}>
                <Icon size={17} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <a className="inquiry-email-link" href="mailto:info@xlwinch.com">
            <Mail size={17} aria-hidden="true" />
            info@xlwinch.com
          </a>
        </aside>

        <B2BInquiryForm />
      </section>
    </main>
  );
}
