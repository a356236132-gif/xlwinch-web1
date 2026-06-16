"use client";

import { useEffect } from "react";

export function trackEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || !eventName) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters
  });

  window.gtag?.("event", eventName, parameters);
}

export default function AnalyticsEvents() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    function handleTrackedClick(event) {
      const clickedElement = event.target instanceof Element ? event.target : event.target?.parentElement;
      const target = clickedElement?.closest("[data-track-event]");

      if (!target) {
        return;
      }

      trackEvent(target.dataset.trackEvent, {
        event_category: target.dataset.trackCategory || "engagement",
        event_label: target.dataset.trackLabel || target.textContent?.trim() || "",
        link_url: target.href || "",
        location: target.dataset.trackLocation || window.location.pathname
      });
    }

    document.addEventListener("click", handleTrackedClick, true);

    return () => {
      document.removeEventListener("click", handleTrackedClick, true);
    };
  }, []);

  return null;
}
