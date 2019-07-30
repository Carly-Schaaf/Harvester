const faker = require('faker');
const Review = require('../models/Review');
const User = require('../models/User');
const Produce = require('../models/Produce')
const produces = require('./produce_seeds');

module.exports = seedReviews = async () => {
    const nums = [1, 2, 3, 4, 5];
    await Review.deleteMany({}, (err, response) => { console.log(`Deleted ${response.deletedCount} reviews`)});
    return new Promise(async (res, rej) => {
        for (let index = 0; index <= 100; index++) {
            let randomUserId;
            let randomProduceId;
            await User.aggregate(
                [{ $sample: { size: 1 } }])
            .then(userArr => {
                    randomUserId = userArr[0][`_id`]})
            .then(() => Produce.aggregate([{ $sample: { size: 1 } }]))
            .then(produceArr => {
                randomProduceId = produceArr[0][`_id`]})
            .then(() => {
                return new Review({
                    public: faker.random.boolean(),
                    accessible: nums[index % nums.length],
                    ownerPermission: nums[index % nums.length],
                    quality: nums[index % nums.length],
                    abundance: nums[index % nums.length],
                    user: randomUserId,
                    produce: randomProduceId,
                    comments: faker.lorem.sentence()
                })
            })
            .then(review => {
                    review.save()
                    .then(review => {
                            console.log(`Success review ${index} was saved`)
                            Review.count()
                            .then(count => {
                                if (count > 100) {
                                        return res(`Reviews are finished at ${index}`);
                                    }
                                })
                            }, err => rej(err))
                })
                        
                }})
        }
      

    