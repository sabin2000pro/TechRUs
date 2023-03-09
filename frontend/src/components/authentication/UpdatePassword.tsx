import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdatePassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {} = useSelector((state: any) => state.auth);

  return (

    <>
      <h2 className = "heading-secondary">Update Password</h2>
    </>

  )
}

export default UpdatePassword