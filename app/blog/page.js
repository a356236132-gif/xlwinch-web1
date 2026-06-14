import SiteHeader from "../components/SiteHeader";
import { ResourceListPage } from "../components/InfoCenterSections";
import { resourceArticles } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export const metadata = {
  title: "Blog | Industry Insights & Project Inspiration",
  description:
    "Read XLIGHTING blog articles about kinetic lighting, moving head lights, stage lighting trends, wedding lighting and rental business growth.",
  alternates: {
    canonical: "/blog"
  }
};

export default async function BlogPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.blog;

  return (
    <main className="info-page">
      <SiteHeader />
      <ResourceListPage
        articles={resourceArticles.blog}
        common={dictionary.common}
        content={dictionary.infoCenter}
        heroSubtitle={heroSubtitle}
        heroTitle={heroTitle}
        locale={locale}
      />
    </main>
  );
}
