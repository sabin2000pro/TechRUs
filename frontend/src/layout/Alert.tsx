import React from 'react'

interface IAlertProps {
    message: string
}

const Alert = ({message}) => {

  return (

    <>

    <div className ="bg-teal-100 alert-container border-t-4  rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">

        <div className = "flex">

        <div className = "alert-container-message">

           <p className ="font-bold">{message}</p>
        
          </div>

       </div>
    </div>
    </>

  )
}

export default Alert