import React from 'react';

type seatBarProps = {
    totalSeat: number;
    remainingSeat: number;
};

const Seatbar_Alt = ({totalSeat, remainingSeat}: seatBarProps) => {
    const barPercentage = Math.round(((totalSeat - remainingSeat) / totalSeat) * 100);

  return (
    <>
      {/* Bar Utama */}
      <div className='w-full h-10 bg-gray-20 rounded-lg relative'>
        <div className='flex items-center'>
          {/* Bar Progress */}
          <div className='bg-[#f14310] h-10 rounded-xl absolute top-0 left-0' style={{ width: `${barPercentage}%` }} />
          <p className='whitespace-nowrap font-bold text-white m-2 relative z-10'>Sisa Seat: {remainingSeat}</p>
        </div>
      </div>
    </>
  );
};

export default Seatbar_Alt;