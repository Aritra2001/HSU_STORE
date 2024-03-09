import { RxCross2 } from "react-icons/rx";

const Popup = ({ onClose }) => {

  return (
    <div className='absolute flex flex-col justify-center items-center bg-white sm:w-[290px] sm:h-[368px] rounded-[14px] w-screen h-1/2 max-sm:bottom-0'>
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
        <button className='w-[116.22px] h-[32.33px] font-medium rounded-md border border-black text-[13px]' onClick={onClose}>home page</button>
        <button className='w-[116.22px] h-[32.33px] font-medium rounded-md border bg-violet-600 border-violet-600 text-white text-[13px]'>use coins</button>
      </div>
    </div>
  );
}

export default Popup;

