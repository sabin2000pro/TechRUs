import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { verifyEmailAddress } from '../../actions/auth-actions';
import MetaData from '../../layout/MetaData';

const VerifyEmail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {} = useSelector((state: any) => state.auth);
  const [emailVerified, setEmailVerified] = useState(false);

  return (

    <>

    <MetaData pageTitle = {`E-mail Verification`} />
    
       <h2 className = "heading-secondary">Verify E-mail Address</h2>
    </>

  )
}

export default VerifyEmail