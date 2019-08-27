const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat} = graphql;
const mongoose = require('mongoose');
const UserType = require('./user_type');
const ProduceType = require('./produce_type');
const ReviewType = require('./review_type');
const User = mongoose.model('user');
const Produce = mongoose.model('produce');
const Review = mongoose.model('reviews');

const mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        newUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat }
            },
            resolve(parentValue, { username, password}) {
                return new User({ username, password }).save();
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return User.findByIdAndDelete(id);
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                produces: { type: new GraphQLList(GraphQLID)},
                reviews: { type: new GraphQLList(GraphQLID)},
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat }
            },
            resolve(parentValue, args) {
                const updateObj = {};
                Object.keys(args).forEach((field) => {if (field) updateObj[field] = args[field]});
                return User.findOneAndUpdate(
                    { _id: args.id }, 
                    { $set: {...updateObj }},
                    {new: true}, (err, user) => { return user });
            },
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
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat }
            },
            resolve(parentValue, args) {
                return User.findOne({}).then(user => {
                    return new Produce({ ...args, user: user.id }).save();
                })
            }
        },
        deleteProduce: {
            type: ProduceType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Produce.findByIdAndDelete(id);
            }
        },
        updateProduce: {
            type: ProduceType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                public: { type: GraphQLBoolean },
                accessible: { type: GraphQLInt },
                ownerPermission: { type: GraphQLInt },
                quality: { type: GraphQLInt },
                abundance: { type: GraphQLInt },
                date: { type: GraphQLString },
                user: { type: GraphQLID },
                lat: { type: GraphQLFloat },
                lng: { type: GraphQLFloat },
                reviews: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parentValue, args) {
                const updateObj = {};
                Object.keys(args).forEach((field) => { if (field) updateObj[field] = args[field] });
                return Produce.findOneAndUpdate(
                    { _id: args.id },
                    { $set: { ...updateObj } },
                    { new: true }, (err, user) => { return user });
            },
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
        },
        deleteReview: {
            type: ReviewType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Review.findByIdAndDelete(id);
            }
        },
        updateReview: {
            type: ReviewType,
            args: {
                id: { type: GraphQLID },
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
                const updateObj = {};
                Object.keys(args).forEach((field) => { if (field) updateObj[field] = args[field] });
                return Review.findOneAndUpdate(
                    { _id: args.id },
                    { $set: updateObj },
                    { new: true }, (err, user) => { return user });
            },
        }
    }
})

module.exports = mutations;