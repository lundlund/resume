import { useParams, Link } from "react-router-dom"
import { MdxWrapper } from "@/mdx"

type Meta = {
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  ogImage?: string
  draft?: boolean
  slug?: string
}

const defaultMeta: Meta = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: [],
}

const modules = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<
  string,
  { default: React.ComponentType; meta?: Partial<Meta> }
>

// Slå op-tabel: slug -> { Component, meta }
const map: Record<
  string,
  { Component: React.ComponentType; meta: Meta }
> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const slug = path.split("/").pop()!.replace(".mdx", "")
    const meta: Meta = { ...defaultMeta, ...(mod.meta || {}), slug }
    return [slug, { Component: mod.default, meta }]
  })
)

export default function Post() {
  const { slug } = useParams()
  const data = slug ? map[slug] : null

  if (!data || data.meta.draft) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>Indlægget findes ikke.</p>
        <Link to="/blog" className="underline">← Tilbage til blog</Link>
      </main>
    )
  }

  const { Component, meta } = data

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">{meta.title || slug}</h1>
          <div className="text-sm text-neutral-600">{meta.date}</div>
          {meta.excerpt && (
            <p className="mt-2 text-neutral-800">{meta.excerpt}</p>
          )}
          {meta.tags && meta.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span key={t} className="text-xs rounded-full border px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        <MdxWrapper>
          <Component />
        </MdxWrapper>
      </article>

      <div className="mt-10">
        <Link to="/blog" className="underline">← Alle indlæg</Link>
      </div>
    </main>
  )
}
