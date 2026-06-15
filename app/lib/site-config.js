export const SITE_URL = "https://xlwinch.com";
export const SITE_NAME = "XLIGHTING";
export const COMPANY_NAME = "Guangzhou X Lighting Co., Ltd.";
export const CONTACT_EMAIL = "info@xlwinch.com";
export const WHATSAPP_NUMBER = "+86 159 7549 0982";

export function absoluteUrl(path = "/") {
  if (!path) {
    return SITE_URL;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
