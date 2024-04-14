import Image from 'next/image'
import React from 'react'

type cardProps = {
    pembimbing_id: string;
    img: string;
    nama: string;
}

const Card_Pembimbing = ({pembimbing_id, img, nama}: cardProps) => {
  return (
    <>
        <div key={pembimbing_id} className='embla__slide m-2'>
            <div className='bg-white h-80 border rounded-xl shadow-lg'>
              <Image src={img} alt='pembimbing' width={450} height={450} className='rounded-xl object-cover'/>
              <div className='text-center items-center my-6'>
                <h1 className='font-bold text-2xl text-[#FC7720]'>{nama}</h1>
              </div>
            </div>
        </div>
    </>
  )
}

export default Card_Pembimbing