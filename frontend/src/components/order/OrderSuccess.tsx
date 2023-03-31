import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../../actions/auth-actions';

const OrderSuccess: React.FC = () => {
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state: any) => state.auth);

    useEffect(() => {

      const loadUser = async () => {

         try {
            dispatch(fetchLoggedInUser() as any);
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
        {user && !loading && (

            <>
               <h2 className = "heading-secondary">We got it - Your order has been placed.</h2>
            </>


        )}
    </>

  )
}

export default OrderSuccess