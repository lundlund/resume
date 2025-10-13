import React from 'react'
import clsx from 'clsx'

type Variant = 'primary'|'ghost'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  as?: 'button'|'a'
  href?: string
}

export default function Button({variant='primary', as='button', href, className, children, ...rest}:Props){
  const cls = clsx('btn', variant==='primary' ? 'btn-primary' : 'btn-ghost', className)
  if (as==='a' && href) return <a className={cls} href={href}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}
