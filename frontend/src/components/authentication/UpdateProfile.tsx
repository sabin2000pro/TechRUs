import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData';

const UpdateProfile: React.FC = () => {
    const dispatch = useDispatch();

  return (

    <>

    <MetaData pageTitle = {`Update Profile`} />

      <h2 className = "heading-secondary">Update Profile</h2>

    </>

  )
}

export default UpdateProfile