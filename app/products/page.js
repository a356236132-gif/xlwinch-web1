import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cable, CircleDot, Lightbulb, Zap } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { localizedPath } from "../lib/i18n-config";
import { getRequestLocale } from "../lib/i18n-server";
import { xlwinchModelList } from "../lib/product-data";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;

  return {
    title: `${page.eyebrow} | Kinetic Lighting Systems`,
    description: page.description
  };
}

const productCategories = [
  {
    slug: "xlwinch",
    href: "/products/xlwinch",
    image: "/assets/hero-xk16c.jpg",
    icon: Cable
  },
  {
    slug: "kinetic-ball",
    href: "/products/kinetic-ball",
    image: "/assets/hero-concert-banner.jpg",
    icon: CircleDot
  },
  {
    slug: "kinetic-tube",
    href: "/products/kinetic-tube",
    image: "/assets/product-led-bsw-back.jpg",
    icon: Lightbulb
  },
  {
    slug: "x-k16c-pro",
    href: "/products/x-k16c-pro",
    image: "/assets/xk16c-product.jpg",
    icon: Zap
  }
];

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;
  const pageHref = (href) => localizedPath(locale, href);
  const categories = productCategories.map((category, index) => ({
    ...category,
    ...(page.items[index] || {})
  }));

  return (
    <main>
      <SiteHeader />

      <section className="inner-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.description}</span>
      </section>

      <section className="listing-grid product-category-grid">
        {categories.map((product) => {
          const Icon = product.icon;
          return (
            <article className="listing-card" key={product.slug}>
              <Image src={product.image} alt={product.title} width={900} height={650} />
              <div>
                <Icon size={24} aria-hidden="true" />
                <h2>{product.title}</h2>
                <p>{product.text}</p>
                {product.slug === "xlwinch" ? (
                  <div className="category-model-links" aria-label="XLWINCH model links">
                    {xlwinchModelList.map((model) => (
                      <Link href={pageHref(model.href)} key={model.slug}>
                        {model.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
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
