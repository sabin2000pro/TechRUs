import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/auth-actions';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';

const UsersList: React.FC = () => {
    const dispatch = useDispatch();
    const {loading, users, error} = useSelector((state: any) => state.users);
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

    }, [dispatch])

  return (
    

    <>
     <MetaData pageTitle = {`Staff Users`} />

    {error && (

       <>

         <div className="bg-red-200 border border-red-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
              <h2>{error}</h2>
          </div>


       </>
    )}

       {loading ? <Loader /> : (

        <>

          <div className  = "flex justify-center">
            
            <div className = "flex w-72 justify-center items-center p-4">

                <div className = "flex flex-row gap-6 product-card-container w-9">

                {users && users.length === 0 && <h2 className = "heading-secondary">No Users Found</h2>}
       
                    {users.map((user: any) => (

                <div>

                   <div className="bg-white shadow-md rounded px-12 py-6 product-card">
 
                    <div className = "relative w-72 m-4 product-badge-container">

                        </div>

                          <h2 className="text-lg font-medium mb-2 heading-secondary">Username {user.username}</h2>

                          <Link to = {`/user-details/${user._id}`} className = "view-btn" type = "submit">View User</Link>

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
