import React from 'react'
import {useNavigate} from 'react-router-dom'

export interface IEditProductProps {
    id: string
}

export const EditProduct: React.FC<IEditProductProps> = ({id}) => {
    const navigate = useNavigate();

  return (

    <>

       <div className = "edit-container">
          <h2>Edit Product Page</h2>
       </div>

    </>

  )
}

