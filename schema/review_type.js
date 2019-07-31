const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Produce = mongoose.model('produce');

const ReviewType = new GraphQLObjectType({
    name: 'ReviewType',
    fields: () => ({
        id: { type: GraphQLID },
        comments: { type: GraphQLString },
        public: { type: GraphQLBoolean },
        accessible: { type: GraphQLInt },
        ownerPermission: { type: GraphQLInt },
        quality: { type: GraphQLInt },
        abundance: { type: GraphQLInt },
        date: { type: GraphQLString },
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return Review.findById(parentValue.id)
                    .populate('user')
                    .then(review => review.user);
            }
        },
        produce: {
            type: require('./produce_type'),
            resolve(parentValue) {
                return Review.findById(parentValue.id)
                    .populate('produce')
                    .then(review => review.produce);
            }
        }
    })
})

module.exports = ReviewType;