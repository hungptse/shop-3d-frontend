import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
  Label,
  Icon,
  Divider,
  Form,
  Button,
  Tab,
  Rating} from "semantic-ui-react";
import { PRODUCT_BY_ID, PRODUCT_RATE } from "../../../../utils/ApiEndpoint";
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
import FirebaseUitls from "../../../../utils/FirebaseUitls";

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
  state = { product: {}, quantity: 1, urlThumbail: "" ,rate : 5};

  async componentWillMount() {
    await get(PRODUCT_BY_ID(this.props.match.params.id), {}, {}).then(
      res => {
        this.setState({ product: res.data });
      }
    );
    await FirebaseUitls.getLinkImages("img-products",this.state.product.thumbnail).then(
      res => {
        this.setState({ urlThumbail: res });
      }
    );
    await get(PRODUCT_RATE(this.props.match.params.id)).then(res => {
      this.setState({ rate : res.data});
    })
  }
  async componentWillReceiveProps(newProps) {
    await get(PRODUCT_BY_ID(newProps.match.params.id), {}, {}).then(res => {
      this.setState({ product: res.data });
    });
    await FirebaseUitls.getLinkImages("img-products",this.state.product.thumbnail).then(
      res => {
        this.setState({ urlThumbail: res });
      }
    );
    await get(PRODUCT_RATE(this.props.match.params.id)).then(res => {
      this.setState({ rate : res.data});
    })
    
  }

  addToCart = e => {
    e.preventDefault();
    this.props.addCartToReducer &&
      this.props.addCartToReducer(
        {
          id: this.state.product.id,
          name: this.state.product.name,
          price: this.state.product.price,
          quantity: this.state.quantity,
          thumbnail: this.state.urlThumbail,
          maxQuantity : this.state.product.quantity
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
    const { product, rate } = this.state;
    return (
      <Container style={{ height : 1250}}>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Gallery
                images={[
                  "https://firebasestorage.googleapis.com/v0/b/image-3d.appspot.com/o/img-products%2FHG-BD-JEGAN-BLAST-MASTER-5.jpg?alt=media&token=c3602d68-7c1d-4df8-b943-173ba24b83da",
                  "https://firebasestorage.googleapis.com/v0/b/image-3d.appspot.com/o/img-products%2FHG-BD-JEGAN-BLAST-MASTER-6.jpg?alt=media&token=bedc0712-5627-4b68-9a9e-38c4937b3324"
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
                  <label style={{ marginLeft: "15px" }}>{Math.round(rate * 10) / 10}/5.0</label>
                  <Rating
                    icon="heart"
                    size="small"
                    maxRating={5}
                    rating={rate}
                    disabled
                  />
                </Form.Group>
                <Quantity
                  maxQuantity={product.quantity}
                  onChangeQuantity={this.handleQuantityChange}
                />
              </Form>
              <Button animated="fade" color="vk" fluid onClick={this.addToCart} disabled={product.quantity === 0 ? true : false}  >
                <Button.Content visible hidden={product.quantity === 0 ? true : false}>
                  <Icon name="add to cart" />
                </Button.Content>
                <Button.Content content={product.quantity === 0 ? 'Out of stock' : 'Add to cart'} hidden={product.quantity === 0 ? false : true} />
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: "10px" }}>
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
                        key={1}
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
                        key={2}
                        basic
                        color="red"
                        content="Ratting & Feedback"
                        icon="heart"
                      />
                    ),
                    render: () => (
                      <Tab.Pane>
                        <Feedback feedbacks={product.feedback} proId={product.id}/>
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
