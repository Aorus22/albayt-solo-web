import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import GoogleIcon from '@/public/icon/GoogleIcon.svg'

function Page() {
    return (
        <div className="mt-16 mx-auto flex flex-col items-center h-screen">
            <div className="header text-center">
                <Image src={'/images/Logo.png'} alt='logo' width={100} height={100}/>
            </div>
            <div className="login-form bg-white p-8 rounded-lg shadow-md w-96">
                <h3 className="text-lg text-center font-semibold mb-4">Daftar Akun Baru</h3>
                <form action="#">
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" id="nama" name="nama" placeholder="Masukkan nama lengkap Anda"
                            className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Masukkan alamat email Anda"
                            className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input type="password" id="password" name="password" placeholder="Masukkan password Anda"
                            className="border border-gray-300 w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                    </div>
                    <div className="mb-4 flex justify-end">
                        <a href="#" className="text-sm text-[tomato] hover:underline">Lupa Password?</a>
                    </div>
                    <button type="submit" className="bg-[tomato] hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md w-full">
                        Daftar
                    </button>
                    <hr className="my-6" />
                    <button type="button" className="p-4 text-white text-center text-ls space-x-4 google-login justify-center w-full flex items-center border bg-blue-600 hover:bg-[tomato] border-gray-300 py-2 rounded-md">
                        <div className='bg-white rounded'>
                            <GoogleIcon />
                        </div>
                        <h3>Daftar dengan Google</h3>
                    </button>
                </form>
            </div>
            <div className="footer mt-6 text-center">
                <p className="text-sm">
                    Sudah punya akun? 
                    <Link href={'/login'} className="text-blue-500 hover:underline">
                    Masuk</Link>
                </p>
            </div>
        </div>
    );
}

export default Page;
