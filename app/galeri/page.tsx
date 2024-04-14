import { FOLDER_GALERI } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <section className='max-container padding-container py-7'>

            {/* JUDUL SECTION */}
            <div id='judul section' className='text-center items-center my-5'>
                <h1 className='font-bold text-4xl lg:text-6xl text-[#f14310]'>GALERI</h1>
            </div>

            {/* KONTEN */}
            <div id='konten' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
                
                {FOLDER_GALERI.map((folder) => (
                    <Link href={folder.folder_link}>
                        <div key={folder.folder_key} className='bg-white h-[20rem] lg:h-[21rem] border shadow-lg rounded-md duration-300 hover:-translate-y-2 hover:shadow-xl'>
                            <div className='h-35'>
                                <Image src={folder.thumbnail} alt='thumbnail' width={450} height={450} className='object-cover rounded-md' />
                            </div>
                            <div className='text-center items-center my-2 mx-3'>
                                <h3 className='font-bold text-lg md:text-lg text-[#f14310]'>{folder.title}</h3>
                                <p className='text-gray-50 text-[12px]'>{folder.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
            
        </section>
    </>
  )
}

export default page