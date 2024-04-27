"use client"
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import {useParams} from "next/navigation";
import {PackageProps} from "@/Components/Card_Paket";

export interface PurchaseDetail {
  UserID: string;
  purchaseID: string;
  paketID: string;
  totalPembayaran: number;
  statusPembayaran: string;
  metodePembayaran: string;
  tanggalPemesanan: string;
  email: string;
}

export interface PurchaseHistory {
  detailPembelian: PurchaseDetail;
  detailPaket: PackageProps;
}

const page = () => {
  const params = useParams();
  const { user } = UserAuth()
  const [riwayatPembelian, setRiwayatPembelian] = useState<PurchaseHistory>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detail_transaksi/${params.purchaseID}`);
        if (!response.ok) {
          console.log('Failed to fetch data');
        }
        const data = await response.json();
        if (user?.uid == data.detailPembelian.UserID){
          setRiwayatPembelian(data);
        }
      } catch (Error) {
        console.error('Error fetching data:', Error);
      }
    };
    if (user != null) {
      fetchData().then();
    }
  }, [user, riwayatPembelian]);

  return (
    <>
      <section className='max-container padding-container py-8'>
        <h1 className='font-bold text-[#f14310] text-4xl lg:text-5xl text-center'>DETAIL TRANSAKSI</h1>
        <div className='lg:mx-72 p-6 border rounded-xl my-10'>
          <div className='flex flex-col gap-5 mx-50'>
            <div>
              <h3 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Status</h3>
              <p className='font-semibold text-[14px] md:text-[16px]'>{riwayatPembelian?.detailPembelian?.statusPembayaran}</p>
            </div>

            <div>
              <h3 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Tanggal Transaksi</h3>
              <p className='font-semibold text-[14px] md:text-[16px]'>
                {riwayatPembelian?.detailPembelian?.tanggalPemesanan ?
                    new Date(riwayatPembelian.detailPembelian.tanggalPemesanan).toLocaleDateString() :
                    ''}
              </p>
            </div>
          </div>

          <div className='border-b rounded-full my-7'/>

          <div>
            <h3 className='font-semibold text-[16px] lg:text-lg'>Detail Pembelian</h3>

            <div className='flex gap-5 my-4'>
              <div className='flex flex-col gap-1 w-[60%]'>
                <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Nama Paket</h3>
                <p className='font-semibold text-[13px] md:text-[14px] text-justify'>{riwayatPembelian?.detailPaket?.title}</p>
              </div>

              <div className='flex flex-col gap-1 w-[40%]'>
                <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Metode Pembayaran</h3>
                <p className='font-semibold text-[13px] md:text-[14px]'>{riwayatPembelian?.detailPembelian?.metodePembayaran}</p>
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex flex-col gap-1'>
                <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Nominal</h3>
                <p className='font-semibold text-[13px] md:text-[14px]'>{riwayatPembelian?.detailPembelian?.totalPembayaran.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                })}</p>
              </div>
            </div>
          </div>

          <div className='border-b rounded-full my-7'/>

        </div>
      </section>
    </>
  )
}

export default page