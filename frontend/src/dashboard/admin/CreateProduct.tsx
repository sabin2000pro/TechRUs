import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
    
  return (

    <>

       <div className = "create-container">
           <h2 className = "heading-secondary">Create Product Page</h2>
       </div>

    </>

  )

}

export default CreateProduct