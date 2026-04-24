"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Loader2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type VoteType = "A" | "B" | "Tie" | "Neither" | null

export function TryItNowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [results, setResults] = useState<{
    modelA: { name: string; response: string }
    modelB: { name: string; response: string }
  } | null>(null)
  
  const [vote, setVote] = useState<VoteType>(null)

  const handleBattle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    setHasStarted(true)
    setIsLoading(true)
    setVote(null)
    setResults(null)
    setError(null)

    try {
      const res = await fetch('/api/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response.")
      }
      
      setResults(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="try-it-now"
      className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center min-h-screen"
    >
      <div ref={contentRef} className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-accent/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            § 04 — Try It Now
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6 text-center montserrat-editorial">
          Prompt once. <em className="text-accent font-medium italic">See both.</em>
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-xs md:text-sm text-muted-foreground text-center max-w-xl mb-16 leading-relaxed">
          Type any question and watch two models respond in real time. Vote for the winner.
        </p>

        {/* Interactive Box */}
        <div className="w-full border border-border/30 bg-card/30 backdrop-blur-sm flex flex-col">
          
          {/* Top Bar / Input */}
          <form className="flex flex-col md:flex-row border-b border-border/30" onSubmit={handleBattle}>
            <div className="flex-1 flex items-center px-6 py-4">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your query..."
                className="w-full bg-transparent font-mono text-sm md:text-base outline-none text-foreground placeholder:text-muted-foreground/50"
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !prompt.trim()} 
              className={cn(
                "bg-accent text-accent-foreground font-mono text-xs md:text-sm uppercase tracking-widest px-8 py-4 md:py-0 md:border-l border-border/30 hover:bg-accent-hover transition-colors flex items-center justify-center gap-2",
                (isLoading || !prompt.trim()) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> BATTLING</>
              ) : (
                <>BATTLE &rarr;</>
              )}
            </button>
          </form>

          {/* Prompt Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* Column A */}
            <div className={cn("p-6 md:p-8 flex flex-col gap-6", vote === 'A' && "bg-accent/5")}>
              <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                {vote ? `MODEL A — ${results?.modelA.name}` : "MODEL A — HIDDEN"}
              </span>
              
              {!hasStarted ? (
                 <div className="font-mono text-xs md:text-sm leading-loose text-foreground/50 italic py-4">
                   Awaiting prompt to generate response...
                 </div>
              ) : isLoading ? (
                 <div className="font-mono text-xs md:text-sm leading-loose text-accent animate-pulse py-4">
                   Generating response...
                 </div>
              ) : error ? (
                 <div className="font-mono text-xs md:text-sm text-destructive py-4">
                   {error}
                 </div>
              ) : (
                 <div className="font-mono text-xs md:text-sm leading-loose text-foreground/90 whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {results?.modelA.response}
                 </div>
              )}
            </div>
            
            {/* Column B */}
            <div className={cn("p-6 md:p-8 flex flex-col gap-6", vote === 'B' && "bg-accent/5")}>
              <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                {vote ? `MODEL B — ${results?.modelB.name}` : "MODEL B — HIDDEN"}
              </span>
              
              {!hasStarted ? (
                 <div className="font-mono text-xs md:text-sm leading-loose text-foreground/50 italic py-4">
                   Awaiting prompt to generate response...
                 </div>
              ) : isLoading ? (
                 <div className="font-mono text-xs md:text-sm leading-loose text-accent animate-pulse py-4">
                   Generating response...
                 </div>
              ) : error ? (
                 <div className="font-mono text-xs md:text-sm text-destructive py-4">
                   {error}
                 </div>
              ) : (
                 <div className="font-mono text-xs md:text-sm leading-loose text-foreground/90 whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {results?.modelB.response}
                 </div>
              )}
            </div>
          </div>

          {/* Voting Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/30 border-t border-border/30">
            <button 
              onClick={() => setVote('A')} 
              disabled={isLoading || !results || vote !== null}
              className={cn("p-4 md:p-6 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2", 
                vote === 'A' ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-accent hover:bg-accent/5",
                (isLoading || !results || (vote !== null && vote !== 'A')) && "opacity-50 cursor-not-allowed hover:text-foreground/70 hover:bg-transparent"
              )}
            >
              &larr; VOTE A
            </button>

            <button 
              onClick={() => setVote('Tie')} 
              disabled={isLoading || !results || vote !== null}
              className={cn("p-4 md:p-6 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center justify-center", 
                vote === 'Tie' ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-accent hover:bg-accent/5",
                (isLoading || !results || (vote !== null && vote !== 'Tie')) && "opacity-50 cursor-not-allowed hover:text-foreground/70 hover:bg-transparent"
              )}
            >
              TIE
            </button>

            <button 
              onClick={() => setVote('Neither')} 
              disabled={isLoading || !results || vote !== null}
              className={cn("p-4 md:p-6 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center justify-center", 
                vote === 'Neither' ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-accent hover:bg-accent/5",
                (isLoading || !results || (vote !== null && vote !== 'Neither')) && "opacity-50 cursor-not-allowed hover:text-foreground/70 hover:bg-transparent"
              )}
            >
              BOTH ARE BAD
            </button>

            <button 
              onClick={() => setVote('B')} 
              disabled={isLoading || !results || vote !== null}
              className={cn("p-4 md:p-6 font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2", 
                vote === 'B' ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-accent hover:bg-accent/5",
                (isLoading || !results || (vote !== null && vote !== 'B')) && "opacity-50 cursor-not-allowed hover:text-foreground/70 hover:bg-transparent"
              )}
            >
              VOTE B &rarr;
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
