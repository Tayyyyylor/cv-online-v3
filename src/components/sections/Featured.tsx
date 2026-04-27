import { SiAppstore, SiBetterauth, SiBun, SiCloudflare, SiDocker, SiExpo, SiGoogleplay, SiNestjs, SiPostgresql, SiPrisma, SiReact, SiTurborepo } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Title from '../atoms/Title'
import Badge from '../atoms/Badge'


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
    <article className='w-[100%] p-3'>
        <Title title='Projet phare - Application mobile'/>
        <section className='flex flex-col items-center lg:flex-row gap-6'>
            <Image src="/toto.png" width={300} height={300} alt='' className='flex-1' loading="eager"/>
            <div className='flex flex-col gap-3 flex-1'>
                <div className='flex items-center justify-between'>
                <h3 className='font-serif text-[22px]'>My Shelf</h3>
               <a href="" className='border p-2 w-auto flex justify-center rounded-lg items-center'>
                        <button className='cursor-pointer'>
                         Voir mon profil
                        </button>
                        </a>
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
                <div className='flex gap-2 size-fit w-[100%] justify-center'>
                    {buttonsData.map((button, index) => (
                        <a key={index} href="" className='border p-2 w-auto flex justify-center rounded-lg items-center'>
                        <button className='flex gap-2 items-center cursor-pointer'>
                            {button.logo} {button.name}
                        </button>
                        </a>
                    ))

                    }
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
