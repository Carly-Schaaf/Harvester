import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import "./styles/output.css";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";

const link = new HttpLink({
    // uri: 'http://localhost:5000/graphql',
    // Additional fetch options like `credentials` or `headers`
    credentials: 'same-origin',
});

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
})
const errorLink = onError(({ graphQLErrors }) => {
        if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
    // comment in for local development
    link: ApolloLink.from([errorLink, link]),
    cache: cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log('GraphQlErrors', graphQLErrors);
        console.log('networkError', networkError)
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');
    ReactDOM.render(<Root client={ client } />, root);
});