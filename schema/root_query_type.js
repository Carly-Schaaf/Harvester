const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLFloat, GraphQLString } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const UserType = require('./user_type');
const Produce = mongoose.model('produce');
const ProduceType = require('./produce_type');
const Review = mongoose.model('reviews');
const ReviewType = require('./review_type');

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return User.find({})
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, { id }) {
                return User.findById(id)
            }
        },
        produces: {
            type: new GraphQLList(ProduceType),
            args: { south: { type: GraphQLFloat },
                    west: { type: GraphQLFloat },
                    east: { type: GraphQLFloat },
                    north: { type: GraphQLFloat },
                    name: { type: GraphQLString }
                },
            async resolve(parentValue, {south, west, east, north, name}) {
                return Produce.findWithFilters({ bounds: { south, west, east, north }, name });
            }
        },
        produce: {
            type: ProduceType,
            args: { id: { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, { id }) {
                return Produce.findById(id);
            }
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            args: { produceId: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { produceId }) {
                return Review.find({produce: produceId});
            }
        },
        review: {
            type: ReviewType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Review.findById(id);
            }
        },
    }
})

module.exports = RootQuery;