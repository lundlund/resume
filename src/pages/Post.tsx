import { useParams, Link } from "react-router-dom";
import { MdxWrapper } from "@/mdx";
import { getLang, type Lang } from "@/lib/lang";

type Meta = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
  slug?: string;
};

const da = import.meta.glob("../posts/da/*.mdx", { eager: true }) as Record<
  string, { default: React.ComponentType; meta?: Partial<Meta> }
>;
const en = import.meta.glob("../posts/en/*.mdx", { eager: true }) as Record<
  string, { default: React.ComponentType; meta?: Partial<Meta> }
>;

function pick(slug: string, lang: Lang) {
  const base = lang === "en" ? en : da;
  const fb = lang === "en" ? da : en;

  const hit =
    Object.entries(base).find(([p]) => p.endsWith(`/${slug}.mdx`)) ??
    Object.entries(fb).find(([p]) => p.endsWith(`/${slug}.mdx`));

  if (!hit) return null;

  const mod = hit[1];
  const meta: Meta = {
    title: "",
    date: new Date().toISOString().slice(0, 10),
    ...(mod.meta || {}),
    slug,
  };

  return { Component: mod.default, meta };
}

export default function Post() {
  const { slug } = useParams();
  const lang = getLang();
  const data = slug ? pick(slug, lang) : null;

  if (!data || data.meta.draft) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>Indlægget findes ikke.</p>
        <Link to="/blog" className="underline">← Tilbage til blog</Link>
      </main>
    );
    }

  const { Component, meta } = data;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">{meta.title || slug}</h1>
          <div className="text-sm text-neutral-600">{meta.date}</div>
          {meta.excerpt && <p className="mt-2 text-neutral-800">{meta.excerpt}</p>}
        </header>

        <MdxWrapper>
          <Component />
        </MdxWrapper>
      </article>

      <div className="mt-10">
        <Link to="/blog" className="underline">← Alle indlæg</Link>
      </div>
    </main>
  );
}
