import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'outline'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-mono text-sm uppercase tracking-wide cursor-pointer overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-important/60 focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)'

const variants: Record<Variant, string> = {
  primary:
    'bg-important text-(--background) border border-important hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--color-important)]',
  outline:
    'border border-foreground/15 text-foreground hover:border-important hover:text-important hover:-translate-y-0.5',
}

type CommonProps = {
  variant?: Variant
  children: ReactNode
  className?: string
}

type AnchorProps = CommonProps &
  Omit<ComponentProps<'a'>, 'className' | 'children'> & { href: string }

type ButtonProps = CommonProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined }

export default function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'primary', className = '', children, ...rest } = props
  const classes = `${base} ${variants[variant]} ${className}`
  const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentProps<'a'>)}>
        {inner}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ComponentProps<'button'>)}>
      {inner}
    </button>
  )
}
