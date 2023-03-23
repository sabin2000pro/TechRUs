import { CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL} from "../constants/review-constants";

interface IReviewsState {
    loading: boolean;
    error?: string;
    reviews: []
}

interface ISingleReviewState { // Interface for a single review
    loading: boolean;
    error?: string;
    review: {}
}

const reviewsState: IReviewsState = { // Reviews will be stored in a global reviews array
    loading: false,
    reviews: []
}

const singleReviewState: ISingleReviewState = { // A single review will be held in an object
    loading: false,
    review: {}
}

export const reviewsReducer = (state: IReviewsState = reviewsState, action: any): IReviewsState => {
    switch(action.type) {

        case FETCH_REVIEWS_REQUEST:
            return {loading: true, error: undefined, reviews: []}

        case FETCH_REVIEWS_SUCCESS:
            return {...state, loading: false, reviews: action.payload}

        case FETCH_REVIEWS_FAIL:
            return {...state, loading: false, error: action.payload}
        
        default:
            return state
    }

}

export const singleReviewReducer = (state: ISingleReviewState = singleReviewState, action: any): ISingleReviewState => {

    switch(action.type) {
        
        default:
            return state
    }


}