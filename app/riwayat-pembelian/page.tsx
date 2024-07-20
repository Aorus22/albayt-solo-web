"use client"
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import LoadingBar from "@/Components/LoadingBar";
import "animate.css/animate.min.css";
import {ambilRiwayatPembelian} from "@/db/query";
import { formateDateTime, formatRupiah } from '@/utils/util';
import { DataPembelian } from '@/utils/type';
import TransaksiIcon from '@/public/icon/TransaksiIcon.svg'
import WhatsappIcon from '@/public/icon/WhatsappIcon.svg'

const Page = () => {
    const { user } = UserAuth()
    const [riwayatPembelian, setRiwayatPembelian] = useState<DataPembelian[]>([]);
    const [isLoading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        if (!user) return
        
        (async () => {
            try {
                const response = await ambilRiwayatPembelian(user.uid);
                setRiwayatPembelian(response as DataPembelian[]);
            } catch (Error) {
                console.error('Error fetching data:', Error);
            } finally {
                setLoading(false);
            }
        })()
    }, [user]);

  return (
    <div>
        <section className='max-container padding-container py-8 min-h-[75vh]'>
            <h1 className='font-bold text-[#f13410] text-4xl lg:text-5xl text-center'>RIWAYAT PEMBELIAN</h1>
            <div className='my-10'>
                {isLoading && <LoadingBar />}
            </div>
            <div className='flex flex-col gap-8 my-10 justify-center items-center'>
                { (riwayatPembelian?.length || 0) < 1 && !isLoading  && (
                    <div className='flex flex-col gap-4 text-center w-full'>
                        <p>Tidak terdapat riwayat pembelian</p>
                        <Link href={'/paket'}>
                            <button className='text-white font-semibold rounded-md px-6 py-2 bg-[#f13410]'>
                                Pesan Paket
                            </button>
                        </Link>
                    </div>
                )} 
                {riwayatPembelian.map((beli) => (
                    <div key={beli.detailPembelian.purchaseID} className='flex flex-col gap-2 border rounded-lg p-6 animate__animated animate__fadeInUp w-full max-w-4xl'>
                        <div
                            className='grid grid-cols-2 grid-flow gap-3 md:flex items-center text-[14px] md:text-[16px]'>
                            <div className='flex gap-2 items-center'>
                                <TransaksiIcon className='fill-green-600' />
                                <p className='font-medium justify-self-end'>
                                    {formateDateTime(beli?.detailPembelian?.tanggalPemesanan?.seconds)}
                                </p>
                            </div>
                            <p className={`py-1 px-2 font-bold text-center ${beli.detailPembelian.statusPembayaran === 'Berhasil' ? 'text-green-600 bg-green-100' : beli.detailPembelian.statusPembayaran === 'Menunggu Konfirmasi' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>{beli.detailPembelian.statusPembayaran}</p>
                        </div>

                        <div className='mt-2 mb-6 md:mb-1'>
                            <p className='mb-2 text-[12px] md:text-[15px] font-semibold text-gray-50 w-full md:w-[70%]'>
                                {beli.detailPaket?.title}
                            </p>
                            <p className='font-medium text-[12px] md:text-[14px] text-gray-50 text-justify w-full md:w-[70%]'>
                                {`${beli?.detailPembelian?.detailJamaah?.dewasa?.length} seat untuk jamaah dewasa`}
                            </p>
                                {beli?.detailPembelian?.detailJamaah?.anak && beli?.detailPembelian?.detailJamaah?.anak?.length > 0 && (
                                    <p className='font-medium text-[12px] md:text-[14px] text-gray-50 text-justify w-full md:w-[70%]'>
                                        {`${beli?.detailPembelian?.detailJamaah?.anak?.length} seat untuk jamaah anak-anak`}
                                    </p>
                                 )}
                        </div>

                        <div className='flex flex-col place-items-end'>
                            <div className='flexCenter flex-col gap-4 md:gap-5'>
                                <div className={'w-full flex justify-end'}>
                                    <div className='w-fit pr-3'>
                                        <div className={'flexCenter flex-col'}>
                                            <p className='text-gray-50 text-[12px] lg:text-[14px]'>Total Harga</p>
                                            <p className='font-bold'>{formatRupiah(beli.detailPembelian.totalPembayaran)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"w-full flex gap-2"}>
                                    {(beli.detailPembelian.statusPembayaran === "Belum Dibayar" || beli.detailPembelian.statusPembayaran === "Berkas Ditolak") && (
                                        <Link href={`/pembayaran-final/${beli.detailPembelian.purchaseID}`}>
                                            <button
                                                className='py-2 px-10 font-semibold text-yellow-100 text-[12px] lg:text-[14px] bg-yellow-600 rounded-lg duration-200 hover:bg-black'>Bayar Sekarang
                                            </button>
                                        </Link>
                                    )}
                                    {beli.detailPembelian.statusPembayaran === "Menunggu Konfirmasi" && (
                                        <Link href={`https://wa.me/628122586045?text=Assalammualaikum, Saya ingin mengonfirmasi pembelian dengan ID pembelian ${beli.detailPembelian.purchaseID}`} target='blank' rel="noopener noreferrer">
                                            <button className='flex items-center gap-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-green-50 rounded-lg duration-200 hover:bg-black'>
                                                <WhatsappIcon />
                                                <p>Konfirmasi WhatsApp</p>
                                            </button>
                                        </Link>
                                    )}
                                    <Link href={`/detail-transaksi/${beli.detailPembelian.purchaseID}`}>
                                        <button
                                            className='py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-[#f14310] rounded-lg duration-200 hover:bg-black'>
                                                Lihat Detail Transaksi
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}

export default Page