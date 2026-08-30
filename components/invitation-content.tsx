import Image from "next/image"
import { Countdown } from "@/components/countdown"
import { WhatsappConfirm } from "@/components/whatsapp-confirm"
import { FloralDivider } from "@/components/floral-divider"
import {
  LilacCorner,
  LilacBranch,
  FallingPetals,
  Butterfly,
  Sparkles,
} from "@/components/floral-decor"
import { IntroGate } from "@/components/intro-gate"
import type { Guest } from "@/lib/guests"
import { getGuestStrings } from "@/lib/guests"

const HOST_NAME = "Agos"
const EVENT_DATE_ISO = "2026-09-26T21:30:00-03:00" // Sábado 26 de septiembre de 2026, 9:30 p. m. (Argentina)
const EVENT_LOCATION = "Lavalle Juan (S) 816"
const PARTY_ADDRESS = `${EVENT_LOCATION}, J5402 San Juan, San Juan, Argentina`
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(PARTY_ADDRESS)}&output=embed`
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(PARTY_ADDRESS)}`
const WHATSAPP_PHONE = "542645143219" // +54 264 514 3219
const MAIN_PHOTO_SRC = "/og-preview - copia.jpeg"

// Álbum de fotos administrado únicamente por su dueña.
const PHOTO_FOLDER_URL = "https://photos.app.goo.gl/35W7sGgm4uPtUvqu5"
const PHOTO_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&color=8F3F52&bgcolor=FFF9FA&data=${encodeURIComponent(
  PHOTO_FOLDER_URL,
)}`

type Props = {
  /** When provided, the invitation is personalized for this guest */
  guest?: Guest
}

export function InvitationContent({ guest }: Props) {
  // Derive personalization strings (only used when guest is present)
  const strings = guest ? getGuestStrings(guest) : null

  return (
    <IntroGate
      guestName={guest?.name}
      introVerb={strings?.introVerb}
      inviteLabel={strings?.inviteLabel}
    >
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        {/* Fondo suave */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background"
          aria-hidden="true"
        />

        {/* Pétalos cayendo */}
        <FallingPetals count={10} />

        {/* Esquinas florales (las 4) */}
        <LilacCorner position="tl" className="h-38 w-38 sm:h-50 sm:w-50" />
        <LilacCorner position="tr" className="h-38 w-38 sm:h-50 sm:w-50" />
        <LilacCorner position="bl" className="h-32 w-32 sm:h-40 sm:w-40" />
        <LilacCorner position="br" className="h-32 w-32 sm:h-40 sm:w-40" />

        {/* Mariposas decorativas */}
        <Butterfly className="pointer-events-none absolute left-[12%] top-[30%] h-8 w-10 animate-butterfly opacity-80 sm:h-10 sm:w-12" />
        <Butterfly className="pointer-events-none absolute right-[14%] top-[55%] h-7 w-9 animate-butterfly opacity-70 sm:h-9 sm:w-11" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-36 pb-20 text-center sm:pt-40">
          <p className="font-display text-xs sm:text-sm tracking-[0.5em] uppercase text-primary-text">
            Mis quince años
          </p>

          <div className="mt-6 mb-4">
            <span className="font-script text-7xl sm:text-9xl text-primary-text leading-none">
              {HOST_NAME}
            </span>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-muted-foreground max-w-md text-balance leading-relaxed">
            Hay momentos en la vida que merecen celebrarse en grande, y este es uno de ellos.
          </p>

          <FloralDivider className="mt-8" />

          {/* Retrato */}
          <div className="relative mt-10 w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] border border-primary/30" aria-hidden="true" />
            <div className="absolute -inset-1 rounded-[1.6rem] border border-accent/40" aria-hidden="true" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] shadow-xl shadow-primary/20">
              <Image
                src={MAIN_PHOTO_SRC}
                alt="Vestido de XV años color rosado"
                fill
                priority
                sizes="(max-width: 640px) 90vw, 380px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="mt-10 font-display text-2xl sm:text-3xl text-foreground tracking-wide">
            Sábado <span className="text-primary-text">·</span> 26 de septiembre
          </p>
        </div>
      </section>

      {/* ===================== CARTA ===================== */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        {/* Ramas laterales pegadas al borde */}
        <LilacBranch className="pointer-events-none absolute left-0 top-0 hidden h-full w-20 opacity-70 md:block lg:w-24" />
        <LilacBranch
          flipped
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 opacity-70 md:block lg:w-24"
        />

        {/* Esquinas pequeñas */}
        <LilacCorner position="tl" className="h-28 w-28 opacity-80 md:hidden" />
        <LilacCorner position="tr" className="h-28 w-28 opacity-80 md:hidden" />

        <div className="relative mx-auto max-w-2xl">
          <div className="relative rounded-2xl border border-primary/20 bg-card/85 px-6 py-12 sm:px-12 sm:py-16 shadow-lg shadow-primary/5 backdrop-blur-sm">
            {/* Esquinas dentro de la carta */}
            <LilacCorner position="tl" className="h-20 w-20 opacity-90" />
            <LilacCorner position="tr" className="h-20 w-20 opacity-90" />
            <LilacCorner position="bl" className="h-20 w-20 opacity-90" />
            <LilacCorner position="br" className="h-20 w-20 opacity-90" />

            <p className="text-center text-xs uppercase tracking-[0.4em] text-primary-text">
              Carta de invitación
            </p>

            <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl text-foreground text-balance">
              {guest
                ? strings?.isPlural
                  ? <>Para ustedes, <span className="text-primary-text">{guest.name}</span>, que son parte de mi historia</>
                  : <>Para ti, <span className="text-primary-text">{guest.name}</span>, que eres parte de mi historia</>
                : "Para ti, que eres parte de mi historia"
              }
            </h2>

            <FloralDivider className="my-8" />

            <div className="space-y-5 font-serif text-lg leading-relaxed text-foreground/90">
              {/* Personalized greeting */}
              {strings && (
                <p className="text-center font-script text-3xl sm:text-4xl text-primary-text mb-2">
                  {strings.greeting},
                </p>
              )}

              <p className="first-letter:font-display first-letter:text-5xl first-letter:text-primary-text first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                {strings?.isPlural
                  ? "Hoy quiero invitarlos a uno de los días más especiales de mi vida: la celebración de mis quince años, ese momento en el que dejo atrás la niñez para abrirle la puerta a una nueva etapa llena de sueños, ilusiones y promesas."
                  : "Hoy quiero invitarte a uno de los días más especiales de mi vida: la celebración de mis quince años, ese momento en el que dejo atrás la niñez para abrirle la puerta a una nueva etapa llena de sueños, ilusiones y promesas."
                }
              </p>

              <p>
                {strings?.isPlural
                  ? "Quiero que este recuerdo sea inolvidable, y por eso no podía imaginarlo sin ustedes. Su presencia es el regalo más bonito que podría pedir, porque las personas importantes de mi vida son las que hacen que esta noche tenga sentido."
                  : "Quiero que este recuerdo sea inolvidable, y por eso no podía imaginarlo sin ti. Tu presencia es el regalo más bonito que podría pedir, porque las personas importantes de mi vida son las que hacen que esta noche tenga sentido."
                }
              </p>

              <p>
                {strings?.isPlural
                  ? "Los espero con el corazón lleno de alegría, lista para bailar, reír y compartir un capítulo que recordaremos para siempre."
                  : "Te espero con el corazón lleno de alegría, lista para bailar, reír y escribir juntos un capítulo que recordaremos para siempre."
                }
              </p>

              <p className="text-right pt-4">
                <span className="font-script text-4xl text-primary-text">Con cariño, {HOST_NAME}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COUNTDOWN ===================== */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-20 bg-secondary/40">
        <FallingPetals count={6} />

        <LilacCorner position="tl" className="h-32 w-32 sm:h-40 sm:w-40" />
        <LilacCorner position="tr" className="h-32 w-32 sm:h-40 sm:w-40" />
        <LilacCorner position="bl" className="h-28 w-28 sm:h-36 sm:w-36 opacity-90" />
        <LilacCorner position="br" className="h-28 w-28 sm:h-36 sm:w-36 opacity-90" />

        <Sparkles className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-shimmer opacity-50" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Falta poco</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground text-balance">
            Cuenta regresiva para mi gran noche
          </h2>
          <p className="mt-3 font-serif italic text-muted-foreground">
            Sábado 26 de septiembre · 9:30 p. m.
          </p>

          <div className="mt-10">
            <Countdown targetDate={EVENT_DATE_ISO} />
          </div>
        </div>
      </section>

      {/* ===================== DETALLES ===================== */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24">
        <LilacCorner position="tl" className="h-24 w-24 sm:h-32 sm:w-32 opacity-85" />
        <LilacCorner position="tr" className="h-24 w-24 sm:h-32 sm:w-32 opacity-85" />
        <LilacCorner position="bl" className="h-22 w-22 sm:h-28 sm:w-28 opacity-75" />
        <LilacCorner position="br" className="h-22 w-22 sm:h-28 sm:w-28 opacity-75" />

        <Butterfly className="pointer-events-none absolute right-[8%] top-[20%] h-7 w-9 animate-butterfly opacity-70 sm:h-9 sm:w-11" />

        <div className="relative mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Detalles del evento</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground">¿Cuándo y dónde?</h2>
            <FloralDivider className="my-8" />
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <DetailCard
              label="Fecha"
              title="26 de septiembre"
              subtitle="Sábado · 2026"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              }
            />
            <DetailCard
              label="Hora"
              title="9:30 p. m."
              subtitle="Recepción a las 9:30 p. m."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              }
            />
            <DetailCard
              label="Lugar"
              title={EVENT_LOCATION}
              subtitle="Te esperamos"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <path d="M12 22s7-7.58 7-13a7 7 0 0 0-14 0c0 5.42 7 13 7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ===================== DRESS CODE ===================== */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24 bg-secondary/30">
        <FallingPetals count={5} />

        <LilacCorner position="tl" className="h-24 w-24 sm:h-32 sm:w-32" />
        <LilacCorner position="tr" className="h-24 w-24 sm:h-32 sm:w-32" />
        <LilacCorner position="bl" className="h-22 w-22 sm:h-28 sm:w-28 opacity-90" />
        <LilacCorner position="br" className="h-22 w-22 sm:h-28 sm:w-28 opacity-90" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Código de vestimenta</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground">Dress Code</h2>

          <FloralDivider className="my-8" />

          {/* Muestras de color y tipo de vestimenta */}
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {/* Izquierda: Rosado reservado */}
            <div className="flex flex-col items-center">
              <div
                className="h-16 w-16 rounded-full border border-primary/40 shadow-lg shadow-primary/20 sm:h-20 sm:w-20"
                style={{ backgroundColor: "#FFB6C1" }}
                aria-label="Color rosado reservado"
              />
              <div className="mt-3 flex items-center gap-1.5 text-sm sm:text-base uppercase tracking-[0.25em] text-primary-text font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
                <span>Rosado</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-destructive font-bold">Reservado</p>
            </div>

            {/* Separador vertical */}
            <div className="h-16 w-px bg-primary/25" aria-hidden="true" />

            {/* Derecha: Traje Formal */}
            <div className="flex flex-col items-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/5 shadow-lg shadow-primary/10 sm:h-20 sm:w-20"
                aria-label="Vestimenta formal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-9 w-9 text-primary sm:h-11 sm:w-11"
                  aria-hidden="true"
                >
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
              <div className="mt-3 flex items-center justify-center text-sm sm:text-base uppercase tracking-[0.25em] text-primary-text font-bold">
                <span>Formal</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Traje / Vestido</p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-md font-serif text-lg leading-relaxed text-foreground/80 text-pretty">
            El color <span className="font-semibold text-primary-text">rosado</span> está reservado únicamente para
            la quinceañera. Te pedimos con cariño elegir cualquier otro tono para acompañarme en esta noche
            especial.
          </p>

          <p className="mt-4 font-serif italic text-sm text-muted-foreground">
            Vestimenta formal
          </p>
        </div>
      </section>

      {/* ===================== UBICACION ===================== */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24">
        <LilacCorner position="tl" className="h-24 w-24 sm:h-32 sm:w-32 opacity-80" />
        <LilacCorner position="tr" className="h-24 w-24 sm:h-32 sm:w-32 opacity-80" />
        <LilacCorner position="bl" className="h-22 w-22 sm:h-28 sm:w-28 opacity-70" />
        <LilacCorner position="br" className="h-22 w-22 sm:h-28 sm:w-28 opacity-70" />

        <Butterfly className="pointer-events-none absolute left-[10%] top-[30%] h-8 w-10 animate-butterfly opacity-70 sm:h-10 sm:w-12" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Ubicación de la fiesta</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">Cómo llegar</h2>

          <div className="relative mt-8">
            <div className="absolute -inset-2 rounded-[1.4rem] border border-primary/25" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-2 shadow-xl shadow-primary/15">
              <iframe
                src={MAP_EMBED_URL}
                title="Mapa de la ubicación de la fiesta"
                className="h-64 w-full rounded-xl border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-primary-text">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
              <path d="M12 22s7-7.58 7-13a7 7 0 0 0-14 0c0 5.42 7 13 7 13z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <p className="font-display text-xl text-foreground">{EVENT_LOCATION}</p>
          </div>
          <p className="mt-1 font-serif italic text-muted-foreground">J5402 San Juan, San Juan, Argentina</p>

          <a
            href={MAP_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-secondary/50 px-6 py-3 font-serif text-sm text-primary-text shadow-sm transition-colors hover:bg-secondary"
          >
            Abrir en Google Maps
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
              <path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===================== QR FOTOS ===================== */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24 bg-secondary/40">
        <FallingPetals count={6} />

        <LilacCorner position="tl" className="h-24 w-24 sm:h-32 sm:w-32" />
        <LilacCorner position="tr" className="h-24 w-24 sm:h-32 sm:w-32" />
        <LilacCorner position="bl" className="h-22 w-22 sm:h-28 sm:w-28 opacity-90" />
        <LilacCorner position="br" className="h-22 w-22 sm:h-28 sm:w-28 opacity-90" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Revive el Recuerdo</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground text-balance">
            Álbum de mis quince
          </h2>

          <FloralDivider className="my-8" />

          <p className="mx-auto max-w-md font-serif text-base leading-relaxed text-foreground/80 text-pretty">
            Escanea el código QR para abrir el álbum y revivir los momentos más especiales de esta noche.
            Las fotografías serán agregadas y administradas únicamente por la dueña del álbum.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[1.4rem] border border-primary/30" aria-hidden="true" />
              <div className="absolute -inset-0.5 rounded-[1.1rem] border border-accent/40" aria-hidden="true" />
              <div className="relative rounded-[1rem] border border-primary/20 bg-card p-5 shadow-xl shadow-primary/15">
                <Image
                  src={PHOTO_QR_SRC || "/placeholder.svg"}
                  alt="Código QR para abrir el álbum de fotos de los Quince"
                  width={240}
                  height={240}
                  className="h-56 w-56 sm:h-60 sm:w-60"
                  unoptimized
                />
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary-text">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 14h3v3M21 14v3M14 21h3M21 19v2h-2" />
                  </svg>
                  <span>Escanea</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href={PHOTO_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-serif text-sm italic text-primary-text underline-offset-4 hover:underline"
          >
            o toca aquí para abrir el álbum directamente
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
            </svg>
          </a>

          <p className="mt-6 font-serif italic text-xs text-muted-foreground">
            Fotos · Videos · Cada recuerdo cuenta
          </p>
        </div>
      </section>

      {/* ===================== CONFIRMACIÓN ===================== */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <LilacBranch className="pointer-events-none absolute left-0 top-0 hidden h-full w-20 opacity-70 md:block lg:w-24" />
        <LilacBranch
          flipped
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 opacity-70 md:block lg:w-24"
        />

        <LilacCorner position="tl" className="h-28 w-28 opacity-80 md:hidden" />
        <LilacCorner position="tr" className="h-28 w-28 opacity-80 md:hidden" />

        <Butterfly className="pointer-events-none absolute right-[12%] top-[15%] h-7 w-9 animate-butterfly opacity-70 sm:h-9 sm:w-11" />

        <div className="relative mx-auto max-w-2xl">
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-b from-card to-secondary/40 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl shadow-primary/10">
            <LilacCorner position="tl" className="h-20 w-20 opacity-90" />
            <LilacCorner position="tr" className="h-20 w-20 opacity-90" />
            <LilacCorner position="bl" className="h-20 w-20 opacity-90" />
            <LilacCorner position="br" className="h-20 w-20 opacity-90" />

            <p className="text-xs uppercase tracking-[0.4em] text-primary-text">Confirma tu Asistencia</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground text-balance">
              Hazme saber que estarás ahí
            </h2>
            <p className="mt-4 font-serif italic text-muted-foreground max-w-md mx-auto text-balance">
              {guest
                ? "Toca el botón y se abrirá WhatsApp con un mensaje personalizado listo para enviarme."
                : "Escribe tu nombre y al tocar el botón se abrirá WhatsApp con un mensaje listo para enviarme."
              }
            </p>

            <FloralDivider className="my-8" />

            <WhatsappConfirm
              phone={WHATSAPP_PHONE}
              hostName={HOST_NAME}
              guest={
                guest
                  ? {
                      name: guest.name,
                      slots: guest.slots,
                      type: guest.type,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative overflow-hidden px-6 py-16 text-center">
        <LilacCorner position="bl" className="h-28 w-28 opacity-80 sm:h-36 sm:w-36" />
        <LilacCorner position="br" className="h-28 w-28 opacity-80 sm:h-36 sm:w-36" />

        <FloralDivider className="mb-8" />
        <p className="font-script text-5xl sm:text-6xl text-primary-text">Te espero</p>
        <p className="mt-4 font-display tracking-[0.4em] text-sm uppercase text-muted-foreground">
          {HOST_NAME} · XV años
        </p>
        <p className="mt-2 font-serif italic text-sm text-muted-foreground/80">26 · 09 · 2026</p>
      </footer>
      </main>
    </IntroGate>
  )
}

function DetailCard({
  label,
  title,
  subtitle,
  icon,
}: {
  label: string
  title: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-primary/20 bg-card/70 px-6 py-8 text-center shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-secondary/50 text-primary">
        {icon}
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-xl text-foreground">{title}</p>
      <p className="mt-1 font-serif italic text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}
