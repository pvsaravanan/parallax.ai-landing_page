"use client"

import { useEffect, useRef } from "react"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { Magnetic } from "@/components/ui/magnetic"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pt-16 md:pt-0 pl-6 md:pl-28 pr-6 md:pr-12">


      {/* Left vertical labels */}
      <div className="hidden md:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          PARALLAX.AI
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="PARALLAX" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

       <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
        Human-Preference Evaluation for Open-Source LLMs
      </h2>

      <p className="mt-4 max-w-md comfortaa-hero text-sm text-muted-foreground leading-relaxed">
        Battle anonymous models, chat directly, or compare side-by-side —every vote builds a transparent, real-world leaderboard
      </p>

        {/* Get started terminal prompt */}
        <div className="mt-12 flex items-center gap-6">
          <Magnetic strength={0.2}>
            <button
              onClick={() => document.getElementById("signals")?.scrollIntoView({ behavior: "smooth" })}
              className="glass group relative flex items-center gap-3 border-accent/30 hover:border-accent/70 px-6 py-4 w-full max-w-sm hover:shadow-[0_0_24px_rgba(var(--accent-rgb),0.2)] transition-all duration-500 rounded-sm"
            >
              <span className="font-mono text-sm text-accent font-bold select-none">{">_"}</span>
              <span className="font-mono text-sm text-muted-foreground tracking-wide group-hover:text-foreground transition-colors duration-200">
                Explore modes...
              </span>
              <span className="ml-auto w-2.5 h-5 bg-accent animate-pulse" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Beta / Research Instrument
        </div>
      </div>
    </section>
  )
}
