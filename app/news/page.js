import SiteHeader from "../components/SiteHeader";
import { ResourceListPage } from "../components/InfoCenterSections";
import { resourceArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getLocalizedAlternates, getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.news;

  return {
    title: `${heroTitle} | ${heroSubtitle}`,
    description: dictionary.infoCenter.resourceDescription,
    alternates: await getLocalizedAlternates("/news")
  };
}

export default async function NewsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.news;

  return (
    <main className="info-page">
      <SiteHeader />
      <ResourceListPage
        articles={resourceArticles.news}
        common={dictionary.common}
        content={dictionary.infoCenter}
        heroSubtitle={heroSubtitle}
        heroTitle={heroTitle}
        locale={locale}
      />
    </main>
  );
}
