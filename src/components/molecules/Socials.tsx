import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function Socials() {

   const socialsData = [
    {
        label: "GitHub",
        url: "https://github.com/tayyyyylor"
    },
    {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/bryan-houblon-172121211/"
    },
    {
        label: "My shelf",
        url: "toto"
    },
    {
        label: "Reddit",
        url: "titi"
    },
     {
        label: "X",
        url: "https://x.com/_tayylor_g"
    },
]
  return (
    <section className='flex gap-x-10 gap-y-4 flex-wrap'>
        {socialsData.map((social) => (
            <div key={social.url}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-widest text-foreground/60 transition-colors hover:text-important"
              >
                {social.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
        ))

        }
    </section>
  )
}
