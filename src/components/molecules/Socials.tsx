import React from 'react'
import { SiGithub, SiReddit, SiX } from '@icons-pack/react-simple-icons';
import {  Mail } from 'lucide-react';

export default function Socials() {

   const socialsData = [
    {
        logo: <SiGithub size={35} />,
        url: "https://github.com/tayyyyylor"
    },
    {
        logo: <SiX size={35} />,
        url: "https://x.com/_tayylor_g"
    },
    {
        logo: <SiX size={35} />,
        url: "https://www.linkedin.com/in/bryan-houblon-172121211/"
    },
    {
        logo: <Mail size={35} />,
        url: "mailto:bryan.houblon@icloud.com"
    },
    {
        logo: <SiReddit size={35} />,
        url: ""
    },
]
  return (
    <section className='flex gap-5'>
        {socialsData.map((social, index) => (
            <a href={social.url} key={index}>
                <p>{social.logo}</p>
            </a>
        ))

        }
    </section>
  )
}
