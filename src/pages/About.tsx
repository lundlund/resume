import React from 'react'
import Section from '@/components/ui/Section'
import Heading from '@/components/ui/Heading'
import Card from '@/components/ui/Card'

export default function About(){
  return (
    <main>
      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Heading size="lg">Om mig</Heading>
          </div>
          <div className="lg:col-span-2">
            <p className="text-muted leading-relaxed">
              Jeg er en multidisciplinær designer/udvikler med fokus på simple, stærke brugeroplevelser.
              Projekter fra corporate identitet til komplekse webapps - altid med sans for detaljer, typografi og performance.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-medium">Kompetencer</h3>
                <ul className="mt-3 text-sm space-y-1 list-disc pl-5">
                  <li>UI/UX og design systemer</li>
                  <li>React, TypeScript, Tailwind</li>
                  <li>Performance & tilgængelighed</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-medium">Værktøjer</h3>
                <ul className="mt-3 text-sm space-y-1 list-disc pl-5">
                  <li>Figma, Adobe CC</li>
                  <li>Vite, Framer Motion</li>
                  <li>Netlify, Vercel</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
