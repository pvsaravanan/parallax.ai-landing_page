"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Magnetic } from "@/components/ui/magnetic"

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "signals", label: "Modes" },
  { id: "work", label: "Rankings" },
  { id: "principles", label: "Method" },
  { id: "colophon", label: "Links" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-background/90 backdrop-blur-sm border-b border-border/30">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">PARALLAX.AI</span>
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-1 group"
        >
          <span className={cn("block h-[1.5px] w-5 bg-foreground transition-all duration-300", mobileOpen && "rotate-45 translate-y-[6.5px]")} />
          <span className={cn("block h-[1.5px] w-5 bg-foreground transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block h-[1.5px] w-5 bg-foreground transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[6.5px]")} />
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 flex flex-col bg-background/97 backdrop-blur-md pt-16 px-8 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "text-left font-[var(--font-bebas)] text-4xl tracking-tight transition-colors duration-200",
                activeSection === id ? "text-accent" : "text-foreground/60 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto mb-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-border/40 px-3 py-2"
          >
            {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
          </button>
        </div>
      </div>

      {/* ── Desktop side nav ── */}
      <nav
        onMouseEnter={() => document.documentElement.classList.add("hide-custom-cursor")}
        onMouseLeave={() => document.documentElement.classList.remove("hide-custom-cursor")}
        className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6 px-4">
          {navItems.map(({ id, label }) => (
            <Magnetic key={id} strength={0.4}>
              <button onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                    activeSection === id ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </button>
            </Magnetic>
          ))}

          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group relative flex items-center gap-3"
            >
              <span className={cn("h-1.5 w-1.5 rounded-full transition-all duration-300", "bg-muted-foreground/40 group-hover:bg-foreground/60")} />
              <span className="absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap text-muted-foreground">
                {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
              </span>
            </button>
          </Magnetic>
        </div>
      </nav>
    </>
  )
}
