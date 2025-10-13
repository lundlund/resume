import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

type Item = { label: string; to: string };
const PRIMARY: Item[] = [
  { label: "Forside", to: "/" },
  { label: "Projekter", to: "/projects" },
  { label: "Om mig", to: "/about" },
  { label: "Kontakt", to: "/contact" },
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
      const t = setTimeout(() => firstRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Luk ved route-skift
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const node = (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-200
                  ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* REN HVID BAGGRUND – ingen overlay */}
      <div className="absolute inset-0 bg-white" />

      {/* Indhold */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-neutral-900
                    transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-2"}`}
      >
        {/* Luk-knap */}
        <button
          onClick={onClose}
          aria-label="Luk menu"
          className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center
                     rounded-xl border border-neutral-300 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        >
          ✕
        </button>

        <h2 id={titleId} className="sr-only">Navigation</h2>

        {/* Primære links – store, men ikke overdrevent */}
        <nav className="w-full max-w-4xl px-6">
          <ul className="grid gap-4 text-center">
            {PRIMARY.map((item, i) => (
              <li
                key={item.to}
                className={`transition-all duration-300
                            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                style={{ transitionDelay: `${100 + i * 50}ms` }}
              >
                <Link
                  ref={i === 0 ? firstRef : undefined}
                  to={item.to}
                  className="inline-block text-3xl sm:text-4xl md:text-5xl leading-none
                             px-3 py-2 rounded-xl hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Socials / CTA – enkel og lys */}
          <div
            className={`mt-12 flex flex-wrap items-center justify-center gap-3 transition-all duration-300
                        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ transitionDelay: "220ms" }}
          >
            <a href="mailto:you@example.com" className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
              Email
            </a>
            <a href="https://github.com/ditnavn" target="_blank" rel="noreferrer" className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ditnavn" target="_blank" rel="noreferrer" className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
              LinkedIn
            </a>
            <Link to="/contact" className="rounded-xl border border-neutral-400 px-4 py-2 hover:bg-neutral-50">
              Book et møde
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );

  // Portal til <body> for at undgå z-index/stacking-problemer
  return createPortal(node, document.body);
}
