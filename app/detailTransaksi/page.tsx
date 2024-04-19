import React from 'react'

const page = () => {
  return (
    <>
      <section className='max-container padding-container py-8'>
        <h1 className='font-bold text-[#f14310] text-5xl text-center'>DETAIL TRANSAKSI</h1>

        <div className='mx-72 p-6 border rounded-xl my-10'>
          <div className='flex flex-col gap-5 mx-50'>
            <div>
              <h3 className='font-medium text-gray-50 text-[14px]'>Status</h3>
              <p className='font-semibold'>Transaksi Berhasil</p>
            </div>

            <div>
              <h3 className='font-medium text-gray-50 text-[14px]'>Tanggal Transaksi</h3>
              <p className='font-semibold'>09 Feb 2023 08.33 WIB</p>
            </div>
          </div>

          <div className='border-b rounded-full my-7'/>

          <div>
            <h3 className='font-semibold text-lg'>Detail Pembelian</h3>

            <div className='flex gap-5 my-4'>
              <div className='flex flex-col gap-1 w-[60%]'>
                <h3 className='font-medium text-[14px] text-gray-50'>Jenis Paket</h3>
                <p className='font-semibold text-[14px] text-justify'>Umroh Eksekutif Akhir Desember 2024 Plus City tour UIM + Museum Wahyu</p>
              </div>

              <div className='flex flex-col gap-1 w-[40%]'>
                <h3 className='font-medium text-[14px] text-gray-50'>Metode Pembayaran</h3>
                <p className='font-semibold'>Xendit</p>
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex flex-col gap-1'>
                <h3 className='font-medium text-[14px] text-gray-50'>Nominal</h3>
                <p className='font-semibold'>Rp 24.700.700,00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page