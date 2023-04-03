import React, {useState} from 'react'
import MetaData from '../../layout/MetaData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../actions/auth-actions'
import Loader from '../../layout/Loader'

const Register: React.FC = () => { // Register Component
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error} = useSelector((state: any) => state.auth);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerSuccess, setOnRegisterSuccess] = useState<boolean>(false);

  const onRegisterHandler = (event: React.FormEvent<HTMLFormElement>): void => {

     try {

         event.preventDefault(); // Prevent form re-submission
         dispatch(register(username, email, password) as any);

         setOnRegisterSuccess((registerSuccess) => !registerSuccess);

         setTimeout(() => {
            setOnRegisterSuccess((registerSuccess) => !registerSuccess);
            navigate(`/verify-email`)
         }, 1200);

     } 
     
     catch(error) {

        if(error) {
           setOnRegisterSuccess(false);
        }

     }

  }


  return (

    <>

        <MetaData pageTitle = {`Register`} />

        {error && (

            <>
            
            <div className="bg-red-200 border border-red-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
               <h2>{error}</h2>
            </div>

               </>
         )}

            {registerSuccess && (

               <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded my-4 success-banner">
                  <h2>Registered Successfully</h2>
               </div>
               
               )}

             <div className = "flex justify-center items-center h-screen login-container">

             <form method = "POST" onSubmit = {onRegisterHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container">
             
               <h1 className = "heading-primary h-login">User Registration</h1>

               <div className = "mb-4 login-container-inputs username-container">
                     <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "username">Username</label>
                     <input value = {username} onChange = {(event) => setUsername(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder = "Enter yoru username" />
               </div>
               
            
               <div className = "mb-4 login-container-inputs email-container">
                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">E-mail</label>
                  <input value = {email} onChange = {(event) => setEmail(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 mb-9 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "email" type = "text" placeholder = "Enter your e-mail address" />
               </div>

            
               <div className = "mb-6 login-password-container">
                     <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Password</label>
                <input value = {password} onChange = {(event) => setPassword(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />
                     {true && false ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : ''}
               </div>
             
               <div className = "flex justify-center">
                 <span>Have an account ? - <Link className = "reset-link" to ='/user-login'>Login Here</Link>   </span>
               </div>
             
               <div className = "flex items-center justify-center login-btn-container mb-6">
                    <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline mb-6" type="submit">Register</button>
               </div>
             
             
             </form>
             
             
        </div>
      
     </>


  )

}

export default Register