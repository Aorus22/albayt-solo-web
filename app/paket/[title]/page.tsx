"use client"
// import { PACKAGE_DATA } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
// import SeatBar from "@/Components/SeatBar";
import RemainingDays from "@/Components/remainingdays";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PaketAlbayt from '@/Components/PaketAlbayt';
import OrderButton from '@/Components/OrderButton';

export default function Paket() {
    const params = useParams();

    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/paket/${params.title}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    console.log(data)

    const currentPage = data.find((paket) => paket.key === params.title);
    // const currentPage = PACKAGE_DATA.find((paket) => paket.key === params.title)
    
    // @ts-ignore
  return (
      <div>
        <div className="mt-4 w-screen h-[55vh] bg-white bg-fixed mx-auto px-4 bg-cover" style={{backgroundImage: "url('/images/background1.jpg')"}}>
          <div className="h-[55vh] flex justify-start items-center sm:p-2 md:p-10">
          <h1 className="mb-4 text-gray-100 text-4xl md:text-6xl font-extrabold ">
              <span style={{
                  backgroundImage: "linear-gradient(90deg, white, #f14310)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
              }}>
                  {currentPage?.title}
              </span>
          </h1>
          </div>
        </div>

          <div className="sm:px-2 xl:px-36 w-screen bg-gradient-to-t to-transparent from-[#ffc750] flex justify-center items-center pb-16 ">
            <div className="flex pt-4">
              <div className="bg-transparent sm:w-full md:w-[60%] xl:w-[70%] sm:px-2 sm:py-10 xl:p-10">
                <div className="rounded-2xl justify-center items-center p-5">
                  <p className='mb-8 text-gray-700'>
                    <Link href={"/"}>Beranda </Link> 
                    <span>&gt;</span> 
                    <Link href={"/paketpage"}> Paket Umroh </Link> 
                    <span>&gt;</span> 
                    {params.title} 
                  </p>
                  <img alt="poster" className="block object-cover w-100% rounded-2xl" src={currentPage?.img}>
                  </img>
                  <div className="mt-5 gap-4 grid sm:grid-cols-1 xl:grid-cols-3 h-fit text-center text-gray">
                    <div className="border rounded-3xl p-4 flex flex-col items-center h-36 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#f14310" }}>
                      <path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z"></path>
                    </svg>
                        <div>Tanggal Keberangkatan</div>
                        <div className="text-2xl font-semibold mt-2">{currentPage?.jadwal}</div>
                    </div>
                    <div className="border rounded-3xl p-4 flex flex-col items-center h-36 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#f14310' }}>
                          <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zM9.799 14.987H8v-1.799l4.977-4.97 1.799 1.799-4.977 4.97zm5.824-5.817-1.799-1.799L15.196 6l1.799 1.799-1.372 1.371z"></path>
                        </svg>
                        <div>Lokasi Keberangkatan</div>
                        <div className="text-2xl font-semibold mt-2">{currentPage?.lokasiberangkat}</div>
                    </div>
                    <div className="border rounded-3xl p-4 flex flex-col items-center h-36 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#f14310' }}>
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M13 7h-2v6h6v-2h-4z"></path>
                        </svg>
                        <div>Durasi Perjalanan</div>
                        <div className="text-2xl font-semibold mt-2">{currentPage?.durasi}</div>
                    </div>
                    <div className="border rounded-3xl p-4 flex flex-col items-center h-36 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#f14310" }}>
                        <path d="M3.414 13.778 2 15.192l4.949 2.121 2.122 4.95 1.414-1.414-.707-3.536L13.091 14l3.61 7.704 1.339-1.339-1.19-10.123 2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903L3.824 6.297 2.559 7.563l7.644 3.67-3.253 3.253-3.536-.708z"></path>
                    </svg>
                        <div>Pesawat</div>
                        <div className="text-2xl font-semibold mt-2">Lion Air</div>
                    </div>
                    <div className="border rounded-3xl p-4 flex flex-col items-center h-36 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "#f14310" }}>
                            <path d="M18 2H6c-1.103 0-2 .897-2 2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm0 18H6V4h12v16z"></path>
                            <path d="M8 6h3v2H8zm5 0h3v2h-3zm-5 4h3v2H8zm5 .031h3V12h-3zM8 14h3v2H8zm5 0h3v2h-3z"></path>
                        </svg>
                        <div>Hotel</div>
                        <div className="text-2xl flex font-semibold mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                            <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                          </svg>
                          {currentPage?.hotel}
                        </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 justify-center bg-white p-6 shadow">
                  <p className="font-bold text-2xl mb-4 text-[#f14310]">
                    Deskripsi
                  </p>
                  <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                  occaecat cupidatat non proident, sunt in culpa qui officia 
                  deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                  <p className="text-[#f14310] font-bold text-2xl mb-4">
                    Syarat dan Ketentuan
                  </p>
                  <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>  
                  <ul className="pl-5 list-disc">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Excepteur sint occaecat cupidatat non proident, sunt in </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</li>
                  </ul>
                </div>
                <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                  <p className="text-[#f14310] font-bold text-2xl mb-4">
                    Fasilitas
                  </p>
                  <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>  
                  <ul className="pl-5 list-disc">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Excepteur sint occaecat cupidatat non proident, sunt in </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Excepteur sint occaecat cupidatat non proident, sunt in </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Excepteur sint occaecat cupidatat non proident, sunt in </li>
                    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</li>
                  </ul>
                </div>
                <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                  <p className="text-[#f14310] font-bold text-2xl mb-4">
                    Hotel
                  </p>
                  <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>  
                  <p className='font-bold mb-2'>Hotel Lorem Ipsum</p>
                  <div className='flex mb-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: '#f14310' }}>
                            <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zM9.799 14.987H8v-1.799l4.977-4.97 1.799 1.799-4.977 4.97zm5.824-5.817-1.799-1.799L15.196 6l1.799 1.799-1.372 1.371z"></path>
                    </svg>
                    <p>200m dari lorem ipsum</p>
                  </div>
                  <div className='grid xl:grid-cols-3 sm:grid-cols-1 gap-4'>
                    <div>
                      <img className='xl:w-full h-auto' alt="hotel" src='https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/2023/06/18/staycationjpg-20230618013836.jpg'></img>
                    </div>
                    <div>
                      <img className='xl:w-full h-auto' alt="hotel" src='https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/2023/06/18/staycationjpg-20230618013836.jpg'></img>
                    </div>
                    <div>
                      <img className='xl:w-full h-auto' alt="hotel" src='https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/2023/06/18/staycationjpg-20230618013836.jpg'></img>
                    </div>
                  </div>

                </div>
                <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-48 mt-4 shadow justify-center bg-white p-6">
                  <p className="text-[#f14310] font-bold text-2xl mb-4">
                    Penilaian
                  </p>
                  <p className='block bg-[#f14310] w-[20%] h-[3px] mb-6'></p>
                  <div className='border-b-2 pb-10 pl-4 mt-4'>
                    <p className='text-lg'>Bapak Fulan</p>
                    <div className='flex mb-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                    </div>
                    <p>Pelayanannya sangat ramah</p>
                  </div>
                  <div className='border-b-2 pb-10 pl-4 mt-4'>
                    <p className='text-lg'>Bapak Fulan</p>
                    <div className='flex mb-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                    </div>
                    <p>Pelayanannya sangat ramah</p>
                  </div>
                  <div className='border-b-2 pb-10 pl-4 mt-4'>
                    <p className='text-lg'>Bapak Fulan</p>
                    <div className='flex mb-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'gold', transform: '', msFilter: '' }}>
                              <path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" />
                      </svg>
                    </div>
                    <p>Pelayanannya sangat ramah</p>
                  </div>
                </div>
              </div>
              <div className="text-slate h-vh md:w-[40%] xl:w-[30%] pt-10 hidden md:block ">
                <div className='sticky top-24 z-1000'>
                  <div className="bg-white border-[rgba(0,0,0,0.16)] shadow-2xl flex flex-col justify-center items-center rounded-2xl w-[100%] h-fit p-10">
                    <RemainingDays Input_Date={"2024-10-17"}></RemainingDays>
                    <div className='border-gray-20 rounded-2xl px-4 my-3 w-full bg-slate-100 mb-6'>
                      <div className='flex items-center my-2'>
                        <div className='flexBetween w-full text-2xl font-bold text-yellow-600'>
                          <p>Dp </p>
                          <p>Rp 10.000.000</p>
                        </div>
                      </div>
                      <div className='flex w-full items-center my-2'>
                        <div className='flexBetween w-full text-sm font-medium'>
                          <p>Quad </p>
                          <p>{currentPage?.harga}</p>
                        </div>
                      </div>
                      <div className='flex w-full items-center my-2'>
                        <div className='flexBetween w-full text-sm font-medium'>
                          <p>Tripple </p>
                          <p>Rp 30.000.000</p>
                        </div>
                      </div>
                      <div className='flex w-full items-center my-2'>
                        <div className='flexBetween w-full text-sm font-medium'>
                          <p>Double </p>
                          <p>Rp 30.000.000</p>
                        </div>
                      </div>
                    </div>
                    {/*<SeatBar totalSeats={currentPage?.totalseat} remainingSeats={currentPage?.remainingseat}></SeatBar>*/}
                    <div className="mt-4 h-1 w-[60%] rounded opacity-40 bg-slate-950"></div>
                    <a href='https://wa.me/+6289636843541' className='w-full' target='_blank' rel="noopener noreferrer">
                      <div className="flex bg-[#208942] text-gray font-semibold py-2 px-4 rounded justify-center space-x-4 text-zinc-50 w-full mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                        <p>Tanya CS</p>
                      </div>
                    </a>
                    {/* <Link href={'/orderpage'} className='w-full'>
                      <div className="bg-[#89060b] flex space-x-4 text-gray font-semibold py-2 px-4 rounded  justify-center text-center text-zinc-50 w-full mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                          <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599"/>
                        </svg>
                        <p>Pesan Sekarang</p>
                      </div>  
                    </Link> */}
                    <OrderButton></OrderButton>

                  </div>
                  <div className='px-5 py-2 w-full'>
                    <p className='mb-2 text-gray-50 text-end'>Bagikan</p>
                    <div className='flex flex-col gap-5 items-end'>
                        <ul className='regular-14 flex gap-4 text-gray-30'>
                          <Image src={"/instagram.svg"} alt='logo' width={24} height={24} />
                          <Image src={"/facebook.svg"} alt='logo' width={24} height={24} />
                          <Image src={"/whatsapp.svg"} alt='logo' width={24} height={24} />
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            <PaketAlbayt />
          </div>
        </div>
    //  </body>
    );
  }
  