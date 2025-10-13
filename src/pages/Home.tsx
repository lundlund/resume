import React from 'react'
import Section from '@/components/ui/Section'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import HeroHeadline from '@/components/HeroHeadline'
import { projects } from '@/data/projects'

export default function Home(){
  return (
    <main>
      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <HeroHeadline />
            <div className="mt-8 flex gap-3">
              <Button as="a" href="/projects">Se projekter</Button>
              <Button as="a" variant="ghost" href="/contact">Kontakt</Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/3] rounded-2xl overflow-hidden border border-black/5 bg-[#ddd]">
              <img
                src="/img/lundimg2.jpg"
                alt="Portraet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section divider>
        <div className="flex items-end justify-between mb-6">
          <Heading size="md">Udvalgte projekter</Heading>
          <a href="/projects" className="underline underline-offset-4">Se alle</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0,6).map((p)=>(
            <a key={p.id} href={p.url ?? '/projects'} className="group">
              <Card>
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-medium">{p.title}</h3>
                  <span aria-hidden>↗</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Section>
    </main>
  )
}
