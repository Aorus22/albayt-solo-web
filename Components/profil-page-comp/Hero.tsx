import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
        <section className='max-container padding-container bg-[#ffc750]'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center'>

                {/* grid Hero Kiri */}
                <div className='flexStart'>
                    <Image src={'/images/pemilik.png'} alt='pemilik' width={475} height={475} className='h-auto'/>        
                </div>    

                {/* Grid Hero Kanan */}
                <div className='text-center items-center my-5 lg:my-0'>
                    <h3 className='font-bold text-lg lg:text-3xl text-white tracking-wide'>
                        <span className='text-[#f14310]'>CEO</span> at Albayt Wisata Universal
                    </h3>
                    <h1 className='font-bold text-4xl lg:text-6xl text-white mt-1 mb-2 lg:mt-3 lg:mb-2 whitespace-nowrap'>
                        <span className='text-[#f14310]'>Nining</span> Kartiningsih
                    </h1>
                    <Link href={'/'} target='blank'>
                        <div className='flexCenter mt-4 lg:mt-8'>
                            <div className='flex bg-white items-center py-1 px-2 lg:py-2 lg:px-4 rounded-xl shadow-lg gap-2 duration-200 hover:-translate-y-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-[#f14310]'><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                <p className='text-[#f14310] font-bold text-[15px] lg:text-lg'>@nining_albayt</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero