import { SiAppstore, SiBetterauth, SiBun, SiCloudflare, SiDocker, SiExpo, SiGoogleplay, SiNestjs, SiPostgresql, SiPrisma, SiReact, SiTurborepo } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Title from '../atoms/Title'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import { useTranslations } from 'next-intl'

    const frontStackData = [
        {
            icon: <SiExpo />,
            name: "Expo"
        },
         {
            icon: <SiReact />,
            name: "React Native"

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
        <Title number="01" title={t('title')}  desc={t.rich('descTitle', {
          important: (chunks) => <span className="text-important italic">{chunks}</span>,
        })}/>
        <section className='flex flex-col items-center lg:flex-row gap-6'>
            <Image src="/toto.png" width={500} height={500} alt='' className='flex-1 ' loading="eager"/>
            <div className='flex flex-col gap-3 flex-1 justify-between'>
                <div className='flex items-center justify-between gap-3 flex-wrap mb-5'>
                <h3 className='font-serif text-[22px]'>My Shelf</h3>
                <Button href="#" variant="primary">{t('ctaShowProfile')}</Button>
                </div>
                <div className="flex flex-col gap-5">
                {paragraphs.map((p, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
                <div>
                    <h3 className='font-serif text-[22px] mb-5 mt-5 text-center'>{t('titleStack')}</h3>

                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Front</h4>
                        <div className='flex gap-3 flex-wrap'>
                        {frontStackData.map((front, index) => (
                            <Badge key={index} logo={front}/>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Back</h4>
                        <div className='flex gap-3 flex-wrap'>

                        {backStackData.map((back, index) => (
                            <Badge key={index} logo={back}/>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Infra</h4>
                        <div className='flex gap-3 flex-wrap'>

                        {infraStackData.map((infra, index) => (
                            <Badge key={index} logo={infra}/>
                        ))}
                        </div>
                    </div>

                </div>
                <div className='flex flex-wrap gap-3 w-full justify-center'>
                    <Button href="/projects/my-shelf" variant='primary'>
                En savoir plus
                 </Button>
                 <div>
                    {buttonsData.map((button, index) => (
                        <Button key={index} href={button.url || '#'} variant="outline">
                            <span className='text-lg transition-transform duration-300 group-hover:scale-110'>{button.logo}</span>
                            {button.name}
                        </Button>
                    ))}
                    </div>
                </div>
            </div>
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
