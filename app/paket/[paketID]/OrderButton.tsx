import React from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import PlaneIcon from '@/public/icon/PlaneIcon.svg'

const OrderButton = () =>{
    const params = useParams()

    return (
        <Link href={`${params.paketID}/pemesanan`}>
            <div className="bg-[#89060b] flex space-x-2 h-full text-gray font-semibold py-2 px-4 rounded items-center  justify-center text-center text-zinc-50 w-full mt-3 duration-200 hover:bg-black">
                <PlaneIcon />
                <p>Pesan Sekarang</p>
            </div>  
        </Link> 
    )
}

export default OrderButton