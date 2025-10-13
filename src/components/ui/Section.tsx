import React from 'react'
import clsx from 'clsx'

type Props = React.PropsWithChildren<{ className?: string, id?: string, divider?: boolean }>
export default function Section({className, children, id, divider}:Props){
  return (
    <section id={id} className={clsx('section', divider && 'divider', className)}>
      <div className="container-xl">{children}</div>
    </section>
  )
}
