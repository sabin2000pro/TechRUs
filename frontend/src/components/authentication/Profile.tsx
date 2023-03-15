import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../../actions/auth-actions'

const Profile = () => { // User personal profile page
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector((state: any) => state.auth);

    useEffect(() => {
       const loadUser = async () => {

         try {
           dispatch(fetchLoggedInUser() as any)
         } 
         
         catch(error) {

            if(error) {
              return console.error(error);
            }

         }

       }

       loadUser();

    }, [dispatch])

  return (
    <>

      <h2 className = "heading-secondary">My Profile</h2>

    </>

  )
}

export default Profile