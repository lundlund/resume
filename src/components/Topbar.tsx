import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Topbar(){
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/5">
      <div className="container-xl h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight">Dit Navn</Link>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/projects" className="text-sm hover:opacity-70">Projekter</NavLink>
          <NavLink to="/about" className="text-sm hover:opacity-70">Om</NavLink>
          <NavLink to="/contact" className="text-sm hover:opacity-70">Kontakt</NavLink>
          <a className="btn btn-primary" href="/contact">Book et møde</a>
        </nav>
      </div>
    </header>
  )
}
