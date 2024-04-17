import Image from 'next/image'
import React from 'react'

const TentangKami = () => {
  return (
    <>
        <section className='max-container padding-container pb-7 pt-12 lg:pb-9 lg:pt-16 bg-gradient-to-b from-[#ffc750] from-[45%] to-transparent'>

            {/* JUDUL SECTION */}
            <div id='Judul Section' className='items-center text-center lg:py-3'>
                <h1 className='font-medium text-white text-[2.5rem] lg:text-6xl'>
                    TENTANG <span className='text-[#f14310] font-bold'>KAMI</span>
                </h1>
            </div>

            {/* KONTEN */}
            <div id='konten' className='flexCenter my-3 lg:my-7'>
                <div className='bg-[#f14310] rounded-xl w-[90%] pb-4 md:pb-8'>
                    <div className='md:flex bg-white rounded-t-xl'>
                        <div className='rounded-xl w-full md:rounded-l-xl md:w-[40%]'>
                            <Image src={'/images/sample-hajj2.png'} alt='sample' width={450} height={450} className='h-full object-cover rounded-xl md:rounded-l-xl'/>
                        </div>
                        <div className='m-3 md:w-[60%] text-center'>
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
    </>
  )
}

export default TentangKami