const faker = require('faker');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// I wrote this function in order to seed fake users for use in my Harvester application
// I used MongoDB as my database and the Mongoose ORM library for this application.
// 
// Since Mongoose interacts with the database asynchronously, I needed my 
module.exports = seedUsers = async () => {

   await User.deleteMany({}, (__, res) => { console.log(`Deleted ${res.deletedCount} users`) });

    const numUsersToMake = 10;
    return new Promise(async (res, rej) => {
        for (let index = 0; index <= numUsersToMake; index++) {
            const newUser = await new User({
                username: faker.name.findName(),
                password: "password",
                lat: 37.8715,
                lng: -122.2730
            });

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(newUser.password, salt)
            newUser.password = hash;

            await newUser.save()
                .then((user) => console.log(`Success: user ${user.username} was created`),
                    (err) => console.log(`User_${index} was unable to save due to: ${err}`))

            const numUsersCreated = await User.count();

            // if the loop has finished and all users have been created, resolve the promise
            // if the loop has finished and not all users have been created, reject the promise
            if (!(numUsersCreated < numUsersToMake) && (index === numUsersToMake)) {
                return res("All users successfully created");
            } else if (index === numUsersToMake) {
                return rej("All users were not successfully created");
            }
        }
    })
}
