"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LOCALE_OPTIONS } from "../lib/i18n-config";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, switchLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const currentLanguage = LOCALE_OPTIONS.find((language) => language.code === locale) || LOCALE_OPTIONS[0];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!switcherRef.current || switcherRef.current.contains(event.target)) {
        return;
      }

      setIsOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="language-switcher" ref={switcherRef}>
      <button
        aria-expanded={isOpen}
        aria-label={t("header.language")}
        className="language-current"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <Globe2 size={16} aria-hidden="true" />
        <span>{currentLanguage.shortLabel}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      <div className={`language-menu${isOpen ? " is-open" : ""}`}>
        {LOCALE_OPTIONS.map((language) => (
          <button
            aria-current={language.code === locale ? "true" : undefined}
            key={language.code}
            onClick={() => {
              setIsOpen(false);
              switchLocale(language.code);
            }}
            type="button"
          >
            <span>{language.label}</span>
            <small>{language.shortLabel}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
