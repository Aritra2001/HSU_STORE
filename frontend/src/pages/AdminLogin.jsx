import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuthContext } from "../hooks/useAuthContext";
import { IconContext } from 'react-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    var json = {}

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleLogin = async (e) => {
    
        e.preventDefault()

        setLoading(true)

        try {
            if(!email || !password) {

                throw Error('All fields must be filled!')
            }
    
            if(email === process.env.REACT_APP_ADMIN_EMAIL && password === process.env.REACT_APP_ADMIN_PASSWORD) {

                setLoading(false)
                json = email
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
                navigate('/admin_dashboard')
            }
    
            else {
                throw Error('Email or Password incorrect!')
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
      }
    

  return (
    <div className='h-screen w-full'>
            <div className='h-screen flex flex-col justify-center items-center sm:gap-10'>
                <div>
                    <span className="text-black sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        Hex-Star Store Admin Panel
                    </span>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]"> 
                    </span>
                </div>
                <div className='flex flex-col sm:gap-7 gap-4'>

                    <input type="email" className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required/>
                        <IconContext.Provider value={{ className: 'absolute sm:right-14 right-8 top-[50%] cursor-pointer transform -translate-y-1/2 sm:text-[20px]'}}>
                            {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#7D7D7D'/> : <FaRegEye onClick={togglePasswordVisibility} color='#7D7D7D'/>}
                        </IconContext.Provider>
                    </div>


                </div>

                <button className="sm:w-[520px] sm:h-14 bg-violet-600 w-[263px] h-[39.20px] rounded-[9px] sm:rounded-[15px] border border-black backdrop-blur-[22px] text-white sm:text-xl text-xs font-normal font-['Poppins'] max-sm:mt-8 hover:bg-violet-700 disabled:opacity-75 " onClick={handleLogin} disabled={loading}>{loading ? <>Loading...</> : <>Login</>}</button>
                <ToastContainer />

            </div>
        </div>
  );
}

export default AdminLogin;
