import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../layout/Loader';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginHandler = async (event) => {
    event.preventDefault();
    console.log(`On Login Handler Click`)
  }
  
  return (

    <>


      <div className = "flex justify-center items-center h-screen login-container">

        <form method = "POST" onSubmit = {onLoginHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 login-form-container">

           <h1 className = "heading-primary h-login">User Login</h1>

            <div className = "mb-4 login-container-inputs">

            <label className="block text-gray-700 text-sm font-bold mb-2 login-username-label" htmlFor="username">
              Username
            </label>

          <input className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />

          </div>

           <div className = "mb-6 login-password-container">
              <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Password</label>
              <input className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            
                {true && false ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : ''}
          </div>

          <div className = "flex justify-center">
             <span>Forgot Password ? - <Link to ='/forgot-password'>Reset Here</Link>   </span>
          </div>

          <div className = "flex items-center justify-center login-btn-container">

           <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>

          </div>


        </form>


      </div>
    </>

  );
};

export default Login;