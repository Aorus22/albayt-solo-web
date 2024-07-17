import { Testimoni } from '@/utils/type'
import React from 'react'
import StarIcon1 from '@/public/icon/StarIcon1.svg'

const Card_Testi = ({ testimoni }: { testimoni: Testimoni }) => {
  return (
    <div className='embla__slide m-2'>
        <div className='p-4 md:p-8 items-center bg-white h-full rounded-xl shadow-lg'>
            <div className='flex items-center justify-center flex-col md:flex-row md:ml-8 my-2 rounded-sm'>
                <img src={testimoni.img} alt='testi' className='w-16 h-16 object-cover rounded-full' />
                <div className='flex w-full items-center justify-center text-center'>
                    <div className='font-bold text-lg'>{testimoni.nama}</div>
                </div>
            </div>
            <div className='flex items-center justify-center md:justify-normal mt-4 mx-5 my-2 md:mr-5'>
                <div className='flex gap-2 py-2 px-2 h-fit w-fit bg-[#89060b] rounded-full '>
                    {Array.from({length: testimoni.bintang}, (_, index) => (
                        <div key = {`bintang-${index}`} className='w-4 h-4'>
                            <StarIcon1 />
                        </div>
                    ))}
                </div>
            </div>
            <div className='mx-5 my-2 md:mr-5'>
                <p className='font-medium text-[12px] my-4 text-justify'>{testimoni.review}</p>
            </div>
        </div>
    </div>
  )
}

export default Card_Testi