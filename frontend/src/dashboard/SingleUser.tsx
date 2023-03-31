import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchUserByID } from '../actions/auth-actions';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';

const SingleUser: React.FC = () => { // Single User Functional Component
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading, user, error} = useSelector((state: any) => state.singleUser);
  const {id} = useParams<string>();
  const [userLoaded, setUserLoaded] = useState<boolean | undefined>(false);

  useEffect(() => {

      const loadSingleUser = async () => { // Function that loads the user from the database. Returns a promise containing the user object

         try {
            dispatch(fetchUserByID(id as any) as any)
            setUserLoaded((userLoaded) => !userLoaded);
         } 
         
         catch(error: any) {

           if(error) {
              setUserLoaded(false);
           }

         }
      }

      loadSingleUser();

  }, [dispatch])

  const onHandleUpdateShifts = (): void => {

    try {
       
    } 
    
    catch(error) {
       if(error) {
        console.error(error);
       }
    }

  }

  const onHandleEditUser = (): void => {
    try {

    } 
    
    catch(error) {
      
    }


  }
 
  return (

    <>

      <MetaData pageTitle = {`User ${user._id}`} />

         <div className = "flex flex-col justify-center items-center">

                <div className = "w-1/4 h-20 p-5">

                   <div className = "bg-blue rounded-lg shadow-lg p-6 h-30 mt-12 profile-container">

                      <h2 className = "text-xl font-bold mb-4">User {user?.username}</h2>

                    <div className = "mb-4">

                      <label className="block text-gray-700 font-bold mb-2" htmlFor = "username">
                        Username
                      </label>

                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" value = {user?.username} disabled />

               </div>

                    <div className="mb-4">

                        <label className="block text-gray-700 font-bold mb-2" htmlFor = "email">
                           E-mail
                        </label>

                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type = "email" value = {user?.email} disabled />

                        </div>

                        <div className = "mb-4">
                           <label className = "block text-gray-700 font-bold mb-4">Start Shift Date</label>
                           <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "startShiftDate" type = "text" value = {user?.startShiftDate} disabled/>
                        </div>

                        <div className = "mb-4">
                            <label className = "block text-gray-700 font-bold mb-4">End Shift Date</label>
                            <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "endShiftDate" type = "text" value = {user?.endShiftDate} disabled/>
                        </div>

                        <div className="flex flex-row justify-center profile-btns">

                          <button onClick = {onHandleUpdateShifts} className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                            Update Shifts
                          </button>

               <button onClick = {onHandleEditUser} className = "bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Edit User
              </button>

                        </div>
                        
                      </div>

                    </div>

            </div>

    </>

  )
}

export default SingleUser