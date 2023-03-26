import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerifyLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (

    <>
      <h2 className = "heading-secondary">Login Verification Page</h2>
    </>

    
  )
}

export default VerifyLogin