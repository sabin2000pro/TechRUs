import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const SingleUser: React.FC = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state: any) => state.singleUser);
  const {id} = useParams();

  console.log(`User ID to fetch : `, id);

  return (

    <>
      <h2 className = "heading-secondary">Single User</h2>
    </>

  )
}

export default SingleUser