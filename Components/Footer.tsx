import { FOOTER_CONTACT_INFO, FOOTER_LINKS } from '@/constants'
import Link from 'next/link'
import React from 'react'
import FacebookIcon from '@/public/icon/FacebookIcon.svg'
import InstagramIcon from '@/public/icon/InstagramIcon.svg'
import TiktokIcon from '@/public/icon/TiktokIcon.svg'

const Footer = () => {
    return (
        <footer className='flexCenter pb-3 bg-[#f14310]'>
            <div className='padding-container flex w-full flex-col gap-5 md:gap-10'>
                <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row mt-8'>
                    <Link href={'/'} className='mb-6 md:mb-0'>
                        <div className='w-40'>
                            <img src={'/images/Logo.png'} alt='logo' className='h-[100px] w-auto object-contain md:h-[150px]' />
                        </div>
                    </Link>
                    <div className='flex flex-wrap gap-y-6 gap-x-4 xss:gap-x-10 xss:gap-y-4 md:gap-y-10 sm:justify-between md:flex-1 w-full'>
                        {FOOTER_LINKS.map((columns) => (
                            <FooterColumn key={columns.title} title={columns.title}>
                                <ul className='font-medium text-[14px] md:text-[16px] flex flex-col gap-3 md:gap-4 text-white'>
                                    {columns.links.map((link) => (
                                        <Link href={link.link} target='blank' key={link.label} className='duration-200 hover:text-black'>
                                            {link.value}
                                        </Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <div className='flex flex-col gap-2'>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link) => (
                                    <Link href={link.link} key={link.label} target='blank' className='text-[14px] md:text-[16px] flex flex-col gap-2 md:gap-4 md:flex-row'>
                                        <p className='whitespace-nowrap text-white block'>
                                            {link.label}
                                        </p>
                                        <p className='medium-14 whitespace-nowrap text-white duration-200 hover:text-black block'>
                                            {link.value}
                                        </p>
                                    </Link>
                                ))}
                            </FooterColumn>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h3 className='text-white bold-18'>Sosial Media</h3>
                            <ul className='regular-14 flex gap-4 text-gray-30'>
                                <Link href={'https://www.instagram.com/albaytsolo?igsh=ZGF3ajVuZGxpOXcw&utm_source=qr'} target='blank'>
                                    <InstagramIcon fill='white' width={24} height={24}/>
                                </Link>
                                <Link href={'https://www.facebook.com/Albaytsolo'} target='blank'>
                                    <FacebookIcon fill='white' width={24} height={24}/>
                                </Link>
                                <Link href={'https://www.tiktok.com/@albayt.solo?_t=8m0LU9TDJAH&_r=1'} target='blank'>
                                    <TiktokIcon fill='white' width={24} height={24}/>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className='w-full border-t-2 border-gray-200 pt-5 pb-2'>
                    <p className='text-[12px] md:text-[14px] w-full text-center items-center text-white'>
                        2024 ALBAYT SOLO | All right reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

type FooterColumnProps = {
    title: string;
    children: React.ReactNode
}

const FooterColumn = ({title, children}: FooterColumnProps) => {
  return (
    <div className='flex flex-col gap-2 xss:gap-5'>
        <h4 className='bold-18 whitespace-nowrap text-white'>{title}</h4>
        {children}
    </div>
  )
}

export default Footer