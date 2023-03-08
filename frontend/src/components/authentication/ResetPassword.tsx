import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state: any) => state.auth);

    useEffect(() => {

    }, [])

  return (

    <>

    </>

  )
}

export default ResetPassword