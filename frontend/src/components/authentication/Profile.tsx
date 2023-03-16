import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../../actions/auth-actions'

const Profile = () => { // User personal profile page
    const dispatch = useDispatch();
    const {isAuthenticated, error, user} = useSelector((state: any) => state.auth);

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
    
      {isAuthenticated && !error && (

                  <div className = "flex flex-col justify-center items-center">

                    <div className = "w-1/3 p-4">

                      <div className = "bg-blue rounded-lg shadow-lg p-6 h-30 mt-12 profile-container">
                            <h2 className="text-xl font-bold mb-4">Logged In As: {user.username}</h2>

                        <div className="mb-4">

                          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Username
                          </label>

                      <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type="text" value = {user.username} disabled />
                        </div>

                        <div className="mb-4">

                           <label className="block text-gray-700 font-bold mb-2" htmlFor = "email">
                              Email
                             </label>

                          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type = "email" value = {user.email}
                            disabled
                          />

                        </div>

                        <div className="flex flex-row justify-center">

                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                            Update Profile
                          </button>

                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update Password
                          </button>

                        </div>
                      </div>
                    </div>


                    <div className="w-2/3 p-4">
                      {/* Main content goes here */}
                    </div>

                  </div>
                )}
              </>
   

  )
}

export default Profile