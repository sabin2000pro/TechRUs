import express from 'express';
import {fetchAllUsers, fetchUserByID, deleteAllUsers, editStaffUserShifts, deleteUserByID} from '../controllers/users-controller';

export const userRouter = express.Router();

userRouter.route('/').get(fetchAllUsers).delete(deleteAllUsers)
userRouter.route('/:id').get(fetchUserByID).put(editStaffUserShifts).delete(deleteUserByID);