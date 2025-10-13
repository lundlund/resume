// src/components/Topbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullScreenMenu from "./FullScreenMenu"; // justér stien hvis filen ligger et andet sted

export default function Topbar() {
  const [open, setOpen] = useState(false);

  // Returnér fokus til burger-knap når menuen lukkes
  useEffect(() => {
    if (!open) (document.getElementById("burger-btn") as HTMLButtonElement | null)?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl h-16 flex items-center justify-between px-4">
        {/* Brand / logo */}
        <Link to="/" className="font-semibold tracking-tight">
          MitBrand
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/projects" className="text-black/70 hover:text-black">
            Projekter
          </Link>
          <Link to="/about" className="text-black/70 hover:text-black">
            Om mig
          </Link>
          <Link to="/contact" className="text-black/70 hover:text-black">
            Kontakt
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          id="burger-btn"
          aria-label="Åbn menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300"
        >
          <span className="sr-only">Åbn menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-black" />
            <span className="block h-0.5 w-5 bg-black" />
            <span className="block h-0.5 w-5 bg-black" />
          </div>
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
