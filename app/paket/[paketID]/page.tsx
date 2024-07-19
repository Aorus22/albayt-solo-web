"use client"
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import PaketAlbayt from '@/Components/PaketAlbayt';
import OrderButton from '@/app/paket/[paketID]/OrderButton';
import LoadingBar from '@/Components/LoadingBar';
import { FASILITAS_PAKET } from '@/constants';
import {usePaketContext} from "@/context/PaketContext";
import "animate.css/animate.min.css";
import BoxPemesanan from './BoxPemesanan';
import { formatDate } from '@/utils/util';
import { Hotel, Paket } from '@/utils/type';
import ImageWithLoading from '@/Components/ImageWithLoading';
import ImagePreview from '@/Components/ImagePreview';
import CalendarIcon from '@/public/icon/CalendarIcon.svg'
import TimerIcon from '@/public/icon/TimerIcon.svg'
import BuildingIcon from '@/public/icon/BuildingIcon.svg'
import LocationIcon from '@/public/icon/LocationIcon.svg'
import PlaneDiagonalIcon from '@/public/icon/PlaneDiagonalIcon.svg'
import StarIcon1 from '@/public/icon/StarIcon1.svg'
import WhatsappIcon from '@/public/icon/WhatsappIcon.svg'

const Page = () => {
    const params = useParams();

    const { paket, testimoni, exchangeRate } = usePaketContext();
    const [currentPaket, setcurrentPaket] = useState<Paket | null>(null);

    useEffect(() => {
        const currentPaket = paket?.find((paket: Paket) => paket.paketID === params.paketID)
        setcurrentPaket(currentPaket || null);
        window.scrollTo(0, 0);
    }, [paket]);

    useEffect(()=>{
        currentPaket && setLoading(false);
    }, [currentPaket])

    const boxPemesananMobileRef = useRef<HTMLDivElement>(null);
    const [boxPemesananVisible, setBoxPemesananVisible] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isLoading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setBoxPemesananVisible(true);
            } else {
            setBoxPemesananVisible(false);
            }
        });
        });
        const boxPemesananMobile = boxPemesananMobileRef?.current;
        if (boxPemesananMobile) {
        observer.observe(boxPemesananMobile);
        }

        return () => {
        if (boxPemesananMobile) {
            observer.unobserve(boxPemesananMobile);
        }
        };
    }, [boxPemesananMobileRef, isLoading]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  
    const [halamanTestimoni, setHalamanTestimoni] = useState(1);

    const nextPage = () => {
        if ((halamanTestimoni-1)*5+5 < testimoni.length) {
            setHalamanTestimoni(halamanTestimoni + 1);
        }
    };

    const previousPage = () => {
        if (halamanTestimoni > 1) {
            setHalamanTestimoni(halamanTestimoni - 1);
        }
    };

    const currentTestimoni = useMemo(() => {
        const startIndex = (halamanTestimoni - 1) * 5;
        const endIndex = startIndex + 5;
        return testimoni.slice(startIndex, endIndex)
    }, [halamanTestimoni])

    const [imagePreviewToggle, setImagePreviewToggle] = useState(false)
    const [imagePreviewSrc, setImagePreviewSrc] = useState<string>('')

    const handlePreviewClose = () => {
        setImagePreviewToggle(false)
    }

    const handleSelectPreview = (e: React.MouseEvent<HTMLImageElement>) => {
        setImagePreviewSrc(e.currentTarget.src);
        setImagePreviewToggle(true)
    };

  return (
    <div className='max-container min-h-[75vh]'>
        {isLoading ? ( 
            <LoadingBar />
        ) : (
            <div>
                {/* Banner Image */}
                <div className="relative mt-4 w-full h-[55vh] bg-fixed mx-auto px-4 bg-cover" style={{backgroundImage: "url('/images/bg-header-paket.jpg')"}} >
                    <span className="absolute inset-0 bg-black opacity-50" />
                    <div className="relative h-[55vh] flex justify-start items-center sm:p-2 md:p-10">
                        <h1 className="mb-4 text-gray-100 text-2xl md:text-3xl lg:text-5xl font-extrabold">
                            <span style={{
                            backgroundImage: "linear-gradient(90deg, white, #f14310)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                            }}> {currentPaket?.title} 
                            </span>
                        </h1>
                    </div>
                </div>

            {/* Main */}
                <div className="px-5 xs:px-10 sm:px-20 lg:px-24 xl:px-56 w-full bg-gradient-to-t to-transparent from-[#ffc750] flex justify-center items-center pb-20">
                    <div className="grid lg:grid-cols-5 pt-4">
                        <div className='col-span-3'>
                            <div className="rounded-2xl justify-center items-center p-5">
                                <p className='mb-8 text-gray-700'>
                                    <Link href={"/"}>
                                    Beranda </Link>
                                    <span>&gt;</span>
                                    <Link href={"/paket"}>
                                    Paket Umroh </Link>
                                    <span className='mr-1'>&gt;</span>
                                    <span className='font-semibold'>{currentPaket?.title}</span>
                                </p>
                                {/* Poster */}
                                <div className='flex justify-center items-center min-h-[400px] max-h-[80vh] hover:cursor-pointer'>
                                    <ImageWithLoading onClick={handleSelectPreview} alt='poster' src={currentPaket?.img || ""} height='100%' width='auto' className='max-h-[80vh] object-fit bg-white rounded 2xl'/>
                                </div>
                                {/* Keterangan */}
                                <div className="mt-5 gap-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-fit text-center text-gray">
                                    <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                                        <CalendarIcon fill='#f14310' />
                                        <p className='text-[13px] lg:text-md'>Tanggal Keberangkatan</p>
                                        <p className="text-[15px] lg:text-md font-semibold mt-2">{formatDate((currentPaket?.jadwal.seconds ?? 0) * 1000)}</p>
                                    </div>
                                    <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                                        <LocationIcon fill='#f14310' />
                                        <p className='text-[13px] lg:text-md'>Lokasi Keberangkatan</p>
                                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.lokasiberangkat}</p>
                                    </div>
                                    <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                                        <TimerIcon fill='#f14310' />
                                        <p className='text-[13px] lg:text-md'>Durasi Perjalanan</p>
                                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.durasi} hari</p>
                                    </div>
                                    <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                                        <PlaneDiagonalIcon fill='#f14310' />
                                        <p className='text-[13px] lg:text-md'>Maskapai</p>
                                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.maskapai}</p>
                                    </div>
                                    <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                                        <BuildingIcon fill='#f14310' />
                                        <p className='text-[13px] lg:text-md'>Hotel</p>
                                        <div className="text-2xl flex font-semibold flexCenter">
                                            <StarIcon1 height={24} width={24} fill="gold" />
                                            <p className='text-[15px] lg:text-md'>{currentPaket?.hotel[0].bintang}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Box Pemesanan Mobile */}
                            <div className="text-slate w-full lg:hidden p-2 relative">
                                <div className='flex justify-center items-center'>
                                    <BoxPemesanan currentPaket={currentPaket as Paket} exchangeRate={exchangeRate}/>
                                    <div className="z-50 absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2"
                                        ref={boxPemesananMobileRef}></div>
                                </div>
                            </div>
                            {/* Fasilitas */}
                            <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                                <h3 className='font-bold text-2xl lg:text-3xl text-[#f14310] mb-4'>Fasilitas</h3>
                                <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>
                                {FASILITAS_PAKET.map((fasilitas) => (
                                <div key={fasilitas.id_fasilitas} className='mb-8'>
                                    <p className="text-[#f14310] font-bold text-md lg:text-xl mb-3"> {fasilitas.title} </p>
                                    <ul className="pl-5 list-disc">
                                        {fasilitas.contents.map((ket_fasilitas) => (
                                        <li className='font-medium my-2 text-gray-700 text-[14px] lg:text-md'
                                            key={ket_fasilitas.label}>{ket_fasilitas.value}
                                        </li>
                                        ))} 
                                    </ul>
                                </div>
                                ))}
                            </div>
                            {/* Hotel */}
                            <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                                <p className="text-[#f14310] font-bold text-2xl mb-4"> Hotel </p>
                                <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>
                                <div className='w-full'>
                                    {currentPaket?.hotel?.map((item: Hotel, index: number) => (
                                    <div key={index} className='mt-3 mb-10'>
                                        <p className="font-bold mb-4 flex">
                                            {item.nama_hotel} ({item.bintang}
                                                <StarIcon1 height={24} width={24} fill="gold" />
                                            )
                                        </p>
                                        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'> 
                                            {item.url_hotel?.map((imageUrl: string, i) => (
                                            <img onClick={handleSelectPreview} key={i} className='hover:cursor-pointer h-32 aspect-video object-cover' alt={`hotel ${index}`}
                                            src={imageUrl} />
                                            ))} 
                                        </div>
                                    </div>
                                    ))} 
                                </div>
                            </div>
                            {/* Testimoni */}
                            <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                                <p className="text-[#f14310] font-bold text-2xl mb-4"> Testimoni </p>
                                <p className='block bg-[#f14310] w-[20%] h-[3px] mb-2'></p>
                                {currentTestimoni.map((testi) => (
                                <div key={testi.id} className='border-b-2 pb-5 pl-4 mt-4'>
                                    <p className='text-md font-semibold'>{testi.nama}</p>
                                    <div className='flex mt-2 mb-4'>
                                        {Array.from({length: testi.bintang}, (_, index) => (
                                            <StarIcon1 height={24} width={24} fill="gold" />
                                        ))} 
                                    </div>
                                    <p className='text-sm'>{testi.review}</p>
                                </div>
                                ))}
                                <div className="flex justify-between mt-4">
                                    <button className="bg-[#f14310] text-white py-2 px-4 rounded disabled:bg-gray-400"
                                    onClick={previousPage} disabled={halamanTestimoni === 1}> Sebelumnya
                                    </button>
                                    <button className="bg-[#f14310] text-white py-2 px-4 rounded disabled:bg-gray-400" 
                                        onClick={nextPage} disabled={(halamanTestimoni) * 5 >= testimoni.length}> Selanjutnya
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Box Pemesanan Utama */}
                        <div className="text-slate h-vh col-span-2 p-4 hidden pt-10 lg:block ">
                            <div className='sticky top-24 z-1000'>
                                <BoxPemesanan currentPaket={currentPaket as Paket} exchangeRate={exchangeRate}/>
                            </div>
                        </div>
                    </div>
                </div>

                <PaketAlbayt/>

                {/* Box Pesan Mobile Bottom*/}
                {!boxPemesananVisible && isScrolled && (
                    <div className={'fixed bottom w-full z-50 flex md:hidden'}>
                        <div className={'fixed z-50 w-full flex h-20 justify-center items-center bottom-1'}>
                            <div className='w-1/2 h-full mt-6 space-x-4'>
                                <Link
                                href={`https://wa.me/628122586045?text=Assalammu'alaikum Al-Bayt Solo. Saya ingin mengetahui lebih lanjut paket dari website yaitu paket ${currentPaket?.title}. Apakah bisa dijelaskan lebih lanjut ?`}
                                className='w-full' target='_blank' rel="noopener noreferrer"
                                >
                                <div className="flex bg-[#208942] text-gray font-semibold py-2 px-4 rounded items-center justify-center space-x-4 text-zinc-50 h-full w-full">
                                    <WhatsappIcon width={"24"} height={"24"} fill='white' />
                                    <p>Tanya CS</p>
                                </div>
                                </Link>
                            </div>
                            <div className={'w-1/2 h-full'}>
                                <OrderButton/>
                            </div>
                        </div>
                    </div>
                )}

                {imagePreviewToggle && 
                    <ImagePreview  src={imagePreviewSrc} onClose={handlePreviewClose}/>
                }
            </div>
        )}
    </div>
  )
}

export default Page