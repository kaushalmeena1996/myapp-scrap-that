import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Page from "./components/Page";
import "./index.css";
import builder from "./reducers/builder";
import output from "./reducers/output";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  builder: builder,
  output: output
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Page />
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
