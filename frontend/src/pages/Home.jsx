import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from '../components/Popup';

const Home = () => {

    const { user } = useAuthContext()
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        try {
            const user_data = JSON.parse(localStorage.getItem('user'))
            if(user && user_data.user.new_user === true) {
                setShowPopup(true)
            }
        }
        catch(error) {
            console.log(error)
        }
    },[user])

  return (
    <div className='flex h-screen justify-center items-center font-["Poppins"]'>
      Home page
      {showPopup && <Popup />}
    </div>
  );
}

export default Home;