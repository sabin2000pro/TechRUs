import React, {useState, useEffect} from 'react'
import MetaData from '../../layout/MetaData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../actions/auth-actions'

const Register = () => { // Register Component
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading, error, user, isAuthenticated} = useSelector((state: any) => state.auth);

  const onRegisterHandler = async (event) => {
     try {

         event.preventDefault()
         dispatch(register(username, email, password) as any);

         navigate('/user-login');
     } 
     
     catch(error) {

        if(error) {
           console.log(error);
        }

     }


  }

  useEffect(() => {

    if(error) {
      console.log(`Register Error : `, error);
    }

     if(user) {
       console.log(`Registered user : `, user);
     }

  }, [user, error])

  return (

    <>

        <MetaData pageTitle = {`Register`} />

        {!loading && (

             <div className = "flex justify-center items-center h-screen login-container">

             <form method = "POST" onSubmit = {onRegisterHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container">
             
               <h1 className = "heading-primary h-login">User Registration</h1>

               <div className = "mb-4 login-container-inputs username-container">
                     <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "username">Username</label>
                     <input value = {username} onChange = {(event) => setUsername(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder="Username" />
               </div>
               
             
                 <div className = "mb-4 login-container-inputs">
                     <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">E-mail</label>
                     <input value = {username} onChange = {(event) => setUsername(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder="Username" />
               </div>

            
               <div className = "mb-6 login-password-container">
                     <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Password</label>
                     <input className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />
                     {true && false ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : ''}
               </div>
             
               <div className = "flex justify-center">
                 <span>Have an account ? - <Link className = "reset-link" to ='/user-login'>Login Here</Link>   </span>
               </div>
             
               <div className = "flex items-center justify-center login-btn-container">
             
               <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Register</button>
             
               </div>
             
             
             </form>
             
             
             </div>
        )}

       

     </>


  )

}

export default Register