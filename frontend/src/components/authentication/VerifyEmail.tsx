import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import { verifyEmailAddress } from '../../actions/auth-actions';

const VerifyEmail: React.FC = () => { // E-mail Verification component
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [OTP, setOTP] = useState<string>("");
  const {isAuthenticated, error, user} = useSelector((state: any) => state.auth);
  const [emailVerified, setEmailVerified] = useState(false);

  const onEmailVerificationHandler = (event): void => {

    try {
       event.preventDefault();

       const user = JSON.parse(sessionStorage.getItem("user") as any);
       const userId = user._id;

       dispatch(verifyEmailAddress(userId, OTP) as any);

       setEmailVerified((emailVerified) => !emailVerified);
    } 
    
    catch(error) {

       if(error) {
        console.error(error);

        setEmailVerified(false);
       }

    }


  }

  return (

    <>

    <MetaData pageTitle = {`E-mail Verification`} />

    {error && (

      <>

        <div className="bg-red-200 border border-red-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
            <h2>{error}</h2>
        </div>

        </>
      )}


      {emailVerified && (
         
         <>
          <div className="bg-green-200 border border-green-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
            <h2>E-mail Verified</h2>
          </div>

         </>

      )}

       <div className = "flex justify-center items-center h-screen login-container">

              <form method = "POST" onSubmit = {onEmailVerificationHandler} className = "bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 auth-container login-form">

                <h1 className = "heading-primary h-login">E-mail Verification</h1>

                  <div className = "login-container-inputs">

                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">One Time Passcode</label>

                <input onChange = {(event) => setOTP(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-5 mb-12 focus:outline-none focus:shadow-outline" id  ="otp" type = "text" placeholder="Enter your OTP" />

                </div>

            <div className = "flex items-center justify-center login-btn-container verify-container">
                 <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline verify-btn" type="submit">Verify</button>
            </div>

            <div className = "resend-container">
                 <span>Haven't received your code -  Resend Here </span>
            </div>

            </form>

         </div>
    </>

  )
}

export default VerifyEmail