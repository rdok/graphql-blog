import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import {act} from 'react-dom/test-utils'
import {render, unmountComponentAtNode} from "react-dom";

let container = null;
let apolloClient = {query: jest.fn()}
const div = document.createElement('div');

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders without crashing', () => {
    apolloClient.query.mockReturnValue(Promise.resolve([]))

    act(() => {
        render(<Post apolloClient={apolloClient}/>, container);
    })

    expect(apolloClient.query).toBeCalled()
});

// it('renders posts', async () => {
//     const posts = [
//         {id: 1, title: 'title1', author: {name: 'author.name1'}},
//         {id: 2, title: 'title2', author: {name: 'author.name2'}},
//     ]
//     apolloClient.query.mockImplementation(() => Promise.resolve({
//         data: {posts}
//     }))
//
//     await act(() => {
//         render(<Post apolloClient={apolloClient}/>, container);
//     })
//
//     expect(apolloClient.query).toBeCalled()
//     expect(container.textContent).toEqual(expect.stringContaining('Posts'));
//
//     expect(container.querySelector('[data-testid="1"').textContent)
//         .toEqual(expect.stringContaining('title1, by author.name1'));
//
//     expect(container.querySelector("[data-testid='2'").textContent)
//         .toEqual(expect.stringContaining('title2, by author.name2'));
// });
