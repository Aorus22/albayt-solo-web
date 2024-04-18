import React from 'react'

const page = () => {
  return (
    <>
      <section className='max-container padding-container py-8'>
        <div className='flex flex-col gap-7 px-60'>
          <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>EMAIL</h3>
              <p className='text-gray-50'>Fulana1232@gmail.com</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>NAMA</h3>
              <input type='text' placeholder='Nama' name='name' className='px-4 py-2 w-[70%] border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2'/>
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>NOMOR TELEPON</h3>
              <input type='text' placeholder='Nomor Telepon' name='telp' className='px-4 py-2 w-[70%] border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2' />
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>ALAMAT</h3>
              <input type='text' placeholder='Alamat' name='telp' className='px-4 py-2 w-[70%] border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2' />
            </div>

            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-lg'>TENTANG ANDA</h3>
              <textarea placeholder='Tentang Anda' name='about_me' rows={7} className='px-2 py-2 w-[70%] resize-none border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2'/>
            </div>

            <div>
              <button className='flex gap-2 items-center px-4 py-2 bg-[#f14310] text-white rounded-lg duration-200 hover:bg-black'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='fill-white'><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                <p>Simpan Perubahan</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page