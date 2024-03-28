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
        <div className='fixed bottom-0 w-full h-[58px] bg-white border-t border-t-gray-300 p-1 rounded-t-[16px] font-["inter"] font-bold sm:hidden justify-center items-center flex'>
            <div className="flex flex-row items-center justify-center gap-9 mt-[5
            px]">
                <a href="/" className="flex flex-col items-center h-[5px]text-black-800 text-[8px] capitalize hover:text-gray-500">
                <RiHomeLine size={26} />
                Home
                </a>
                <a href="/" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500 gap-1">
                <BsPersonCircle size={22} />
                Profile
                </a>
                <a href="#" className="flex flex-col items-center text-[#9747FF] text-[8px] capitalize hover:text-gray-500">
                <img src={HexCoin} alt="Notifications" className="w-[31px] h-[31px]" />
                coin store
                </a>
                <a href="#" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500">
                <BiSolidCategory size={24} />
                categories
                </a>
                <a href="#" className="flex flex-col items-center text-black text-[8px] capitalize hover:text-gray-500">
                <CgMenuRightAlt size={24} />
                menu
                </a>
        </div>
    </div>
    );
}

export default NavbarFooter