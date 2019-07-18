const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLID } = graphql;
const mongoose = require('mongoose');
const UserType = require('./user_type');
const ProduceType = require('./produce_type');
const ReviewType = require('./review_type');
const User = mongoose.model('user');
const Produce = mongoose.model('produce');
const Review = mongoose.model('review');

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        newUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { username, password}) {
                return new User({ username, password, loc: {type: "Point", coordinates: [99, 99]} }).save();
            }
        },
        newProduce: {
            type: ProduceType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                public: { type: GraphQLBoolean },
                accessible: { type: GraphQLInt },
                ownerPermission: { type: GraphQLInt },
                quality: { type: GraphQLInt },
                abundance: { type: GraphQLInt },
                date: { type: GraphQLString },
                user: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                return new Produce({ ...args, loc: {type: "Point", coordinates: [99, 99] }}).save();
            }
        },
        newReview: {
            type: ReviewType,
            args: {
                comments: { type: GraphQLString },
                produce: { type: GraphQLID },
                public: { type: GraphQLBoolean },
                accessible: { type: GraphQLInt },
                ownerPermission: { type: GraphQLInt },
                quality: { type: GraphQLInt },
                abundance: { type: GraphQLInt },
                date: { type: GraphQLString },
                user: { type: GraphQLID }
            },
            resolve(parentValue, args) {
                return new Review({ ...args }).save();
            }
        }
    }
})

module.exports = mutations;