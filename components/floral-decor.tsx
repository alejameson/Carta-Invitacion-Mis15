import React from "react"

type CornerProps = {
  className?: string
  position: "tl" | "tr" | "bl" | "br"
}

/**
 * Esquina floral: racimo denso de flores lilas y hojas para anclar a las
 * esquinas de cada sección. Se posiciona en (0,0) de la esquina indicada y
 * se voltea automáticamente para que el ramo "crezca" hacia adentro.
 */
export function LilacCorner({ className = "", position }: CornerProps) {
  const transform = {
    tl: "scale(1, 1)",
    tr: "scale(-1, 1)",
    bl: "scale(1, -1)",
    br: "scale(-1, -1)",
  }[position]

  const positionClass = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  }[position]

  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${positionClass} ${className}`}
      style={{ transform }}
      aria-hidden="true"
    >
      {/* Ramas */}
      <path
        d="M0 0 Q 60 30 90 80 Q 110 130 90 180"
        stroke="oklch(0.55 0.10 145)"
        strokeWidth="1.6"
        opacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M0 0 Q 40 60 80 90 Q 130 110 180 90"
        stroke="oklch(0.55 0.10 145)"
        strokeWidth="1.6"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M0 0 Q 30 40 70 50"
        stroke="oklch(0.55 0.10 145)"
        strokeWidth="1.2"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Hojas */}
      <Leaf cx={50} cy={45} rotate={20} scale={1.1} />
      <Leaf cx={75} cy={75} rotate={50} scale={1} />
      <Leaf cx={45} cy={90} rotate={-10} scale={1} />
      <Leaf cx={95} cy={120} rotate={70} scale={1.1} />
      <Leaf cx={120} cy={70} rotate={30} scale={0.9} />
      <Leaf cx={150} cy={90} rotate={45} scale={1} />
      <Leaf cx={70} cy={130} rotate={-25} scale={1} />
      <Leaf cx={90} cy={170} rotate={75} scale={0.95} />

      {/* Racimos de flores */}
      <Cluster cx={20} cy={20} scale={1.2} />
      <Cluster cx={70} cy={40} scale={1.05} />
      <Cluster cx={45} cy={70} scale={1.15} />
      <Cluster cx={100} cy={55} scale={1} />
      <Cluster cx={130} cy={95} scale={1.1} />
      <Cluster cx={75} cy={110} scale={1} />
      <Cluster cx={155} cy={70} scale={0.95} />
      <Cluster cx={50} cy={140} scale={1.05} />
      <Cluster cx={110} cy={150} scale={1.1} />
      <Cluster cx={85} cy={185} scale={1} />
      <Cluster cx={170} cy={120} scale={0.9} />
      <Cluster cx={30} cy={170} scale={0.85} />
    </svg>
  )
}

type BranchProps = {
  className?: string
  flipped?: boolean
}

/** Rama horizontal de lilas para márgenes laterales (full height de sección) */
export function LilacBranch({ className = "", flipped = false }: BranchProps) {
  return (
    <svg
      viewBox="0 0 100 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M50 600 Q 30 500 55 400 Q 80 300 40 200 Q 20 100 60 0"
        stroke="oklch(0.55 0.10 145)"
        strokeWidth="1.6"
        opacity="0.55"
        strokeLinecap="round"
      />
      {/* Hojas */}
      <Leaf cx={40} cy={540} rotate={-30} scale={1} />
      <Leaf cx={68} cy={470} rotate={35} scale={1} />
      <Leaf cx={42} cy={400} rotate={-20} scale={0.95} />
      <Leaf cx={75} cy={330} rotate={45} scale={1.05} />
      <Leaf cx={35} cy={260} rotate={-35} scale={1} />
      <Leaf cx={70} cy={190} rotate={40} scale={0.95} />
      <Leaf cx={30} cy={120} rotate={-25} scale={1} />
      <Leaf cx={68} cy={55} rotate={50} scale={1} />

      {/* Racimos */}
      <Cluster cx={20} cy={560} scale={1.05} />
      <Cluster cx={70} cy={500} scale={0.95} />
      <Cluster cx={25} cy={440} scale={1.1} />
      <Cluster cx={80} cy={370} scale={1} />
      <Cluster cx={18} cy={300} scale={1.05} />
      <Cluster cx={75} cy={230} scale={1} />
      <Cluster cx={22} cy={160} scale={1.1} />
      <Cluster cx={70} cy={90} scale={0.95} />
      <Cluster cx={35} cy={25} scale={1} />
    </svg>
  )
}

/** Pétalos cayendo animados (decoración ambiente) */
export function FallingPetals({ className = "", count = 8 }: { className?: string; count?: number }) {
  const petals = Array.from({ length: count }).map((_, i) => {
    const left = (i * 97) % 100
    const delay = (i * 0.7) % 6
    const duration = 9 + ((i * 1.3) % 6)
    const size = 10 + ((i * 5) % 10)
    const tones = ["oklch(0.78 0.10 305)", "oklch(0.68 0.13 305)", "oklch(0.85 0.07 305)"]
    const fill = tones[i % tones.length]
    return { left, delay, duration, size, fill, key: i }
  })

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute -top-6 animate-petal-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <ellipse cx="10" cy="10" rx="9" ry="5" fill={p.fill} opacity="0.65" transform="rotate(35 10 10)" />
          </svg>
        </span>
      ))}
    </div>
  )
}

/** Mariposa decorativa pequeña */
export function Butterfly({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g>
        {/* Ala superior izquierda */}
        <path
          d="M30 25 Q 10 5 5 18 Q 0 30 18 30 Q 26 30 30 25 Z"
          fill="oklch(0.72 0.13 305)"
          opacity="0.85"
        />
        {/* Ala inferior izquierda */}
        <path
          d="M30 25 Q 12 38 8 45 Q 22 48 30 30 Z"
          fill="oklch(0.62 0.15 305)"
          opacity="0.85"
        />
        {/* Ala superior derecha */}
        <path
          d="M30 25 Q 50 5 55 18 Q 60 30 42 30 Q 34 30 30 25 Z"
          fill="oklch(0.72 0.13 305)"
          opacity="0.85"
        />
        {/* Ala inferior derecha */}
        <path
          d="M30 25 Q 48 38 52 45 Q 38 48 30 30 Z"
          fill="oklch(0.62 0.15 305)"
          opacity="0.85"
        />
        {/* Detalles en alas */}
        <circle cx="14" cy="20" r="2" fill="oklch(0.92 0.04 95)" opacity="0.9" />
        <circle cx="46" cy="20" r="2" fill="oklch(0.92 0.04 95)" opacity="0.9" />
        <circle cx="18" cy="38" r="1.4" fill="oklch(0.92 0.04 95)" opacity="0.9" />
        <circle cx="42" cy="38" r="1.4" fill="oklch(0.92 0.04 95)" opacity="0.9" />
        {/* Cuerpo */}
        <ellipse cx="30" cy="27" rx="1.6" ry="11" fill="oklch(0.30 0.05 305)" />
        {/* Antenas */}
        <path
          d="M30 18 Q 27 10 23 8"
          stroke="oklch(0.30 0.05 305)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 18 Q 33 10 37 8"
          stroke="oklch(0.30 0.05 305)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

/** Pequeños puntos decorativos (estrellas/destellos) */
export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {[
        { x: 20, y: 30, s: 1 },
        { x: 60, y: 80, s: 0.7 },
        { x: 120, y: 40, s: 1.2 },
        { x: 170, y: 90, s: 0.8 },
        { x: 90, y: 130, s: 1 },
        { x: 150, y: 160, s: 0.9 },
        { x: 30, y: 170, s: 1.1 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <path
            d="M0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
            fill="oklch(0.78 0.10 85)"
            opacity="0.7"
          />
        </g>
      ))}
    </svg>
  )
}

/* ====== piezas internas ====== */

function Leaf({
  cx,
  cy,
  rotate,
  scale = 1,
}: {
  cx: number
  cy: number
  rotate: number
  scale?: number
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 Q 12 -8 28 -2 Q 16 8 0 0 Z"
        fill="oklch(0.62 0.11 145)"
        opacity="0.65"
      />
      <path
        d="M0 0 Q 14 -4 28 -2"
        stroke="oklch(0.45 0.09 145)"
        strokeWidth="0.6"
        opacity="0.7"
      />
    </g>
  )
}

function Cluster({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const positions: { x: number; y: number; r: number; tone: number }[] = [
    { x: 0, y: 0, r: 7, tone: 0 },
    { x: -10, y: -6, r: 6, tone: 1 },
    { x: 10, y: -7, r: 6, tone: 2 },
    { x: -6, y: 8, r: 5.5, tone: 1 },
    { x: 9, y: 6, r: 5.5, tone: 0 },
    { x: 0, y: -12, r: 5, tone: 2 },
  ]

  const tones = [
    "oklch(0.78 0.10 305)",
    "oklch(0.68 0.13 305)",
    "oklch(0.58 0.15 305)",
  ]

  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {positions.map((p, i) => (
        <Flower key={i} x={p.x} y={p.y} r={p.r} fill={tones[p.tone]} />
      ))}
    </g>
  )
}

function Flower({
  x,
  y,
  r,
  fill,
}: {
  x: number
  y: number
  r: number
  fill: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={-r * 0.55} rx={r * 0.5} ry={r * 0.7} fill={fill} opacity="0.88" />
      <ellipse cx={0} cy={r * 0.55} rx={r * 0.5} ry={r * 0.7} fill={fill} opacity="0.88" />
      <ellipse cx={-r * 0.55} cy={0} rx={r * 0.7} ry={r * 0.5} fill={fill} opacity="0.88" />
      <ellipse cx={r * 0.55} cy={0} rx={r * 0.7} ry={r * 0.5} fill={fill} opacity="0.88" />
      <circle cx={0} cy={0} r={r * 0.35} fill="oklch(0.92 0.04 95)" />
      <circle cx={0} cy={0} r={r * 0.15} fill="oklch(0.65 0.13 65)" opacity="0.7" />
    </g>
  )
}
