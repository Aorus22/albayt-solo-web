import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
        <section className="max-container padding-container bg-[url('/images/bg-aboutus.png')] bg-center bg-no-repeat">
            <div className='grid grid-cols-1 md:grid-cols-2 items-center'> 

                {/* Grid Hero Kiri */}
                <div className='text-center items-center my-5 lg:my-0 order-2 md:order-1'>
                    <h3 className='font-bold text-lg lg:text-3xl text-[#89060b] tracking-wide'>
                        <span className='text-[#f14310]'>CEO</span> at Albayt Solo
                    </h3>
                    <h1 className='font-bold text-4xl lg:text-7xl text-[#89060b] mt-1 mb-2 lg:mt-3 lg:mb-2 whitespace-nowrap'>
                        <span className='text-[#f14310]'>Nur</span> Hidayati
                    </h1>
                </div>

                {/* Grid Kanan */}
                <div className='flexCenter order-1 md:order-2'>
                    <Image src={'/images/foto-ceo.png'} alt='pemilik' width={800} height={800} className='h-[350px] md:h-[500px] w-auto'/>        
                </div>   
            </div>
        </section>
    </>
  )
}

export default Hero