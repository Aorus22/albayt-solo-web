"use client"
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import LoadingBar from "@/Components/LoadingBar";
import {PurchaseHistory} from "@/app/detailTransaksi/[purchaseID]/page";

const page = () => {
    const { user } = UserAuth()
    const [riwayatPembelian, setRiwayatPembelian] = useState<PurchaseHistory[]>([]);
    const [isLoading, setLoading ] = useState<boolean>(true)

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
            } finally {
                setLoading(false);
            }
        };
        if (user != null) {
            fetchData().then();
        }
    }, [user]);

  return (
    <div>
        {isLoading ? (<LoadingBar />) : (
            <section className='max-container padding-container py-8'>
                <h1 className='font-bold text-[#f13410] text-4xl lg:text-5xl text-center'>RIWAYAT PEMBELIAN</h1>

                <div className='grid grid-cols-1 gap-8 my-10'>
                    {riwayatPembelian.map((beli) => (
                        <div key={beli.detailPembelian.purchaseID} className='flex flex-col gap-2 border rounded-lg p-6'>
                            <div
                                className='grid grid-cols-2 grid-flow gap-3 md:flex items-center text-[14px] md:text-[16px]'>
                                <div className='flex gap-2 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         className='fill-green-600'>
                                        <path
                                            d="M19.5 11c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.696-.697.991.94 2.116-2.169.696.696-2.811 2.867zm-15.031-2.484h5v1h-5v-1zm8-1h-8v-1h8v1zm1.502 4h-11.002c-.276 0-.5-.224-.5-.5v-6.5h12.82c1.184-1.23 2.842-2 4.68-2 .886 0 1.729.179 2.5.501v-3.501c0-1.104-.896-2-2-2h-18c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h12.82c-.553-.576-1.006-1.251-1.318-2zm-11.502-11.5c0-.276.224-.5.5-.5h17c.276 0 .5.224.5.5v1.5h-18v-1.5z"/>
                                    </svg>
                                    <p className='font-semibold whitespace-nowrap md:whitespace-normal'>Uang
                                        Elektronik</p>
                                </div>
                                <p className='font-medium justify-self-end'>{new Date(beli.detailPembelian.tanggalPemesanan).toLocaleDateString()}</p>
                                <p className={`py-1 px-2 font-bold text-center ${beli.detailPembelian.statusPembayaran === 'Berhasil' ? 'text-green-600 bg-green-100' : beli.detailPembelian.statusPembayaran === 'Menunggu Konfirmasi' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>{beli.detailPembelian.statusPembayaran}</p>
                            </div>

                            <div className='mt-2 mb-6 md:mb-1'>
                                <p className='font-bold text-[14px] md:text-[16px]'>{beli.detailPaket.title}</p>
                                <p className='font-medium text-[12px] md:text-[14px] text-gray-50 text-justify w-full md:w-[70%]'>Lorem
                                    ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum aliquid modi
                                    architecto vel delectus, tenetur ad odio nihil ut ab ipsa vero doloremque quos rem
                                    ex commodi obcaecati! Magnam, maiores!</p>
                            </div>

                            <div className='flex flex-col place-items-end'>
                                <div className='flexCenter flex-col gap-4 md:gap-5'>
                                    <div className={'w-full flex justify-end'}>
                                        <div className='w-fit pr-3'>
                                            <div className={'flexCenter flex-col'}>
                                                <p className='text-gray-50 text-[12px] lg:text-[14px]'>Total Harga</p>
                                                <p className='font-bold'>{beli.detailPembelian.totalPembayaran.toLocaleString('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR'
                                                })}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"w-full flex gap-2"}>
                                        {beli.detailPembelian.statusPembayaran === "Belum Dibayar" && (
                                            <Link href={`/final-payment/${beli.detailPembelian.purchaseID}`}>
                                                <button
                                                    className='py-2 px-10 font-semibold text-yellow-100 text-[12px] lg:text-[14px] bg-yellow-600 rounded-lg duration-200 hover:bg-black'>Bayar Sekarang
                                                </button>
                                            </Link>
                                        )}
                                        <Link href={'https://wa.me/628122586045'} target='blank' rel="noopener noreferrer">
                                            <button className='flex items-center gap-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-green-50 rounded-lg duration-200 hover:bg-black'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className='fill-white'><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                                <p>Konfirmasi WhatsApp</p>
                                            </button>
                                        </Link>
                                        <Link href={`/detailTransaksi/${beli.detailPembelian.purchaseID}`}>
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
        )}
    </div>
  )
}

export default page