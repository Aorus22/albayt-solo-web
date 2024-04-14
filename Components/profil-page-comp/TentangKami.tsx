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
                        <div className='rounded-xl md:rounded-l-xl md:w-[40%]'>
                            <Image src={'/images/sample-hajj2.png'} alt='sample' width={450} height={450} className='h-full object-cover rounded-xl md:rounded-l-xl'/>
                        </div>
                        <div className='m-3 md:w-[60%] text-center'>
                            <h3 className='font-bold text-[#f14310] text-2xl lg:text-3xl'>TENTANG ALBAYT</h3>
                            <p className='font-medium text-gray-50 text-[12px] md:text-[14px] lg:text-[16px] text-justify mx-3 md:mx-5 my-2 md:my-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis assumenda quae recusandae delectus dicta, explicabo esse consectetur, debitis consequuntur temporibus magnam ipsum unde reiciendis similique repellendus cupiditate voluptas laborum odio incidunt? Delectus praesentium, perspiciatis dolorum ad architecto porro recusandae libero harum ullam saepe magni odio, suscipit est hic beatae itaque tempore expedita ea explicabo! Consequuntur, aut ex. Nisi, nihil eum perspiciatis officiis cupiditate assumenda amet magnam reprehenderit praesentium, officia voluptate libero asperiores quaerat! Quod doloremque mollitia fuga animi dolores accusamus eum. In, quis. Soluta mollitia libero consequuntur, eius perspiciatis, cumque aliquam magnam veritatis nulla officiis veniam eligendi in vel accusamus?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default TentangKami