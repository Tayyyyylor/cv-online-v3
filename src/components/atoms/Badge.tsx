
interface BadgeProps {
    logo: {
      name: string
      icon: React.ReactNode
    }
}
export default function Badge({ logo }: BadgeProps) {
  return (
        <div
              className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-(--background-card) px-3 py-2 text-sm [&>span:first-child>svg]:h-4 [&>span:first-child>svg]:w-4"
            >
              <span className="text-important">{logo.icon}</span>
              <span>{logo.name}</span>
            </div>
  )
}
