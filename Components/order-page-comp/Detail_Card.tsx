import Link from 'next/link'
import React from 'react'

const Detail_Card = () => {
  return (
    <>
        <div className="sticky md:w-1/4 justify-center">
            <div className="bg-white rounded-md text-black w-full h-fit shadow-md">
                <div className=" text-center font-bold text-2xl my-4 pt-4 text-[#f14310]">
                    Detail Pemesanan
                </div>
                <p className=" mx-8 font-bold text-lg mt-4 text-[#89060b]">
                    Paket Umroh by Garuda
                </p>
                <div className="p-4">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr>
                                <td className="border-b border-gray-200 p-2">Harga Paket Dewasa (x1)</td>
                                <td className="border-b border-gray-200 p-2">Rp 20.000.000</td>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-200 p-2">Harga Paket Anak-anak (x1)</td>
                                <td className="border-b border-gray-200 p-2">Rp 111.000.000</td>
                            </tr>
                            <tr className="font-bold">
                                <td className="border-b border-gray-200 p-2">Total Biaya</td>
                                <td className="border-b border-gray-200 p-2">Rp 111.000.000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="my-8 w-full flex justify-end">
                <Link href={'/paymentpage'}>
                    <div className="flex bg-[#89060b] font-bold text-white w-fit rounded-lg p-4">
                        Lanjutkan ke Pembayaran
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Detail_Card