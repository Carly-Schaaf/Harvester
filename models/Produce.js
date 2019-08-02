const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review');

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

ProduceSchema.statics.avgTotalReviewScore = async function (produceId) {
    let idToSearch = mongoose.Types.ObjectId(produceId)
    const aggregate = await Review.aggregate([
       { $match: { produce: idToSearch }},
                { $group: {
                        _id: null,
                        avgAccessibility: {
                            $avg: "$accessible"
                        },
                        avgAbundance: {
                            $avg: "$abundance"
                        },
                        avgQuality: {
                            $avg: "$quality"
                        },
                        avgOwnerPermission: {
                            $avg: "$ownerPermission"
                        },
                    } }]);
        const obj = aggregate[0];
        if (obj === undefined) return 0;
        const { avgAccessibility,
            avgAbundance,
            avgQuality,
            avgOwnerPermission } = obj;
        return (avgAccessibility +
                avgAbundance +
                avgQuality +
                avgOwnerPermission) / 4;
}
        
ProduceSchema.statics.findByName = function (produce, name) {
   return produce.find({ name: { "$regex": name, "$options": "i" }})
        .then(produce => produce)
}

module.exports = mongoose.model('produce', ProduceSchema);