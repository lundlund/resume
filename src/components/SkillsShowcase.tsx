// src/components/SkillsWithAside.tsx
import React from "react";
import { useTranslation } from "react-i18next";

type Item = { label: string; variant?: "light" | "dark" } | { br: true };

function toLines(items: Item[]) {
  const lines: Item[][] = [];
  let buf: Item[] = [];
  for (const it of items) {
    if ("br" in it && it.br) {
      if (buf.length) lines.push(buf), (buf = []);
    } else {
      buf.push(it);
    }
  }
  if (buf.length) lines.push(buf);
  return lines;
}

export default function SkillsWithAside() {
  const { t } = useTranslation();
  const items = t("skills.items", {
    returnObjects: true,
    defaultValue: ([
      { label: "Content Strategy" },
      { label: "Writing", variant: "dark" },
      { br: true },
      { label: "Campaign Management", variant: "light" },
      { br: true },
      { label: "Branding", variant: "dark" },
      { label: "Social Media" }
    ] as Item[])
  }) as Item[];

  const lines = toLines(items);

  return (
    <section className="sectionY={0}">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14">
        {/* VENSTRE: samme look som “første” – linje for linje, venstrejusteret */}
        <div aria-label={t("skills.aria", { defaultValue: "Kompetenceliste" })}>
          <div className="text-[clamp(10px,5.5vw,24px)] leading-[1.35] font-light">
            <div className="space-y-6">
              {lines.map((line, idx) => (
                <div key={idx} className="flex flex-wrap justify-start gap-x-6 gap-y-3">
                  {line.map((it, i) => {
                    const node = it as Exclude<Item, { br: true }>;
                    return (
                      <span
                        key={(node.label || "") + i}
                        className={[
                          "inline-block rounded-sm align-middle",
                          "px-3 py-1.5",
                          node.variant === "light" && "bg-neutral-200 text-neutral-900",
                          node.variant === "dark" && "bg-neutral-900 text-white",
                          !node.variant && "text-neutral-900"
                        ].filter(Boolean).join(" ")}
                      >
                        {node.label}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HØJRE: tekst/aside */}
        <aside className="self-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("skills.aside.title", { defaultValue: "Strategi til leveret værdi" })}
          </h2>
          <p className="mt-4 text-neutral-700 leading-7">
            {t("skills.aside.body", {
              defaultValue:
                "Jeg kombinerer indholdsstrategi, kampagner og branding til løsninger, der kan måles på KPI’er. Hurtige iterationer og tæt samarbejde reducerer tid fra idé til effekt."
            })}
          </p>
          <ul className="mt-6 space-y-2 text-neutral-800">
            <li>• {t("skills.aside.points.0", { defaultValue: "Tæt feedback-loop med interessenter" })}</li>
            <li>• {t("skills.aside.points.1", { defaultValue: "Klare metrics og læring pr. sprint" })}</li>
            <li>• {t("skills.aside.points.2", { defaultValue: "Konsistent brand-oplevelse på tværs af kanaler" })}</li>
          </ul>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center rounded-xl border border-neutral-300 px-5 py-2.5 hover:bg-neutral-50"
            >
              {t("skills.aside.cta", { defaultValue: "Lad os tale om jeres mål" })}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
