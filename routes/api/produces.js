const express = require("express");
const router = express.Router();
const Produce = require('../../models/Produce');
const passport = require('passport');

const validateProduceInput = require('../../validation/produces');

router.get('/', (req, res) => {
    const { north, east, south, west } = req.query;
    debugger
    Produce.find({loc: {
        $geoIntersects: {
            $geometry: {
                type: "Polygon",
                coordinates: [
                    north, east, south, west
                ]
            }
        }
    }})
    .then(produces => res.json(produces))
    .catch(err => res.status(404).json({msg: "No plants found"}))
    
        // Produce.find({  < east && lng < north && lat > west && lng > south })
        //     .sort({ date: -1 })
})

router.get('/user/:user_id', (req, res) => {
    Produce.find({user: req.params.user_id})
        .then(produces => res.json(produces))
        .catch(err => res.status(404).json({msg: "That user has no plants"}))
})

router.get('/:id', (req, res) => {
    Produce.findById(req.params.id)
        .then(produce => res.json(produce))
        .catch(err => res.status(404).json({msg: "That plant doesn't exist"}))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {errors, isValid} = validateProduceInput(req.body);
    if (!isValid) {
        return res.status(404).json(errors);
    }
    const newProduce = new Produce({
        "public?": req.body.public,
        accessible: req.body.accessible,
        ownerPermission: req.body.ownerPermission,
        quality: req.body.quality,
        abundance: req.body.abundance,
        name: req.body.name,
        user: req.user.id,
        type: req.body.type,
        loc: {
            type: req.body.loc.type, 
            coordinates: req.body.loc.coordinates
        }
    })

    newProduce.save().then(produce => res.json(produce), err => res.status(404).json({msg: err}));
})

module.exports = router;
