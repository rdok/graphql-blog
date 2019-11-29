import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import App from './App';
import {act} from "react-dom/test-utils";

let container;
let apolloClient;

beforeEach(() => {
    apolloClient = {query: jest.fn()}
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('App', () => {
    it('renders without crashing', async () => {
        apolloClient.query.mockReturnValue(Promise.resolve({data: {users: []}}))
        await act(async () => {
            render(<App apolloClient={apolloClient}/>, container);
        })
    })
})
