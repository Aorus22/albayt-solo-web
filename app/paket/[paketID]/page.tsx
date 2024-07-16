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
    <div className='max-container min-h-[70vh]'>    
      {isLoading ? <LoadingBar /> :
        (
          <div>
            {/* Banner Image */}
            <div className="relative mt-4 w-full h-[55vh] bg-fixed mx-auto px-4 bg-cover"
                  style={{backgroundImage: "url('/images/bg-header-paket.jpg')"}}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
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
                      <Link href={"/"}>Beranda </Link>
                      <span>&gt;</span>
                      <Link href={"/paket"}> Paket Umroh </Link>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style={{fill: "#f14310"}}>
                          <path
                              d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                        </svg>
                        <p className='text-[13px] lg:text-md'>Tanggal Keberangkatan</p>
                        <p className="text-[15px] lg:text-md font-semibold mt-2">{formatDate((currentPaket?.jadwal.seconds ?? 0) * 1000)}</p>
                      </div>
                      <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style={{fill: '#f14310'}}>
                          <path
                              d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zM9.799 14.987H8v-1.799l4.977-4.97 1.799 1.799-4.977 4.97zm5.824-5.817-1.799-1.799L15.196 6l1.799 1.799-1.372 1.371z"></path>
                        </svg>
                        <p className='text-[13px] lg:text-md'>Lokasi Keberangkatan</p>
                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.lokasiberangkat}</p>
                      </div>
                      <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style={{fill: '#f14310'}}>
                          <path
                              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M13 7h-2v6h6v-2h-4z"></path>
                        </svg>
                        <p className='text-[13px] lg:text-md'>Durasi Perjalanan</p>
                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.durasi} hari</p>
                      </div>
                      <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style={{fill: "#f14310"}}>
                          <path
                              d="M3.414 13.778 2 15.192l4.949 2.121 2.122 4.95 1.414-1.414-.707-3.536L13.091 14l3.61 7.704 1.339-1.339-1.19-10.123 2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903L3.824 6.297 2.559 7.563l7.644 3.67-3.253 3.253-3.536-.708z"></path>
                        </svg>
                        <p className='text-[13px] lg:text-md'>Maskapai</p>
                        <p className="text-[15px] lg:text-md font-semibold mt-2">{currentPaket?.maskapai}</p>
                      </div>
                      <div className="border rounded-3xl px-4 py-2 flex flex-col items-center justify-center h-full bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              style={{fill: "#f14310"}}>
                          <path
                              d="M18 2H6c-1.103 0-2 .897-2 2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm0 18H6V4h12v16z"></path>
                          <path d="M8 6h3v2H8zm5 0h3v2h-3zm-5 4h3v2H8zm5 .031h3V12h-3zM8 14h3v2H8zm5 0h3v2h-3z"></path>
                        </svg>
                        <p className='text-[13px] lg:text-md'>Hotel</p>
                        <div className="text-2xl flex font-semibold flexCenter">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                style={{fill: 'gold', transform: '', msFilter: ''}}>
                            <path
                                d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"/>
                          </svg>
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
                          <p className="font-bold mb-4 flex">{item.nama_hotel} ({item.bintang}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  style={{fill: 'gold', transform: '', msFilter: ''}}>
                              <path
                                  d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"/>
                            </svg>
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
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                  style={{fill: 'gold', transform: '', msFilter: ''}}>
                              <path
                                  d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"/>
                            </svg>
                          ))} </div>
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
                        href={`https://wa.me/628122586045?text=Assalammu'alaikum Al-Bayt Solo. Saya ingin mengetahui lebih lanjut paket dari website yaitu paket ${currentPaket?.title}. Apakah bisa dijelaskan lebih lanjut ?`}
                        className='w-full' target='_blank' rel="noopener noreferrer"
                    >
                      <div className="flex bg-[#208942] text-gray font-semibold py-2 px-4 rounded items-center justify-center space-x-4 text-zinc-50 h-full w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                              className="bi bi-whatsapp" viewBox="0 0 16 16">
                          <path
                              d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
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

            {imagePreviewToggle && <ImagePreview  src={imagePreviewSrc} onClose={handlePreviewClose}/>}
          </div>
        )
      }   
    </div>
  )
}

export default Page