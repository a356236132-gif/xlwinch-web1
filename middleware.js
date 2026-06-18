import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname
} from "./app/lib/i18n-config";

export function middleware(request) {
  const url = new URL(request.url);

  if (url.hostname === "www.xlwinch.com") {
    url.hostname = "xlwinch.com";
    return NextResponse.redirect(url, 308);
  }

  const pathname = url.pathname;
  const localeFromPath = getLocaleFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", localeFromPath || DEFAULT_LOCALE);
  requestHeaders.set("x-xl-pathname", pathname);
  requestHeaders.set("x-xl-locale", localeFromPath || DEFAULT_LOCALE);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"]
};
