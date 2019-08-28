const faker = require('faker');
const Review = require('../models/Review');
const User = require('../models/User');
const Produce = require('../models/Produce')
const produces = require('./produce_seeds');

module.exports = seedReviews = async () => {
    const maxReview = 5;
    await Review.deleteMany({}, (err, response) => { console.log(`Deleted ${response.deletedCount} reviews`)});
    return new Promise(async (res, rej) => {
        for (let index = 0; index <= 100; index++) {

            const randomUser = await User.findOne().skip(Math.floor(Math.random() * 10));
            const randomProduce = await Produce.findOne().skip(Math.floor(Math.random() * 146));
            let publicOrOwner;
            if (randomProduce.public) {
                publicOrOwner = "public";
            } else {
                publicOrOwner = "ownerPermission";
            }
            const review = new Review({
                [publicOrOwner]: ((Math.random() * 10).toFixed() % maxReview) + 1,
                accessible: ((Math.random() * 10).toFixed() % maxReview) + 1,
                quality: ((Math.random() * 10).toFixed() % maxReview) + 1,
                abundance: ((Math.random() * 10).toFixed() % maxReview) + 1,
                user: randomUser.id,
                produce: randomProduce.id,
                comments: ""
            })
            const positiveComments = [`Very high quality ${randomProduce.name}.`, `Lovely ${randomProduce.name}`, `Remarkable quality for side-of-the-highway ${randomProduce.name}`, `Such great ${randomProduce.name}`, `A very nice walk up to the site. Almost gone though, get it while you can!`];
            const negativeComments = [`Absolutely terrible stuff. Really horrendous.`, `I wouldn't feed this to my dog.`, `Not edible in the slightest.`, `Don't waste your time. Horrible ${randomProduce.name}`];

            const avgReview = ((review.accessible + review[publicOrOwner] + review.abundance + review.quality)/4).toFixed();
            if (avgReview >= 3) {
                review.comments = positiveComments[((Math.random() * 10) % positiveComments.length).toFixed()]
            } else {
                review.comments = negativeComments[((Math.random() * 10) % negativeComments.length).toFixed()]
            }
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
      

    