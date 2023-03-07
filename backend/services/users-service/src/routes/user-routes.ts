import express from 'express';
import {fetchAllUsers, fetchUserByID, editStaffUserShifts, deleteUserByID} from '../controllers/users-controller';

export const userRouter = express.Router();

userRouter.route('/').get(fetchAllUsers)
userRouter.route('/:id').get(fetchUserByID).put(editStaffUserShifts).delete(deleteUserByID);