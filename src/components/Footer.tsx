import React from 'react'

export function Footer(){
  return (
    <footer className="divider">
      <div className="container-xl h-20 flex items-center justify-between">
        <p className="text-sm text-black/60">© {new Date().getFullYear()} Dit Navn</p>
        <div className="flex gap-4 text-sm">
          <a className="hover:opacity-70" href="/about">Om</a>
          <a className="hover:opacity-70" href="/projects">Projekter</a>
          <a className="hover:opacity-70" href="/contact">Kontakt</a>
        </div>
      </div>
    </footer>
  )
}
