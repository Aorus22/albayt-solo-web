'use client'
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { BERITA_ARTIKEL } from "@/constants";
import ArtikelLain from "@/Components/Artikel_Lain";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {UserAuth} from "@/context/AuthContext";

const Order = () => {

    const [dewasa, setDewasa] = useState(0);
    const [anak, setAnak] = useState(0);

    const {user} = UserAuth()

    const handleDewasaChange = (event: any) => {
        setDewasa(parseInt(event.target.value));
    };

    const handleAnakChange = (event: any) => {
        setAnak(parseInt(event.target.value));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    // const { data: session } = useSession();

    if (user) {
        const userImage = user.photoURL || "";
        const userName = user.displayName || "";
        // const userEmail = user.email || "";

      return (
        <div className="md:flex py-4 max-container padding-container">
            <div className="md:border-r-2 lg:pl-40 pr-0 md:pr-4 w-full md:w-[65%] border-b-2 md:border-b-0 border-opacity-50 mr-8 border-[#89060b]">
                <div>
                    <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                        <p className="font-bold text-2xl mb-4 text-[#f14310]">
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
                    <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                        <p className="font-bold text-2xl mb-4 text-[#f14310]">
                            Tipe Pembayaran
                        </p>
                        <label htmlFor="bayar1" className="items-center">
                            <div className="border border-gray-20 opacity-75 rounded-md lg:mr-4">
                                <div className="flex justify-between p-4 bg-[#ffa488] font-bold text-[#552719]">
                                    <div className="">
                                        <p className="mr-4">Bayar Uang Muka - Rp 20.000.000</p>
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
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Uang Muka</td>
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">31 Mar 2024</td>
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 20.000.000</td>
                                            </tr>
                                            <tr>
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Bayar ke - 2</td>
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">02 Apr 2024</td>
                                                <td className="border-b border-gray-200 p-2 text-[14px] lg:text-[16px]">Rp 111.000.000</td>
                                            </tr>
                                        </tbody>
                                    </table>
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

                    <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                        <p className="font-bold text-2xl mb-4 text-[#f14310]">
                        Jumlah Jamaah
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="items-center mb-4 sm:w-full md:w-56">
                                <div className="mb-4 flex justify-between items-center">
                                    <label htmlFor="dewasa" className="mr-12">Dewasa</label>
                                    <input className="border border-[#f14310] rounded-lg p-2 w-16" type="number" id="dewasa" name="dewasa" min="0" value={dewasa} onChange={handleDewasaChange} />
                                </div>
                                <div className="mb-4 flex justify-between items-center">
                                    <label htmlFor="anak" className="mr-12">Anak</label>
                                    <input className="border border-[#f14310] rounded-lg p-2 w-16" type="number" id="anak" name="anak" min="0" value={anak} onChange={handleAnakChange} />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="border rounded border-[rgba(0,0,0,0.16)] min-h-24 mt-4 justify-center bg-white p-4 md:p-6 shadow">
                        <p className="font-bold text-2xl mb-4 text-[#f14310]">
                        Detail Jamaah
                        </p>
                        <form>
                <fieldset>
                    <h1 className="font-bold mb-4">Dewasa</h1>
                    {[...Array(dewasa)].map((_, index) => (
                        <div key={`dewasa_${index}`} className="grid grid-cols-2 mb-4">
                            <label className="block h-10" htmlFor={`nama_dewasa_${index}`}>Nama</label>
                            <input className="border border-[#f14310] rounded-lg mb-1" type="text" id={`nama_dewasa_${index}`} name={`nama_dewasa_${index}`} required />
                            <label className="block h-10" htmlFor={`telp_dewasa_${index}`}>No Telp</label>
                            <input className="border border-[#f14310] rounded-lg" type="tel" id={`telp_dewasa_${index}`} name={`telp_dewasa_${index}`} required />
                        </div>
                    ))}
                </fieldset>

                <fieldset>
                <h1 className="font-bold mb-4">Anak-anak</h1>
                    {[...Array(anak)].map((_, index) => (
                        <div key={`anak${index}`} className="grid grid-cols-2 mb-4">
                            <label className="block h-10" htmlFor={`nama_anak_${index}`}>Nama</label>
                            <input className="border border-[#f14310] rounded-lg mb-1" type="text" id={`nama_dewasa_${index}`} name={`nama_dewasa_${index}`} required />
                            <label className="block h-10" htmlFor={`tgl_anak_${index}`}>Tanggal Lahir</label>
                            <input className="border border-[#f14310] rounded-lg" type="tel" id={`telp_dewasa_${index}`} name={`telp_dewasa_${index}`} required />
                        </div>
                    ))}
                </fieldset>

            </form>
                    </div>
                </div>
            </div>
            <div className="sticky md:w-[40%] justify-center my-4 md:my-2">
                <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                    <div className=" text-center font-bold text-2xl my-4 pt-4 text-[#f14310]">
                        Detail Pemesanan
                    </div>
                    <p className="text-center mx-8 font-bold text-[16px] lg:text-lg mt-4 text-[#89060b]">
                        Paket Umroh by Garuda
                    </p>
                    <div className="p-4">
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Harga Paket Dewasa (x1)</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Rp 20.000.000</td>
                                </tr>
                                <tr>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Harga Paket Anak-anak (x1)</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Rp 111.000.000</td>
                                </tr>
                                <tr className="font-bold">
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Total Biaya</td>
                                    <td className="border-b border-gray-200 p-2 lg:p-3 text-[14px] lg:text-[16px]">Rp 111.000.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="my-8 w-full flex justify-end">
                    <Link href={'/paymentpage'}>
                        <div className="flex bg-[#89060b] font-bold text-white text-[14px] lg:text-[16px] w-fit rounded-lg p-4">
                            Lanjutkan ke Pembayaran
                        </div>
                    </Link>
                </div>
            </div>
        </div>

      );
    }

};

export default Order;
