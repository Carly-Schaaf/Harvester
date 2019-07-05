const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    "public?": {
        type: Boolean
    },
    accessible: {
        type: Number,
        required: true
    },
    ownerPermission: {
        type: Number
    },
    quality: {
        type: Number
    },
    abundance: {
        type: Number,
        required: true
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
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('produces', ProduceSchema);