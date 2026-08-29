import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { GUESTS, findGuest } from "@/lib/guests"
import { InvitationContent } from "@/components/invitation-content"

// ── Static generation: one HTML page per guest ──────────────────────
export function generateStaticParams() {
  return GUESTS.map((g) => ({ slug: g.slug }))
}

// ── Per-guest metadata ──────────────────────────────────────────────
type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guest = findGuest(slug)
  if (!guest) return { title: "Invitación no encontrada" }

  const title = `Invitación para ${guest.name} — Mis XV Años de Agos`
  const description = `${guest.name}, estás invitad${guest.type === "f" ? "a" : "o"} a celebrar los XV Años de Agos. Domingo 14 de Junio, Discoteca 8cero4.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og-preview.jpg",
          alt: `Invitación de XV Años para ${guest.name}`,
        },
      ],
    },
  }
}

// ── Page component ──────────────────────────────────────────────────
export default async function GuestInvitationPage({ params }: PageProps) {
  const { slug } = await params
  const guest = findGuest(slug)

  if (!guest) notFound()

  return <InvitationContent guest={guest} />
}
