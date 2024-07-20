'use client'
import React, { useEffect, useState } from "react";
import {DATA_BANK} from "@/constants";
import {UserAuth} from "@/context/AuthContext";
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";
import {usePaketContext} from "@/context/PaketContext";
import "animate.css/animate.min.css";
import {Timestamp} from "@firebase/firestore";
import {addPurchase} from "@/db/query";
import { Anak, Dewasa, Paket, DetailPembelian } from "@/utils/type";
import { formatRupiah } from "@/utils/util";
import LoadingSpinner from "@/Components/LoadingSpinner";
import ConfirmationModal from "@/Components/ConfirmationModal";
import AlertModal from "@/Components/AlertModal";
import LoadingBar from "@/Components/LoadingBar";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import BackButton from "@/Components/BackButton";

const Page = () => {
    const router = useRouter();
    const params = useParams()
    const { user } = UserAuth()

    const { paket : allPaket } = usePaketContext();
    const [paketData, setPaketData] = useState<Paket | null>(null);

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const currentPaket = allPaket?.find((paket: Paket) => paket.paketID === params.paketID)
        if(currentPaket){
            setPaketData(currentPaket);
            setIsLoading(false)
        }
    }, [allPaket]);


    const [dewasaData, setDewasaData] = useState<Dewasa[]>([]);
    const [anakData, setAnakData] = useState<Anak[]>([]);

   useEffect(() => {
        const data_jamaah = sessionStorage.getItem('jamaahData')
        if (data_jamaah) {
            const parsedData = JSON.parse(data_jamaah);
            setDewasaData(parsedData.dewasa)
            setAnakData(parsedData.anak)
        } else {
            router.replace(`/paket/${params.paketID}/pemesanan`)
        }
    }, []);
    

    const [selectedPembayaran, setSelectedValue] = React.useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const dewasaCount = dewasaData.length
    const anakCount = anakData.length
    const totalJamaah = (dewasaCount+anakCount)
    const totalHarga = (paketData?.harga_dp ?? 0) * (dewasaCount + anakCount)

    const handleRadioChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    const generatePurchaseID = () => {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomString}`;
    };

    const handleBayarSekarang = () => {
        if (!selectedPembayaran) {
            OpenAlert('Pilih metode pembayaran terlebih dahulu');
            return
        } else if ((paketData?.remainingseat || 0) < totalJamaah) {
            OpenAlert(`Kuota tidak mencukupi untuk ${totalJamaah} orang. Sisa Kuota: ${paketData?.remainingseat}`);
            return
        }
        setShowConfirmation(true);
    }

    const [isLoadingUpload, setLoadingUpload] = useState(false);

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const OpenAlert = (message: string) => {
        setIsAlertOpen(true)
        setAlertMessage(message)
    }

    const CloseAlert = () => {
        setIsAlertOpen(false)
        setAlertMessage('')
    }

    const handleKonfirmasiPembayaran = async (confirm: boolean) => {
        setShowConfirmation(false)
        if (confirm) {
            if (!!paketData && !!dewasaData.length) {
                setLoadingUpload(true);

                const purchaseID = generatePurchaseID()
                const dataPembelian: DetailPembelian = {
                    purchaseID: purchaseID,
                    paketID: paketData.paketID,
                    UserID: user?.uid || "",
                    email: user?.email || "",
                    detailJamaah: {
                        dewasa: dewasaData,
                        anak: anakData
                    },
                    metodePembayaran: selectedPembayaran,
                    totalPembayaran: totalHarga,
                    tanggalPemesanan: Timestamp.fromDate(new Date()),
                    urlBuktiPembayaran: ""
                };

                await addPurchase(dataPembelian)
                sessionStorage.removeItem('jamaahData')

                setLoadingUpload(false);

                router.push(`/pembayaran-final/${purchaseID}`)
            }  else {
                OpenAlert('Data pembelian tidak lengkap');
            }
        } 
    };

    if(isLoading){
        return(
            <div className="min-h-[75vh]">
                <LoadingBar />
            </div>
        )
    }

    return (
        <div className="min-h-[75vh] flexCenter max-container padding-container">
            {isAlertOpen && <AlertModal message={alertMessage} handleClose={CloseAlert} />}
            <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row py-4 animate__animated animate__fadeInUp">
                <div className="md:border-r-2 md:pr-4 w-full md:w-[65%] border-opacity-50 mr-8 border-[#89060b]">
                    <div className="w-full">
                        <div className='hidden md:block'>
                            <BackButton link={`/paket/${params.paketID}/pemesanan`} />
                        </div>
                        <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                            Total Pembayaran
                            </p>
                            {((paketData?.harga_dp ?? 0) * (dewasaCount + anakCount)).toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            })}
                        </div>
                        <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                                Metode Pembayaran
                            </p>
                            {DATA_BANK.map((value, index) => (
                                <label key={index} htmlFor={`bayar${index}`} className="items-center">
                                    <div className="rounded-md mr-4">
                                        <div className="flex justify-between p-4 font-bold text-[#552719]">
                                            <div className="flex gap-2 items-center">
                                                <Image src={value.img} alt="logo-bank" width={24} height={24} />
                                                <p className="mr-4">{value.nama}</p>
                                            </div>
                                            <input
                                                type="radio"
                                                id={`bayar${index}`}
                                                name="pembayaran"
                                                value={value.nama}
                                                onChange={handleRadioChange}
                                                className="w-6 border bg-black"
                                            />
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="my-8 w-full flex justify-end">
                            <button onClick={handleBayarSekarang} className="flex bg-[#89060b] font-bold text-white w-fit rounded-lg p-4 duration-200 hover:bg-black">
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sticky w-full md:w-[40%] justify-center">
                    <div className='md:hidden'>
                        <BackButton link={`/paket/${params.paketID}/pemesanan`} />
                    </div>
                    <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                        <div className=" text-center font-bold text-xl md:text-2xl my-4 pt-4 text-[#f14310]">
                            Detail Pemesanan
                        </div>
                        <p className="text-center mx-8 font-bold text-md md:text-xl mt-4 text-[#89060b]">{paketData?.title}</p>
                        <div className="p-4">
                            <table className="w-full border-collapse">
                                <tbody>
                                <tr>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">DP
                                        Paket
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{dewasaCount + anakCount} Orang</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">
                                        <p>{typeof paketData?.harga_dp === 'string' ? formatRupiah(parseInt(paketData?.harga_dp)) : formatRupiah(paketData?.harga_dp || 0)}</p>
                                    </td>
                                </tr>
                                <tr className="font-bold">
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] text-center lg:text-[16px]"
                                        colSpan={2}>Total Biaya
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{totalHarga.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                        <div className=" text-center font-bold text-xl md:text-2xl my-4 pt-4 text-[#f14310]">
                            Detail Jamaah
                        </div>
                        <div className="px-4 pb-4">
                            <p className={"px-2 font-bold"}>Dewasa</p>
                            <table className="w-full border-collapse mb-4">
                                <tbody>
                                {dewasaData.map((person) => (
                                    <tr key={person.nama}>
                                        <td className="w-1/2 border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.nama}</td>
                                        <td className="w-1/2 border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.telp}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {!!anakData.length && <p className={"px-2 font-bold"}>Anak-anak</p>}
                            <table className="w-full border-collapse">
                                <tbody>
                                {anakData.map((person) => (
                                    <tr key={person.nama}>
                                        <td className="w-1/2 border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.nama}</td>
                                        <td className="w-1/2 border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.tgl_lahir}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isLoadingUpload && <LoadingSpinner overlay />}
            {showConfirmation && (
                <ConfirmationModal handleKonfirmasi={handleKonfirmasiPembayaran} message={"Apakah Anda yakin ingin melakukan pembayaran? Harap periksa kembali data yang anda masukkan, pastikan data tersebut sudah benar."}/>
            )}
        </div>
    );
};

export default Page;
