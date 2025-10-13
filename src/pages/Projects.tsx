import React from 'react'
import Section from '@/components/ui/Section'
import Heading from '@/components/ui/Heading'
import Card from '@/components/ui/Card'
import { projects } from '@/data/projects'

export default function Projects(){
  return (
    <main>
      <Section>
        <Heading size="lg">Projekter</Heading>
        <p className="mt-3 text-muted max-w-prose">Et udvalg af arbejde på tværs af web, brand og produkt.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p)=>(
            <Card key={p.id}>
              <div className="aspect-video overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-[1.02] transition-transform" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-medium">{p.title}</h3>
                <span aria-hidden>↗</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  )
}
