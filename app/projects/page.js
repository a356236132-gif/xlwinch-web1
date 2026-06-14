import Image from "next/image";
import { MapPin } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Projects | Kinetic Lighting Case Studies",
  description:
    "XLIGHTING project page template for kinetic lighting case studies by country, venue type, product and result."
};

const projects = [
  ["Concert Stage Kinetic Beam Ring", "Concert / Tour", "X-K16C PRO"],
  ["Club Overhead Kinetic Installation", "Club / Bar", "XLWINCH + Kinetic Fixtures"],
  ["Theater Motion Lighting Upgrade", "Theater / Church", "Custom Kinetic System"]
];

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p>Projects</p>
        <h1>Case study structure for building trust with overseas buyers.</h1>
        <span>When you have authorized project photos, each card can become a full case page with country, product, challenge and result.</span>
      </section>
      <section className="project-grid">
        {projects.map(([title, type, product]) => (
          <article key={title}>
            <Image src="/assets/hero-xk16c.jpg" alt={title} width={1672} height={941} />
            <div>
              <span><MapPin size={16} /> Project template</span>
              <h2>{title}</h2>
              <p>{type} · {product}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
