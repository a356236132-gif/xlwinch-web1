import SiteHeader from "../components/SiteHeader";
import { ResourceListPage } from "../components/InfoCenterSections";
import { resourceArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "Knowledge Center | Technical Guides & Learning Resources",
  description:
    "Learn DMX512, Art-Net, MADRIX, kinetic lighting systems, stage lighting basics and product installation planning with XLIGHTING.",
  alternates: {
    canonical: "/knowledge"
  }
};

export default async function KnowledgePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.knowledge;

  return (
    <main className="info-page">
      <SiteHeader />
      <ResourceListPage
        articles={resourceArticles.knowledge}
        common={dictionary.common}
        content={dictionary.infoCenter}
        heroSubtitle={heroSubtitle}
        heroTitle={heroTitle}
        locale={locale}
      />
    </main>
  );
}
