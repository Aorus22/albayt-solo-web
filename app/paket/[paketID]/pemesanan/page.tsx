'use client'
import React, { useEffect, useState } from "react";
import {UserAuth} from "@/context/AuthContext";
import {useParams, useRouter} from "next/navigation";
import {usePaketContext} from "@/context/PaketContext";
import "animate.css/animate.min.css";
import { Anak, Dewasa, Paket } from "@/utils/type";
import { formatRupiah } from "@/utils/util";
import LoadingBar from "@/Components/LoadingBar";
import AlertModal from "@/Components/AlertModal";
import BackButton from "@/Components/BackButton";

const Page = () => {
    const { user } = UserAuth()
    const params = useParams()
    const router = useRouter()

    const { paket : allPaket } = usePaketContext();
    const [paketData, setPaketData] = useState<Paket>();

    useEffect(() => {
        const currentPaket = allPaket?.find((paket: Paket) => paket.paketID === params.paketID)
        setPaketData(currentPaket);
    }, [allPaket]);


    const [dewasaCount, setDewasaCount] = useState<number | null>(null);
    const [anakCount, setAnakCount] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] = useState("uang_muka");
    const [dewasaData, setDewasaData] = useState<Dewasa[]>([]);
    const [anakData, setAnakData] = useState<Anak[]>([]);

    useEffect(() => {
        const data_jamaah = sessionStorage.getItem('jamaahData')
        if (data_jamaah) {
            const parsedData = JSON.parse(data_jamaah);
            setDewasaData(parsedData.dewasa)
            setDewasaCount(parsedData.dewasa.length || 0)
            setAnakData(parsedData.anak)
            setAnakCount(parsedData.anak.length || 0)
        }
    }, []);


    const handleDewasaCountChange = (event: any) => {
        setDewasaCount(parseInt(event.target.value));
    };

    const handleAnakCountChange = (event: any) => {
        setAnakCount(parseInt(event.target.value));
    };

    const handleDewasaChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newArray = [...dewasaData];
        newArray[index] = { ...newArray[index], [event.target.name]: event.target.value };
        setDewasaData(newArray);
    };

    const handleAnakChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newArray = [...anakData];
        newArray[index] = { ...newArray[index], [event.target.name]: event.target.value };
        setAnakData(newArray);
    };

    useEffect(() => {
        if (dewasaCount !== null) {
          if (dewasaCount < dewasaData.length) {
            setDewasaData(dewasaData.slice(0, dewasaCount));
          } else if (dewasaCount > dewasaData.length) {
            const additionalData = Array(dewasaCount - dewasaData.length).fill({} as Dewasa);
            setDewasaData([...dewasaData, ...additionalData]);
          }
        }
      }, [dewasaCount, dewasaData]);
    
    useEffect(() => {
        if (anakCount !== null) {
          if (anakCount < anakData.length) {
            setAnakData(anakData.slice(0, anakCount));
          } else if (anakCount > anakData.length) {
            const additionalData = Array(anakCount - anakData.length).fill({} as Anak);
            setAnakData([...anakData, ...additionalData]);
          }
        }
      }, [anakCount, anakData]);


    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPayment(event.target.value);
    };

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

    const handleLanjutkanPembayaran = () => {
        if (!!!dewasaCount ) {
            OpenAlert('Pastikan terisi minimal satu jamaah dewasa')
            return;
          } else if (
            dewasaData.length !== dewasaCount ||
            anakData.length !== (anakCount ?? 0) ||
            !dewasaData.every((dewasa) => dewasa.nama !== "" && dewasa.telp !== "" && Object.keys(dewasa).length === 2) ||
            !anakData.every((anak) => anak.nama !== "" && anak.tgl_lahir !== "" && Object.keys(anak).length === 2)
          ) {
            OpenAlert("Lengkapi semua form terlebih dahulu");
            return;
          }

        const jamaahData = {
            dewasa: dewasaData,
            anak: anakData
        };

        sessionStorage.setItem('jamaahData', JSON.stringify(jamaahData));
        router.push("pembayaran")
    };

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(user && paketData){
            setIsLoading(false)
        }
    }, [user, paketData])

    const userImage = user?.photoURL || "";
    const userName = user?.displayName || "";
    // const userEmail = user.email || "";

    if(isLoading){
        return(
            <div className="min-h-[75vh]">
                <LoadingBar />
            </div>
        )
    }

    return (
        <div className="min-h-[75vh] flexCenter">
            {isAlertOpen && <AlertModal message={alertMessage} handleClose={CloseAlert} />}
            <div className="md:flex py-8 max-container padding-container animate__animated animate__fadeInUp">
                <div className="pr-0 mr-0 pb-8 mb-8 border-b-2 border-r-0 md:pr-16 md:mr-16 md:pb-0 md:mb-0 md:border-b-0 md:border-r-2 border-[#89060b] border-opacity-50 md:w-[65%]">
                    <div>
                        <BackButton link={`/paket/${params.paketID}`} />
                        <div
                            className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                                Nama Pemesan
                            </p>
                            <div className="flex gap-4 items-center">
                                <img
                                    className="rounded-full h-12"
                                    alt="Foto Profil"
                                    src={userImage}
                                ></img>
                                <p>{userName}</p>
                            </div>
                        </div>
                        <div
                            className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                                Tipe Pembayaran
                            </p>
                            <label htmlFor="bayar1" className="items-center">
                                <div className="border border-gray-20 opacity-75 rounded-md lg:mr-4">
                                    <div className="flex justify-between p-4 bg-[#ffa488] font-bold text-[#552719]">
                                        <p className="mr-4 text-sm">Bayar Uang Muka - {formatRupiah(paketData?.harga_dp || 0)} (per orang)</p>
                                        <input
                                            type="radio"
                                            id="bayar1"
                                            name="pembayaran"
                                            value="uang_muka"
                                            className="w-6 border bg-black"
                                            checked={selectedPayment === "uang_muka"}
                                            onChange={handlePaymentChange}
                                        />
                                    </div>
                                    <div className="p-4">
                                        {/*<div className="bg-[#f14310] rounded-md text-white text-center p-4 mb-4">2x Bayar</div>*/}
                                        {/*<h2 className="text-xl font-bold mb-4">Tahapan</h2>*/}
                                        {/*<table className="w-full border-collapse">*/}
                                        {/*    <thead>*/}
                                        {/*        <tr>*/}
                                        {/*            <th className="border-b border-gray-200 p-2 text-left">Tahapan</th>*/}
                                        {/*            <th className="border-b border-gray-200 p-2 text-left">Jatuh Tempo</th>*/}
                                        {/*            <th className="border-b border-gray-200 p-2 text-left">Biaya</th>*/}
                                        {/*        </tr>*/}
                                        {/*    </thead>*/}
                                        {/*    <tbody>*/}
                                        {/*        <tr>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Uang Muka</td>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">31 Mar 2024</td>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 20.000.000</td>*/}
                                        {/*        </tr>*/}
                                        {/*        <tr>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Bayar ke - 2</td>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">02 Apr 2024</td>*/}
                                        {/*            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 111.000.000</td>*/}
                                        {/*        </tr>*/}
                                        {/*    </tbody>*/}
                                        {/*</table>*/}
                                    </div>
                                </div>
                            </label>
                            <div className="mt-4"></div>
                            {/* <label htmlFor="bayar1" className="items-center">
                            <div className="border border-gray-20 opacity-75 rounded-md mr-4">
                                <div className="flex justify-between p-4 bg-[#ffa488] font-bold text-[#552719]">
                                    <div className="">
                                        <p className="mr-4">Bayar Lunas - Rp 60.000.000</p>
                                    </div>
                                    <input
                                        type="radio"
                                        id="bayar1"
                                        name="pembayaran"
                                        value="uang_muka"
                                        className="w-6 border bg-black"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="bg-[#f14310] rounded-md text-white text-center p-4 mb-4">2x Bayar</div>
                                    <h2 className="text-xl font-bold mb-4">Tahapan</h2>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border-b border-gray-200 p-2 text-left">Tahapan</th>
                                                <th className="border-b border-gray-200 p-2 text-left">Jatuh Tempo</th>
                                                <th className="border-b border-gray-200 p-2 text-left">Biaya</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-b border-gray-200 p-2">Lunas</td>
                                                <td className="border-b border-gray-200 p-2">31 Mar 2024</td>
                                                <td className="border-b border-gray-200 p-2">Rp 60.000.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </label> */}

                        </div>

                        <div
                            className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                                Jumlah Jamaah
                            </p>
                            <form>
                                <div className="items-center mb-4 sm:w-full md:w-56">
                                    <div className="mb-4 flex justify-between items-center">
                                        <label htmlFor="dewasa" className="mr-12">Dewasa</label>
                                        <input className="border border-[#f14310] rounded-lg p-2 w-16" type="number"
                                                id="dewasa" name="dewasa" min="0" value={dewasaCount ?? ""}
                                                onChange={handleDewasaCountChange}/>
                                    </div>
                                    <div className="mb-4 flex justify-between items-center">
                                        <label htmlFor="anak" className="mr-12">Anak</label>
                                        <input className="border border-[#f14310] rounded-lg p-2 w-16" type="number"
                                                id="anak" name="anak" min="0" value={anakCount ?? ""}
                                                onChange={handleAnakCountChange}/>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div
                            className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                            <p className="font-bold text-xl md:text-2xl mb-4 text-[#f14310]">
                                Detail Jamaah
                            </p>
                            
                            {!!!dewasaCount && !!!anakCount && (
                                <p className="font-medium text-gray-30 text-sm">Belum terdapat jamaah yang ditambahkan!</p>
                            )}

                            <form>
                                {!!dewasaCount && (
                                    <fieldset>
                                        <h1 className="font-bold mb-4">Dewasa</h1>
                                        {[...Array(dewasaCount || 0)].map((_, index) => (
                                            <div key={`dewasa_${index}`} className="grid grid-cols-2 mb-4">
                                                <label className="block h-10" htmlFor={`nama_dewasa_${index}`}>
                                                    Nama
                                                </label>
                                                <input
                                                    className="border border-[#f14310] rounded-lg mb-1 px-2"
                                                    type="text"
                                                    id={`nama_dewasa_${index}`}
                                                    name={`nama`}
                                                    onChange={(e) => handleDewasaChange(e, index)}
                                                    value={dewasaData[index]?.nama || ""}
                                                    required
                                                />
                                                <label className="block h-10" htmlFor={`telp_dewasa_${index}`}>
                                                    No Telp (Whatsapp)
                                                </label>
                                                <input
                                                    className="border border-[#f14310] rounded-lg px-2"
                                                    type="tel"
                                                    id={`telp_dewasa_${index}`}
                                                    name={`telp`}
                                                    value={dewasaData[index]?.telp || ""}
                                                    onChange={(e) => handleDewasaChange(e, index)}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </fieldset>
                                )}

                                {!!anakCount && (
                                    <fieldset>
                                        <h1 className="font-bold mb-4">Anak-anak</h1>
                                        {[...Array(anakCount || 0)].map((_, index) => (
                                            <div key={`anak_${index}`} className="grid grid-cols-2 mb-4">
                                                <label className="block h-10" htmlFor={`nama_anak_${index}`}>
                                                    Nama
                                                </label>
                                                <input
                                                    className="border border-[#f14310] rounded-lg mb-1 px-2"
                                                    type="text"
                                                    id={`nama_anak_${index}`}
                                                    name={`nama`}
                                                    value={anakData[index]?.nama || ""}
                                                    onChange={(e) => handleAnakChange(e, index)}
                                                    required
                                                />
                                                <label className="block h-10" htmlFor={`tgl_lahir_anak_${index}`}>
                                                    Tanggal Lahir
                                                </label>
                                                <input
                                                    className="border border-[#f14310] rounded-lg px-2"
                                                    type="date"
                                                    id={`tgl_lahir_anak_${index}`}
                                                    name={`tgl_lahir`}
                                                    value={anakData[index]?.tgl_lahir || ""}
                                                    onChange={(e) => handleAnakChange(e, index)}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </fieldset>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="sticky md:w-[40%] justify-center my-4 md:my-2">
                    <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                        <div className=" text-center font-bold text-xl md:text-2xl my-4 pt-4 text-[#f14310]">
                            Detail Pemesanan
                        </div>
                        <p className="text-center mx-8 font-bold text-md md:text-xl mt-4 text-[#89060b]">
                            {paketData?.title}
                        </p>
                        <div className="p-4">
                            <table className="w-full border-collapse">
                                <tbody className="text-center">
                                <tr>
                                    <td className="border-b w-24 border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">
                                        DP
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{(dewasaCount || 0) + (anakCount || 0)} Orang</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">
                                        <p>{typeof paketData?.harga_dp === 'string' ? formatRupiah(parseInt(paketData?.harga_dp)) : formatRupiah(paketData?.harga_dp || 0)}</p>
                                    </td>
                                </tr>
                                {/*<tr>*/}
                                {/*    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Harga Paket Anak-anak (x1)</td>*/}
                                {/*    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Rp 111.000.000</td>*/}
                                {/*</tr>*/}
                                <tr className="font-bold">
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] text-center lg:text-[16px]"
                                        colSpan={2}>Total Biaya
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{( ((paketData?.harga_dp || 0) * ((dewasaCount || 0) + (anakCount || 0))) ).toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="my-8 w-full flex justify-end" onClick={handleLanjutkanPembayaran}>
                        <button
                            className="flex bg-[#89060b] font-bold text-white text-[14px] lg:text-[16px] w-fit rounded-lg p-4 duration-200 hover:bg-black">
                            Lanjutkan ke Pembayaran
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;
