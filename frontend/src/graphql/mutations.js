import gql from 'graphql-tag';

export default {
    DELETE_PRODUCE: gql`
        mutation DeleteProduce($id: ID) {
            deleteProduce(id: $id) {
                id
            }
        }
    `,
    NEW_PRODUCE: gql`
        mutation NewProduce(
            $name: String, 
            $type: String, 
            $public: Boolean, 
            $accessible: Int, 
            $ownerPermission: Int, 
            $quality: Int, 
            $abundance: Int,
            $lat: Float,
            $lng: Float) {
                newProduce(
                    name: $name, 
                    type: $type, 
                    public: $public, 
                    accessible: $accessible,
                    ownerPermission: $ownerPermission,
                    quality: $quality,
                    abundance: $abundance,
                    lat: $lat,
                    lng: $lng
                ) {
                id,
                name,
                type,
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
                    accessible
                }
            }
        }
    `,
    NEW_REVIEW: gql`
        mutation NewReview(
            $public: Int, 
            $accessible: Int, 
            $ownerPermission: Int, 
            $quality: Int, 
            $abundance: Int,
            $user: String,
            $produce: ID,
            $comments: String) {
                newReview(
                    public: $public, 
                    accessible: $accessible,
                    ownerPermission: $ownerPermission,
                    quality: $quality,
                    abundance: $abundance,
                    user: $user,
                    produce: $produce,
                    comments: $comments
                ) {
                    comments,
                    id,
                    user {
                        username
                    }
                }
                    
        }
    `
}