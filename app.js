const mongoose = require('mongoose');
const express = require("express");
const users = require("./routes/api/users");
const produces = require("./routes/api/produces");
const reviews = require("./routes/api/reviews");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();
const db = require("./config/keys.js").mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(`${err}: Cannot connect to MongoDB`));

app.use(express.static('frontend/build'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users", users);
app.use("/api/produces", produces);
app.use("/api/reviews", reviews);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));



