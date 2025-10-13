// src/App.tsx
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Topbar from '@/components/Topbar'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import Post from '@/pages/Post'

// Hvis din Footer er default-export:
import {Footer} from '@/components/Footer'
// Hvis din Footer i stedet er named export, så brug denne og slet linjen ovenfor:
// import { Footer } from '@/components/Footer'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Topbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />

          {/* 404 fallback (valgfrit) */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
