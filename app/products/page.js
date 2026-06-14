import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cable, Lightbulb, Sparkles, Wand2, Zap } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { localizedPath } from "../lib/i18n-config";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "Products | Kinetic Lighting Systems, XLWINCH, Beam Ring",
  description:
    "Explore XLIGHTING kinetic lighting products including XLWINCH, X-K16C PRO Beam Ring, kinetic balls, kinetic tubes, SMART and Power Pro stage lighting systems."
};

const products = [
  {
    href: "/products/x-k16c-pro",
    image: "/assets/xk16c-product.jpg",
    icon: Lightbulb
  },
  {
    href: "/contact",
    image: "/assets/xk16c-product.jpg",
    icon: Cable
  },
  {
    href: "/contact",
    image: "/assets/hero-xk16c.jpg",
    icon: Sparkles
  },
  {
    href: "/contact",
    image: "/assets/hero-xk16c.jpg",
    icon: Zap
  },
  {
    href: "/contact",
    image: "/assets/product-led-bsw-front.jpg",
    icon: Wand2
  }
];

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;
  const pageHref = (href) => localizedPath(locale, href);

  return (
    <main>
      <SiteHeader />

      <section className="inner-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.description}</span>
      </section>

      <section className="listing-grid">
        {products.map((product, index) => {
          const content = page.items[index];
          const Icon = product.icon;
          return (
            <article className="listing-card" key={content.title}>
              <Image src={product.image} alt={content.title} width={900} height={650} />
              <div>
                <Icon size={24} aria-hidden="true" />
                <h2>{content.title}</h2>
                <p>{content.text}</p>
                <Link href={pageHref(product.href)}>
                  {dictionary.common.viewDetails}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
