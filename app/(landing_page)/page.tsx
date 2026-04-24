import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { TryItNowSection } from "@/components/try-it-now-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"

const logos = [
  { src: "/marquee/anthropic.svg", alt: "anthropic", monochrome: true },
  { src: "/marquee/bfl.svg", alt: "bfl", monochrome: true },
  { src: "/marquee/claude-color.svg", alt: "claude color", monochrome: false },
  { src: "/marquee/deepseek-color.svg", alt: "deepseek color", monochrome: false },
  { src: "/marquee/gemini-color.svg", alt: "gemini color", monochrome: false },
  { src: "/marquee/gemma-color.svg", alt: "gemma color", monochrome: false },
  { src: "/marquee/groq.svg", alt: "groq", monochrome: true },
  { src: "/marquee/kimi.svg", alt: "kimi", monochrome: true },
  { src: "/marquee/longcat-color.svg", alt: "longcat color", monochrome: false },
  { src: "/marquee/meta-color.svg", alt: "meta color", monochrome: false },
  { src: "/marquee/mistral-color.svg", alt: "mistral color", monochrome: false },
  { src: "/marquee/moonshot.svg", alt: "moonshot", monochrome: true },
  { src: "/marquee/openai.svg", alt: "openai", monochrome: true },
  { src: "/marquee/openrouter.svg", alt: "openrouter", monochrome: true },
  { src: "/marquee/qwen-color.svg", alt: "qwen color", monochrome: false },
  { src: "/marquee/xai.svg", alt: "xai", monochrome: true },
  { src: "/marquee/zai.svg", alt: "zai", monochrome: true },
].sort((a, b) => a.alt.localeCompare(b.alt))

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0" aria-hidden="true" />


      <div className="relative z-10">
        <HeroSection />
        <SignalsSection logos={logos} />
        <WorkSection />
        <TryItNowSection />
        <PrinciplesSection />
        <ColophonSection />
      </div>
    </main>
  )
}
