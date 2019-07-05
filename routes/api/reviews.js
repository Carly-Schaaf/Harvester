const express = require("express");
const router = express.Router();
const Review = require('../../models/Review');
const passport = require('passport');
const validateReviewInput = require('../../validation/reviews');

router.get('/', (req, res) => {
    Review.find()
        .sort({ date: -1 })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ msg: "No reviews found" }))
})

router.get('/user/:user_id', (req, res) => {
    Review.find({ user: req.params.user_id })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ msg: "That user has not rated anything" }))
})

router.get('/:id', (req, res) => {
    Review.findById(req.params.id)
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ msg: "That review doesn't exist" }))
})
router.get('/produce/:produce_id', (req, res) => {
    Review.findById({ produce: req.params.produce_id })
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json({ msg: "This plant hasn't been rated" }))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);
    if (!isValid) {
        return res.status(404).json(errors);
    }

    const newReview = new Review({
        user: req.user.id,
        produce: req.body.produce,
        "public?": req.body.public,
        accessible: req.body.accessible,
        ownerPermission: req.body.ownerPermission,
        accuracy: req.body.accuracy,
        abundance: req.body.abundance,
        comments: req.body.comments
    })

    newReview.save().then(review => res.json(review), err => res.status(404).json({msg: err}));
})

module.exports = router;
