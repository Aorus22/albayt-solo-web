"use client"
import React, { useEffect, useState } from 'react';
import Card_Paket, {PackageProps} from '@/Components/Card_Paket'
import { LocationMarkerIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/solid';
import "../globals.css";

function PaketPage() {

  const [data, setData] = useState<PackageProps[]>([]);
  useEffect(() => {
       const paket = sessionStorage.getItem("paket") || ""
       setData(JSON.parse(paket))
  }, []);

  // const [data, setData] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/paket/`);
  //       if (!response.ok) {
  //         console.log('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData().then();
  // }, []);
  // console.log(data)

  // const data = PACKAGE_DATA

  return (
    <div className="max-container padding-container py-10 md:py-20 bg-gradient-to-b from-white to-[#ffc750]"> 
      <div className='flex justify-center items-center bg-slate-800 rounded-xl p-5 mb-10'>
        <form action="#" className="flex flex-col md:flex-row md:items-end">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group flex flex-col relative">
              <label htmlFor="lokasi_keberangkatan" className="block text-white font-bold mb-2">
                Lokasi Keberangkatan
              </label>
              <LocationMarkerIcon className="h-5 w-5 absolute top-3/4 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="lokasi_keberangkatan"
                name="lokasi_keberangkatan"
                className="shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Lokasi Keberangkatan"
              />
            </div>
            <div className="form-group flex flex-col relative">
              <label htmlFor="waktu_keberangkatan" className="block text-white font-bold mb-2">
                Waktu Keberangkatan
              </label>
              <CalendarIcon className="h-5 w-5 absolute top-3/4 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="waktu_keberangkatan"
                name="waktu_keberangkatan"
                className="shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Waktu Keberangkatan"
              />
            </div>
            <div className="form-group flex flex-col relative">
              <label htmlFor="biaya" className="block text-white font-bold mb-2">
                Biaya
              </label>
              <CurrencyDollarIcon className="h-5 w-5 absolute top-3/4 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="biaya"
                name="biaya"
                className="shadow appearance-none border rounded pl-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Biaya"
              />
            </div>
            <div className="flex md:col-span-3 justify-end mt-4 md:mt-0 md:ml-4">
              <button type="submit" className="bg-blue-500 hover:bg-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cari
              </button>
            </div>
          </div>
        </form>
      </div>

      <section className="py-7">
        <div id='konten' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-3'>
          {data.filter(paket => paket.remainingseat > 0).map((paket: any) => (
            <Card_Paket
              key={paket.paketID}
              paketID={paket.paketID}
              img={paket.img}
              harga={paket.harga}
              title={paket.title}
              jadwal={paket.jadwal}
              durasi={paket.durasi}
              hotel={paket.hotel}
              totalseat={paket.totalseat}
              remainingseat={paket.remainingseat}
              lokasiberangkat={paket.lokasiberangkat}
              harga_dp={paket.harga_dp}
              maskapai={paket.maskapai}
              thumbnail={paket.thumbnail}
          />
          ))}
        </div>
      </section>
    </div>
  );
}

export default PaketPage;
