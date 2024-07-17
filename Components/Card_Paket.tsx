import Link from 'next/link'
import React from 'react'
import {usePaketContext} from "@/context/PaketContext";
import SisaSeatBar from "@/Components/SisaSeatBar";
import { Harga, Paket } from '@/utils/type';
import { formatDate } from '@/utils/util';
import ImageWithLoading from './ImageWithLoading';
import CalendarIcon from '@/public/icon/CalendarIcon.svg'
import TimerIcon from '@/public/icon/TimerIcon.svg'
import BuildingIcon from '@/public/icon/BuildingIcon.svg'
import LocationIcon from '@/public/icon/LocationIcon.svg'
import PersonIcon from '@/public/icon/PersonIcon.svg'
import StarIcon from '@/public/icon/StarIcon.svg'

const Card_Paket: React.FC<{ paket: Paket }> = ({ paket }) => {
    const {exchangeRate: exchangeRate} = usePaketContext()
    const date = formatDate(paket.jadwal.seconds * 1000)

    return (
    <Link href={`/paket/${paket.paketID}`} scroll>
        <div>
            <div className='bg-white border shadow-lg h-[37rem] rounded-xl duration-300 hover:-translate-y-2 hover:shadow-xl'>
                <div className='flexCenter h-36'>
                    <ImageWithLoading src={paket.thumbnail} alt={'paket'} height={'144px'} width={'450px'} className='h-36 object-cover rounded-t-xl'/>
                </div>
                <div className='mx-4 mt-4'>
                    <div className='flex justify-center items-center h-[64px]'>
                        <h1 className='font-bold text-center text-[16px] text-[#89060b]'>{paket.title}</h1>
                    </div>
                    <div className='my-3'>

                        <div className='flexBetween items-center text-[13px] md:text-[14px] text-gray-50 my-4'>
                            <div className='flex gap-2 items-center'>
                                <CalendarIcon className='fill-gray-50' />
                                <p>Jadwal</p>
                            </div>
                            <div className='font-bold'>
                                <p>{date}</p>
                            </div>
                        </div>

                        <div className='flexBetween items-center text-[13px] md:text-[14px] text-gray-50 my-4'>
                            <div className='flex gap-2 items-center'>
                                <TimerIcon className='fill-gray-50'/>
                                <p>Durasi Perjalanan</p>
                            </div>
                            <div className='font-bold'>
                                <p>{paket.durasi} hari</p>
                            </div>
                        </div>

                        <div className='flexBetween items-center text-[13px] md:text-[14px] text-gray-50 my-4'>
                            <div className='flex gap-2 items-center'>
                                <BuildingIcon className='fill-gray-50'/>
                                <p>Hotel</p>
                            </div>
                            <div className='font-bold flex items-center gap-2'>
                                <StarIcon className='fill-gray-50'/>
                                <p>{paket.hotel[0].bintang}</p>
                            </div>
                        </div>

                        <div className='flexBetween items-center text-[13px] md:text-[14px] text-gray-50 my-4'>
                            <div className='flex gap-2 items-center'>
                                <LocationIcon className='fill-gray-50'/>
                                <p>Kota Keberangkatan</p>
                            </div>
                            <div className='font-bold'>
                                <p>{paket.lokasiberangkat}</p>
                            </div>
                        </div>

                        <div className='flexBetween items-center text-[13px] md:text-[14px] text-gray-50 my-4'>
                            <div className='flex gap-2 items-center'>
                                <PersonIcon className='fill-gray-50'/>
                                <p>Total Seat</p>
                            </div>
                            <div className='font-bold'>
                                <p>{paket.totalseat} pax</p>
                            </div>
                        </div>

                        <SisaSeatBar totalSeat={paket.totalseat} remainingSeat={paket.remainingseat} />

                        {paket.harga?.map((item: Harga, index) => (
                            <div key={index} className='flexBetween mt-2 mb-2'>
                                {item.currency === 'idr' && (
                                    <p className='font-bold text-[#f14310]'>
                                        {item.nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </p>
                                )}
                                {item.currency === 'usd' && exchangeRate && (
                                    <p className='font-bold text-[#f14310]'>
                                        {(item.nominal * exchangeRate).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </p>
                                )}
                                <p className='font-medium text-[#f14310]'>{item.tipe}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Card_Paket