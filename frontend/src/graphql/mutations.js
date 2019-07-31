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
                    lat,
                    lng
                }
        }
    `,
    NEW_REVIEW: gql`
        mutation NewReview(
            $public: Boolean, 
            $accessible: Int, 
            $ownerPermission: Int, 
            $quality: Int, 
            $abundance: Int,
            $user: ID,
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
                    id,
                    comments
                }
        }
    `
}