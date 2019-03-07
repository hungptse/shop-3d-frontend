import React, { Component } from "react";
import iconCart from "../../../../../assets/images/shopping-bag.svg";
import iconClose from "../../../../../assets/images/close.svg";

import "../Cart/header.scss";
import "../Cart/cart.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const CART_STORE = "CART_STORE";
const getCartFromReducer = state => state[CART_STORE].cart;

const startSelector = createSelector(
  getCartFromReducer,
  cart => ({ cart: cart || [] })
);

const CartCount = ({ cart }) => {
  if (cart.length > 0) {    
    var count = 0;    
    cart.forEach(product => {
      count += product.quantity;
    });
    return <span className="cart-count">{count}</span>;
  }
  return null;
};

const CartIconActive = ({ cartIsActive }) => {
  if (!cartIsActive) {
    return (
      <div>
        <img src={iconClose} style={{ minWidth: "24px" }} alt="Cart" />
      </div>
    );
  }
  return (
    <div>
      <img src={iconCart} style={{ minWidth: "24px" }} alt="Cart" />
    </div>
  );
};

class CartIcon extends Component {
  render() {
    const { onClick, cartIsActive } = this.props;

    return (
      <div className="cart-button" onClick={onClick}>
        <CartCount cart={this.props.cart} cartIsActive={cartIsActive} />
        <CartIconActive cartIsActive={cartIsActive} />
      </div>
    );
  }
}

export default connect(
  startSelector,
  {}
)(CartIcon);
