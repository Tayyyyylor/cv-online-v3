
interface TitleProps {
    title: string
}
export default function Title({title}: TitleProps) {
  return (
            <h2 className='font-mono uppercase text-important text-center mb-10 text-[16px] lg:text-[22px]'>{title}</h2>
  )
}
