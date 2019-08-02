const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Produce = mongoose.model('produce')
const Review = mongoose.model('reviews');

const ProduceType = new GraphQLObjectType({
    name: 'ProduceType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        public: { type: GraphQLBoolean },
        accessible: { type: GraphQLInt},
        ownerPermission: { type: GraphQLInt },
        quality: { type: GraphQLInt },
        abundance: { type: GraphQLInt },
        date: {type: GraphQLString},
        lat: { type: GraphQLFloat},
        lng: { type: GraphQLFloat},
        score: { type: GraphQLFloat,
                async resolve(parentValue) {
                    return Produce.avgTotalReviewScore(parentValue.id);
                 }

        },
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return Produce.findById(parentValue.id)
                    .populate('user')
                    .then(produce => produce.user)
            }
        },
        reviews: {
            type: new GraphQLList(require('./review_type')),
            resolve(parentValue) {
                return Produce.findById(parentValue.id)
                    .populate('reviews')
                    .then(produce => produce.reviews)
            }
        }
    })
})

module.exports = ProduceType;