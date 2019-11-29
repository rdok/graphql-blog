import React from 'react';
import './App.css';
import Post from '../Post/Post'
import User from '../User/User'

function App({apolloClient}) {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    GraphQL Client
                </p>
            </header>
            <Post apolloClient={apolloClient}/>
            <User apolloClient={apolloClient}/>
        </div>
    );
}

export default App;
