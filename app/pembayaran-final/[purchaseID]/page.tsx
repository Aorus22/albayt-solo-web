'use client'
import React, { useEffect, useState } from "react";
import {DATA_BANK} from "@/constants";
import {useParams, useRouter} from "next/navigation";
import {UserAuth} from "@/context/AuthContext";
import LoadingBar from "@/Components/LoadingBar";
import "animate.css/animate.min.css";
import {addBuktiPembelian, ambilDetailPembayaran} from "@/db/query";
import { Anak, DataPembelian, Dewasa } from "@/utils/type";
import LoadingSpinner from "@/Components/LoadingSpinner";

const Page = () => {
    const [riwayatPembelian, setRiwayatPembelian] = useState<DataPembelian>();
    const router = useRouter();
    const params = useParams();
    const { user } = UserAuth()
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

    const dewasaData = riwayatPembelian?.detailPembelian.detailJamaah.dewasa
    const dewasaCount = dewasaData?.length || 0
    const anakData = riwayatPembelian?.detailPembelian.detailJamaah.anak
    const anakCount = anakData?.length || 0
    const currentBank = DATA_BANK.find((bank) => bank.nama === riwayatPembelian?.detailPembelian.metodePembayaran);
    const paketData = riwayatPembelian?.detailPaket

    const [previewUrl, setPreviewUrl] = useState<any>();
    const [file, setFile] = useState<File>()

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64URL = reader.result;
                setPreviewUrl(base64URL);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile)
        }
    };

    const [isLoadingUpload, setLoadingUpload] = useState(false);

    const handleSubmit = async () => {
        if (!file) {
            alert('No file selected');
            return;
        }

        setLoadingUpload(true);

        try {
            const url = `https://google-drive-storage.solo-albayt.workers.dev/user_data/${riwayatPembelian?.detailPembelian?.email}/${riwayatPembelian?.detailPembelian?.purchaseID}.png`
            const response = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type
                }
            });

            if (!response.ok) {
                console.log('Failed to upload file');
                return;
            }

            if (riwayatPembelian?.detailPembelian.purchaseID) {
                await addBuktiPembelian(riwayatPembelian?.detailPembelian.purchaseID, url);
            }

            router.push(`/detail-transaksi/${riwayatPembelian?.detailPembelian.purchaseID}`);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoadingUpload(false);
        }
    };

    return (
        <div className="min-h-[45vh]">
            {isLoadingUpload && <LoadingSpinner overlay />}
            {isLoading ? (<LoadingBar />) : (
                <div className="flex flex-col md:flex-row py-4 max-container padding-container animate__animated animate__fadeInUp">
                <div className="md:border-r-2 lg:pl-40 md:pr-4 w-full md:w-[65%] border-opacity-50 mr-8 border-[#89060b]">
                    <div>
                        <div
                            className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-6 shadow">
                            <p className="font-bold text-2xl mb-4 text-[#f14310]">
                                Silakan Transfer
                            </p>
                            <div className="flex gap-2 items-center">
                                <img src={currentBank?.img} alt="logo-bank" className="h-7 w-7" />
                                <p className="font-bold text-[16px]">{currentBank?.nama}</p>
                            </div>
                            <div className="font-medium text-[16px]">No Rekening: {currentBank?.rekening}</div>
                        </div>
                        <div className="border rounded border-[rgba(0,0,0,0.16)] mt-4 justify-center bg-white p-6 shadow">
                            <p className="font-bold block text-2xl mb-4 text-[#f14310]">
                                Upload Bukti Transfer
                            </p>
                            <div className="border border-gray-20 border-opacity-50 h-fit p-6 rounded-md">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer duration-200 hover:bg-black"
                                > Pilih File
                                </label>
                                {previewUrl && (
                                    <div className="mt-4 w-1/2">
                                        <img src={previewUrl} alt="Preview" className="mt-2 max-h-72" style={{maxWidth: '100%'}}/>
                                    </div>
                                )}
                            </div>
                        </div>
    
                        <div className="my-8 w-full flex justify-end">
                            <button onClick={handleSubmit} className="flex bg-[#89060b] font-bold text-white w-fit rounded-lg p-4 duration-200 hover:bg-black">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sticky md:w-[40%] justify-center">
                    <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                        <div className=" text-center font-bold text-2xl my-4 pt-4 text-[#f14310]">
                            Detail Pemesanan
                        </div>
                        <p className="text-center mx-8 font-bold text-[16px] lg:text-lg mt-4 text-[#89060b]">
                            {paketData?.title}
                        </p>
                        <div className="p-4">
                            <table className="w-full border-collapse">
                                <tbody>
                                <tr>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">DP
                                        Paket
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{dewasaCount + anakCount} Orang</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{paketData?.harga_dp.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })}</td>
                                </tr>
                                <tr className="font-bold">
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] text-center lg:text-[16px]"
                                        colSpan={2}>Total Biaya
                                    </td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{((paketData?.harga_dp ?? 0) * (dewasaCount + anakCount)).toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    })}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                        <div className=" text-center font-bold text-2xl my-4 pt-4 text-[#f14310]">
                            Detail Jamaah
                        </div>
                        <div className={"pl-4"}>
                            <div className="px-4 pb-4">
                                <p className={"font-bold"}>Dewasa</p>
                                <table className="w-full border-collapse mb-4">
                                    <tbody>
                                    {dewasaData?.map((person: Dewasa) => (
                                        <tr key={person.nama}>
                                            <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.nama}</td>
                                            <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.telp}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <p className={"font-bold"}>Anak-anak</p>
                                <table className="w-full border-collapse">
                                    <tbody>
                                    {anakData?.map((person: Anak) => (
                                        <tr key={person.nama}>
                                            <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.nama}</td>
                                            <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">{person.tgl_lahir}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>

    );
};

export default Page;
