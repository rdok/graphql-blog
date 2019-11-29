import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from '../src/serviceWorker';
import ApolloClient from 'apollo-boost'

const uri = process.env.REACT_APP_RAPHQL_BLOG_API_URL + "/graphql"
const apolloClient = new ApolloClient({uri})

ReactDOM.render(<App apolloClient={apolloClient} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
