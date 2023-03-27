import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MetaData from '../../layout/MetaData'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state: any) => state.auth);

  const onForgotPasswordHandler = (event) => {
     
  }

  return (

    <>
      <MetaData pageTitle = {`Forgot Password`} />

      <div className = "flex justify-center items-center h-screen forgot-container">

    <form method = "POST" onSubmit = {onForgotPasswordHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 mt-4 forgot-form-container">

        <h1 className = "heading-primary h-login mt-4">Forgot Password</h1>

          <div className = "mb-4 login-container-inputs mt-5">

          <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">E-mail</label>

        <input onChange = {(event) => setEmail(event.target.value)} className = "shadow mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id  ="email" type="text" placeholder="E-mail Address" />

        </div>

        <div className = "flex items-center justify-center login-btn-container mt-12">

        <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline mt-6" type="submit">Send</button>

        </div>

      </form>

      </div>

    </>

  )
}

export default ForgotPassword // Export the component