import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import { getDictionary } from "../lib/dictionaries";
import { getRequestLocale } from "../lib/i18n-server";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.aboutPage;

  return {
    title: `${page.eyebrow} | Stage Lighting Manufacturer`,
    description: page.description
  };
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const page = dictionary.aboutPage;

  return (
    <main>
      <SiteHeader />
      <section className="inner-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.description}</span>
      </section>
      <section className="story-section">
        <Image
          src="/assets/about-team-wide.jpg"
          alt="XLIGHTING team in Guangzhou office"
          width={1920}
          height={1080}
          priority
        />
        <div className="story-stats">
          {page.stats.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
