const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    produces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'produces' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
})

module.exports = User = mongoose.model('users', UserSchema);