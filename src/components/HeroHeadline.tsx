import React from 'react'
import Highlighter from '@/components/Highlighter'

export default function HeroHeadline(){
  return (
    <h1 className="heading-xl font-sans">
      Creating <em className="not-italic font-medium italic"><Highlighter>value</Highlighter></em> across<br/>
      <em className="not-italic font-medium italic">artificial</em><br/>
      intelligence <em className="not-italic font-medium italic">and</em> <strong className="font-extrabold"></strong><br/>
      true <Highlighter>customer</Highlighter> experience.
    </h1>
  )
}
