import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from '../components/Popup';
import Confetti from 'react-confetti';

const Home = () => {
    const { user } = useAuthContext();
    const [showPopup, setShowPopup] = useState(false);
    const [confetti, setConfetti] = useState(false);

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
        <div className={`flex h-screen justify-center items-center font-["Poppins"] ${showPopup ? 'darken' : ''}`}>
            Home page
            {confetti && <Confetti  width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} recycle={false} gravity={0.05} wind={0.02} tweenDuration={10000} />}
            {showPopup && <Popup onClose={handleClosePopup} />}
        </div>
    );
}

export default Home;
