import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/auth-actions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    const {resetToken} = useParams();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: any) => state.auth);
    const [passwordReset, setPasswordReset] = useState<boolean>(false); // True or false when the password has been reset successfully
    const user = JSON.parse(sessionStorage.getItem("user") as any);

    const onResetPasswordHandler = (event): void => {

      try {
        event.preventDefault();

        dispatch(resetPassword(currentPassword, newPassword, resetToken) as any);
        setPasswordReset((passwordReset) => !passwordReset); // Password reset is true
      } 
      
      catch(error) {

        if(error) {
           console.error(error);

           setPasswordReset(false);
        }


      }


    }


  return (

    <>

      <h2 className = "heading-secondary">Reset Password</h2>

       <form onSubmit = {onResetPasswordHandler} className = "reset-form" method = "POST">
          
       </form>


    </>

  )
}

export default ResetPassword