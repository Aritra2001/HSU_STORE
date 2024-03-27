import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from '../assets/Logo.svg';
import cart from '../assets/cart.svg';
import { CiSearch } from "react-icons/ci";
import { AiOutlineSearch } from 'react-icons/ai';
import { IoPersonCircleOutline } from "react-icons/io5";

const NavbarHeader = () => {

    const { user } = useAuthContext();
    const location = useLocation(); // Use useLocation hook to get current location
    const [search, setSearch] = useState('');

    const [isChecked, setIsChecked] = useState(false);
    
      const handleToggle = () => {
        setIsChecked(!isChecked);
      };


    // Function to determine if the link is active
    /*const isLinkActive = (href) => {
        return location.pathname === href;
    };*/

    return (
        <div className='flex items-center flex-row justify-center h-[110px] gap-2 sm:hidden'>
        <label className="flex items-center cursor-pointer">
      <div className='relative flex flex-col items-center'>
      <div className='font-["inter"] font-bold text-[10px]'>Space store</div>

        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onClick={handleToggle}
        />
        <div className={`w-[47px] h-[21px] items-right bg-gray-300 rounded-full shadow-inner ${isChecked ? 'bg-green-500' : ''}`}>
          <div className={`w-[19px] h-[19px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isChecked ? 'translate-x-7' : 'off'}`}/>
          <span className='absolute inset-0 ml-4 h-[52px] flex flex-row items-center justify-center font-["inter"] text-gray-700 text-[10px]'>
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
                            className='w-[214px] h-[29px] pl-10 pr-10 bg-gray-200 rounded-[11px] border border-black text-zinc-500 text-xs font-medium placeholder:indent-[0.5rem] indent-[0.5rem]'
                        />
                        <button className='flex justify-center items-center absolute top-[50%] right-[0.5px] transform -translate-y-1/2 cursor-pointer bg-white w-11 h-7 shadow rounded-[11px]'><AiOutlineSearch size={20} color='#000000' className=''/></button>
                    </div>
                    <a href="/"><img className='w-[26px]' src={cart} alt="view cart"/></a>
        </div>
    );
}

export default NavbarHeader;