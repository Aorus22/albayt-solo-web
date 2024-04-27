'use client'
import { NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SignInButton from './SignInButton'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) { 
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <>
        <nav className={`max-container padding-container items-center z-30 py-3 shadow-md sticky top-0 w-full bg-white transition-all duration-300 ease-in-out ${isScrolled ? 'py-[2px]' : 'py-5'}`}>
            <div className='flex items-center'>
                <Link href={'/'}>
                    <Image src={'/images/Logo.png'} alt='logo' width={100} height={100}/>
                </Link>

                <div className='w-full flexCenter'>
                    <ul className='hidden h-full gap-12 lg:flex'>
                        {NAV_LINKS.map((link) => (
                            <Link href={link.href} key={link.key} className={`medium-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold hover:text-black text-[#89060b]`}>
                                {link.label}
                            </Link>
                        ))}
                    </ul>
                </div>

                <div  className='lg:flexBetween hidden lg:block'>
                    <SignInButton></SignInButton>
                </div>

                {/* Tombol Burger / Menu */}
                <button onClick={toggleNavbar} className='inline-block lg:hidden'>
                {isOpen ? (
                        <Image src={'/xmark.svg'} width={32} height={32} alt='menu'/>
                    ) : (
                        <Image src={'/menu.svg'} width={32} height={32} alt='menu'/>
                    )}
                </button>
            </div>

            {isOpen && 
                <ul className='mt-3 h-full gap-12 lg:hidden'>
                    <div className={'w-full justify-center flex'}>
                        <SignInButton></SignInButton>
                    </div>


                    <div className='mt-2'>
                        {NAV_LINKS.map((link) => (
                            <div className=' py-3 hover:bg-gray-10 flex justify-center'>
                                <Link href={link.href} key={link.key} onClick={toggleNavbar} className='medium-18 text-gray-50 m-2 flexStart cursor-pointer transition-all hover:font-bold hover:text-black'>
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                </ul>
            }
        </nav>
    </>
  )
}

export default Navbar
