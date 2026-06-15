import "./globals.css";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import { LanguageProvider } from "./components/LanguageProvider";
import { headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  buildLanguageAlternates,
  isSupportedLocale,
  localizedPath,
  stripLocaleFromPathname
} from "./lib/i18n-config";
import { SITE_URL } from "./lib/site-config";

const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "XLIGHTING | Kinetic Lighting Systems & XLWINCH Manufacturer",
    template: "%s | XLIGHTING"
  },
  description:
    "XLIGHTING manufactures kinetic lighting systems, XLWINCH, kinetic balls, kinetic tubes and custom stage lighting solutions for concerts, clubs, theaters, churches, events and installations.",
  keywords: [
    "kinetic lighting system",
    "kinetic lights manufacturer",
    "kinetic winch system",
    "stage kinetic lighting supplier",
    "DMX kinetic winch system",
    "custom kinetic lighting OEM ODM"
  ],
  openGraph: {
    title: "XLIGHTING Kinetic Lighting Systems",
    description:
      "OEM/ODM kinetic lighting and XLWINCH systems for global B2B stage, event and installation buyers.",
    url: SITE_URL,
    siteName: "XLIGHTING",
    images: [
      {
        url: "/assets/hero-xk16c.jpg",
        width: 1672,
        height: 941,
        alt: "XLIGHTING X-K16C PRO kinetic beam ring stage lighting"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export async function generateMetadata() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-xl-pathname") || headerStore.get("x-pathname") || "/";
  const headerLocale = headerStore.get("x-xl-locale") || headerStore.get("x-locale") || DEFAULT_LOCALE;
  const locale = isSupportedLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;
  const cleanPath = stripLocaleFromPathname(pathname);

  return {
    ...baseMetadata,
    alternates: {
      canonical: localizedPath(locale, cleanPath),
      languages: buildLanguageAlternates(pathname)
    }
  };
}

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-xl-locale") || headerStore.get("x-locale") || DEFAULT_LOCALE;
  const locale = isSupportedLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider initialLocale={locale}>
          {children}
          <WhatsAppFloatingButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
