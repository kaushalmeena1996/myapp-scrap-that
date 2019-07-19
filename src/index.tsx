import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import App from './containers/App/App';
import './index.css';
import operationReducer from './reducers/operation';
import resultReducer from './reducers/result';
import * as serviceWorker from './serviceWorker';


const rootReducer = combineReducers({
    operations: operationReducer,
    results: resultReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
