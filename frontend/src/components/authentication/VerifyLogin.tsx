import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyLoginMfa } from '../../actions/auth-actions';
import MetaData from '../../layout/MetaData';

const VerifyLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [multiFactorToken, setMultiFactorToken] = useState<string>("");
  const {error} = useSelector((state: any) => state.auth)
  const [verifyLoginSubmitted, setVerifyLoginSubmitted] = useState<boolean>(false);

  const onLoginVerificationHandler = (event): void => {

    try {
      event.preventDefault();

      const user = JSON.parse(sessionStorage.getItem("user") as any);
      const userId = user._id;

      if(multiFactorToken.toString() === "") {
         setVerifyLoginSubmitted(false);
      }

      dispatch(verifyLoginMfa(userId, multiFactorToken) as any)
      setVerifyLoginSubmitted((verifyLoginSubmitted) => !verifyLoginSubmitted);

      setTimeout(() => {
         navigate(`/`)

         window.location.reload();
      }, 1200)

    } 
    
    catch(error) {

       if(error) {
          setVerifyLoginSubmitted(false)
       }

    }

  }

  return (

    <>

      <MetaData pageTitle = {`Verify Login`} />

      {verifyLoginSubmitted && (
         <>

          <div className="bg-green-200 border border-green-400 text-black-700 px-4 py-3 rounded my-4 success-banner">
              <h2>Account Verified</h2>
          </div>

         </>
      )}

      {error && (

         <>
            <div className="bg-red-200 border border-red-400 text-black-700 px-4 py-3 rounded my-4 success-banner">
                  <h2>{error}</h2>
            </div>

         </>
      )}

      <div className = "flex justify-center items-center h-screen login-container">

             <form method = "POST" onSubmit = {onLoginVerificationHandler} className = "bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 auth-container login-form">

                <div className = "login-container-inputs">
                     <h2 className = "heading-secondary mb-6">Login Verification</h2>
                    <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "token">Token</label>
                    <input value = {multiFactorToken} onChange = {(event) => setMultiFactorToken(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-5 mb-12 focus:outline-none focus:shadow-outline" id = "token" type = "text" placeholder = "Enter MFA Token" />
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