import { notFound } from "next/navigation";
import ResourceArticlePage from "../../components/ResourceArticlePage";
import { getArticle, resourceArticles } from "../../components/infoCenterData";
import { getRequestLocale } from "../../lib/i18n-server";

const section = "knowledge";

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
    alternates: {
      canonical: article.href
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.title }]
    }
  };
}

export default async function KnowledgeArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(section, slug);
  const locale = await getRequestLocale();

  if (!article) {
    notFound();
  }

  return (
    <ResourceArticlePage
      article={article}
      backHref="/knowledge"
      backLabel="Back to Knowledge"
      locale={locale}
      related={resourceArticles.knowledge.filter((item) => item.slug !== slug).slice(0, 3)}
    />
  );
}
