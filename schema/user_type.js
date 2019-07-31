const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type:GraphQLString},
        date: {type: GraphQLString},
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
        produces: {
            type: new GraphQLList(require('./produce_type')),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate('produces')
                    .then(user => user.produces);
            }
        },
        reviews: {
            type: new GraphQLList(require('./review_type')),
            resolve(parentValue) {
                return User.findById(parentValue.id)
                    .populate('reviews')
                    .then(user => user.reviews);
            }
        }
    })
})

module.exports = UserType;