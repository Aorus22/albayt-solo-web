
import Image from 'next/image'
import React from 'react'

type cardProps = {
    why_key: string;
    img: string;
    title: string;
    desc: string;
}

const Card_Why_sm = ({why_key, img, title, desc}: cardProps) => {
  return (
    <>
        <div key={why_key} className='embla__slide mx-2 my-7'>
            <div className='bg-white h-[18rem] border rounded-xl shadow-lg'>
              <div className='bg-[#89060b] h-[90%] rounded-t-xl'>

                <div className='flexCenter pb-9'>
                  <div className='flexCenter relative'>
                    <div className='absolute bg-[#f14310] h-14 w-14 border rounded-full flexCenter shadow-lg'>
                      <Image src={img} alt='icon' width={32} height={32} className='object-cover' />
                    </div>
                  </div>
                </div>

                <div className='text-center items-center'>
                  <h1 className='font-bold text-2xl text-transparent bg-gradient-to-r from-yellow-700 via-[#ffc750] to-yellow-700 bg-clip-text'>{title}</h1>
                  <p className='font-normal text-[12px] text-white my-3 mx-5 text-justify'>{desc}</p>
                </div>

              </div>
            </div>
        </div>
    </>
  )
}

export default Card_Why_sm
