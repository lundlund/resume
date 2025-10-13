import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation(); // re-render ved sprogskift

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">
        {t("about.title")}
      </h1>

      <p className="mt-6 text-lg text-neutral-700 leading-7">
        {t("about.intro")}
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">{t("about.skillsTitle")}</h2>
        <ul className="list-disc pl-5 text-neutral-800">
          <li>{t("about.skills.0")}</li>
          <li>{t("about.skills.1")}</li>
          <li>{t("about.skills.2")}</li>
        </ul>
      </section>

      <section className="mt-8">
        <a
          href="mailto:you@example.com"
          className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
        >
          {t("about.cta")}
        </a>
      </section>
    </main>
  );
}
