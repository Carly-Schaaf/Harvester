const faker = require('faker');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require("../config/keys.js").mongoURI;
if (process.argv[1] === "/Users/carly/Desktop/mern/seeds/user_seeds.js") {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(`${err}: Cannot connect to MongoDB`));
}
const User = require('../models/User');

const seedUsers = () => {
    User.deleteMany({}, (err) => {console.log(err)});
    return new Promise((res, rej) => {
        let lat = 37.7576792;
        let lng = -122.5078118;
        for (let index = 0; index < 10; index++) {
            console.log(`Creating user_${index}`);
            if (index <= 5) {
                lat -= .001;
                lng -= .001;
            } else if (index === 6) {
                lat = 37.7576792;
                lng = -122.5078118;
            } else {
                lat += .001;
                lng += .001;
            }
            const newUser = new User({
                username: faker.name.findName(),
                password: "password",
                loc: {
                    type: "Point",
                    coordinates: [lat, lng]
                }
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => {
                        console.log(`Success: ${user} was created`);
                        if (index === 9) {
                            return res("All users were created");
                        }
                    }, err => {console.log(`User_${index} was unable to save due to: ${err}`)})
                })
            })
        }
    })
    
    
}


seedUsers().then((res) => { mongoose.connection.close()});
