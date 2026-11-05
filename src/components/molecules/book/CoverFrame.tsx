import type { ReactNode } from 'react'

type CoverFrameProps = {
  children: ReactNode
  kicker: ReactNode
  title: ReactNode
  bottomLeft: ReactNode
  bottomRight: ReactNode
  labelledBy: string
}

export default function CoverFrame({ children, kicker, title, bottomLeft, bottomRight, labelledBy }: CoverFrameProps) {
  return (
    <section
      tabIndex={-1}
      aria-labelledby={labelledBy}
      className="relative h-full overflow-hidden bg-wine bg-[radial-gradient(ellipse_at_18%_20%,#86485650,transparent_75%)] text-cream outline-none [container-type:size] after:paper-grain after:pointer-events-none after:absolute after:inset-0 after:opacity-35"
    >
      <div className="absolute inset-0 px-[7.8cqw] pt-[8cqw]">
        <div className="pointer-events-none absolute inset-[3cqw] border border-[#d6b58a50] after:absolute after:inset-[.8cqw] after:border after:border-[#d6b58a20]" />
        <div className="relative z-1 flex flex-col gap-[1.4cqw] font-mono uppercase">
          <span className="text-[max(1.65cqw,calc(8px/var(--closed-zoom)))] tracking-[.22em]">{kicker}</span>
          <span className="text-[max(2.05cqw,calc(10px/var(--closed-zoom)))] tracking-[.24em]">{title}</span>
        </div>
        {children}
        <div className="absolute inset-x-[7.8cqw] bottom-[6.2cqw] flex justify-between font-mono text-[max(1.65cqw,calc(8px/var(--closed-zoom)))] uppercase tracking-[.16em] text-[#d0ae9b]">
          <span>{bottomLeft}</span>
          <span>{bottomRight}</span>
        </div>
      </div>
    </section>
  )
}

export const coverButton =
  'group absolute left-[7.8cqw] z-3 inline-flex items-center justify-center gap-[3.6cqw] rounded-[1px] border border-[#e6cda46b] bg-[#e5c897] px-[3.2cqw] py-[2.2cqw] text-[max(2.3cqw,calc(12.5px/var(--closed-zoom)))] font-medium text-[#542633] shadow-[0_2px_3px_#30132125,inset_0_1px_#fff4d860] transition-[background,box-shadow] hover:bg-[#f0d7ac] hover:shadow-[0_4px_10px_#30132140,inset_0_1px_#fff4d860] focus-visible:outline-[#f5dcad]'
