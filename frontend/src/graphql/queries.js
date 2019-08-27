import gql from 'graphql-tag';

export default {
    FETCH_ALL_PRODUCE: gql`
        query FetchAllProduce($north: Float, $south: Float, $west: Float, $east: Float, $name: String) {
            produces(north: $north, south: $south, west: $west, east: $east, name: $name) {
                id,
                name,
                type,
                public,
                accessible,
                ownerPermission,
                description,
                thumbnail,
                quality,
                abundance,
                date,
                lat,
                lng,
                score,
                reviews {
                    comments,
                    id,
                    user {
                        username
                    }
                }
            }
        }
    `,
    FETCH_SINGLE_PRODUCE: gql`
    query FetchProduce($id: ID!) {
        produce(id: $id) {
            id,
            name,
            public,
            accessible,
            ownerPermission,
            quality,
            abundance,
            reviews {
                comments,
                user {
                    username
                }
            }
        }
    }
    `, 
    FETCH_USER: gql`
    query FetchUser($id: ID) {
        user(id: $id) {
            id,
            username,
            reviews {
                produce {
                    name
                }
            },
            produces {
                name
            }
        }
    }
    `,
    FETCH_REVIEWS: gql`
    query FetchReviews($produceId: ID!) {
        reviews(produceId: $produceId) {
            id,
            user {
                username
            },
            comments
        }
    }
    `
}