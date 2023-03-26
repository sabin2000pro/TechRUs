import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { verifyEmailAddress } from '../../actions/auth-actions';
import MetaData from '../../layout/MetaData';

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [OTP, setOTP] = useState<string>("");

  const {isAuthenticated, error, user} = useSelector((state: any) => state.auth);
  const [emailVerified, setEmailVerified] = useState(false);

  const onEmailVerificationHandler = (event): void => {

  }

  return (

    <>

    <MetaData pageTitle = {`E-mail Verification`} />

       <div className = "flex justify-center items-center h-screen login-container">

              <form method = "POST" onSubmit = {onEmailVerificationHandler} className = "bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 auth-container login-form">

                <h1 className = "heading-primary h-login">E-mail Verification</h1>

                  <div className = "login-container-inputs">

                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">One Time Passcode</label>

                <input onChange = {(event) => setOTP(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  mt-5 focus:outline-none focus:shadow-outline" id  ="otp" type = "text" placeholder="Enter your OTP" />

                </div>

            <div className = "flex items-center justify-center login-btn-container verify-container">

            <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline verify-btn" type="submit">Verify</button>

            </div>

            <div className = "resend-container">
                 <span>Haven't received your code? - Resend Here  </span>
              </div>

            </form>

         </div>
    </>

  )
}

export default VerifyEmail