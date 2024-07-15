import Image from 'next/image'
import React from 'react'
import { VISI_MISI } from '@/constants'

const page = () => {
  return (
    <>
      <section className="max-container padding-container bg-[url('/images/bg-aboutus.png')] bg-center bg-no-repeat">
        <div className='grid grid-cols-1 md:grid-cols-2 items-center'> 
            <div className='text-center items-center my-5 lg:my-0 order-2 md:order-1'>
                <h3 className='font-bold text-lg lg:text-3xl text-[#89060b] tracking-wide'>
                    <span className='text-[#f14310]'>CEO</span> at Albayt Solo
                </h3>
                <h1 className='font-bold text-4xl lg:text-7xl text-[#89060b] mt-1 mb-2 lg:mt-3 lg:mb-2 whitespace-nowrap'>
                    <span className='text-[#f14310]'>Nur</span> Hidayati
                </h1>
            </div>

            <div className='flexCenter order-1 md:order-2'>
                <Image src={'/images/foto-ceo.png'} alt='pemilik' width={800} height={800} className='h-[350px] md:h-[500px] w-auto'/>        
            </div>   
        </div>
        </section>

      <section className='max-container padding-container pb-7 pt-12 lg:pb-9 lg:pt-16 bg-gradient-to-b from-[#ffc750] from-[45%] to-transparent'>
        <div id='Judul Section' className='items-center text-center lg:py-3'>
            <h1 className='font-medium text-white text-[2.5rem] lg:text-6xl'>
                TENTANG <span className='text-[#f14310] font-bold'>KAMI</span>
            </h1>
        </div>

        <div id='konten' className='flexCenter my-3 lg:my-7'>
            <div className='bg-[#f14310] rounded-xl w-[90%] md:pr-2'>
                <div className='md:flex bg-white rounded-t-xl'>
                    <div className='flex justify-center items-center rounded-xl w-full md:rounded-l-xl md:w-[40%]'>
                        <Image src={'/images/sample-hajj2.png'} alt='sample' width={450} height={450} className='h-full object-cover rounded-xl md:rounded-l-xl'/>
                    </div>
                    <div className='m-3 md:w-[60%] text-center py-8'>
                        <h3 className='font-bold text-[#f14310] text-2xl lg:text-3xl'>TENTANG ALBAYT</h3>
                        <p className='font-medium text-gray-50 text-[12px] md:text-[14px] lg:text-[16px] text-justify mx-3 md:mx-5 my-2 md:my-3'>
                            PT Albayt Wisata Universal adalah perusahaan jasa tour & travel yang meliputi wisata domestik, internasional, dan wisata religi (umrah & haji) dengan mengedepankan konsep wisata syariah / wisata halal.
                            Dimana setiap paket perjalanan wisata mengutamakan Prayer Time dan Halal Food.
                        </p>
                        <p className='font-medium text-gray-50 text-[12px] md:text-[14px] lg:text-[16px] text-justify mx-3 md:mx-5 my-2 md:my-3'>
                            Berdiri sejak tahun 2013 sebagai Agent Tiketing & Biro Perjalanan Wisata, dan pada tahun 2016 mendapatkan SK Izin penyelenggara Ibadah Umrah dengan Nomor 169 Tahun 2016.
                        </p>
                        <p className='font-medium text-gray-50 text-[12px] md:text-[14px] lg:text-[16px] text-justify mx-3 md:mx-5 my-2 md:my-3'>
                            Albayt Tours telah siap melayani tamu-tamu Allah dan kami memiliki izin resmi sebagai penyelenggara umrah yang dikeluarkan oleh Kemenag RI. 
                            Fokus kami adalah kenyamanan ibadah dan kepuasan jamaah pada bimbingan dan pelayanan.
                        </p>
                        <p className='font-medium text-gray-50 text-[12px] md:text-[14px] lg:text-[16px] text-justify mx-3 md:mx-5 my-2 md:my-3'>
                            Setiap tahunnya Albayt Tours telah melayani tour muslim ke berbagai manca negara dan jamaah umrah ke Arab Saudi.
                            Kami selalu memberikan pelayanan maksimal dan profesional kepada para jamaah.
                            Salah satunya dengan memberikan <span className='font-bold'>HARGA YANG EKONOMIS DENGAN PELAYANAN TERBAIK.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className='max-container padding-container py-7'>
        <div id='judul section' className='items-center text-center'>
            <h1 className='font-bold text-[#f14310] text-[2rem] md:text-5xl lg:text-6xl'>
                VISI <span className='font-medium text-[#89060b]'>&</span> MISI <span className='font-medium text-[#89060b]'>ALBAYT</span>
            </h1>
        </div>

        <div id='konten' className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-3 py-1 md:my-7 md:py-3'>

        {VISI_MISI.map((vimi) => (
            <div key={vimi.content_key} className='bg-white border shadow-lg rounded-xl py-4 px-10'>
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

export default page