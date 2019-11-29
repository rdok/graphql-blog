import React from 'react';
import ReactDOM from 'react-dom';
import User from './User';
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
    ReactDOM.render(<User/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
