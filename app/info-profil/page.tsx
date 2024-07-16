'use client'
import React, {useEffect, useState} from 'react'
import {UserAuth} from "@/context/AuthContext";
import { getUser } from '@/db/query';

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
      <>
        <section className='max-container padding-container py-8'>
          <h1 className='font-bold text-5xl text-[#f14310] text-center'>PROFIL</h1>
          <div className='flexCenter'>
          <div className='grid md:grid-cols-2 my-8 max-w-5xl w-full'>
            <div className='flex flex-col justify-center items-center gap-5'>
              <img src={(userData?.photo)?.replace("=s96-c", "=s1024")} alt='profil-photo' width={240} height={240} className='w-80 h-80 rounded-full object-cover'/>
              {/* <button className='flex gap-2 py-2 px-4 text-white bg-[#f14310] items-center rounded-lg duration-200 hover:bg-black'>
                <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fillRule="nonzero"/></svg>
                <p className='font-semibold tracking-wider'>Change Picture</p>
              </button> */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='fill-white'><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                  <p>Simpan Perubahan</p>
                </button>
              </div>
            </div>

            </div>
          </div>
        </section>
      </>
  )
}

export default Page