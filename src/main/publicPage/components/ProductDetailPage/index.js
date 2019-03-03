import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Image,
  Header,
  Label,
  Icon,
  Divider,
  Form,
  Button,
  Menu,
  Tab,
  Sticky,
  Rating
} from "semantic-ui-react";
import { GET_PRODUCT_BY_ID } from "../../../../utils/ApiEndpoint";
import { get } from "../../../../utils/ApiCaller";
import Quantity from "./Quantity.jsx";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  addCartToReducer,
  setCartIsActiveToReducer
} from "../UI/Cart/Cart.action";

import AdditionalInfo from "./AdditionalInfo.jsx";
import Feedback from "./FeedBack.jsx";
import Gallery from "./Gallery.jsx";

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

class ProductDetailPage extends Component {
  state = { product: {}, quantity: 1 };

  async componentWillMount() {
    await get(GET_PRODUCT_BY_ID(this.props.match.params.id), {}, {}).then(
      res => {
        this.setState({ product: res.data });
      }
    );
  }
  async componentWillReceiveProps(newProps) {
    await get(GET_PRODUCT_BY_ID(newProps.match.params.id), {}, {}).then(res => {
      this.setState({ product: res.data });
    });
  }

  addToCart = e => {
    e.preventDefault();
    this.props.addCartToReducer &&
      this.props.addCartToReducer(
        {
          id: this.state.product.id,
          name: this.state.product.name,
          price: this.state.product.price,
          quantity: this.state.quantity
        },
        this.props.uid
      );
    this.props.setCartIsActiveToReducer &&
      this.props.setCartIsActiveToReducer(false);
  };

  handleQuantityChange = value => {
    this.setState({ quantity: value });
  };

  render() {
    const { product } = this.state;
    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Gallery
                images={[
                  "https://firebasestorage.googleapis.com/v0/b/image-3d.appspot.com/o/productsImg%2FHG-BD-JEGAN-BLAST-MASTER-5.jpg?alt=media&token=f636e27a-4363-4c2f-8d45-d8c5835918e2",
                  "https://firebasestorage.googleapis.com/v0/b/image-3d.appspot.com/o/productsImg%2FHG-BD-JEGAN-BLAST-MASTER-6.jpg?alt=media&token=f89e28b6-c14e-474d-882f-3820b45bb722"
                ]}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2">{product.name} </Header>
              <Divider horizontal>
                <Header as="h5">
                  <Icon name="tag" />
                  General Infomation
                </Header>
              </Divider>
              <Form>
                <Form.Group inline>
                  <label>Price</label>
                  <Label style={{ marginLeft: "35px" }} tag color="black">
                    <Icon name="dollar sign" />
                    {product.price}
                  </Label>
                </Form.Group>
                <Form.Group inline>
                  <label>Rating</label>
                  <label style={{ marginLeft: "15px" }}>4.0</label>
                  <Rating
                    size='large'
                    maxRating={5}
                    defaultRating={4}
                    disabled
                  />
                </Form.Group>
                <Quantity
                  maxQuantity={product.quantity}
                  onChangeQuantity={this.handleQuantityChange}
                />
              </Form>
              <Button
                animated="fade"
                color="teal"
                fluid
                onClick={this.addToCart}
              >
                <Button.Content visible>
                  <Icon name="add to cart" />
                </Button.Content>
                <Button.Content hidden>Add to cart</Button.Content>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{marginTop : '10px'}}>
            <Grid.Column width={16}>
              <Tab
                panes={[
                  {
                    menuItem: (
                      <Button
                        basic
                        color="blue"
                        content="Additional Infomation"
                        icon="fork"
                      />
                    ),
                    render: () => (
                      <Tab.Pane>
                        <AdditionalInfo product={product} />
                      </Tab.Pane>
                    )
                  },
                  {
                    menuItem: (
                      <Button
                        basic
                        color="red"
                        content="Ratting & Feedback"
                        icon="heart"
                      />
                    ),
                    render: () => (
                      <Tab.Pane>
                        <Feedback />
                      </Tab.Pane>
                    )
                  }
                ]}
                menu={{ secondary: true, pointing: true }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  startSelector,
  { addCartToReducer, setCartIsActiveToReducer }
)(ProductDetailPage);
