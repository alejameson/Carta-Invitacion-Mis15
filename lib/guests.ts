// ─── Guest data for personalized invitations ─────────────────────────
// Each guest has a unique slug used in the URL: /invitado/[slug]
// At build time, generateStaticParams creates a static page per guest.

export type GuestType = "f" | "m" | "family" | "brothers" | "sisters"

export type Guest = {
  /** Display name exactly as provided, e.g. "Melba Pertuz" or "Familia Serna Barrios" */
  name: string
  /** URL slug, e.g. "melba-pertuz" */
  slug: string
  /** Number of reserved spots */
  slots: number
  /** Guest category — drives gender/plural conjugation */
  type: GuestType
}

// ── Derived string helpers ────────────────────────────────────────────

const TYPE_STRINGS: Record<
  GuestType,
  {
    greetingPrefix: string
    inviteLabel: string
    introVerb: string
  }
> = {
  f: { greetingPrefix: "Querida", inviteLabel: "Estás invitada a", introVerb: "tienes" },
  m: { greetingPrefix: "Querido", inviteLabel: "Estás invitado a", introVerb: "tienes" },
  family: { greetingPrefix: "Querida", inviteLabel: "Están invitados a", introVerb: "tienen" },
  brothers: { greetingPrefix: "Queridos", inviteLabel: "Están invitados a", introVerb: "tienen" },
  sisters: { greetingPrefix: "Queridas", inviteLabel: "Están invitadas a", introVerb: "tienen" },
}

export function getGuestStrings(guest: Guest) {
  const s = TYPE_STRINGS[guest.type]
  return {
    /** e.g. "Querida Melba Pertuz" */
    greeting: `${s.greetingPrefix} ${guest.name}`,
    /** e.g. "Estás invitada a" */
    inviteLabel: s.inviteLabel,
    /** e.g. "tienes" (for "tienes una invitación especial") */
    introVerb: s.introVerb,
    /** Whether to use plural conjugation in WhatsApp messages */
    isPlural: guest.type === "family" || guest.type === "brothers" || guest.type === "sisters",
  }
}

/** Build the personalized WhatsApp confirmation message */
export function buildGuestWhatsappMsg(guest: Guest, count?: number): string {
  const isPlural = guest.type === "family" || guest.type === "brothers" || guest.type === "sisters"

  if (!isPlural) {
    // Individual
    const pronoun = guest.type === "f" ? "la" : "lo"
    return (
      `¡Hola Melany!\n\n` +
      `Soy *${guest.name}* y con muchísima alegría confirmo mi asistencia a tu fiesta de XV Años.\n\n` +
      `¡Cuenta conmigo, no me ${pronoun} pierdo por nada del mundo!`
    )
  }

  // Plural (family / group)
  const article =
    guest.type === "family" ? "la" : guest.type === "brothers" ? "los" : "las"
  const closing =
    guest.type === "sisters"
      ? "¡Cuenta con nosotras, no nos lo perdemos por nada del mundo!"
      : "¡Cuenta con nosotros, no nos lo perdemos por nada del mundo!"

  const countLine =
    count != null
      ? `Asistiremos *${count}* de ${guest.slots} personas.\n\n`
      : `Asistiremos *${guest.slots}* personas.\n\n`

  return (
    `¡Hola Melany!\n\n` +
    `Somos ${article} *${guest.name}* y con muchísima alegría confirmamos nuestra asistencia a tu fiesta de XV Años.\n` +
    countLine +
    `${closing}`
  )
}

// ── Complete guest list ───────────────────────────────────────────────

export const GUESTS: Guest[] = [
  // ── Familias ──
  { name: "Familia Serna Barrios", slug: "familia-serna-barrios", slots: 7, type: "family" },
  { name: "Familia Barrios Ariza", slug: "familia-barrios-ariza", slots: 6, type: "family" },
  { name: "Familia López", slug: "familia-lopez", slots: 4, type: "family" },

  // ── Grupos ──
  { name: "Hermanos Noguera", slug: "hermanos-noguera", slots: 2, type: "brothers" },
  { name: "Hermanas Zambrano", slug: "hermanas-zambrano", slots: 2, type: "sisters" },

  // ── Invitadas (1 cupo) ──
  { name: "Melba Pertuz", slug: "melba-pertuz", slots: 1, type: "f" },
  { name: "María Peñaranda", slug: "maria-penaranda", slots: 1, type: "f" },
  { name: "Dayana Gómez", slug: "dayana-gomez", slots: 1, type: "f" },
  { name: "Sharit Mazo", slug: "sharit-mazo", slots: 1, type: "f" },
  { name: "Oriana Garavito", slug: "oriana-garavito", slots: 1, type: "f" },
  { name: "Sara Sánchez", slug: "sara-sanchez", slots: 1, type: "f" },
  { name: "Isabella Ortiz", slug: "isabella-ortiz", slots: 1, type: "f" },
  { name: "Luisa Aroca", slug: "luisa-aroca", slots: 1, type: "f" },
  { name: "Mariangel Pérez", slug: "mariangel-perez", slots: 1, type: "f" },
  { name: "Shaira Castellar", slug: "shaira-castellar", slots: 1, type: "f" },
  { name: "Mariangel Polo", slug: "mariangel-polo", slots: 1, type: "f" },
  { name: "Paula Tarazona", slug: "paula-tarazona", slots: 1, type: "f" },
  { name: "María Alejandra Herrera", slug: "maria-alejandra-herrera", slots: 1, type: "f" },
  { name: "Sarah Renfigo", slug: "sarah-renfigo", slots: 1, type: "f" },
  { name: "Karen Villegas", slug: "karen-villegas", slots: 1, type: "f" },
  { name: "Kassandra Leyva", slug: "kassandra-leyva", slots: 1, type: "f" },
  { name: "Karen Torres", slug: "karen-torres", slots: 1, type: "f" },
  { name: "Salomé Álvarez", slug: "salome-alvarez", slots: 1, type: "f" },
  { name: "Shaidy Sierra", slug: "shaidy-sierra", slots: 1, type: "f" },
  { name: "Nazyra del Prado", slug: "nazyra-del-prado", slots: 1, type: "f" },
  { name: "Lismary Romero", slug: "lismary-romero", slots: 1, type: "f" },

  // ── Invitados (1 cupo) ──
  { name: "Arnold Osorio", slug: "arnold-osorio", slots: 1, type: "m" },
  { name: "Jorge Rocha", slug: "jorge-rocha", slots: 1, type: "m" },
  { name: "Adalberto Noriega", slug: "adalberto-noriega", slots: 1, type: "m" },
  { name: "Luis Mario Hernández", slug: "luis-mario-hernandez", slots: 1, type: "m" },
  { name: "Daeth Acuña", slug: "daeth-acuna", slots: 1, type: "m" },
  { name: "Jesús Manuel Varela", slug: "jesus-manuel-varela", slots: 1, type: "m" },
  { name: "Andrés Camilo Benítez", slug: "andres-camilo-benitez", slots: 1, type: "m" },
  { name: "Sebastián Vega", slug: "sebastian-vega", slots: 1, type: "m" },
  { name: "Sebastián Parra", slug: "sebastian-parra", slots: 1, type: "m" },
  { name: "Sebastián Martínez", slug: "sebastian-martinez", slots: 1, type: "m" },
  { name: "Neymar Herrera", slug: "neymar-herrera", slots: 1, type: "m" },
  { name: "Stanly Laitano", slug: "stanly-laitano", slots: 1, type: "m" },
  { name: "Pedro Daza", slug: "pedro-daza", slots: 1, type: "m" },
  { name: "Santiago Garavito", slug: "santiago-garavito", slots: 1, type: "m" },
  { name: "Abraham Rivas", slug: "abraham-rivas", slots: 1, type: "m" },
  { name: "Santiago Sierra", slug: "santiago-sierra", slots: 1, type: "m" },
  { name: "Juan Zuluaga", slug: "juan-zuluaga", slots: 1, type: "m" },
  { name: "Álvaro Mugno", slug: "alvaro-mugno", slots: 1, type: "m" },
  { name: "Juan David Miranda", slug: "juan-david-miranda", slots: 1, type: "m" },
  { name: "Luis Mario Mugno", slug: "luis-mario-mugno", slots: 1, type: "m" },
  { name: "Andrés Felipe Arias", slug: "andres-felipe-arias", slots: 1, type: "m" },
  { name: "Juan Sebastián Carrillo", slug: "juan-sebastian-carrillo", slots: 1, type: "m" },
  { name: "Eider Salas", slug: "eider-salas", slots: 1, type: "m" },
  { name: "Marcos Roa", slug: "marcos-roa", slots: 1, type: "m" },
  { name: "Johan Muñoz", slug: "johan-munoz", slots: 1, type: "m" },
  { name: "Habit Barrios", slug: "habit-barrios", slots: 1, type: "m" },
  { name: "Yeshua Herazo", slug: "yeshua-herazo", slots: 1, type: "m" },
]

// ── Lookup ────────────────────────────────────────────────────────────

export function findGuest(slug: string): Guest | undefined {
  return GUESTS.find((g) => g.slug === slug)
}
