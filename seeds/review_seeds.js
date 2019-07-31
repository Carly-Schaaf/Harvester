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

            const randomUser = await User.findOne().skip(Math.floor(Math.random() * 10));
            const randomProduce = await Produce.findOne().skip(Math.floor(Math.random() * 146));
            
            const review = new Review({
                    public: faker.random.boolean(),
                    accessible: nums[index % nums.length],
                    ownerPermission: nums[index % nums.length],
                    quality: nums[index % nums.length],
                    abundance: nums[index % nums.length],
                    user: randomUser.id,
                    produce: randomProduce.id,
                    comments: faker.lorem.sentence()
                })
            await review.save()
                    .then(async review => {
                            console.log(`Success review ${index} was saved`)
                            await randomUser.reviews.push(review.id);
                            await randomUser.save()
                                .then((user) => console.log(`Success: User ${randomUser.username} was re-saved with this review`),
                                    (err) => console.log(`${randomUser.username} was unable to re-save due to: ${err}`))    
                            randomProduce.reviews.push(review.id)
                            await randomProduce.save()
                                .then((user) => console.log(`Success: Produce ${randomProduce.id} was re-saved with this review`),
                                    (err) => console.log(`${randomProduce.id} was unable to re-save due to: ${err}`))  
                            Review.count()
                            .then(count => {
                                if (count > 100) {
                                        return res(`Reviews are finished at ${index}`);
                                    }
                                })
                            }, err => rej(err))
                        
                }})
        }
      

    