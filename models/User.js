const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    lat: { type: Number },
    lng: { type: Number },
    produces: [{ type: Schema.Types.ObjectId, ref: 'produce' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews' }],
})

// UserSchema.statics.addAssociation = function(userId, relativeId, type) {
//     const user = this.findById(userId);
//     switch (type) {
//         case "review":

//             user.reviews.push(relativeId);
//             break;
        
//     }

//     return user.save();
            
// }

module.exports = mongoose.model('user', UserSchema);