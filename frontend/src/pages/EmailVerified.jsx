import 'react-toastify/dist/ReactToastify.css';
import GreenCheck from '../assets/GreenCheck.svg';

const EmailVerified = () => {

    var json = ''


    const getToken= ()=>{
        const url=window.location.pathname;
        const token=url.substring((url.lastIndexOf('/') + 1), );
        return token;
    }

    const handleEmailVerified = async () => {
    
        const token=getToken();
        const response = await fetch(`https://hsu-store-backend.vercel.app/api/users/verify-email/${token}`, {
    
          method: 'GET',
          }
        )

        json = await response.json()
        console.log(token)

        if(!response.ok) {
          try {
            console.log(json)
          } catch(e) {
            throw new Error(e)
          }
        }
      }
    

    return (
        <div className='h-screen w-full' onLoad={handleEmailVerified}>
            <div className='h-screen flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center sm:gap-10 gap-6'>

                    <img className='object-center flex sm:w-[100px] w-[50px]' src={ GreenCheck } alt='Green Check' />
                    <div className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] sm:leading-[20px] leading-[5px]">
                        your email ID has been&nbsp;
                    </div>
                    <div className="flex flex-col justify-center items-center text-black sm:text-[38px] font-medium font-['Poppins'] leading-[0px]">
                        verified successfully
                    </div>
                    <span className="text-neutral-500 sm:text-[38px] font-medium font-['Poppins'] leading-[72px]"> 
                    </span>
                </div>


                <div className='max-sm:mt-8'>
                    <span className="text-violet-600 sm:text-xl text-xs font-normal font-['Poppins']">
                            <a href="/">Return to profile</a>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default EmailVerified;