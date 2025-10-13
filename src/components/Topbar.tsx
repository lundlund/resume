// src/components/Topbar.tsx
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FullScreenMenu from "./FullScreenMenu";

type LinkItem = { to: string; key: string };

const LINKS: LinkItem[] = [
  { to: "/projects", key: "nav.projects" },
  { to: "/about",    key: "nav.about" },
  { to: "/contact",  key: "nav.contact" },
  { to: "/blog",     key: "nav.blog" },
];

export default function Topbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // Returnér fokus til burger-knappen når menuen lukkes
  useEffect(() => {
    if (!open) (document.getElementById("burger-btn") as HTMLButtonElement | null)?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl h-16 flex items-center justify-between px-4">

        {/* Brand / logo */}
        <Link to="/" className="font-semibold tracking-tight">
          MitBrand
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-black" : "text-black/70 hover:text-black"}`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        {/* Right-side controls: Language + Burger (burger skjules på desktop) */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <button
            id="burger-btn"
            aria-label={t("nav.openMenu", { defaultValue: "Åbn menu" })}
            aria-expanded={open}
            aria-controls="fullscreen-menu"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300"
          >
            <span className="sr-only">{t("nav.openMenu", { defaultValue: "Åbn menu" })}</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-black" />
              <span className="block h-0.5 w-5 bg-black" />
              <span className="block h-0.5 w-5 bg-black" />
            </div>
          </button>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
