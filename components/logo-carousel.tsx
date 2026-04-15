"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

export type LogoCarouselItem = {
  src: string
  alt: string
  monochrome?: boolean
}

export function LogoCarousel({
  logos,
  className,
}: {
  logos: LogoCarouselItem[]
  className?: string
}) {
  const safeLogos = useMemo(() => logos.filter((l) => Boolean(l?.src)), [logos])

  if (safeLogos.length === 0) return null

  return (
    <div className={cn("relative w-full", className)}>
      <div className={cn("w-full overflow-hidden", "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]")}>
        <div
          className={cn("flex w-max animate-logo-carousel")}
          style={{ "--duration": "28s" } as React.CSSProperties}
        >
          {[...safeLogos, ...safeLogos].map((logo, idx) => (
            <div key={`${logo.src}-${idx}`} className="mx-12 flex items-center h-16">
              <img
                src={logo.src}
                alt={logo.alt}
                draggable={false}
                loading="eager"
                className={cn(
                  "h-8 md:h-9 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200",
                  logo.monochrome && "dark:invert",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
