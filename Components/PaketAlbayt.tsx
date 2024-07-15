"use client"
import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import {usePaketContext} from "@/context/PaketContext";
import LoadingBar from "@/Components/LoadingBar";
import Card_Paket from "@/Components/Card_Paket";

const PaketAlbayt = () => {

  const { paket: data } = usePaketContext();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    if (data.length > 0){
      setIsLoading(false)
    }
  }, [data]);

  return (
    <>
      <section className="max-container padding-container py-7 bg-[url('/images/bg-paket.jpg')] bg-no-repeat">

        {/* JUDUL SECTIOn */}
        <div id='judul section' className='items-center text-center mt-6 mb-12'>
          <h1 className='font-medium text-[#89060b] text-4xl lg:text-6xl'>
            PAKET <span className='font-bold text-[#f14310]'>ALBAYT</span>
          </h1>
        </div>

        {isLoading ? (<LoadingBar />) : (
            <div className='xl:px-24 lg:px-2 md:px-16 sm:px-20'>
              {/* ISI KONTEN / CARD */}
              <div id='konten' className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-3'>
                {data?.slice(0, 6).map((paket) => (
                    <Card_Paket
                        key={paket.paketID}
                        paket = {paket}
                    />
                ))}
              </div>

              <Link href={'/paket'}>
                <div className='flexCenter my-8'>
                  <button
                      className='font-bold text-white  text-[16px] lg:text-xl bg-[#f14310] px-4 py-3 rounded-full border duration-200 ease-in-out hover:bg-white hover:text-[#f14310] hover:border hover:border-[#f14310]'>
                    Lihat Selengkapnya
                  </button>
                </div>
              </Link>
            </div>
        )}

      </section>
    </>
  )
}

export default PaketAlbayt