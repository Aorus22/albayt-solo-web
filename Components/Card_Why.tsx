import Image from 'next/image'
import React from 'react'

type cardProps = {
    why_key: string;
    img: string;
    title: string;
    desc: string;
}

const Card_Why = ({why_key, img, title, desc}: cardProps) => {
  return (
    <>
        <div key={why_key} className='bg-white w-56 lg:w-80 h-[28rem] my-5 rounded-xl border shadow-lg'>
            <div className='bg-[#89060b] m-[2px] rounded-t-xl h-[90%]'>
                <div className='flexCenter'>
                    <div className='w-[5rem] h-[5rem] lg:w-24 lg:h-24 rounded-full bg-[#f14310] flexCenter m-3 shadow-md border -translate-y-14'>
                        <Image src={img} alt='icon' width={48} height={48} />
                    </div>
                </div>

                <div className='text-center items-center h-48 lg:h-72'>
                    <div className='h-40'>
                        <h1 className='font-bold text-center md:text-2xl lg:text-4xl text-transparent bg-gradient-to-r from-yellow-700 via-[#ffc750] to-yellow-700 bg-clip-text'>
                            {title}
                        </h1>
                        <p className='text-white text-justify my-3 mx-6 lg:mx-12 leading-7 text-sm lg:text-[16px]'>
                            {desc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card_Why