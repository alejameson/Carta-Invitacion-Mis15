"use client"

import { useEffect, useRef, useState } from "react"

type Stage = "sealed" | "opening" | "letter-up" | "expanding" | "done"

type IntroGateProps = {
  children: React.ReactNode
  /** Guest name to display in the intro, e.g. "Melba Pertuz" */
  guestName?: string
  /** "tienes" or "tienen" */
  introVerb?: string
  /** "Estás invitada a" / "Estás invitado a" / "Están invitados a" */
  inviteLabel?: string
}

export function IntroGate({ children, guestName, introVerb, inviteLabel }: IntroGateProps) {
  const [stage, setStage] = useState<Stage>("sealed")
  const [flapBehind, setFlapBehind] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Lock scroll while overlay is visible
  useEffect(() => {
    if (stage !== "done") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [stage])

  function handleOpen() {
    if (stage !== "sealed") return
    setStage("opening")

    // 1. Wax seal breaks (0–700ms)
    // 2. Flap opens (500ms–1700ms)
    // 3. Letter rises out of envelope (950ms–2250ms)
    // 4. Letter expands to fill screen (2400ms–3200ms)
    // 5. Content fades in behind, overlay removed (3200ms+)
    window.setTimeout(() => setFlapBehind(true), 1100)
    window.setTimeout(() => setStage("letter-up"), 2350)
    window.setTimeout(() => setStage("expanding"), 2400)
    window.setTimeout(() => setStage("done"), 3400)
  }

  const isDone = stage === "done"
  const isExpanding = stage === "expanding" || isDone
  const isLetterUp = stage === "letter-up" || isExpanding || isDone

  return (
    <>
      {/* ── Main content — revealed underneath ─────────────────── */}
      <div
        className={`transition-[opacity,transform] duration-[900ms] ease-out ${
          isExpanding
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-[0.98] pointer-events-none"
        }`}
        style={{ transitionDelay: isExpanding ? "600ms" : "0ms" }}
      >
        {children}
      </div>

      {/* ── Intro overlay ───────────────────────────────────────── */}
      {!isDone && (
        <div
          ref={overlayRef}
          aria-hidden={isExpanding}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${
            isExpanding
              ? "pointer-events-none transition-opacity duration-[900ms] ease-in-out opacity-0"
              : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 120% 90% at 50% 20%, oklch(0.95 0.04 315) 0%, oklch(0.84 0.09 312) 38%, oklch(0.60 0.15 307) 75%, oklch(0.40 0.16 303) 100%)",
          }}
        >
          {/* Ambient petals */}
          <IntroPetals />

          {/* Decorative corner flourishes */}
          <IntroCorner position="tl" />
          <IntroCorner position="tr" />
          <IntroCorner position="bl" />
          <IntroCorner position="br" />

          {/* Soft radial glow behind envelope */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.32) 0%, rgba(255,240,255,0.12) 45%, transparent 72%)",
            }}
          />

          {/* ── Letter + Envelope scene ── */}
          <div className="relative flex flex-col items-center px-6">

            {/* Pre-title text */}
            <p className={`text-center mb-3 font-display text-[0.7rem] sm:text-[0.8rem] font-bold tracking-[0.35em] uppercase text-white transition-opacity duration-500 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${stage === "sealed" ? "opacity-100" : "opacity-0"}`}>
              {guestName
                ? <>{guestName}, {introVerb || "tienes"} una invitación especial</>
                : "Tienes una invitación especial"
              }
            </p>

            {/* Name in script */}
            <p className={`font-script leading-none text-white drop-shadow-[0_6px_16px_rgba(40,10,70,0.55)] transition-all duration-700 ${isLetterUp ? "mb-0 text-4xl sm:text-5xl opacity-0 -translate-y-4" : "mb-8 text-5xl sm:text-6xl opacity-100 translate-y-0"}`}>
              Melany
            </p>

            {/* Envelope button */}
            <button
              type="button"
              onClick={handleOpen}
              aria-label="Abrir invitación"
              disabled={stage !== "sealed"}
              className="envelope-stage group relative flex flex-col items-center focus:outline-none"
            >
              <div
                className={`envelope ${stage !== "sealed" ? "is-open" : ""} ${
                  stage === "sealed" ? "envelope-idle" : ""
                }`}
              >
                {/* 1. Envelope back body */}
                <div className="envelope-body" aria-hidden />

                {/* 2. White letter card inside */}
                <div className={`envelope-letter ${isLetterUp ? "letter-revealed" : ""}`}>
                  <div className="text-center">
                    <p className="font-display text-[0.48rem] tracking-[0.5em] uppercase text-primary/75 sm:text-[0.58rem]">
                      {inviteLabel || "Estás invitada a"}
                    </p>
                    <p className="mt-1.5 font-script text-[2.2rem] leading-none text-primary sm:text-[2.7rem]">
                      Mis XV
                    </p>
                    <div className="mx-auto my-2 h-px w-10 bg-primary/35" />
                    <p className="font-display text-[0.48rem] tracking-[0.35em] uppercase text-foreground/65 sm:text-[0.58rem]">
                      14 · Junio · 2026
                    </p>
                  </div>
                </div>

                {/* 3. Front pocket (V shape) */}
                <div className="envelope-pocket" aria-hidden />

                {/* 4. Flap — rotates back on open */}
                <div className="envelope-flap" style={{ zIndex: flapBehind ? 1 : 6 }} aria-hidden>
                  <div className="envelope-flap-bg" style={{ opacity: flapBehind ? 0 : 1 }} />
                  <div className="envelope-flap-inner" style={{ opacity: flapBehind ? 1 : 0 }} />
                  <div className={`wax-seal transition-opacity duration-300 ${flapBehind ? "opacity-0" : "opacity-100"}`}>
                    <span className="wax-seal-letter">M</span>
                  </div>
                </div>
              </div>

              {/* "Tap to open" hint */}
              <span
                className={`mt-7 inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.48em] uppercase text-white/85 transition-all duration-500 sm:text-[0.72rem] ${
                  stage === "sealed" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <span className="h-px w-7 bg-white/50" />
                Toca para abrir
                <span className="h-px w-7 bg-white/50" />
              </span>
            </button>
          </div>

          {/* Bottom tagline */}
          <div
            className={`absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 transition-opacity duration-500 ${stage === "sealed" ? "opacity-100" : "opacity-0"}`}
          >
            <div className="h-px w-20 bg-white/30 mb-2" />
            <p className="font-display text-[0.55rem] tracking-[0.5em] uppercase text-white/60 sm:text-[0.65rem]">
              XV Años · Junio 2026
            </p>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Decorative corner SVG flourish ─────────────────────────── */
function IntroCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const transform = {
    tl: "scale(1,1)",
    tr: "scale(-1,1)",
    bl: "scale(1,-1)",
    br: "scale(-1,-1)",
  }[position]

  const cls = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  }[position]

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={`pointer-events-none absolute ${cls} h-28 w-28 sm:h-36 sm:w-36 opacity-50`}
      style={{ transform }}
      aria-hidden="true"
    >
      <path d="M0 0 Q 50 25 75 70 Q 90 110 70 150" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M0 0 Q 35 50 70 75 Q 110 90 150 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      {[
        [18,18],[48,35],[30,60],[72,52],[58,90],[90,75],[35,100],[80,120],[110,95],
      ].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <ellipse cx={0} cy={-5} rx={3} ry={5} fill="rgba(255,255,255,0.65)" transform="rotate(-15)"/>
          <ellipse cx={0} cy={5} rx={3} ry={5} fill="rgba(255,255,255,0.65)" transform="rotate(15)"/>
          <circle cx={0} cy={0} r={2} fill="rgba(255,230,255,0.9)"/>
        </g>
      ))}
    </svg>
  )
}

/* ── Falling petals ─────────────────────────────────────────── */
function IntroPetals() {
  const petals = Array.from({ length: 18 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((_, i) => {
        const left = (i * 5.7 + 3) % 100
        const delay = (i * 0.5) % 8
        const duration = 8 + (i % 6)
        const size = 7 + (i % 5) * 2.5
        const opacity = 0.4 + (i % 3) * 0.2
        return (
          <span
            key={i}
            className="animate-petal-fall absolute -top-6"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
            }}
          >
            <svg viewBox="0 0 20 20" className="h-full w-full">
              <ellipse cx="10" cy="10" rx="9" ry="5" fill="white" transform="rotate(35 10 10)"/>
            </svg>
          </span>
        )
      })}
    </div>
  )
}
