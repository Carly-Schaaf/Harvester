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
        type: Boolean
    },
    accessible: {
        type: Number,
        required: true
    },
    ownerPermission: {
        type: Number
    },
    abundance: {
        type: Number,
        required: true
    },
    comments: {
        type: String
    },
    quality: {
        type: Number
    }
})

module.exports = Review = mongoose.model('review', ReviewSchema);