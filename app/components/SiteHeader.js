"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

const CLOSE_DELAY = 300;

function menuDomId(id) {
  return `mega-${id}`;
}

function MegaItem({
  id,
  label,
  activeMenu,
  onOpen,
  onScheduleClose,
  onTogglePinned
}) {
  const isOpen = activeMenu === id;

  return (
    <div
      className={`nav-item has-mega${isOpen ? " is-open" : ""}`}
      onMouseEnter={() => onOpen(id)}
      onMouseLeave={onScheduleClose}
    >
      <button
        aria-controls={menuDomId(id)}
        aria-expanded={isOpen}
        className="mega-trigger"
        onClick={() => onTogglePinned(id)}
        onFocus={() => onOpen(id)}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}

function MegaDropdown({ localizeHref, menu, onCancelClose, onLinkClick, onScheduleClose }) {
  if (!menu) {
    return null;
  }

  return (
    <div
      className="mega-menu is-open"
      id={menuDomId(menu.id)}
      onMouseEnter={onCancelClose}
      onMouseLeave={onScheduleClose}
      role="menu"
    >
      <div className="mega-panel">
        <div className="mega-intro">
          <span>{menu.introLabel}</span>
          <strong>{menu.introText}</strong>
          <a href={localizeHref(menu.introHref)} onClick={onLinkClick}>
            {menu.introCta}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="mega-links">
          {menu.links.map(([name, text, link]) => (
            <a key={name} href={localizeHref(link)} onClick={onLinkClick}>
              <span>{name}</span>
              <small>{text}</small>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const { dictionary, href } = useLanguage();
  const [activeMenu, setActiveMenu] = useState(null);
  const [pinnedMenu, setPinnedMenu] = useState(null);
  const closeTimerRef = useRef(null);
  const headerRef = useRef(null);
  const header = dictionary.header;
  const megaItems = [
    {
      id: "products",
      label: header.products,
      introLabel: header.mega.products.introLabel,
      introText: header.mega.products.introText,
      introHref: "/products",
      introCta: header.mega.products.introCta,
      links: header.mega.products.links
    },
    {
      id: "applications",
      label: header.applications,
      introLabel: header.mega.applications.introLabel,
      introText: header.mega.applications.introText,
      introHref: "/applications",
      introCta: header.mega.applications.introCta,
      links: header.mega.applications.links
    },
    {
      id: "about",
      label: header.about,
      introLabel: header.mega.about.introLabel,
      introText: header.mega.about.introText,
      introHref: "/about",
      introCta: header.mega.about.introCta,
      links: header.mega.about.links
    },
    {
      id: "info",
      label: header.info,
      introLabel: header.mega.info.introLabel,
      introText: header.mega.info.introText,
      introHref: "/info-center",
      introCta: header.mega.info.introCta,
      links: header.mega.info.links
    }
  ];

  function cancelClose() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu(id) {
    cancelClose();
    if (!pinnedMenu || pinnedMenu === id) {
      setActiveMenu(id);
    }
  }

  function scheduleClose() {
    cancelClose();
    if (pinnedMenu) {
      return;
    }

    closeTimerRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, CLOSE_DELAY);
  }

  function togglePinned(id) {
    cancelClose();
    if (pinnedMenu === id && activeMenu === id) {
      setPinnedMenu(null);
      setActiveMenu(null);
      return;
    }

    setPinnedMenu(id);
    setActiveMenu(id);
  }

  function closeMenu() {
    cancelClose();
    setPinnedMenu(null);
    setActiveMenu(null);
  }

  const activeMegaMenu = megaItems.find((item) => item.id === activeMenu);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!headerRef.current || headerRef.current.contains(event.target)) {
        return;
      }

      cancelClose();
      setPinnedMenu(null);
      setActiveMenu(null);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        cancelClose();
        setPinnedMenu(null);
        setActiveMenu(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelClose();
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href={href("/")} aria-label="XLIGHTING home">
        <Image src="/assets/logo-header-v2.png" alt="XLIGHTING" width={146} height={40} priority />
      </a>

      <nav className="desktop-nav mega-nav" aria-label="Primary navigation">
        <a href={href("/")}>{header.home}</a>
        <MegaItem
          activeMenu={activeMenu}
          id="products"
          label={header.products}
          onOpen={openMenu}
          onScheduleClose={scheduleClose}
          onTogglePinned={togglePinned}
        />
        <MegaItem
          activeMenu={activeMenu}
          id="applications"
          label={header.applications}
          onOpen={openMenu}
          onScheduleClose={scheduleClose}
          onTogglePinned={togglePinned}
        />
        <a href={href("/projects")}>{header.projects}</a>
        <MegaItem
          activeMenu={activeMenu}
          id="about"
          label={header.about}
          onOpen={openMenu}
          onScheduleClose={scheduleClose}
          onTogglePinned={togglePinned}
        />
        <MegaItem
          activeMenu={activeMenu}
          id="info"
          label={header.info}
          onOpen={openMenu}
          onScheduleClose={scheduleClose}
          onTogglePinned={togglePinned}
        />
        <a href={href("/contact")}>{header.contact}</a>
      </nav>

      <div className="header-actions-group">
        <LanguageSwitcher />
        <a className="header-cta" href={href("/inquiry")}>
          {header.getQuote}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>

      <MegaDropdown
        localizeHref={href}
        menu={activeMegaMenu}
        onCancelClose={cancelClose}
        onLinkClick={closeMenu}
        onScheduleClose={scheduleClose}
      />
    </header>
  );
}
