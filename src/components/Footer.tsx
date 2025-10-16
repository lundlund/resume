import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Highlighter from "@/components/Highlighter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const links = {
  primary: [
    { to: "/about", label: "Om" },
    { to: "/projects", label: "Projekter" },
    { to: "/contact", label: "Kontakt" },
  ],
  external: [
    { href: "https://github.com/ditbrugernavn", label: "GitHub" },
    { href: "https://www.linkedin.com/in/ditbrugernavn/", label: "LinkedIn" },
    { href: "mailto:dennis@lundai.dk", label: "Email" },
  ],
};

export function Footer() {
  const { i18n } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24">
      {/* Top: CTA section */}
      <section
        className="
          container-xl
          rounded-3xl border border-black/10 dark:border-white/10
          bg-white/60 white:bg-white/80 backdrop-blur
          px-6 py-10 md:px-10 md:py-12 mb-10 md:mb-16
        "
        aria-labelledby="footer-cta"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2
              id="footer-cta"
              className="text-2xl md:text-3xl font-semibold tracking-tight"
            >
              Klar til at bruge <Highlighter>AI rigtigt?</Highlighter>
            </h2>
            <p className="mt-3 text-sm text-black/60 dark:text-black/60">
              Jeg sætter jeres GPT’er og lokale LLM’er op, finjusterer prompts
              og gør det hele brugbart i hverdagen – sikkert og dokumenteret.
            </p>
          </div>

          <div className="flex flex-row gap-3 justify-center sm:justify-start items-center">
            <Link
              to="/contact"
              className="
      inline-flex items-center justify-center shrink-0 whitespace-nowrap
      rounded-md px-4 h-11 text-sm font-medium
      bg-black text-white
      ring-1 ring-black/10 hover:brightness-95 transition
    "
            >
              Book en intro
            </Link>

            <a
              href="/cv.pdf"
              className="
      inline-flex items-center justify-center shrink-0 whitespace-nowrap
      rounded-xl px-4 h-11 text-sm
      ring-1 ring-black/10 dark:ring-white/10
      hover:bg-black/5 dark:hover:bg-white/5 transition
    "
            >
              Download CV
            </a>
          </div>
        </div>

        {/* divider line in brand yellow */}
        <div
          className="mt-8 h-[2px] w-full rounded-full"
          style={{ background: "var(--brand-yellow,#FFD54A)" }}
          aria-hidden="true"
        />

        {/* Link columns */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <nav className="text-sm" aria-label="Primær navigation">
            <div className="font-medium mb-2">Navigation</div>
            <ul className="space-y-2">
              {links.primary.map((l) => (
                <li key={l.label}>
                  <Link className="hover:opacity-80" to={l.to}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="text-sm" aria-label="Eksternt">
            <div className="font-medium mb-2">Andre steder</div>
            <ul className="space-y-2">
              {links.external.map((l) => (
                <li key={l.label}>
                  <a
                    className="hover:opacity-80"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <div className="font-medium mb-2">Kontakt</div>
            <p className="text-black/70 dark:text-black/70">
              København, Danmark
              <br />
            </p>
            <br />
            <LanguageSwitcher />
          </div>
        </div>
      </section>
    </footer>
  );
}
