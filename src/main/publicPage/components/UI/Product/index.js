import React, { Component } from "react";
import {
  Card,
  Reveal,
  Button,
  Icon,
  Image,
  Label,
  Dimmer,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  addCartToReducer,
  setCartIsActiveToReducer
} from "../Cart/Cart.action";
import firebase from "../../../../../utils/Firebase";
// import CookieStorageUtils, {
//   COOKIE_KEY
// } from "../../../../../utils/CookieStorage";
const AUTH_STORE = "AUTH_STORE";
const CART_STORE = "CART_STORE";

const getCartFromReducer = state => state[CART_STORE].cart;
const getCartIsActiveFromReducer = state => state[CART_STORE].cartIsActive;

const uidFromReducer = state => state[AUTH_STORE].uid;

const startSelector = createSelector(
  getCartFromReducer,
  uidFromReducer,
  getCartIsActiveFromReducer,
  (cart, uid, cartIsActive) => ({
    cart: cart || [],
    uid: uid || "",
    cartIsActive: cartIsActive
  })
);

class Product extends Component {
  state = { id: this.props.info.id, active: false };

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
    this.props.setCartIsActiveToReducer &&
      this.props.setCartIsActiveToReducer(false);
  };

  linkToDetail = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.history.push("/product/" + this.props.info.id);
  };

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  render() {
    const { info } = this.props;
    const { active } = this.state;

    const content = (
      <div>
        <Header as="h3" inverted>
          Model : {info.model}
        </Header>
        <Button color="vk" onClick={this.linkToDetail}>
          <Icon name="search" /> Quick View
        </Button>
      </div>
    );
    // console.log(
    //   firebase
    //     .storage()
    //     .ref()
    //     .child("productsImg/" + info.thumbnail)
    //     .getDownloadURL()
    //     .then(res => {
    //       console.log(res);
    //     })
    // );

    return (
      <Card key={info.id}>
        <Dimmer.Dimmable
          as={Image}
          blurring
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          size="medium"
          src=""
        />
        <Card.Content>
          <Label color="black" ribbon="right">
            <Icon name="dollar sign" />
            {info.price}
          </Label>
          <Card.Meta style={{ textAlign: "right" }} />
          <Card.Header>{info.name}</Card.Header>

          <Card.Description>{info.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button animated="fade" color="blue" fluid onClick={this.addToCart}>
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
