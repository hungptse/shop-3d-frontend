import React, { Component } from "react";
import indexRoutes from "./router/index.jsx";
import { renderRoutes } from "./components/route";
import { BrowserRouter } from "react-router-dom";
import { cartReducer } from "./main/publicPage/components/UI/Cart/Cart.reducer";
import { store } from "./store";
import "./App.css";

const CART_STORE = 'CART_STORE';

class App extends Component {
  componentDidMount() {
    store.injectReducer(CART_STORE, cartReducer);
  }

  render() {
    return <BrowserRouter>{renderRoutes(indexRoutes, "")}</BrowserRouter>;
  }
}

export default App;
