import React, { Component } from "react";
import {
  Card,
  Divider,
  Grid,
  Image,
  Label,
  Segment,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const CART_STORE = "CART_STORE";
const getCartFromReducer = state => state[CART_STORE].cart;
const startSelector = createSelector(
  getCartFromReducer,
  cart => ({ cart: cart || [] })
);

class OrderSummary extends Component {
  render() {
    const { cart } = this.props;
    const itemsPrice = cart.map(item => {
      return parseInt(item.quantity) * parseInt(item.price);
    });
    if (this.props.cart && this.props.cart.length > 0) {
      return (
        <Card fluid centered>
          <Card.Content
            content="Order Summary"
            textAlign="center"
            style={{ fontSize: "2em", fontWeight: 300 }}
          />
          <Divider />
          <Grid columns={4}>
            {cart.map(product => {
              return (
                <Grid.Row key={product.id} style={{ marginLeft: "1em" }}>
                  <Grid.Column width={4}>
                    <Image
                      spaced
                      inline
                      size="small"
                      style={{ borderRadius: "3px" }}
                      src={product.thumbnail}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Grid>
                      <Grid.Column floated="left" width={6}>
                        {product.name}
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Label basic color="blue">
                          Q.ty
                          <Label.Detail>{product.quantity}</Label.Detail>
                        </Label>
                      </Grid.Column>
                      <Grid.Column floated="right" width={4} textAlign="left">
                        <Label as="a" basic color="blue">
                          ${product.price}
                        </Label>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              );
            })}
          </Grid>
          <Segment padded piled compact style={{ marginBottom: 0 }}>
            <Segment.Inline style={{ marginBottom: "1em" }}>
              <Label size="large">Total in order: </Label>
              <Button size="mini" secondary floated="right">
                ${itemsPrice.reduce((sum, cur) => sum + cur)}
              </Button>
            </Segment.Inline>
          </Segment>
        </Card>
      );
    }
    return (
      <Card fluid centered>
        <Card.Content
          content="Your cart is empty"
          textAlign="center"
          style={{ fontSize: "1.3em", fontWeight: 300 }}
        />
        <Card.Content><Button fluid color='facebook' as='a' href="/store/products" >Click here to cont. shopping</Button></Card.Content>
      </Card>
    );
  }
}

export default connect(
  startSelector,
  {}
)(OrderSummary);
