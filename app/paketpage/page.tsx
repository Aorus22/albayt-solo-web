"use client"
import React, {useEffect, useState} from 'react';
import Card_Paket, {PackageProps} from '@/Components/Card_Paket'
import {CalendarIcon, CurrencyDollarIcon, LocationMarkerIcon} from '@heroicons/react/solid';
import "../globals.css";
import {usePaketContext} from "@/context/PaketContext";
import LoadingBar from "@/Components/LoadingBar";

function PaketPage() {
  const { paket: data, exchangeRate : kurs } = usePaketContext();

  const [lokasiKeberangkatan, setLokasiKeberangkatan] = useState("");
  const [waktuKeberangkatan, setWaktuKeberangkatan] = useState(0);
  const [biaya, setBiaya] = useState("");
  const [filteredData, setFilteredData] = useState<PackageProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [lokasiOption, setLokasiOption] = useState<string[]>([]);
  const [tanggalOption, setTanggalOption] = useState("before");
  const [biayaOption, setBiayaOption] = useState("less");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newData = data?.filter((paket) => {
      const isLokasiMatch = lokasiKeberangkatan === "" || paket.lokasiberangkat.toLowerCase().includes(lokasiKeberangkatan.toLowerCase());

      const beforeOption = tanggalOption === 'before';
      const afterOption = tanggalOption === 'after';
      const isWaktuMatch = waktuKeberangkatan === 0 ||
          (beforeOption && (paket.jadwal.seconds*1000 < waktuKeberangkatan)) ||
          (afterOption && (paket.jadwal.seconds*1000 > waktuKeberangkatan))

      const isBiayaMatch = biaya === "" || paket.harga.some((h) => {
        const nominal = h.currency === "usd" ? h.nominal*kurs : h.nominal;
        return biayaOption === "less" ? nominal < parseInt(biaya) : nominal > parseInt(biaya);
      });

      return isLokasiMatch && isWaktuMatch && isBiayaMatch;
    });

    if (newData) {
      setFilteredData(newData);
    }
  };

  const handleRemoveFilter = () => {
    setLokasiKeberangkatan("");
    setWaktuKeberangkatan(0);
    setBiaya("");
    setFilteredData(null);
  };

  const uniqueLocation = () => {
    if (data) {
      setIsLoading(false);
      const uniqueLocations = data.reduce((acc: string[], paket) => {
        if (acc.indexOf(paket.lokasiberangkat) === -1) {
          acc.push(paket.lokasiberangkat);
        }
        return acc;
      }, []);
      setLokasiOption(uniqueLocations);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    uniqueLocation()
  }, [data]);

  return (
      <div className="max-container padding-container py-10 md:py-20 bg-gradient-to-b from-white to-[#ffc750]">
        <div className='flex justify-center items-center bg-slate-800 rounded-xl p-5 mb-10'>
          <form onSubmit={handleSubmit} className={"w-full px-2"}>
            <div className="grid lg:grid-cols-3 gap-4 mb-4">
              <div className="form-group flex flex-col">
                <label htmlFor="lokasi_keberangkatan" className="gap-2 text-white font-bold mb-2 flex">
                  <LocationMarkerIcon className="h-5 w-5"/> Lokasi Keberangkatan
                </label>
                  <select
                    id="lokasi_keberangkatan"
                    name="lokasi_keberangkatan"
                    className="shadow appearance-none border rounded pl-10 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  <CalendarIcon className="h-5 w-5"/> Waktu Keberangkatan
                </label>
                <div className={"flex"}>
                  <div className="h-full flex items-center mb-2">
                    <select
                        id="tanggal_option"
                        name="tanggal_option"
                        className="h-full mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={tanggalOption}
                        onChange={(e) => setTanggalOption(e.target.value)}
                    >
                      <option value="before">Sebelum</option>
                      <option value="after">Sesudah</option>
                    </select>
                  </div>
                  <input
                      type="date"
                      id="waktu_keberangkatan"
                      name="waktu_keberangkatan"
                      className="shadow appearance-none border rounded justify-start pl-3 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Waktu Keberangkatan"
                      value={waktuKeberangkatan !== 0 ? new Date(waktuKeberangkatan).toISOString().split('T')[0] : ''}
                      onChange={(e) => setWaktuKeberangkatan(Date.parse(e.target.value))}
                  />

                </div>
              </div>
              <div className="form-group flex flex-col">
                <label htmlFor="biaya" className="text-white font-bold mb-2 flex gap-2">
                  <CurrencyDollarIcon className="h-5 w-5"/> Biaya
                </label>
                <div className="flex gap-2 mb-2">
                  <select
                      id="biaya_option"
                      name="biaya_option"
                      className="shadow appearance-none border rounded pl-3 w-1/2 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={biayaOption}
                      onChange={(e) => setBiayaOption(e.target.value)}
                  >
                    <option value="less">Kurang dari</option>
                    <option value="more">Lebih dari</option>
                  </select>
                  <input
                      type="text"
                      id="biaya"
                      name="biaya"
                      className="shadow appearance-none border rounded pl-3 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Rp"
                      value={biaya}
                      onChange={(e) => setBiaya(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex md:col-span-3 justify-end mt-4 md:mt-0 md:ml-4">
                <button type="submit"
                        className="bg-blue-500 hover:bg-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cari
                </button>
                {filteredData && (
                    <button type="button" onClick={handleRemoveFilter}
                            className="bg-gray-500 hover:bg-white text-white font-bold py-2 px-4 ml-4 rounded focus:outline-none focus:shadow-outline">
                      Hapus Filter
                    </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {isLoading ? (<LoadingBar/>) : (
            <section className="py-7">
              <div id='konten' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-3'>
                {(filteredData ? filteredData : data ? data : []).map((paket: any) => (
                    <Card_Paket
                        key={paket.paketID}
                        paket={paket}
                    />
                ))}
              </div>
            </section>
        )}
      </div>
  );
}

export default PaketPage;