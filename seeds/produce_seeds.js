const faker = require('faker');
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

module.exports = seedProduces = async () => {
    const nums = [1,2,3,4,5];
    Produce.deleteMany({}).then((res) => console.log(`Deleted ${res.deletedCount} produces.`));
    return new Promise(async (res, rej) => {
        let lat = 37.8715;
        let lng = -122.27275;
        for (let index = 0; index < produces.length; index++) {
            if (index <= (produces.length/2)) {
                lat -= .005;
                lng -= .005;
            } else if (index === produces.length / 2) {
                lat = 37.8715;
                lng = -122.27275;
            } else {
                lat += .002;
                lng += .002;
            }
           
            var random = Math.floor(Math.random() * 10)
            const randomUser = await User.findOne().skip(random)

            const newProduce = await new Produce({
                        public: faker.random.boolean(),
                        accessible: nums[index % nums.length],
                        ownerPermission: nums[index % nums.length],
                        quality: nums[index % nums.length],
                        abundance: nums[index % nums.length],
                        name: produces[index],
                        user: randomUser._id,
                        type: "Produce",
                        lat: lat,
                        lng: lng
                    });

            await newProduce.save()
                    .then((produce) => console.log(`Success: produce ${index} was created`),
                    (err) => console.log(`Produce_${index} was unable to save due to: ${err}`))
            await randomUser.produces.push(newProduce._id);
            await randomUser.save()
                    .then((user) => console.log(`Success: User ${user.username} was re-saved with more produce`),
                    (err) => console.log(`User_${index} was unable to re-save due to: ${err}`))    
            const numProduce = await Produce.count();
            if (index >= (produces.length - 1) && numProduce >= (produces.length - 1)) {
                return res("All produce successfully created");
            } else if (index >= (produces.length - 1)) {
                return rej(`All produce was not successfully created, only created ${numProduce} produce`);
            }
            }
        }
    )}