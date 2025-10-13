// src/components/FullScreenMenu.tsx
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

type Item = { key: string; to: string };
const PRIMARY: Item[] = [
  { key: "nav.home",     to: "/" },
  { key: "nav.projects", to: "/projects" },
  { key: "nav.about",    to: "/about" },
  { key: "nav.contact",  to: "/contact" },
];

export default function FullScreenMenu({
  open,
  onClose,
  titleId = "nav-title",
}: {
  open: boolean;
  onClose: () => void;
  titleId?: string;
}) {
  const { t } = useTranslation();
  const firstRef = useRef<HTMLAnchorElement | null>(null);
  const location = useLocation();

  // Esc-luk
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  // Fokus på første link
  useEffect(() => {
    if (open) {
      const tmo = setTimeout(() => firstRef.current?.focus(), 10);
      return () => clearTimeout(tmo);
    }
  }, [open]);

  // Luk ved route-skift
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const node = (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Hvid baggrund */}
      <div className="absolute inset-0 bg-white" />

      {/* Indhold */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-neutral-900 transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-2"
        }`}
      >
        {/* Luk-knap */}
        <button
          onClick={onClose}
          aria-label={t("nav.close", { defaultValue: "Luk menu" })}
          className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        >
          ✕
        </button>

        <h2 id={titleId} className="sr-only">
          {t("nav.title", { defaultValue: "Navigation" })}
        </h2>

        {/* Primære links */}
        <nav className="w-full max-w-4xl px-6">
          <ul className="grid gap-4 text-center">
            {PRIMARY.map((item, i) => (
              <li
                key={item.to}
                className={`transition-all duration-300 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${100 + i * 50}ms` }}
              >
                <Link
                  ref={i === 0 ? firstRef : undefined}
                  to={item.to}
                  className="inline-block text-3xl sm:text-4xl md:text-5xl leading-none px-3 py-2 rounded-xl hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Socials / CTA */}
          <div
            className={`mt-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            <a
              href="mailto:you@example.com"
              className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
            >
              {t("nav.email", { defaultValue: "Email" })}
            </a>
            <a
              href="https://github.com/ditnavn"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ditnavn"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
            >
              LinkedIn
            </a>
            <Link
              to="/contact"
              className="rounded-xl border border-neutral-400 px-4 py-2 hover:bg-neutral-50"
            >
              {t("nav.book", { defaultValue: "Book et møde" })}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
