import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../actions/auth-actions';

const SingleUser: React.FC = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state: any) => state.singleUser);
  const {id} = useParams();
  const [userLoaded, setUserLoaded] = useState<boolean>(false);

  console.log(`User ID to fetch : `, id);

  useEffect(() => {
      const loadSingleUser = async () => {

      }

      loadSingleUser();

  }, [dispatch])

  return (

    <>
      <h2 className = "heading-secondary">Single User</h2>
    </>

  )
}

export default SingleUser