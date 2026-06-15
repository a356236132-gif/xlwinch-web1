import { notFound } from "next/navigation";
import { isSupportedLocale } from "../lib/i18n-config";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return children;
}
