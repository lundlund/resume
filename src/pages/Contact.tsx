import React from 'react'
import Section from '@/components/ui/Section'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function Contact(){
  return (
    <main>
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Heading size="lg">Kontakt</Heading>
            <p className="mt-3 text-muted">Fortæl kort om dit projekt - jeg svarer typisk inden for 1-2 hverdage.</p>
            <div className="mt-6 space-y-2 text-sm">
              <div><strong>E-mail:</strong> din@mail.dk</div>
              <div><strong>LinkedIn:</strong> linkedin.com/in/dinprofil</div>
              <div><strong>Telefon:</strong> +45 12 34 56 78</div>
            </div>
          </div>
          <Card className="p-6 grid gap-4">
            <input className="h-11 rounded-lg px-3 border border-black/10" placeholder="Navn" />
            <input className="h-11 rounded-lg px-3 border border-black/10" placeholder="E-mail" />
            <textarea className="min-h-[120px] rounded-lg px-3 py-2 border border-black/10" placeholder="Projektbeskrivelse" />
            <Button className="justify-self-start">Send</Button>
          </Card>
        </div>
      </Section>
    </main>
  )
}
