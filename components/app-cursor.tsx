"use client"

import { useEffect, useState } from "react"
import { Cursor as InvertedCursor } from "@/components/ui/inverted-cursor"

export function AppCursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const compute = () => setEnabled(finePointer.matches && !reducedMotion.matches)

    compute()
    finePointer.addEventListener("change", compute)
    reducedMotion.addEventListener("change", compute)

    return () => {
      finePointer.removeEventListener("change", compute)
      reducedMotion.removeEventListener("change", compute)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (enabled) {
      root.classList.add("smooth-cursor-enabled")
      return () => {
        root.classList.remove("smooth-cursor-enabled")
      }
    }

    root.classList.remove("smooth-cursor-enabled")
  }, [enabled])

  if (!enabled) return null

  return <InvertedCursor />
}
