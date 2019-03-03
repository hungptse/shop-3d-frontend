import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Cart/cart.scss";
import "../Cart/header.scss";
import faker from "faker";
import {
  Button,
  Icon,
  Image,
  Label,
  Segment,
  Divider,
  Grid
} from "semantic-ui-react";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import { removeCartFromReducer } from "./Cart.action";
import CookieStorageUtils,{ COOKIE_KEY  } from "../../../../../utils/CookieStorage";
import firebase from "../../../../../utils/FirebaseUitls";
const CART_STORE = "CART_STORE";

const getCartFromReducer = state => state[CART_STORE].cart;
const startSelector = createSelector(
  getCartFromReducer,
  (cart) => ({ cart: cart || []})
);

const CartItem = data => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={data.item.thumbnail} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Column floated="left" textAlign="left" width={6}>
              {data.item.name}
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Grid>
                <Grid.Row
                  textAlign="right"
                  centered
                  style={{ paddingBottom: "0" }}
                >
                  <Segment basic style={{ paddingTop: "0" }}>
                    ${data.item.price}
                  </Segment>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: "0" }}>
                  <Button basic size="mini" onClick={data.onClick}>
                    Remove
                  </Button>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
          <Label>
            <Icon name="tags" />
            Qty: {data.item.quantity}
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

class Cart extends Component {

  deleteCartItem(item) {
    this.props.removeCartFromReducer && this.props.removeCartFromReducer(item, CookieStorageUtils.getItem(COOKIE_KEY.UID).trim());
  }
  

  render() {
    if (this.props.cart && this.props.cart.length > 0) {
      const items = this.props.cart.map(item => (
        <CartItem key={item.id} item={item} onClick={() => this.deleteCartItem(item)} />
      ));
      const itemsPrice = this.props.cart.map(item => {
        return parseInt(item.quantity) * parseInt(item.price);
      });
      return (
        <div className="mini-cart" style={{ borderBottom: "" }}>
          {items}
          <Divider clearing style={{ margin: "1rem 0" }} />
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Segment basic style={{ fontWeight: "bold", paddingTop: "0" }}>
                  Subtotal
                </Segment>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid>
                  <Grid.Column floated="left" textAlign="left" width={6} />
                  <Grid.Column floated="right" width={4}>
                    <Grid>
                      <Grid.Row textAlign="right" centered>
                        <Segment
                          basic
                          style={{ fontWeight: "bold", paddingTop: "0" }}
                        >
                          ${itemsPrice.reduce((sum, cur) => sum + cur)}
                        </Segment>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button fluid style={{ background: "#00b366" }}>
            <NavLink
              style={{ textTransform: "uppercase", color: "white" }}
              to="/checkout"
              // onClick={cartToggle}
            >
              Go To Checkout
            </NavLink>
          </Button>
        </div>
      );
    }
    return (
      <div className="mini-cart">
        <h5>Your cart is empty</h5>
      </div>
    );
  }
}

export default connect(
  startSelector,
  { removeCartFromReducer }
)(Cart);
