'use client';
import React, { useState, useEffect } from 'react';

function RemainingDays({Input_Date} : any) {
  const Target_Date = new Date(Input_Date)
  const [monthsLeft, setMonthsLeft] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const today = new Date();
      const diffInMs = Target_Date.getTime() - today.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      const targetMonth = Target_Date.getMonth();
      const targetYear = Target_Date.getFullYear();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      let months = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
      let days = Target_Date.getDate() - today.getDate();

      if (days < 0) {
        months -= 1;
        const tempDate = new Date(today);
        tempDate.setMonth(today.getMonth() + months + 1);
        days = Math.floor((Target_Date - tempDate) / (1000 * 60 * 60 * 24));
      }

      setMonthsLeft(months);
      setDaysLeft(days);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-around gap-6'>
      <div className='bg-slate-100 rounded w-20 h-24 mb-4 p-5 text-slate-900 text-center'>
        <h2 className='text-3xl font-bold'>{monthsLeft}</h2>
        <h1>Bulan</h1>
      </div>
      <div className='bg-slate-100 rounded w-20 h-24 mb-4 p-5 text-slate-900 text-center'>
        <h2 className='text-3xl font-bold'>{daysLeft}</h2>
        <h1>Hari</h1>
      </div>
    </div>
  );
}

export default RemainingDays;
