'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import { getUser } from '@/db/query';
import SaveIcon from '@/public/icon/SaveIcon.svg';
import ImageWithLoading from '@/Components/ImageWithLoading';

const Page = () => {

    const [userData, setUserData] = useState<any>();
    const { user } = UserAuth()

    useEffect(() => {
        if (user != null) {
            (async () => {
                try {
                    const response = await getUser(user.uid)
                    setUserData(response);
                } catch (Error) {
                    console.error('Error fetching data:', Error);
                } 
            })()
        }
    }, [user]);

    return (
        <section className='p-8 md:p-20 flex items-center justify-center'>
            {/* Main Container */}
            <div className='bg-white rounded-lg w-[95%] md:w-[65%] border'>

                {/* section title */}
                <div className='bg-[#f14310] rounded-t-lg w-full px-8 md:px-12 py-4'>
                    <h2 className='font-bold text-white text-[20px] uppercase tracking-wide'>Informasi Profil</h2>
                </div>
                {/* end of section title */}

                {/* content */}
                <div className='p-8 md:p-12'>

                    {/* non-fillable section */}
                    <div className='flex flex-col md:flex-row items-center gap-5 md:gap-8'>
                        <ImageWithLoading src={(userData?.photo)?.replace("=s96-c", "=s1024")} alt='profil-photo' width={"240px"} height='auto' className='w-32 h-32 md:w-44 md:h-44 rounded-full object-cover'/>
                        <div className='flex flex-col gap-1 md:gap-2'>
                            <h2 className='text-[#f14310] font-bold text-xl text-center md:text-start md:text-3xl'>{userData?.name}</h2>
                            <p className='text-gray-30 font-medium text-[14px] md:text-[16px]'>{userData?.email}</p>
                        </div>
                    </div>
                    {/* end of non-fillable section */}

                    {/* fillable section */}
                    <form className='flex flex-col gap-5 md:gap-8 mt-8 md:mt-12'>
                        <div className='flex flex-col gap-1 md:gap-2'>
                            <p className='uppercase font-medium text-[14px] md:text-lg'>Email</p>
                            <input className='rounded-lg border px-4 py-2 text-gray-30 text-[12px] md:text-[16px] border-gray-20 focus:outline-none' type='text' value={userData?.email} readOnly/>
                        </div>

                        <div className='flex flex-col gap-1 md:gap-2'>
                            <p className='uppercase font-medium text-[14px] md:text-lg'>Nama</p>
                            <input className='rounded-lg border px-4 py-2 text-[12px] md:text-[16px] border-gray-20 focus:outline-none' type='text' name='name' value={userData?.name}/>
                        </div>

                        <div className='flex flex-col gap-1 md:gap-2'>
                            <p className='uppercase font-medium text-[14px] md:text-lg'>Nomor Telepon</p>
                            <input className='rounded-lg border px-4 py-2 text-[12px] md:text-[16px] border-gray-20 focus:outline-none' type='text' name='telp' value={userData?.telp}/>
                        </div>

                        <div className='flex flex-col gap-1 md:gap-2'>
                            <p className='uppercase font-medium text-[14px] md:text-lg'>Alamat</p>
                            <input className='rounded-lg border px-4 py-2 text-[12px] md:text-[16px] border-gray-20 focus:outline-none' type='text' name='address' value={userData?.address}/>
                        </div>

                        <div className='flex flex-col gap-1 md:gap-2'>
                            <p className='uppercase font-medium text-[14px] md:text-lg'>Tentang Anda</p>
                            <textarea className='rounded-lg border px-4 py-2 text-[12px] md:text-[16px] border-gray-20 focus:outline-none resize-none' rows={6} name='desc'>{userData?.desc}</textarea>
                        </div>

                        <div className='flex justify-center md:justify-end'>
                            <button className='flex gap-2 text-[14px] md:text-lg items-center px-4 py-2 bg-[#f14310] text-white rounded-lg duration-200 hover:bg-black'>
                                <SaveIcon />
                                <p>Simpan Perubahan</p>
                            </button>
                        </div>
                    </form>
                    {/* end of fillable section */}
                </div>
                {/* end of content */}

            </div>
            {/* end of main container */}
        </section>
    )
}

export default Page