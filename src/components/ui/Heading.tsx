import React from 'react'
import clsx from 'clsx'

type Size = 'xl'|'lg'|'md'
type Props = { size?: Size; className?: string; children: React.ReactNode }
export default function Heading({size='lg', className, children}:Props){
  const base = { xl:'heading-xl', lg:'heading-lg', md:'heading-md' }[size]
  return <h2 className={clsx(base, className)}>{children}</h2>
}
