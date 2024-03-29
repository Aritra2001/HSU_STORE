import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import GreenCheck from '../assets/GreenCheck.svg';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';


const EmailVerified = () => {
    const [isVerified, setIsVerified] = useState(999);
    const jsonRef = useRef('');
    const { dispatch } = useAuthContext();
    const navigator = useNavigate();

    useEffect(() => {
        const handleEmailVerified = async () => {
            try {
                const token = getToken();
                const response = await fetch(`https://hsu-store-backend.vercel.app/api/users/verify-email/${token}`, {
                    method: 'GET',
                });

                const data = await response.json();
                if (response.ok) {
                    setIsVerified(1);
                    jsonRef.current = data; // Store the data in the ref
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch({ type: 'LOGIN', payload: data });
                    setTimeout(() => {
                        navigator('/')
                    }, 3000);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        handleEmailVerified();
    }, [dispatch, navigator]);


    const getToken = () => {
        const url = window.location.pathname;
        return url.substring(url.lastIndexOf('/') + 1);
    };

    if (isVerified === 1) {
        return (
            <div className="h-screen w-full">
                <div className="h-screen flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center sm:gap-7 gap-6">
                        <img className="object-center flex sm:w-[80px] w-[50px]" src={GreenCheck} alt="Green Check" />
                        <div className="text-neutral-500 sm:text-[28px] font-medium font-['Poppins'] sm:leading-[20px] leading-[5px]">
                            Your email ID has been&nbsp;
                        </div>
                        <div className="flex flex-col justify-center items-center text-black sm:text-[28px] font-medium font-['Poppins'] leading-[0px]">
                            verified successfully
                        </div>
                        <span className="text-neutral-500 sm:text-[28px] font-medium font-['Poppins'] leading-[72px]"></span>
                    </div>

                    <div className="max-sm:mt-8">
                        <span className="text-violet-600 sm:text-xl text-xs font-normal font-['Poppins']">
                            <a href="/">Return to profile</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='h-screen flex justify-center items-center font-["Poppins"] sm:text-3xl bg-stone-200 gap-2'>
                <div className='loader'></div>
            </div>
        )
    }
};

export default EmailVerified;
