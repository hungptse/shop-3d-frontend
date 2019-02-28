import React, { Component } from "react";
import indexRoutes from "./router/index.jsx";
import { renderRoutes } from "./components/route";
import { BrowserRouter } from "react-router-dom";
import { cartReducer } from "./main/publicPage/components/UI/Cart/Cart.reducer";
import { authReducer } from "./main/publicPage/components/Login/Auth.reducer";
import { productReducer } from "./main/publicPage/components/ProductPage/ProductPage.reducer";
import { searchReducer } from "./main/publicPage/components/UI/Search/Search.reducer";

import { store } from "./store";
import "./App.css";

const CART_STORE = 'CART_STORE';
const AUTH_STORE = 'AUTH_STORE';
const PRODUCT_PAGE_STORE = 'PRODUCT_PAGE_STORE';
const SEARCH_STORE = 'SEARCH_STORE';




class App extends Component {
  componentDidMount() {
    store.injectReducer(CART_STORE, cartReducer);
    store.injectReducer(AUTH_STORE, authReducer);
    store.injectReducer(PRODUCT_PAGE_STORE, productReducer);
    store.injectReducer(SEARCH_STORE, searchReducer);
  }

  render() {
    return <BrowserRouter>{renderRoutes(indexRoutes, "")}</BrowserRouter>;
  }
}

export default App;
