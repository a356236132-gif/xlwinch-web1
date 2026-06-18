import SiteHeader from "../components/SiteHeader";
import { FaqPageContent } from "../components/InfoCenterSections";
import { faqItems } from "../components/infoCenterData";
import { getDictionary } from "../lib/dictionaries";
import { getLocalizedAlternates, getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.faq;

  return {
    title: `${heroTitle} | ${heroSubtitle}`,
    description: dictionary.infoCenter.faqDescription,
    alternates: await getLocalizedAlternates("/faq")
  };
}

export default async function FaqPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [heroTitle, heroSubtitle] = dictionary.infoCenter.pages.faq;

  return (
    <main className="info-page">
      <SiteHeader />
      <FaqPageContent
        common={dictionary.common}
        content={dictionary.infoCenter}
        heroSubtitle={heroSubtitle}
        heroTitle={heroTitle}
        items={faqItems}
      />
    </main>
  );
}
