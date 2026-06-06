"use client"

import { useEffect, useRef, useState } from "react"

export function useSmoothValue(
  target: number,
  smoothing = 0.1
) {
  const [value, setValue] = useState(target)

  const animationFrame = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      setValue((prev) => {
        const diff = target - prev

        // Stop tiny micro-jitters
        if (Math.abs(diff) < 0.01) {
          return target
        }

        return prev + diff * smoothing
      })

      animationFrame.current =
        requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame.current)
    }
  }, [target, smoothing])

  return value
}