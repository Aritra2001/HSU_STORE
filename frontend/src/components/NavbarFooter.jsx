import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useAuthContext } from "../hooks/useAuthContext";
import HexCoin from '../assets/hexcoin.svg';
import { RiHomeLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { CgMenuRightAlt } from "react-icons/cg";

const NavbarFooter = () => {

    return (
        <div className='fixed bottom-0 w-full h-[58px] bg-white border-t border-t-gray-300 p-1 rounded-t-[16px] font-["inter"] font-bold sm:hidden'>
            <div className="flex flex-row justify-center items-center justify-around mt-[5
            px]">
                <a href="/" className="flex flex-col items-center h-[5px]text-black-800 text-[8px] capitalize hover:text-gray-500">
                <RiHomeLine className="w-[24px] h-[24px]" />
                Home
                </a>
                <a href="/" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500">
                <BsPersonCircle className="w-[20px] h-[20px] mb-1" />
                Profile
                </a>
                <a href="#" className="flex flex-col items-center text-[#9747FF] text-[8px] capitalize hover:text-gray-500">
                <img src={HexCoin} alt="Notifications" className="w-[31px] h-[30px]" />
                coin store
                </a>
                <a href="#" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500">
                <BiSolidCategory className="w-[24px] h-[24px]" />
                categories
                </a>
                <a href="#" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500">
                <CgMenuRightAlt className="w-[24px] h-[24px]" />
                menu
                </a>
        </div>
    </div>
    );
}

export default NavbarFooter