type Props = {
  className?: string
  flipped?: boolean
}

/**
 * Ramo decorativo de lilas estilizadas.
 * Diseñado para flotar a los lados del contenido.
 */
export function LilacSprig({ className = "", flipped = false }: Props) {
  return (
    <svg
      viewBox="0 0 160 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {/* Tallo principal curvo */}
      <path
        d="M80 470 Q 60 400 75 330 Q 90 260 65 190 Q 45 120 80 50 Q 95 25 90 5"
        stroke="oklch(0.55 0.10 145)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Hojas */}
      <Leaf cx={70} cy={420} rotate={-30} scale={1.1} />
      <Leaf cx={92} cy={360} rotate={30} scale={0.9} />
      <Leaf cx={62} cy={300} rotate={-40} scale={1} />
      <Leaf cx={95} cy={240} rotate={35} scale={1.1} />
      <Leaf cx={55} cy={170} rotate={-25} scale={0.85} />
      <Leaf cx={92} cy={110} rotate={45} scale={1} />
      <Leaf cx={70} cy={55} rotate={-15} scale={0.9} />

      {/* Racimos de flores lilas */}
      <Cluster cx={45} cy={400} scale={1.1} />
      <Cluster cx={105} cy={335} scale={1} />
      <Cluster cx={40} cy={270} scale={1.15} />
      <Cluster cx={110} cy={205} scale={0.95} />
      <Cluster cx={45} cy={140} scale={1.05} />
      <Cluster cx={105} cy={80} scale={1} />
      <Cluster cx={75} cy={20} scale={0.9} />
    </svg>
  )
}

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
        opacity="0.6"
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
  // 5 pequeñas flores agrupadas
  const positions: { x: number; y: number; r: number; tone: number }[] = [
    { x: 0, y: 0, r: 7, tone: 0 },
    { x: -10, y: -6, r: 6, tone: 1 },
    { x: 10, y: -7, r: 6, tone: 2 },
    { x: -6, y: 8, r: 5.5, tone: 1 },
    { x: 9, y: 6, r: 5.5, tone: 0 },
    { x: 0, y: -12, r: 5, tone: 2 },
  ]

  const tones = [
    "oklch(0.78 0.10 305)", // lila pastel
    "oklch(0.68 0.13 305)", // lila medio
    "oklch(0.58 0.15 305)", // lila profundo
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
  // 4 pétalos + centro
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={-r * 0.55} rx={r * 0.5} ry={r * 0.7} fill={fill} opacity="0.85" />
      <ellipse cx={0} cy={r * 0.55} rx={r * 0.5} ry={r * 0.7} fill={fill} opacity="0.85" />
      <ellipse cx={-r * 0.55} cy={0} rx={r * 0.7} ry={r * 0.5} fill={fill} opacity="0.85" />
      <ellipse cx={r * 0.55} cy={0} rx={r * 0.7} ry={r * 0.5} fill={fill} opacity="0.85" />
      <circle cx={0} cy={0} r={r * 0.35} fill="oklch(0.92 0.04 95)" />
      <circle cx={0} cy={0} r={r * 0.15} fill="oklch(0.65 0.13 65)" opacity="0.7" />
    </g>
  )
}
