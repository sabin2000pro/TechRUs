import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../actions/auth-actions'
import MetaData from '../../layout/MetaData'

const UpdatePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated, error} = useSelector((state: any) => state.auth);

    const onUpdatePasswordHandler = (event: React.FormEvent<HTMLFormElement>): void => { // The method is invoked when the form is submitted

       try {

          event.preventDefault();

          console.log(`Current Password : `, currentPassword);

          dispatch(updatePassword(currentPassword, newPassword) as any);
          setPasswordUpdated((passwordUpdated) => !passwordUpdated);

       }
       
      catch(error) {

          if(error) {
            setPasswordUpdated(false);
            console.log(`Update Password Error : `, error);
          }

       }


    }

  return (

    <>

     <MetaData pageTitle={`Update User Password`} />

      <div className = "flex justify-center items-center h-screen login-container">

        <form method = "POST" onSubmit = {onUpdatePasswordHandler} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container login-form">

          <h1 className = "heading-primary h-login">Update Password</h1>

        <div className = "mb-4 login-container-inputs">
            <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">Current Password</label>
            <input value = {currentPassword} onChange = {(event) => setCurrentPassword(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "currentpassword" type="text" placeholder="Current password" />
          </div>

          <div className = "mb-6 login-password-container">
              <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">New Password</label>
              <input value = {newPassword} onChange = {(event) => setNewPassword(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />
              
          </div>

          <div className = "flex items-center justify-center login-btn-container">

          <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Update Password</button>

          </div>

        </form>

</div>
    </>

  )
}

export default UpdatePassword