import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from '../components/Popup';

const Home = () => {
    const { user } = useAuthContext();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        try {
            if(user && user.status !== false) {
                setShowPopup(true);
            }
        } catch(error) {
            console.log(error);
        }
    }, [user]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className={`flex h-screen justify-center items-center font-["Poppins"] ${showPopup ? 'darken' : ''}`}>
            Home page
            {showPopup && <Popup onClose={handleClosePopup} />}
        </div>
    );
}

export default Home;
