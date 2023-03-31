import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../actions/auth-actions';
import MetaData from '../layout/MetaData';

export interface UserData {
  id?: string
}

const SingleUser: React.FC = () => { // Single User Functional Component
  const dispatch = useDispatch();
  const {loading, user, error} = useSelector((state: any) => state.singleUser);
  const {id} = useParams<string>();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  console.log(`User ID to fetch : `, id);

  useEffect(() => {

      const loadSingleUser = async () => { // Function that loads the user from the database. Returns a promise containing the user object

         try {
            dispatch(fetchUserByID(id as any) as any)
            setUserLoaded((userLoaded) => !userLoaded);
         } 
         
         catch(error: any) {

           if(error) {
            return console.error(error);
           }

         }
      }

      loadSingleUser();

  }, [dispatch])

  return (

    <>

      <MetaData pageTitle = {`User ${user._id}`} />
      <h2 className = "heading-secondary">{user.username}</h2>
    </>

  )
}

export default SingleUser