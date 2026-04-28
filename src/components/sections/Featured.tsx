import { SiAppstore, SiBetterauth, SiBun, SiCloudflare, SiDocker, SiExpo, SiGoogleplay, SiNestjs, SiPostgresql, SiPrisma, SiReact, SiTurborepo } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Title from '../atoms/Title'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'


export default function Featured() {


    const frontStackData = [
        {
            logo: <SiExpo />
        },
         {
            logo: <SiReact />
        },
    ]
    const backStackData = [
        {
            logo: <SiNestjs />
        },
        {
            logo: <SiPostgresql/>,
        },
         {
            logo: <SiPrisma />
        },
        {
            logo: <SiBetterauth />
        },
    ]
     const infraStackData = [
        {
            logo: <SiDocker />
        },
        {
            logo: <SiTurborepo />
        },
        {
            logo: <SiCloudflare />
        },
        {
            logo: <SiBun />
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
  return (
    <article className='w-[100%] p-3 mt-50 lg:mt-5'>
        <Title title='Projet phare - Application mobile'/>
        <section className='flex flex-col items-center lg:flex-row gap-6'>
            <Image src="/toto.png" width={300} height={300} alt='' className='flex-1' loading="eager"/>
            <div className='flex flex-col gap-3 flex-1'>
                <div className='flex items-center justify-between gap-3 flex-wrap'>
                <h3 className='font-serif text-[22px]'>My Shelf</h3>
                <Button href="#" variant="primary">Voir mon profil</Button>
                </div>
                <p>Une bibliothèque virtuelle pour suivre, organiser et partager ses lectures.</p>
                <div>
                    <h3 className='font-serif text-[20px] mb-5 mt-5 text-center'>Stack technique</h3>

                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Front</h4>
                        <div className='flex gap-3'>
                        {frontStackData.map((front, index) => (
                            <Badge key={index} logo={front.logo}/>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Back</h4>
                        <div className='flex gap-3'>

                        {backStackData.map((back, index) => (
                            <Badge key={index} logo={back.logo}/>
                        ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mb-10'>
                        <h4 className='font-mono uppercase'>Infra</h4>
                        <div className='flex gap-3'>

                        {infraStackData.map((infra, index) => (
                            <Badge key={index} logo={infra.logo}/>
                        ))}
                        </div>
                    </div>

                </div>
                <div className='flex flex-wrap gap-3 w-full justify-center'>
                    {buttonsData.map((button, index) => (
                        <Button key={index} href={button.url || '#'} variant="outline">
                            <span className='text-lg transition-transform duration-300 group-hover:scale-110'>{button.logo}</span>
                            {button.name}
                        </Button>
                    ))}
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
