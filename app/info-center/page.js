import SiteHeader from "../components/SiteHeader";
import { ArticleGrid, CategoryCards, InfoHero } from "../components/InfoCenterSections";
import { latestArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "Info Center | Professional Stage Lighting Resources",
  description:
    "Explore product knowledge, project ideas, company updates, exhibition information and technical guides from X Lighting.",
  alternates: {
    canonical: "/info-center"
  }
};

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
