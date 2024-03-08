import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Confetti from 'react-confetti';

const Popup = ({ onClose }) => {
  const [confetti, setConfetti] = useState(true);

  const handleConfetti = () => {
    setConfetti(true);
  };

  useEffect(() => {
    handleConfetti();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className='absolute flex flex-col justify-center items-center bg-white sm:w-[290px] sm:h-[368px] rounded-[14px]'>
        <button className='absolute top-2 right-3 text-[25px]' onClick={onClose}><RxCross2 color='#BDBDBD'/></button>
        <div className='flex flex-col'>
          <div className="text-center text-neutral-500 text-[22px] font-semibold font-['Poppins'] leading-[30px]">
            Congratulations
          </div>
          <div className="text-center text-neutral-500 text-xs font-medium font-['Poppins'] leading-[18px]">
            you have won 50 hex coins
          </div>
        </div>
        <div className='absolute flex flex-row gap-4 bottom-8'>
          <button className='w-[116.22px] h-[32.33px] font-medium rounded-md border border-black text-[13px]'>home page</button>
          <button className='w-[116.22px] h-[32.33px] font-medium rounded-md border bg-violet-600 border-violet-600 text-white text-[13px]'>use coins</button>
        </div>
      </div>
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={false} gravity={0.05} wind={0.02} tweenDuration={10000}/>}
    </div>
  );
}

export default Popup;
