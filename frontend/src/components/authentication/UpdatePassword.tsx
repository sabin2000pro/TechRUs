import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../actions/auth-actions'

const UpdatePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {} = useSelector((state: any) => state.auth);

    const onUpdatePasswordHandler = (event: React.FormEvent<HTMLFormElement>): void => {
       try {
          event.preventDefault();

          dispatch(updatePassword(currentPassword, newPassword) as any);
          setPasswordUpdated((passwordUpdated) => !passwordUpdated);

       }
       
        catch(error) {

       }


    }

  return (

    <>
      <h2 className = "heading-secondary">Update Password</h2>

       <form onSubmit = {onUpdatePasswordHandler} className = "update-password-form" method = "POST">
 
       </form>
    </>

  )
}

export default UpdatePassword