import mongoose from 'mongoose';

export interface ICategoryDoc {
    name: string;
    description: string;
    slug: string;
    status: string
    createdAt: Date;
    updatedAt: Date;
}

export const CategoriesSchema = new mongoose.Schema({

    name: {
       type: String,
       required: [true, "Please provide the name of the category to create"]
    },

    description: {
        type: String,
        required: [true, "Please provide the name of the category to create"]
    },

    slug: {
        type: String
    },

    status: {
      type: String,
      default: 'inactive',
      enum: ['active', 'inactive']
    },

    createdAt: {
       type: Date,
       default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }


}, {timestamps: true})

const Category = mongoose.model("Category", CategoriesSchema);
export {Category}