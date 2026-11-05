import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import type { ComponentProps, ReactNode } from 'react'
import LinkedinIcon from '@/components/atoms/LinkedinIcon'
import { Link } from '@/i18n/navigation'
import { rememberSheetOrigin } from '@/components/sections/projects/sheetStyles'
import type { ProjectStackItem } from '@/components/sections/projects/projects.data'

/** Balises autorisées dans les titres de `messages/*.json`. */
export const richTitle = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  br: () => <br />,
}

type TextProps = {
  children: ReactNode
  className?: string
}

export function Handwritten({ children, className = '' }: TextProps) {
  return (
    <span className={`inline-block -rotate-4 self-start font-serif text-[clamp(12px,3.2cqw,20px)] leading-normal italic text-sepia ${className}`}>
      {children}
    </span>
  )
}

export function BookTitle({ children, className = '', ...rest }: ComponentProps<'h2'>) {
  return (
    <h2
      className={`font-serif font-normal leading-[1.14] tracking-[-.02em] [&_em]:font-light [&_em]:text-rose ${className}`}
      {...rest}
    >
      {children}
    </h2>
  )
}

export function Lead({ children, className = '' }: TextProps) {
  return <p className={`text-[clamp(11px,2.4cqw,15.5px)] leading-[1.6] text-ink-soft ${className}`}>{children}</p>
}

export function MonoLabel({ children, className = '' }: TextProps) {
  return (
    <span className={`font-mono text-[clamp(8px,1.65cqw,10.5px)] uppercase tracking-[.12em] text-ink-faint ${className}`}>
      {children}
    </span>
  )
}

export function Signature({ children, className = '' }: TextProps) {
  return <div className={`-rotate-5 font-serif text-[clamp(15px,5.1cqw,32px)] italic text-sepia ${className}`}>{children}</div>
}

export function BookLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      onClick={rememberSheetOrigin}
      className="inline-flex items-center gap-[3.4cqw] self-start border-b border-umber/60 pb-[.9cqw] text-[clamp(11px,2.2cqw,14px)] text-umber transition-[gap] hover:gap-[4.8cqw]"
    >
      {children}
      <ArrowUpRight className="size-[1.3em]" />
    </Link>
  )
}

export function TechChips({ stack, className = '' }: { stack: ProjectStackItem[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-[1.1cqw] ${className}`}>
      {stack.map(({ name, icon }) => (
        <li
          key={name}
          className="inline-flex items-center gap-[.45em] rounded-full border border-paper-line bg-paper-warm px-[.75em] py-[.32em] text-[clamp(10px,2cqw,13px)] text-ink [&_svg]:size-[1.1em] [&_svg]:shrink-0"
        >
          {icon}
          {name}
        </li>
      ))}
    </ul>
  )
}

export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryan-houblon-172121211/', Icon: LinkedinIcon },
  { id: 'github', label: 'GitHub', href: 'https://github.com/tayyyyylor', Icon: SiGithub },
]

export function BookSocials() {
  return (
    <div className="flex flex-wrap items-center gap-x-[4.4cqw] gap-y-1 text-[clamp(10.5px,2cqw,13px)] text-ink-soft">
      {socials.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[.4em] hover:text-rose">
          {label}
          <ArrowUpRight className="size-[1.1em]" />
        </a>
      ))}
    </div>
  )
}
