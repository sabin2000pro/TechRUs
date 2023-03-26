require('dotenv').config();
import mongoose from 'mongoose';

interface IReviewDocument {
    product: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    title: string;
    createdAt: Date
}

const ReviewSchema = new mongoose.Schema<IReviewDocument>({

    product: { // The Product ID to create a review for
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide the product ID for this review"]
    },

    title: {
      type: String,
      required: [true, "Please give this rating a title"]
    },

    rating: { // Rating for the product
      type: Number,
      required: [true, "Please specify a valid rating for this review"]
    },

    comment: { // Comment for the review
      type: String,
      required: [true, "Please provide a valid comment for this review"]
    },

    createdAt: { // The date at which the review was created at
       type: Date,
       default: Date.now
    }
    
}, {timestamps: true});

const Review = mongoose.model("Review", ReviewSchema);
export {Review} // Export the review model