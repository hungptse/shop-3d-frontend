import React, { Component } from "react";
import indexRoutes from "./router/index.jsx";
import { renderRoutes } from "./components/route";
import { BrowserRouter } from "react-router-dom";
import { cartReducer } from "./main/publicPage/components/UI/Cart/Cart.reducer";
import { authReducer } from "./main/publicPage/components/Login/Auth.reducer";
import { productReducer } from "./main/publicPage/components/ProductPage/ProductPage.reducer";
import { searchReducer } from "./main/publicPage/components/UI/Search/Search.reducer";
import {orderReducer } from "./main/adminPage/components/OrderPage/Order.reducer";
import { store } from "./store";
import "./App.css";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import 'react-day-picker/lib/style.css';
const CART_STORE = 'CART_STORE';
const AUTH_STORE = 'AUTH_STORE';
const PRODUCT_PAGE_STORE = 'PRODUCT_PAGE_STORE';
const SEARCH_STORE = 'SEARCH_STORE';
const ORDER_STORE = 'ORDER_STORE';



class App extends Component {
  componentDidMount() {
    store.injectReducer(CART_STORE, cartReducer);
    store.injectReducer(AUTH_STORE, authReducer);
    store.injectReducer(PRODUCT_PAGE_STORE, productReducer);
    store.injectReducer(SEARCH_STORE, searchReducer);
    store.injectReducer(ORDER_STORE, orderReducer);
  }

  render() {
    return <BrowserRouter>{renderRoutes(indexRoutes, "")}</BrowserRouter>;
  }
}

export default App;
