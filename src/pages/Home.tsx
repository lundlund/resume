import React from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import HeroHeadline from '@/components/HeroHeadline'

export default function Home(){
  return (
    <main>
      <Section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <HeroHeadline />
            <div className="mt-8 flex gap-3">
              <Button as="a" href="/blog">Se blog</Button>
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

      
    </main>
  )
}
