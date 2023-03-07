import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../layout/Loader';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import { login } from '../../actions/auth-actions';
import Alert from '../../layout/Alert';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {loading, error, isAuthenticated, user} = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const onLoginHandler = (event) => {

    event.preventDefault();
    dispatch(login(email, password) as any);
    setFormSubmitted((formSubmitted) => !formSubmitted);

  }

  useEffect(() => {

      if(isAuthenticated) {
        navigate('/products')
      }

      if(error) {
        console.log(error);
      }

  }, [error, isAuthenticated, user])
  
  return (

    <>

    
    <MetaData pageTitle = {`Login`} />

     {isAuthenticated && <Alert message = {`Logged In`} />}

     {!loading && !isAuthenticated && !error && (

          <>

          <div className = "flex justify-center items-center h-screen login-container">

              <form method = "POST" onSubmit = {onLoginHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container login-form">

                <h1 className = "heading-primary h-login">User Login</h1>

                  <div className = "mb-4 login-container-inputs">

                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">E-mail</label>

                <input onChange = {(event) => setEmail(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id  ="username" type="text" placeholder="Username" />

                </div>

                <div className = "mb-6 login-password-container">
                    <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Password</label>
                    <input onChange = {(event) => setPassword(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />
                      {true && false ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : ''}
                </div>

                <div className = "flex justify-center">
                  <span>Need an account? - <Link className = "reset-link" to ='/user-register'>Register Here</Link>   </span>
                </div>

                <div className = "flex items-center justify-center login-btn-container">

                <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Login</button>

                </div>

            </form>

         </div>
        </>


     )}
      
  
    </>

  );
};

export default Login;