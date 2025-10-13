import { Link } from "react-router-dom";
import { getLang, type Lang } from "@/lib/lang";

type Meta = {
  title: string;
  date: string; // YYYY-MM-DD
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

function buildPosts(lang: Lang) {
  const base = lang === "en" ? en : da;
  const fallback = lang === "en" ? da : en;

  // Saml alle slugs fra begge sprog
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

export default function Blog() {
  const posts = buildPosts(getLang());

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>

      {posts.length === 0 && <p>Der er endnu ingen indlæg.</p>}

      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-neutral-200 pb-6">
            <Link to={`/blog/${p.slug}`} className="text-2xl font-medium hover:opacity-80">
              {p.meta.title || p.slug}
            </Link>
            <div className="text-sm text-neutral-600">{p.meta.date}</div>
            {p.meta.excerpt && <p className="mt-2 text-neutral-800">{p.meta.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
