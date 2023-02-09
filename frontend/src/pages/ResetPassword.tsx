import React, { FormEvent } from 'react'

interface IResetPasswordProps {
    onResetPasswordSubmit: (event: FormEvent<HTMLFormElement> ) => void;
    onResetPasswordChange: (event: FormEvent<HTMLFormElement>) => void;
    email: string | null;
    error: string | null;
    success: string | null;
    loading: boolean;
}

const ResetPassword: React.FC<IResetPasswordProps> = ({onResetPasswordChange, onResetPasswordSubmit, email, error, success, loading}) => {

  return (

    <>

      <div className = "reset-container">
        
            <form onSubmit = {onResetPasswordSubmit}>

            </form>

      </div>


    </>

  )
}

export default ResetPassword