const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const jwtDecode = require('jwt-decode');

router.get('/current', (req, res) => {
    const user = jwtDecode(req.headers.authorization)
    res.json({id: user.id,
              username: user.username           
    });
})

router.get("/", (req, res) => {
    User.find({}, (error, users) => {res.send(users)})
    }
)
router.get("/test", (req, res) => res.json({ msg: "this is the users route" }))
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
 

    User.findOne({ username: req.body.username })
        .then( user => {
            if (user) {
                return res.status(400).json({username: "A user has already registered with this username."})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    loc: req.body.loc
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => 
                        {
                            const payload = { id: user.id, name: user.username };
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                                }
                            )})
                        .catch(err => console.log(err))
                    })
                    
                })                
            }

        })
})
router.post('/login', (req, res) => {
    const { isValid, errors } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username})
        .then((user) => {
            if (!user) {
                return res.status(400).json({username: "That username doesn't exist."});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {id: user.id, name: user.username};
                        
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        ).catch(err => console.log(err));
                    } else {
                        return res.status(400).json({password: "Incorrect password."})
                    }
                })
        })
})





module.exports = router;
