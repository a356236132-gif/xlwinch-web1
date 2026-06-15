import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cable, CircleDot, Lightbulb, Sparkles, Wand2, Zap } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { localizedPath } from "../lib/i18n-config";
import { getRequestLocale } from "../lib/i18n-server";
import { productList } from "../lib/product-data";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;

  return {
    title: `${page.eyebrow} | Kinetic Lighting Systems`,
    description: page.description
  };
}

const productIcons = [Lightbulb, Cable, Sparkles, Zap, Wand2, CircleDot];

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
        {productList.map((product, index) => {
          const content = page.items[index] || {
            title: product.title,
            text: product.summary
          };
          const Icon = productIcons[index] || Lightbulb;
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
