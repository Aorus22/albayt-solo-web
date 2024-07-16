"use client"
import React, { useEffect, useState } from 'react';
import Card_Paket from '@/Components/Card_Paket'
import { CalendarIcon, CurrencyDollarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import "../globals.css";
import { usePaketContext } from "@/context/PaketContext";
import LoadingBar from "@/Components/LoadingBar";
import { Paket } from '@/utils/type';

const Page = () => {
  const { paket: data, exchangeRate: kurs } = usePaketContext();
  
  const uniqueLocation = () => {
    if (data) {
      const uniqueLocations = data.reduce((acc: string[], paket) => {
        const trimmedLowerCaseLokasi = paket.lokasiberangkat.trim().toLowerCase();
        if (acc.indexOf(trimmedLowerCaseLokasi) === -1) {
          acc.push(trimmedLowerCaseLokasi);
        }
        return acc;
      }, []);
      setLokasiOption(uniqueLocations);
    }
  }

  useEffect(() => {
    uniqueLocation();
    if (data){
      setIsLoading(false);
    }
  }, [data]);

  const [lokasiOption, setLokasiOption] = useState<string[]>([]);
  const [tanggalOption, setTanggalOption] = useState("before");
  const [biayaOption, setBiayaOption] = useState("less");

  const [lokasiKeberangkatan, setLokasiKeberangkatan] = useState("");
  const [waktuKeberangkatan, setWaktuKeberangkatan] = useState(0);
  const [biaya, setBiaya] = useState("");

  const isFiltered = lokasiKeberangkatan != "" || waktuKeberangkatan != 0 || biaya != ""
  const [filteredData, setFilteredData] = useState<Paket[]>([]);

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      const filter = JSON.parse(savedFilter);
      setLokasiKeberangkatan(filter.lokasiKeberangkatan);
      setWaktuKeberangkatan(filter.waktuKeberangkatan);
      setTanggalOption(filter.tanggalOption);
      setBiayaOption(filter.biayaOption);
      setBiaya(filter.biaya);
    }
  }, []);

  useEffect(() => {
    if (isFiltered) {
      handleSubmit();
    }
  }, [lokasiKeberangkatan, waktuKeberangkatan, biaya, tanggalOption, biayaOption, data]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const newData = data?.filter((paket) => {
      const isLokasiMatch = lokasiKeberangkatan === "" || paket.lokasiberangkat.toLowerCase().includes(lokasiKeberangkatan.toLowerCase());

      const isWaktuMatch =
        waktuKeberangkatan === 0 ||
        (tanggalOption === 'before' && paket.jadwal.seconds * 1000 < waktuKeberangkatan) ||
        (tanggalOption === 'after' && paket.jadwal.seconds * 1000 > waktuKeberangkatan);

      const isBiayaMatch = biaya === "" || paket.harga.some((h) => {
        const nominal = h.currency === "usd" ? h.nominal * kurs : h.nominal;
        return biayaOption === "less" ? nominal < parseInt(biaya) : nominal > parseInt(biaya);
      });

      return isLokasiMatch && isWaktuMatch && isBiayaMatch;
    });

    setFilteredData(newData);

    const filterData = {
      lokasiKeberangkatan: lokasiKeberangkatan === "" ? "" : lokasiKeberangkatan, 
      waktuKeberangkatan,
      tanggalOption,
      biayaOption,
      biaya
    };
    
    localStorage.setItem('filter', JSON.stringify(filterData));
  };

  const handleRemoveFilter = () => {
    setLokasiKeberangkatan("");
    setWaktuKeberangkatan(0);
    setBiaya("");
    setFilteredData([]);
    localStorage.removeItem('filter');
  };

  useEffect(() => {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

  const handleBeforeUnload = () => {
      localStorage.removeItem('filter'); 
  };

  return (
    <div className="max-container padding-container py-10 md:py-20 bg-gradient-to-b from-white to-[#ffc750]">
      <div className='flex justify-center items-center bg-[#442324] rounded-xl p-5 mb-10'>
        <form onSubmit={handleSubmit} className={"w-full px-2"}>
          <div className="grid lg:grid-cols-3 lg:gap-10 gap-6">
            <div className="form-group flex flex-col">
              <label htmlFor="lokasi_keberangkatan" className="gap-2 text-white font-bold mb-2 flex">
                <LocationMarkerIcon className="h-5 w-5" /> Lokasi Keberangkatan
              </label>
              <div className="flex items-center gap-4 py-2">
                <div className='flexCenter'>
                  <input
                    type="radio"  
                    id="kota"
                    name="kota"
                    defaultChecked = {true}
                    className="mr-1 h-4 w-4 rounded-full focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="less" className="text-white">kota</label>
                </div>
              </div>
              <select
                id="lokasi_keberangkatan"
                name="lokasi_keberangkatan"
                className="shadow appearance-none border rounded pl-10 w-full py-2 px-2 lg:py-3 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={lokasiKeberangkatan}
                onChange={(e) => setLokasiKeberangkatan(e.target.value)}
              >
                <option className={"text-opacity-0"} value="">Pilih Lokasi Keberangkatan</option>
                {lokasiOption.map((lokasi, index) => (
                  <option key={index} value={lokasi}>{lokasi}</option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="waktu_keberangkatan" className="text-white font-bold mb-2 flex gap-2">
                <CalendarIcon className="h-5 w-5" /> Waktu Keberangkatan
              </label>
              <div className={"flex items-center gap-4 py-2"}>
                <div className='flexCenter'>
                  <input
                    type="radio"
                    id="before"
                    name="tanggal_option"
                    checked={tanggalOption === 'before'}
                    onChange={() => setTanggalOption('before')}
                    className="mr-1 h-4 w-4 rounded-full focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="before" className="text-white">Sebelum</label>
                </div>
                <div className='flexCenter'>
                  <input
                    type="radio"
                    id="after"
                    name="tanggal_option"
                    checked={tanggalOption === 'after'}
                    onChange={() => setTanggalOption('after')}
                    className="mr-1 h-4 w-4 rounded-full focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="after" className="text-white">Sesudah</label>
                </div>
              </div>
              <input
                type="date"
                id="waktu_keberangkatan"
                name="waktu_keberangkatan"
                className="shadow appearance-none border rounded pl-3 w-full py-2 px-2 lg:py-3 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Waktu Keberangkatan"
                value={waktuKeberangkatan !== 0 ? new Date(waktuKeberangkatan).toISOString().split('T')[0] : ''}
                onChange={(e) => setWaktuKeberangkatan(Date.parse(e.target.value))}
              />
            </div>
            <div className="form-group flex flex-col">
              <label htmlFor="biaya" className="text-white font-bold mb-2 flex gap-2">
                <CurrencyDollarIcon className="h-5 w-5" /> Biaya
              </label>
              <div className="flex items-center gap-4 py-2">
                <div className='flexCenter'>
                  <input
                    type="radio"
                    id="less"
                    name="biaya_option"
                    checked={biayaOption === 'less'}
                    onChange={() => setBiayaOption('less')}
                    className="mr-1 h-4 w-4 rounded-full focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="less" className="text-white">Kurang dari</label>
                </div>
                <div className='flexCenter'>
                  <input
                    type="radio"
                    id="more"
                    name="biaya_option"
                    checked={biayaOption === 'more'}
                    onChange={() => setBiayaOption('more')}
                    className="mr-1"
                  />
                  <label htmlFor="more" className="text-white">Lebih dari</label>
                </div>
              </div>
              <input
                type="number"
                id="biaya"
                name="biaya"
                className="shadow appearance-none border rounded pl-3 w-full py-2 px-2 lg:py-3 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Rp"
                value={biaya}
                onChange={(e) => setBiaya(e.target.value)}
              />
            </div>
            <div className="flex md:col-span-3 justify-center md:ml-4">
              {/* <button type="submit"
                className="bg-blue-500 hover:bg-white text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
                Cari
              </button> */}
              {isFiltered && (
                <button type="button" onClick={handleRemoveFilter}
                  className="bg-gray-500 hover:bg-white text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline">
                  Hapus Filter
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {isLoading && (<LoadingBar />)}
      <section className="py-7 md:px-12">
        <div id='konten' className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-3 justify-center'>
          { (isFiltered && filteredData?.length == 0) ? (
            <div className="text-center text-gray-700 font-bold col-span-full">
              Paket tidak ditemukan
            </div>
          ) : (
            (isFiltered ? filteredData : data).map((paket: any) => (
              <div className='flex w-full justify-center' key={paket.paketID}>
                <div className='max-w-sm w-full'>
                  <Card_Paket paket={paket} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
