"use client"

import React, { useRef, useState, useEffect } from "react"
import gsap from "gsap"

interface MagneticProps {
  children: React.ReactElement
  strength?: number
  containerRef?: React.RefObject<HTMLElement>
}

export function Magnetic({ children, strength = 0.5, containerRef }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = magneticRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = el.getBoundingClientRect()
      
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const x = (clientX - centerX) * strength
      const y = (clientY - centerY) * strength

      gsap.to(el, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
    }

    const target = containerRef?.current || el
    
    target.addEventListener("mousemove", handleMouseMove as EventListener)
    target.addEventListener("mouseleave", handleMouseLeave as EventListener)

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener)
      target.removeEventListener("mouseleave", handleMouseLeave as EventListener)
    }
  }, [strength, containerRef])

  return (
    <div ref={magneticRef} style={{ display: "contents" }}>
      {React.cloneElement(children)}
    </div>
  )
}
