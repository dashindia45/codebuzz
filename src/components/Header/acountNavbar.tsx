import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo2.png'
import Link from 'next/link'



const acountNavbar = ({colour, hoverColour} : any) => {
    function handleProblemChange(arg0: boolean): void {
        
    }

    return (
        <div >
            <header className={`text-gray-600 body-font px-4 py-3 ${colour}`}>
    <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Link href="/" className="flex items-center transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out">
            <Image src={Logo} className="h-10 w-10 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBuzz</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
            <Link className={`mr-5 text-gray-400 hover:cursor-pointer hover:text-${hoverColour} transform ease-out duration-700`} href="/accounts/explore">Explore</Link>
            <Link className={`mr-5 text-gray-400 hover:cursor-pointer hover:text-${hoverColour} transform ease-out duration-700`} href={''}>Problems</Link>
            <Link className={`mr-5 text-gray-400 hover:cursor-pointer hover:text-${hoverColour} transform ease-out duration-700`} href={''}>Discuss</Link>
        </nav>
    </div>
</header>

        </div>
    )
}

export default acountNavbar
