import { CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL} from "../constants/review-constants";


const reviewsState = {
    reviews: []
}

const singleReviewState = {
    review: {}
}

export const reviewsReducer = (state: any = reviewsState, action: any) => {
    switch(action.type) {

    }
    
}

export const singleReviewReducer = (state: any = singleReviewState, action: any) => {
    switch(action.type) {

    }


}