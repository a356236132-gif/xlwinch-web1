import { notFound } from "next/navigation";
import ResourceArticlePage from "../../components/ResourceArticlePage";
import { getArticle, resourceArticles } from "../../components/infoCenterData";
import { getLocalizedAlternates, getRequestLocale } from "../../lib/i18n-server";

const section = "blog";

export function generateStaticParams() {
  return resourceArticles[section].map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(section, slug);

  if (!article) {
    return {};
  }

  const title = article.seoTitle || article.title;
  const description = article.metaDescription || article.excerpt;

  return {
    title,
    description,
    alternates: await getLocalizedAlternates(article.href),
    openGraph: {
      title,
      description,
      images: [{ url: article.image, alt: article.title }]
    }
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(section, slug);
  const locale = await getRequestLocale();

  if (!article) {
    notFound();
  }

  return (
    <ResourceArticlePage
      article={article}
      backHref="/blog"
      backLabel="Back to Blog"
      locale={locale}
      related={resourceArticles.blog.filter((item) => item.slug !== slug).slice(0, 3)}
    />
  );
}
