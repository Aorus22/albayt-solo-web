import React from 'react';
import Link from 'next/link'
import Image from 'next/image';

function RegisterPage() {
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
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </div>
                <h3>Daftar dengan Google</h3>
            </button>
        </form>
      </div>
      <div className="footer mt-6 text-center">
      <p className="text-sm">Sudah punya akun? <Link href={'/loginpage'} className="text-blue-500 hover:underline">Masuk</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
