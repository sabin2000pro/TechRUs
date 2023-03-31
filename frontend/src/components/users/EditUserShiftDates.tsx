import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MetaData from '../../layout/MetaData';
import { updateUserShifts } from '../../actions/auth-actions';
import Loader from '../../layout/Loader';

interface IEditShiftDatesProps {
    startShiftDate: Date;
    endShiftDate: Date
}

const EditUserShiftDates: React.FC<IEditShiftDatesProps> = () => { // Component that allows the store manager to edit the staff users start / end shift dates
    const [startShiftDate, setStartShiftDate] = useState<Date>(new Date(Date.now()));
    const [endShiftDate, setEndShiftDate] = useState<Date>(new Date(Date.now()));
    const [shiftsUpdated, setShiftsUpdated] = useState<boolean>(false);
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
             setShiftsUpdated(false);
         }

      }


    }

  return (

    <>

       <MetaData pageTitle = {`Edit Staff User Shifts`} />

       {loading && <Loader />}

        <>
            <form onSubmit = {handleEditUserShift} >
                     
            </form>
   
        </>


        
    </>


  )
}

export default EditUserShiftDates