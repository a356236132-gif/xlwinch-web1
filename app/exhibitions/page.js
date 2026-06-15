import SiteHeader from "../components/SiteHeader";
import { ResourceListPage } from "../components/InfoCenterSections";
import { resourceArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.exhibitions;

  return {
    title: `${heroTitle} | ${heroSubtitle}`,
    description: dictionary.infoCenter.resourceDescription,
    alternates: {
      canonical: "/exhibitions"
    }
  };
}

export default async function ExhibitionsPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.exhibitions;

  return (
    <main className="info-page">
      <SiteHeader />
      <ResourceListPage
        articles={resourceArticles.exhibitions}
        common={dictionary.common}
        content={dictionary.infoCenter}
        heroSubtitle={heroSubtitle}
        heroTitle={heroTitle}
        locale={locale}
      />
    </main>
  );
}
