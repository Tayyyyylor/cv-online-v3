import Socials from "../molecules/Socials";

export default function HeroBanner() {
  return (
    <article className="flex items-center justify-start h-[100vh]">
      <section className="pl-4 flex flex-col gap-8">
        <h4 className="text-(--color-important) uppercase font-mono text-[12px]"> --- Développeur full stack · Paris ou Currently building things</h4>
        <div className="flex flex-col gap-4">
          <p className="font-serif text-[70px] leading-none">Code,</p>
          <p className="text-(--color-important) font-serif text-[70px] italic leading-none">pensée,</p>
          <p className="font-serif text-[70px] italic leading-none">bricolage.</p>
        </div>
<p>Développeur full stack avec un faible pour le front, la philo et les Raspberry Pi.</p>
<Socials />
      </section>
    </article>
  )
}
