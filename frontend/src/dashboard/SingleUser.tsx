import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../actions/auth-actions';

const SingleUser: React.FC = () => {
  const dispatch = useDispatch();
  const {loading, user, error} = useSelector((state: any) => state.singleUser);
  const {id} = useParams<string>();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  console.log(`User ID to fetch : `, id);

  useEffect(() => {

      const loadSingleUser = async () => {
         try {
            dispatch(fetchUserByID(id as any) as any)

            setUserLoaded((userLoaded) => !userLoaded);

            console.log(`Loaded User Details : `, user);
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
      <h2 className = "heading-secondary">{user.username}</h2>
    </>

  )
}

export default SingleUser