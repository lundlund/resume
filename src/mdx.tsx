import { MDXProvider } from '@mdx-js/react'
const components = {
  h1: (p:any) => <h1 className="text-3xl md:text-4xl font-semibold mb-4" {...p} />,
  p:  (p:any) => <p className="leading-7 mb-4" {...p} />,
  a:  (p:any) => <a className="underline hover:opacity-80" {...p} />
}
export function MdxWrapper({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
