import React from 'react'
import clsx from 'clsx'

type Props = { children: React.ReactNode, className?: string }
export default function Highlighter({ children, className }: Props){
  return (
    <span className={clsx('relative inline-block px-1', className)}>
      <span className="absolute inset-0 translate-y-[6%] rounded-sm bg-accent -z-10"></span>
      <span className="font-extrabold">{children}</span>
    </span>
  )
}
