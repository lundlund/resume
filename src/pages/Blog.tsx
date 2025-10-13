import { Link } from "react-router-dom"

type Meta = {
  title: string
  date: string            // ISO YYYY-MM-DD
  excerpt?: string
  tags?: string[]
  ogImage?: string
  draft?: boolean
  slug?: string           // tilføjes ved build
}

const defaultMeta: Meta = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: [],
}

// Importér alle .mdx filer i /posts (build-tid)
const modules = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<
  string,
  { default: React.ComponentType; meta?: Partial<Meta> }
>

// Byg liste { slug, Component, meta } og sortér nyeste først
const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split("/").pop()!.replace(".mdx", "")
    const meta: Meta = { ...defaultMeta, ...(mod.meta || {}), slug }
    return { slug, Component: mod.default, meta }
  })
  // Skjul drafts (kan slås til ved behov)
  .filter(p => !p.meta.draft)
  // Sortér efter dato (desc)
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))

export default function Blog() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>

      {posts.length === 0 && (
        <p className="text-neutral-700">Der er endnu ingen indlæg.</p>
      )}

      <ul className="space-y-6">
        {posts.map(p => (
          <li key={p.slug} className="border-b border-neutral-200 pb-6">
            <Link to={`/blog/${p.slug}`} className="text-2xl font-medium hover:opacity-80">
              {p.meta.title || p.slug}
            </Link>
            <div className="text-sm text-neutral-600">{p.meta.date}</div>

            {p.meta.excerpt && (
              <p className="mt-2 text-neutral-800">{p.meta.excerpt}</p>
            )}

            {p.meta.tags && p.meta.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {p.meta.tags.map((t) => (
                  <span key={t} className="text-xs rounded-full border px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
