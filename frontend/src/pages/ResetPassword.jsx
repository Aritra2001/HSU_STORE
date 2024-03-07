import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../helper/notify';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmpassword, setReenterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    var json = '';
    const navigate=useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getToken= ()=>{
        const url=window.location.pathname;
        const token=url.substring((url.lastIndexOf('/') + 1), );
        return token;
    }

    notify('You have successfully logged in!')


    const handleResetPassword = async (e) => {
    
        e.preventDefault()
    
        const resetPassword = { password, confirmpassword }
        setLoading(true)
        const token=getToken()
        const response = await fetch(`https://hsu-store-backend.vercel.app/api/users/reset-password/${token}`, {
    
          method: 'POST',
          body: JSON.stringify(resetPassword),
          headers : {
            'Content-Type': 'application/json'
          }
        })

        setLoading(false)
        json = await response.json()
        notify(json, 'Password reset successful!')

        if(!response) {
          try {
            console.log(json)
          } catch(e) {
            throw new Error(e)
          }
        }

        if(response.ok) {
          try {
            setPassword('')
            setReenterPassword('')
            setTimeout(() => {
                navigate('/login')
              }, 5000);
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
                        Reset your&nbsp;
                    </span>
                    <span className="text-black sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        Password
                    </span>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]"> 
                    </span>
                </div>
                <div className='flex flex-col sm:gap-7 gap-4'>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" onCopy={(e)=>e.preventDefault()} placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required/>
                        <IconContext.Provider value={{ className: 'absolute sm:right-14 right-8 top-[50%] cursor-pointer transform -translate-y-1/2 sm:text-[20px]'}}>
                            {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#7D7D7D'/> : <FaRegEye onClick={togglePasswordVisibility} color='#7D7D7D'/>}
                        </IconContext.Provider>
                    </div>
                    <div className="relative">
                        <input type={"password"} className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Re-enter new password' value={confirmpassword} onChange={(e) => setReenterPassword(e.target.value)} onPaste={(e)=>e.preventDefault()} autoComplete='current-password' required/>
                    </div>


                </div>

                <button className="capitalize sm:w-[520px] sm:h-14 bg-violet-600 w-[263px] h-[39.20px] rounded-[9px] sm:rounded-[15px] border border-black backdrop-blur-[22px] text-white sm:text-xl text-xs font-normal font-['Poppins'] max-sm:mt-8 hover:bg-violet-700 disabled:opacity-75 " onClick={handleResetPassword} disabled={loading}>{loading ? <>Loading...</> : <>change password</>}</button>
                <ToastContainer />

            </div>
        </div>
    );
}

export default ResetPassword;