import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import {act} from 'react-dom/test-utils'
import {render, unmountComponentAtNode} from "react-dom";

let container = null;
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
    const div = document.createElement('div');
    ReactDOM.render(<Post/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders posts', () => {
    act(() => {
        render(<Post/>, container)
    })

    expect(container.textContent).toBe('Cyberpunk 2077')
})
