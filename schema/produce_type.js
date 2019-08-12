const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Produce = mongoose.model('produce')
const Review = mongoose.model('reviews');
const axios = require('axios');

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
        description: {
            type: GraphQLString,
            resolve(parentValue) {
                return axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&titles=${parentValue.name}&redirects=1`)
                    .then(res => {
                        return Object.values(res.data.query.pages)[0].extract})
            }
        },
        thumbnail: {
            type: GraphQLString,
            resolve(parentValue) {
                return axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=pageimages&pithumbsize=300&titles=${parentValue.name}&redirects=1`)
                // return axios.get('https://serpapi.com/playground?q=Apple&tbm=isch&ijn=0')
                    .then(res => {
                        try {
                            return Object.values(res.data.query.pages)[0].thumbnail.source;
                        } catch (err) {
                            return null;
                        }
            })
        }},
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