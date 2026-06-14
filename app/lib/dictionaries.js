import de from "../../locales/de.json";
import en from "../../locales/en.json";
import es from "../../locales/es.json";
import fr from "../../locales/fr.json";
import ptBr from "../../locales/pt-br.json";
import ru from "../../locales/ru.json";
import { DEFAULT_LOCALE, isSupportedLocale } from "./i18n-config";

const dictionaries = {
  en,
  fr,
  es,
  "pt-br": ptBr,
  ru,
  de
};

export function getDictionary(locale = DEFAULT_LOCALE) {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const dictionary = dictionaries[safeLocale] || dictionaries[DEFAULT_LOCALE];

  if (safeLocale === DEFAULT_LOCALE) {
    return dictionary;
  }

  return mergeDictionary(dictionaries[DEFAULT_LOCALE], dictionary);
}

export function getTranslation(locale, path, fallback = "") {
  const dictionary = getDictionary(locale);
  const englishDictionary = getDictionary(DEFAULT_LOCALE);
  const value = getByPath(dictionary, path);

  if (value !== undefined) {
    return value;
  }

  const englishValue = getByPath(englishDictionary, path);
  return englishValue === undefined ? fallback : englishValue;
}

export function createTranslator(locale = DEFAULT_LOCALE) {
  return (path, fallback = "") => getTranslation(locale, path, fallback);
}

function getByPath(source, path) {
  return path.split(".").reduce((value, segment) => {
    if (value === undefined || value === null) {
      return undefined;
    }

    return value[segment];
  }, source);
}

function mergeDictionary(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override === undefined ? base : override;
  }

  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }

  return Object.keys({ ...base, ...override }).reduce((merged, key) => {
    merged[key] = mergeDictionary(base[key], override[key]);
    return merged;
  }, {});
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
