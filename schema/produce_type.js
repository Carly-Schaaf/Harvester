const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');

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
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return User.findById(parentValue.user)
                    .then(user => user)
                    .catch(err => null);
            }
        },
        reviews: {
            type: new GraphQLList(require('./review_type')),
            resolve(parentValue) {
                return Review.find({produce: parentValue.id})
                    .then(reviews => reviews)
                    .catch(err => null);
            }
        }
    })
})

module.exports = ProduceType;