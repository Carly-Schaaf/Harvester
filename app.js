const express = require("express");

// API KEY
const google = require("./config/keys.js").google;

// SETUP APP AND DB
const mongoose = require('mongoose');
const app = express();
const db = require("./config/keys.js").mongoURI;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(`${err}: Cannot connect to MongoDB`));
const User = require('./models/User');
const Produce = require('./models/Produce');
const Review = require('./models/Review');

// MIDDLEWARE
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');
const cors = require('cors');
app.use(cors());

// SETUP GRAPHQL
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
app.use("/graphql", expressGraphQL(req => {
    return ({
        schema,
        context: {
            token: req.headers.authorization
        },
        graphiql: true
    })
}))

// ROUTES
const users = require("./routes/api/users");
const produces = require("./routes/api/produces");
const reviews = require("./routes/api/reviews");

// if (process.env.NODE_ENV === 'production') {
//     app.get('/', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     })
//     app.use(express.static('frontend/build'))
// }

app.use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(passport.initialize())
    .use("/api/users", users)
    .use("/api/produces", produces)
    .use("/api/reviews", reviews);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));



