import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch();
  const {} = useSelector((state: any) => state.auth);
  const [emailVerified, setEmailVerified] = useState(false);

  return (

    <>
       <h2 className = "heading-secondary">Verify E-mail Address</h2>
    </>

  )
}

export default VerifyEmail