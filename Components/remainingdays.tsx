import React, { useState, useEffect } from 'react';

function parseDate(input: any) {
  let date = new Date();
  if (input) {
    const parts = input.split('-');
    date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }
  return date;
}

function RemainingDays({ Input_Date }: any) {
  const Target_Date = Input_Date ? new Date(parseDate(Input_Date)) : new Date();
  const [monthsLeft, setMonthsLeft] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const today = new Date();
      // const diffInMs = Target_Date.getTime() - today.getTime();
      // const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      const targetMonth = Target_Date.getMonth();
      const targetYear = Target_Date.getFullYear();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      let months = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
      let days = Target_Date.getDate() - today.getDate();

      if (days < 0) {
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        days = lastDayOfMonth - today.getDate() + Target_Date.getDate();
        months--;
      }

      setMonthsLeft(months);
      setDaysLeft(days);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [Input_Date, Target_Date]);

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
