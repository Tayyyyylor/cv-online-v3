import { SiAppstore, SiBetterauth, SiBun, SiCloudflare, SiDocker, SiExpo, SiGoogleplay, SiNestjs, SiPostgresql, SiPrisma, SiReact, SiTailwindcss, SiTurborepo } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Title from '../atoms/Title'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import { useTranslations } from 'next-intl'
import Reveal, { RevealItem, RevealStagger } from '../atoms/Reveal'

    const frontStackData = [
        {
            icon: <SiExpo />,
            name: "Expo"
        },
         {
            icon: <SiReact />,
            name: "React Native"

        },
         {
            icon: <SiTailwindcss />,
            name: "TailwindCSS"

        },
    ]
    const backStackData = [
        {
            icon: <SiNestjs />,
            name: "Nestjs"

        },
        {
            icon: <SiPostgresql/>,
            name: "PostgreSQL"

        },
         {
            icon: <SiPrisma />,
            name: "Prisma"

        },
        {
            icon: <SiBetterauth />,
            name: "Better-Auth"

        },
    ]
     const infraStackData = [
        {
            icon: <SiDocker />,
            name: "Docker"

        },
        {
            icon: <SiTurborepo />,
            name: "Turborepo"

        },
        {
            icon: <SiCloudflare />,
            name: "Cloudflare"

        },
        {
            icon: <SiBun />,
            name: "Bun"

        },
    ]

     const buttonsData = [
        {
            logo: <SiAppstore />,
            url: "",
            name: "App Store"
        },
        {
            logo: <SiGoogleplay />,
            url: "",
            name: "Play Store"
        }
    ]

export default function Featured() {

    const t = useTranslations("Featured")

    const paragraphs = [
        t('paragraph1'),
        t('paragraph2'),
        t('paragraph3'),
        t('paragraph4')
    ]

  return (
    <article className='w-[100%] mt-50 lg:mt-5' id='featured'>
        <Reveal>
          <Title number="01" title={t('title')}  desc={t.rich('descTitle', {
            important: (chunks) => <span className="text-important italic">{chunks}</span>,
          })}/>
        </Reveal>
        <section className='flex flex-col items-center lg:flex-row gap-6'>
            <Reveal className='flex-1' x={-30} y={0} duration={0.9}>
              <Image src="/toto.png" width={500} height={500} alt='' className='w-full' loading="eager"/>
            </Reveal>
            <RevealStagger className='flex flex-col gap-3 flex-1 justify-between' stagger={0.1}>
                <RevealItem className='flex items-center justify-between gap-3 flex-wrap mb-5'>
                  <h3 className='font-serif text-[22px]'>My Shelf</h3>
                  <Button href="#" variant="primary">{t('ctaShowProfile')}</Button>
                </RevealItem>
                <div className="flex flex-col gap-5">
                  {paragraphs.map((p, i) => (
                    <RevealItem as="p" key={i} className="text-foreground/80 leading-relaxed">
                      {p}
                    </RevealItem>
                  ))}
                </div>
                <RevealItem>
                    <h3 className='font-serif text-[22px] mb-5 mt-5 text-center'>{t('titleStack')}</h3>

                    <RevealStagger className='flex flex-col gap-3 mb-10' stagger={0.05}>
                        <RevealItem as="h4" className='font-mono uppercase'>Front</RevealItem>
                        <div className='flex gap-3 flex-wrap'>
                        {frontStackData.map((front, index) => (
                            <RevealItem key={index}>
                              <Badge logo={front}/>
                            </RevealItem>
                        ))}
                        </div>
                    </RevealStagger>
                    <RevealStagger className='flex flex-col gap-3 mb-10' stagger={0.05}>
                        <RevealItem as="h4" className='font-mono uppercase'>Back</RevealItem>
                        <div className='flex gap-3 flex-wrap'>

                        {backStackData.map((back, index) => (
                            <RevealItem key={index}>
                              <Badge logo={back}/>
                            </RevealItem>
                        ))}
                        </div>
                    </RevealStagger>
                    <RevealStagger className='flex flex-col gap-3 mb-10' stagger={0.05}>
                        <RevealItem as="h4" className='font-mono uppercase'>Infra</RevealItem>
                        <div className='flex gap-3 flex-wrap'>

                        {infraStackData.map((infra, index) => (
                            <RevealItem key={index}>
                              <Badge logo={infra}/>
                            </RevealItem>
                        ))}
                        </div>
                    </RevealStagger>

                </RevealItem>
                <RevealItem className='flex flex-wrap gap-3 w-full justify-center'>
                    <Button href="/projects/my-shelf" variant='primary'>
                {t('ctaShowMore')}
                 </Button>
                 <div>
                    {buttonsData.map((button, index) => (
                        <Button key={index} href={button.url || '#'} variant="outline">
                            <span className='text-lg transition-transform duration-300 group-hover:scale-110'>{button.logo}</span>
                            {button.name}
                        </Button>
                    ))}
                    </div>
                </RevealItem>
            </RevealStagger>
        </section>

        {/* AJOUTER SECTION AVEC MA LECTURE EN COURS ET PEUT ETRE MON NOMBRE DE LIVRES LUS !

        <section>
            <p>--------------------------------</p>
            <p>en ce ,moment je lis </p>
            <p>couverture + titre du livre + auteur via API myshelf</p>
        </section> */}
    </article>
  )
}
