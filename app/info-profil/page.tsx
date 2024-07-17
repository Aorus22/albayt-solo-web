'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import { getUser } from '@/db/query';
import SaveIcon from '@/public/icon/SaveIcon.svg';

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
        <section className='max-container padding-container py-8'>
            <h1 className='font-bold text-5xl text-[#f14310] text-center'>PROFIL</h1>
            <div className='flexCenter'>
                <div className='grid md:grid-cols-2 my-8 max-w-5xl w-full'>
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <img src={(userData?.photo)?.replace("=s96-c", "=s1024")} alt='profil-photo' width={240} height={240} className='w-80 h-80 rounded-full object-cover'/>
                    </div>
                    <div className='flex flex-col gap-7'>
                        <div>
                            <h3 className='font-semibold text-lg'>EMAIL</h3>
                            <p className='text-gray-50'>{userData?.email}</p>
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg'>NAMA</h3>
                            <input type='text' placeholder='Nama' name='name' value={userData?.name} className='px-4 py-2 w-full border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2'/>
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg'>NOMOR TELEPON</h3>
                            <input type='text' placeholder='Nomor Telepon' name='telp' className='px-4 py-2 w-full border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2' />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg'>ALAMAT</h3>
                            <input type='text' placeholder='Alamat' name='alamat' className='px-4 py-2 w-full border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2' />
                        </div>
                        <div>
                            <h3 className='font-semibold text-lg'>TENTANG ANDA</h3>
                            <textarea placeholder='Tentang Anda' name='about_me' rows={7} className='px-2 py-2 w-full resize-none border border-gray-30 rounded-lg focus:outline-gray-30 focus:outline-2'/>
                        </div>
                        <div className='flex justify-end'>
                            <button className='flex gap-2 items-center px-4 py-2 bg-[#f14310] text-white rounded-lg duration-200 hover:bg-black'>
                                <SaveIcon />
                                <p>Simpan Perubahan</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page