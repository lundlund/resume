import { Trans, useTranslation } from "react-i18next";
import Highlighter from "@/components/Highlighter";

export default function Projects() {
  useTranslation(); // abonner på sprogskift (vi bruger ikke t direkte her)
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">
        <Trans
          i18nKey="projects.title"
          components={{
            hi1: <Highlighter>{""}</Highlighter>
          }}
          defaults={`Selected <hi1>projects</hi1>`}
        />
      </h1>

      <p className="mt-6 text-lg text-neutral-700 leading-7">
        <Trans
          i18nKey="projects.lead"
          components={{ hi: <Highlighter>{""}</Highlighter> }}
          defaults={`A showcase of shipped work and <hi>rapid prototypes</hi>.`}
        />
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50">
          <h3 className="text-xl font-semibold">{/* nøgle 1 */}<Trans i18nKey="projects.cards.0.title" defaults="LokalAI Landing" /></h3>
          <p className="mt-2 text-neutral-700"><Trans i18nKey="projects.cards.0.desc" defaults="Consultancy landing with pricing calculator and Netlify CMS." /></p>
        </article>

        <article className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50">
          <h3 className="text-xl font-semibold"><Trans i18nKey="projects.cards.1.title" defaults="Talker" /></h3>
          <p className="mt-2 text-neutral-700"><Trans i18nKey="projects.cards.1.desc" defaults="Privacy-first P2P messaging with circuit padding." /></p>
        </article>
      </div>
    </main>
  );
}
