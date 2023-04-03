import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyLoginMfa } from '../../actions/auth-actions';

const VerifyLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mfaToken, setMfaToken] = useState<string>("");
  const {error, loading} = useSelector((state: any) => state.auth)
  const [verifyLoginSubmitted, setVerifyLoginSubmitted] = useState<boolean>(false);

  const onLoginVerificationHandler = (event): void => {

    try {
      event.preventDefault();

      const user = JSON.parse(sessionStorage.getItem("user") as any);
      const userId = user._id;

      dispatch(verifyLoginMfa(userId, mfaToken) as any)

      setVerifyLoginSubmitted((verifyLoginSubmitted) => !verifyLoginSubmitted);
    } 
    
    catch(error) {

       if(error) {
          console.error(error);
          setVerifyLoginSubmitted(false)
       }

    }

  }

  return (

    <>
      <h2 className = "heading-secondary">Login Verification</h2>

      <div className = "flex justify-center items-center h-screen login-container">

              <form method = "POST" onSubmit = {onLoginVerificationHandler} className = "bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 auth-container login-form">

                <h1 className = "heading-primary h-login">E-mail Verification</h1>

                  <div className = "login-container-inputs">

                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email"></label>

                <input onChange = {(event) => setMfaToken(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-5 mb-12 focus:outline-none focus:shadow-outline" id  ="otp" type = "text" placeholder="Enter your OTP" />

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

export default VerifyLogin