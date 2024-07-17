'use client'

import { KENAPA_KAMI } from '@/constants'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Card_Why from "@/Components/Card_Why";
import Card_Why_sm from "@/Components/Card_Why_sm";

const WhyUs = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
      <section className='max-container padding-container mx-auto py-8 px-8'>
            <div id='title' className='text-center items-center'>
                <h1 className='font-medium text-4xl lg:text-5xl text-[#89060b]'>
                    MENGAPA <span className='font-bold text-[#f14310]'>KAMI?</span>
                </h1>
            </div>

            {/* ISI KONTEN / CARD */}
            <div id='normal_content' className='hidden md:grid md:grid-cols-3 gap-6 mt-16 mb-10 justify-items-center'>
                {KENAPA_KAMI.map((why) => (
                    <Card_Why key={why.key} why_key={why.key} img={why.icon} title={why.title} desc={why.description}/>
                ))}
            </div>
            
            {/* ISI KONTEN MOBILE */}
            <div id='sm_content' className='embla mt-3 md:hidden'>
                <div className='embla__viewport mx-auto' ref={emblaRef}>
                    <div className='embla__container h-full'>
                        {KENAPA_KAMI.map((why) => (
                            <Card_Why_sm key={why.key} why_key={why.key} img={why.icon} title={why.title} desc={why.description}/>
                        ))}
                    </div>
                </div>
            </div>
      </section>
  )
}

export default WhyUs