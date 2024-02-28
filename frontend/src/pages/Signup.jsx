import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IconContext } from 'react-icons';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../helper/notify';


const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    var json = ''

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    notify('Signup successfull, verification mail received!')

    const handelSignup = async (e) => {
    
        e.preventDefault()
    
        const signup = {email, name, Password, phone}
        setLoading(true)
        const response = await fetch('https://hsu-store.vercel.app/api/users/signup', {
    
          method: 'POST',
          body: JSON.stringify(signup),
          headers : {
            'Content-Type': 'application/json'
          }
        })

        setLoading(false)
        json = await response.json()
        notify(json, 'Signup successfull, verification mail received!')

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
            setName('')
            setPassword('')
            setPhone('')
          } catch(e) {
            throw new Error(e)
          }
        }
      }
    

    return (
        <div className='h-screen w-full'>
            <div className='h-screen flex flex-col justify-center items-center sm:gap-10'>
                <div>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]">
                        sign up to&nbsp;
                    </span>
                    <span className="text-black sm:text-[38px] font-medium font-['Poppins'] leading-[72px]">
                        Hex-Star store
                    </span>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]"> 
                    </span>
                </div>
                <div className='flex flex-col sm:gap-7 gap-4'>

                    <input type="text" className="sm:w-[613px] sm:h-[73px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-xl text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Enter your full name' value={name} onChange={(e) => setName(e.target.value)} required/>

                    <input type="email" className="sm:w-[613px] sm:h-[73px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-xl text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="number" className="sm:w-[613px] sm:h-[73px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-xl text-xs indent-[1.6rem] font-normal font-['Montserrat'] appearance-none" placeholder='Enter phone no' value={phone} onChange={(e) => setPhone(e.target.value)} required/>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} className="sm:w-[613px] sm:h-[73px] w-[263px] h-[51.10px] rounded-[9px] bg-white bg-opacity-50 sm:rounded-[15px] border border-black backdrop-blur-[22px] sm:indent-[3.5rem] placeholder:text-neutral-500 sm:text-xl text-xs indent-[1.6rem] font-normal font-['Montserrat']" placeholder='password' value={Password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required/>
                        <IconContext.Provider value={{ className: 'absolute sm:right-16 right-8 top-[50%] cursor-pointer transform -translate-y-1/2 sm:text-[28px]'}}>
                            {!showPassword ? <FaRegEyeSlash onClick={togglePasswordVisibility} color='#7D7D7D'/> : <FaRegEye onClick={togglePasswordVisibility} color='#7D7D7D'/>}
                        </IconContext.Provider>
                    </div>


                </div>

                <button className="sm:w-[613px] sm:h-14 bg-violet-600 w-[263px] h-[39.20px] rounded-[9px] sm:rounded-[15px] border border-black backdrop-blur-[22px] text-white sm:text-xl text-xs font-normal font-['Poppins'] max-sm:mt-8 hover:bg-violet-700 disabled:opacity-75 " onClick={handelSignup} disabled={loading}>{loading ? <>Loading...</> : <>Sign up</>}</button>
                <ToastContainer />

                <div className='max-sm:mt-8'>
                    <span className="text-neutral-500 sm:text-xl text-xs font-normal font-['Poppins']">
                        Already have an account ?</span><span className="text-violet-600 sm:text-xl text-xs font-normal font-['Poppins']">
                            <a href="/login"> Login</a>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default Signup;
