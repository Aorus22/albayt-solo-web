import Image from 'next/image'
import React from 'react'

type cardProps = {
    testi_id: string;
    img: string;
    nama: string;
    desc: string;
}

const Card_Testi = ({testi_id, img, nama, desc}: cardProps) => {
  return (
    <>
        <div className='embla__slide m-2'>
            <div key={testi_id} className='bg-white border items-center rounded-xl shadow-lg'>
                <div className='m-1'>
                    <Image src={img} alt='testimoni' width={450} height={450} className='rounded-xl object-cover'/>
                </div>
                <div className='text-center items-center h-72'>
                    <h1 className='font-bold text-xl md:text-2xl my-2 text-[#FC7720]'>{nama}</h1>
                    <p className='font-medium my-2 mx-7 md:mx-12 text-justify text-sm md:text-lg leading-7 text-[#747264] overflow-hidden'>{desc}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card_Testi