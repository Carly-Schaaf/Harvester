import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import App from './app';


const Root = ({ client }) => (
   <ApolloProvider client={ client } >
        <HashRouter>
            <App />
        </HashRouter>
    </ApolloProvider> 
)

export default Root;