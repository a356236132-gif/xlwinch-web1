import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Factory Strength | XLIGHTING Stage Lighting Manufacturing",
  description:
    "XLIGHTING factory strength page for manufacturing, product testing, quality control, packaging and global project delivery support."
};

const points = ["Product testing before delivery", "OEM/ODM customization support", "Project-based packaging and shipping", "Technical communication for B2B buyers"];

export default function FactoryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p>Factory Strength</p>
        <h1>Manufacturing and project support behind every kinetic lighting order.</h1>
        <span>Use real workshop, testing, packing and delivery photos here as your asset library grows.</span>
      </section>
      <section className="factory-section">
        <Image src="/assets/exhibition.jpg" alt="XLIGHTING exhibition and product display" width={5712} height={4284} />
        <div>
          {points.map((point) => (
            <p key={point}><CheckCircle2 size={18} />{point}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
