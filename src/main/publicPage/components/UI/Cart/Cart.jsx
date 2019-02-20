import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Cart/cart.scss";
import "../Cart/header.scss";
import faker from "faker";
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Segment,
  Divider,
  Card,
  Reveal,
  Grid,
  Rail
} from "semantic-ui-react";

const CartItem = ({ item, deleteCartItem }) => {
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
            <Image src={faker.image.avatar()} />
        </Grid.Column>
        <Grid.Column>{faker.commerce.product()}</Grid.Column>
        <Grid.Column textAlign='right'>$10.00</Grid.Column>
      </Grid.Row>
    </Grid>
    // <Card>
    //   <Card.Content>
    //     <Card.Header>ABC</Card.Header>
    //     <Card.Meta>
    //     <Label tag as='a'>$10.00</Label>
    //     </Card.Meta>
    //     <Card.Description>RG 19 MBF-P02 Astray Red Frame</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button animated="arrow right" color="blue" fluid>
    //       <Button.Content visible>
    //         <Icon name="add to cart" />
    //       </Button.Content>
    //       <Button.Content hidden>Add to cart</Button.Content>
    //     </Button>
    //   </Card.Content>
    // </Card>
  );
};

class Cart extends Component {
  deleteCartItem = id => {
    console.log(id);
  };

  render() {
    const { cart, deleteCartItem, cartToggle } = this.props;

    if (cart && cart.items && cart.items.length > 0) {
      const items = cart.items.map(item => (
        <CartItem key={item.id} item={item} deleteCartItem={deleteCartItem} />
      ));

      return (
        <div className="mini-cart" style={{ borderBottom: "" }}>
          {items}
          <Divider clearing style={{margin : '1rem 0'}} />
          <Segment floated="left" basic style={{fontWeight : 'bold'}}>Subtotal</Segment>
          <Segment floated="right" basic style={{fontWeight : 'bold'}}>$1000</Segment>
          <Button fluid style={{ background: "#00b366" }}>
            <NavLink
              style={{ textTransform: "uppercase", color: "white" }}
              to="/checkout"
              onClick={cartToggle}
            >
              Go To Checkout
            </NavLink>
          </Button>
        </div>
      );
    }
    return (
      <div className="mini-cart">
        <p>Cart is empty</p>
      </div>
    );
  }
}

export default Cart;
