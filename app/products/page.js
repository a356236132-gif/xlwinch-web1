import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cable, Cpu, Gauge, Lightbulb, ShieldCheck, Zap } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { localizedPath } from "../lib/i18n-config";
import { getRequestLocale } from "../lib/i18n-server";
import { getProductsByCategory, PRODUCT_CATEGORIES } from "../lib/product-data";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;

  return {
    title: `${page.eyebrow} | Kinetic Lighting Systems`,
    description: page.description
  };
}

const categoryIcons = {
  "X WINCH": Cable,
  "Pro Max": Zap,
  "Power pro": Gauge,
  Sureload: ShieldCheck,
  Smart: Lightbulb,
  "Control system": Cpu
};

const categoryFallbackImages = {
  "X WINCH": "/assets/hero-xk16c.jpg",
  "Pro Max": "/assets/xk16c-product.jpg",
  "Power pro": "/assets/exhibition.jpg",
  Sureload: "/assets/manufacturer-team.jpg",
  Smart: "/assets/product-led-bsw-front.jpg",
  "Control system": "/assets/product-led-bsw-back.jpg"
};

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.productsPage;
  const pageHref = (href) => localizedPath(locale, href);
  const categoryGroups = PRODUCT_CATEGORIES.map((category) => {
    const products = getProductsByCategory(category.label);

    return {
      ...category,
      products,
      image: products[0]?.image || categoryFallbackImages[category.label]
    };
  });

  return (
    <main>
      <SiteHeader />

      <section className="inner-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.description}</span>
      </section>

      <section className="product-category-nav" aria-label="Product category navigation">
        {categoryGroups.map((category) => {
          const Icon = categoryIcons[category.label] || Cable;

          return (
            <Link className="product-category-nav-card" href={pageHref(`/products/${category.slug}`)} key={category.slug}>
              <Image src={category.image} alt={`${category.label} category`} width={640} height={420} />
              <div>
                <Icon size={22} aria-hidden="true" />
                <h2>{category.label}</h2>
                <p>{category.products.length} products</p>
              </div>
            </Link>
          );
        })}
      </section>

      <div className="product-category-sections">
        {categoryGroups.map((category) => (
          <section className="product-category-section" id={category.slug} key={category.slug}>
            <div className="product-section-title">
              <p>{category.label}</p>
              <h2>{category.description}</h2>
            </div>
            {category.products.length ? (
              <div className="listing-grid category-product-grid">
                {category.products.map((product) => (
                  <article className="listing-card" key={product.slug}>
                    <Image src={product.image} alt={product.title} width={900} height={650} />
                    <div>
                      <span className="product-card-category">{product.category}</span>
                      <h3>{product.title}</h3>
                      <p>{product.summary}</p>
                      <Link href={pageHref(product.href)}>
                        {dictionary.common.viewDetails}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="category-empty-card">
                <h3>Products coming soon</h3>
                <p>
                  This category is ready for future uploads. New products will appear here automatically when their
                  category field is set to {category.label}.
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
