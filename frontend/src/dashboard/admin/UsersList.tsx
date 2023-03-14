import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const dispatch = useDispatch();


  return (
    <>
        <div className = "flex justify-center">
           <h2 className = "heading-secondary">Users List</h2>
       </div>


    </>
  )
}

export default UsersList