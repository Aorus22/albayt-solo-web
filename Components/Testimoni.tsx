'use client'

import React, {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import LoadingBar from "@/Components/LoadingBar";
import {usePaketContext} from "@/context/PaketContext";
import Card_Testi from "@/Components/Card_Testi";
import ArrowLeftCircle from '@/public/icon/ArrowLeftCircle.svg'
import ArrowRightCircle from '@/public/icon/ArrowRightCircle.svg'

const Testimoni = () => {
    const { testimoni } = usePaketContext()
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    useEffect(() => {
        if (testimoni.length > 0){
            setIsLoading(false)
        }
    }, [testimoni]);

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
                                    {testimoni?.map((testimoni) => (
                                        <Card_Testi key={testimoni.id} testimoni={testimoni}/>
                                    ))}
                                </div>
                            </div>

                            {/* TOMBOL CAROUSEL */}
                            <div className='w-full hidden lg:flexCenter mt-2 gap-10'>
                                <button title='prev' className='embla__prev h-10 w-10 rounded-full'
                                        onClick={scrollPrev}>
                                            <ArrowLeftCircle className='fill-[#89060b] duration-200 hover:fill-white' />
                                </button>
                                <button title='next' className='embla__next h-10 w-10 rounded-full'
                                        onClick={scrollNext}>
                                            <ArrowRightCircle className='fill-[#89060b] duration-200 hover:fill-white'/>
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