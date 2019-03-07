import React, { Component } from "react";
import {
  Card,
  Reveal,
  Button,
  Icon,
  Image,
  Label,
  Dimmer,
  Header,
  Placeholder
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  addCartToReducer,
  setCartIsActiveToReducer
} from "../Cart/Cart.action";
import firebase from "../../../../../utils/FirebaseUitls";
import defaultImg from "../../../../../assets/images/default-product.jpg";
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
  state = { id: this.props.info.id, active: false, imgUrl: "", loaded : false };

  async componentDidMount() {
    await firebase.getLinkImages(this.props.info.thumbnail).then(res => this.setState({ imgUrl : res}));
    this.setState({loaded : true});
  }

  addToCart = e => {
    e.preventDefault();
    this.props.addCartToReducer &&
      this.props.addCartToReducer(
        {
          id: this.props.info.id,
          name: this.props.info.name,
          price: this.props.info.price,
          quantity: 1,
          thumbnail: this.state.imgUrl,
          maxQuantity : this.props.info.quantity
        },
        this.props.uid
      );
    this.props.setCartIsActiveToReducer &&
      this.props.setCartIsActiveToReducer(false);
  };

  linkToDetail = e => {
    e.preventDefault();
    this.props.history.push("/store/product/" + this.props.info.id);
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
      if (this.state.loaded) {
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
              src={this.state.imgUrl === "" ? defaultImg : this.state.imgUrl}
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
              <Button animated="fade" color="vk" fluid onClick={this.addToCart} disabled={info.quantity === 0 ? true : false}  >
                <Button.Content visible hidden={info.quantity === 0 ? true : false}>
                  <Icon name="add to cart" />
                </Button.Content>
                <Button.Content content={info.quantity === 0 ? 'Out of stock' : 'Add to cart'} hidden={info.quantity === 0 ? false : true}></Button.Content>
              </Button>
            </Card.Content>
          </Card>
        );
      } else {
        return (
          <Card>
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="very short" />
                      <Placeholder.Line length="medium" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
                <Card.Content extra>
                  <Button color="blue" fluid disabled>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
        );
      }

    
  }
}

export default connect(
  startSelector,
  { addCartToReducer, setCartIsActiveToReducer }
)(Product);
