import React from 'react'
import {useNavigate} from 'react-router-dom'


const EditProduct: React.FC = () => {
    const navigate = useNavigate();

  return (

    <>

       <div className = "edit-container">
          <h2 className = "heading-secondary">Edit Product Page</h2>
       </div>

    </>

  )
}

export default EditProduct