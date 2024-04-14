'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import { GALERI_2024 } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

const PreviewGaleri = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay({delay: 2500})])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

  return (
    <>
        <section className='max-container padding-container py-8 bg-gradient-to-b from-[#ffc750] from-[50%]'>

            {/* JUDUL SECTION */}
            <div id='judul section' className='text-center items-center my-5'>
                <h1 className='font-bold text-4xl lg:text-6xl text-[#f14310]'>GALERI</h1>
            </div>

            {/* KONTEN */}
            <div id='konten' className='embla mt-10'>
                <div className='embla__viewport mx-auto' ref={emblaRef}>
                    <div className='embla__container h-full'>

                        {GALERI_2024.map((foto) => (
                            <div key={foto.key} className='embla__slide3 md:embla__slide2 mx-2'>
                                <div className='flexCenter'>
                                    <div className='card_galery'>
                                        <div className='image_box'>
                                            <Image src={foto.link} alt='preview' width={450} height={450} className='The_Image' />
                                            <p className='image_text'>{foto.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    
                    <div className='w-full hidden lg:flexCenter mt-3 gap-10'>
                        <button title='prev' className='embla__prev h-10 w-10 rounded-full' onClick={scrollPrev}>
                            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-[#89060b] duration-200 hover:fill-white'><path d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z" fill-rule="nonzero"/></svg>
                        </button>
                        <button title='next' className='embla__next h-10 w-10 rounded-full' onClick={scrollNext}>
                            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-[#89060b] duration-200 hover:fill-white'><path d="m12.012 1.995c-5.518 0-9.998 4.48-9.998 9.998s4.48 9.998 9.998 9.998 9.997-4.48 9.997-9.998-4.479-9.998-9.997-9.998zm0 1.5c4.69 0 8.497 3.808 8.497 8.498s-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm1.528 4.715s1.502 1.505 3.255 3.259c.146.147.219.339.219.531s-.073.383-.219.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.336.217-.527.217-.191-.001-.383-.074-.53-.221-.293-.293-.295-.766-.004-1.057l1.978-1.977h-6.694c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.694l-1.979-1.979c-.289-.289-.286-.762.006-1.054.147-.147.339-.221.531-.222.19 0 .38.071.524.215z" fill-rule="nonzero"/></svg>
                        </button>
                    </div>

                </div>
            </div>
            
            <Link href={'/galeri'}>
                <div className='flexCenter my-8'>
                    <button className='font-bold text-white  text-[16px] lg:text-xl bg-[#f14310] px-4 py-3 rounded-full border duration-200 ease-in-out hover:bg-white hover:text-[#f14310] hover:border hover:border-[#f14310]'>
                        Lihat Selengkapnya
                    </button>
                </div>
            </Link>
        </section>
    </>
  )
}

export default PreviewGaleri