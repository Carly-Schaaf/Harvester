const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const mongoose = require('mongoose');
const Produce = mongoose.model('produce');

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type:GraphQLString},
        date: {type: GraphQLString},
        produces: {
            type: new GraphQLList(require('./produce_type')),
            resolve(parentValue) {
                return Produce.find({user: parentValue.id})
                    .then(produces => produces)
            }
        },
        reviews: {
            type: new GraphQLList(require('./review_type')),
            resolve(parentValue) {
                return Review.find({ user: parentValue.id })
                    .then(reviews => reviews)
                    .catch(err => null);
            }
        }
    })
})

module.exports = UserType;