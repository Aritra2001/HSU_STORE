import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../helper/notify';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    var json = ''


    notify('You have successfully logged in!')

    const handelForgotPassword = async (e) => {
    
        e.preventDefault()
    
        const forgotPassword = {email}
        setLoading(true)
        const response = await fetch('https://hsu-store-backend.vercel.app/api/users/forgot-password', {
    
          method: 'POST',
          body: JSON.stringify(forgotPassword),
          headers : {
            'Content-Type': 'application/json'
          }
        })

        setLoading(false)
        json = await response.json()
        notify(json, 'Reset password sent to your email!')

        if(!response) {
          try {
            console.log(json)
          } catch(e) {
            throw new Error(e)
          }
        }

        if(response.ok) {
          try {
            setEmail('')
          } catch(e) {
            throw new Error(e)
          }
        }
      }
    

    return (
        <div className='h-screen w-full'>
            <div className='h-screen flex flex-col justify-center items-center sm:gap-5'>
                <div>
                    <span className="text-neutral-500 sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        Reset your&nbsp;
                    </span>
                    <span className="text-black sm:text-[28px] font-medium font-['Poppins'] leading-[72px]">
                        password
                    </span>
                </div>
                <div className='flex flex-col justify-center items-center'>
                <div className="w-[273px] sm:w-[547px] sm:text-[16px] text-center text-black text-[10px] font-normal font-['Poppins'] max-sm:mb-4">Enter your email address or phone number that you use with your account to continue.</div>
                </div>
                <div className='flex flex-col sm:gap-7 gap-4'>

                    <input type="email" className="sm:w-[520px] sm:h-[62px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-[16px] text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Email ID' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <button className="sm:w-[520px] sm:h-14 bg-violet-600 w-[263px] h-[39.20px] rounded-[9px] sm:rounded-[15px] border border-black backdrop-blur-[22px] text-white sm:text-[16px] text-xs font-normal font-['Poppins'] max-sm:mt-8 hover:bg-violet-700 disabled:opacity-75 " onClick={handelForgotPassword} disabled={loading}>{loading ? <>Loading...</> : <>Submit</>}</button>
                <ToastContainer />

            </div>
        </div>
    );
}

export default ForgotPassword;