import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from '../components/Popup';
import Confetti from 'react-confetti';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    const { user } = useAuthContext();
    const [showPopup, setShowPopup] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const navigate = useNavigate()

    const initPayment = (data) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_ID,
            amount: data.order.amount,
            handler: async(response) => {
                try {
                    const verifyURL = 'https://hsu-store-backend.vercel.app/api/users/verify-order'
                    const { data } = await axios.post(verifyURL, response)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
            },
            theme: {
                color: '#3399cc'
            }
        };
        const rzp1 = new window.Razorpay(options);
		rzp1.open();
    }

    const handelPayment = async() => {
        try {
            if(user) {
                const orderURL = 'https://hsu-store-backend.vercel.app/api/users/create-order'
                const data = await axios.post(orderURL, {amount: 500}, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                console.log(data)
                initPayment(data.data)
            }
            else {
               navigate('/login')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        try {
            if(user && user.status !== false) {
                setShowPopup(true);
            }
        } catch(error) {
            console.log(error);
        }
    }, [user]);

    const handleConfetti = () => {
      setConfetti(true);
    };
  
    useEffect(() => {
      if(showPopup) {
        handleConfetti()
      }
    },[showPopup])

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={`flex flex-col h-screen font-["Poppins"] ${showPopup ? 'darken' : ''}`}>
            <Navbar />
            <div className='h-[76px] bg-violet-600'></div>
            <div className="flex h-screen justify-center items-center">
               
            </div>
            {confetti && <Confetti  width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={false} gravity={0.05} wind={0.02} tweenDuration={10000} />}
            {showPopup && <Popup onClose={handleClosePopup} />}
        </div>

    );
}

export default Home;
