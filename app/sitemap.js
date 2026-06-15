import { resourceArticles } from "./components/infoCenterData";
import { productList } from "./lib/product-data";
import { LOCALE_OPTIONS, localizedPath } from "./lib/i18n-config";
import { SITE_URL } from "./lib/site-config";

const staticRoutes = [
  "/",
  "/products",
  "/applications",
  "/projects",
  "/about",
  "/factory",
  "/info-center",
  "/blog",
  "/news",
  "/exhibitions",
  "/faq",
  "/knowledge",
  "/download",
  "/contact",
  "/inquiry"
];

function absolutePath(path) {
  return `${SITE_URL}${path}`;
}

function languageAlternates(path) {
  return LOCALE_OPTIONS.reduce((languages, locale) => {
    languages[locale.hreflang] = absolutePath(localizedPath(locale.code, path));
    return languages;
  }, {});
}

function entry(path, priority = 0.7, changeFrequency = "monthly") {
  return {
    url: absolutePath(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "x-default": absolutePath(localizedPath("en", path)),
        ...languageAlternates(path)
      }
    }
  };
}

export default function sitemap() {
  const productRoutes = productList.map((product) => product.href);
  const articleRoutes = Object.values(resourceArticles)
    .flat()
    .map((article) => article.href);

  const routes = [
    ...staticRoutes,
    ...productRoutes,
    ...articleRoutes
  ];

  return Array.from(new Set(routes)).map((path) => {
    if (path === "/") {
      return entry(path, 1, "weekly");
    }

    if (path.startsWith("/products")) {
      return entry(path, 0.85, "monthly");
    }

    if (path === "/blog" || path === "/news" || path === "/knowledge") {
      return entry(path, 0.75, "weekly");
    }

    return entry(path);
  });
}
