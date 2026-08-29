"use client"

import { useEffect, useState } from "react"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime()
  const diff = Math.max(0, target.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate)
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTime(getTimeLeft(target))
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const items: { label: string; value: number }[] = [
    { label: "Días", value: time?.days ?? 0 },
    { label: "Horas", value: time?.hours ?? 0 },
    { label: "Minutos", value: time?.minutes ?? 0 },
    { label: "Segundos", value: time?.seconds ?? 0 },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center rounded-lg border border-primary/30 bg-card/70 backdrop-blur-sm py-3 sm:py-5 shadow-sm"
        >
          <span
            className="font-display text-2xl sm:text-4xl text-primary tabular-nums"
            suppressHydrationWarning
          >
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
