const faker = require('faker');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = seedUsers = async () => {
   await User.deleteMany({}, (err, res) => { console.log(`Deleted ${res.deletedCount} users`) });
        let lat = 37.7576792;
        let lng = -122.5078118;
        return new Promise(async (res, rej) => {
            for (let index = 0; index < 10; index++) {
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
                const numUsers = await User.count();
                if (index >= 9 && numUsers >= 10) {
                    return res("All users successfully created");
                } else if (index >= 9) {
                    return rej("All users were not successfully created");
                }
            }
        })
    }
