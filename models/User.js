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
    produces: [{ type: Schema.Types.ObjectId, ref: 'produce' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
})

module.exports = mongoose.model('user', UserSchema);