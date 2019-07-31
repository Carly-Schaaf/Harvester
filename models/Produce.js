const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
    quality: {
        type: Number
    },
    abundance: {
        type: Number,
        required: true
    },
    lat: { 
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
});

ProduceSchema.statics.findWithFilters = function (args) {
        const boundProduce = this.findWithinBounds(args.bounds);
        if (args.name !== "") {
            return this.findByName(boundProduce, args.name)
        } else {
            return boundProduce.then(produce => produce);
        }
}

ProduceSchema.statics.findWithinBounds = function (bounds) {
   return this.find({ 
       lat: {$gt: bounds.south, $lt: bounds.north}, 
       lng: { $gt: bounds.west, $lt: bounds.east }
   })
}

ProduceSchema.statics.findByName = function (produce, name) {
   return produce.find({ name: { "$regex": name, "$options": "i" }})
        .then(produce => produce)
}

module.exports = mongoose.model('produce', ProduceSchema);