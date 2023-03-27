import { FETCH_SINGLE_REVIEW_FAIL, FETCH_SINGLE_REVIEW_SUCCESS } from './../constants/review-constants';
import { FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, FETCH_SINGLE_REVIEW_REQUEST} from "../constants/review-constants";
import { Dispatch } from "redux";
import axios from 'axios';

export const fetchAllReviews = (keyword = '') => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({type: FETCH_REVIEWS_REQUEST});

        const {data} = await axios.get(`http://localhost:5407/api/v1/reviews?keyword=${keyword}`);
        console.log(`Reviews Data : `, data);

        dispatch({type: FETCH_REVIEWS_SUCCESS, payload: data.reviews});
    } 
    
    catch(error: any) {
        dispatch({type: FETCH_SINGLE_REVIEW_FAIL, payload: error.data.response.message});
    }

}

export const fetchReviewByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: FETCH_SINGLE_REVIEW_REQUEST});

       const {data} = await axios.get(`http://localhost:5407/api/v1/reviews/${id}`);
       console.log(`Single Review : `, data);

       dispatch({type: FETCH_SINGLE_REVIEW_SUCCESS, payload: data.review});
    } 
    
    catch(error) {

      if(error) {
         console.log(`Single Review Error : `)
         dispatch({type: FETCH_SINGLE_REVIEW_FAIL, payload: error.data.response.message});
      }

    }

}

export const createReview = (product: string, title: string, rating: number, comment: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({type: CREATE_REVIEW_REQUEST});

        const {data} = await axios.post(`http://localhost:5407/api/v1/reviews`);

        console.log(`Review Data ; `, data);

        dispatch({type: CREATE_REVIEW_SUCCESS, payload: data.review});
    } 
    
    catch(error) {
        console.log(`Create Review Error : `)
        dispatch({type: FETCH_SINGLE_REVIEW_FAIL, payload: error.data.response.message});
    }

}

export const editReviewByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}

export const deleteReviewByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
    
}

export const deleteReviews = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}