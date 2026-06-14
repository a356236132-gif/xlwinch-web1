export const DEFAULT_LOCALE = "en";

export const SUPPORTED_LOCALES = ["en", "fr", "es", "pt-br", "ru", "de"];

export const LOCALE_OPTIONS = [
  { code: "en", label: "English", shortLabel: "EN", hreflang: "en" },
  { code: "fr", label: "Français", shortLabel: "FR", hreflang: "fr" },
  { code: "es", label: "Español", shortLabel: "ES", hreflang: "es" },
  { code: "pt-br", label: "Português (Brasil)", shortLabel: "PT", hreflang: "pt-BR" },
  { code: "ru", label: "Русский", shortLabel: "RU", hreflang: "ru" },
  { code: "de", label: "Deutsch", shortLabel: "DE", hreflang: "de" }
];

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function getLocaleFromPathname(pathname = "/") {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

export function stripLocaleFromPathname(pathname = "/") {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || !isSupportedLocale(segments[0])) {
    return pathname || "/";
  }

  const nextPath = `/${segments.slice(1).join("/")}`;
  return nextPath === "/" ? "/" : nextPath.replace(/\/$/, "");
}

export function localizedPath(locale, href = "/") {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (/^https?:\/\//.test(href) || href.startsWith("/assets/")) {
    return href;
  }

  const cleanPath = stripLocaleFromPathname(href);
  const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  if (normalizedPath === "/") {
    return `/${safeLocale}/`;
  }

  return `/${safeLocale}${normalizedPath}`;
}

export function buildLanguageAlternates(pathname = "/") {
  const cleanPath = stripLocaleFromPathname(pathname);

  return LOCALE_OPTIONS.reduce(
    (alternates, language) => ({
      ...alternates,
      [language.hreflang]: localizedPath(language.code, cleanPath)
    }),
    {
      "x-default": localizedPath(DEFAULT_LOCALE, cleanPath)
    }
  );
}
