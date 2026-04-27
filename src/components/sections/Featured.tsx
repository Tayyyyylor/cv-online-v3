import { SiAppstore, SiBetterauth, SiBun, SiCloudflare, SiDocker, SiExpo, SiGoogleplay, SiNestjs, SiPostgresql, SiPrisma, SiReact, SiTurborepo } from '@icons-pack/react-simple-icons'
import Image from 'next/image'


export default function Featured() {

    const stackData = [
        {
            logo: <SiExpo />
        },
        {
            logo: <SiReact />
        },
        {
            logo: <SiNestjs />
        },
        {
            logo: <SiPostgresql/>,
        },
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
        {
            logo: <SiPrisma />
        },
        {
            logo: <SiBetterauth />
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
        },
        {
            logo: "",
            url: "",
            name: "Mon profil My shelf"
        }
    ]
  return (
    <article className='w-[100%] p-3'>
        <h2 className='font-mono uppercase text-(--color-important) text-center mb-10 text-[16px] lg:text-[22px]'>Projets phares - Application mobile</h2>
        <section className='flex flex-col items-center lg:flex-row gap-6'>
            <Image src="/toto.png" width={300} height={300} alt='' className='flex-1' loading="eager"/>
            <div className='flex flex-col gap-3 flex-1'>
                <h3 className='font-serif text-[20px]'>My Shelf</h3>
                <p>Une bibliothèque virtuelle pour suivre, organiser et partager ses lectures.</p>
                <div className='flex gap-3 flex-wrap'>
                {stackData.map((stack, index) => (
                    <div key={index} className='border-1 border-(--color-foreground)/5 hover:border-(--color-important)/80 p-3 rounded-lg bg-(--background-card) text-wrap'>
                        {stack.logo}
                    </div>
                ))}
                </div>
                <div className='flex flex-col gap-2 w-70'>
                    {buttonsData.map((button, index) => (
                        <a key={index} href="" className='border p-2 w-auto flex justify-center rounded-lg '>
                        <button className='flex gap-2 items-center cursor-pointer'>
                            {button.logo} {button.name}
                        </button>
                        </a>
                    ))

                    }
                </div>
            </div>
        </section>
        <section>
            <p>--------------------------------</p>
            <p>en ce ,moment je lis </p>
            <p>couverture + titre du livre + auteur via API myshelf</p>
        </section>
    </article>
  )
}
