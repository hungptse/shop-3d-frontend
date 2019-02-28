import React, { Component } from "react";
import { Card, Reveal, Button, Icon, Image, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { addCartToReducer, setCartIsActiveToReducer } from "../Cart/Cart.action";
import firebase from "../../../../../utils/Firebase.js";
import CookieStorageUtils, {
  COOKIE_KEY
} from "../../../../../utils/CookieStorage";

const AUTH_STORE = "AUTH_STORE";
const CART_STORE = "CART_STORE";

const getCartFromReducer = state => state[CART_STORE].cart;
const getCartIsActiveFromReducer = state => state[CART_STORE].cartIsActive;

const uidFromReducer = state => state[AUTH_STORE].uid;

const startSelector = createSelector(
  getCartFromReducer, uidFromReducer, getCartIsActiveFromReducer,
  (cart, uid, cartIsActive) => ({ cart: cart || [], uid: uid || "", cartIsActive : cartIsActive })
);

class Product extends Component {
  state = { id: this.props.info.id };

  addToCart = e => {
    e.preventDefault();
    this.props.addCartToReducer &&
      this.props.addCartToReducer(
        {
          id: this.props.info.id,
          name: this.props.info.name,
          price: this.props.info.price,
          quantity: 1
        },
        this.props.uid
      );
        this.props.setCartIsActiveToReducer && this.props.setCartIsActiveToReducer(false);
    // firebase
    //   .database()
    //   .ref("/" + "demo")
    //   .set({
    //     cart: this.props.cart
    //   });
  };

  render() {
    const { info } = this.props;
    return (
      <Card key={info.id}>
        <Reveal animated="move" instant>
          <Reveal.Content visible>
            <Image src="https://react.semantic-ui.com/images/avatar/large/nan.jpg" />
          </Reveal.Content>
          <Reveal.Content hidden>
            <Image src="https://react.semantic-ui.com/images/avatar/large/chris.jpg" />
          </Reveal.Content>
        </Reveal>
        <Card.Content>
          <Card.Meta style={{ textAlign: "right" }}>
            <Label tag as="a">
              <Icon name="dollar sign" />
              {info.price}
            </Label>
          </Card.Meta>
          <Card.Header>{info.name}</Card.Header>

          <Card.Description>{info.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button animated color="blue" fluid onClick={this.addToCart}>
            <Button.Content visible>
              <Icon name="add to cart" />
            </Button.Content>
            <Button.Content hidden>Add to cart</Button.Content>
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(
  startSelector,
  { addCartToReducer, setCartIsActiveToReducer }
)(Product);
