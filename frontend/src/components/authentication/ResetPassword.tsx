import React, { FormEvent, useState } from 'react'
import axios from 'axios';

// Pre Condition: Before submitting the reset password form:
// Post Condition: Reset Password component sends the 
interface IResetPasswordProps { // Component Qualification Interface storing the parameters the component holds
    onResetPasswordSubmit: (event: FormEvent<HTMLFormElement> ) => void;
    onResetPasswordChange: (event: FormEvent<HTMLFormElement>) => void;
    email: string | null;
    error: string | null;
    success: string | null;
    isLoading: boolean;
}

export const ResetPassword: React.FC<IResetPasswordProps> = ({onResetPasswordChange, onResetPasswordSubmit, email, error, success, isLoading}) => {

  return (

    <>

      <div className = "reset-container">

            <form onSubmit = {onResetPasswordSubmit} method = "POST">

            </form>

      </div>


    </>

  )
}