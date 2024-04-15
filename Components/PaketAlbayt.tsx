"use client"
import React, { useEffect, useState } from 'react';
import Card_Paket from './Card_Paket'
import Template_form from './Template_form'
import Link from 'next/link'
// import {PACKAGE_DATA} from "@/constants";

const PaketAlbayt = () => {

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/paket/`);
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

  // const data = PACKAGE_DATA

  return (
    <>
      <section className="max-container padding-container py-7 bg-[url('/images/bg-paket.jpg')] bg-no-repeat">

        {/* JUDUL SECTIOn */}
        <div id='judul section' className='items-center text-center'>
          <h1 className='font-medium text-[#89060b] text-4xl lg:text-6xl'>
            PAKET <span className='font-bold text-[#f14310]'>ALBAYT</span>
          </h1>
        </div>

        <form id='filter paket' className='items-center flex my-4 py-4 gap-5 mx-auto'>
          <div className='w-full flexCenter gap-3'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 items-end'>
              <Template_form label='Lokasi Keberangkatan' formtype='text' form_id='lokasi keberangkatan' form_name='lokasi_keberangkatan' form_placeholder='Lokasi Keberangkatan' />
              <Template_form label='Waktu Keberangkatan' formtype='text' form_id='waktu keberangkatan' form_name='waktu_keberangkatan' form_placeholder='Waktu Keberangkatan' />
              <Template_form label='Biaya Paket' formtype='number' form_id='biaya' form_name='biaya_paket' form_placeholder='Biaya' />
              <button type='submit' className='font-bold my-1 md:my-2 h-10 text-md text-white bg-[#f14310] py-2 px-4 rounded-full items-center text-center border duration-200 hover:bg-[#ffc750] hover:text-[#89060b]'>Cari</button>
            </div>
          </div>
        </form>

        {/* ISI KONTEN / CARD */}
        <div id='konten' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-3'>
          {data.slice(0,6).map((paket) => (
            <Card_Paket 
              key={paket.key} 
              paket_id={paket.key} 
              img={paket.img} 
              harga={paket.harga}
              title={paket.title} 
              jadwalBerangkat={paket.jadwal} 
              durasi={paket.durasi} 
              hotel={paket.hotel} 
              totalseat={paket.totalseat} 
              remainingseat={paket.remainingseat} 
              lokasiberangkat={paket.lokasiberangkat} 
            />
          ))}
        </div>
        
        <Link href={'/paketpage'}>
          <div className='flexCenter my-8'>
            <button className='font-bold text-white  text-[16px] lg:text-xl bg-[#f14310] px-4 py-3 rounded-full border duration-200 ease-in-out hover:bg-white hover:text-[#f14310] hover:border hover:border-[#f14310]'>
              Lihat Selengkapnya
            </button>
          </div>
        </Link>

      </section>
    </>
  )
}

export default PaketAlbayt