'use client'

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { DUMMY_PEMBIMBING } from '@/constants';
import Card_Pembimbing from "@/Components/dump/Card_Pembimbing";

const Pembimbing = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <>
      <section className='max-container padding-container mx-auto py-12 px-8 bg-gradient-to-t from-[#FC7720] from-[5%] to-transparent'>

        {/* JUDUL SECTION */}
        <div className='items-center text-center'>
          <h1 className='font-medium text-5xl text-[#3C3633]'>
            PEMBIMBING <span className='font-bold text-[#FC7720]'>ALBAYT</span>
          </h1>
          <p className='my-1 font-medium text-xl text-[#747264] tracking-widest'>
            Melayani <span className='text-[#FC7720]'>Sepenuh</span> Hati
          </p>
        </div>

        {/* ISI KONTEN / CAROUSEL */}
        <div className='embla'>
          <div className='embla__viewport mx-auto mt-7 max-w-lg' ref={emblaRef}>
            <div className='embla__container h-full'>

              {DUMMY_PEMBIMBING.map((pembimbing) => (
                <Card_Pembimbing pembimbing_id={pembimbing.key} img={pembimbing.image} nama={pembimbing.nama} />
              ))}

            </div>
          </div>

          {/* TOMBOL GESER KARTU */}
          <div className='w-full flexCenter mt-5 gap-10'>
            <button className='embla__prev h-10 w-10 rounded-full bg-black' onClick={scrollPrev}>
              <span className='text-white items-center text-center'>p</span>
            </button>
            <button className='embla__next h-10 w-10 rounded-full bg-black' onClick={scrollNext}>
              <span className='text-white items-center text-center'>n</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pembimbing