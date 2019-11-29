import React from 'react';
import ReactDOM from 'react-dom';
import User from './User';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from 'react-dom/test-utils'
import App from "../App/App";
import Post from "../Post/Post";

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

it('renders without crashing', async () => {
    apolloClient.query.mockReturnValue(Promise.resolve({data: {users: []}}))
    await act(async () => {
        render(<User apolloClient={apolloClient}/>, container);
    })
});

it('renders users', async () => {
    const users = [{id: 1, name: 'username1'}, {id: 2, name: 'username2'},]
    apolloClient.query.mockReturnValue(Promise.resolve({data: {users}}))

    await act(async () => {
        render(<User apolloClient={apolloClient}/>, container);
    })

    expect(apolloClient.query).toBeCalled()
    expect(container.textContent).toEqual(expect.stringContaining('Users'));

    expect(container.querySelector('[data-testid="1"').textContent)
        .toEqual(expect.stringContaining('username1'));

    expect(container.querySelector("[data-testid='2'").textContent)
        .toEqual(expect.stringContaining('username2'));
});
