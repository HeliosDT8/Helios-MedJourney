"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";

const links = [
  { href: "/services", label: "Services" },
  { href: "/mission", label: "Our mission" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.localStorage.getItem("helios-theme-v2"); } catch {}
    const initial = saved === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setThemeMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setThemeMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const chooseTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try { window.localStorage.setItem("helios-theme-v2", nextTheme); } catch {}
    setThemeMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand-link" href="/" aria-label="Helios Digital Technology home">
          <BrandLogo className="brand-logo" priority />
        </Link>
        <nav className={`primary-nav${mobileMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <div className="theme-picker" ref={menuRef}>
            <button
              className="settings-button"
              type="button"
              aria-label="Theme settings"
              aria-haspopup="menu"
              aria-expanded={themeMenuOpen}
              onClick={() => setThemeMenuOpen((open) => !open)}
            >
              <SettingsIcon />
            </button>
            {themeMenuOpen && (
              <div className="theme-menu" role="menu" aria-label="Choose theme">
                <p className="theme-menu-title">Appearance</p>
                {(["light", "dark"] as const).map((option) => (
                  <button
                    key={option}
                    className="theme-option"
                    type="button"
                    role="menuitemradio"
                    aria-checked={theme === option}
                    onClick={() => chooseTheme(option)}
                  >
                    <span aria-hidden="true">{option === "light" ? "☼" : "☾"}</span>
                    <span>{option === "light" ? "Light theme" : "Dark theme"}</span>
                    <span className="theme-check" aria-hidden="true">✓</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link className="button button-small" href="/contact">Start a Project <span aria-hidden="true">↗</span></Link>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
