"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getDictionary, getTranslation } from "../lib/dictionaries";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  isSupportedLocale,
  localizedPath,
  stripLocaleFromPathname
} from "../lib/i18n-config";

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLocale = DEFAULT_LOCALE }) {
  const safeInitialLocale = isSupportedLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE;
  const [locale, setLocaleState] = useState(safeInitialLocale);

  const setLocale = useCallback((nextLocale) => {
    if (!isSupportedLocale(nextLocale)) {
      return;
    }

    setLocaleState(nextLocale);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("xlighting-locale", nextLocale);
    }
  }, []);

  const href = useCallback(
    (targetHref) => localizedPath(locale, targetHref),
    [locale]
  );

  useEffect(() => {
    const pathLocale = getLocaleFromPathname(window.location.pathname);
    const storedLocale = window.localStorage.getItem("xlighting-locale");

    if (pathLocale) {
      setLocale(pathLocale);
      return;
    }

    if (storedLocale && isSupportedLocale(storedLocale) && storedLocale !== DEFAULT_LOCALE) {
      const cleanPath = stripLocaleFromPathname(window.location.pathname);
      const nextPath = localizedPath(storedLocale, cleanPath);
      window.location.replace(`${nextPath}${window.location.search}${window.location.hash}`);
    }
  }, [setLocale]);

  const switchLocale = useCallback(
    (nextLocale) => {
      if (!isSupportedLocale(nextLocale) || typeof window === "undefined") {
        setLocale(nextLocale);
        return;
      }

      setLocale(nextLocale);

      const cleanPath = stripLocaleFromPathname(window.location.pathname);
      const nextPath = localizedPath(nextLocale, cleanPath);
      window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
    },
    [setLocale]
  );

  const value = useMemo(
    () => ({
      dictionary: getDictionary(locale),
      href,
      locale,
      setLocale,
      switchLocale,
      t: (path, fallback) => getTranslation(locale, path, fallback)
    }),
    [href, locale, setLocale, switchLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
