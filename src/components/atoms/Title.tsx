import type { ReactNode } from 'react'

interface TitleProps {
  number: string
  title: string
  desc: ReactNode
}
export default function Title({number, title, desc}: TitleProps) {
  return (
    <div className="flex flex-col items-start text-[12px] gap-10 mb-15 lg:mb-30 lg:flex-row lg:gap-30 lg:items-end">
      <div className="flex gap-2 items-center">
      <p className="text-important font-mono">{number}</p>
      <span aria-hidden className="h-px w-6 bg-grey-text" />
      <p className="font-mono uppercase text-grey-text text-wrap">{title}</p>
      </div>
      <div>
        <h3 className=" text-[35px] lg:text-[50px] font-serif leading-none">{desc}</h3>
      </div>
    </div>
  )
}
