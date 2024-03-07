import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuthContext } from "../hooks/useAuthContext";
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../helper/notify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext()
    const navigator = useNavigate()
    var json = ''

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    notify('You have successfully logged in!')

    const handleLogin = async (e) => {
    
        e.preventDefault()
    
        const login = {email, password}
        setLoading(true)
        const response = await fetch('https://hsu-store-backend.vercel.app/api/users/login', {
    
          method: 'POST',
          body: JSON.stringify(login),
          headers : {
            'Content-Type': 'application/json'
          }
        })

        setLoading(false)
        json = await response.json()
        notify(json, 'You have successfully logged in!')

        if(!response) {
          try {
            console.log(json)
          } catch(e) {
            throw new Error(e)
          }
        }

        if(response.ok) {
          try {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setEmail('')
            setPassword('')
            navigator('/')
          } catch(e) {
            throw new Error(e)
          }
        }
      }
    

    return (
        <div className='h-screen w-full'>
            <div className='h-screen flex flex-col justify-center items-center sm:gap-10'>
                <div>
                    <span className="text-neutral-500 sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        Log in to&nbsp;
                    </span>
                    <span className="text-black sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        Hex-Star store
                    </span>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]"> 
                    </span>
                </div>
                <div className='flex flex-col sm:gap-7 gap-4'>

                    <input type="email" className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Email ID or Username' value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required/>
                        <IconContext.Provider value={{ className: 'absolute sm:right-14 right-8 top-[50%] cursor-pointer transform -translate-y-1/2 sm:text-[20px]'}}>
                            {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#7D7D7D'/> : <FaRegEye onClick={togglePasswordVisibility} color='#7D7D7D'/>}
                        </IconContext.Provider>
                    </div>


                </div>

                <button className="sm:w-[520px] sm:h-14 bg-violet-600 w-[263px] h-[39.20px] rounded-[9px] sm:rounded-[15px] border border-black backdrop-blur-[22px] text-white sm:text-xl text-xs font-normal font-['Poppins'] max-sm:mt-8 hover:bg-violet-700 disabled:opacity-75 " onClick={handleLogin} disabled={loading}>{loading ? <>Loading...</> : <>Login</>}</button>
                <ToastContainer />

                <div className='max-sm:mt-8'>
                    <span className="text-violet-600 sm:text-[16px] text-xs font-normal font-['Poppins']">
                            <a href="/forgot-password">Forgot password?</a>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default Login;