import SiteHeader from "../components/SiteHeader";
import { ArticleGrid, CategoryCards, InfoHero } from "../components/InfoCenterSections";
import { latestArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getLocalizedAlternates, getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const info = dictionary.infoCenter;

  return {
    title: `${info.hero.title} | ${info.hero.subtitle}`,
    description: info.hero.description,
    alternates: await getLocalizedAlternates("/info-center")
  };
}

export default async function InfoCenterPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const info = dictionary.infoCenter;
  const categories = info.categories.map(([title, description, href]) => ({
    description,
    href,
    title
  }));

  return (
    <main className="info-page">
      <SiteHeader />
      <InfoHero
        title={info.hero.title}
        subtitle={info.hero.subtitle}
        description={info.hero.description}
      />
      <CategoryCards
        categories={categories}
        common={dictionary.common}
        content={info}
        locale={locale}
      />
      <ArticleGrid
        articles={latestArticles}
        common={dictionary.common}
        content={info}
        locale={locale}
      />
    </main>
  );
}
