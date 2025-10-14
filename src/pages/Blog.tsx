// src/pages/Blog.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Highlighter from "@/components/Highlighter";

type Meta = {
  title: string;
  date: string;            // YYYY-MM-DD
  excerpt?: string;
  tags?: string[];         // fx ["ai","rag"]
  category?: string;       // fx "AI"
  image?: string;          // valgfri cover, fx "/img/covers/foo.jpg"
  draft?: boolean;
  slug?: string;
};

const da = import.meta.glob("../posts/da/*.mdx", { eager: true }) as Record<
  string, { default: React.ComponentType; meta?: Partial<Meta> }
>;
const en = import.meta.glob("../posts/en/*.mdx", { eager: true }) as Record<
  string, { default: React.ComponentType; meta?: Partial<Meta> }
>;

type Lang = "da" | "en";

function buildPosts(lang: Lang) {
  const base = lang === "en" ? en : da;
  const fallback = lang === "en" ? da : en;

  const slugs = new Set(
    Object.keys(base).concat(Object.keys(fallback)).map((p) =>
      p.split("/").pop()!.replace(".mdx", "")
    )
  );

  const list = Array.from(slugs).map((slug) => {
    const pick =
      Object.entries(base).find(([p]) => p.endsWith(`/${slug}.mdx`)) ??
      Object.entries(fallback).find(([p]) => p.endsWith(`/${slug}.mdx`));
    const mod = pick![1];
    const meta: Meta = {
      title: "",
      date: new Date().toISOString().slice(0, 10),
      ...(mod.meta || {}),
      slug,
    };
    return { slug, Component: mod.default, meta };
  });

  return list
    .filter((p) => !p.meta.draft)
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return d;
  }
}

export default function Blog() {
  const { i18n, t } = useTranslation();
  const lang: Lang = (i18n.resolvedLanguage || "da").toLowerCase().startsWith("en") ? "en" : "da";
  const posts = buildPosts(lang);

  // tag-frekvens til sidekolonne
  const tagCounts = new Map<string, number>();
  posts.forEach((p) => (p.meta.tags || []).forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)));
  const popularTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name]) => name);

  const [feature, ...rest] = posts;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 flex items-end justify-between gap-4">
  <h1 className="text-4xl sm:text-4xl font-semibold tracking-tight">
    <Highlighter className="px-1">Blog</Highlighter>
  </h1>
  <Link
    to="/blog"
    className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
  >
    {t("blog.readAll", { defaultValue: "Se alle indlæg" })}
    <span aria-hidden>→</span>
  </Link>
</header>

      {/* Grid: feature + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
        <section className="space-y-8">
          {/* FEATURED CARD */}
          {feature ? (
            <article className="rounded-3xl overflow-hidden border border-black/5 bg-white">
              {feature.meta.image ? (
                <Link to={`/blog/${feature.slug}`}>
                  <img
                    src={feature.meta.image}
                    alt=""
                    className="h-64 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              ) : (
                <div className="h-6" /> // lille spacer hvis ingen billede
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-neutral-600">
                  {feature.meta.category && (
                    <span className="inline-flex items-center rounded-full bg-accent/60 text-black px-2.5 py-1">
                      {feature.meta.category}
                    </span>
                  )}
                  <time dateTime={feature.meta.date}>{formatDate(feature.meta.date)}</time>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  <Link to={`/blog/${feature.slug}`} className="hover:opacity-80">
                    {feature.meta.title || feature.slug}
                  </Link>
                </h2>
                {feature.meta.excerpt && (
                  <p className="mt-3 text-neutral-700 leading-relaxed">{feature.meta.excerpt}</p>
                )}

                {/* hurtige links til et par næste indlæg */}
                <ul className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-50/60">
                  {rest.slice(0, 2).map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-4 px-4 py-3">
                      <Link to={`/blog/${p.slug}`} className="truncate hover:opacity-80">
                        {p.meta.title || p.slug}
                      </Link>
                      <span aria-hidden>→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ) : (
            <p className="text-neutral-600">{t("blog.empty", { defaultValue: "Der er endnu ingen indlæg." })}</p>
          )}

          {/* RESTEN: kort-grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              {rest.map((p) => (
                <article key={p.slug} className="rounded-2xl border border-black/5 bg-white overflow-hidden">
                  {p.meta.image && (
                    <Link to={`/blog/${p.slug}`}>
                      <img src={p.meta.image} alt="" className="h-40 w-full object-cover" loading="lazy" />
                    </Link>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      {p.meta.category && (
                        <span className="inline-flex items-center rounded-full bg-accent/60 text-black px-2 py-0.5">
                          {p.meta.category}
                        </span>
                      )}
                      <time dateTime={p.meta.date}>{formatDate(p.meta.date)}</time>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">
                      <Link to={`/blog/${p.slug}`} className="hover:opacity-80">
                        {p.meta.title || p.slug}
                      </Link>
                    </h3>
                    {p.meta.excerpt && (
                      <p className="mt-2 line-clamp-3 text-neutral-700">{p.meta.excerpt}</p>
                    )}
                    {!!p.meta.tags?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.meta.tags!.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] rounded-full border border-neutral-300 px-2 py-0.5 text-neutral-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* kategori / CTA kort */}
          <div className="rounded-3xl border border-black/5 bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">
              {t("blog.ctaTitle", { defaultValue: "Få nye indlæg først" })}
            </h3>
            <p className="text-sm text-neutral-700">
              {t("blog.ctaText", { defaultValue: "Følg med i AI, lokal LLM og cases fra virkeligheden." })}
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 hover:bg-neutral-50"
            >
              {t("blog.ctaAction", { defaultValue: "Kontakt" })} <span aria-hidden>→</span>
            </Link>
          </div>

          {/* tags cloud */}
          {popularTags.length > 0 && (
            <div className="rounded-3xl border border-black/5 bg-white p-6">
              <h3 className="text-lg font-semibold mb-3">{t("blog.tags", { defaultValue: "Populære emner" })}</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-sm text-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
