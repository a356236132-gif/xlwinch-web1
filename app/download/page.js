import Image from "next/image";
import { Download } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Download Center | XLIGHTING Catalog and Product Files",
  description:
    "Download XLIGHTING catalog and request product parameter sheets, manuals, DMX channel tables and project documents."
};

export default function DownloadPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p>Download Center</p>
        <h1>Catalogs and product documents for procurement teams.</h1>
        <span>Start with the XLWINCH catalog and request parameter sheets for specific kinetic lighting products.</span>
      </section>
      <section className="download-card">
        <h2>2026 XLWINCH Catalog</h2>
        <p>Product overview for XLWINCH and kinetic lighting systems.</p>
        <a className="button button-primary" href="/assets/xlighting-xlwinch-catalog.pdf">
          <Download size={18} /> Download PDF
        </a>
      </section>
    </main>
  );
}
