import "./globals.css";
import Script from "next/script";
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

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "";
const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID || "";
const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

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
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification
        }
      }
    : {})
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
        {googleTagManagerId && (
          <>
            <Script
              id="google-tag-manager"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${googleTagManagerId}');
                `
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        {googleAnalyticsMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsMeasurementId}');
                `
              }}
            />
          </>
        )}
        <LanguageProvider initialLocale={locale}>
          {children}
          <WhatsAppFloatingButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
