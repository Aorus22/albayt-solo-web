"use client"
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";

const page = () => {
    const { user } = UserAuth()
    const [riwayatPembelian, setRiwayatPembelian] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/riwayat_pembelian_user/${user?.uid}`);
                if (!response.ok) {
                    console.log('Failed to fetch data');
                }
                const data = await response.json();
                setRiwayatPembelian(data);
            } catch (Error) {
                console.error('Error fetching data:', Error);
            }
        };
        if (user != null) {
            fetchData().then();
        }
    }, [user]);

  return (
    <>
      <section className='max-container padding-container py-8'>
        <h1 className='font-bold text-[#f13410] text-4xl lg:text-5xl text-center'>RIWAYAT PEMBELIAN</h1>

        <div className='grid grid-cols-1 gap-8 my-10'>
          {riwayatPembelian.map((beli) => (
            <div className='flex flex-col gap-2 border rounded-lg p-6'>
              <div className='grid grid-cols-2 grid-flow gap-3 md:flex items-center text-[14px] md:text-[16px]'>
                <div className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-green-600'><path d="M19.5 11c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.696-.697.991.94 2.116-2.169.696.696-2.811 2.867zm-15.031-2.484h5v1h-5v-1zm8-1h-8v-1h8v1zm1.502 4h-11.002c-.276 0-.5-.224-.5-.5v-6.5h12.82c1.184-1.23 2.842-2 4.68-2 .886 0 1.729.179 2.5.501v-3.501c0-1.104-.896-2-2-2h-18c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h12.82c-.553-.576-1.006-1.251-1.318-2zm-11.502-11.5c0-.276.224-.5.5-.5h17c.276 0 .5.224.5.5v1.5h-18v-1.5z"/></svg>
                  <p className='font-semibold whitespace-nowrap md:whitespace-normal'>Uang Elektronik</p>
                </div>
                <p className='font-medium justify-self-end'>{new Date(beli.detailPembelian.tanggalPemesanan).toLocaleDateString() }</p>
                <p className={`py-1 px-2 font-bold text-center ${beli.detailPembelian.statusPembayaran === 'Berhasil' ? 'text-green-600 bg-green-100' : beli.detailPembelian.statusPembayaran === 'Menunggu Konfirmasi' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>{beli.detailPembelian.statusPembayaran}</p>
              </div>

              <div className='mt-2 mb-6 md:mb-1'>
                <p className='font-bold text-[14px] md:text-[16px]'>{beli.detailPaket.title}</p>
                <p className='font-medium text-[12px] md:text-[14px] text-gray-50 text-justify w-full md:w-[70%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aliquid modi architecto vel delectus, tenetur ad odio nihil ut ab ipsa vero doloremque quos rem ex commodi obcaecati! Magnam, maiores!</p>
              </div>

              <div className='flex flex-col place-items-end'>
                <div className='flexCenter flex-col gap-5 md:gap-10'>
                  <div className='flexCenter flex-col'>
                    <p className='text-gray-50 text-[12px] lg:text-[14px]'>Total Harga</p>
                    <p className='font-bold'>{beli.detailPembelian.totalPembayaran.toLocaleString('id-ID', {style: 'currency', currency:'IDR'})}</p>
                  </div>
                  <Link href={`/detailTransaksi/${beli.detailPembelian.purchaseID}`}>
                    <button className='py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-[#f14310] rounded-lg duration-200 hover:bg-black'>Lihat Detail Transaksi</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default page