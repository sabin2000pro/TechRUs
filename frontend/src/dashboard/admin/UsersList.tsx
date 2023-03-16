import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/auth-actions';

const UsersList = () => {
    const dispatch = useDispatch();
    const {loading, users} = useSelector((state: any) => state.users);

    useEffect(() => {

       const loadAllUsers = async () => {

         try {
           dispatch(fetchAllUsers() as any);
         }
         
         catch(error) {
            if(error) {
              console.log(`Error Occurred Fetching users : `, error);
            }
         }

       }

       loadAllUsers();
    }, [dispatch])

  return (
    <>
        <div className = "flex justify-center">
           <h2 className = "heading-secondary">Users List</h2>
       </div>


    </>
  )
}

export default UsersList