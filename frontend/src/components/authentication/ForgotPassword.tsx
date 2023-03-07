import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MetaData from '../../layout/MetaData'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state: any) => state.auth);

  return (

    <>
      <MetaData pageTitle = {`Forgot Password`} />
    </>

  )
}

export default ForgotPassword