import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import OrderButton from '@/app/paket/[paketID]/OrderButton';
import SisaSeatBar from "@/Components/SisaSeatBar";
import { Harga, Paket } from '@/utils/type';
import { formatRupiah } from '@/utils/util';

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path
                                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
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
                            <Image src={"/facebook.svg"} alt='logo' width={24} height={24}/>
                        </Link>
                        <Link href={`https://api.whatsapp.com/send?text=${currentUrl}`} target="_blank" rel="noopener noreferrer">
                            <Image src={"/whatsapp.svg"} alt='logo' width={24} height={24}/>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BoxPemesanan