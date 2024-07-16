"use client"
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import LoadingBar from '@/Components/LoadingBar';
import "animate.css/animate.min.css";
import {ambilDetailPembayaran} from "@/db/query";
import { formateDateTime, formatRupiah } from '@/utils/util';
import { DataPembelian } from '@/utils/type';
import ImageWithLoading from '@/Components/ImageWithLoading';
import ImagePreview from '@/Components/ImagePreview';

const Page = () => {
  const params = useParams();
  const router = useRouter()
  const { user } = UserAuth()
  const [riwayatPembelian, setRiwayatPembelian] = useState<DataPembelian>();
  const [isLoading, setLoading ] = useState<boolean>(true)

  useEffect(() => {
    if (user != null) {
      (async () => {
        try {
          const response = await ambilDetailPembayaran(String(params.purchaseID));
          if (user?.uid == response?.detailPembelian.UserID){
            setRiwayatPembelian(response as DataPembelian);
          } else {
            router.push('/')
          }
        } catch (Error) {
          console.error('Error fetching data:', Error);
        } 
      })();
    }
  }, [user]);

  useEffect(() => setLoading(!riwayatPembelian), [riwayatPembelian]);

  const [imagePreviewToggle, setImagePreviewToggle] = useState(false)
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>('')

  const handleSelectPreview = (e: React.MouseEvent<HTMLImageElement>) => {
    setImagePreviewSrc(e.currentTarget.src);
    setImagePreviewToggle(true)
  };

  const handlePreviewClose = () => {
    setImagePreviewToggle(false)
  }

  return (
    <section className='max-container padding-container py-8 min-h-[70vh]'>
      <h1 className='font-bold text-[#f14310] text-4xl lg:text-5xl text-center'>DETAIL TRANSAKSI</h1>
      <div className='my-10'>
          {isLoading ? (<LoadingBar />) : (
            <div className='lg:mx-72 p-6 border rounded-xl my-10 animate__animated animate__fadeInUp'>
            <div className='flex flex-col gap-5 mx-50'>
              <div>
                <h3 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>ID Pembelian</h3>
                <p className='font-semibold text-[14px] md:text-[16px]'>{riwayatPembelian?.detailPembelian?.purchaseID}</p>
              </div>
  
              <div>
                <h3 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Status</h3>
                <p className={`py-1 px-2 font-bold w-fit ${riwayatPembelian?.detailPembelian.statusPembayaran === 'Berhasil' ? 'text-green-600 bg-green-100' : riwayatPembelian?.detailPembelian.statusPembayaran === 'Menunggu Konfirmasi' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>{riwayatPembelian?.detailPembelian.statusPembayaran}</p>
              </div>
  
              <div>
                <h3 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Tanggal Transaksi</h3>
                <p className='font-semibold text-[14px] md:text-[16px]'>
                  {formateDateTime(riwayatPembelian?.detailPembelian?.tanggalPemesanan?.seconds || 0)}
                </p>
              </div>
            </div>
  
            <div className='border-b rounded-full my-7'/>
  
            <div>
              <h3 className='font-semibold text-[16px] lg:text-lg'>Detail Pembelian</h3>
  
              <div className='flex gap-5 my-4'>
                <div className='flex flex-col gap-1 w-[60%]'>
                  <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Nama Paket</h3>
                  <p className='font-semibold text-[13px] md:text-[14px]'>{riwayatPembelian?.detailPaket?.title}</p>
                </div>
  
                <div className='flex flex-col gap-1 w-[40%]'>
                  <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Metode Pembayaran</h3>
                  <p className='font-semibold text-[13px] md:text-[14px]'>{riwayatPembelian?.detailPembelian?.metodePembayaran}</p>
                </div>
              </div>
  
              <div className='flex gap-5'>
                <div className='flex flex-col gap-1'>
                  <h3 className='font-medium text-[12px] md:text-[14px] text-gray-50'>Nominal</h3>
                  <p className='font-semibold text-[13px] md:text-[14px]'>{formatRupiah(riwayatPembelian?.detailPembelian?.totalPembayaran || 0)}</p>
                </div>
              </div>
            </div>
  
            <div className='border-b rounded-full my-7'/>
  
            <div>
              <h3 className='font-semibold text-[16px] lg:text-lg'>Detail Jamaah</h3>
  
              {riwayatPembelian?.detailPembelian?.detailJamaah?.dewasa && (
                  <div className='mt-4'>
                    <h4 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Jamaah Dewasa</h4>
                    {riwayatPembelian.detailPembelian.detailJamaah.dewasa.map((dewasa, index) => (
                        <div key={index} className='flex gap-5'>
                          <div className='flex gap-8'>
                            <p className='font-semibold text-[13px] md:text-[14px]'>Nama: {dewasa.nama}</p>
                            <p className='font-semibold text-[13px] md:text-[14px]'>Telepon: {dewasa.telp}</p>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
  
              {riwayatPembelian?.detailPembelian?.detailJamaah?.anak && riwayatPembelian?.detailPembelian?.detailJamaah?.anak.length > 0 && (
                  <div className='my-4'>
                    <h4 className='font-medium text-gray-50 text-[12px] md:text-[14px]'>Jamaah Anak-anak</h4>
                    {riwayatPembelian.detailPembelian.detailJamaah.anak.map((anak, index) => (
                        <div key={index} className='flex gap-5'>
                          <div className='flex gap-8'>
                            <p className='font-semibold text-[13px] md:text-[14px]'>Nama: {anak.nama}</p>
                            <p className='font-semibold text-[13px] md:text-[14px]'>Tanggal Lahir: {anak.tgl_lahir}</p>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
  
            <div className='border-b rounded-full my-7'/>
  
            <div>
              <h3 className='font-semibold text-[16px] lg:text-lg mb-4'>Bukti Pembayaran</h3>
  
              {riwayatPembelian?.detailPembelian.statusPembayaran === "Belum Dibayar" ? (
                  <Link href={`/pembayaran-final/${riwayatPembelian?.detailPembelian.purchaseID}`}>
                    <button className='mt-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-[#f14310] rounded-lg duration-200 hover:bg-black'>Ke Halaman Pembayaran</button>
                  </Link>
              ) : riwayatPembelian?.detailPembelian.statusPembayaran === "Menunggu Konfirmasi" ? (
                  <div>
                    <div className='w-full min-h-32 hover:cursor-pointer'>
                      <ImageWithLoading onClick={handleSelectPreview} height='auto' width='60%' src={riwayatPembelian?.detailPembelian.urlBuktiPembayaran} alt={'Foto Bukti Pembayaran'} />
                    </div>
                    <Link href={`https://wa.me/628122586045?text=Assalammualaikum, Saya ingin mengonfirmasi pembelian dengan ID pembelian ${riwayatPembelian?.detailPembelian.purchaseID}`} target='blank' rel="noopener noreferrer">
                      <button className='mt-8 flex items-center gap-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-green-50 rounded-lg duration-200 hover:bg-black'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className='fill-white'><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                          <p>Konfirmasi WhatsApp</p>
                      </button>
                    </Link>
                  </div>
              ) : (
                <div>
                    <div className='w-full min-h-32 hover:cursor-pointer'>
                      <ImageWithLoading onClick={handleSelectPreview} height='auto' width='60%' src={riwayatPembelian?.detailPembelian.urlBuktiPembayaran || ""} alt={'Foto Bukti Pembayaran'} />
                    </div>
                </div>
              )}
            </div>
          </div>
          )}
      </div>

      {imagePreviewToggle && <ImagePreview  src={imagePreviewSrc} onClose={handlePreviewClose}/>}
    </section>
  )
}

export default Page