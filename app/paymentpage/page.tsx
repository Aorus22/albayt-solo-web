// @ts-nocheck
'use client'
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { BERITA_ARTIKEL } from "@/constants";
import ArtikelLain from "@/Components/Artikel_Lain";
import Link from "next/link";

const Order = () => {

    const [dewasa, setDewasa] = useState(1);
    const [anak, setAnak] = useState(0);
    const [bayi, setBayi] = useState(0);

    const handleDewasaChange = (event) => {
        setDewasa(parseInt(event.target.value));
    };

    const handleAnakChange = (event) => {
        setAnak(parseInt(event.target.value));
    };

    const handleBayiChange = (event) => {
        setBayi(parseInt(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

  return (
    <div className="flex flex-col-reverse md:flex-row py-4 max-container padding-container">
      <div className="md:border-r-2 lg:pl-40 md:pr-4 w-full md:w-[65%] border-opacity-50 mr-8 border-[#89060b]">
        <div>
            <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-6 shadow">
                <p className="font-bold text-2xl mb-4 text-[#f14310]">
                Total Pembayaran
                </p>
                <p>Rp60.000.000,-</p>
            </div>
            <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-6 shadow">
                <p className="font-bold text-2xl mb-4 text-[#f14310]">
                    Metode Pembayaran
                </p>
                <label htmlFor="bayar1" className="items-center">
                    <div className="rounded-md mr-4">
                        <div className="flex justify-between p-4 font-bold text-[#552719]">
                            <div className="">
                                <p className="mr-4">BCA</p>
                            </div>
                            <input
                                type="radio"
                                id="bayar1"
                                name="pembayaran"
                                value="uang_muka"
                                className="w-6 border bg-black"
                            />
                        </div>
                    </div>
                </label>
                <label htmlFor="bayar1" className="items-center">
                    <div className="rounded-md mr-4">
                        <div className="flex justify-between p-4 font-bold text-[#552719]">
                            <div className="">
                                <p className="mr-4">Mandiri</p>
                            </div>
                            <input
                                type="radio"
                                id="bayar1"
                                name="pembayaran"
                                value="uang_muka"
                                className="w-6 border bg-black"
                            />
                        </div>
                    </div>
                </label>
                <label htmlFor="bayar1" className="items-center">
                    <div className="rounded-md mr-4">
                        <div className="flex justify-between p-4 font-bold text-[#552719]">
                            <div className="">
                                <p className="mr-4">BNI</p>
                            </div>
                            <input
                                type="radio"
                                id="bayar1"
                                name="pembayaran"
                                value="uang_muka"
                                className="w-6 border bg-black"
                            />
                        </div>
                    </div>
                </label>
                <label htmlFor="bayar1" className="items-center">
                    <div className="rounded-md mr-4">
                        <div className="flex justify-between p-4 font-bold text-[#552719]">
                            <div className="">
                                <p className="mr-4">BRI</p>
                            </div>
                            <input
                                type="radio"
                                id="bayar1"
                                name="pembayaran"
                                value="uang_muka"
                                className="w-6 border bg-black"
                            />
                        </div>
                    </div>
                </label>
            </div>
            <div className="my-8 w-full flex justify-end">
            <Link href={'/final-payment'}>
                <div className="flex bg-[#89060b] font-bold text-white w-fit rounded-lg p-4">
                    Bayar Sekarang
                </div>
            </Link>
        </div>
        </div>
      </div>
      <div className="sticky md:w-[40%] justify-center">
        <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
            <div className=" text-center font-bold text-2xl my-4 pt-4 text-[#f14310]">
                Detail Pemesanan
            </div>
            <p className=" mx-8 font-bold text-[16px] lg:text-lg mt-4 text-center text-[#89060b]">
                Paket Umroh by Garuda
            </p>
            <div className="p-4">
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Harga Paket Dewasa (x1)</td>
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 20.000.000</td>
                        </tr>
                        <tr>
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Harga Paket Anak-anak (x1)</td>
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 111.000.000</td>
                        </tr>
                        <tr className="font-bold">
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Total Biaya</td>
                            <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 111.000.000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>

  );
};

export default Order;
