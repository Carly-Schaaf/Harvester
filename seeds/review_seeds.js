const faker = require('faker');
const mongoose = require('mongoose');
const db = require("../config/keys.js").mongoURI;
const Review = require('../models/Review');
const User = require('../models/User');
const Produce = require('../models/Produce')
const produces = require('./produce_seeds');

const seedReviews = () => {
    const nums = [1, 2, 3, 4, 5];
    Review.deleteMany({}, (err, res) => { console.log(`Deleted ${res.deletedCount} reviews`)});
    return new Promise((res, rej) => {
        for (let index = 0; index < produces.length; index++) {
            let randomUser;
            let random;
            User.countDocuments()
            .then((count) => {
                // Get a random entry
                random = Math.floor(Math.random() * count)
                // Again query all users but only fetch one offset by our random #
                return User.findOne()
                    .skip(random)
                    .then((user) => {
                        randomUser = user;
                        return randomUser;
                    })
                
            })
            .then(randomUser => {
                return Produce.countDocuments()
                .then((count) => {
                    random = Math.floor(Math.random() * count)
                    return Produce.findOne({ user: { $ne: randomUser.id } })
                    .skip(random)
                    .then(produce => {
                        if (!produce) {return null;}
                        return new Review({
                        public: faker.random.boolean(),
                        accessible: nums[index % nums.length],
                        ownerPermission: nums[index % nums.length],
                        quality: nums[index % nums.length],
                        abundance: nums[index % nums.length],
                        user: randomUser.id,
                        produce: produce.id,
                        comments: faker.lorem.sentence()
                        }).save();
                        
                    }, (err) => console.log(err))
                    .then(review => {
                        if (!review) {return null;}
                        Produce.findById(review.produce)
                        .then(produce => {
                            produce.reviews.push(review.id);
                            return produce.save()
                        })
                        .then(() => {
                            randomUser.reviews.push(review.id);
                            return randomUser.save();
                        })
                        .then(() => {
                            console.log(`Success ${index}: ${review} was created`);
                            if (index === (produces.length - 1)) {
                                return res("All reviews were created");}}, (err) => {
                            console.log(`Review_${index} was unable to save due to: ${err}`)
                        })
                    }, (err) => console.log(err))
                }, (err) => console.log(err))
            });
        }
    })


}

if (process.argv[1] === "/Users/carly/Desktop/mern/seeds/review_seeds.js") {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(`${err}: Cannot connect to MongoDB`))
        .then(() => seedReviews())
        .then((res) => {
            console.log(`${res}, database connection is closing.`);
            mongoose.connection.close()
        })
}