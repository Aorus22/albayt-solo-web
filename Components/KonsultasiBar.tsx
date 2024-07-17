import Link from 'next/link'
import React from 'react'
import WhatsappIcon from '@/public/icon/WhatsappIcon.svg'

const KonsultasiBar = () => {
  return (
    <Link href={`https://wa.me/628122586045?text=Assalammu'alaikum Al-Bayt Solo. Saya mengetahui AlBayt dari website. Saya ingin berkonsultasi mengenai paket yang ditawarkan, mohon dibantu`} target='_blank' rel="noopener noreferrer">
        <div id='normal konsul bar' className='hidden w-full lg:flex fixed z-50 bottom-1 px-4'>
            <div className='flexCenter gap-3 w-full h-10 px-4 py-2 bg-green-50 border border-white shadow-md rounded-full items-center duration-300 ease-in-out hover:bg-black'>
                <WhatsappIcon width={"24px"} height={"24px"}/>
                <h1 className='font-bold text-white'>Konsultasi Via WA</h1>
            </div>
        </div>

        <div id='mobile konsul bar' className='lg:hidden fixed z-50 bottom-7 right-6 md:right-8'>
            <div className='h-14 w-14 bg-green-50 border border-white shadow-md rounded-full flexCenter duration-200 hover:bg-black'>
                <WhatsappIcon width={"28px"} height={"28px"}/>
            </div>
        </div>
    </Link>
  )
}

export default KonsultasiBar