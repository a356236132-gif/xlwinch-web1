import SiteHeader from "../components/SiteHeader";
import { ResourceListPage } from "../components/InfoCenterSections";
import { resourceArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "News | Company Updates & Product Announcements",
  description:
    "Follow XLIGHTING company updates, product announcements, factory news and project delivery updates for global B2B lighting buyers.",
  alternates: {
    canonical: "/news"
  }
};

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
