import express from 'express';
import {fetchAllUsers, fetchUserByID, createNewUser, editStaffUserShifts, deleteUserByID} from '../controllers/users-controller';

export const userRouter = express.Router();

userRouter.route('/').get(fetchAllUsers).post(createNewUser)
userRouter.route('/:id').get(fetchUserByID).put(editStaffUserShifts).delete(deleteUserByID);