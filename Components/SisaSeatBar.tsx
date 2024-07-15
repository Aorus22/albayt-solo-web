"use client"

import React from 'react';

type SeatBarProps = {
    totalSeat: number;
    remainingSeat: number;
};

const SisaSeatBar = ({totalSeat, remainingSeat}: SeatBarProps) => {
    const barPercentage = Math.round(((totalSeat - remainingSeat) / totalSeat) * 100);

    return (
        <>
            <div className='w-full h-10 bg-gray-20 rounded-lg relative'>
                <div className='flex items-center'>
                    <div className='bg-[#f14310] h-10 rounded-lg absolute top-0 left-0' style={{ width: `calc(100% - ${barPercentage}%)` }} />
                    <p className='whitespace-nowrap font-bold text-white m-2 relative z-10'>Sisa Seat: {remainingSeat}</p>
                </div>
            </div>
        </>
    );
};

export default SisaSeatBar;