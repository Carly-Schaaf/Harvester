const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    produce: {
        type: Schema.Types.ObjectId,
        ref: 'produce',
        required: true
    },
    public: {
        type: Number
    },
    accessible: {
        type: Number
    },
    ownerPermission: {
        type: Number
    },
    abundance: {
        type: Number
    },
    comments: {
        type: String
    },
    quality: {
        type: Number
    }
})

module.exports = Review = mongoose.model('reviews', ReviewSchema);