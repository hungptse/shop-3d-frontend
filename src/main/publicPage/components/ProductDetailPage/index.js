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
  Tab
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
  state = { product: {}, quantity: 1};

  async componentWillMount() {
    await get(GET_PRODUCT_BY_ID(this.props.match.params.id), {}, {}).then(res => {
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
        <Header as="h1">Product Detail</Header>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2">{product.name} </Header>
              <Divider horizontal>
                <Header as="h4">
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
          <Grid.Row>
            <Grid.Column width={16}>
              <Tab
                panes={[
                  {
                    menuItem: "Additional Information",
                    render: () => <Tab.Pane loading>Tab 1 Content</Tab.Pane>
                  },
                  {
                    menuItem: "Ratting & Feedback",
                    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
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
