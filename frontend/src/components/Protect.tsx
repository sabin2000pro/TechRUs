import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Protect = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.auth);

  console.log(`Logged In User : `, user);
  
  return (
    <>

    </>

  )
}

export default Protect