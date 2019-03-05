import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App.js";
import $ from "jquery";
import 'pure-react-carousel/dist/react-carousel.es.css';

window.$ = $;
const appStore = store.configureStore();
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
