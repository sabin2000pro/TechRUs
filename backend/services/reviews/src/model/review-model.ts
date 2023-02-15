const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    
}, {timestamps: true});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;