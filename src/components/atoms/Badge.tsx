
interface BadgeProps {
    logo: React.ReactNode
}
export default function Badge({ logo }: BadgeProps) {
  return (
        <div className='border-1 border-foreground/5 hover:border-important/80 p-3 rounded-lg bg-(--background-card) size-fit'>
                        {logo}
                    </div>
  )
}
