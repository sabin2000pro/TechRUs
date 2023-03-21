import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MetaData from '../../layout/MetaData';
import { updateUserShifts } from '../../actions/auth-actions';

interface IEditShiftDatesProps {
    startShiftDate: Date;
    endShiftDate: Date
}

const EditUserShiftDates: React.FC<IEditShiftDatesProps> = () => { // Component that allows the store manager to edit the staff users start / end shift dates
    const [startShiftDate, setStartShiftDate] = useState<Date>(new Date(Date.now()));
    const [endShiftDate, setEndShiftDate] = useState<Date>(new Date(Date.now()));

    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state: any) => state.user) as any;

    const handleEditUserShift = (event) => {
      event.preventDefault();

      try {
         dispatch(updateUserShifts(user._id, startShiftDate, endShiftDate) as any);
      }
      
      catch(error) {

         if(error) {
             console.error(error);
         }

      }


    }

  return (

    <>

       <MetaData pageTitle = {`Edit Staff User Shifts`} />

       {!loading && !error && (

        <>

            <form onSubmit = {handleEditUserShift}>
                     
            </form>
   
        </>

       )}

      
        
    </>


  )
}

export default EditUserShiftDates