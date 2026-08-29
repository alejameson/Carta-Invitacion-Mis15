type Props = {
  className?: string
}

export function FloralDivider({ className = "" }: Props) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-primary/70 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="h-5 w-5"
      >
        <path d="M12 2c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6z" fill="currentColor" opacity="0.5" />
        <path d="M12 22c-1.5-2-1.5-4 0-6 1.5 2 1.5 4 0 6z" fill="currentColor" opacity="0.5" />
        <path d="M2 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0z" fill="currentColor" opacity="0.5" />
        <path d="M22 12c-2 1.5-4 1.5-6 0 2-1.5 4-1.5 6 0z" fill="currentColor" opacity="0.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span className="font-script text-2xl text-primary leading-none -mt-1">XV</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="h-5 w-5"
      >
        <path d="M12 2c1.5 2 1.5 4 0 6-1.5-2-1.5-4 0-6z" fill="currentColor" opacity="0.5" />
        <path d="M12 22c-1.5-2-1.5-4 0-6 1.5 2 1.5 4 0 6z" fill="currentColor" opacity="0.5" />
        <path d="M2 12c2-1.5 4-1.5 6 0-2 1.5-4 1.5-6 0z" fill="currentColor" opacity="0.5" />
        <path d="M22 12c-2 1.5-4 1.5-6 0 2-1.5 4-1.5 6 0z" fill="currentColor" opacity="0.5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  )
}
