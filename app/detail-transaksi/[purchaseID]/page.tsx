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
import WhatsappIcon from '@/public/icon/WhatsappIcon.svg'
import BackButton from '@/Components/BackButton';

const Page = () => {
    const params = useParams();
    const router = useRouter()
    const { user } = UserAuth()
    const [riwayatPembelian, setRiwayatPembelian] = useState<DataPembelian | null>();
    const [isLoading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    const response: DataPembelian | null = await ambilDetailPembayaran(String(params.purchaseID));
                    if (user?.uid == response?.detailPembelian.UserID){
                        setRiwayatPembelian(response);
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
    <section className='max-container padding-container py-8 min-h-[75vh]'>
        <h1 className='font-bold text-[#f14310] text-4xl md:text-5xl text-center'>DETAIL TRANSAKSI</h1>
        <div className='my-10'>
            {isLoading ? (
                <LoadingBar />
            ) : (
                <div className='flexCenter'>
                    <div className='w-full max-w-3xl p-6 border rounded-xl animate__animated animate__fadeInUp'>
                        <div className='mb-6'>
                            <BackButton link={`/riwayat-pembelian`} className='h-8'/>
                        </div>
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

                        <div className='border-b rounded-full my-7' />

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
                                    <h4 className='text-center bg-gray-10 rounded-sm font-medium text-[14px] md:text-[15px] mb-2'>Jamaah Dewasa</h4>
                                    <div className='w-full flex flex-col gap-3'>
                                        {riwayatPembelian.detailPembelian.detailJamaah.dewasa.map((dewasa, index) => (
                                            <div key={index} className='w-full grid md:grid-cols-2 border-b-2'>
                                                <div className='flex'>
                                                    <p className='font-medium text-[12px] md:text-[13px] text-gray-50'>Nama:</p>
                                                    <p className='font-semibold text-[13px] md:text-[14px] ml-1'>{dewasa.nama}</p>
                                                </div>
                                                <div className='flex'>
                                                    <p className='font-medium text-[12px] md:text-[13px] text-gray-50'>Telepon:</p>
                                                    <p className='font-semibold text-[13px] md:text-[14px] ml-1'>{dewasa.telp}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {riwayatPembelian?.detailPembelian?.detailJamaah?.anak && riwayatPembelian?.detailPembelian?.detailJamaah?.anak.length > 0 && (
                            <div className='my-4'>
                                <h4 className='text-center bg-gray-10 rounded-sm font-medium text-[14px] md:text-[15px] mb-2'>Jamaah Anak-anak</h4>
                                <div className='w-full flex flex-col gap-3'>
                                    {riwayatPembelian.detailPembelian.detailJamaah.anak.map((anak, index) => (
                                        <div key={index} className='w-full grid md:grid-cols-2 border-b-2'>
                                            <div className='flex'>
                                                <p className='font-medium text-[12px] md:text-[13x] text-gray-50'>Nama:</p>
                                                <p className='font-semibold text-[13px] md:text-[14px] ml-1'>{anak.nama}</p>
                                            </div>
                                            <div className='flex'>
                                                <p className='font-medium text-[12px] md:text-[13px] text-gray-50'>Tanggal Lahir:</p>
                                                <p className='font-semibold text-[13px] md:text-[14px] ml-1'>{anak.tgl_lahir}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}
                        </div>
                        <div className='border-b rounded-full my-7'/>
                            <div>
                                <h3 className='font-semibold text-[16px] lg:text-lg mb-4'>Bukti Pembayaran</h3>
                                {(riwayatPembelian?.detailPembelian.statusPembayaran === "Belum Dibayar" || riwayatPembelian?.detailPembelian.statusPembayaran === "Berkas Ditolak") ? (
                                    <Link href={`/pembayaran-final/${riwayatPembelian?.detailPembelian.purchaseID}`}>
                                        <button className='mt-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-yellow-600 rounded-lg duration-200 hover:bg-black'>Ke Halaman Pembayaran</button>
                                    </Link>
                                ) : riwayatPembelian?.detailPembelian.statusPembayaran === "Menunggu Konfirmasi" ? (
                                    <div>
                                        <div className='w-full min-h-32 hover:cursor-pointer'>
                                            <ImageWithLoading onClick={handleSelectPreview} height='auto' width='60%' src={riwayatPembelian?.detailPembelian.urlBuktiPembayaran} alt={'Foto Bukti Pembayaran'} />
                                        </div>
                                        <Link href={`https://wa.me/628122586045?text=Assalammualaikum, Saya ingin mengonfirmasi pembelian dengan ID pembelian ${riwayatPembelian?.detailPembelian.purchaseID}`} target='blank' rel="noopener noreferrer">
                                        <button className='mt-8 flex items-center gap-2 py-2 px-4 font-semibold text-white text-[12px] lg:text-[14px] bg-green-50 rounded-lg duration-200 hover:bg-black'>
                                            <WhatsappIcon fill="white" />
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
                </div>
            )}
        </div>
        {imagePreviewToggle && 
            <ImagePreview  src={imagePreviewSrc} onClose={handlePreviewClose}/>
        }
    </section>
  )
}

export default Page