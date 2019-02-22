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

const CART_STORE = "CART_STORE";
const getCartFromReducer = state => state[CART_STORE].cart;

const startSelector = createSelector(
  getCartFromReducer,
  cart => ({ cart: cart || [] })
);

const CartItem = item => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={faker.image.avatar()} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Column floated="left" textAlign="left" width={6}>
              {item.name}
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Grid>
                <Grid.Row
                  textAlign="right"
                  centered
                  style={{ paddingBottom: "0" }}
                >
                  <Segment basic style={{ paddingTop: "0" }}>
                    ${item.price}
                  </Segment>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: "0" }}>
                  <Button basic size="mini">
                    Remove
                  </Button>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
          <Label>
            <Icon name="tags" />
            Qty: {item.quantity}
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

class Cart extends Component {


  deleteCartItem = id => {
    console.log(id);
  };

  render() {

    const { deleteCartItem, cartToggle } = this.props;
    if (this.props.cart && this.props.cart.length > 0) {
      const items = this.props.cart.map(item => (
        <CartItem key={item.id} item={item} deleteCartItem={deleteCartItem} />
      ));
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
                          $21.98
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
        <h4>Your cart is empty</h4>
      </div>
    );
  }
}

export default connect(
  startSelector,
  {}
)(Cart);
