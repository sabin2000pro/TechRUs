import React, {useState} from 'react'
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string | null>("");
    const [error, setError] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean | null>(false);

    const onForgotPasswordSubmit = (): any => {
        try {

        } 
        
        catch(error: any) {

        } 


    }
 
  return (

    <>

      <div className = "forgot-container">

         <form method = 'POST' onSubmit = {onForgotPasswordSubmit}>

         </form>


      </div>

    </>

  )
}

export default ForgotPassword