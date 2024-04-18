import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='max-container padding-container py-8'>
        <h1 className='font-bold text-5xl text-[#f14310] text-center'>PROFIL</h1>

        <div className='grid grid-cols-2 my-8'>

          <div className='flex flex-col justify-center items-center gap-5'>
            <Image src={'/images/pembimbing1.png'} alt='profil-photo' width={500} height={500} className='w-80 h-80 rounded-full object-cover'/>
            <button className='flex gap-2 py-2 px-4 text-white bg-[#f14310] items-center rounded-lg duration-200 hover:bg-black'>
              <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
              <p className='font-semibold tracking-wider'>Change Picture</p>
            </button>
          </div>

          <div className='flex flex-col gap-7'>
            <div>
              <h3 className='font-semibold text-lg'>EMAIL</h3>
              <p className='text-gray-50'>Fulana1232@gmail.com</p>
            </div>

            <div>
              <h3 className='font-semibold text-lg'>NAMA PERTAMA</h3>
              <p className='text-gray-50'>Fulan bin Fulano</p>
            </div>

            <div>
              <h3 className='font-semibold text-lg'>NOMOR TELEPON</h3>
              <p className='text-gray-50'>+62 8123-4132-0982</p>
            </div>

            <div>
              <h3 className='font-semibold text-lg'>ALAMAT</h3>
              <p className='text-gray-50'>Jln. Kebangsaan No. 6 Jebres, Surakarta, Jawa Tengah</p>
            </div>

            <div>
              <h3 className='font-semibold text-lg'>TENTANG ANDA</h3>
              <p className='text-gray-50 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit natus officia totam fugit necessitatibus incidunt eaque quo est officiis voluptatibus. Totam molestias enim obcaecati suscipit vero, esse dolore. Ducimus repellendus aliquam architecto quidem maiores quisquam corporis cumque ab aperiam veritatis totam nisi, illo quasi deleniti ut amet nesciunt doloribus reiciendis.</p>
            </div>

            <div className='flex justify-end'>
              <Link href={'/edit-profile-info'}>
                <button className='flex items-center gap-2 px-4 py-2 bg-[#f13410] text-white rounded-lg duration-200 hover:bg-black'>
                  <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
                  <p className='font-semibold'>Edit Profil</p>
                </button>
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default page