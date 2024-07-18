import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import OrderButton from '@/app/paket/[paketID]/OrderButton';
import SisaSeatBar from "@/Components/SisaSeatBar";
import { Harga, Paket } from '@/utils/type';
import { formatRupiah } from '@/utils/util';
import WhatsappIcon from '@/public/icon/WhatsappIcon.svg'
import FacebookIcon from '@/public/icon/FacebookIcon.svg'

const BoxPemesanan: React.FC<{ currentPaket: Paket, exchangeRate: number  }> = ({ currentPaket, exchangeRate }) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div>
            <div className="bg-white border-[rgba(0,0,0,0.16)] shadow-2xl flex flex-col justify-center items-center rounded-2xl max-w-sm w-[100%] h-fit p-6">
                <h1 className='font-bold text-center text-lg text-md mb-2'>{currentPaket?.title}</h1>
                <SisaSeatBar totalSeat={currentPaket?.totalseat || 0 } remainingSeat={currentPaket?.remainingseat || 0 } />
                <div className='border-gray-20 rounded-2xl px-4 my-3 w-full bg-slate-100'>
                    <div className='flex items-center my-2'>
                        <div className='w-full text-2xl font-bold text-yellow-600 text-center'>
                            <p>DP </p>
                            <p>{typeof currentPaket?.harga_dp === 'string' ? formatRupiah(parseInt(currentPaket?.harga_dp, 10)) : formatRupiah(currentPaket?.harga_dp)}</p>
                        </div>
                    </div>
                    <div>
                        {currentPaket?.harga?.map((item: Harga, index) => (
                        <div key={index} className={"mt-2 mb-2"}>
                            <div className='flexBetween'>
                                {item.currency?.toLowerCase() === 'idr' && (
                                <p className='font-bold text-[#f14310]'>
                                    {item.nominal.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}
                                </p>
                                )}
                                {item.currency?.toLowerCase() === 'usd' && (
                                <p className='font-bold text-[#f14310]'>
                                    {item.nominal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                                </p>
                                )}
                                <p className='font-medium text-[#f14310]'>{item.tipe}</p>
                            </div>
                            <div>
                                {item.currency === 'usd' && exchangeRate && (
                                <p className='font-bold text-[11px] text-green-50'>
                                    {(item.nominal * exchangeRate).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} (*kurs saat ini)
                                </p>
                                )}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <span className="block h-1 w-[60%] rounded opacity-40 bg-slate-950" />
                
                <Link href={`https://wa.me/628122586045?text=Assalammu'alaikum Al-Bayt Solo. Saya ingin mengetahui lebih lanjut paket dari website  yaitu paket ${currentPaket?.title}. Apakah bisa dijelaskan lebih lanjut ?`} className='w-full' target='_blank' rel="noopener noreferrer">
                    <div className="flex items-center bg-[#208942] text-gray font-semibold py-2 px-4 rounded justify-center space-x-4 text-zinc-50 w-full mt-3 duration-200 hover:bg-black">
                        <WhatsappIcon width={"20"} height={"20"} fill='white' />
                        <p>Tanya CS</p>
                    </div>
                </Link>
                <div className={'w-full'}>
                    <OrderButton />
                </div>
            </div>

            <div className='px-5 py-2 max-w-sm w-[100%]'>
                <p className='mb-2 text-gray-50 text-end'>Bagikan</p>
                <div className='flex flex-col gap-5 items-end'>
                    <ul className='regular-14 flex gap-4 text-gray-30'>
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </Link>
                        <Link href={`https://api.whatsapp.com/send?text=${currentUrl}`} target="_blank" rel="noopener noreferrer">
                            <WhatsappIcon width={"24"} height={"24"} fill='black' />
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BoxPemesanan