import { notFound } from "next/navigation";
import ResourceArticlePage from "../../components/ResourceArticlePage";
import { getArticle, resourceArticles } from "../../components/infoCenterData";
import { getLocalizedAlternates, getRequestLocale } from "../../lib/i18n-server";

const section = "exhibitions";

export function generateStaticParams() {
  return resourceArticles[section].map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(section, slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: await getLocalizedAlternates(article.href),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }]
    }
  };
}

export default async function ExhibitionsArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(section, slug);
  const locale = await getRequestLocale();

  if (!article) {
    notFound();
  }

  return (
    <ResourceArticlePage
      article={article}
      backHref="/exhibitions"
      backLabel="Back to Exhibitions"
      locale={locale}
      related={resourceArticles.exhibitions.filter((item) => item.slug !== slug).slice(0, 3)}
    />
  );
}
