import gql from 'graphql-tag';

export default {
    FETCH_ALL_PRODUCE: gql`
        query FetchAllProduce($north: Float, $south: Float, $west: Float, $east: Float, $name: String ) {
            produces(north: $north, south: $south, west: $west, east: $east, name: $name) {
                id,
                name,
                type,
                name,
                type,
                public,
                accessible,
                ownerPermission,
                description,
                imageUrl,
                quality,
                abundance,
                date,
                lat,
                lng,
                score,
                reviews {
                    comments,
                    id,
                    accessible
                }
            }
        }
    `,
    FETCH_SINGLE_PRODUCE: gql`
    query FetchProduce($id: ID) {
        produce(id: $id) {
            id,
            name,
            type,
            name,
            type,
            public,
            accessible,
            ownerPermission,
            quality,
            abundance,
            date,
            user {
                username
            },
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
    `
}