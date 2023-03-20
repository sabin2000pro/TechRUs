require('dotenv').config();
import mongoose from 'mongoose';

interface ReviewDocument {
    product: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date
}

const ReviewSchema = new mongoose.Schema<ReviewDocument>({

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide the product ID for this review"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the user that this review belongs to"]
    },

    rating: {
      type: Number,
      required: [true, "Please specify a valid rating for this review"]
    },

    comment: {
      type: String,
      required: [true, "Please provide a valid comment for this review"]
    },

    createdAt: {
       type: Date,
       default: Date.now
    }
    
}, {timestamps: true});

const Review = mongoose.model("Review", ReviewSchema);
export {Review}