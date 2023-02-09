import React, { FormEvent } from 'react'
import axios from 'axios';

interface IResetPasswordProps { // Component Qualification Interface storing the parameters the component holds
    onResetPasswordSubmit: (event: FormEvent<HTMLFormElement> ) => void;
    onResetPasswordChange: (event: FormEvent<HTMLFormElement>) => void;
    email: string | null;
    error: string | null;
    success: string | null;
    loading: boolean;
}

export const ResetPassword: React.FC<IResetPasswordProps> = ({onResetPasswordChange, onResetPasswordSubmit, email, error, success, loading}) => {

  return (

    <>

      <div className = "reset-container">

            <form onSubmit = {onResetPasswordSubmit}>

            </form>

      </div>


    </>

  )
}