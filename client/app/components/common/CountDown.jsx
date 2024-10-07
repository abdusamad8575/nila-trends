import React, { useEffect, useState } from 'react';

const CountDown = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const dest = new Date(expiry).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = dest - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center w-full gap-6 count-down-main">
      <div className="timer">
        <div className="pr-1.5 pl-2 relative bg-gray-500 backdrop-blur-sm rounded-sm bg-opacity-30 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-gray-400 before:z-10">
          <h3 className="flex countdown-element days font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
            {timeLeft.days}
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-700 mt-1 text-start w-full">days</p>
      </div>
      <div className="timer">
        <div className="pr-1.5 pl-2 relative bg-gray-500 backdrop-blur-sm rounded-sm bg-opacity-30 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2  before:bg-gray-400 before:z-10">
          <h3 className="flex countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
            {timeLeft.hours}
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-700 mt-1 text-start w-full">hours</p>
      </div>
      <div className="timer">
        <div className="pr-1.5 pl-2 relative bg-gray-500 backdrop-blur-sm rounded-sm bg-opacity-30 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2  before:bg-gray-400 before:z-10">
          <h3 className="flex countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
            {timeLeft.minutes}
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-700 mt-1 text-start w-full">minutes</p>
      </div>
      <div className="timer">
        <div className="pr-1.5 pl-2 relative bg-gray-500 backdrop-blur-sm rounded-sm bg-opacity-30 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2  before:bg-gray-400 before:z-10">
          <h3 className="flex countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
            {timeLeft.seconds}
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-700 mt-1 text-start w-full">seconds</p>
      </div>
    </div>
  );
};

export default CountDown;
