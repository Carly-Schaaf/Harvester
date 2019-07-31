import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
const { FETCH_ALL_PRODUCE } = Queries;
const { DELETE_PRODUCE } = Mutations;

const DeleteProduce = props => {
    return (
        <Mutation mutation={DELETE_PRODUCE} refetchQueries={() => [{query: FETCH_ALL_PRODUCE}]}>
            {(deleteProduce, { data }) => (
                <button onClick={e => {
                    e.preventDefault();
                    deleteProduce({variables: { id: props.id }})
                }}
                >Delete</button>
            )}
        </Mutation>
    )
}

export default DeleteProduce;