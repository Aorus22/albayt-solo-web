import { AGEN_PERWAKILAN } from '@/constants'
import Image from 'next/image'
import React from 'react'

const AgenPerwakilan = () => {
  return (
    <>
        <section className='max-container padding-container py-16'>

            {/* JUDUL SECTION */}
            <div className='items-center text-center my-5'>
                <h1 className='font-medium text-[#3C3633] text-5xl'>
                    AGEN <span className='font-bold text-[tomato]'>PERWAKILAN</span>
                </h1>
            </div>

            {/* ISI KONTEN */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 pt-7'>
                {AGEN_PERWAKILAN.map((agen) => (
                    <div className='items-center' key={agen.key}>
                        <div className='flexCenter gap-6'>
                            <Image src={'location.svg'} alt='logo' width={40} height={40} />
                            <h1 className='font-bold text-xl text-[tomato] text-center'>
                                {agen.title}
                            </h1>
                        </div>

                        <div className='my-4'>
                            <p className='font-medium text-gray-50'> {agen.lokasi}</p>
                            <h3 className='font-bold text-[tomato] text-lg mt-3'>Penanggung Jawab:</h3>
                            <p className='font-bold text-[tomato] text-lg'>{agen.pj}</p>
                        </div>

                        <div className='flex mt-5 gap-5'>
                            <Image src={'phone.svg'} alt='logo' width={24} height={24}/>
                            <p className='font-medium text-gray-50'>{agen.telp}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default AgenPerwakilan