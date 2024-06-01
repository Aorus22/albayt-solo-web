'use client'

import React, {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// import { TESTIMONI } from '@/constants';
import Card_Testi_Alt from './Card_Testi_Alt';
import LoadingBar from "@/Components/LoadingBar";
import {usePaketContext} from "@/context/PaketContext";

export interface TestiProps {
    key: string,
    img: string,
    nama: string,
    bintang: number,
    review: string
}

const Testimoni = () => {
    const {testimoni:TESTIMONI} = usePaketContext()
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (TESTIMONI !== null){
            setIsLoading(false)
        }
    }, [TESTIMONI]);

    return (
        <>
            <section
                className="max-container padding-container mx-auto py-4 px-8 bg-gradient-to-t from-[#ffc750] from-[55%] to-transparent pb-16">

                {/* JUDUL SECTION */}
                <div id='judul section' className='text-center items-center my-5'>
                    <h1 className='font-bold text-[#f14310] text-4xl md:text-6xl'>TESTIMONI</h1>
                </div>

                {isLoading ? (
                    <div className="my-10">
                        <LoadingBar/>
                    </div>
                ) : (
                    <div>
                        {/* CAROUSEL */}
                        <div id='isi konten' className='embla'>
                            <div className='embla__viewport mx-auto mt-2 max-w-lg' ref={emblaRef}>
                                <div className='embla__container h-full'>

                                    {TESTIMONI?.map((testimoni) => (
                                        <Card_Testi_Alt key={testimoni.key} Testimoni={testimoni}/>
                                    ))}

                                </div>
                            </div>

                            {/* TOMBOL CAROUSEL */}
                            <div className='w-full hidden lg:flexCenter mt-2 gap-10'>
                                <button title='prev' className='embla__prev h-10 w-10 rounded-full'
                                        onClick={scrollPrev}>
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                         strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className='fill-[#89060b] duration-200 hover:fill-white'>
                                        <path
                                            d="m12.017 1.995c5.517 0 9.997 4.48 9.997 9.998s-4.48 9.998-9.997 9.998c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.498-8.497-8.498zm-1.528 4.715s-1.502 1.505-3.255 3.259c-.147.147-.22.339-.22.531s.073.383.22.53c1.753 1.754 3.254 3.258 3.254 3.258.145.145.335.217.526.217.192-.001.384-.074.531-.221.292-.293.294-.766.003-1.057l-1.977-1.977h6.693c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6.693l1.978-1.979c.29-.289.287-.762-.006-1.054-.147-.147-.339-.221-.53-.222-.19 0-.38.071-.524.215z"
                                            fillRule="nonzero"/>
                                    </svg>
                                </button>
                                <button title='next' className='embla__next h-10 w-10 rounded-full'
                                        onClick={scrollNext}>
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                         strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                         className='fill-[#89060b] duration-200 hover:fill-white'>
                                        <path
                                            d="m12.012 1.995c-5.518 0-9.998 4.48-9.998 9.998s4.48 9.998 9.998 9.998 9.997-4.48 9.997-9.998-4.479-9.998-9.997-9.998zm0 1.5c4.69 0 8.497 3.808 8.497 8.498s-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm1.528 4.715s1.502 1.505 3.255 3.259c.146.147.219.339.219.531s-.073.383-.219.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.336.217-.527.217-.191-.001-.383-.074-.53-.221-.293-.293-.295-.766-.004-1.057l1.978-1.977h-6.694c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.694l-1.979-1.979c-.289-.289-.286-.762.006-1.054.147-.147.339-.221.531-.222.19 0 .38.071.524.215z"
                                            fillRule="nonzero"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default Testimoni