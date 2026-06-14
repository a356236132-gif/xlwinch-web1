import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  stripLocaleFromPathname
} from "./app/lib/i18n-config";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const localeFromPath = getLocaleFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", localeFromPath || DEFAULT_LOCALE);

  if (!localeFromPath) {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = stripLocaleFromPathname(pathname);

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"]
};
