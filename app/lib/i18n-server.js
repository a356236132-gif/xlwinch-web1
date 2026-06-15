import { headers } from "next/headers";
import { DEFAULT_LOCALE, isSupportedLocale } from "./i18n-config";

export async function getRequestLocale() {
  const headerStore = await headers();
  const locale = headerStore.get("x-xl-locale") || headerStore.get("x-locale") || DEFAULT_LOCALE;

  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}
