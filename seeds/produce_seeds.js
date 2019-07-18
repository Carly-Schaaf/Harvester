const faker = require('faker');
const mongoose = require('mongoose');
const db = require("../config/keys.js").mongoURI;
const User = require('../models/User');
const Produce = require('../models/Produce');

const produces = [
    "Amaranth Leaves",
    "Arrowroot",
    "Artichoke",
    "Arugula",
    "Asparagus",
    "Bamboo Shoots",
    "Beans, Green",
    "Beets",
    "Belgian Endive",
    "Bitter Melon",
    "Bok Choy",
    "Broadbeans(Fava Beans)",
    "Broccoli",
    "Broccoli Rabe",
    "Brussel Sprouts",
    "Cabbage, Green",
    "Cabbage, Red",
    "Carrot",
    "Cassava(Yuca Root)",
    "Cauliflower",
    "Celeriac(Celery Root)",
    "Celery",
    "Chayote",
    "Chicory(Curly Endive)",
    "Collards",
    "Corn",
    "Crookneck",
    "Cucumber",
    "Daikon",
    "Dandelion Greens",
    "Edamame, Soybeans",
    "Eggplant",
    "Fennel",
    "Fiddleheads",
    "Ginger Root",
    "Horseradish",
    "Jicama",
    "Kale",
    "Kohlrabi",
    "Leeks",
    "Lettuce, Iceberg",
    "Lettuce, Leaf",
    "Lettuce, Romaine",
    "Mushrooms",
    "Mustard Greens",
    "Okra",
    "Onion(Red)",
    "Onions",
    "Parsnip",
    "Peas, Green",
    "Pepper, Green",
    "Red pepper",
    "Pepper, Sweet Red",
    "Potato, Red",
    "Potato, White",
    "Potato, Yellow",
    "Pumpkin",
    "Radicchio",
    "Radishes",
    "Rutabaga",
    "Salsify(Oysterplant)",
    "Shallots",
    "Snow Peas",
    "Sorrel(Dock)",
    "Spaghetti Squash",
    "Spinach",
    "Squash, Butternut",
    "Sugar Snap Peas",
    "Sweet Potato",
    "Swiss Chard",
    "Tomatillo",
    "Tomato",
    "Turnip",
    "Watercress",
    "Yam Root",
    "Zucchini",
    "Acerola, West Indian Cherry",
    "Pomme",
    "Apple",
    "Apricots",
    "Avocado",
    "Banana",
    "Blackberries",
    "Blackcurrant",
    "Blueberries",
    "Breadfruit",
    "Cantaloupe",
    "Carambola",
    "Cherimoya",
    "Cherries",
    "Clementine",
    "Coconut Meat",
    "Cranberries",
    "Custard - Apple",
    "Date Fruit",
    "Durian",
    "Elderberries",
    "Feijoa",
    "Figs",
    "Gooseberries",
    "Grapefruit",
    "Grapes",
    "Guava",
    "Honeydew Melon",
    "Jackfruit",
    "Java, Plum",
    "Jujube Fruit",
    "Kiwifruit",
    "Kumquat",
    "Lemon",
    "lime",
    "Lime",
    "Longan",
    "Loquat",
    "Lychee",
    "Mandarin",
    "Mango",
    "Mangosteen",
    "Mulberries",
    "Nectarine",
    "Olives",
    "Orange",
    "Papaya",
    "Passion Fruit",
    "Peaches",
    "Pear",
    "Persimmon, Japanese",
    "Pineapple",
    "Pitanga",
    "Plantain",
    "Plums",
    "Pomegranate",
    "Prickly Pear",
    "Prunes",
    "Pummelo",
    "Quince",
    "Raspberries",
    "Rhubarb",
    "Rose - Apple",
    "Sapodilla",
    "Sapote, Mamey",
    "Soursop",
    "Strawberries",
    "Sugar - Apple",
    "Tamarind",
    "Tangerine",
    "Watermelon"];

const seedProduces = () => {
    const nums = [1,2,3,4,5];
    Produce.deleteMany({}).then((res) => console.log(`Deleted ${res.deletedCount} produces.`));
    return new Promise((res, rej) => {
        let lat = 37.7576792;
        let lng = -122.5078118;
        for (let index = 0; index < produces.length; index++) {
            if (index <= (produces.length/2)) {
                lat -= .00005;
                lng -= .00005;
            } else if (index === produces.length / 2) {
                lat = 37.7576792;
                lng = -122.5078118;
            } else {
                lat += .00002;
                lng += .00002;
            }

            User.countDocuments().exec((err, count) => {

                // Get a random entry
                var random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                User.findOne().skip(random).exec((err, randomUser) => {
                    const newProduce = new Produce({
                        public: faker.random.boolean(),
                        accessible: nums[index % nums.length],
                        ownerPermission: nums[index % nums.length],
                        quality: nums[index % nums.length],
                        abundance: nums[index % nums.length],
                        name: produces[index],
                        user: randomUser._id,
                        type: "Produce",
                        loc: {
                            type: "Point",
                            coordinates: [lat, lng]
                        }
                    })
                    newProduce.save().then((produce) => {
                        randomUser.produces.push(produce._id);
                        randomUser.save()
                        .then(() => {
                            console.log(`Success ${index}: ${produce} was created`);
                            if (index === (produces.length - 1)) {
                                return res("All produce was created");
                            }
                        }, err => console.log(err))
                    }, (err) => {
                        console.log(`Produce_${index} was unable to save due to: ${err}`)
                    })
                        });
                 })
     
        }
    })
}
if (process.argv[1] === "/Users/carly/Desktop/mern/seeds/produce_seeds.js") {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(`${err}: Cannot connect to MongoDB`))
        .then(() => seedProduces())
        .then((res) => { console.log(`${res}, database connection is closing.`);
            mongoose.connection.close() })
}

module.exports = produces;