"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 0.8,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 60%",

            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const evaluationModes = [
    { name: "Battle", desc: "Anonymous comparison" },
    { name: "Side-by-side", desc: "Controlled eval" },
    { name: "Direct Chat", desc: "Single model" },
    { name: "Chat Interface", desc: "Interactive demo" },
  ]

  const resources = [
    { name: "Methodology", section: "principles", desc: "How we evaluate" },
    { name: "Evaluation Modes", section: "signals", desc: "Evaluation modes" },
  ]

  const connect = [
    { name: "GitHub", href: "https://github.com/pvsaravanan/parallax.ai", desc: "Source code" },
    { name: "Email", href: "mailto:hello@parallax.ai", desc: "Get in touch" },
  ]

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-24 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,lab(63.7311%_54.8773_72.7088)_0%,transparent_70%)] blur-3xl opacity-80 z-0"
      />



      <div className="relative z-10">
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Navigate</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">EXPLORE</h2>
          <p className="mt-4 max-w-xl font-mono text-sm text-muted-foreground">
            Start evaluating models. Compare responses. Build rankings.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="col-span-1">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Evaluation Modes</h4>
            <ul className="space-y-3">
              {evaluationModes.map((mode) => (
                <li key={mode.name}>
                  <span className="flex items-center justify-between font-mono text-sm text-foreground/50 cursor-default">
                    <span>{mode.name}</span>
                  </span>
                  <span className="block font-mono text-[10px] text-muted-foreground mt-1">{mode.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" })}
                    className="group flex items-center justify-between w-full font-mono text-sm text-foreground/90 hover:text-accent transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </button>
                  <span className="block font-mono text-[10px] text-muted-foreground mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-6">Connect</h4>
            <ul className="space-y-3">
              {connect.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group flex items-center justify-between font-mono text-sm text-foreground/90 hover:text-accent transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                  <span className="block font-mono text-[10px] text-muted-foreground mt-1">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          ref={footerRef}
          className="mt-20 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            2026 Parallax.ai — Human preference evaluation for LLMs
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            Built for fairness, reproducibility, and extensibility
          </p>
        </div>
      </div>
    </section>
  )
}