import React from 'react'
import clsx from 'clsx'

type Props = React.PropsWithChildren<{ className?: string }>
export default function Card({className, children}:Props){
  return <div className={clsx('card', className)}>{children}</div>
}
