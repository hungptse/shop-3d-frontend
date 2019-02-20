import React, { Component } from "react";
import iconCart from "../../../../../assets/images/shopping-bag.svg";
import iconClose from "../../../../../assets/images/close.svg";

import "../Cart/header.scss";
import "../Cart/cart.scss";

const CartCount = ({ cart, cartIsActive }) => {
  if (cart.items.length > 0 && cartIsActive) {
    // const itemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);
    return <span className="cart-count">{cart.items.length}</span>;
  }
  return null;
};

const CartIconActive = ({ cartIsActive }) => {
  if (!cartIsActive) {
    return (
      <div>
        <img src={iconClose} style={{ minWidth: "20px" }} alt="Cart" />
      </div>
    );
  }
  return (
    <div>
      <img src={iconCart} style={{ minWidth: "20px" }} alt="Cart" />
    </div>
  );
};

class CartIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart, onClick, cartIsActive } = this.props;
    return (
      <div className="cart-button" onClick={onClick}>
        <CartCount cart={cart} cartIsActive={cartIsActive} />
        <CartIconActive cartIsActive={cartIsActive} />
      </div>
    );
  }
}

export default CartIcon;
