import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Topbar } from '@/components/Topbar'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import { Footer } from '@/components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}
