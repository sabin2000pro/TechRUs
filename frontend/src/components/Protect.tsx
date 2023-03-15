import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../actions/auth-actions';

const Protect = ({...children}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.auth);

  useEffect(() => {
    const loadUser = async () => {
        dispatch(fetchLoggedInUser() as any)
        console.log(`Logged in user : `, user);
    }

    loadUser()
  }, [dispatch])


  return (
    <>

    </>

  )
}

export default Protect