'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { HERO_SLIDE } from '@/constants'
import Image from 'next/image'

const Hero = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 2500})])

  return (
    <>
      <section className='max-container mx-auto'>
        <div className='embla'>
          <div className='embla__viewport mx-auto' ref={emblaRef}>
            <div className='embla__container h-full'>

              {HERO_SLIDE.map((slide) => (
                <div key={slide.key} className='embla__slide3 m-1'>
                  <Image src={slide.img} alt='slide' width={1440} height={850} className='h-28 md:h-48 lg:h-80 object-cover' />
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero