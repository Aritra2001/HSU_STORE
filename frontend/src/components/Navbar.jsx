import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from '../assets/Logo.svg';
import cart from '../assets/cart.svg';
import { AiOutlineSearch } from 'react-icons/ai'
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
    const { user } = useAuthContext();
    const location = useLocation(); // Use useLocation hook to get current location
    const [search, setSearch] = useState('');

    // Function to determine if the link is active
    const isLinkActive = (href) => {
        return location.pathname === href;
    };

    return (
        <div className='w-full relative bg-white max-sm:hidden'>
            <nav className="flex items-center justify-center h-[47px] text-black font-['Poppins']">
                <ul className='flex-row items-center capitalize gap-[37px] md:flex'>
                    <a href='/'><li className={isLinkActive('/') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>home</li></a>
                    <a href="/"><li className={isLinkActive('') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>cubesat kit</li></a>
                    <a href="/"><li className={isLinkActive('') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>cansat</li></a>
                    <a href="/"><li className={isLinkActive('') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>accessories</li></a>
                    <a href="/"><li className={isLinkActive('') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>support</li></a>
                    <a href="https://hexstaruniverse.com"><img className='w-[84px]' src={Logo} alt="hexstar universe"/></a>
                    <a href="/"><li className={isLinkActive('') ? 'text-violet-500 hover:text-violet-500 delay-100' : 'hover:text-violet-500 delay-100'}>coin store</li></a>
                    <div className='relative'>
                        <input 
                            type='text' 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder='search in store' 
                            className='w-[214px] h-[29px] pl-10 pr-10 bg-gray-200 rounded-2xl border border-black text-zinc-500 text-xs font-medium placeholder:indent-[0.5rem] indent-[0.5rem]'
                        />
                        <button className='flex justify-center items-center absolute top-[50%] right-[0.5px] transform -translate-y-1/2 cursor-pointer bg-white w-11 h-7 shadow rounded-2xl'><AiOutlineSearch size={20} color='#000000' className=''/></button>
                    </div>
                    <IoPersonCircleOutline size={29} className={`${user ? `text-purple-500` : `text-zinc-500`} cursor-pointer`}/>
                    <a href="/"><img className='w-[29px]' src={cart} alt="view cart"/></a>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
