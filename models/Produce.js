const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./Review');
const axios = require('axios');

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

ProduceSchema.statics.findWithFilters = async function (args) {
    // for non-random data, use below code:
    // if (args.name !== "") {
    //         let boundProduce = this.findWithinBounds(args.bounds);
    //         return this.findByName(boundProduce, args.name)
    //     } else {
    //         let boundProduce = await this.findWithinBounds(args.bounds);
    //         return boundProduce;
    //     }
    const randRange = getRandomInRange(10, 15, 0)
    const randOffset = getRandomInRange(1, 147, 0)
    let produce = this.find({}).skip(randOffset)
    if (args.name !== "") {
        produce = await this.findByName(produce, args.name).limit(randRange);
    } else {
        produce = await produce.limit(randRange);
    }
    return this.generateRandomCoords(args.bounds, produce);
}

function getRandomInRange(from, to, fixed = 13) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

ProduceSchema.statics.generateRandomCoords = async function (bounds, produce) {
    return produce.map(produce => {
        produce.lat = getRandomInRange(bounds.south, bounds.north);
        produce.lng = getRandomInRange(bounds.west, bounds.east);
        // check if in water -- need to upgrade to paid plan
        // return axios.get(`https://api.onwater.io/api/v1/results/${produce.lat},${produce.lng}?access_token=zkEro3t2A7KgexdCBuXP`)
        // .then(res => {
        //     return res.water
        // })
        return produce;
    })
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
}

module.exports = mongoose.model('produce', ProduceSchema);