'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetIso: string
  label?: string
}

export function Countdown({ targetIso, label = 'Falta para la experiencia' }: CountdownProps) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = now === null ? 0 : Math.max(0, target - now)
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)

  const pad = (n: number) => n.toString().padStart(2, '0')
  const ready = now !== null

  return (
    <div className="border-t border-champagne/20 pt-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-mutedc mb-3">
        {label}
      </div>
      <div className="grid grid-cols-4 gap-2 text-center" suppressHydrationWarning>
        <Cell value={ready ? pad(days) : '00'} label="días" />
        <Cell value={ready ? pad(hours) : '00'} label="horas" />
        <Cell value={ready ? pad(minutes) : '00'} label="min" />
        <Cell value={ready ? pad(seconds) : '00'} label="seg" highlight />
      </div>
    </div>
  )
}

function Cell({
  value,
  label,
  highlight,
}: {
  value: string
  label: string
  highlight?: boolean
}) {
  return (
    <div>
      <div
        className={`font-display text-2xl sm:text-3xl ${
          highlight ? 'text-electric' : 'text-cream'
        }`}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-mutedc mt-1">{label}</div>
    </div>
  )
}
