import React, { Component } from "react";
import logo from "../../../../../assets/images/azgundam-logo.png";
import { Link } from "react-router-dom";
import { Image, Menu, Container, Button, Input } from "semantic-ui-react";
import CartIcon from "../Cart";
import Cart from "../Cart/Cart.jsx";
import "../Cart/cart.scss";
import "../Cart/header.scss";
import {connect} from 'react-redux';
import { createSelector } from "reselect";

const CART_STORE = 'CART_STORE';

const getCartFromReducer = state => state[CART_STORE].cart;

const startSelector = createSelector(
  getCartFromReducer,
    (cart) => ({ cart: cart || [] })
);


class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.location.pathname,
      cartIsActive: true,
      // cart: {items : [{'id' : 1,'name' : 'abc'},{'id' : 2,'name' : 'abc'}]}
    };
  }

  componentDidMount() {
    if (this.state.activeItem === "/") {
      this.setState({ activeItem: "/home" });
    } else {
      this.setState({ activeItem: this.props.location.pathname });
    }
   }

  handldeActiveItem = path => {
    this.setState({ activeItem: "/" + path });
  };

  handleCartIcon = () => {
    this.setState({ cartIsActive: !this.state.cartIsActive });
    if (this.state.cartIsActive) {
      document.body.classList.add("dark-overflow");
    } else{
      document.body.classList.remove("dark-overflow");

    }
  };

  // cartToggle = () => {
  //   this.setState({
  //     cartIsActive: !this.state.cartIsActive,
  //   });
  //   document.body.classList.toggle("noscroll");
  // };

  // showCart = () => {
  //   this.setState({
  //     cartIsActive: true,
  //   });
  //   document.body.classList.add("noscroll");
  // };

  // renderCart(){
  //   if (this.state.loading) {
  //     return <Cart/>
  //   }
  // }

  render() {
    return (
      <Menu
        fixed="top"
        borderless
        secondary
        pointing
        style={{ paddingBottom: "1em", background: "#ffffff" }}
        className="boderBot"
      >
        <Container style={{ backgroudColor: "white" }}>
          <Image
            floated="left"
            src={logo}
            style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
          />
          {this.props.listRouters.map((route, key) => {
            if (!route.redirect) {
              return (
                <Menu.Item
                  active={
                    this.state.activeItem == "/" + route.path ? true : false
                  }
                  key={key}
                >
                  <Link
                    to={this.props.match.path + route.path}
                    style={{ color: "black" }}
                    onClick={() => this.handldeActiveItem(route.path)}
                  >
                    {route.name.toUpperCase()}
                  </Link>
                </Menu.Item>
              );
            }
          })}
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item>
              <CartIcon
                onClick={this.handleCartIcon}
                cartIsActive={this.state.cartIsActive}
              />
              <div
									className={this.state.cartIsActive ? 'mini-cart-open' : ''}
								>
									<Cart />
								</div>
            </Menu.Item>
            <Menu.Item>
              <Button primary>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default connect(startSelector, {})(HeaderPage);
