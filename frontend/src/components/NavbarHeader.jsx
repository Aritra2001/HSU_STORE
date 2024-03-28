import React, { useState } from 'react';
import cart from '../assets/cart.svg';
import { AiOutlineSearch } from 'react-icons/ai';

const NavbarHeader = () => {

    const [search, setSearch] = useState('');

    const [isChecked, setIsChecked] = useState(false);
    
      const handleToggle = () => {
        setIsChecked(!isChecked);
      };

    return (
        <div className='flex items-center flex-row justify-center h-[110px] max-sm:gap-2 sm:hidden'>
        <label className="flex items-center cursor-pointer">
      <div className='relative flex flex-col items-center'>
      <div className='font-["inter"] font-bold text-[10px]'>Space store</div>

        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onClick={handleToggle}
        />
        <div className={`relative w-[47px] h-[23px] items-right bg-gray-300 rounded-full shadow-inner ${isChecked ? 'bg-green-500' : ''}`}>
          <div className={`absolute left-[2px] top-[2px] flex w-[19px] h-[19px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isChecked ? 'translate-x-[1.65rem]' : 'off'}`}/>
          <span className='absolute pt-0.5 inset-0 ml-4 flex flex-row items-center justify-center font-["inter"] text-zinc-500 font-bold text-[10px]'>
          {isChecked ? '' : 'OFF'}
        </span>
        </div>
      </div>
    </label>
    <div className='relative'>
                        <input 
                            type='text' 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder='search in store' 
                            className='w-[214px] h-[34px] pl-10 pr-10 bg-gray-200 rounded-[11px] border border-gray-500 text-zinc-500 text-xs font-medium placeholder:indent-[0.3rem] indent-[0.3rem] font-["inter"]'
                        />
                        <button className='flex justify-center items-center absolute top-[50%] right-[0.5px] transform -translate-y-1/2 cursor-pointer bg-white w-11 h-8 shadow rounded-[11px]'><AiOutlineSearch size={20} color='#000000' className=''/></button>
                    </div>
                    <a href="/"><img className='w-[32px]' src={cart} alt="view cart"/></a>
        </div>
    );
}

export default NavbarHeader;