import React from 'react'
import {TestiProps} from "@/Components/Testimoni";

const Card_Testi = ({ Testimoni }: { Testimoni: TestiProps }) => {
  return (
    <>
        <div key={Testimoni.key} className='embla__slide m-2'>
            <div className='p-4 md:p-8 items-center bg-white h-full rounded-xl shadow-lg'>
                <div className='flex items-center justify-center flex-col md:flex-row md:ml-8 my-2 rounded-sm'>
                    <img src={Testimoni.img} alt='testi' className='w-16 h-16 object-cover rounded-full' />
                    <div className='flex w-full items-center justify-center text-center'>
                        <div className='font-bold text-lg'>{Testimoni.nama}</div>
                    </div>
                </div>
                <div className='flex items-center justify-center md:justify-normal mt-4 mx-5 my-2 md:mr-5'>
                    <div className='flex gap-2 py-2 px-2 h-fit w-fit bg-[#89060b] rounded-full '>
                        {Array.from({length: Testimoni.bintang}, (_, index) => (
                            <div className='w-4 h-4'>
                                <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fillRule="nonzero"/></svg>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mx-5 my-2 md:mr-5'>
                    <p className='font-medium text-[12px] my-4 text-justify'>{Testimoni.review}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card_Testi