import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/auth-actions';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';

const UsersList: React.FC = () => {
    const dispatch = useDispatch();
    const {loading, users} = useSelector((state: any) => state.users);
    const [usersFetched, setUsersFetched] = useState<boolean>(false);

    useEffect(() => {

       const loadAllUsers = async () => {

         try {
          
           dispatch(fetchAllUsers() as any);
           setUsersFetched((usersFetched) => !usersFetched);
         }
         
         catch(error) {

            if(error) {
              console.log(`Error Occurred Fetching users : `, error);
            }

         }

       }

       loadAllUsers();
    }, [])

  return (

    <>

     <MetaData pageTitle = {`Staff Users`} />

       {loading ? <Loader /> : (

        <>

    <div className  = "flex justify-center">
            
            <div className = "flex w-72 justify-center items-center p-4">
              <div className = "flex flex-row gap-6 product-card-container">

                {users && users.length === 0 && <h2 className = "heading-secondary">No Users Found</h2>}
       
                   {users.map((user: any) => (

              <div>

                   <div className="bg-white shadow-md rounded px-12 py-6 product-card">
 
                    <div className = "relative w-72 m-4 product-badge-container">

                        </div>

                          <h2 className="text-lg font-medium mb-2 heading-secondary">{user.username}</h2>

                          <p className ="product-descriptions "> {user.email} </p>

                          <Link to = {`/user-details/${user._id}`} className = "product-btn" type = "submit">View User</Link>

                          </div>

         
                    </div>

              
              ))}

           </div>
     
   </div>
 
 
   </div>
   

 
        </>
       )}

      

    </>
  )
}

export default UsersList
