'use client'

import Card_Galery from '@/Components/gallery-comp/Card_Galery'
import { GALERI_2024 } from '@/constants'
import Image from 'next/image'
import React, {useState} from 'react'

const page = () => {
    const [data, setData] = useState({image: '', i: ''})

    const viewImage = (image: string, i: string) => {
        setData({image, i});
    }

    const imageAction = (action: boolean) => {
        if (!action) {
            setData({image: '', i: ''})
        }
    }

  return (
    <>  
        {data.image &&
            <div className='w-full h-full bg-black bg-opacity-90 fixed flex justify-center items-center overflow-hidden z-50'>
                <button onClick={() => imageAction(false)} className='absolute top-[10px] right-[10px] w-16 h-16 p-3'>
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fillRule="nonzero"/></svg>
                </button>
                <Image src={data.image} alt='foto' width={450} height={450} className='w-auto max-w-[90%] max-h-[90%]'/>
            </div>
        }

        <section className='max-container padding-container py-8'>

            {/* JUDUL SECTION */}
            <div id='judul section' className='text-center items-center'>
                <h1 className='font-bold text-[#f14310] text-2xl sm:text-4xl lg:text-5xl mb-7'>UMROH BERSAMA 2024</h1>
            </div>

            {/* GRID FOTO YANG DITAMPILKAN */}
            <div id='foto' className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {GALERI_2024.map((foto) => (
                    <div onClick={() => viewImage(foto.link, foto.key)}>
                        <Card_Galery foto_id={foto.key} img={foto.link} title={foto.title} />
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default page