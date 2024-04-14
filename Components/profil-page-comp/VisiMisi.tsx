import { VISI_MISI } from '@/constants'
import React from 'react'

const VisiMisi = () => {
  return (
    <>
        <section className='max-container padding-container py-7'>
            
            {/* JUDUL SECTION */}
            <div id='judul section' className='items-center text-center'>
                <h1 className='font-bold text-[#f14310] text-[2rem] md:text-5xl lg:text-6xl'>
                    VISI <span className='font-medium text-[#89060b]'>&</span> MISI <span className='font-medium text-[#89060b]'>ALBAYT</span>
                </h1>
            </div>

            {/* KONTEN */}
            <div id='konten' className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 py-1 md:my-7 md:py-3'>

            {VISI_MISI.map((vimi) => (
                <div key={vimi.content_key} className='bg-white border shadow-lg rounded-xl'>
                    <div className='text-center items-center py-3'>
                        <h3 className='font-bold text-2xl md:text-3xl text-[#f14310]'>{vimi.title}</h3>
                    </div>
                    <div className='px-3 pb-5 text-justify'>
                        <ul className='mx-5'>
                            {vimi.content.map((contents) => (
                                <li key={contents.label} className='list-disc my-2 text-[12px] md:text-[14px] lg:text-[16px] font-medium text-gray-50'>{contents.value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

            </div>
        </section>
    </>
  )
}

export default VisiMisi