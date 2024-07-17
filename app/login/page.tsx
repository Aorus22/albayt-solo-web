"use client"
import { Suspense, useEffect } from 'react';
import { signInWithGoogle } from '@/auth/auth';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';

function SignInPage(){

    const redirect = useSearchParams().get("redirect")

    const { user } = UserAuth()

    useEffect(()=>{
        if(user){
            window.location.replace(`${redirect}`)
        }
    }, [user])

    const handleSignIn = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="mx-auto flexCenter items-center min-h-[70vh]">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="header flexCenter text-center mb-8">
                    <Image src={'/images/Logo.png'} alt='logo' width={100} height={100}/>
                </div>
                {/* 
                <h3 className="text-lg text-center font-semibold mb-4">Masuk Sebagai User</h3>
                */}
                {/* 
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
                Masuk
                </button>
                <hr className="my-6" />
                */}
                <button onClick={handleSignIn} type="button" className="p-4 text-white text-center text-ls space-x-4 google-login justify-center w-full flex items-center font-semibold bg-[#89060b] hover:bg-[tomato] py-2 rounded-md">
                    <div className='bg-white rounded'>
                        <img src="/icon/GoogleIcon.svg" alt='google-icon' />
                    </div>
                    <h3>Masuk dengan Google</h3>
                </button>
            </div>
            {/* 
            <div className="footer mt-6 text-center">
                <p className="text-sm">
                    Belum punya akun? 
                    <Link href={'/register'} className="text-blue-500 hover:underline">
                    Daftar</Link>
                </p>
            </div>
            */}
        </div>
    )
}

export default function PageWrapper() {
    return (
        <Suspense>
            <SignInPage />
        </Suspense>
    );
}