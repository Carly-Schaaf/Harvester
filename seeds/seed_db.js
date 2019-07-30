const mongoose = require('mongoose');
const db = require('../config/keys.js').mongoURI;
const seedUsers = require('./user_seeds');
const seedProduces = require('./produce_seeds');
const seedReviews = require('./review_seeds');

async function seedEverything() {
    await seedUsers().then(
        () => console.log("Successfully seeded users"),
        err => console.log(`Could not seed users because ${err}`))

    await seedProduces().then(
        () => console.log("Successfully seeded produce"),
        err => console.log(`Could not seed produce because ${err}`))

    await seedReviews().then(
        () => console.log("Successfully seeded reviews"),
        err => console.log(`Could not seed reviews because ${err}`))

    console.log(`Database connection is closing.`);
    mongoose.connection.close();
}


mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(`${err}: Cannot connect to MongoDB`))
    .then(seedEverything)