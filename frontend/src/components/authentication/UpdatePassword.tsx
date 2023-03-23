import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdatePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>(""); // Local state Variable to store the new password
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {} = useSelector((state: any) => state.auth);
    const [userPasswordUpdated, setUserPasswordUpdated] = useState<boolean>(false);

    const onUpdatePasswordHandler = (event: any): void => {
      try {

      } 
      
      catch(error) {
        
          if(error) {
              setUserPasswordUpdated(false);
          }
      }


    }

  return (

    <>
      <h2 className = "heading-secondary">Update Password</h2>

      <div className = "flex justify-center items-center h-screen login-container">

        <form method = "POST" onSubmit = {onUpdatePasswordHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container login-form">

          <h1 className = "heading-primary h-login">Update Password</h1>

            <div className = "mb-4 login-container-inputs">

            <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">E-mail</label>

          <input value = {currentPassword} onChange = {(event) => setCurrentPassword(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "currentPassword" type = "text" placeholder = "Current Password" />

          </div>

          <div className = "mb-6 login-password-container">
              <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Password</label>
              <input value = {newPassword} onChange = {(event) => setNewPassword(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "newpassword" type = "password" placeholder = "Enter your new password" />
          </div>


          <div className = "flex items-center justify-center login-btn-container">

          <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Login</button>

          </div>

        </form>

</div>
    </>

  )
}

export default UpdatePassword