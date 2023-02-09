import React, {useState} from 'react'
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string | null>("");
    const [error, setError] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean | null>(false);

  return (

    <>

      <div className = "forgot-container">

      </div>


    </>

  )
}

export default ForgotPassword