import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { NEW_REVIEW } = Mutations;

class ReviewCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: "",
            produce: props.match.params.produceId,
            public: "",
            accessible: "",
            ownerPermission: "",
            quality: "",
            abundance: "",
        }
    }

    render() {

    }
}