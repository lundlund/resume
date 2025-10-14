import React from "react";
import { useTranslation } from "react-i18next";

type Props = { className?: string };

export default function TrustBadges({ className = "" }: Props) {
  const { t } = useTranslation();

  const items = [
    {
      key: "gdpr",
      title: t("trust.gdpr.title", { defaultValue: "GDPR-kompatibel" }),
      desc: t("trust.gdpr.desc", { defaultValue: "Databehandling med samtykke og mindst mulige data." }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="currentColor" d="M12 2l7 3v5c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V5l7-3z" />
          <path fill="#fff" d="M10.5 12.5l1.5 1.5 3.5-3.5 1 1-4.5 4.5-2.5-2.5z" />
        </svg>
      ),
    },
    {
      key: "security",
      title: t("trust.security.title", { defaultValue: "Sikkerhed først" }),
      desc: t("trust.security.desc", { defaultValue: "Krypterede kanaler, principper om mindst privilegium." }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="currentColor" d="M12 1l9 4v6c0 6.08-4.02 11.72-9 13-4.98-1.28-9-6.92-9-13V5l9-4z" />
          <path fill="#fff" d="M12 8a3 3 0 013 3v1h1a1 1 0 010 2H8a1 1 0 010-2h1v-1a3 3 0 013-3zm-1 4h2v-1a1 1 0 10-2 0v1z" />
        </svg>
      ),
    },
    {
      key: "local",
      title: t("trust.local.title", { defaultValue: "Lokalt forankret" }),
      desc: t("trust.local.desc", { defaultValue: "Hosting og rådgivning med fokus på Danmark/EU." }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="currentColor" d="M12 2C7.58 2 4 5.58 4 10c0 5.25 6.3 11.38 7.27 12.25.42.36 1.04.36 1.46 0C13.7 21.38 20 15.25 20 10c0-4.42-3.58-8-8-8z"/>
          <circle cx="12" cy="10" r="3" fill="#fff"/>
        </svg>
      ),
    },
    {
      key: "netlify",
      title: t("trust.netlify.title", { defaultValue: "Spam-beskyttet" }),
      desc: t("trust.netlify.desc", { defaultValue: "Netlify Forms honeypot og server-validering." }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="currentColor" d="M12 2l9 9-9 9-9-9 9-9zm0 4.5L6.5 12 12 17.5 17.5 12 12 6.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={className}>
      <div className="h-px w-full bg-neutral-200/70 mb-5" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <li key={it.key} className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-neutral-900 text-white p-2">{it.icon}</div>
            <div>
              <p className="text-sm font-semibold">{it.title}</p>
              <p className="text-sm text-neutral-600">{it.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
