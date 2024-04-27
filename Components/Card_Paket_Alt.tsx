import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import SeatBar_Alt from './Seatbar_Alt';

type CardProps = {
    paket_id: string;
    img: string;
    title: string;
    desc: string;
}

const Card_Paket_Alt = ({paket_id, img, title}: CardProps) => {
  return (
    <Link href={`/paket/${paket_id}`}>
        <>
            <div className='bg-white h-80 rounded-xl shadow-lg border duration-300 hover:-translate-y-2 hover:shadow-xl'>

                <div id='header' className='flex items-center'>
                    <Image src={img} alt='paket' width={450} height={450} className='h-1/2 w-[45%] m-2 rounded-xl'/>
                    <div className='flex flex-col w-[55%] mx-2 gap-3'>
                        <h1 className='font-bold text-[tomato] text-center text-xl'>{title}</h1>
                        <SeatBar_Alt totalSeat={300} remainingSeat={25} />
                    </div>
                </div>

                <div id='konten' className='grid grid-cols-2 m-2 h-1/2'>
                    <div className='flex gap-2 items-center my-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>
                        <p>31 Mar 2024</p>
                    </div>

                    <div className='flex justify-end gap-2 items-center my-2'>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21 22h2v2h-22v-2h2v-22h18v22zm-10-3h-2v4h2v-4zm4 0h-2v4h2v-4zm4-17h-14v20h2v-5h10v5h2v-20zm-12 11h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-3h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
                        <svg width="24" height="24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033-2.361 4.792-5.246.719 3.848 3.643-.948 5.255 4.707-2.505 4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z" fillRule="nonzero"/></svg>
                        <p>4</p>
                    </div>
                    
                    <div className='flex gap-2 items-center my-2'>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M3.691 10h6.309l-3-7h2l7 7h5c1.322-.007 3 1.002 3 2s-1.69 1.993-3 2h-5l-7 7h-2l3-7h-6.309l-2.292 2h-1.399l1.491-4-1.491-4h1.399l2.292 2"/></svg>
                        <p>Qatar Airways</p>
                    </div>

                    <div className='flex justify-end gap-2 items-center my-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 14c0 5.523-4.478 10-10 10s-10-4.477-10-10 4.478-10 10-10 10 4.477 10 10zm-2 0c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8 8-3.589 8-8zm-6-11.819v-2.181h-4v2.181c1.408-.238 2.562-.243 4 0zm6.679 3.554l1.321-1.321-1.414-1.414-1.407 1.407c.536.402 1.038.844 1.5 1.328zm-8.679 2.265v6h6c0-3.309-2.691-6-6-6z"/></svg>
                        <p>14 Hari</p>
                    </div>

                    <div className='flex gap-2 items-center my-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 12c0 2.209-3.581 4-8 4s-8-1.791-8-4c0-1.602 1.888-2.98 4.608-3.619l1.154 1.824c-.401.068-.806.135-1.178.242-3.312.949-3.453 2.109-.021 3.102 2.088.603 4.777.605 6.874-.001 3.619-1.047 3.164-2.275-.268-3.167-.296-.077-.621-.118-.936-.171l1.156-1.828c2.723.638 4.611 2.016 4.611 3.618z"/></svg>
                        <p>Surakarta</p>
                    </div>

                    <div className='flex justify-end gap-2 items-center my-2'>
                        <h1 className='font-bold text-[tomato]'>Rp. 15 Juta</h1>
                    </div>

                </div>
            </div>
        </>
    </Link>
  )
}

export default Card_Paket_Alt